import Phaser from 'phaser';
export default class Level1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}
	preload() {
		this.load.image('sky', '/assets/img/sky.png');
		this.load.image('ground', '/assets/img/platform.png');
		this.load.image('star', '/assets/img/star.png');
		this.load.image('bomb', '/assets/img/bomb.png');
		this.load.spritesheet('dude', '/assets/img/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		});
	}
	create() {
		this.add.image(400, 300, 'sky');
		this.add.image(400, 300, 'star');
		this.platforms = this.physics.add.staticGroup();
		this.platforms
			.create(0, 0, 'ground')
			.setOrigin(0, 0)
			.setScale(1)
			.refreshBody();
		this.platforms
			.create(300, 200, 'ground')
			.setOrigin(0, 0)
			.setScale(1)
			.refreshBody();
		this.platforms
			.create(500, 100, 'ground')
			.setOrigin(0, 0)
			.refreshBody();
		this.platforms
			.create(0, 340, 'ground')
			.setOrigin(0, 0)
			.setScale(2)
			.refreshBody();
		this.player = this.physics.add.sprite(100, 150, 'dude');

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 5,
				end: 8
			}),
			frameRate: 10,
			repeat: -1
		});
		this.player.body.setGravityY(300);
		this.physics.add.collider(player, platforms);
	}
	update(delta) {
		this.cursors = this.input.keyboard.createCursorKeys();
		if (cursors.left.isDown) {
			player.setVelocityX(-160);

			player.anims.play('left', true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(160);

			player.anims.play('right', true);
		} else {
			player.setVelocityX(0);

			player.anims.play('turn');
		}

		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330);
		}
	}
}
