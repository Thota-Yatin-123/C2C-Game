class SubwayTunnel1 extends Phaser.Scene {

    constructor() {
        super('SubwayTunnel1');
    }

    create() {

        /*
         * =================================
         * WORLD
         * =================================
         */

        const worldWidth = 2400;
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
            0x08090b
        );


        /*
         * =================================
         * TUNNEL FLOOR
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            worldHeight / 2,
            worldWidth,
            500,
            0x17191c
        );


        /*
         * =================================
         * TUNNEL WALLS
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            300,
            worldWidth,
            100,
            0x24272b
        );

        this.add.rectangle(
            worldWidth / 2,
            900,
            worldWidth,
            100,
            0x24272b
        );


        /*
         * =================================
         * CEILING
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            100,
            worldWidth,
            300,
            0x050607
        );


                /*
         * =================================
         * CEILING EYES
         * =================================
         */

        const tunnelEyes =
            this.add.graphics();

        tunnelEyes.setDepth(20);

        /*
         * Soft red glow behind the eyes
         */

        tunnelEyes.fillStyle(
            0x8b0000,
            0.12
        );

        tunnelEyes.fillCircle(
            1800,
            180,
            28
        );

        /*
         * The eyes
         */

        tunnelEyes.fillStyle(
            0xff2222,
            1
        );

        tunnelEyes.fillCircle(
            1788,
            180,
            5
        );

        tunnelEyes.fillCircle(
            1812,
            180,
            5
        );

        /*
         * =================================
         * TOP WALKING AREA
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            420,
            worldWidth,
            90,
            0x303238
        );


        /*
         * =================================
         * TOP PLATFORM EDGE
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            465,
            worldWidth,
            8,
            0xb7a46b
        );


        /*
         * =================================
         * BOTTOM WALKING AREA
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            880,
            worldWidth,
            90,
            0x303238
        );


        /*
         * =================================
         * BOTTOM PLATFORM EDGE
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            835,
            worldWidth,
            8,
            0xb7a46b
        );


        /*
         * =================================
         * TWO-WAY ROAD
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            650,
            worldWidth,
            330,
            0x202020
        );


        /*
         * =================================
         * ROAD CENTER DIVIDER
         * =================================
         */

        for (
            let x = 40;
            x < worldWidth;
            x += 100
        ) {

            this.add.rectangle(
                x,
                650,
                55,
                6,
                0xd6b84c
            );

        }


        /*
         * =================================
         * ROAD EDGE LINES
         * =================================
         */

        this.add.rectangle(
            worldWidth / 2,
            505,
            worldWidth,
            6,
            0x888888
        );

        this.add.rectangle(
            worldWidth / 2,
            795,
            worldWidth,
            6,
            0x888888
        );


        /*
         * =================================
         * FENCES
         * =================================
         */

        this.fences = [];


        /*
         * TOP FENCE
         */

        for (
            let x = 30;
            x < worldWidth;
            x += 60
        ) {

            const post =
                this.add.rectangle(
                    x,
                    520,
                    6,
                    35,
                    0x555555
                );

            post.setDepth(10);

            const rail =
                this.add.rectangle(
                    x,
                    520,
                    60,
                    5,
                    0x777777
                );

            rail.setDepth(10);

            this.fences.push(
                post,
                rail
            );

        }


        /*
         * BOTTOM FENCE
         */

        for (
            let x = 30;
            x < worldWidth;
            x += 60
        ) {

            const post =
                this.add.rectangle(
                    x,
                    780,
                    6,
                    35,
                    0x555555
                );

            post.setDepth(10);

            const rail =
                this.add.rectangle(
                    x,
                    780,
                    60,
                    5,
                    0x777777
                );

            rail.setDepth(10);

            this.fences.push(
                post,
                rail
            );

        }


        /*
         * =================================
         * TUNNEL COLUMNS
         * =================================
         */

        for (
            let x = 100;
            x < worldWidth;
            x += 300
        ) {

            const column =
                this.add.rectangle(
                    x,
                    350,
                    35,
                    500,
                    0x202226
                );

            column.setDepth(10);

        }


        /*
         * =================================
         * CEILING LIGHTS
         * =================================
         */

        this.lights = [];

        for (
            let x = 150;
            x < worldWidth;
            x += 250
        ) {

            const lamp =
                this.add.rectangle(
                    x,
                    335,
                    70,
                    10,
                    0xd6d0b0
                );

            const glow =
                this.add.rectangle(
                    x,
                    355,
                    110,
                    40,
                    0xc8b56a,
                    0.08
                );

            this.lights.push({
                lamp,
                glow
            });


            /*
             * Flickering light
             */

            this.time.addEvent({

                delay:
                    Phaser.Math.Between(
                        200,
                        700
                    ),

                loop: true,

                callback: () => {

                    const flicker =
                        Math.random();

                    if (
                        flicker < 0.15
                    ) {

                        lamp.setAlpha(0.1);
                        glow.setAlpha(0.01);

                        this.time.delayedCall(
                            Phaser.Math.Between(
                                80,
                                250
                            ),
                            () => {

                                lamp.setAlpha(1);

                                glow.setAlpha(
                                    Phaser.Math.FloatBetween(
                                        0.04,
                                        0.10
                                    )
                                );

                            }
                        );

                    } else {

                        lamp.setAlpha(
                            Phaser.Math.FloatBetween(
                                0.7,
                                1
                            )
                        );

                    }

                }

            });

        }


        /*
         * =================================
         * NAUSEA STATE
         * =================================
         */

        this.nauseaActivated = false;


        /*
         * =================================
         * PLAYER
         * =================================
         */

        this.player =
            this.add.rectangle(
                300,
                490,
                28,
                28,
                0xff0000
            );

        this.player.setDepth(5);

        this.physics.add.existing(
            this.player
        );

        this.player.body.setCollideWorldBounds(
            true
        );


        /*
         * =================================
         * LOAD SAVED TUNNEL POSITION
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


        /*
         * =================================
         * LOAD SAVE 01 POSITION
         * =================================
         */

        if (
            loadGame === 'true' &&
            saveFile
        ) {

            try {

                const saveData =
                    JSON.parse(
                        saveFile
                    );

                if (
                    saveData.subway &&
                    typeof saveData.subway.x === 'number' &&
                    typeof saveData.subway.y === 'number'
                ) {

                    this.player.setPosition(
                        saveData.subway.x,
                        saveData.subway.y
                    );

                }

            } catch (error) {

                console.log(
                    'Tunnel save load error:',
                    error
                );

            }

            localStorage.removeItem(
                'C2C_LOAD_GAME'
            );

        }


        /*
         * =================================
         * RETURN FROM LEVEL 2
         * =================================
         */

        const returnToSubway =
            localStorage.getItem(
                'C2C_RETURN_TO_SUBWAY'
            );

        if (
            returnToSubway === 'true'
        ) {

            const returnSave =
                localStorage.getItem(
                    'C2C_SAVE'
                );

            if (returnSave) {

                try {

                    const saveData =
                        JSON.parse(
                            returnSave
                        );

                    if (
                        saveData.subway &&
                        typeof saveData.subway.x === 'number' &&
                        typeof saveData.subway.y === 'number'
                    ) {

                        this.player.setPosition(
                            saveData.subway.x,
                            saveData.subway.y
                        );

                    }

                } catch (error) {

                    console.log(
                        'Return from Level 2 error:',
                        error
                    );

                }

            }

            localStorage.removeItem(
                'C2C_RETURN_TO_SUBWAY'
            );

        }


        /*
         * =================================
         * LOAD GLOBAL NAUSEA STATE
         * =================================
         */

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
         * GHOST LAUGH
         * =================================
         */

        this.ghostLaugh =
            this.sound.add(
                'ghostLaugh',
                {
                    loop: true,
                    volume: 0.08,
                    rate: 0.85,
                    detune: -400
                }
            );

        if (
            !this.nauseaActivated
        ) {

            this.ghostLaugh.play();

        }


        /*
         * =================================
         * COLLISION GROUPS
         * =================================
         */

        this.wallColliders =
            this.physics.add.staticGroup();

        this.fenceColliders =
            this.physics.add.staticGroup();


        /*
         * =================================
         * TOP WALL COLLISION
         * =================================
         */

        const topWall =
            this.add.rectangle(
                worldWidth / 2,
                350,
                worldWidth,
                10,
                0x000000,
                0
            );

        this.physics.add.existing(
            topWall,
            true
        );

        this.wallColliders.add(
            topWall
        );


        /*
         * =================================
         * BOTTOM WALL COLLISION
         * =================================
         */

        const bottomWall =
            this.add.rectangle(
                worldWidth / 2,
                850,
                worldWidth,
                10,
                0x000000,
                0
            );

        this.physics.add.existing(
            bottomWall,
            true
        );

        this.wallColliders.add(
            bottomWall
        );


        /*
         * =================================
         * TOP FENCE COLLISION
         * =================================
         */

        const topFence =
            this.add.rectangle(
                worldWidth / 2,
                520,
                worldWidth,
                18,
                0x000000,
                0
            );

        this.physics.add.existing(
            topFence,
            true
        );

        this.fenceColliders.add(
            topFence
        );


        /*
         * =================================
         * BOTTOM FENCE COLLISION
         * =================================
         */

        const bottomFence =
            this.add.rectangle(
                worldWidth / 2,
                780,
                worldWidth,
                18,
                0x000000,
                0
            );

        this.physics.add.existing(
            bottomFence,
            true
        );

        this.fenceColliders.add(
            bottomFence
        );


        /*
         * =================================
         * PLAYER ↔ WALL COLLISION
         * =================================
         */

        this.physics.add.collider(
            this.player,
            this.wallColliders
        );


        /*
         * =================================
         * PLAYER ↔ FENCE COLLISION
         * =================================
         */

        this.physics.add.collider(
            this.player,
            this.fenceColliders
        );


        /*
         * =================================
         * EXIT STATE
         * =================================
         */

        this.controlsInverted = false;

        this.exitSequence = false;

        this.tunnelExited = false;


        /*
         * =================================
         * RESTORE INVERTED CONTROLS
         * =================================
         */

        if (
            this.nauseaActivated
        ) {

            this.controlsInverted =
                true;

            this.tunnelExited =
                true;

        }


        /*
         * =================================
         * RIGHT EXIT ZONE
         * =================================
         */

        this.exitZone =
            this.add.rectangle(
                worldWidth - 50,
                worldHeight / 2,
                100,
                worldHeight,
                0x000000,
                0
            );

        this.physics.add.existing(
            this.exitZone,
            true
        );


        /*
         * =================================
         * LEFT WALL RETURN REGION
         * =================================
         */

        this.interactionZone =
            this.add.rectangle(
                0,
                worldHeight / 2,
                120,
                worldHeight,
                0xff0000,
                0
            );

        this.physics.add.existing(
            this.interactionZone,
            true
        );


        /*
         * =================================
         * RIGHT WALL INTERACTION REGION
         * =================================
         */

        this.rightInteractionZone =
            this.add.rectangle(
                worldWidth,
                worldHeight / 2,
                120,
                worldHeight,
                0xff0000,
                0
            );

        this.physics.add.existing(
            this.rightInteractionZone,
            true
        );


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

        this.interactionPrompt.setOrigin(
            0.5
        );

        this.interactionPrompt.setScrollFactor(
            0
        );

        this.interactionPrompt.setDepth(
            2000
        );

        this.interactionPrompt.setVisible(
            false
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
         * MOVEMENT
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
     * TUNNEL EXIT EFFECT
     * =================================
     */

    leaveTunnel() {

        this.nauseaActivated = true;


        /*
         * =================================
         * IMMEDIATE NAUSEA SAVE
         * =================================
         */

        const existingSave =
            localStorage.getItem(
                'C2C_SAVE'
            );

        if (existingSave) {

            try {

                const saveData =
                    JSON.parse(
                        existingSave
                    );

                saveData.scene =
                    'SubwayTunnel1';

                saveData.nauseaActivated =
                    true;

                saveData.subway = {

                    x:
                        this.player.x,

                    y:
                        this.player.y

                };


                /*
                 * Preserve Level 1 position
                 */

                saveData.level1 =
                    saveData.level1 ||
                    null;


                /*
                 * Never save SAMOLE
                 * position
                 */

                saveData.samole =
                    null;

                saveData.updatedAt =
                    Date.now();

                localStorage.setItem(
                    'C2C_SAVE',
                    JSON.stringify(
                        saveData
                    )
                );

            } catch (error) {

                console.log(
                    'Immediate nausea save error:',
                    error
                );

            }

        }


        /*
         * =================================
         * STOP MOVEMENT
         * =================================
         */

        this.player.body.setVelocity(
            0,
            0
        );

        this.controlsInverted =
            false;

        this.exitSequence =
            true;


        /*
         * =================================
         * STOP GHOST LAUGH
         * =================================
         */

        if (
            this.ghostLaugh
        ) {

            this.ghostLaugh.stop();

        }


        /*
         * =================================
         * NAUSEA MESSAGE
         * =================================
         */

        const nauseaText =
            this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                'You feel nauseous',
                {
                    fontFamily: 'Arial',
                    fontSize: '26px',
                    color: '#ffffff',
                    fontStyle: 'italic',
                    stroke: '#000000',
                    strokeThickness: 5
                }
            );

        nauseaText.setOrigin(
            0.5
        );

        nauseaText.setScrollFactor(
            0
        );

        nauseaText.setDepth(
            1000
        );

        nauseaText.setAlpha(
            0
        );


        /*
         * =================================
         * MESSAGE FADE IN
         * =================================
         */

        this.tweens.add({

            targets:
                nauseaText,

            alpha:
                1,

            duration:
                300,

            ease:
                'Sine.easeInOut'

        });


        /*
         * =================================
         * CAMERA SHAKE
         * =================================
         */

        this.cameras.main.shake(
            700,
            0.002
        );


        /*
         * =================================
         * CAMERA WOBBLE
         * =================================
         */

        this.tweens.add({

            targets:
                this.cameras.main,

            rotation:
                0.02,

            duration:
                150,

            yoyo:
                true,

            repeat:
                3,

            ease:
                'Sine.easeInOut',

            onComplete: () => {

                this.cameras.main.rotation =
                    0;

            }

        });


        /*
         * =================================
         * INVERT CONTROLS
         * =================================
         */

        this.time.delayedCall(
            1200,
            () => {

                this.controlsInverted =
                    true;

            }
        );


        /*
         * =================================
         * MESSAGE FADE OUT
         * =================================
         */

        this.time.delayedCall(
            1500,
            () => {

                this.tweens.add({

                    targets:
                        nauseaText,

                    alpha:
                        0,

                    duration:
                        500,

                    onComplete: () => {

                        nauseaText.destroy();

                    }

                });

            }
        );


        /*
         * =================================
         * END EXIT SEQUENCE
         * =================================
         */

        this.time.delayedCall(
            2000,
            () => {

                this.exitSequence =
                    false;

            }
        );

    }


    /*
     * =================================
     * UPDATE
     * =================================
     */

    update() {

        /*
         * =================================
         * EXIT ANIMATION
         * =================================
         */

        if (
            this.exitSequence
        ) {

            this.player.body.setVelocity(
                0,
                0
            );

            this.interactionPrompt.setVisible(
                false
            );

            return;

        }


        /*
         * =================================
         * LEFT RETURN REGION
         * =================================
         */

        const canReturnToLevel1 =
            this.player.x < 120;


        /*
         * =================================
         * NAUSEA REGION
         * =================================
         */

        const canEnterNauseaRegion =
            this.player.x > 2000;


        /*
         * =================================
         * RIGHT INTERACTION REGION
         * =================================
         */

        const canInteractWithRightExit =
            this.player.x > 2200;


        /*
         * =================================
         * SHOW INTERACTION PROMPT
         * =================================
         */

        if (
            canReturnToLevel1 ||
            canInteractWithRightExit
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


        /*
         * =================================
         * PRESS E — RETURN TO LEVEL 1
         * =================================
         */

        if (
            canReturnToLevel1 &&
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            if (
                this.ghostLaugh
            ) {

                this.ghostLaugh.stop();

            }

            localStorage.setItem(
                'C2C_RETURN_FROM_SUBWAY',
                'true'
            );

            this.scene.start(
                'Level1Scene'
            );

            return;

        }


        /*
         * =================================
         * AUTOMATIC NAUSEA
         * =================================
         */

        if (
            canEnterNauseaRegion &&
            !this.nauseaActivated
        ) {

            this.tunnelExited =
                true;

            this.leaveTunnel();

            return;

        }


        /*
         * =================================
         * PRESS E — RIGHT SIDE
         * =================================
         *
         * This takes the player to Level 2.
         *
         * The Subway position is already
         * saved by the autosave system.
         */

        if (
            canInteractWithRightExit &&
            Phaser.Input.Keyboard.JustDown(
                this.interactKey
            )
        ) {

            this.scene.start(
                'Level2'
            );

            return;

        }


        /*
         * =================================
         * WORLD-UNIT SPEED
         * =================================
         */

        const speed = 100;

        let velocityX = 0;
        let velocityY = 0;


        /*
         * =================================
         * HORIZONTAL MOVEMENT
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


        /*
         * =================================
         * VERTICAL MOVEMENT
         * =================================
         */

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
         * NORMALIZE DIAGONAL MOVEMENT
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

        if (
            this.controlsInverted
        ) {

            velocityX *= -1;
            velocityY *= -1;

        }


        /*
         * =================================
         * APPLY MOVEMENT
         * =================================
         */

        this.player.body.setVelocity(
            velocityX,
            velocityY
        );


        /*
         * =================================
         * AUTO SAVE TUNNEL POSITION
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
                    'SubwayTunnel1',

                completedKeys: [],

                level1: null,

                samole: null,

                subway: {

                    x:
                        this.player.x,

                    y:
                        this.player.y

                },

                subwayUnlocked:
                    true,

                nauseaActivated:
                    this.nauseaActivated,

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

                            scene:
                                'SubwayTunnel1',


                            /*
                             * Keep Level 1
                             * position untouched.
                             */

                            level1:
                                oldSave.level1 ||
                                null,


                            /*
                             * Never save SAMOLE
                             * position.
                             */

                            samole:
                                null,


                            /*
                             * Save current
                             * Subway position.
                             */

                            subway: {

                                x:
                                    this.player.x,

                                y:
                                    this.player.y

                            },


                            subwayUnlocked:
                                true,


                            /*
                             * Persist nausea.
                             */

                            nauseaActivated:
                                this.nauseaActivated,

                            updatedAt:
                                Date.now()

                        };

                } catch (error) {

                    console.log(
                        'Tunnel save error:',
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

}
