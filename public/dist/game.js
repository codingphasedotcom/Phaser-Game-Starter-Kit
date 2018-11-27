(function(modules) {
    function webpackJsonpCallback(data) {
        var chunkIds = data[0];
        var moreModules = data[1];
        var executeModules = data[2];
        var moduleId, chunkId, i = 0, resolves = [];
        for (;i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (installedChunks[chunkId]) resolves.push(installedChunks[chunkId][0]);
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) modules[moduleId] = moreModules[moduleId];
        if (parentJsonpFunction) parentJsonpFunction(data);
        while (resolves.length) resolves.shift()();
        deferredModules.push.apply(deferredModules, executeModules || []);
        return checkDeferredModules();
    }
    function checkDeferredModules() {
        var result;
        for (var i = 0; i < deferredModules.length; i++) {
            var deferredModule = deferredModules[i];
            var fulfilled = true;
            for (var j = 1; j < deferredModule.length; j++) {
                var depId = deferredModule[j];
                if (0 !== installedChunks[depId]) fulfilled = false;
            }
            if (fulfilled) {
                deferredModules.splice(i--, 1);
                result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
            }
        }
        return result;
    }
    var installedModules = {};
    var installedChunks = {
        game: 0
    };
    var deferredModules = [];
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (1 & mode) value = __webpack_require__(value);
        if (8 & mode) return value;
        if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    jsonpArray.push = webpackJsonpCallback;
    jsonpArray = jsonpArray.slice();
    for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    var parentJsonpFunction = oldJsonpFunction;
    deferredModules.push([ "./assets/js/Game/index.js", "vendors~game" ]);
    return checkDeferredModules();
})({
    "./assets/js/Game/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes_Level1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Level1.js */ "./assets/js/Game/scenes/Level1.js");\n\n\nvar config = {\n  type: Phaser.AUTO,\n  width: 640,\n  height: 360,\n  physics: {\n    default: \'arcade\',\n    arcade: {\n      debug: true,\n      gravity: {\n        y: 200\n      }\n    }\n  },\n  scene: [_scenes_Level1_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]]\n};\nvar game = new phaser__WEBPACK_IMPORTED_MODULE_0__["Game"](config);\n\n//# sourceURL=webpack:///./assets/js/Game/index.js?');
    },
    "./assets/js/Game/scenes/Level1.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Level1; });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Level1 extends phaser__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n  constructor() {\n    super({\n      key: 'Level1'\n    });\n  }\n\n  preload() {\n    this.load.image('sky', '/assets/img/sky.png');\n    this.load.image('ground', '/assets/img/platform.png');\n    this.load.image('star', '/assets/img/star.png');\n    this.load.image('bomb', '/assets/img/bomb.png');\n    this.load.spritesheet('dude', '/assets/img/dude.png', {\n      frameWidth: 32,\n      frameHeight: 48\n    });\n  }\n\n  create() {\n    this.add.image(400, 300, 'sky');\n    this.platforms = this.physics.add.staticGroup();\n    this.platforms.create(0, 0, 'ground').setOrigin(0, 0).setScale(1).refreshBody();\n    this.platforms.create(300, 200, 'ground').setOrigin(0, 0).setScale(1).refreshBody();\n    this.platforms.create(500, 100, 'ground').setOrigin(0, 0).refreshBody();\n    this.platforms.create(0, 340, 'ground').setOrigin(0, 0).setScale(2).refreshBody();\n    this.player = this.physics.add.sprite(100, 150, 'dude');\n    this.player.setBounce(0.2);\n    this.player.setCollideWorldBounds(true);\n    this.anims.create({\n      key: 'left',\n      frames: this.anims.generateFrameNumbers('dude', {\n        start: 0,\n        end: 3\n      }),\n      frameRate: 10,\n      repeat: -1\n    });\n    this.anims.create({\n      key: 'turn',\n      frames: [{\n        key: 'dude',\n        frame: 4\n      }],\n      frameRate: 20\n    });\n    this.anims.create({\n      key: 'right',\n      frames: this.anims.generateFrameNumbers('dude', {\n        start: 5,\n        end: 8\n      }),\n      frameRate: 10,\n      repeat: -1\n    });\n    this.player.body.setGravityY(300);\n    this.physics.add.collider(this.player, this.platforms); // stars\n\n    this.stars = this.physics.add.group({\n      key: 'star',\n      repeat: 11,\n      setXY: {\n        x: 12,\n        y: 0,\n        stepX: 70\n      }\n    });\n    this.stars.children.iterate(function (child) {\n      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n    });\n    this.physics.add.collider(this.stars, this.platforms);\n    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);\n\n    function collectStar(player, star) {\n      star.disableBody(true, true);\n    }\n  }\n\n  update(delta) {\n    this.cursors = this.input.keyboard.createCursorKeys();\n\n    if (this.cursors.left.isDown) {\n      this.player.setVelocityX(-160);\n      this.player.anims.play('left', true);\n    } else if (this.cursors.right.isDown) {\n      this.player.setVelocityX(160);\n      this.player.anims.play('right', true);\n    } else {\n      this.player.setVelocityX(0);\n      this.player.anims.play('turn');\n    }\n\n    if (this.cursors.up.isDown && this.player.body.touching.down) {\n      this.player.setVelocityY(-500);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/Game/scenes/Level1.js?");
    }
});