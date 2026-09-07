class Level2Scene extends Phaser.Scene {

constructor() {
    super('Level2');
}

create() {

    /*
     * =================================
     * WORLD
     * =================================
     */

    const worldWidth = 3000;
    const worldHeight = 1200;

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
            1500,
            600,
            3000,
            100,
            roadColor
        )
    );


    const road1 =
        this.add.rectangle(
            1500,
            1000,
            1000,
            60,
            roadColor
        );

    road1.setRotation(
        Phaser.Math.DegToRad(55)
    );

    this.roads.push(road1);


    const road2 =
        this.add.rectangle(
            700,
            810,
            400,
            60,
            roadColor
        );

    road2.setRotation(
        Phaser.Math.DegToRad(-75)
    );

    this.roads.push(road2);


    const road3 =
        this.add.rectangle(
            200,
            850,
            600,
            60,
            roadColor
        );

    road3.setRotation(
        Phaser.Math.DegToRad(50)
    );

    this.roads.push(road3);


    const road4 =
        this.add.rectangle(
            0,
            1000,
            1000,
            60,
            roadColor
        );

    road4.setRotation(
        Phaser.Math.DegToRad(65)
    );

    this.roads.push(road4);


    const road5 =
        this.add.rectangle(
            600,
            1025,
            500,
            60,
            roadColor
        );

    road5.setRotation(
        Phaser.Math.DegToRad(-17)
    );

    this.roads.push(road5);


    const road6 =
        this.add.rectangle(
            1120,
            930,
            600,
            60,
            roadColor
        );

    road6.setRotation(
        Phaser.Math.DegToRad(-5)
    );

    this.roads.push(road6);


    const road7 =
        this.add.rectangle(
            1215,
            1275,
            1000,
            60,
            roadColor
        );

    road7.setRotation(
        Phaser.Math.DegToRad(40)
    );

    this.roads.push(road7);


    /*
     * =================================
     * TRAIN TRACKS
     * =================================
     */

    this.add.rectangle(
        1500,
        150,
        3000,
        160,
        0x5a3a22
    );


    /*
     * Wooden sleepers
     */

    for (
        let x = 0;
        x < 3000;
        x += 50
    ) {

        this.add.rectangle(
            x,
            150,
            25,
            140,
            0x8b5a2b
        );

    }


    /*
     * Metal rails
     */

    this.add.rectangle(
        1500,
        105,
        3000,
        12,
        0xaaaaaa
    );

    this.add.rectangle(
        1500,
        195,
        3000,
        12,
        0xaaaaaa
    );


    /*
     * =================================
     * FENCE
     * =================================
     */

    const fenceColor = 0x555555;


    /*
     * Fence posts
     */

    for (
        let x = 0;
        x <= 3000;
        x += 100
    ) {

        this.add.rectangle(
            x,
            270,
            15,
            100,
            fenceColor
        );

    }


    /*
     * Horizontal fence bars
     */

    this.add.rectangle(
        1500,
        240,
        3000,
        10,
        fenceColor
    );

    this.add.rectangle(
        1500,
        290,
        3000,
        10,
        fenceColor
    );


    /*
     * =================================
     * BUILDING
     * =================================
     */

    const building =
        this.add.rectangle(
            640,
            1350,
            500,
            500,
            0x555555
        );

    building.setRotation(
        Phaser.Math.DegToRad(-20)
    );


    /*
     * =================================
     * BUILDING INTERACTION ZONE
     * =================================
     */

    this.buildingInteractionZone =
        this.add.rectangle(
            640,
            1000,
            200,
            100,
            0x000000,
            0
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


    if (
        !this.textures.exists(
            'streetLightGlow'
        )
    ) {

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

        [400, 500],
        [800, 500],
        [1200, 500],
        [1600, 500],
        [2000, 500],
        [2400, 500],
        [2800, 500],

        [400, 750],
        [800, 750],
        [1200, 750],
        [1600, 750],
        [2000, 750],
        [2400, 750],
        [2800, 750],

        [400, 1000],
        [800, 1000],
        [1200, 1000],
        [1500, 1200],
        [0, 750],
        [100, 1100]

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

    }


    /*
     * =================================
     * TRASH CANS
     * =================================
     */

    const trashCanPositions = [

        [450, 500],
        [850, 500],
        [1250, 500],
        [1650, 500],
        [2050, 500],
        [2450, 500],

        [650, 850],
        [1050, 850],
        [1450, 850],
        [1850, 850],
        [2250, 850]

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
     * BUILDING WINDOW GLOWS
     * =================================
     */

    this.buildingGlows = [];


    const glowPositions = [

        [500, 450],
        [600, 450],
        [700, 450],
        [800, 450],
        [900, 450],

        [1350, 350],
        [1450, 350],
        [1550, 350],
        [1650, 350],

        [2100, 450],
        [2200, 450],
        [2300, 450],
        [2400, 450],
        [2500, 450],

        [700, 850],
        [800, 850],
        [900, 850],
        [1000, 850],

        [1900, 850],
        [2000, 850],
        [2100, 850],
        [2200, 850]

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

            if (
                glow.alpha > 0
            ) {

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


    /*
     * =================================
     * PLAYER
     * =================================
     */

    this.player =
        this.add.rectangle(
            2550,
            600,
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
     * LOAD SAVED LEVEL 2 POSITION
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
                JSON.parse(
                    saveFile
                );


            /*
             * Restore Level 2 position
             */

            if (
                saveData.level2 &&
                typeof saveData.level2.x === 'number' &&
                typeof saveData.level2.y === 'number'
            ) {

                this.player.setPosition(
                    saveData.level2.x,
                    saveData.level2.y
                );

            }

        } catch (error) {

            console.log(
                'Level 2 save load error:',
                error
            );

        }


        localStorage.removeItem(
            'C2C_LOAD_GAME'
        );

    }


    /*
     * =================================
     * SUBWAY INTERACTION
     * =================================
     */

    this.subwayInteractionZone =
        this.add.rectangle(
            2920,
            600,
            160,
            100,
            0x000000,
            0
        );


    /*
     * Interaction text
     */

    this.subwayInteractText =
        this.add.text(
            0,
            0,
            '[ E ] INTERACT',
            {
                fontSize: '18px',
                fontStyle: 'bold',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 8,
                    y: 5
                }
            }
        );

    this.subwayInteractText.setDepth(
        2000
    );

    this.subwayInteractText.setVisible(
        false
    );


    /*
     * =================================
     * BUILDING INTERACTION TEXT
     * =================================
     */

    this.buildingInteractText =
        this.add.text(
            0,
            0,
            '[ E ] INTERACT',
            {
                fontSize: '18px',
                fontStyle: 'bold',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 8,
                    y: 5
                }
            }
        );

    this.buildingInteractText.setDepth(
        2000
    );

    this.buildingInteractText.setVisible(
        false
    );


    /*
     * =================================
     * LEVEL 3 INTERACTION
     * =================================
     */

    this.level3InteractionZone =
        this.add.rectangle(
            80,
            600,
            160,
            100,
            0x000000,
            0
        );


    this.level3InteractText =
        this.add.text(
            0,
            0,
            '[ E ] INTERACT',
            {
                fontSize: '18px',
                fontStyle: 'bold',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 8,
                    y: 5
                }
            }
        );

    this.level3InteractText.setDepth(
        2000
    );

    this.level3InteractText.setVisible(
        false
    );


    /*
     * =================================
     * GODOT IFRAME
     * =================================
     */

    this.godotIframe = null;


    /*
     * =================================
     * GODOT MESSAGE HANDLER
     * =================================
     */

    this.godotMessageHandler = (event) => {

        if (
            event.data &&
            event.data.type ===
            'GODOT_COMPLETE'
        ) {

            console.log(
                'GODOT COMPLETE MESSAGE RECEIVED'
            );


            if (
                this.godotIframe
            ) {

                this.godotIframe.remove();

                this.godotIframe =
                    null;

            }


            this.scene.resume();

        }

    };


    window.addEventListener(
        'message',
        this.godotMessageHandler
    );


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
     * PLAYER FACING
     * =================================
     */

    this.facingX = 0;
    this.facingY = -1;


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
     * SAVE TIMER
     * =================================
     */

    this.saveTimer = 0;

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
     * INVERT CONTROLS
     * =================================
     */

    velocityX *= -1;
    velocityY *= -1;


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
     * SUBWAY INTERACTION
     * =================================
 */

    const distanceToSubway =
        Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.subwayInteractionZone.x,
            this.subwayInteractionZone.y
        );

    const canInteractWithSubway =
        distanceToSubway < 120;


    if (
        canInteractWithSubway
    ) {

        this.subwayInteractText.setPosition(
            this.player.x - 60,
            this.player.y - 60
        );

        this.subwayInteractText.setVisible(
            true
        );

    } else {

        this.subwayInteractText.setVisible(
            false
        );

    }


    if (
        canInteractWithSubway &&
        Phaser.Input.Keyboard.JustDown(
            this.interactKey
        )
    ) {

        localStorage.setItem(
            'C2C_RETURN_TO_SUBWAY',
            'true'
        );

        this.scene.start(
            'SubwayTunnel1'
        );

        return;

    }


    /*
     * =================================
     * BUILDING INTERACTION
     * =================================
     */

    const distanceToBuilding =
        Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.buildingInteractionZone.x,
            this.buildingInteractionZone.y
        );

    const canInteractWithBuilding =
        distanceToBuilding < 120;


    if (
        canInteractWithBuilding
    ) {

        this.buildingInteractText.setPosition(
            this.player.x - 60,
            this.player.y - 60
        );

        this.buildingInteractText.setVisible(
            true
        );


        /*
         * =================================
         * OPEN GODOT GAME
         * =================================
         */

        if (
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            console.log(
                'BUILDING E PRESSED'
            );


            this.scene.pause();


            this.godotIframe =
                document.createElement(
                    'iframe'
                );


            this.godotIframe.src =
                './godot/index.html';


            this.godotIframe.style.position =
                'fixed';

            this.godotIframe.style.left =
                '0';

            this.godotIframe.style.top =
                '0';

            this.godotIframe.style.width =
                '100vw';

            this.godotIframe.style.height =
                '100vh';

            this.godotIframe.style.border =
                'none';

            this.godotIframe.style.margin =
                '0';

            this.godotIframe.style.padding =
                '0';

            this.godotIframe.style.zIndex =
                '999999';

            this.godotIframe.style.background =
                '#000000';


            document.body.appendChild(
                this.godotIframe
            );


            console.log(
                'GODOT IFRAME CREATED'
            );


            this.buildingInteractText.setVisible(
                false
            );

        }

    } else {

        this.buildingInteractText.setVisible(
            false
        );

    }


    /*
     * =================================
     * LEVEL 3 INTERACTION
     * =================================
     */

    const distanceToLevel3 =
        Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.level3InteractionZone.x,
            this.level3InteractionZone.y
        );

    const canInteractWithLevel3 =
        distanceToLevel3 < 120;


    if (
        canInteractWithLevel3
    ) {

        this.level3InteractText.setPosition(
            this.player.x - 60,
            this.player.y - 60
        );

        this.level3InteractText.setVisible(
            true
        );

    } else {

        this.level3InteractText.setVisible(
            false
        );

    }


    if (
        canInteractWithLevel3 &&
        Phaser.Input.Keyboard.JustDown(
            this.interactKey
        )
    ) {

        this.scene.start(
            'Level3'
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
     * AUTO SAVE LEVEL 2 POSITION
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

            scene:
                'Level2',

            completedKeys: [],

            level1: null,

            samole: null,

            subway: null,

            level2: {

                x:
                    this.player.x,

                y:
                    this.player.y

            },

            subwayUnlocked:
                true,

            nauseaActivated:
                false,

            updatedAt:
                Date.now()

        };


        /*
         * =================================
         * PRESERVE EXISTING SAVE DATA
         * =================================
         */

        if (
            existingSave
        ) {

            try {

                const oldSave =
                    JSON.parse(
                        existingSave
                    );


                saveData =
                    {

                        ...saveData,

                        ...oldSave,


                        /*
                         * Current scene
                         */

                        scene:
                            'Level2',


                        /*
                         * Preserve Level 1
                         * position
                         */

                        level1:
                            oldSave.level1 ||
                            null,


                        /*
                         * Preserve Subway
                         * position
                         */

                        subway:
                            oldSave.subway ||
                            null,


                        /*
                         * Never save SAMOLE
                         * position
                         */

                        samole:
                            null,


                        /*
                         * Save current
                         * Level 2 position
                         */

                        level2: {

                            x:
                                this.player.x,

                            y:
                                this.player.y

                        },


                        /*
                         * Preserve subway
                         * unlock state
                         */

                        subwayUnlocked:
                            oldSave.subwayUnlocked ||
                            true,


                        /*
                         * Preserve nausea
                         * state
                         */

                        nauseaActivated:
                            oldSave.nauseaActivated === true,


                        updatedAt:
                            Date.now()

                    };

            } catch (error) {

                console.log(
                    'Level 2 save error:',
                    error
                );

            }

        }


        localStorage.setItem(
            'C2C_SAVE',
            JSON.stringify(
                saveData
            )
        );

    }

}


/*
 * =================================
 * CLEAN UP GODOT
 * =================================
 */

shutdown() {

    if (
        this.godotMessageHandler
    ) {

        window.removeEventListener(
            'message',
            this.godotMessageHandler
        );

    }


    if (
        this.godotIframe
    ) {

        this.godotIframe.remove();

        this.godotIframe =
            null;

    }

}

}