extends Node3D

const GRID_W := 9
const GRID_H := 9
const CELL_SIZE := 4.5
const WALL_HEIGHT := 4.0
const WALL_THICKNESS := 0.3
const NUM_PICKUPS := 4
const NUM_BATTERIES := 3
const NUM_TRAPS := 7
const TRAP_STUN_DURATION := 1.7

# The emergency walls slowly close from both sides after a short head start.
const CLOSING_START := 12.0
const CLOSING_SPEED := 0.065
const MIN_GAP := 5.0

const PlayerScene := preload("res://scenes/player.tscn")
const GhostScene := preload("res://scenes/ghost.tscn")

var pieces_collected := 0
var total_pieces := NUM_PICKUPS
var _trap_message_timer := 0.0
var _closing_time := 0.0
var _closing_active := false
var _ambient_timer := 0.0
var _warning_timer := 0.0
var _wall_span := 0.0
var _left_wall: AnimatableBody3D
var _right_wall: AnimatableBody3D
var _exit_area: Area3D

var _box_mesh := BoxMesh.new()
var _box_shape := BoxShape3D.new()
var _sphere_mesh := SphereMesh.new()
var _sphere_shape := SphereShape3D.new()
var _wall_material := StandardMaterial3D.new()
var _floor_material := StandardMaterial3D.new()
var _pickup_material := StandardMaterial3D.new()
var _battery_material := StandardMaterial3D.new()
var _trap_material := StandardMaterial3D.new()
var _trap_spent_material := StandardMaterial3D.new()
var _spike_mesh := CylinderMesh.new()
var _exit_material := StandardMaterial3D.new()
var _gate_frame_material := StandardMaterial3D.new()
var _warning_material := StandardMaterial3D.new()

var maze: MazeGenerator
var grid: Array
var nav_graph: AStar3D
var player: CharacterBody3D
var ghost: CharacterBody3D

@onready var lives_label: Label = $HUD/LivesLabel
@onready var pieces_label: Label = $HUD/PiecesLabel
@onready var sprint_label: Label = $HUD/SprintLabel
@onready var flashlight_label: Label = $HUD/FlashlightLabel
@onready var trap_label: Label = $HUD/TrapLabel
@onready var wall_label: Label = $HUD/WallLabel

func _ready() -> void:
	randomize()
	_init_materials()
	trap_label.visible = false
	wall_label.visible = true

	GameManager.lives_changed.connect(_update_lives_label)
	_update_lives_label(GameManager.lives)
	_update_pieces_label()

	maze = MazeGenerator.new()
	grid = maze.generate(GRID_W, GRID_H)

	_build_floor()
	_build_walls()
	_build_nav_graph()
	_build_closing_walls()

	var start_cell := Vector2i(0, 0)
	var bfs := maze.bfs_farthest(start_cell)
	var exit_cell: Vector2i = bfs["cell"]
	var distances: Dictionary = bfs["distances"]
	var used_cells := {start_cell: true, exit_cell: true}

	var dead_ends: Array = maze.dead_ends().filter(func(c): return not used_cells.has(c))
	dead_ends.shuffle()
	var pickup_cells: Array = []
	for c in dead_ends:
		if pickup_cells.size() >= NUM_PICKUPS: break
		pickup_cells.append(c); used_cells[c] = true
	if pickup_cells.size() < NUM_PICKUPS:
		var fallback := _all_cells_except(used_cells); fallback.shuffle()
		for c in fallback:
			if pickup_cells.size() >= NUM_PICKUPS: break
			pickup_cells.append(c); used_cells[c] = true

	var battery_cells: Array = []
	var battery_pool := _all_cells_except(used_cells); battery_pool.shuffle()
	for c in battery_pool:
		if battery_cells.size() >= NUM_BATTERIES: break
		battery_cells.append(c); used_cells[c] = true

	var trap_cells: Array = []
	var remaining := _all_cells_except(used_cells); remaining.shuffle()
	for c in remaining:
		if trap_cells.size() >= NUM_TRAPS: break
		trap_cells.append(c); used_cells[c] = true

	_spawn_pickups(pickup_cells)
	_spawn_batteries(battery_cells)
	_spawn_traps(trap_cells)
	_spawn_exit(exit_cell)
	_spawn_player(start_cell)
	_spawn_ghost(exit_cell, distances)

	_ambient_timer = 7.5
	GameManager.play_sound("ambient", -13.0)

