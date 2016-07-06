class Graphics
{
	constructor()
	{
		this.c = document.getElementById("canvas");
		this.ctx = this.c.getContext("2d");
	}

	drawRect(point, width, height, color = "#000000")
	{
		this.ctx.fillStyle = color;

		// Coordenadas normales (Y aumenta hacia arriba)
		//this.ctx.fillRect(point.x, this.ctx.canvas.height - point.y, width, -height);

		// Coordenadas monitor (Y aumenta hacia abajo)
		this.ctx.fillRect(point.x, point.y, width, height);
	}

	drawPoint(point, color = "#000000")
	{
		this.ctx.fillStyle = color;
		this.ctx.fillRect(point.x, point.y, 1, 1);
	}

	setDimension(width, height)
	{
		this.ctx.canvas.width = width;
		this.ctx.canvas.height = height;
	}

	getWidth()
	{
		return this.ctx.canvas.width;
	}

	getHeight()
	{
		return this.ctx.canvas.height;
	}

	clear()
	{
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
}