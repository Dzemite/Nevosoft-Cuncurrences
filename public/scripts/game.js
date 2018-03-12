define(['../lib/pixi.js/dist/pixi.min'], function(PIXI) {
	
	const app = new PIXI.Application(800, 600, {backgroundColor : 0xffffff});
	
	//app.screen.width = document.documentElement.clientWidth;
	//app.screen.height = document.documentElement.clientHeight;

	const scene = new PIXI.Container();
	scene.interactive = true;

	const start = function() {
		PIXI.loader
			.add('background', '../assets/img/game_area.png')
			.add('chip', '../assets/img/chip.png')
			.add('glow', '../assets/img/glow.png')
			.load(onAssetsLoaded);
	};

	function onAssetsLoaded(loader, resources) {

		document.getElementById('game').appendChild(app.view);

		scene.addChild(createSprite(resources.glow, 'someText'));

		//document.getElementById('game').appendChild(app.view);

		animate();
	}

	var textStyle = { fill: 0xffffff };
	function createSprite(img, text) {
		var texture = PIXI.Texture.fromImage(img);
		var sprite = new PIXI.Spreite(texture);
		sprite.addChild(new PIXI.Text(text, textStyle));
		sprite.anchor.set(0.5, 1);
		sprite.children[0].anchor.set(0.5, 0);
		sprite.interactive=true;
		sprite.on('click', function() { this.alpha = 1.7 - this.alpha; } );
		return sprite;
	}

	// Create a new texture
	//var texture = PIXI.Texture.fromImage('../assets/img/game_area.png');

	//var back = new PIXI.Sprite(texture);
        //container.addChild(back);

        // Listen for animate update
        app.ticker.add(function(delta) {
	     	
	});

	function animate(){
		requestAnimationFrame(animate);

		app.render(scene);
	}

	return {
		start: start
	};
});