func _process(delta: float) -> void:
	if _trap_message_timer > 0.0:
		_trap_message_timer -= delta
		if _trap_message_timer <= 0.0: trap_label.visible = false

	if _closing_time < CLOSING_START:
		_closing_time += delta
		wall_label.text = "⚠ Closing walls begin in %d s" % int(ceil(CLOSING_START - _closing_time))
	else:
		if not _closing_active:
			_closing_active = true
			GameManager.play_sound("warning", -3.0)
		var half_width := (GRID_W - 1) * CELL_SIZE / 2.0 + CELL_SIZE / 2.0
		var max_closure := max(0.0, half_width - MIN_GAP / 2.0)
		var closure := min(max_closure, (_closing_time - CLOSING_START) * CLOSING_SPEED)
		_left_wall.position.x = -CELL_SIZE / 2.0 + closure
		_right_wall.position.x = (GRID_W - 1) * CELL_SIZE + CELL_SIZE / 2.0 - closure
		var gap := _right_wall.position.x - _left_wall.position.x
		wall_label.text = "⚠ WALLS CLOSING  •  GAP %0.1fm" % gap
		if gap < 9.0 and _warning_timer <= 0.0:
			_warning_timer = 5.0
			GameManager.play_sound("warning", -8.0)
	_warning_timer = max(0.0, _warning_timer - delta)

	_ambient_timer -= delta
	if _ambient_timer <= 0.0:
		_ambient_timer = 7.5
		GameManager.play_sound("ambient", -13.0)

	# A closing wall touching the player ends the run, without adding gore.
	if player and _closing_active:
		if player.global_position.x < _left_wall.position.x + 0.75 or player.global_position.x > _right_wall.position.x - 0.75:
			GameManager.play_sound("gate", -4.0)
			GameManager.player_caught()

func _all_cells_except(exclude: Dictionary) -> Array:
	var result: Array = []
	for x in range(GRID_W):
		for y in range(GRID_H):
			var c := Vector2i(x, y)
			if not exclude.has(c): result.append(c)
	return result

func _cell_center(cell: Vector2i) -> Vector3:
	return Vector3(cell.x * CELL_SIZE, 0.0, cell.y * CELL_SIZE)

func _cell_id(x: int, y: int) -> int:
	return x * GRID_H + y

func _init_materials() -> void:
	_box_mesh.size = Vector3.ONE
	_box_shape.size = Vector3.ONE
	_sphere_mesh.radius = 0.5
	_sphere_mesh.height = 1.0
	_sphere_shape.radius = 0.5
	_spike_mesh.top_radius = 0.015
	_spike_mesh.bottom_radius = 0.14
	_spike_mesh.height = 0.8
	_spike_mesh.radial_segments = 6

	_wall_material.albedo_color = Color(0.42, 0.43, 0.48)
	_wall_material.roughness = 0.85
	_floor_material.albedo_color = Color(0.20, 0.20, 0.18)
	_floor_material.roughness = 1.0
	_pickup_material.albedo_color = Color(1, 0.9, 0.3)
	_pickup_material.emission_enabled = true
	_pickup_material.emission = Color(1, 0.9, 0.3)
	_pickup_material.emission_energy_multiplier = 3.0
	_battery_material.albedo_color = Color(0.15, 0.8, 1)
	_battery_material.emission_enabled = true
	_battery_material.emission = Color(0.1, 0.7, 1)
	_battery_material.emission_energy_multiplier = 4.0
	_trap_material.albedo_color = Color(0.85, 0.12, 0.08)
	_trap_material.emission_enabled = true
	_trap_material.emission = Color(0.8, 0.05, 0.02)
	_trap_material.emission_energy_multiplier = 2.0
	_trap_spent_material.albedo_color = Color(0.20, 0.20, 0.20)
	_exit_material.albedo_color = Color(0.1, 1.0, 0.3)
	_exit_material.emission_enabled = true
	_exit_material.emission = Color(0.1, 1.0, 0.3)
	_exit_material.emission_energy_multiplier = 4.0
	_gate_frame_material.albedo_color = Color(0.08, 0.1, 0.12)
	_gate_frame_material.metallic = 0.7
	_warning_material.albedo_color = Color(1.0, 0.55, 0.05)
	_warning_material.emission_enabled = true
	_warning_material.emission = Color(1.0, 0.25, 0.02)
	_warning_material.emission_energy_multiplier = 3.0

