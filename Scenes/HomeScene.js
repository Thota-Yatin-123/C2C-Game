class HomeScene extends Phaser.Scene {

    constructor() {
        super('HomeScene');
    }


   preload() {

    this.load.image(
        'background1',
        'assets/homescreen1.jpg'
    );

    this.load.audio(
        'startAudio',
        'assets/StartAudio.wav'
    );

}


    create() {

        // =========================
        // BACKGROUND
        // =========================

        this.background = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'background1'
        ).setDisplaySize(
            this.scale.width,
            this.scale.height
        );


        // =========================
        // BUTTON POSITIONS
        // =========================

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.createButton(
            centerX,
            centerY - 80,
            'START'
        );

        this.createButton(
            centerX,
            centerY,
            'SETTINGS'
        );

        this.createButton(
            centerX,
            centerY + 80,
            'EXIT'
        );


        // =========================
        // CREDIT
        // =========================

        this.add.text(
            this.scale.width - 30,
            this.scale.height - 35,
            'By Team Astraeus',
            {
                fontFamily: 'Arial',
                fontSize: '2em',
                color: '#b8aaa0'
            }
        ).setOrigin(1, 1);

    }


    // =========================
    // RESIZE
    // =========================

    resize(gameSize) {

        const width = gameSize.width;
        const height = gameSize.height;

        this.background.setPosition(
            width / 2,
            height / 2
        );

        this.background.setDisplaySize(
            width,
            height
        );

    }


    // =========================
    // CREATE BUTTON
    // =========================

    createButton(x, y, text) {

        const button = this.add.graphics();

        const width = 280;
        const height = 60;
        const point = 25;


        // =========================
        // BUTTON POSITION
        // =========================

        button.setPosition(x, y);


        // =========================
        // DRAW BUTTON
        // =========================

        const drawButton = (fill, border) => {

            button.clear();

            button.fillStyle(fill, 1);
            button.lineStyle(3, border, 1);

            button.beginPath();

            button.moveTo(
                -width / 2,
                0
            );

            button.lineTo(
                -width / 2 + point,
                -height / 2
            );

            button.lineTo(
                width / 2 - point,
                -height / 2
            );

            button.lineTo(
                width / 2,
                0
            );

            button.lineTo(
                width / 2 - point,
                height / 2
            );

            button.lineTo(
                -width / 2 + point,
                height / 2
            );

            button.closePath();

            button.fillPath();
            button.strokePath();

        };


        // =========================
        // NORMAL APPEARANCE
        // =========================

        drawButton(
            0x2b2522,
            0x6b3a2a
        );


        // =========================
        // BLOOD RED ACCENT
        // =========================

        const bloodLine = this.add.rectangle(
            x - 112,
            y,
            5,
            45,
            0x8b1111
        );


        // =========================
        // BUTTON TEXT
        // =========================

        const label = this.add.text(
            x,
            y,
            text,
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                fontStyle: 'bold',
                color: '#d6c8bd',
                letterSpacing: 2
            }
        ).setOrigin(0.5);


        // =========================
        // HITBOX
        // =========================

        button.setInteractive(
            new Phaser.Geom.Polygon([
                -width / 2,
                0,

                -width / 2 + point,
                -height / 2,

                width / 2 - point,
                -height / 2,

                width / 2,
                0,

                width / 2 - point,
                height / 2,

                -width / 2 + point,
                height / 2
            ]),
            Phaser.Geom.Polygon.Contains
        );


        // =========================
        // POINTER CURSOR
        // =========================

        button.input.cursor = 'pointer';


        // =========================
        // HOVER
        // =========================

        button.on('pointerover', () => {

            drawButton(
                0x3a2925,
                0x9b2b20
            );

            bloodLine.setFillStyle(
                0xb01818
            );

            label.setColor(
                '#ffffff'
            );

            this.tweens.add({
                targets: [
                    button,
                    label,
                    bloodLine
                ],

                scaleX: 1.05,
                scaleY: 1.05,

                duration: 120
            });

        });


        // =========================
        // MOUSE OUT
        // =========================

        button.on('pointerout', () => {

            drawButton(
                0x2b2522,
                0x6b3a2a
            );

            bloodLine.setFillStyle(
                0x8b1111
            );

            label.setColor(
                '#d6c8bd'
            );

            this.tweens.add({
                targets: [
                    button,
                    label,
                    bloodLine
                ],

                scaleX: 1,
                scaleY: 1,

                duration: 120
            });

        });


        // =========================
        // CLICK
        // =========================

        button.on('pointerdown', () => {

    this.tweens.add({
        targets: [
            button,
            label,
            bloodLine
        ],

        scaleX: 0.97,
        scaleY: 0.97,

        duration: 70,

        yoyo: true
    });


    // =========================
    // START
    // =========================

    if (text === 'START') {
          this.sound.play('startAudio');

        const saveFile = localStorage.getItem('C2C_SAVE');

        if (saveFile) {

            const saveData = JSON.parse(saveFile);

            this.scene.start(saveData.scene);

        } else {

            this.scene.start('Level1Scene');

        }

    }


    // =========================
    // EXIT
    // =========================

    if (text === 'EXIT') {

        this.scene.stop();

        this.game.destroy(true);

        document.body.innerHTML = `

            <div style="
                width: 100vw;
                height: 100vh;

                background: #050505;

                color: #8b1111;

                display: flex;
                justify-content: center;
                align-items: center;

                font-family: Arial;

                font-size: 32px;
            ">

                GAME EXITED

            </div>

        `;

    }

});

    }

}