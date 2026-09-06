extends CharacterBody3D

# --- Difficulty knobs. Set these differently per level in the editor
# (select the Ghost instance, edit these in the Inspector) - that's how
# "sharper and more accurate as levels progress" gets implemented without
# writing a new ghost for every level. ---
@export var patrol_speed: float = 2.0
@export var chase_speed: float = 3.2
@export var detection_range: float = 6.5      # how far it can SEE you
@export var hearing_multiplier: float = 0.65    # multiplies the player's noise radius
@export var lose_sight_time: float = 1.8       # seconds of no sight/sound before giving up
@export var gravity: float = 9.8
@export var repath_interval: float = 0.5       # how often it recalculates its route to you

var nav_graph: AStar3D = null
var player: Node3D = null
var state: String = "PATROL"
var time_since_seen: float = 0.0
var _catching: bool = false

var _current_path: PackedVector3Array = PackedVector3Array()
var _path_index: int = 0
var _repath_timer: float = 0.0

func _ready() -> void:
	player = get_tree().get_first_node_in_group("player")

# Called by the level right after it builds the maze, so the ghost knows how
# the corridors connect and can path through them instead of walking
# straight at you through walls.
func setup_maze(graph: AStar3D) -> void:
	nav_graph = graph

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y -= gravity * delta

	if player == null or _catching or nav_graph == null or nav_graph.get_point_count() == 0:
		velocity.x = 0.0
		velocity.z = 0.0
		move_and_slide()
		return

	var distance_to_player := global_position.distance_to(player.global_position)
	var can_see_player := distance_to_player <= detection_range and _has_line_of_sight()
	var can_hear_player := false
	if player.has_method("get_noise_radius"):
		var heard_radius: float = player.get_noise_radius() * hearing_multiplier
		can_hear_player = heard_radius > 0.0 and distance_to_player <= heard_radius

	if can_see_player or can_hear_player:
		if state != "CHASE":
			_current_path = PackedVector3Array()
			_path_index = 0
			_repath_timer = 0.0
		state = "CHASE"
		time_since_seen = 0.0
	elif state == "CHASE":
		time_since_seen += delta
		if time_since_seen >= lose_sight_time:
			state = "PATROL"
			_current_path = PackedVector3Array()
			_path_index = 0

	_repath_timer -= delta
	if state == "CHASE":
		if _repath_timer <= 0.0:
			_repath_timer = repath_interval
			_recompute_path_to(player.global_position)
		_follow_path(chase_speed)
	else:
		if _path_index >= _current_path.size():
			_pick_new_patrol_target()
		_follow_path(patrol_speed)

	move_and_slide()

func _has_line_of_sight() -> bool:
	var space_state := get_world_3d().direct_space_state
	var query := PhysicsRayQueryParameters3D.create(
		global_position + Vector3.UP,
		player.global_position + Vector3.UP
	)
	query.exclude = [self]
	var result := space_state.intersect_ray(query)
	return result.is_empty() or result.get("collider") == player

func _recompute_path_to(target_pos: Vector3) -> void:
	var start_id := nav_graph.get_closest_point(global_position)
	var end_id := nav_graph.get_closest_point(target_pos)
	_current_path = nav_graph.get_point_path(start_id, end_id)
	_path_index = 1 if _current_path.size() > 1 else 0

func _pick_new_patrol_target() -> void:
	var ids: Array = Array(nav_graph.get_point_ids())
	if ids.is_empty():
		return
	ids.shuffle()
	var start_id := nav_graph.get_closest_point(global_position)
	var target_id: int = ids[0]
	_current_path = nav_graph.get_point_path(start_id, target_id)
	_path_index = 1 if _current_path.size() > 1 else 0

func _follow_path(speed: float) -> void:
	if _current_path.is_empty() or _path_index >= _current_path.size():
		velocity.x = move_toward(velocity.x, 0, speed)
		velocity.z = move_toward(velocity.z, 0, speed)
		return

	var target: Vector3 = _current_path[_path_index]
	var to_target := target - global_position
	to_target.y = 0.0

	if to_target.length() < 0.4:
		_path_index += 1
		if _path_index >= _current_path.size():
			velocity.x = move_toward(velocity.x, 0, speed)
			velocity.z = move_toward(velocity.z, 0, speed)
			return
		target = _current_path[_path_index]
		to_target = target - global_position
		to_target.y = 0.0

	if to_target.length() > 0.01:
		var direction := to_target.normalized()
		velocity.x = direction.x * speed
		velocity.z = direction.z * speed
		look_at(global_position + direction, Vector3.UP)

func _on_catch_area_body_entered(body: Node3D) -> void:
	if body.is_in_group("player") and not _catching:
		_catching = true
		velocity = Vector3.ZERO
		await GameManager.handle_player_caught(body)