func _add_box(parent: Node, pos: Vector3, size: Vector3, material: StandardMaterial3D, node_name: String) -> StaticBody3D:
	var body := StaticBody3D.new()
	body.name = node_name
	body.position = pos
	var mesh_instance := MeshInstance3D.new()
	mesh_instance.mesh = _box_mesh
	mesh_instance.scale = size
	mesh_instance.set_surface_override_material(0, material)
	var collision := CollisionShape3D.new()
	collision.shape = _box_shape
	collision.scale = size
	body.add_child(mesh_instance); body.add_child(collision); parent.add_child(body)
	return body

func _build_floor() -> void:
	var size_x := GRID_W * CELL_SIZE + 2.0
	var size_z := GRID_H * CELL_SIZE + 2.0
	var center := Vector3((GRID_W - 1) * CELL_SIZE / 2.0, -0.1, (GRID_H - 1) * CELL_SIZE / 2.0)
	_add_box(self, center, Vector3(size_x, 0.2, size_z), _floor_material, "Floor")

func _build_walls() -> void:
	var walls := Node3D.new()
	walls.name = "Walls"; add_child(walls)
	var half := CELL_SIZE / 2.0
	var overlap := CELL_SIZE + WALL_THICKNESS
	for x in range(GRID_W):
		for y in range(GRID_H):
			var cell: Dictionary = grid[x][y]
			var center := _cell_center(Vector2i(x, y))
			if cell["N"]:
				_add_box(walls, center + Vector3(0, WALL_HEIGHT/2.0, -half), Vector3(overlap, WALL_HEIGHT, WALL_THICKNESS), _wall_material, "Wall_N_%d_%d" % [x,y])
			if cell["W"]:
				_add_box(walls, center + Vector3(-half, WALL_HEIGHT/2.0, 0), Vector3(WALL_THICKNESS, WALL_HEIGHT, overlap), _wall_material, "Wall_W_%d_%d" % [x,y])
			if x == GRID_W-1 and cell["E"]:
				_add_box(walls, center + Vector3(half, WALL_HEIGHT/2.0, 0), Vector3(WALL_THICKNESS, WALL_HEIGHT, overlap), _wall_material, "Wall_E_%d_%d" % [x,y])
			if y == GRID_H-1 and cell["S"]:
				_add_box(walls, center + Vector3(0, WALL_HEIGHT/2.0, half), Vector3(overlap, WALL_HEIGHT, WALL_THICKNESS), _wall_material, "Wall_S_%d_%d" % [x,y])

func _build_closing_walls() -> void:
	var span := GRID_H * CELL_SIZE + 1.0
	_wall_span = span
	_left_wall = _make_closing_wall("ClosingWallLeft", Vector3(-CELL_SIZE/2.0, WALL_HEIGHT/2.0, (GRID_H-1)*CELL_SIZE/2.0), span)
	_right_wall = _make_closing_wall("ClosingWallRight", Vector3((GRID_W-1)*CELL_SIZE+CELL_SIZE/2.0, WALL_HEIGHT/2.0, (GRID_H-1)*CELL_SIZE/2.0), span)

func _make_closing_wall(n: String, pos: Vector3, span: float) -> AnimatableBody3D:
	var body := AnimatableBody3D.new()
	body.name = n; body.position = pos
	var mesh := MeshInstance3D.new()
	mesh.mesh = _box_mesh; mesh.scale = Vector3(WALL_THICKNESS*2.0, WALL_HEIGHT, span)
	mesh.set_surface_override_material(0, _warning_material)
	var col := CollisionShape3D.new()
	col.shape = _box_shape; col.scale = Vector3(WALL_THICKNESS*2.0, WALL_HEIGHT, span)
	body.add_child(mesh); body.add_child(col); add_child(body)
	return body

