requirejs.config({
    paths: {
        //'pixi': '../lib/pixi.js/dist/pixi.min' 
    }
});

requirejs(['game'], function (Game) {

//     Game.start();


	var app = new PIXI.Application(	document.documentElement.clientWidth, 
									document.documentElement.clientHeight, 
									{backgroundColor: 0x308030});

	document.getElementById('game').appendChild(app.view);

	const sounds = {
		down: document.getElementById("down"),
		up: document.getElementById("up")
	};

	var loader = new PIXI.loaders.Loader();

	loader.add('chip', '../assets/img/chip.png')
		.add('glow', '../assets/img/glow.png')
		.add('game_area', '../assets/img/game_area.png')
		.load(onAssetsLoaded);

	function onAssetsLoaded(loader, resources) {
		var chip = createSprite(resources.chip.texture);
		var glow = createSprite(resources.glow.texture);
		var game_area = createSprite(resources.game_area.texture);

		chip.position.set(250, 250);
		//chip.scale.set(0.6);

		glow.position.set(550, 250);
		//glow.scale.set(0.6);

		game_area.position.set(
			(app.screen.width - game_area.width) / 2 + game_area.width / 2,
			500
		);

		app.stage.addChild(game_area, chip, glow);
	}

	function createSprite(texture) {
		var sprite = new PIXI.Sprite(texture);
		sprite.anchor.set(0.5, 0.5);
		sprite.interactive=true;
		sprite.on('click', function() { console.log('I do smth'); sounds.down.play();} );
		
		return sprite;
	}

});
