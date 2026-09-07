class Level3Scene extends Phaser.Scene {

    constructor() {
        super('Level3');
    }

    create() {

        /*
         * =================================
         * WORLD
         * =================================
         */

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
         * ROAD
         * =================================
         */

        const roadColor = 0xb0c4de;

        this.roads = [];

        this.roads.push(
            this.add.rectangle(
                worldWidth / 2,
                worldHeight / 2,
                worldWidth,
                100,
                roadColor
            )
        );


        /*
         * =================================
         * PLAYER
         * =================================
         */

        this.player =
            this.add.rectangle(
                1900,
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
         * CAMERA
         * =================================
         */

        this.cameras.main.startFollow(
            this.player,
            true
        );


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
         * LEVEL 3 TEXT
         * =================================
         */

        this.add.text(
            1000,
            300,
            'LEVEL 3 WORKS',
            {
                fontSize: '40px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

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

    }

}