func _build_nav_graph() -> void:
	nav_graph = AStar3D.new()
	for x in range(GRID_W):
		for y in range(GRID_H):
			nav_graph.add_point(_cell_id(x,y), _cell_center(Vector2i(x,y)))
	for x in range(GRID_W):
		for y in range(GRID_H):
			for n in maze.open_neighbours(x,y):
				var a := _cell_id(x,y); var b := _cell_id(n.x,n.y)
				if not nav_graph.are_points_connected(a,b): nav_graph.connect_points(a,b)

func _spawn_pickups(cells: Array) -> void:
	var pickups := Node3D.new(); pickups.name = "IDCards"; add_child(pickups)
	for cell in cells:
		var area := Area3D.new()
		area.position = _cell_center(cell) + Vector3(0,1.0,0)
		var mesh := MeshInstance3D.new(); mesh.mesh = _sphere_mesh; mesh.scale = Vector3(0.65,0.65,0.65); mesh.set_surface_override_material(0,_pickup_material)
		var col := CollisionShape3D.new(); col.shape = _sphere_shape
		area.add_child(mesh); area.add_child(col); pickups.add_child(area)
		area.body_entered.connect(_on_piece_area_entered.bind(area))

func _spawn_batteries(cells: Array) -> void:
	var batteries := Node3D.new(); batteries.name = "Batteries"; add_child(batteries)
	for cell in cells:
		var area := Area3D.new()
		area.position = _cell_center(cell) + Vector3(0,0.8,0)
		var mesh := MeshInstance3D.new()
		mesh.mesh = _box_mesh; mesh.scale = Vector3(0.55,0.9,0.55); mesh.set_surface_override_material(0,_battery_material)
		var col := CollisionShape3D.new(); col.shape = _box_shape; col.scale = Vector3(0.7,1.0,0.7)
		area.add_child(mesh); area.add_child(col); batteries.add_child(area)
		area.body_entered.connect(_on_battery_entered.bind(area, mesh))

func _spawn_traps(cells: Array) -> void:
	var traps := Node3D.new(); traps.name = "SpikeTraps"; add_child(traps)
	for cell in cells:
		var area := Area3D.new()
		area.position = _cell_center(cell) + Vector3(0,0.08,0)
		area.set_meta("triggered", false)
		area.set_meta("spikes", [])
		var plate := MeshInstance3D.new()
		plate.mesh = _box_mesh; plate.scale = Vector3(1.8,0.12,1.8); plate.set_surface_override_material(0,_trap_material)
		area.add_child(plate)
		var col := CollisionShape3D.new(); col.shape = _box_shape; col.scale = Vector3(1.65,0.18,1.65); area.add_child(col)
		for i in range(7):
			var spike := MeshInstance3D.new()
			spike.mesh = _spike_mesh
			spike.position = Vector3(-0.65 + (i%4)*0.43, -0.30, -0.45 + (i/4)*0.9)
			spike.set_surface_override_material(0,_trap_material)
			spike.scale = Vector3(1,0.15,1)
			area.add_child(spike)
			var arr: Array = area.get_meta("spikes"); arr.append(spike); area.set_meta("spikes",arr)
		traps.add_child(area)
		area.body_entered.connect(_on_trap_body_entered.bind(area, plate))

func _spawn_exit(cell: Vector2i) -> void:
	var root := Node3D.new(); root.name = "ExitGate"; root.position = _cell_center(cell); add_child(root)
	_add_box(root, Vector3(-1.15,1.5,0), Vector3(0.35,3.0,0.45), _gate_frame_material, "GatePillarL")
	_add_box(root, Vector3(1.15,1.5,0), Vector3(0.35,3.0,0.45), _gate_frame_material, "GatePillarR")
	_add_box(root, Vector3(0,2.9,0), Vector3(2.65,0.35,0.45), _gate_frame_material, "GateTop")
	var sign := MeshInstance3D.new()
	sign.mesh = _box_mesh; sign.position = Vector3(0,2.35,-0.1); sign.scale = Vector3(1.5,0.45,0.08); sign.set_surface_override_material(0,_exit_material); root.add_child(sign)
	_exit_area = Area3D.new(); _exit_area.position = Vector3(0,1.0,0)
	var col := CollisionShape3D.new(); col.shape = _box_shape; col.scale = Vector3(2.0,2.0,1.5)
	_exit_area.add_child(col); root.add_child(_exit_area)
	_exit_area.body_entered.connect(_on_exit_body_entered)

