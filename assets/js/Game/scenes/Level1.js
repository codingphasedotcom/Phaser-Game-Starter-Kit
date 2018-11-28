import { Scene } from 'phaser';
import Player from './player.js';
export default class Level1 extends Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}
	preload() {
		// load tiles
		this.load.image('tiles', '/assets/img/arcade_platformerV2-transparent.png');
		this.load.tilemapTiledJSON('map', '/assets/img/platformTiled.json');
		// images
		this.load.image('ground', '/assets/img/platform.png');
		this.load.image('star', '/assets/img/star.png');
		this.load.image('bomb', '/assets/img/bomb.png');
		this.load.spritesheet('dude', '/assets/img/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		});
		// audio
		this.load.audio('coin_sound', ['assets/audio/sfx_sounds_pause4_in.wav']);
		this.load.audio('bgmusic1', ['assets/audio/Trevor_Lentz.mp3']);
	}
	create() {
		//make tilemap
		const map = this.make.tilemap({
			key: 'map',
			tileWidth: 16,
			tileHeight: 16
		});
		// Declare tileset
		const tileset = map.addTilesetImage('arcade_platformerV2', 'tiles');
		const backgroundLayer = map.createStaticLayer('background', tileset, 0, 0);
		const treesLayer = map.createDynamicLayer('trees', tileset, 0, 0);
		const worldLayer = map.createDynamicLayer('Terrain', tileset, 0, 0);
		worldLayer.setCollisionByProperty({ collides: true });
		//set camera bound to level
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		// DEBUG COlliders
		// const debugGraphics = this.add.graphics().setAlpha(0.75);
		// worldLayer.renderDebug(debugGraphics, {
		// 	tileColor: null, // Color of non-colliding tiles
		// 	collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		// 	faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		// });
		this.physics.world.bounds.width = backgroundLayer.width;
		this.physics.world.bounds.height = backgroundLayer.height;

		var bgmusic1 = this.sound.add('bgmusic1');
		// bgmusic1.play();
		//////////
		this.player = new Player(this, 200, 0);
		this.physics.add.collider(this.player.sprite, worldLayer);
		this.cameras.main.startFollow(this.player.sprite);

		// stars
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 20,
			setXY: { x: 20, y: 0, stepX: 100 }
		});

		this.stars.children.iterate(function(child) {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});
		this.physics.add.collider(this.stars, worldLayer);

		this.physics.add.overlap(
			this.player.sprite,
			this.stars,
			collectStar,
			null,
			this
		);
		this.score = 0;
		this.cameras.main.setZoom(1.5);
		function collectStar(player, star) {
			var coin_sound = this.sound.add('coin_sound');
			coin_sound.play();
			this.score += 1;
			console.log(this.score);
			star.disableBody(true, true);
		}
	}
	update(time, delta) {
		this.player.update();
	}
}
