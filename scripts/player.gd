extends CharacterBody3D

signal sprint_state_changed(state: String, seconds_remaining: float)
signal flashlight_state_changed(is_on: bool, battery_remaining: float, battery_max: float)

@export var walk_speed: float = 4.0
@export var run_speed: float = 7.5
@export var mouse_sensitivity: float = 0.003
@export var gravity: float = 18.0
@export var jump_velocity: float = 7.0

@export var sprint_duration: float = 4.0
@export var sprint_cooldown: float = 10.0

@export var flashlight_max_battery: float = 120.0
@export var flashlight_base_energy: float = 3.8

@export var walk_noise_radius: float = 3.5
@export var run_noise_radius: float = 8.0
@export var trap_noise_radius: float = 12.0

var camera_pitch: float = 0.0
var current_noise_radius: float = 0.0
var _sprint_active := false
var _sprint_timer := 0.0
var _sprint_cooldown_remaining := 0.0
var _flashlight_on := false
var _flashlight_battery := 0.0
var _stun_timer := 0.0
var _forced_noise_timer := 0.0
var _jump_was_pressed := false

@onready var camera_pivot: Node3D = $CameraPivot
@onready var flashlight: SpotLight3D = $CameraPivot/Camera3D/HandRig/Flashlight

func _ready() -> void:
	add_to_group("player")
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	_flashlight_battery = flashlight_max_battery
	flashlight.visible = false

func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion and _stun_timer <= 0.0 and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		rotate_y(-event.relative.x * mouse_sensitivity)
		camera_pitch = clamp(camera_pitch - event.relative.y * mouse_sensitivity, deg_to_rad(-60), deg_to_rad(60))
		camera_pivot.rotation.x = camera_pitch

	if Input.is_action_just_pressed("ui_cancel"):
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED else Input.MOUSE_MODE_CAPTURED
	if Input.is_action_just_pressed("sprint"):
		_try_activate_sprint()
	if Input.is_action_just_pressed("flashlight"):
		_toggle_flashlight()

func _try_activate_sprint() -> void:
	if not _sprint_active and _sprint_cooldown_remaining <= 0.0 and _stun_timer <= 0.0:
		_sprint_active = true
		_sprint_timer = sprint_duration

func _toggle_flashlight() -> void:
	if _stun_timer > 0.0:
		return
	if not _flashlight_on and _flashlight_battery <= 0.0:
		return
	_flashlight_on = not _flashlight_on
	flashlight.visible = _flashlight_on
	if _flashlight_on:
		flashlight.light_energy = flashlight_base_energy

func _physics_process(delta: float) -> void:
	_process_sprint(delta)
	_process_flashlight(delta)

	if not is_on_floor():
		velocity.y -= gravity * delta

	if _stun_timer > 0.0:
		_stun_timer -= delta
		velocity.x = move_toward(velocity.x, 0, walk_speed)
		velocity.z = move_toward(velocity.z, 0, walk_speed)
		current_noise_radius = trap_noise_radius if _forced_noise_timer > 0.0 else 0.0
		if _forced_noise_timer > 0.0:
			_forced_noise_timer -= delta
		move_and_slide()
		return

	if Input.is_key_pressed(KEY_SPACE) and is_on_floor() and not _jump_was_pressed:
		velocity.y = jump_velocity
		if has_node("/root/GameManager"):
			GameManager.play_sound("jump")
	_jump_was_pressed = Input.is_key_pressed(KEY_SPACE)

	if _forced_noise_timer > 0.0:
		_forced_noise_timer -= delta

	var input_dir := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
	var direction := (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	var is_moving := direction.length() > 0.01
	var speed := run_speed if _sprint_active else walk_speed

	if is_moving:
		velocity.x = direction.x * speed
		velocity.z = direction.z * speed
	else:
		velocity.x = move_toward(velocity.x, 0, speed)
		velocity.z = move_toward(velocity.z, 0, speed)

	if _forced_noise_timer > 0.0:
		current_noise_radius = trap_noise_radius
	elif not is_moving:
		current_noise_radius = 0.0
	elif _sprint_active:
		current_noise_radius = run_noise_radius
	else:
		current_noise_radius = walk_noise_radius

	move_and_slide()

func _process_sprint(delta: float) -> void:
	if _sprint_active:
		_sprint_timer -= delta
		if _sprint_timer <= 0.0:
			_sprint_active = false
			_sprint_timer = 0.0
			_sprint_cooldown_remaining = sprint_cooldown
		sprint_state_changed.emit("active", max(_sprint_timer, 0.0))
	elif _sprint_cooldown_remaining > 0.0:
		_sprint_cooldown_remaining = max(_sprint_cooldown_remaining - delta, 0.0)
		sprint_state_changed.emit("cooldown", _sprint_cooldown_remaining)
	else:
		sprint_state_changed.emit("ready", 0.0)

func _process_flashlight(delta: float) -> void:
	if _flashlight_on:
		_flashlight_battery = max(_flashlight_battery - delta, 0.0)
		if _flashlight_battery <= 0.0:
			_flashlight_on = false
			flashlight.visible = false
			GameManager.play_sound("battery_empty")
		elif _flashlight_battery < flashlight_max_battery * 0.2:
			flashlight.light_energy = flashlight_base_energy * randf_range(0.45, 1.0)
		else:
			flashlight.light_energy = flashlight_base_energy
	flashlight_state_changed.emit(_flashlight_on, _flashlight_battery, flashlight_max_battery)

func recharge_flashlight(seconds: float) -> void:
	if _flashlight_battery <= 0.0:
		_flashlight_battery = flashlight_max_battery
	else:
		_flashlight_battery = min(_flashlight_battery + seconds, flashlight_max_battery)
	_flashlight_on = true
	flashlight.visible = true
	flashlight.light_energy = flashlight_base_energy
	flashlight_state_changed.emit(_flashlight_on, _flashlight_battery, flashlight_max_battery)

func get_noise_radius() -> float:
	return current_noise_radius

func trigger_trap(stun_duration: float) -> void:
	_stun_timer = max(_stun_timer, stun_duration)
	_forced_noise_timer = stun_duration + 1.2
	_sprint_active = false