func _spawn_player(cell: Vector2i) -> void:
	player = PlayerScene.instantiate(); add_child(player)
	player.global_position = _cell_center(cell) + Vector3(0,0.2,0)
	player.sprint_state_changed.connect(_on_sprint_state_changed)
	player.flashlight_state_changed.connect(_on_flashlight_state_changed)

func _spawn_ghost(exit_cell: Vector2i, distances: Dictionary) -> void:
	var candidates: Array = []
	for cell in distances.keys():
		if distances[cell] >= 3: candidates.append(cell)
	var spawn_cell: Vector2i = exit_cell
	if not candidates.is_empty(): candidates.shuffle(); spawn_cell = candidates[0]
	ghost = GhostScene.instantiate(); add_child(ghost)
	ghost.global_position = _cell_center(spawn_cell) + Vector3(0,0.2,0)
	ghost.setup_maze(nav_graph)

func _update_lives_label(lives: int) -> void:
	lives_label.text = "Lives: %d" % lives
func _update_pieces_label() -> void:
	pieces_label.text = "ID Cards: %d / %d" % [pieces_collected,total_pieces]

func _on_piece_area_entered(body: Node3D, piece: Node) -> void:
	if body.is_in_group("player"):
		pieces_collected += 1; _update_pieces_label()
		GameManager.play_sound("pickup",-3.0); piece.queue_free()

func _on_battery_entered(body: Node3D, area: Area3D, mesh: MeshInstance3D) -> void:
	if body.is_in_group("player"):
		if body.has_method("recharge_flashlight"): body.recharge_flashlight(50.0)
		GameManager.play_sound("battery",-2.0)
		flashlight_label.text = "Flashlight [F]: RECHARGED!"
		area.queue_free()

func _on_trap_body_entered(body: Node3D, area: Area3D, plate: MeshInstance3D) -> void:
	if area.get_meta("triggered") or not body.is_in_group("player"): return
	area.set_meta("triggered",true)
	plate.set_surface_override_material(0,_trap_spent_material)
	var spikes: Array = area.get_meta("spikes")
	for spike in spikes:
		var tw := create_tween()
		tw.tween_property(spike,"position:y",0.22,0.12).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	if body.has_method("trigger_trap"): body.trigger_trap(TRAP_STUN_DURATION)
	GameManager.play_sound("trap",-1.0)
	trap_label.text = "SPIKE TRAP! Jump over these next time — Space"
	trap_label.visible = true; _trap_message_timer = 2.5

func _on_exit_body_entered(body: Node3D) -> void:
	if body.is_in_group("player"):
		if pieces_collected >= total_pieces:
			GameManager.play_sound("gate",-2.0)
			wall_label.text = "EXIT OPEN — YOU ESCAPED!"
			await get_tree().create_timer(0.9).timeout
			get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
		else:
			trap_label.text = "Gate locked — collect all %d ID cards!" % total_pieces
			trap_label.visible = true; _trap_message_timer = 2.0

func _on_sprint_state_changed(state: String, seconds: float) -> void:
	match state:
		"ready": sprint_label.text = "Sprint [Z]: READY"
		"active": sprint_label.text = "Sprint [Z]: BOOST (%0.1fs)" % seconds
		"cooldown": sprint_label.text = "Sprint [Z]: cooling down (%0.1fs)" % seconds

func _on_flashlight_state_changed(is_on: bool, battery: float, battery_max: float) -> void:
	var state_text := "ON" if is_on else "OFF"
	flashlight_label.text = "Flashlight [F]: %s - %d s" % [state_text, int(ceil(battery))]
