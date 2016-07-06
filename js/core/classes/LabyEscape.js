class LabyEscape
{
	static SPEED()
	{
		return 1;
	}

	static MOVES_PER_PLAYER()
	{
		return 540; // 30x30 donde solo el 60% son caminables
	}

	constructor()
	{
		LabyEscape.graphics = new Graphics();
		LabyEscape.graphics.setDimension(600, 600);

		this.speed = LabyEscape.SPEED();

		this.map = new Map();
		this.ga = new GA();

		this.players = [];

		this.init();
	}

	init()
	{
		this.generation = 1;
		this.current_player = 0;
		this.current_move = 0;

		this.best_fitness = 0.00;
		this.best_fitness_gen = 0;

		this.isRunning = false;

		this.run();
	}

	start()
	{
		for (let i = 0; i < GA.POPULATION_SIZE(); i++)
			this.players.push(new Player());

		this.isRunning = true;

		$(".generate_new").hide();
		$(".start").hide();
		$(".pause").show();
	}

	tick()
	{
		if (!this.isRunning) return;

		$(".current_generation span").html(this.generation);
		$(".current_player span").html(this.current_player+1);
		$(".best_fitness span").html(this.best_fitness);
		$(".best_fitness_gen span").html(this.best_fitness_gen);

		// Veo si llego .. Aqui para que se pinte el cuadro en la salida
		if (this.map.isExit(this.players[this.current_player].position))
		{
			let mult = this.current_move - 1 < LabyEscape.MOVES_PER_PLAYER() ? LabyEscape.MOVES_PER_PLAYER() - this.current_move - 1 : 1;

			this.players[this.current_player].fitness *= mult;
			console.log("GANADOR! en ", (this.current_move - 1), " pasos: ", this.players[this.current_player]);
			$(".best_end_steps span").removeClass("hide");
			$(".best_end_steps span").html(this.current_move - 1);

			this.current_move = LabyEscape.MOVES_PER_PLAYER();
		}
		else
		{
			let m_vector = this.players[this.current_player].getMoveVector(this.current_move);
			let f_pos = new Point(
				this.players[this.current_player].position.x + m_vector.x,
				this.players[this.current_player].position.y + m_vector.y
			);

			if (this.map.isWalkeable(f_pos))
			{
				this.players[this.current_player].position.x += m_vector.x;
				this.players[this.current_player].position.y += m_vector.y;

				let f_pos_str = "x=" + f_pos.x + ",y=" + f_pos.y;

				if (this.players[this.current_player].walked_sqms.indexOf(f_pos_str) == -1)
				{
					this.players[this.current_player].fitness += this.map.getSqmFitness(f_pos);
					this.players[this.current_player].walked_sqms.push(f_pos_str);
				}
			}

			this.current_move++;
		}

		// Veo si debo pasar al siguiente player
		if (this.current_move >= LabyEscape.MOVES_PER_PLAYER())
		{
			//Console.add("Player #" + (this.current_player+1) + " fitness: " + this.players[this.current_player].getFitness());

			this.players[this.current_player].fitness = this.players[this.current_player].getFitness();

			if (this.players[this.current_player].fitness > this.best_fitness)
			{
				this.best_fitness = this.players[this.current_player].fitness;
				this.best_fitness_gen = this.generation;
			}

			this.current_move = 0;
			this.current_player++;
		}

		// Veo si debo pasar a la siguiente generacion
		if (this.current_player == GA.POPULATION_SIZE())
		{
			this.current_player = 0;
			this.generation++;
			this.players = this.ga.generateNextGen(this.players);
		}
	}

	draw()
	{
		LabyEscape.graphics.clear();

		this.map.draw();

		if (this.players.length > 0 && this.isRunning)
			this.map.drawPlayer(this.players[this.current_player].position);
	}

	run()
	{
		this.tick();
		this.draw();

		// while true
		setTimeout(() => this.run(), this.speed);
	}
}