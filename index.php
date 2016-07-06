<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta charset="utf-8">
		<link id="favicon" rel="shortcut icon" href="favicon.ico">
		<meta http-equiv='cleartype' content='on'>

		<meta name="description" content="">
		<meta name='keywords' content=''>
		<meta name='copyright' content=''>
		<meta name='language' content='ES'>
		<meta name='robots' content=''>
		<meta name='Classification' content='Business'>
		<meta name='author' content='Eduardo Lorenzo, ejlorenzo19@gmail.com'>
		<meta name='rating' content='General'>
		<meta name='revisit-after' content='7 days'>
		<meta name='subtitle' content=''>
		<meta name='target' content='all'>

		<title id="website_title">LabyEscape</title>

		<!-- jQuery -->
		<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="css/style.css" />



		<script type="text/javascript" src="js/core/classes/Point.js"></script>
		<script type="text/javascript" src="js/core/classes/Graphics.js"></script>
		<script type="text/javascript" src="js/core/classes/LabyEscape.js"></script>
		<script type="text/javascript" src="js/core/classes/Map.js"></script>
		<script type="text/javascript" src="js/core/classes/Player.js"></script>
		<script type="text/javascript" src="js/core/classes/Cromosome.js"></script>
		<script type="text/javascript" src="js/core/classes/GA.js"></script>

		<script type="text/javascript" src="js/core/main.js"></script>
	</head>

	<body onload="start();">
		<canvas id="canvas">Loading...</canvas>

		<div class="info">
			<p class="generate_new">
				<button onclick="labyescape.map.generateRandom_(31, 1)">Generar nuevo laberinto</button>
			</p>
			<p class="start"><button onclick="labyescape.start()">Empezar</button></p>

			<p class="pause hide"><button onclick="labyescape.isRunning = !labyescape.isRunning">Pausar/Despausar</button></p>

			<p class="current_generation">Generation #<span></span></p>
			<p class="current_player">Player #<span></span></p>
			<hr/>
			<p class="best_fitness">Best fitness: <span></span></p>
			<p class="best_fitness_gen">en la generacion <span></span></p>
			<p class="best_end_steps hide">en <span></span> pasos</p>

			<p>Velocidad:</p>

			<p><button onclick="setSpeed(1);">Muy rapido</button></p>
			<p><button onclick="setSpeed(50);">Rapido</button></p>
			<p><button onclick="setSpeed(100);">Normal</button></p>
			<p><button onclick="setSpeed(250);">Lento</button></p>
			<p><button onclick="setSpeed(500);">Muy lento</button></p>
		</div>

		<div class="console"></div>
	</body>
</html>