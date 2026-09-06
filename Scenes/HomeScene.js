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

    this.musicEnabled =
        localStorage.getItem('C2C_MUSIC') !== 'false';

    this.soundEnabled =
        localStorage.getItem('C2C_SOUND') !== 'false';

    this.background = this.add.image(
        this.scale.width / 2,
        this.scale.height / 2,
        'background1'
    ).setDisplaySize(
        this.scale.width,
        this.scale.height
    );

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

    this.add.text(
        this.scale.width - 30,
        this.scale.height - 35,
        'By Team Astraeus',
        {
            fontFamily: 'Arial',
            fontSize: '2.5em',
            color: '#b8aaa0'
        }
    ).setOrigin(1, 1);

}

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

createButton(x, y, text) {

    const button = this.add.graphics();

    const width = 280;
    const height = 60;
    const point = 25;

    button.setPosition(x, y);

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

    drawButton(
        0x2b2522,
        0x6b3a2a
    );

    const bloodLine = this.add.rectangle(
        x - 112,
        y,
        5,
        45,
        0x8b1111
    );

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

    button.input.cursor = 'pointer';

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

        if (text === 'START') {

            if (this.musicEnabled) {
                this.sound.play('startAudio');
            }

            const saveFile =
                localStorage.getItem('C2C_SAVE');

            if (saveFile) {

                const saveData =
                    JSON.parse(saveFile);

                this.scene.start(saveData.scene);

            } else {

                this.scene.start('Level1Scene');

            }

        }

        if (text === 'SETTINGS') {

            this.openSettings();

        }

        if (text === 'EXIT') {

            this.scene.stop();

            this.game.destroy(true);

            const exitScreen = document.createElement('div');

exitScreen.style.width = '100vw';
exitScreen.style.height = '100vh';
exitScreen.style.background = '#050505';
exitScreen.style.color = '#8b1111';
exitScreen.style.display = 'flex';
exitScreen.style.justifyContent = 'center';
exitScreen.style.alignItems = 'center';
exitScreen.style.fontFamily = 'Arial';
exitScreen.style.fontSize = '32px';

exitScreen.textContent = 'GAME EXITED';

document.body.appendChild(exitScreen);
        }

    });

}

openSettings() {

    if (this.settingsOpen) {
        return;
    }

    this.settingsOpen = true;

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.settingsOverlay = this.add.rectangle(
        centerX,
        centerY,
        this.scale.width,
        this.scale.height,
        0x000000,
        0.75
    );

    this.settingsOverlay.setDepth(2000);
    this.settingsOverlay.setInteractive();
this.settingsOverlay.input.cursor = 'default';

    this.settingsPanel = this.add.graphics();

    this.settingsPanel.setDepth(2001);

    const panelWidth = 560;
    const panelHeight = 430;

    this.settingsPanel.fillStyle(
        0x171311,
        0.98
    );

    this.settingsPanel.lineStyle(
        3,
        0x6b3a2a,
        1
    );

    this.settingsPanel.beginPath();

    this.settingsPanel.moveTo(
        centerX - panelWidth / 2 + 30,
        centerY - panelHeight / 2
    );

    this.settingsPanel.lineTo(
        centerX + panelWidth / 2 - 30,
        centerY - panelHeight / 2
    );

    this.settingsPanel.lineTo(
        centerX + panelWidth / 2,
        centerY - panelHeight / 2 + 30
    );

    this.settingsPanel.lineTo(
        centerX + panelWidth / 2,
        centerY + panelHeight / 2 - 30
    );

    this.settingsPanel.lineTo(
        centerX + panelWidth / 2 - 30,
        centerY + panelHeight / 2
    );

    this.settingsPanel.lineTo(
        centerX - panelWidth / 2 + 30,
        centerY + panelHeight / 2
    );

    this.settingsPanel.lineTo(
        centerX - panelWidth / 2,
        centerY + panelHeight / 2 - 30
    );

    this.settingsPanel.lineTo(
        centerX - panelWidth / 2,
        centerY - panelHeight / 2 + 30
    );

    this.settingsPanel.closePath();

    this.settingsPanel.fillPath();
    this.settingsPanel.strokePath();

    this.settingsTitle = this.add.text(
        centerX,
        centerY - 150,
        'SETTINGS',
        {
            fontFamily: 'Arial',
            fontSize: '34px',
            fontStyle: 'bold',
            color: '#d6c8bd',
            letterSpacing: 4
        }
    ).setOrigin(0.5);

    this.settingsTitle.setDepth(2002);

    this.createSettingToggle(
        centerX,
        centerY - 70,
        'MUSIC',
        'music'
    );

    this.createSettingToggle(
        centerX,
        centerY,
        'SOUND EFFECTS',
        'sound'
    );

    this.createBackButton(
        centerX,
        centerY + 125
    );

}

