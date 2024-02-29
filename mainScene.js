// mainScene.js
import Animacoes from './animation.js'; // Importa um módulo de gerenciamento de animações
import Player from './player.js'; // Importa a classe Player
import Camera from './camera.js'; // Importa a classe Camera
import Controls from './controles.js'; // Importa a classe Controls

var mudarCena = 0; // Variável para controlar a mudança de cena

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScene'
        });
    }

    preload() {
        // Carrega os recursos necessários
        this.load.image("tile_grass", "./assets/novo_mapa/grass.png");
        this.load.image("tile_water", "./assets/novo_mapa/water.png");
        this.load.image("tile_objetos", "./assets/novo_mapa/objetos.png");
        this.load.tilemapTiledJSON("map_florest", "./assets/novo_mapa/new_map.json");
        this.load.spritesheet("tyler", "./assets/assets_tyler/tyler_armor.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("vanessa", "./assets/assets_vanessa/vanessa_lado.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Cria o mapa e as camadas
        this.map = this.make.tilemap({ key: "map_florest" });
        this.tilesetGrass = this.map.addTilesetImage("grass", "tile_grass");
        this.tilesetWater = this.map.addTilesetImage("water", "tile_water");
        this.tilesetObject = this.map.addTilesetImage("objetos", "tile_objetos");

        this.ground = this.map.createLayer("ground", this.tilesetGrass, 0, 0); // cria a layer ground
        this.water = this.map.createLayer("water", this.tilesetWater, 0, 0); // cria a layer water
        this.ponte = this.map.createLayer("ponte", this.tilesetObject, 0, 0); // cria a layer ponte
        this.object = this.map.createLayer("object", this.tilesetObject, 0, 0); // cria a layer object

        this.water.setCollisionByProperty({ collider: true }); //ativa a colisão com a água
        this.object.setCollisionByProperty({ collider: true }); //ativa a colisão com os objetos
        this.object.setDepth(10); // faz o persona ficar atrás da layer

        // Encontra o ponto de spawn do NPC no mapa
        const spawnPointNpc = this.map.findObject(
            "npc1",
            (objects) => objects.name === "spawning point npc"
        );

        // Cria o NPC
        this.npc = this.physics.add.sprite(spawnPointNpc.x, spawnPointNpc.y, "vanessa").setScale(1.2);

        // Verifica o valor de mudarCena e configura a posição inicial do jogador e os controles
        if (mudarCena === 0) {
            this.tyler = new Player(this, 100, 400, 'vanessa');
            this.controls = new Controls(this, this.tyler);
        }
        if (mudarCena === 1) {
            this.tyler = new Player(this, 900, 400, 'tyler');
            this.controls = new Controls(this, this.tyler);
        }

        // Adiciona colisores entre o jogador e os elementos do mapa
        this.physics.add.collider(this.tyler, this.water);
        this.physics.add.collider(this.tyler, this.object);

        this.transicaoPonte = 1000; // Define a posição X para a transição de cena

        // Cria as animações utilizando o Animacoes
        Animacoes.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);
    }

    update() {
        // Atualiza os controles do jogador
        this.controls.update();

        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.tyler.x >= this.transicaoPonte) {
            this.transitionToScene2('scene2');
            mudarCena = 1; // Atualiza a variável para evitar que a condição seja atendida novamente
        }
    }

    // Método para transição para a cena 2
    transitionToScene2(cena) {
        this.scene.start(cena); // Inicia a cena 2
    }
}