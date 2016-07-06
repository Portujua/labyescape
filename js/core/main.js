var labyescape;

function start()
{
	labyescape = new LabyEscape();
}

function setSpeed(speed)
{
	labyescape.speed = speed;
}

Array.prototype.has_coord = function(a){
	for (var i = 0; i < this.length; i++)
		if (a.x == this[i].x && a.y == this[i].y)
			return true;

	return false;
}