createSettingToggle(x, y, labelText, setting) {

    const label = this.add.text(
        x - 170,
        y,
        labelText,
        {
            fontFamily: 'Arial',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#d6c8bd'
        }
    ).setOrigin(0, 0.5);

    label.setDepth(2002);

    const toggle = this.add.graphics();

    toggle.setDepth(2002);

    const updateToggle = () => {

        toggle.clear();

        const enabled =
            setting === 'music'
                ? this.musicEnabled
                : this.soundEnabled;

        toggle.fillStyle(
            enabled
                ? 0x4f2922
                : 0x292323,
            1
        );

        toggle.lineStyle(
            2,
            enabled
                ? 0x9b2b20
                : 0x55504a,
            1
        );

        toggle.fillRoundedRect(
            x + 70,
            y - 20,
            100,
            40,
            8
        );

        toggle.strokeRoundedRect(
            x + 70,
            y - 20,
            100,
            40,
            8
        );

        const stateText = this.add.text(
            x + 120,
            y,
            enabled ? 'ON' : 'OFF',
            {
                fontFamily: 'Arial',
                fontSize: '16px',
                fontStyle: 'bold',
                color: enabled
                    ? '#ffffff'
                    : '#888078'
            }
        ).setOrigin(0.5);

        stateText.setDepth(2003);

        if (toggle.stateText) {
            toggle.stateText.destroy();
        }

        toggle.stateText = stateText;

    };

    updateToggle();

    toggle.setInteractive(
        new Phaser.Geom.Rectangle(
            x + 70,
            y - 20,
            100,
            40
        ),
        Phaser.Geom.Rectangle.Contains
    );

    toggle.input.cursor = 'pointer';

    toggle.on('pointerdown', () => {

        if (setting === 'music') {

            this.musicEnabled =
                !this.musicEnabled;

            localStorage.setItem(
                'C2C_MUSIC',
                this.musicEnabled
            );

        } else {

            this.soundEnabled =
                !this.soundEnabled;

            localStorage.setItem(
                'C2C_SOUND',
                this.soundEnabled
            );

        }

        updateToggle();

    });

    this.settingsObjects =
        this.settingsObjects || [];

    this.settingsObjects.push(
        label,
        toggle
    );

}

createBackButton(x, y) {

    const button = this.add.graphics();

    button.setDepth(2002);

    const width = 220;
    const height = 55;
    const point = 20;

    const drawButton = (fill, border) => {

        button.clear();

        button.fillStyle(
            fill,
            1
        );

        button.lineStyle(
            3,
            border,
            1
        );

        button.beginPath();

        button.moveTo(
            x - width / 2,
            y
        );

        button.lineTo(
            x - width / 2 + point,
            y - height / 2
        );

        button.lineTo(
            x + width / 2 - point,
            y - height / 2
        );

        button.lineTo(
            x + width / 2,
            y
        );

        button.lineTo(
            x + width / 2 - point,
            y + height / 2
        );

        button.lineTo(
            x - width / 2 + point,
            y + height / 2
        );

        button.closePath();

        button.fillPath();
        button.strokePath();

    };

    drawButton(
        0x2b2522,
        0x6b3a2a
    );

    const label = this.add.text(
        x,
        y,
        'BACK',
        {
            fontFamily: 'Arial',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#d6c8bd',
            letterSpacing: 2
        }
    ).setOrigin(0.5);

    label.setDepth(2003);

    button.setInteractive(
        new Phaser.Geom.Rectangle(
            x - width / 2,
            y - height / 2,
            width,
            height
        ),
        Phaser.Geom.Rectangle.Contains
    );

    button.input.cursor = 'pointer';

    button.on('pointerover', () => {

        drawButton(
            0x3a2925,
            0x9b2b20
        );

        label.setColor('#ffffff');

    });

    button.on('pointerout', () => {

        drawButton(
            0x2b2522,
            0x6b3a2a
        );

        label.setColor('#d6c8bd');

    });

    button.on('pointerdown', () => {

        this.closeSettings();

    });

    this.settingsObjects =
        this.settingsObjects || [];

    this.settingsObjects.push(
        button,
        label
    );

}

closeSettings() {

    if (!this.settingsOpen) {
        return;
    }

    this.settingsOpen = false;

    if (this.settingsOverlay) {
        this.settingsOverlay.destroy();
    }

    if (this.settingsPanel) {
        this.settingsPanel.destroy();
    }

    if (this.settingsTitle) {
        this.settingsTitle.destroy();
    }

    if (this.settingsObjects) {

        for (const object of this.settingsObjects) {

            if (object.stateText) {
                object.stateText.destroy();
            }

            object.destroy();

        }

    }

    this.settingsObjects = [];

}


}
