// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls


// Define e exporta a classe Scene2
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    // Pré-carrega os recursos necessários
    preload() {
        this.load.audio("ken", "./assets/musicas/ken.mp3");
        this.load.image("tiles", "./assets/mapas/mapa2/samplemap.png");
        this.load.tilemapTiledJSON("map_praca", "./assets/mapas/mapa2/map2.json");
        this.load.spritesheet("tyler", "./assets/sprites_personagens/novo_persona.png", { frameWidth: 32, frameHeight: 32 });
    }



    // Cria os elementos do jogo
    create() {
        this.criarMapa();
        this.criarPersonagem();

        //trilha sonora do jogo
        this.audio = this.sound.add("ken", { loop: true });
        this.audio.play();

        // Define a posição limite para a transição de cena
        this.voltarPonte = 30;
    }

    criarMapa() {
        // Cria o mapa e define o tileset
        this.map = this.make.tilemap({ key: "map_praca" });
        this.tileset = this.map.addTilesetImage("assets", "tiles");
        // Cria as camadas do mapa
        this.water = this.map.createLayer("water", this.tileset, 0, 0);
        this.ground = this.map.createLayer("ground", this.tileset, 0, 0);

        // Define colisões com base nas propriedades do mapa
        this.ground.setCollisionByProperty({ collider: true })
    }

    criarPersonagem() {
        // Encontra o ponto de spawn do jogador no mapa
        const spawnPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Cria o jogador, câmera e controles
        this.tyler = new Player(this, spawnPoint.x, spawnPoint.y, 'tyler');
        this.camera = new Camera(this, this.tyler, this.map);
        this.control = new Controls(this, this.tyler);

        // Adiciona colisor entre o jogador e o chão
        this.physics.add.collider(this.tyler, this.ground);

        // Cria as animações utilizando o Animacao
        Animacao.createAnimations(this);

        // Cria a câmera do jogador
        this.playerCamera = new Camera(this, this.tyler, this.map);

        this.passarPonte = 1000;
    }


    // Atualiza o jogo
    update() {
        // Atualiza os controles do jogador
        this.control.update();

        // Verifica se o jogador atingiu a posição de transição de cena
        if (this.tyler.x <= this.voltarPonte) {
            this.transitionToScene1("mainScene")
            this.audio.stop();
        }

        if(this.tyler.x >= this.passarPonte){
            this.transitionToScene1("cena_castelo");
            this.audio.stop();
        }
    }

    // Método para transição para a cena 1
    transitionToScene1(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}
