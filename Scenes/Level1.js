class Level1Scene extends Phaser.Scene {

    constructor() {
        super('Level1Scene');
    }

    create() {

        // =========================
        // WORLD SIZE
        // =========================

        const worldWidth = 2000;
        const worldHeight = 1400;


        // =========================
        // CAMERA / WORLD BOUNDS
        // =========================

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


        // =========================
        // BACKGROUND (GROUND)
        // =========================

        this.add.rectangle(
            worldWidth / 2,
            worldHeight / 2,
            worldWidth,
            worldHeight,
            0x2d3a27 // Dark grass green background
        );


        // =========================
        // ROADS
        // =========================

        const roadColor = 0xb0c4de; // Light blue/gray road color matching the map

        // Vertical Main Spine Road
        this.add.rectangle(1020, 950, 70, 700, roadColor);
        this.add.rectangle(1100, 950, 70, 700, roadColor);

        this.add.rectangle(503, 375, 50, 350, roadColor);

        this.add.rectangle(1375, 734, 70, 1069, roadColor);

        this.add.rectangle(1800, 725, 50, 600, roadColor);

        const road1 = this.add.rectangle(567,567,175,55,roadColor);
        road1.setRotation(Phaser.Math.DegToRad(30));

        const road2 = this.add.rectangle(815,1350,1200,60,roadColor);
        road2.setRotation(Phaser.Math.DegToRad(-10));

        const road3 = this.add.rectangle(1450,1400,410,60,roadColor);
        road3.setRotation(Phaser.Math.DegToRad(70));


        const road4 = this.add.rectangle(850,1550,410,60,roadColor);
        road4.setRotation(Phaser.Math.DegToRad(80));

        const road5 =this.add.rectangle(1570, 750, 450, 60, roadColor);
        road5.setRotation(Phaser.Math.DegToRad(-10));

        const road6 = this.add.rectangle(2000, 750, 400, 60, roadColor);
        road6.setRotation(Phaser.Math.DegToRad(10));

        const road7 = this.add.rectangle(2000, 1010, 400, 60, roadColor);
        road7.setRotation(Phaser.Math.DegToRad(5));
        // Horizontal Connecting Roads

        this.add.rectangle(1000, 609, 750, 50, roadColor);
        this.add.rectangle(930, 225, 850, 50, roadColor);

        this.add.rectangle(1600, 1000, 400, 50, roadColor);

        this.add.rectangle(2000, 450, 400, 50, roadColor);
        


        // =========================
        // PLAYER
        // =========================

        // Spawn player in the central road area
        this.player = this.add.rectangle(
            1020,
            700,
            30,
            30,
            0xff0000
        );

        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);


        // =========================
        // CONTROLS & CAMERA
        // =========================

        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.cameras.main.startFollow(
            this.player,
            true
        );

    }


    update() {

        const speed = 500;

        this.player.body.setVelocity(0);


        // LEFT
        if (
            this.cursors.left.isDown ||
            this.keys.A.isDown
        ) {
            this.player.body.setVelocityX(-speed);
        }


        // RIGHT
        if (
            this.cursors.right.isDown ||
            this.keys.D.isDown
        ) {
            this.player.body.setVelocityX(speed);
        }


        // UP
        if (
            this.cursors.up.isDown ||
            this.keys.W.isDown
        ) {
            this.player.body.setVelocityY(-speed);
        }


        // DOWN
        if (
            this.cursors.down.isDown ||
            this.keys.S.isDown
        ) {
            this.player.body.setVelocityY(speed);
        }

        // Normalize diagonal speed
        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

    }

}