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
		this.sprite.setSize(16, 16, true).setOffset(8, 15)

		const anims = scene.anims;
		anims.create({
			key: 'left',
			frames: anims.generateFrameNumbers('jacen', {
				start: 0,
				end: 4
			}),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'turn',
			frames: [{ key: 'jacen', frame: 0 }],
			frameRate: 10
		});

		anims.create({
			key: 'right',
			frames: anims.generateFrameNumbers('jacen', {
				start: 0,
				end: 4
			}),
			frameRate: 10,
			repeat: -1
		});

		var frameNames = anims.generateFrameNames('dying')
										 console.log(frameNames)
		anims.create({
			key: 'jump',
			frames: anims.generateFrameNumbers('jacen', {
				start: 5,
				end: 6
			}),
			frameRate: 10,
			repeat: -1
		});
	}

	update(time, delta) {
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		if (this.cursors.left.isDown) {
			this.sprite.setVelocityX(-160);
			this.sprite.setOrigin(0.5, 0.5);
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
		if (this.cursors.up.isDown && this.sprite.body.blocked.down) {
			this.sprite.setVelocityY(-500);
			this.sprite.anims.play('jump');
		}
		if(!this.sprite.body.blocked.down){
			this.sprite.anims.play('jump');
		}
	}

	destroy() {
		this.sprite.destroy();
	}
}
