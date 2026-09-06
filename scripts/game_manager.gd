extends Node

signal lives_changed(lives: int)

const MAX_LIVES: int = 3

var _sounds: Dictionary = {}

func _ready() -> void:
	for key in ["pickup", "battery", "jump", "trap", "gate", "warning", "ghost", "ambient", "battery_empty"]:
		var path := "res://assets/%s.wav" % key
		if ResourceLoader.exists(path):
			_sounds[key] = load(path)

func play_sound(key: String, volume_db: float = 0.0) -> void:
	if not _sounds.has(key):
		return
	var p := AudioStreamPlayer.new()
	p.stream = _sounds[key]
	p.volume_db = volume_db
	get_tree().root.add_child(p)
	p.finished.connect(p.queue_free)
	p.play()


var lives: int = MAX_LIVES
var current_level_path: String = "res://scenes/level_1.tscn"

func start_game() -> void:
	lives = MAX_LIVES
	lives_changed.emit(lives)
	get_tree().change_scene_to_file(current_level_path)

# Called by the ghost the moment it catches the player. Freezes the player,
# plays the jumpscare, then applies the life loss / level reload.
func handle_player_caught(player: Node3D) -> void:
	if player:
		if player.has_method("set_physics_process"):
			player.set_physics_process(false)
		if player.has_method("set_process_unhandled_input"):
			player.set_process_unhandled_input(false)
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	await _play_jumpscare()
	player_caught()

func player_caught() -> void:
	lives -= 1
	lives_changed.emit(lives)
	if lives <= 0:
		get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
	else:
		# "Start the level again" - reload the current level fresh.
		get_tree().reload_current_scene()

func quit_game() -> void:
	get_tree().quit()

func _play_jumpscare() -> void:
	var layer := CanvasLayer.new()
	layer.layer = 100
	get_tree().root.add_child(layer)

	var flash := ColorRect.new()
	flash.color = Color(0, 0, 0, 1)
	flash.anchor_right = 1.0
	flash.anchor_bottom = 1.0
	layer.add_child(flash)

	var death_label := Label.new()
	death_label.text = "YOU DIED!!!"
	death_label.add_theme_color_override("font_color", Color(0.85, 0.02, 0.02))
	death_label.add_theme_font_size_override("font_size", 96)
	death_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	death_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	death_label.anchor_right = 1.0
	death_label.anchor_bottom = 1.0
	death_label.modulate = Color(1, 1, 1, 0)
	layer.add_child(death_label)

	# Let the label finish one layout pass before we scale it around its
	# own center - otherwise its computed size (and pivot) is still zero.
	await get_tree().process_frame
	death_label.pivot_offset = death_label.size / 2.0
	death_label.scale = Vector2(2.2, 2.2)

	# Rapid strobe before the text slams in, to sell the jumpscare.
	var flicker_colors := [
		Color(0.5, 0, 0, 1), Color(0, 0, 0, 1), Color(1, 1, 1, 1),
		Color(0.5, 0, 0, 1), Color(0, 0, 0, 1),
	]
	for c in flicker_colors:
		flash.color = c
		await get_tree().create_timer(0.06).timeout
	flash.color = Color(0.45, 0, 0, 0.85)

	var tween := create_tween()
	tween.tween_property(death_label, "modulate:a", 1.0, 0.15)
	tween.parallel().tween_property(death_label, "scale", Vector2(1.0, 1.0), 0.25).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	await tween.finished

	await get_tree().create_timer(1.1).timeout
	layer.queue_free()
