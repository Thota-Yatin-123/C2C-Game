class Level1Scene extends Phaser.Scene {

    constructor() {
        super('Level1Scene');
    }

    create() {

        this.sound.pauseOnBlur = false;

        /*
         * =================================
         * LEVEL 1 MUSIC
         * =================================
         */

        const gameMusic = this.sound.get('gameMusic');

        if (gameMusic) {

            if (!gameMusic.isPlaying) {

                gameMusic.play({
                    loop: true,
                    volume: 0.5
                });

            }

        } else {

            this.sound.play(
                'gameMusic',
                {
                    loop: true,
                    volume: 0.5
                }
            );

        }

        const worldWidth = 2000;
        const worldHeight = 1400;

        this.physics.world.setBounds(
            0,
            0,
            worldWidth,
            worldHeight
        );

        this.cameras.main.setBounds(
            0,
            0,
            worldWidth,
            worldHeight
        );


        /*
         * =================================
         * BACKGROUND
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            worldHeight / 2,
            worldWidth,
            worldHeight,
            0x2d3a27
        );


        /*
         * =================================
         * ROADS
         * =================================
         */

        const roadColor = 0xb0c4de;

        this.roads = [];

        this.roads.push(
            this.add.rectangle(
                1020,
                950,
                70,
                700,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                1100,
                950,
                70,
                700,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                503,
                375,
                50,
                350,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                1375,
                734,
                70,
                1069,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                1800,
                725,
                50,
                600,
                roadColor
            )
        );

        const road1 = this.add.rectangle(
            567,
            567,
            175,
            55,
            roadColor
        );

        road1.setRotation(
            Phaser.Math.DegToRad(30)
        );

        this.roads.push(road1);

        const road2 = this.add.rectangle(
            815,
            1350,
            1200,
            60,
            roadColor
        );

        road2.setRotation(
            Phaser.Math.DegToRad(-10)
        );

        this.roads.push(road2);

        const road3 = this.add.rectangle(
            1450,
            1400,
            410,
            60,
            roadColor
        );

        road3.setRotation(
            Phaser.Math.DegToRad(70)
        );

        this.roads.push(road3);

        const road4 = this.add.rectangle(
            850,
            1550,
            410,
            60,
            roadColor
        );

        road4.setRotation(
            Phaser.Math.DegToRad(80)
        );

        this.roads.push(road4);

        const road5 = this.add.rectangle(
            1570,
            750,
            450,
            60,
            roadColor
        );

        road5.setRotation(
            Phaser.Math.DegToRad(-10)
        );

        this.roads.push(road5);

        const road6 = this.add.rectangle(
            2000,
            750,
            400,
            60,
            roadColor
        );

        road6.setRotation(
            Phaser.Math.DegToRad(10)
        );

        this.roads.push(road6);

        const road7 = this.add.rectangle(
            2000,
            1010,
            400,
            60,
            roadColor
        );

        road7.setRotation(
            Phaser.Math.DegToRad(5)
        );

        this.roads.push(road7);

        this.roads.push(
            this.add.rectangle(
                1000,
                609,
                750,
                50,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                930,
                225,
                850,
                50,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                1600,
                1000,
                400,
                50,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                2000,
                450,
                400,
                50,
                roadColor
            )
        );

        this.roads.push(
            this.add.rectangle(
                750,
                1100,
                550,
                56,
                roadColor
            )
        );


        /*
         * =================================
         * BUILDINGS
         * =================================
         */

        const buildingColor = 0x55504a;

        this.add.rectangle(
            950,
            415,
            550,
            300,
            buildingColor
        );

        this.add.rectangle(
            1240,
            925,
            175,
            550,
            buildingColor
        );

        this.add.rectangle(
            790,
            930,
            350,
            230,
            buildingColor
        );

        this.add.rectangle(
            575,
            1240,
            200,
            200,
            buildingColor
        );

        this.add.rectangle(
            2000,
            580,
            300,
            180,
            buildingColor
        );

        const building1 = this.add.rectangle(
            2000,
            860,
            300,
            150,
            buildingColor
        );

        building1.setRotation(
            Phaser.Math.DegToRad(10)
        );

        const building2 = this.add.rectangle(
            1150,
            1500,
            500,
            300,
            buildingColor
        );

        building2.setRotation(
            Phaser.Math.DegToRad(-10)
        );


        /*
         * =================================
         * STREETLIGHT GLOW TEXTURE
         * =================================
         */

        const glowCanvas =
            document.createElement('canvas');

        glowCanvas.width = 256;
        glowCanvas.height = 256;

        const glowContext =
            glowCanvas.getContext('2d');

        const gradient =
            glowContext.createRadialGradient(
                128,
                128,
                0,
                128,
                128,
                128
            );

        gradient.addColorStop(
            0,
            'rgba(255, 230, 150, 0.95)'
        );

        gradient.addColorStop(
            0.12,
            'rgba(255, 220, 130, 0.75)'
        );

        gradient.addColorStop(
            0.30,
            'rgba(255, 205, 110, 0.40)'
        );

        gradient.addColorStop(
            0.55,
            'rgba(255, 190, 90, 0.16)'
        );

        gradient.addColorStop(
            0.75,
            'rgba(255, 180, 80, 0.06)'
        );

        gradient.addColorStop(
            1,
            'rgba(255, 170, 70, 0)'
        );

        glowContext.fillStyle = gradient;

        glowContext.fillRect(
            0,
            0,
            256,
            256
        );

        if (!this.textures.exists('streetLightGlow')) {

            this.textures.addCanvas(
                'streetLightGlow',
                glowCanvas
            );

        }


        /*
         * =================================
         * FLICKERING STREETLIGHTS
         * =================================
         */

        const streetLightPositions = [

            [550, 510],
            [1250, 570],
            [1300, 185],

            [975, 770],
            [1060, 970],
            [875, 1135],
            [500, 1065],

            [860, 1365],

            [1425, 1165],
            [1825, 1025],
            [1975, 700],
            [1500, 800],
            [1875, 415]

        ];

        this.streetLights = [];


        for (
            const [x, y]
            of streetLightPositions
        ) {

            /*
             * Pole
             */

            const pole =
                this.add.rectangle(
                    x,
                    y,
                    6,
                    45,
                    0x191919
                );

            pole.setDepth(1001);


            /*
             * Lamp
             */

            const lamp =
                this.add.rectangle(
                    x,
                    y - 25,
                    14,
                    8,
                    0xffd98a
                );

            lamp.setDepth(1003);


            /*
             * Real radial glow
             */

            const glow =
                this.add.image(
                    x,
                    y - 22,
                    'streetLightGlow'
                );

            glow.setDisplaySize(
                180,
                180
            );

            glow.setDepth(1002);

            glow.setBlendMode(
                Phaser.BlendModes.ADD
            );

            glow.setAlpha(0.75);


            this.streetLights.push({
                pole,
                lamp,
                glow
            });


            if (x === 1250 && y === 570) {

                /*
                 * =================================
                 * EYES BEHIND THE LIGHT
                 * =================================
                 */

                const eyes = this.add.graphics();

                this.eyeX = x;
                this.eyeY = y - 55;
                this.eyes = eyes;

                /*
                 * Store the exact lamp that
                 * controls these eyes.
                 */

                this.lampForEyes = lamp;

                eyes.setDepth(1011);

                /*
                 * Left eye
                 */

                eyes.fillStyle(
                    0xffffff,
                    1
                );

                eyes.fillCircle(
                    x - 12,
                    y - 55,
                    4
                );

                /*
                 * Right eye
                 */

                eyes.fillCircle(
                    x + 12,
                    y - 55,
                    4
                );

                /*
                 * Keep eyes hidden while light is ON
                 */

                eyes.setVisible(false);


                /*
                 * =================================
                 * LIGHT / EYES TOGGLE
                 * =================================
                 */

                this.time.addEvent({

                    delay: 10000,

                    loop: true,

                    callback: () => {

                        const isOn =
                            lamp.visible &&
                            lamp.alpha > 0;

                        /*
                         * Turn light OFF
                         */

                        if (isOn) {

                            lamp.setAlpha(0);

                            glow.setAlpha(0);

                            eyes.setVisible(true);

                        }

                        /*
                         * Turn light ON
                         */

                        else {

                            lamp.setAlpha(1);

                            glow.setAlpha(0.75);

                            eyes.setVisible(false);

                        }

                    }

                });

            }

        }


        /*
         * =================================
         * TRASH CANS
         * =================================
         */

        const trashCanPositions = [

            [550, 300],
            [900, 590],
            [1290, 590],

            [650, 1130],
            [900, 1060],

            [1160, 1250],

            [1425, 1025],
            [1750, 750],
            [1960, 975]

        ];


        for (
            const [x, y]
            of trashCanPositions
        ) {

            /*
             * Main bin
             */

            const bin =
                this.add.rectangle(
                    x,
                    y,
                    18,
                    25,
                    0x303030
                );

            bin.setDepth(40);


            /*
             * Bin lid
             */

            const lid =
                this.add.rectangle(
                    x,
                    y - 14,
                    22,
                    5,
                    0x181818
                );

            lid.setDepth(41);


            /*
             * Small highlight
             */

            const highlight =
                this.add.rectangle(
                    x - 5,
                    y - 4,
                    2,
                    14,
                    0x555555
                );

            highlight.setDepth(41);

        }


        /*
         * =================================
         * LORE BOARD
         * =================================
         */

        this.loreX = 720;
        this.loreY = 555;

        this.loreRead = false;


        /*
         * Main brown notice board
         */

        this.loreBoard =
            this.add.rectangle(
                this.loreX,
                this.loreY,
                50,
                36,
                0x6b3f20
            );

        this.loreBoard.setDepth(50);

        this.loreBoard.setStrokeStyle(
            2,
            0x30180b
        );


        /*
         * Black text-like lines
         */

        this.loreLines = [];

        const lineData = [

            {
                x: -17,
                y: -11,
                width: 34
            },

            {
                x: -17,
                y: -5,
                width: 40
            },

            {
                x: -17,
                y: 1,
                width: 31
            },

            {
                x: -17,
                y: 7,
                width: 38
            },

            {
                x: -17,
                y: 13,
                width: 24
            }

        ];


        for (
            const line
            of lineData
        ) {

            const textLine =
                this.add.rectangle(
                    this.loreX +
                    line.x +
                    line.width / 2,

                    this.loreY +
                    line.y,

                    line.width,
                    2,
                    0x111111
                );

            textLine.setDepth(51);

            this.loreLines.push(
                textLine
            );

        }


        /*
         * Small nail/detail
         */

        this.loreBoardNail =
            this.add.circle(
                this.loreX,
                this.loreY,
                2,
                0x191919
            );

        this.loreBoardNail.setDepth(52);


        /*
         * =================================
         * PLAYER
         * =================================
         */

        this.player =
            this.add.rectangle(
                1020,
                700,
                30,
                30,
                0xff0000
            );

        this.physics.add.existing(
            this.player
        );

        this.player.body.setCollideWorldBounds(
            true
        );


        /*
         * =================================
         * RETURN FROM SUBWAY
         * =================================
         */

        const returnFromSubway =
            localStorage.getItem(
                'C2C_RETURN_FROM_SUBWAY'
            );

        if (
            returnFromSubway === 'true'
        ) {

            const saveFile =
                localStorage.getItem(
                    'C2C_SAVE'
                );

            if (saveFile) {

                try {

                    const saveData =
                        JSON.parse(
                            saveFile
                        );

                    if (
                        saveData.level1 &&
                        typeof saveData.level1.x === 'number' &&
                        typeof saveData.level1.y === 'number'
                    ) {

                        this.player.setPosition(
                            saveData.level1.x,
                            saveData.level1.y
                        );

                    }

                } catch (error) {

                    console.log(
                        'Level 1 return error:',
                        error
                    );

                }

            }

            localStorage.removeItem(
                'C2C_RETURN_FROM_SUBWAY'
            );

        }


        /*
         * =================================
         * LOAD SAVE
         * =================================
         */

        const loadGame =
            localStorage.getItem(
                'C2C_LOAD_GAME'
            );

        const saveFile =
            localStorage.getItem(
                'C2C_SAVE'
            );

        if (
            loadGame === 'true' &&
            saveFile
        ) {

            try {

                const saveData =
                    JSON.parse(saveFile);

                if (
                    saveData.level1 &&
                    typeof saveData.level1.x === 'number' &&
                    typeof saveData.level1.y === 'number'
                ) {

                    this.player.setPosition(
                        saveData.level1.x,
                        saveData.level1.y
                    );

                }

                this.subwayUnlocked =
                    (
                        saveData.completedKeys &&
                        saveData.completedKeys.length >= 3
                    ) ||
                    saveData.subwayUnlocked ||
                    false;

            } catch (error) {

                console.log(
                    'Save load error:',
                    error
                );

            }

            localStorage.removeItem(
                'C2C_LOAD_GAME'
            );

        }


        /*
         * =================================
         * LOAD GLOBAL NAUSEA STATE
         * =================================
         */

        this.nauseaActivated = false;

        const currentSave =
            localStorage.getItem(
                'C2C_SAVE'
            );

        if (currentSave) {

            try {

                const saveData =
                    JSON.parse(
                        currentSave
                    );

                this.nauseaActivated =
                    saveData.nauseaActivated === true;

            } catch (error) {

                console.log(
                    'Nausea state load error:',
                    error
                );

            }

        }


        /*
         * =================================
         * MOVEMENT KEYS
         * =================================
         */

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keys =
            this.input.keyboard.addKeys({

                W:
                    Phaser.Input.Keyboard.KeyCodes.W,

                A:
                    Phaser.Input.Keyboard.KeyCodes.A,

                S:
                    Phaser.Input.Keyboard.KeyCodes.S,

                D:
                    Phaser.Input.Keyboard.KeyCodes.D

            });


        /*
         * =================================
         * INTERACTION KEY
         * =================================
         */

        this.interactKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.E
            );


        /*
         * =================================
         * CAMERA
         * =================================
         */

        this.cameras.main.startFollow(
            this.player,
            true
        );


        /*
         * =================================
         * DARKNESS
         * =================================
         */

        this.darkness =
            this.add.graphics();

        this.darkness.setScrollFactor(0);

        this.darkness.setDepth(1000);


        /*
         * =================================
         * FLASHLIGHT
         * =================================
         */

        this.flashlight =
            this.add.graphics();

        this.flashlight.setScrollFactor(0);

        this.flashlight.setDepth(1001);


        /*
         * =================================
         * FLASHLIGHT RADIAL GLOW TEXTURE
         * =================================
         */

        const torchCanvas =
            document.createElement('canvas');

        torchCanvas.width = 256;
        torchCanvas.height = 256;

        const torchContext =
            torchCanvas.getContext('2d');

        const torchGradient =
            torchContext.createRadialGradient(
                128,
                128,
                0,
                128,
                128,
                128
            );

        torchGradient.addColorStop(
            0,
            'rgba(255, 255, 220, 0.90)'
        );

        torchGradient.addColorStop(
            0.12,
            'rgba(255, 255, 210, 0.65)'
        );

        torchGradient.addColorStop(
            0.30,
            'rgba(255, 250, 190, 0.35)'
        );

        torchGradient.addColorStop(
            0.50,
            'rgba(255, 240, 160, 0.16)'
        );

        torchGradient.addColorStop(
            0.70,
            'rgba(255, 230, 130, 0.06)'
        );

        torchGradient.addColorStop(
            1,
            'rgba(255, 220, 100, 0)'
        );

        torchContext.fillStyle =
            torchGradient;

        torchContext.fillRect(
            0,
            0,
            256,
            256
        );


        if (
            !this.textures.exists(
                'torchGlow'
            )
        ) {

            this.textures.addCanvas(
                'torchGlow',
                torchCanvas
            );

        }


        /*
         * Actual soft glow
         */

        this.torchGlow =
            this.add.image(
                0,
                0,
                'torchGlow'
            );

        this.torchGlow.setScrollFactor(0);

        this.torchGlow.setDepth(1001);

        this.torchGlow.setDisplaySize(
            180,
            180
        );

        this.torchGlow.setBlendMode(
            Phaser.BlendModes.ADD
        );

        this.torchGlow.setAlpha(
            0.65
        );


        this.facingX = 0;
        this.facingY = -1;


        /*
         * =================================
         * GAME PAUSE STATE
         * =================================
         */

        this.gamePaused = false;


        /*
         * =================================
         * INTERACTION LOCATIONS
         * =================================
         */

        this.interactionX = 1050;
        this.interactionY = 1000;

        this.interactionX2 = 1600;
        this.interactionY2 = 1000;

        //DELETE THIS!!!
        this.subwayUnlocked = true;


        /*
         * =================================
         * INTERACTION PROMPT
         * =================================
         */

        this.interactionPrompt =
            this.add.text(
                0,
                0,
                '[ E ] INTERACT',
                {
                    fontFamily: 'Arial',
                    fontSize: '18px',
                    fontStyle: 'bold',
                    color: '#ffffff',
                    backgroundColor: '#000000',

                    padding: {
                        left: 10,
                        right: 10,
                        top: 6,
                        bottom: 6
                    }
                }
            );

        this.interactionPrompt.setOrigin(0.5);

        this.interactionPrompt.setScrollFactor(0);

        this.interactionPrompt.setDepth(2000);

        this.interactionPrompt.setVisible(false);


        /*
         * =================================
         * LORE PROMPT
         * =================================
         */

        this.lorePrompt =
            this.add.text(
                0,
                0,
                '[ E ] READ',
                {
                    fontFamily: 'Arial',
                    fontSize: '18px',
                    fontStyle: 'bold',
                    color: '#ffffff',
                    backgroundColor: '#000000',

                    padding: {
                        left: 10,
                        right: 10,
                        top: 6,
                        bottom: 6
                    }
                }
            );

        this.lorePrompt.setOrigin(0.5);

        this.lorePrompt.setScrollFactor(0);

        this.lorePrompt.setDepth(2000);

        this.lorePrompt.setVisible(false);


        /*
         * =================================
         * LORE OVERLAY
         * =================================
         */

        this.loreOverlay =
            this.add.rectangle(
                this.scale.width / 2,
                this.scale.height / 2,
                this.scale.width,
                this.scale.height,
                0x000000,
                0.82
            );

        this.loreOverlay.setScrollFactor(0);

        this.loreOverlay.setDepth(3000);

        this.loreOverlay.setVisible(false);


        /*
         * =================================
         * LORE TEXT
         * =================================
         */

        this.loreText =
            this.add.text(
                this.scale.width / 2,
                this.scale.height / 2,
                '',
                {
                    fontFamily: 'Courier New',
                    fontSize: '20px',
                    color: '#dddddd',
                    align: 'left',

                    wordWrap: {
                        width: 650
                    },

                    lineSpacing: 8
                }
            );

        this.loreText.setOrigin(0.5);

        this.loreText.setScrollFactor(0);

        this.loreText.setDepth(3001);

        this.loreText.setVisible(false);


        /*
         * =================================
         * SAMOLE HORROR GAME IFRAME
         * =================================
         */

        this.samoleFrame = null;

        this.samoleLoaded = false;


        /*
         * =================================
         * MESSAGE FROM SAMOLE
         * =================================
         */

        this.samoleMessageHandler = (event) => {

            /*
             * ALL KEYS COLLECTED
             */

            if (
                event.data &&
                event.data.type ===
                'SAMOLE_KEYS_COLLECTED'
            ) {

                this.subwayUnlocked = true;

                return;

            }


            /*
             * SAMOLE ESCAPED
             */

            if (
                !event.data ||
                event.data.type !==
                'SAMOLE_ESCAPE'
            ) {

                return;

            }


            /*
             * Hide SAMOLE
             */

            if (this.samoleFrame) {

                this.samoleFrame.style.display =
                    'none';

            }


            /*
             * Resume Level 1
             */

            this.gamePaused = false;

            this.physics.resume();


            if (this.input.keyboard) {

                this.input.keyboard.enabled =
                    true;

            }


            if (
                this.player &&
                this.player.body
            ) {

                this.player.body.setVelocity(
                    0,
                    0
                );

            }


            /*
             * Focus Phaser again
             */

            this.game.canvas.focus();

        };


        window.addEventListener(
            'message',
            this.samoleMessageHandler
        );


        this.gamePaused = false;

        this.physics.resume();

    }


    /*
     * =================================
     * BUILDING GLOWS
     * =================================
     */

    createBuildingGlows() {

        this.buildingGlows = [];

        const glowPositions = [

            [780, 350],
            [900, 350],
            [1020, 350],
            [1140, 350],
            [1260, 350],
            [1380, 350],

            [1240, 780],
            [1240, 850],
            [1240, 1000],
            [1240, 1080],

            [680, 880],
            [760, 880],
            [840, 880],
            [900, 980],

            [520, 1180],
            [580, 1180],
            [520, 1250],
            [580, 1300],

            [1900, 540],
            [1980, 540],
            [2070, 540],

            [1900, 820],
            [2000, 820],
            [2090, 820],

            [1000, 1400],
            [1100, 1400],
            [1200, 1400],
            [1300, 1400]

        ];


        for (
            const [x, y]
            of glowPositions
        ) {

            const glow =
                this.add.rectangle(
                    x,
                    y,
                    12,
                    18,
                    0xffb347,
                    0
                );

            glow.setAlpha(0.15);

            glow.setDepth(1010);

            glow.setBlendMode(
                Phaser.BlendModes.ADD
            );

            this.buildingGlows.push(
                glow
            );

        }


        this.time.addEvent({

            delay: 700,

            loop: true,

            callback: () => {

                const glow =
                    Phaser.Utils.Array.GetRandom(
                        this.buildingGlows
                    );

                if (glow.alpha > 0) {

                    this.tweens.add({

                        targets: glow,

                        alpha: 0,

                        duration:
                            Phaser.Math.Between(
                                100,
                                400
                            )

                    });

                } else {

                    this.tweens.add({

                        targets: glow,

                        alpha:
                            Phaser.Math.FloatBetween(
                                0.08,
                                0.25
                            ),

                        duration:
                            Phaser.Math.Between(
                                100,
                                300
                            ),

                        yoyo: true,

                        hold:
                            Phaser.Math.Between(
                                500,
                                2000
                            )

                    });

                }

            }

        });

    }


    /*
     * =================================
     * CHECK IF PLAYER IS ON ROAD
     * =================================
     */

    isOnRoad(x, y) {

        const halfSize = 10;

        const points = [

            {
                x: x - halfSize,
                y: y - halfSize
            },

            {
                x: x + halfSize,
                y: y - halfSize
            },

            {
                x: x - halfSize,
                y: y + halfSize
            },

            {
                x: x + halfSize,
                y: y + halfSize
            },

            {
                x: x,
                y: y
            }

        ];


        for (
            const road of this.roads
        ) {

            const cos =
                Math.cos(
                    -road.rotation
                );

            const sin =
                Math.sin(
                    -road.rotation
                );

            let insideCount = 0;


            for (
                const point
                of points
            ) {

                const dx =
                    point.x -
                    road.x;

                const dy =
                    point.y -
                    road.y;

                const rotatedX =
                    dx * cos -
                    dy * sin;

                const rotatedY =
                    dx * sin +
                    dy * cos;


                if (

                    rotatedX >=
                    -road.width / 2 &&

                    rotatedX <=
                    road.width / 2 &&

                    rotatedY >=
                    -road.height / 2 &&

                    rotatedY <=
                    road.height / 2

                ) {

                    insideCount++;

                }

            }


            if (
                insideCount >= 3
            ) {

                return true;

            }

        }

        return false;

    }


    /*
     * =================================
     * UPDATE
     * =================================
     */

    update() {

        /*
         * =================================
         * AUTO SAVE POSITION
         * =================================
         */

        this.saveTimer =
            (this.saveTimer || 0) +
            this.game.loop.delta;

        if (
            this.saveTimer >= 1000
        ) {

            this.saveTimer = 0;

            const existingSave =
                localStorage.getItem(
                    'C2C_SAVE'
                );

            let saveData = {

                version: 1,

                scene: 'Level1Scene',

                completedKeys: [],

                level1: {
                    x: this.player.x,
                    y: this.player.y
                },

                samole: null,

                subwayUnlocked:
                    this.subwayUnlocked || false,

                nauseaActivated:
                    this.nauseaActivated || false,

                updatedAt:
                    Date.now()

            };


            if (existingSave) {

                try {

                    const oldSave =
                        JSON.parse(existingSave);

                    saveData =
                        {
                            ...saveData,
                            ...oldSave,

                            scene:
                                'Level1Scene',

                            level1: {
                                x: this.player.x,
                                y: this.player.y
                            },

                            subwayUnlocked:
                                this.subwayUnlocked ||
                                oldSave.subwayUnlocked ||
                                false,

                            nauseaActivated:
                                this.nauseaActivated ||
                                oldSave.nauseaActivated ||
                                false,

                            updatedAt:
                                Date.now()
                        };

                } catch (error) {

                    console.log(
                        'Save error:',
                        error
                    );

                }

            }


            localStorage.setItem(
                'C2C_SAVE',
                JSON.stringify(saveData)
            );

        }


        /*
         * =================================
         * LORE SCREEN
         * =================================
         */

        if (this.gamePaused) {

            if (
                Phaser.Input.Keyboard.JustDown(
                    this.interactKey
                )
            ) {

                if (
                    this.loreOverlay.visible
                ) {

                    this.closeLore();

                }

            }

            return;

        }


        const speed = 500;

        let velocityX = 0;
        let velocityY = 0;


        /*
         * =================================
         * MOVEMENT INPUT
         * =================================
         */

        if (
            this.cursors.left.isDown ||
            this.keys.A.isDown
        ) {

            velocityX = -speed;

        }

        if (
            this.cursors.right.isDown ||
            this.keys.D.isDown
        ) {

            velocityX = speed;

        }

        if (
            this.cursors.up.isDown ||
            this.keys.W.isDown
        ) {

            velocityY = -speed;

        }

        if (
            this.cursors.down.isDown ||
            this.keys.S.isDown
        ) {

            velocityY = speed;

        }


        /*
         * =================================
         * DIAGONAL MOVEMENT
         * =================================
         */

        if (
            velocityX !== 0 &&
            velocityY !== 0
        ) {

            const length =
                Math.sqrt(
                    velocityX * velocityX +
                    velocityY * velocityY
                );

            velocityX =
                (velocityX / length) *
                speed;

            velocityY =
                (velocityY / length) *
                speed;

        }


        /*
         * =================================
         * GLOBAL CONTROL INVERSION
         * =================================
         */

        if (this.nauseaActivated) {

            velocityX *= -1;
            velocityY *= -1;

        }


        /*
         * =================================
         * NEXT POSITION
         * =================================
         */

        const delta =
            this.game.loop.delta / 1000;

        const nextX =
            this.player.x +
            velocityX * delta;

        const nextY =
            this.player.y +
            velocityY * delta;


        /*
         * =================================
         * ROAD-ONLY MOVEMENT
         * =================================
         */

        if (
            velocityX !== 0 ||
            velocityY !== 0
        ) {

            if (
                this.isOnRoad(
                    nextX,
                    nextY
                )
            ) {

                this.player.body.setVelocity(
                    velocityX,
                    velocityY
                );

            } else {

                this.player.body.setVelocity(
                    0,
                    0
                );

            }

        } else {

            this.player.body.setVelocity(
                0,
                0
            );

        }


        /*
         * =================================
         * INTERACTION DISTANCES
         * =================================
         */

        const distanceToBuilding =
            Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.interactionX,
                this.interactionY
            );

        const distance2 =
            Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.interactionX2,
                this.interactionY2
            );

        const distanceToLore =
            Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.loreX,
                this.loreY
            );


        const canInteract =
            distanceToBuilding < 40;

        const canInteract2 =
            distance2 < 60;

        const canReadLore =
            distanceToLore < 55;


        /*
         * =================================
         * LORE PROMPT
         * =================================
         */

        if (canReadLore) {

            this.interactionPrompt.setVisible(
                false
            );

            this.lorePrompt.setVisible(
                true
            );

            const screenX =
                this.player.x -
                this.cameras.main.scrollX;

            const screenY =
                this.player.y -
                this.cameras.main.scrollY;

            this.lorePrompt.setPosition(
                screenX,
                screenY - 45
            );

        } else {

            this.lorePrompt.setVisible(
                false
            );


            /*
             * NORMAL INTERACTION PROMPT
             */

            if (
                canInteract ||
                canInteract2
            ) {

                this.interactionPrompt.setVisible(
                    true
                );

                const screenX =
                    this.player.x -
                    this.cameras.main.scrollX;

                const screenY =
                    this.player.y -
                    this.cameras.main.scrollY;

                this.interactionPrompt.setPosition(
                    screenX,
                    screenY - 45
                );

            } else {

                this.interactionPrompt.setVisible(
                    false
                );

            }

        }


        /*
         * =================================
         * PRESS E — LORE
         * =================================
         */

        if (
            canReadLore &&
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            this.openLore();

            return;

        }


        /*
         * =================================
         * PRESS E — SAMOLE
         * =================================
         */

        if (
            canInteract &&
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            this.showTestScreen();

            return;

        }


        /*
         * =================================
         * PRESS E — SUBWAY
         * =================================
         */

        if (
            canInteract2 &&
            this.subwayUnlocked &&
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            const gameMusic =
                this.sound.get('gameMusic');

            if (gameMusic) {
                gameMusic.stop();
            }

            this.scene.start(
                'SubwayTunnel1'
            );

            return;

        }


        /*
         * =================================
         * DARKNESS
         * =================================
         */

        this.darkness.clear();


        const playerX =
            this.player.x -
            this.cameras.main.scrollX;

        const playerY =
            this.player.y -
            this.cameras.main.scrollY;


        this.darkness.fillStyle(
            0x000000,
            0.82
        );


        this.darkness.fillRect(
            0,
            0,
            this.scale.width,
            this.scale.height
        );


        /*
         * =================================
         * FACING DIRECTION
         * =================================
         */

        if (
            velocityX !== 0 ||
            velocityY !== 0
        ) {

            this.facingX =
                velocityX;

            this.facingY =
                velocityY;


            const length =
                Math.sqrt(
                    this.facingX *
                    this.facingX +

                    this.facingY *
                    this.facingY
                );


            this.facingX /=
                length;

            this.facingY /=
                length;

        }


        /*
         * =================================
         * FLASHLIGHT
         * =================================
         */

        this.flashlight.clear();

        const flashlightLength = 280;
        const flashlightWidth = 70;


        const endX =
            playerX +
            this.facingX *
            flashlightLength;

        const endY =
            playerY +
            this.facingY *
            flashlightLength;


        const perpendicularX =
            -this.facingY;

        const perpendicularY =
            this.facingX;


        const leftX =
            endX +
            perpendicularX *
            flashlightWidth;

        const leftY =
            endY +
            perpendicularY *
            flashlightWidth;


        const rightX =
            endX -
            perpendicularX *
            flashlightWidth;

        const rightY =
            endY -
            perpendicularY *
            flashlightWidth;


        this.flashlight.fillStyle(
            0xffffcc,
            0.20
        );


        this.flashlight.beginPath();

        this.flashlight.moveTo(
            playerX,
            playerY
        );

        this.flashlight.lineTo(
            leftX,
            leftY
        );

        this.flashlight.lineTo(
            rightX,
            rightY
        );

        this.flashlight.closePath();

        this.flashlight.fillPath();


        /*
         * =================================
         * FLASHLIGHT DETECTS EYES
         * =================================
         */

        if (
            this.eyes &&
            this.lampForEyes
        ) {

            /*
             * Is the streetlight currently ON?
             */

            const streetLightOn =
                this.lampForEyes.visible &&
                this.lampForEyes.alpha > 0;


            /*
             * If the streetlight is ON,
             * the eyes must stay hidden.
             */

            if (streetLightOn) {

                this.eyes.setVisible(
                    false
                );

            } else {

                /*
                 * Streetlight is OFF.
                 * Check whether the flashlight
                 * is shining at the eyes.
                 */

                const dx =
                    this.eyeX -
                    this.player.x;

                const dy =
                    this.eyeY -
                    this.player.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                /*
                 * Assume the flashlight is
                 * NOT hitting the eyes.
                 */

                let flashlightHittingEyes =
                    false;


                /*
                 * Eyes must be within
                 * flashlight range.
                 */

                if (
                    distance > 0 &&
                    distance <= flashlightLength
                ) {

                    /*
                     * Direction from player
                     * towards the eyes.
                     */

                    const directionX =
                        dx / distance;

                    const directionY =
                        dy / distance;


                    /*
                     * Dot product determines
                     * whether the eyes are
                     * inside the flashlight cone.
                     */

                    const dot =
                        this.facingX *
                        directionX +

                        this.facingY *
                        directionY;


                    /*
                     * 0.70 means the eyes
                     * must be reasonably
                     * centered in the beam.
                     */

                    if (
                        dot >= 0.70
                    ) {

                        flashlightHittingEyes =
                            true;

                    }

                }


                /*
                 * FINAL EYE STATE
                 *
                 * Streetlight OFF:
                 *
                 * Flashlight hitting eyes
                 *     -> HIDDEN
                 *
                 * Flashlight away
                 *     -> VISIBLE
                 */

                if (
                    flashlightHittingEyes
                ) {

                    this.eyes.setVisible(
                        false
                    );

                } else {

                    this.eyes.setVisible(
                        true
                    );

                }

            }

        }

    }


    /*
     * =================================
     * OPEN LORE
     * =================================
     */

    openLore() {

        this.gamePaused = true;

        this.physics.pause();

        this.interactionPrompt.setVisible(
            false
        );

        this.lorePrompt.setVisible(
            false
        );

        this.loreOverlay.setVisible(
            true
        );


        this.loreText.setText(
`HOSTEL NOTICE — 17/08/20XX


Students are advised not to leave
their rooms after 12:00 AM.

Reports of unusual sounds near the
Q-block are being investigated.


Residents are reminded to keep their
hostel doors locked at night.


— HOSTEL ADMINISTRATION


[ E ] CLOSE`
        );


        this.loreText.setVisible(
            true
        );

        this.loreRead = true;

    }


    /*
     * =================================
     * CLOSE LORE
     * =================================
     */

    closeLore() {

        this.loreOverlay.setVisible(
            false
        );

        this.loreText.setVisible(
            false
        );

        this.gamePaused = false;

        this.physics.resume();

        this.game.canvas.focus();

    }


    /*
     * =================================
     * START SAMOLE
     * =================================
     */

    showTestScreen() {

        /*
         * PREVENT MULTIPLE IFRAMES
         */

        if (this.samoleFrame) {

            this.gamePaused = true;

            this.physics.pause();

            this.interactionPrompt.setVisible(
                false
            );

            this.lorePrompt.setVisible(
                false
            );

            this.samoleFrame.style.display =
                'block';

            this.samoleFrame.contentWindow.focus();

            return;

        }


        /*
         * PAUSE LEVEL 1
         */

        this.gamePaused = true;

        this.physics.pause();

        this.interactionPrompt.setVisible(
            false
        );

        this.lorePrompt.setVisible(
            false
        );


        /*
         * CREATE SAMOLE IFRAME
         */

        this.samoleFrame =
            document.createElement(
                'iframe'
            );


        /*
         * Allow Pointer Lock inside SAMOLE
         */

        this.samoleFrame.setAttribute(
            'allow',
            'pointer-lock'
        );


        this.samoleFrame.style.position =
            'fixed';

        this.samoleFrame.style.top =
            '0';

        this.samoleFrame.style.left =
            '0';

        this.samoleFrame.style.width =
            '100vw';

        this.samoleFrame.style.height =
            '100vh';

        this.samoleFrame.style.border =
            'none';

        this.samoleFrame.style.zIndex =
            '99999';

        this.samoleFrame.style.display =
            'block';

        this.samoleFrame.style.background =
            '#000000';


        /*
         * Allow iframe to receive keyboard focus
         */

        this.samoleFrame.setAttribute(
            'tabindex',
            '-1'
        );


        /*
         * Add iframe to page
         */

        document.body.appendChild(
            this.samoleFrame
        );


        /*
         * Load SAMOLE
         */

        this.samoleFrame.src =
            'SAMOLE.html';


        /*
         * When SAMOLE loads, focus it
         */

        this.samoleFrame.addEventListener(
            'load',
            () => {

                this.samoleLoaded = true;

                this.samoleFrame.contentWindow.focus();


                try {

                    const samoleDocument =
                        this.samoleFrame.contentDocument;

                    if (
                        samoleDocument &&
                        samoleDocument.body
                    ) {

                        samoleDocument.body.focus();

                    }

                } catch (error) {

                    console.log(
                        'SAMOLE focus:',
                        error
                    );

                }

            }
        );

    }

}

