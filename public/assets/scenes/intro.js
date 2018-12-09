// import { Scene } from 'phaser';
export default class Intro extends Phaser.Scene {
	constructor() {
		super({
			key: 'Intro'
		});
	}
	preload() {
		this.load.image('sky', '/assets/img/skypixel.jpg');
		this.load.image('ground', '/assets/img/platform.png');
		this.load.image('star', '/assets/img/star.png');
		this.load.image('bomb', '/assets/img/bomb.png');
		this.load.spritesheet('dude', '/assets/img/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		});
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
		);

		this.load.audio('coin_sound', ['assets/audio/sfx_coin_double4.wav']);

		for (let i = 0; i < 100; i++) {
			this.load.image('star', '/assets/img/star.png');
		}

		var progress = this.add.graphics();
		const self = this;
		this.load.on('progress', function(value) {
			progress.clear();
			progress.fillStyle(0x42f456, 1);
			progress.fillRect(0, 300, 800 * value, 20);
		});

		this.load.on('complete', function() {
			progress.destroy();
			// this.text.destroy();
		});
	}
	create() {
		this.make.text({
			x: 250,
			y: 300,
			text: 'Press Space Bar',
			style: {
				fontSize: '20px',
				fontFamily: 'Arial',
				color: '#ffffff',
				align: 'center',
				backgroundColor: '#000000',
				shadow: {
					color: '#000000',
					fill: true,
					offsetX: 2,
					offsetY: 2,
					blur: 8
				}
			}
		});
		var add = this.add;
		var input = this.input;
		WebFont.load({
			google: {
				families: ['Fredericka the Great']
			},
			active: function() {
				add
					.text(150, 100, `Jacen's Journey`, {
						fontFamily: 'Fredericka the Great',
						fontSize: 50,
						color: '#ffffff'
					})
					.setShadow(2, 2, '#333333', 2, false, true);
			}
		});
		this.keys = this.input.keyboard.addKeys('SPACE');
	}
	update(delta) {
		if (this.keys.SPACE.isDown) {
			this.scene.start('Level1');
		}
	}
}
