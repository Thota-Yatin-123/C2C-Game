const config = {
    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    backgroundColor: '#111111',

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [
        HomeScene,
        Level1Scene
    ]
};

const game = new Phaser.Game(config);