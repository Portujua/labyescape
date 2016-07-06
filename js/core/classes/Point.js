class Point
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	equal(p)
	{
		return p.x == this.x && p.y == this.y;
	}
}