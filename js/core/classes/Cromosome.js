class Cromosome
{
	static MUTATION_CHANCE()
	{
		return 0.05;
	}

	static UP()
	{
		return 0;
	}

	static RIGHT()
	{
		return 1;
	}

	static DOWN()
	{
		return 2;
	}

	static LEFT()
	{
		return 3;
	}

	constructor()
	{
		this.genes = Cromosome.getRandomCromosome();
	}

	static getRandomCromosome()
	{
		let cromosome = [];

		for (let i = 0; i < LabyEscape.MOVES_PER_PLAYER(); i++)
			cromosome.push(Math.floor(Math.random() * 4));

		return cromosome;
	}

	static getRandomGen()
	{
		return Math.floor(Math.random() * 4);
	}
}