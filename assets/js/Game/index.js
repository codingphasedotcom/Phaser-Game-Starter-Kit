import Phaser from 'phaser';
import Level1 from './scenes/Level1.js';

var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 200
			}
		}
	},
	scene: [Level1]
};

var game = new Phaser.Game(config);
