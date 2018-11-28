import { Scene } from 'phaser';
export default class Intro extends Scene {
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

		let loadingBar = this.add.graphics({
			fillStyle: {
				color: 0x000000
			}
		});
		for (let i = 0; i < 100; i++) {
			this.load.image('star', '/assets/img/star.png');
		}

		var progress = this.add.graphics();

		this.load.on('progress', function(value) {
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, 270, 800 * value, 60);
		});

		this.load.on('complete', function() {
			progress.destroy();
		});
	}
	create() {
		this.make.text({
			x: 100,
			y: 100,
			text: 'Press Space Bar',
			style: {
				fontSize: '64px',
				fontFamily: 'Arial',
				color: '#ffffff',
				align: 'center',
				backgroundColor: '#ff00ff',
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
					.text(16, 0, `Jacen's Journey`, {
						fontFamily: 'Fredericka the Great',
						fontSize: 80,
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
