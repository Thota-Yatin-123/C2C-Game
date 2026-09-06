class_name MazeGenerator
extends RefCounted

# Builds a "perfect" maze (exactly one path between any two cells) with
# randomized recursive backtracking. Each cell remembers which of its four
# sides still has a wall standing - carving a passage between two neighbour
# cells just clears the matching side on each of them.

const DIRS := {
	"N": Vector2i(0, -1),
	"S": Vector2i(0, 1),
	"E": Vector2i(1, 0),
	"W": Vector2i(-1, 0),
}
const OPPOSITE := {"N": "S", "S": "N", "E": "W", "W": "E"}

var width: int
var height: int
var cells: Array = [] # cells[x][y] = {"N":bool,"S":bool,"E":bool,"W":bool,"visited":bool}

func generate(w: int, h: int) -> Array:
	width = w
	height = h
	cells.clear()
	for x in range(width):
		var col: Array = []
		for y in range(height):
			col.append({"N": true, "S": true, "E": true, "W": true, "visited": false})
		cells.append(col)

	var stack: Array = [Vector2i(0, 0)]
	cells[0][0].visited = true
	while not stack.is_empty():
		var current: Vector2i = stack[stack.size() - 1]
		var neighbours := _unvisited_neighbours(current)
		if neighbours.is_empty():
			stack.pop_back()
			continue
		neighbours.shuffle()
		var pick: Array = neighbours[0]
		var dir: String = pick[0]
		var next: Vector2i = pick[1]
		cells[current.x][current.y][dir] = false
		cells[next.x][next.y][OPPOSITE[dir]] = false
		cells[next.x][next.y].visited = true
		stack.append(next)
	return cells

func _unvisited_neighbours(cell: Vector2i) -> Array:
	var result: Array = []
	for dir in DIRS.keys():
		var offset: Vector2i = DIRS[dir]
		var n: Vector2i = cell + offset
		if n.x >= 0 and n.x < width and n.y >= 0 and n.y < height and not cells[n.x][n.y].visited:
			result.append([dir, n])
	return result

func open_neighbours(x: int, y: int) -> Array:
	# Cells directly reachable from (x, y) - i.e. no wall in between.
	var result: Array = []
	var c: Dictionary = cells[x][y]
	if not c["N"] and y > 0:
		result.append(Vector2i(x, y - 1))
	if not c["S"] and y < height - 1:
		result.append(Vector2i(x, y + 1))
	if not c["E"] and x < width - 1:
		result.append(Vector2i(x + 1, y))
	if not c["W"] and x > 0:
		result.append(Vector2i(x - 1, y))
	return result

func dead_ends() -> Array:
	var result: Array = []
	for x in range(width):
		for y in range(height):
			var c: Dictionary = cells[x][y]
			var wall_count := 0
			if c["N"]: wall_count += 1
			if c["S"]: wall_count += 1
			if c["E"]: wall_count += 1
			if c["W"]: wall_count += 1
			if wall_count == 3:
				result.append(Vector2i(x, y))
	return result

func bfs_farthest(start: Vector2i) -> Dictionary:
	# Returns {"cell": Vector2i, "distances": Dictionary[Vector2i, int]}.
	# Used to find the exit (farthest point from spawn) and to gauge how
	# deep into the maze any given cell is.
	var distances := {start: 0}
	var queue: Array = [start]
	var farthest := start
	var farthest_dist := 0
	while not queue.is_empty():
		var current: Vector2i = queue.pop_front()
		for n in open_neighbours(current.x, current.y):
			if not distances.has(n):
				distances[n] = distances[current] + 1
				if distances[n] > farthest_dist:
					farthest_dist = distances[n]
					farthest = n
				queue.append(n)
	return {"cell": farthest, "distances": distances}
