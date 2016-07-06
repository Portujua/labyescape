class Player
{
	constructor(position = Map.start_position)
	{
		this.position = new Point(position.x, position.y);
		this.fitness = 0.0;
		this.cromosome = new Cromosome();

		// Lista de los sqm que he caminado
		this.walked_sqms = [];
	}

	getMoveVector(move)
	{
		if (this.cromosome.genes[move] == Cromosome.UP())
			return new Point(0, -1);
		if (this.cromosome.genes[move] == Cromosome.DOWN())
			return new Point(0, 1);

		if (this.cromosome.genes[move] == Cromosome.RIGHT())
			return new Point(1, 0);
		if (this.cromosome.genes[move] == Cromosome.LEFT())
			return new Point(-1, 0);

		console.log(this.cromosome)
		console.log(move, this.cromosome[move])
		debugger;
	}

	resetPlayer()
	{
		this.position = new Point(position.x, position.y);
		this.fitness = 0.0;
		this.walked_sqms = [];
	}

	getFitness()
	{
		return this.fitness;
	}
}