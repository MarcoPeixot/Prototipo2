// Importa os módulos necessários
import Animacao from './animation.js';
import Player from './player.js';
import Camera from './camera.js';
import Controls from './controles.js';

// Define e exporta a classe Scene2
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.image("tiles", "./assets/mapa2/samplemap.png");
        this.load.tilemapTiledJSON("map_praca", "./assets/mapa2/map2.json");

    }

    // Cria os elementos do jogo
    create() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_praca" });
        this.tileset = this.map.addTilesetImage("assets", "tiles");

        // Cria as camadas do mapa
        this.water = this.map.createLayer("water", this.tileset, 0, 0);
        this.ground = this.map.createLayer("ground", this.tileset, 0, 0);

        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })

        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y);
        this.camera = new Camera(this, this.tyler, this.map);
        this.control = new Controls(this, this.tyler);

        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);

        // Define a posição limite para a transição de cena
        this.passarPonte = 30;
    }

    // Atualiza o jogo
    update() {
        // Atualiza os controles do jogador
        this.control.update();

        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.tyler.x <= this.passarPonte) {
            this.transitionToScene1("mainScene")
        }
    }

    // Método para transição para a cena 1
    transitionToScene1(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}
