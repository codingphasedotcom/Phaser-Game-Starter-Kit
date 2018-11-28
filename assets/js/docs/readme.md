// check if player colliding with tile down returns true or false
this.player.body.blocked.down;

// check if player colliding with sprite down returns true or false
this.player.body.touching.down;

// set collision in tites editor
worldLayer.setCollisionByProperty({ collides: true });

//zoom in camera
this.cameras.main.setZoom(1.5);
