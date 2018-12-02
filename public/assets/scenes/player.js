export default class Player {
	constructor(scene, x, y) {
		this.scene = scene;
		this.sprite = scene.physics.add
			.sprite(x, y, 'jacen')
			.setDrag(1000, 0)
			.setMaxVelocity(300, 400);
		this.sprite.setBounce(0.1);
		this.sprite.setCollideWorldBounds(true);
		this.sprite.body.setGravityY(300);
		this.sprite.setSize(16, 16, true).setOffset(8, 15);

		const anims = scene.anims;

		var test = [
			{ key: 'char_sprites', frame: 'jacen2.png' },
			{ key: 'char_sprites', frame: 'jacen3.png' },
			{ key: 'char_sprites', frame: 'jacen4.png' },
			{ key: 'char_sprites', frame: 'jacen5.png' }
		];
		anims.create({
			key: 'turn',
			frames: [{ key: 'char_sprites', frame: 'jacen1.png' }],
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'right',
			frames: test,
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'left',
			frames: test,
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'jump',
			frames: [{ key: 'char_sprites', frame: 'jacen_jump.png' }],
			frameRate: 10,
			repeat: -1
		});
		this.userJumps = 0;

		// this.spacebar = scene.input.keyboard.addKey(
		// 	scene.input.Keyboard.KeyCodes.SPACE
		// );
		this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		console.log()
	}

	update(time, delta) {
		let scene = this
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		if (this.cursors.left.isDown) {
			this.sprite.setVelocityX(-160);
			// this.sprite.setOrigin(0.5, 0.5);
			this.sprite.flipX = true;
			this.sprite.anims.play('left', true);
		} else if (this.cursors.right.isDown) {
			this.sprite.setVelocityX(160);
			this.sprite.flipX = false;
			this.sprite.anims.play('right', true);
		} else {
			this.sprite.setVelocityX(0);

			this.sprite.anims.play('turn');
		}
		// jump if on the ground
		// if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.sprite.body.blocked.down) {
		// 	if (this.userJumps < 3) {
		// 		this.userJumps += 1;
		// 		this.sprite.setVelocityY(-500);
		// 		this.sprite.anims.play('jump');
		// 		console.log(`Jumps: ${this.userJumps}`);
		// 	}
		// }
		// jump if on the ground
		if ((Phaser.Input.Keyboard.JustDown(this.spacebar) && this.userJumps < 1) ) {

			this.userJumps += 1;
			this.sprite.setVelocityY(-300);
			console.log('pressing again')
			console.log(`Jumps: ${this.userJumps}`);
		}

		if (!this.sprite.body.blocked.down) {
			this.sprite.anims.play('jump');
		}

		if (this.sprite.body.blocked.down) {
			this.userJumps = 0;
			console.log(`Jumps: ${this.userJumps}`);
			// this.sprite.anims.play('jump');
		}
	}

	destroy() {
		this.sprite.destroy();
	}
}
