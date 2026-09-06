class SubwayTunnel1 extends Phaser.Scene {

    constructor() {
        super('SubwayTunnel1');
    }

    create() {

        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            'it works',
            {
                fontFamily: 'Arial',
                fontSize: '48px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

    }

}