extends Control

func _ready() -> void:
	$ButtonBox/StartButton.pressed.connect(_on_start_pressed)
	$ButtonBox/QuitButton.pressed.connect(_on_quit_pressed)
	$ButtonBox/StartButton.grab_focus()

func _on_start_pressed() -> void:
	GameManager.start_game()

func _on_quit_pressed() -> void:
	GameManager.quit_game()
