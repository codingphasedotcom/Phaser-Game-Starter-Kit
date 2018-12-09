/*
 * SUNNY LAND Woods Demo Code
 * @copyright    2018 Ansimuz
 * @license      {@link https://opensource.org/licenses/MIT | MIT License}
 * Get free assets and code at: www.pixelgameart.org
 * */
var game;
var player;
var gameWidth = 288;
var gameHeight = 192;
var bg_clouds;
var bg_mountains;
var bg_trees;
var globalMap;
var enemies_group;
var items_group;
var audioHurt;
var audioKill;
var audioItem;
var audioJump;
var hurtFlag = false;
var music;
window.onload = function () {
    game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");
    game.state.add('Boot', boot);
    game.state.add('Preload', preload);
    game.state.add('TitleScreen', titleScreen);
    game.state.add('PlayGame', playGame);
    game.state.add('GameOver', gameOver);
    //
    game.state.start('Boot');
}
var boot = function (game) {
}
boot.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/sprites/loading.png');
    },
    create: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.renderer.renderSession.roundPixels = true;
        this.game.state.start('Preload');
    }
}
var preload = function (game) {
};
preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, 'loading');
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        // load title screen
        game.load.image('title', 'assets/sprites/title-screen.png');
        game.load.image('game-over', 'assets/sprites/game-over.png');
        game.load.image('enter', 'assets/sprites/press-enter-text.png');
        game.load.image('credits', 'assets/sprites/credits-text.png');
        game.load.image('instructions', 'assets/sprites/instructions.png');
        // environment
        game.load.image('bg-clouds', 'assets/environment/bg-clouds.png');
        game.load.image("bg-mountains", 'assets/environment/bg-mountains.png');
        game.load.image("bg-trees", 'assets/environment/bg-trees.png');
        // tileset
        game.load.image('tileset', 'assets/environment/tileset.png');
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
        // atlas sprite
        game.load.atlasJSONArray('atlas', 'assets/atlas/atlas.png', 'assets/atlas/atlas.json');
        game.load.atlasJSONArray('atlas-props', 'assets/atlas/atlas-props.png', 'assets/atlas/atlas-props.json');
        // audio
        game.load.audio('music', ['assets/sounds/the_valley.ogg']);
        game.load.audio('kill', ['assets/sounds/enemy-death.ogg']);
        game.load.audio('hurt', ['assets/sounds/hurt.ogg']);
        game.load.audio('item', ['assets/sounds/item.ogg']);
        game.load.audio('jump', ['assets/sounds/jump.ogg']);
    },
    create: function () {
        this.game.state.start('TitleScreen');
    }
}
var titleScreen = function (game) {
};
titleScreen.prototype = {
    create: function () {
        bg_clouds = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'bg-clouds');
        bg_mountains = game.add.tileSprite(0, -20, gameWidth, gameHeight, 'bg-mountains');
        bg_trees = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'bg-trees');
        this.title = game.add.image(gameWidth / 2, 60, 'title');
        this.title.anchor.setTo(0.5);
        var credits = game.add.image(gameWidth / 2, game.height - 12, 'credits');
        credits.anchor.setTo(0.5);
        this.pressEnter = game.add.image(game.width / 2, game.height - 60, 'enter');
        this.pressEnter.anchor.setTo(0.5);
        game.time.events.loop(700, this.blinkText, this);
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.add(this.startGame, this);
        this.state = 1;
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    },
    update: function () {
        bg_mountains.tilePosition.x -= 0.1;
        bg_trees.tilePosition.x -= 0.3;
    },
    startGame: function () {
        if (this.state == 1) {
            this.state = 2;
            this.title2 = game.add.image(game.width / 2, 40, 'instructions');
            this.title2.anchor.setTo(0.5, 0);
            this.title.destroy();
        } else {
            this.game.state.start('PlayGame');
        }
    }
}
var gameOver = function (game) {
};
gameOver.prototype = {
    create: function () {
        music.stop();
        bg_clouds = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'bg-clouds');
        bg_mountains = game.add.tileSprite(0, -20, gameWidth, gameHeight, 'bg-mountains');
        bg_trees = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'bg-trees');
        this.title = game.add.image(gameWidth / 2, 80, 'game-over');
        this.title.anchor.setTo(0.5);
        var credits = game.add.image(gameWidth / 2, game.height - 12, 'credits');
        credits.anchor.setTo(0.5);
        this.pressEnter = game.add.image(game.width / 2, game.height - 40, 'enter');
        this.pressEnter.anchor.setTo(0.5);
        game.time.events.loop(700, this.blinkText, this);
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.add(this.startGame, this);
        this.state = 2;
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    },
    update: function () {
        bg_mountains.tilePosition.x -= 0.1;
        bg_trees.tilePosition.x -= 0.3;
    },
    startGame: function () {
        if (this.state == 1) {
            this.state = 2;
            this.title2 = game.add.image(game.width / 2, 40, 'instructions');
            this.title2.anchor.setTo(0.5, 0);
            this.title.destroy();
        } else {
            this.game.state.start('PlayGame');
        }
    }
}
var playGame = function (game) {
};
playGame.prototype = {
    create: function () {
        this.createBackgrounds();
        this.createTileMap();
        this.populate();
        this.createPlayer(16, 51);
        this.decorWorld();
        this.bindKeys();
        // camera follow
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.startAudios();
    },
    decorWorld: function () {
        this.addProp(4 * 16, 50 * 16, 'leaves');
        this.addProp(-3 * 16, 48 * 16, 'leaves');
        //
        this.addProp(25 * 16, 52 * 16, 'leaves');
//
        this.addProp(34 * 16, 48 * 16, 'leaves');
        this.addProp(33 * 16, 53 * 16, 'leaves');
        //
        this.addProp(27 * 16, 44 * 16, 'leaves');
        this.addProp(36 * 16, 32 * 16, 'leaves');
        // this.addProp(2 * 16, 16 * 16, 'leaves');
        this.addProp(2 * 16, 5 * 16, 'leaves');
        this.addProp(3 * 16, 7 * 16, 'leaves');
        this.addProp(36 * 16, 5 * 16, 'leaves');
        this.addProp(3 * 16, 0 * 16, 'leaves');
        this.addProp(12 * 16, 2 * 16, 'leaves');
        //
        this.addProp(33 * 16, 33 * 16, 'branch-05', true);
        //
        this.addProp(12 * 16, 32 * 16, 'branch-01');
        this.addProp(31 * 16, 21 * 16, 'branch-01');
        this.addProp(5 * 16, 7 * 16, 'branch-01');
        //
        this.addProp(9 * 16, 40 * 16, 'branch-03');
    },
    startAudios: function () {
        // audios
        audioKill = game.add.audio("kill");
        audioItem = game.add.audio("item");
        audioHurt = game.add.audio("hurt");
        audioJump = game.add.audio("jump");
        // music
        music = game.add.audio('music');
        music.loop = true;
        music.play();
    },
    populate: function () {
        //enemies group
        enemies_group = game.add.group();
        enemies_group.enableBody = true;
        //items group
        items_group = game.add.group();
        items_group.enableBody = true;
        // Ants
        this.spawnAnt(3, 10);
        this.spawnAnt(24, 51);
        this.spawnAnt(16, 30);
        this.spawnGrasshopper(6, 50);
        this.spawnGrasshopper(5, 21);
        this.spawnGrasshopper(19, 13);
        // gator param x, y, distance, horizontal flag
        this.spawnGator(26, 36, 40, false);
        this.spawnGator(36, 23, 40, false);
        this.spawnGator(35, 9, 40, false);
        // items
        this.createAcorn(37, 46);
        this.createAcorn(14, 38);
        this.createAcorn(37, 46);
        this.createAcorn(35, 21);
        this.createAcorn(19, 3);
        this.createAcorn(2, 28);
        this.createAcorn(2, 36);
        this.createAcorn(2, 44);
    },
    createAcorn: function (x, y) {
        x *= 16;
        y *= 16;
        var temp = game.add.sprite(x, y, 'atlas', 'acorn-1');
        temp.anchor.setTo(0.5);
        game.physics.arcade.enable(temp);
        //add animations
        temp.animations.add('acorn', Phaser.Animation.generateFrameNames('acorn-', 1, 3, '', 0), 12, true);
        temp.animations.play('acorn');
        items_group.add(temp);
    },
    spawnAnt: function (x, y) {
        var temp = new Ant(game, x, y);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    spawnGator: function (x, y, distance, horizontal) {
        var temp = new Gator(game, x, y, distance, horizontal);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    spawnGrasshopper: function (x, y) {
        var temp = new Grasshopper(game, x, y);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    bindKeys: function () {
        this.wasd = {
            jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            duck: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP)
        }
        game.input.keyboard.addKeyCapture(
            [Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.UP]
        );
    },
    createPlayer: function (x, y) {
        var temp = new Player(game, x, y);
        game.add.existing(temp);
    },
    addProp: function (x, y, item, flip) {
        var temp = game.add.image(x, y, 'atlas-props', item);
        if (flip) {
            temp.anchor.set(0.5);
            temp.scale.x = -1;
        }
    },
    createBackgrounds: function () {
        bg_clouds = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'bg-clouds');
        bg_mountains = game.add.tileSprite(0, -10, gameWidth, gameHeight, 'bg-mountains');
        bg_trees = game.add.tileSprite(0, 20, gameWidth, gameHeight, 'bg-trees');
        //
        bg_clouds.fixedToCamera = true;
        bg_mountains.fixedToCamera = true;
        bg_trees.fixedToCamera = true;
    },
    createTileMap: function () {
        // tiles
        globalMap = game.add.tilemap('map');
        globalMap.addTilesetImage('tileset');
        //
        this.layer = globalMap.createLayer('Main Layer');
        this.layer.resizeWorld();
        //
        //
        this.layer_collisions = globalMap.createLayer("Collisions Layer");
        this.layer_collisions.resizeWorld();
        // collisions
        globalMap.setCollision([1]);
        this.layer_collisions.visible = false;
        this.layer_collisions.debug = false;
        // one way collisions
        this.setTopCollisionTiles(2);
    },
    setTopCollisionTiles: function (tileIndex) {
        var x, y, tile;
        for (x = 0; x < globalMap.width; x++) {
            for (y = 1; y < globalMap.height; y++) {
                tile = globalMap.getTile(x, y);
                if (tile !== null) {
                    if (tile.index == tileIndex) {
                        tile.setCollision(false, false, true, false);
                    }
                }
            }
        }
    },
    update: function () {

        //physics
        game.physics.arcade.collide(player, this.layer_collisions);
        game.physics.arcade.collide(enemies_group, this.layer_collisions);
        //overlaps
        game.physics.arcade.overlap(player, enemies_group, this.checkAgainstEnemies, null, this);
        game.physics.arcade.overlap(player, items_group, this.collectItem, null, this);
        this.movePlayer();
        this.hurtFlagManager();
        this.parallaxBackground();
        // if end is reached display game over screen
        if (player.position.y < 5 * 16 && player.position.x < 13 * 16) {
            this.game.state.start('GameOver');
        }
        // this.debugGame();
    },
    collectItem: function (player, item) {
        item.kill();
        audioItem.play();
    },
    checkAgainstEnemies: function (player, enemy) {
        if ((player.y + player.body.height * 0.5 < enemy.y ) && player.body.velocity.y > 0) {
            enemy.kill();
            enemy.destroy();
            audioKill.play();
            this.spawnEnemyDeath(enemy.x, enemy.y);
            player.body.velocity.y = -200;
        } else {
            this.hurtPlayer();
        }
    },
    spawnEnemyDeath: function (x, y) {
        var temp = new EnemyDeath(game, x, y);
        game.add.existing(temp);
    },
    hurtPlayer: function () {
        if (hurtFlag) {
            return;
        }
        hurtFlag = true;
        this.game.time.reset();
        player.animations.play("hurt");
        player.y -= 5;
        player.body.velocity.y = -150;
        player.body.velocity.x = (player.scale.x == 1) ? -22 : 22;
        audioHurt.play();
    },
    hurtFlagManager: function () {
        // reset hurt when touching ground
        if (hurtFlag && player.body.onFloor()) {
            hurtFlag = false;
        }
    },
    debugGame: function () {
        //game.debug.body(enemies_group);
        game.debug.body(player);
        //enemies_group.forEachAlive(this.renderGroup, this);
    },
    parallaxBackground: function () {
        bg_mountains.tilePosition.x = this.layer.x * -.07;
        bg_trees.tilePosition.x = this.layer.x * -.25;
    },
    movePlayer: function () {
        if (hurtFlag) {
            player.animations.play("hurt");
            return;
        }
        if (this.wasd.jump.isDown && player.body.onFloor()) {
            player.body.velocity.y = -250;
            audioJump.play();
        }
        var vel = 80;
        if (this.wasd.left.isDown) {
            player.body.velocity.x = -vel;
            this.moveAnimation();
            player.scale.x = -1;
        } else if (this.wasd.right.isDown) {
            player.body.velocity.x = vel;
            this.moveAnimation();
            player.scale.x = 1;
        } else {
            player.body.velocity.x = 0;
            this.stillAnimation();
        }
    },
    stillAnimation: function () {
        if (player.body.velocity.y != 0) {
            player.animations.play("jump");
        } else if (this.wasd.duck.isDown) {
            player.animations.play("duck");
        } else {
            player.animations.play("idle");
        }
    },
    moveAnimation: function () {
        if (player.body.velocity.y != 0) {
            player.animations.play("jump");
        } else {
            player.animations.play("run");
        }
    },
    renderGroup: function (member) {
        game.debug.body(member);
    }
}
// player entity
Player = function (game, x, y) {
    x *= 16;
    y *= 16;
    this.initX = x;
    this.initY = y;
    Phaser.Sprite.call(this, game, x, y, "atlas", "player-idle-1");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(14, 19, 37, 29);
    this.body.gravity.y = 300;
    this.kind = "player";
    player = this;
    //add animations
    var animVel = 12;
    this.animations.add('idle', Phaser.Animation.generateFrameNames('player-idle-', 1, 8, '', 0), animVel - 4, true);
    this.animations.add('run', Phaser.Animation.generateFrameNames('player-run-', 1, 6, '', 0), animVel + 3, true);
    this.animations.add('jump', Phaser.Animation.generateFrameNames('player-jump-', 1, 4, '', 0), 20, false);
    this.animations.add('hurt', Phaser.Animation.generateFrameNames('player-hurt-', 1, 2, '', 0), animVel, true);
    this.animations.add('duck', Phaser.Animation.generateFrameNames('player-crouch-', 1, 4, '', 0), animVel, true);
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
// Grasshopper
Grasshopper = function (game, x, y) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "grasshopper-idle-1");
    this.animations.add('idle', Phaser.Animation.generateFrameNames('grasshopper-idle-', 1, 4, '', 0), 10, true);
    this.animations.add('jump', Phaser.Animation.generateFrameNames('grasshopper-jump-', 1, 2, '', 0), 10, true);
    this.animations.add('fall', Phaser.Animation.generateFrameNames('grasshopper-fall-', 1, 2, '', 0), 10, true);
    this.animations.play("idle");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(15, 15, 21, 18);
    this.body.gravity.y = 500;
    this.kind = "Grasshopper";
    this.counter = 0;
    this.jumpCounter = 0;
    this.dirX = 1;
}
Grasshopper.prototype = Object.create(Phaser.Sprite.prototype);
Grasshopper.prototype.constructor = Grasshopper;
Grasshopper.prototype.update = function () {
    // change direction
    if (this.counter++ > 100 && this.body.onFloor()) {
        this.body.velocity.y = -260;
        this.counter = 0;
        // change direction
        if (this.jumpCounter++ > 2) {
            this.jumpCounter = 1;
            this.dirX = this.dirX * -1;
        }
    } else if (this.body.onFloor()) {
        this.body.velocity.x = 0;
        this.animations.play("idle");
    } else {
        this.body.velocity.x = 20 * this.dirX;
        if (this.body.velocity.y < 0) {
            this.animations.play("jump");
        } else {
            this.animations.play("fall");
        }
    }
    //flip
    this.scale.x = (this.dirX == 1) ? -1 : 1;
}
// Ant
Ant = function (game, x, y) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "ant-1");
    this.animations.add('walk', Phaser.Animation.generateFrameNames('ant-', 1, 8, '', 0), 10, true);
    this.animations.play("walk");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(19, 14, 13, 17);
    this.body.gravity.y = 500;
    this.speed = 40;
    this.body.velocity.x = this.speed;
    this.body.bounce.x = 1;
    this.kind = "ant";
}
Ant.prototype = Object.create(Phaser.Sprite.prototype);
Ant.prototype.constructor = Ant;
Ant.prototype.update = function () {
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}
Ant.prototype.turnAround = function () {
    if (this.body.velocity.x > 0) {
        this.body.velocity.x = -this.speed;
        this.x -= 5;
    } else {
        this.body.velocity.x = this.speed;
        this.x += 5;
    }
}
// Gator
Gator = function (game, x, y, distance, horizontal) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "gator-1");
    this.animations.add('fly', Phaser.Animation.generateFrameNames('gator-', 1, 4, '', 0), 10, true);
    this.animations.play("fly");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(16, 21, 15, 20);
    this.initX = this.x;
    this.initY = this.y;
    this.distance = distance;
    this.speed = 40;
    this.horizontal = horizontal;
    if (this.horizontal) {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = 0;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
    }
}
Gator.prototype = Object.create(Phaser.Sprite.prototype);
Gator.prototype.constructor = Gator;
Gator.prototype.update = function () {
    if (this.horizontal) {
        this.horizontalMove();
    } else {
        this.verticalMove();
    }
}
Gator.prototype.verticalMove = function () {
    if (this.body.velocity.y > 0 && this.y > this.initY + this.distance) {
        this.body.velocity.y = -40;
    } else if (this.body.velocity.y < 0 && this.y < this.initY - this.distance) {
        this.body.velocity.y = 40;
    }
    if (this.x > player.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}
Gator.prototype.horizontalMove = function () {
    if (this.body.velocity.x > 0 && this.x > this.initX + this.distance) {
        this.body.velocity.x = -40;
    } else if (this.body.velocity.x < 0 && this.x < this.initX - this.distance) {
        this.body.velocity.x = 40;
    }
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}
// enemy death
EnemyDeath = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "atlas", "enemy-death-1");
    this.anchor.setTo(0.5);
    var anim = this.animations.add("death", Phaser.Animation.generateFrameNames("enemy-death-", 1, 4, '', 0), 15, false);
    this.animations.play("death");
    anim.onComplete.add(function () {
            this.kill();
        }, this
    );
}
EnemyDeath.prototype = Object.create(Phaser.Sprite.prototype);
EnemyDeath.prototype.constructor = EnemyDeath;




