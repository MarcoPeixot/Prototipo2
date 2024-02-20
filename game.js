class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScene'
        });
    }

    preload() {
        this.load.image("tiles", "./assets/grass.png");
        this.load.image("objetos", "./assets/object.png");
        this.load.image("floresta", "./assets/plant.png");
        this.load.tilemapTiledJSON("mapa", "./assets/map.json");
        this.load.spritesheet("tyler", "./assets/novo_persona.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.map = this.make.tilemap({key: "mapa"}),
        this.tilesetGround = this.map.addTilesetImage("grass", "tiles");
        this.tilesetObject = this.map.addTilesetImage("object", "objetos");
        this.tilesetFlorest = this.map.addTilesetImage("plant", "floresta");

        this.ground = this.map.createLayer("grass", this.tilesetGround, 0, 0);
        this.object = this.map.createLayer("object", this.tilesetObject, 0, 0);
        this.above = this.map.createLayer("above", this.tilesetFlorest, 0, 0);

        this.object.setCollisionByProperty({collider: true}); 
        this.above.setCollisionByProperty({collider: true})
        this.above.setDepth(10);
        this.tyler = this.physics.add.sprite(100, 200, "tyler").setScale(1.5);
        this.physics.add.collider(this.tyler, this.object);
        this.physics.add.collider(this.tyler, this.above);

        this.anims.create({
            key: 'descer',
            frames: this.anims.generateFrameNumbers('tyler', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'andar_esquerda',
            frames: this.anims.generateFrameNumbers('tyler', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'andar_direita',
            frames: this.anims.generateFrameNumbers('tyler', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'subir',
            frames: this.anims.generateFrameNumbers('tyler', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        this.cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'left': Phaser.Input.Keyboard.KeyCodes.A
        })



        this.camera = this.cameras.main
        this.camera.startFollow(this.tyler);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    update() {
        this.tyler.body.setVelocity(0);
        if (this.cursor.right.isDown) {

            this.tyler.body.setVelocityX(200);
        } else if (this.cursor.left.isDown) {

            this.tyler.body.setVelocityX(-200);
        }

        else if (this.cursor.up.isDown) {
            this.tyler.body.setVelocityY(-200);
        }

        else if (this.cursor.down.isDown) {
            this.tyler.body.setVelocityY(200);
        }

        if (this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) {
            if (this.tyler.body.velocity.y < 0) {
                this.tyler.anims.play('subir', true);
            } else if (this.tyler.body.velocity.y > 0) {
                this.tyler.anims.play('descer', true);
            } else if (this.tyler.body.velocity.x < 0) {
                this.tyler.anims.play('andar_esquerda', true);
            } else if (this.tyler.body.velocity.x > 0) {
                this.tyler.anims.play('andar_direita', true);
            }
        }
        else {
            this.tyler.anims.stop();
        }
    }
}



class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    preload() {

    }

    create() {

    }

    update() {

    }
}








var config = {
    pixelArt: true,
    type: Phaser.AUTO,
    width: 960,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [MainScene, Scene2]
}

var game = new Phaser.Game(config);