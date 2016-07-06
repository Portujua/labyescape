class GA
{
	static POPULATION_SIZE()
	{
		return 200;
	}

	static ELITISM()
	{
		return 0.1;
	}

	constructor()
	{

	}

	generateNextGen(_players)
	{
		let players = _players;
		let new_gen = [];

		// Ordenamos
		players.sort(function(a,b){
			return a.fitness - b.fitness; // b-a es mayor mejor
		});

		// Elitismo
		let el = Math.floor(GA.POPULATION_SIZE() * GA.ELITISM());

		for (let i = 0; i < el; i++)
		{
			players[i].resetPlayer();
			new_gen.push(players[i]);
		}

		// Reproduzco los elites
		while (new_gen.length < GA.POPULATION_SIZE())
		{
			let a = Math.floor(Math.random() * el);
			let b = Math.floor(Math.random() * el);
			while (a == b) {b = Math.floor(Math.random() * el);}

			new_gen.push(this.crossover(players[a], players[b]));
		}

		// Mutacion
		for (let i = 0; i < new_gen.length; i++)			
			for (let g = 0; g < LabyEscape.MOVES_PER_PLAYER(); g++)
				if (Math.random() < Cromosome.MUTATION_CHANCE())
					new_gen[i].cromosome.genes[g] = Cromosome.getRandomGen();

		return new_gen;
	}

	crossover(a, b)
	{
		let _new = new Player();

		let crossover_point = Math.floor(Math.random() * LabyEscape.MOVES_PER_PLAYER());

		for (let i = 0; i < LabyEscape.MOVES_PER_PLAYER(); i++)
			if (i <= crossover_point)
				_new.cromosome.genes[i] = a.cromosome.genes[i];
			else
				_new.cromosome.genes[i] = b.cromosome.genes[i];

		return _new;
	}
}