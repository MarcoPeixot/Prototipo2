// PlayerCamera.js
export default class Camera {
    // Construtor que recebe a cena, o personagem e o mapa como parâmetros
    constructor(scene, person, map) {
        this.scene = scene;
        this.person = person;
        this.map = map;

        // Chama o método para criar a câmera
        this.createCamera();

        // Adicione um ouvinte de redimensionamento da janela
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Método para criar a câmera
    createCamera() {
        // Configura a câmera principal para seguir o personagem
        this.camera = this.scene.cameras.main;
        this.camera.startFollow(this.person);

        // Define os limites da câmera com base nas dimensões do mapa
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Define o zoom da câmera principal
        this.camera.setZoom(1.8, 1.8);

        // Cria uma câmera de minimapa
        this.minimap = this.scene.cameras.add(window.innerWidth - 460, window.innerHeight - 285, 500, 300).setZoom(0.2).setName('mini');
    }

    // Método para lidar com o redimensionamento da janela
    handleResize() {
        const { width, height } = this.scene.scale;

        // Atualiza a posição da câmera de minimapa para a posição direita inferior
        this.minimap.setPosition(width - 420, height - 220);
    }
}
