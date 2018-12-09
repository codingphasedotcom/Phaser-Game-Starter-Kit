// import { Scene } from 'phaser';
import Player from './player.js';
export default class Level1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}
	preload() {
		var progress = this.add.graphics();
		const self = this;
		this.load.on('progress', function(value) {
			console.log(self.world);
			var text = self.make.text({
				x: 100,
				y: 100,
				text: `Loading ${Math.floor(100 * value)}%`,
				style: {
					font: '64px Arial',
					fill: '#ffffff',
					align: 'center',
					backgroundColor: '#000000'
				}
			});
			progress.clear();
			progress.fillStyle(0x42f456, 1);
			progress.fillRect(0, 300, 800 * value, 20);
		});

		this.load.on('complete', function() {
			progress.destroy();
		});
		// load tiles
		this.load.atlas({
			key: 'char_sprites',
			textureURL: '/assets/img/sprites/sprites.png',
			atlasURL: '/assets/img/sprites/sprites.json'
		});

		this.load.image('tiles', '/assets/img/arcade_platformerV2-transparent.png');
		this.load.tilemapTiledJSON('map', '/assets/img/platformTiled.json');
		// images
		this.load.image('ground', '/assets/img/platform.png');
		this.load.image('star', '/assets/img/star.png');
		this.load.image('bomb', '/assets/img/bomb.png');
		this.load.spritesheet('jacen', '/assets/img/jacen.png', {
			frameWidth: 32,
			frameHeight: 32
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
		worldLayer.setCollisionByProperty({
			collides: true
		});
		//set camera bound to level
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setZoom(2);

		// DEBUG COlliders
		// const debugGraphics = this.add.graphics().setAlpha(0.75);
		// worldLayer.renderDebug(debugGraphics, {
		// 	tileColor: null, // Color of non-colliding tiles
		// 	collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		// 	faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		// });
		this.physics.world.bounds.width = backgroundLayer.width;
		this.physics.world.bounds.height = backgroundLayer.height;

		this.bgmusic1 = this.sound.add('bgmusic1');
		this.bgmusic1.play();
		//////////
		const spawns = map.objects.find(obj => obj.name == 'spawns');

		this.start_spawn = spawns.objects.find(obj => obj.name == 'start_spawn');
		this.end_spawn = spawns.objects.find(obj => obj.name == 'end_spawn');
		// console.log(start_spawn);
		// let end_spawn = map.objects.find(obj => obj.name == 'end_spawn').objects[0];

		this.player = new Player(this, this.start_spawn.x, this.start_spawn.y);
		this.physics.add.collider(this.player.sprite, worldLayer);
		this.cameras.main.startFollow(this.player.sprite);

		// stars
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 20,
			setXY: {
				x: 20,
				y: 0,
				stepX: 100
			}
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

		function collectStar(player, star) {
			var coin_sound = this.sound.add('coin_sound');
			coin_sound.play();
			this.score += 1;
			console.log(this.score);
			star.disableBody(true, true);
		}

		function fallDeath() {
			console.log('died');
			this.bgmusic1.stop();
			this.scene.start('Level1');
		}
		// Falls == Death
		this.bottomRectangle = this.add
			.zone(100, this.physics.world.bounds.height - 10)
			.setSize(this.physics.world.bounds.width, 100);
		this.physics.world.enable(this.bottomRectangle);
		this.bottomRectangle.body.setAllowGravity(false);
		this.bottomRectangle.body.moves = false;

		this.physics.add.overlap(
			this.player.sprite,
			this.bottomRectangle,
			fallDeath,
			null,
			this
		);
		// Complete level
		this.complete_level = this.add
			.zone(this.end_spawn.x, this.end_spawn.y)
			.setSize(100, 100);
		this.physics.world.enable(this.complete_level);
		this.complete_level.body.setAllowGravity(false);
		this.complete_level.body.moves = false;

		this.physics.add.overlap(
			this.player.sprite,
			this.complete_level,
			fallDeath,
			null,
			this
		);
	}
	update(time, delta) {
		this.player.update();
	}
}
