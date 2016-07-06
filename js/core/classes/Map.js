class Map
{
	static WALL()
	{
		return "w";
	}

	static FLOOR()
	{
		return "";
	}

	static START()
	{
		return 3;
	}

	static EXIT()
	{
		return 4;
	}

	static OPTIMUM()
	{
		return 5;
	}

	static BASE_FITNESS()
	{
		return 100;
	}

	static WALKEABLE_PERCENTAGE()
	{
		return 0.6;
	}

	static VERTICAL()
	{
		return 0;
	}

	static HORIZONTAL()
	{
		return 1;
	}

	constructor()
	{
		// TODO: procedural
		this.map = [ // 10x7
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
			[0, 5, 5, 5, 0, 0, 1, 0, 1, 0],
			[0, 5, 0, 5, 5, 0, 1, 0, 5, 4],
			[0, 5, 0, 0, 5, 5, 1, 0, 5, 0],
			[0, 5, 0, 1, 0, 5, 0, 0, 5, 0],
			[0, 3, 1, 1, 0, 5, 5, 5, 5, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		this.generateRandom_(31, 1); // 31
	}

	// Metodo para obtener los "hijos" de una coordenada dentro de la matriz
	// Los hijos de una coordenada son aquellos valores que son caminables dentro de la matriz (piso, escaleras)
	getChilds(x, y, visited, allPaths)
	{
		// Como solamente nos podemos mover en 4 direcciones solo debemos ver esas direcciones
    	// Creamos la matriz de hijos que vamos a devolver
		let allChilds = [];

	    // Si a la izquierda hay piso/escalera y no he visitado ese nodo, es un hijo valido
	    try {
		    if (
			    	(this.map[y][x-1] != 'w') && 
			    	(
			    		!visited.has_coord(new Point(x-1, y)) ||
			    		allPaths.has_coord(new Point(x, y-1))
			    	)
		    	)
		        allChilds.push(new Point(x-1, y))
		}
		catch (e) {}
	        
	    // Si a la derecha hay piso/escalera y no he visitado ese nodo, es un hijo valido
	    try {
		    if (
			    	(this.map[y][x+1] != 'w') && 
			    	(
			    		!visited.has_coord(new Point(x+1, y)) ||
			    		allPaths.has_coord(new Point(x, y-1))
			    	)
		    	)
		        allChilds.push(new Point(x+1, y))
		}
		catch (e) {}
	        
	    // Si arriba hay piso/escalera y no he visitado ese nodo, es un hijo valido
	    try {
		    if (
			    	(this.map[y-1][x] != 'w') && 
			    	(
			    		!visited.has_coord(new Point(x, y-1)) ||
			    		allPaths.has_coord(new Point(x, y-1))
			    	)
		    	)
		        allChilds.push(new Point(x, y-1))
		}
		catch (e) {}
	        
	    // Si abajo hay piso/escalera y no he visitado ese nodo, es un hijo valido
	    try {
		    if (
			    	(this.map[y+1][x] != 'w') && 
			    	(
			    		!visited.has_coord(new Point(x, y+1)) ||
			    		allPaths.has_coord(new Point(x, y-1))
			    	)
		    	)
		        allChilds.push(new Point(x, y+1))
		}
		catch (e) {}
	        
	    return allChilds;
	}

	// Metodo para ir de una coordenada A a una coordenada B dentro de la matriz
	// de manera recursiva
	// a,b son vectores (x,y), path es la matriz de matrices de todos los caminos posibles (la que vamos a devolver)
	// visited son los nodos que ya visitamos, al llamar la funcion por primera vez se envia Vacio
	// Le enviamos dos puntos A,B en coordenadas del mapa
	getPathTo(a, b, path, visited, allPaths, iteration)
	{
	    // Marcamos como visitado el nodo actual
	    visited.push(a)

	    // Buscamos los hijos
	    let aChilds = this.getChilds(a.x, a.y, visited, allPaths);

	    // Si A no tiene hijos, llegamos a una calle ciega
	    if (aChilds.length == 0)
	        return false;
	    
	    
	    // Recorremos todos los hijos de A
	    for (var i = 0; i < aChilds.length; i++)
	    {
	    	let child = aChilds[i];

	        // Anadimos el nodo actual al camino
	        path.push(child);

	        // Chequeamos si es nuestro destino
	        if (child.equal(b))
	            return true;
	        // Sino llamamos recursivamente a la funcion con el nuevo hijo para que busque hijos en el
	        else
	        {
	            let arrived = this.getPathTo(child, b, path, visited, allPaths, iteration+1);
	            // Chequeamos si llegamos por alguno de los hijos
	            // Si no llegamos, sacamos al nodo actual del camino
	            if (arrived === false)
	                path.pop();//path.remove(child) //AQUIQUEDEHACERELREMOVE!!!!!!!!!
	            // Si en efecto llegamos, devolvemos TRUE para finalizar todo
	            else
	            {
	                // Chequeamos, si iteration = 0 es que estamos en el primer loop
	                // Y debemos devolver el camino en vez de True
	                if (iteration == 0)
	                {
	                    //print("Camino: ", path)
	                    //return path
	                    allPaths.push(path);
	                    path = [];
	                }
	                else
	                    return true;
	            }
	        }
	    }
	    // Si terminamos de recorrer todos los hijos y no llegamos, devolvemos FALSE
	    // Chequeamos si estamos en el loop principal, si es asi entonces devolvemos el mismo punto donde estabamos
	    if (iteration == 0)
	    {
	        if (allPaths.length > 0)
	        {
	            // Creamos una variable para guardar el camino mas corto
	            let shortestPath = allPaths[0];
	            let shortestLength = shortestPath.length;
	            
	            // Vemos cual de todos es el mas corto
	            for (var k = 0; k < allPaths.length; k++)
	            {
	            	let p = allPaths[k];

	                if (p.length < shortestLength)
	                {
	                    shortestPath = p;
	                    shortestLength = p.length;
	                	console.log("Un camino de ", p.length, " es: ", p);
	            	}
	            }
	            
	            //print("")
	            console.log("El mas corto fue de ", shortestLength, " y es: ", shortestPath);
	            return shortestPath;
	        }
	        else
	            return null;
	    }
	    else // Sino, devolvemos falso para notificar que termino el loop y no encontro camino con ese hijo
	        return false;
	}

	getPathToExit()
	{
		console.log("Buscando salida...");
		let optimun_path = this.getPathTo(Map.start_position, Map.end_position, [], [], [], 0);

		for (let i = 0; i < optimun_path.length-1; i++)
			this.map[optimun_path[i].y][optimun_path[i].x] = Map.OPTIMUM();
	}

	generateRandom_(dimensions, numDoors)
	{
		let e = false, s = false;

		while (!e || !s)
		{
			e = false;
			s = false;

			this.generateRandom(dimensions, numDoors);

			// Entrada
			while (!e)
			{
				let r = Math.floor(Math.random() * dimensions);

				if (this.map[r][1] == Map.FLOOR())
				{
					e = true;
					this.map[r][1] = Map.START();

					Map.start_position = new Point(1, r);
				}
			}

			// Salida
			for (let i = 1; i < dimensions - 2; i++)
				if (this.map[0][i] == Map.FLOOR())
				{
					s = true;
					this.map[0][i] = Map.EXIT();
					Map.end_position = new Point(i, 0);
					break;
				}

			// Cierro el resto
			for (let y = 0; y < dimensions; y++)
				for (let x = 0; x < dimensions; x++)
					if (x == 0 || x+1 == dimensions || y == 0 || y+1 == dimensions)
						if (this.map[y][x] == Map.FLOOR())
							this.map[y][x] = Map.WALL();
		}

		this.getPathToExit();
	}

	isWalkeable(sqm)
	{
		return this.map[sqm.y][sqm.x] != Map.WALL();
	}

	isExit(sqm)
	{
		return this.map[sqm.y][sqm.x] == Map.EXIT();
	}

	getSqmFitness(sqm)
	{
		return Map.BASE_FITNESS() * (this.map[sqm.y][sqm.x] == Map.OPTIMUM());
	}

	draw()
	{
		let width = LabyEscape.graphics.getWidth() / this.map[0].length;
		let height = LabyEscape.graphics.getHeight() / this.map.length;

		for (let y = 0; y < this.map.length; y++)
			for (let x = 0; x < this.map[y].length; x++)
			{
				let color = "#000000";

				if (this.map[y][x] == Map.FLOOR())
					color = "#FFFFFF";
				if (this.map[y][x] == Map.OPTIMUM())
					color = "#FF00FF";
				if (this.map[y][x] == Map.START())
					color = "#00FF00";
				if (this.map[y][x] == Map.EXIT())
					color = "#FF0000";

				LabyEscape.graphics.drawRect(new Point(x * width, y * height), width, height, color);
			}
	}

	drawPlayer(player_position)
	{
		let width = LabyEscape.graphics.getWidth() / this.map[0].length;
		let height = LabyEscape.graphics.getHeight() / this.map.length;

		LabyEscape.graphics.drawRect(new Point(player_position.x * width, player_position.y * height), width, height, "#0000FF");
	}
















	generateRandom(dimensions, numDoors)
	{
		this.grid = new Array();
	    for (var i = 0; i < dimensions; i++) {
	        this.grid[i] = new Array();

	        for (var j = 0; j < dimensions; j++) {
	            this.grid[i][j] = "";
	        }
	    }

	    this.addOuterWalls();
	    let ent = this.addEntrance();
	    this.addInnerWalls(true, 1, this.grid.length - 2, 1, this.grid.length - 2, ent);

	    this.map = this.grid;
	}

	addOuterWalls()
	{
	    for (let i = 0; i < this.grid.length; i++) 
	    {
	        if (i == 0 || i == (this.grid.length - 1))
	            for (let j = 0; j < this.grid.length; j++) 
	                this.grid[i][j] = "w";
	        else 
	        {
	            this.grid[i][0] = "w";
	            this.grid[i][this.grid.length - 1] = "w";
	        }
	    }
	}

	addEntrance()
	{
	    let x = this.randomNumber(1, this.grid.length - 1);
	    this.grid[this.grid.length - 1][x] = "g";
	    return x;
	}

	addInnerWalls(h, minX, maxX, minY, maxY, gate)
	{
	    if (h)
	    {
	        if (maxX - minX < 2)
	            return;

	        let y = Math.floor(this.randomNumber(minY, maxY)/2)*2;
	        this.addHWall(minX, maxX, y);

	        this.addInnerWalls(!h, minX, maxX, minY, y-1, gate);
	        this.addInnerWalls(!h, minX, maxX, y + 1, maxY, gate);
	    } 
	    else
	    {
	        if (maxY - minY < 2)
	            return;

	        let x = Math.floor(this.randomNumber(minX, maxX)/2)*2;
	        this.addVWall(minY, maxY, x);

	        this.addInnerWalls(!h, minX, x-1, minY, maxY, gate);
	        this.addInnerWalls(!h, x + 1, maxX, minY, maxY, gate);
	    }
	}

	addHWall(minX, maxX, y)
	{
	    let hole = Math.floor(this.randomNumber(minX, maxX)/2)*2+1;

	    for (let i = minX; i <= maxX; i++)
	    {
	        if (i == hole) this.grid[y][i] = "";
	        else this.grid[y][i] = "w";
	    }
	}

	addVWall(minY, maxY, x)
	{
	    let hole = Math.floor(this.randomNumber(minY, maxY)/2)*2+1;

	    for (let i = minY; i <= maxY; i++)
	    {
	        if (i == hole) this.grid[i][x] = "";
	        else this.grid[i][x] = "w";
	    }
	}

	randomNumber(min, max)
	{
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}
}