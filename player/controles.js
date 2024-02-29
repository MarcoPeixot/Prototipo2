// Controles.js
export default class Controls {
    // Construtor que recebe a cena e o jogador como parâmetros
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        // Adiciona as teclas de seta para cima, baixo, direita e esquerda ao objeto "cursor"
        this.cursor = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'left': Phaser.Input.Keyboard.KeyCodes.A
        });

        //Adiciona a tecla E como a tecla de interação
        this.interacao = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
    // Create Method in Controls class
    create() {
        this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: this.scene.cameras.main.width / 3,
            y: (this.scene.cameras.main.height / 3) * 2,
            radius: 50,
            base: this.scene.add.circle(0, 0, 30, 0x5a4efc).setDepth(10),
            thumb: this.scene.add.circle(0, 0, 20, 0x2919ff).setDepth(10),
        });
    }

    // Método de atualização dos controles
    update() {
        // Chama o método de atualização do jogador, passando o objeto "cursor" como parâmetro
        this.player.update(this.cursor, this.joyStick);

    }
}
