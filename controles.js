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
    }

    // Método de atualização dos controles
    update() {
        // Chama o método de atualização do jogador, passando o objeto "cursor" como parâmetro
        this.player.update(this.cursor);
    }
}
