class Level1Scene extends Phaser.Scene {

    constructor() {
        super('Level1Scene');
    }

    create() {

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

        this.add.rectangle(
            worldWidth / 2,
            worldHeight / 2,
            worldWidth,
            worldHeight,
            0x2d3a27
        );

        const roadColor = 0xb0c4de;

        this.roads = [];

        this.roads.push(
            this.add.rectangle(1020, 950, 70, 700, roadColor)
        );

        this.roads.push(
            this.add.rectangle(1100, 950, 70, 700, roadColor)
        );

        this.roads.push(
            this.add.rectangle(503, 375, 50, 350, roadColor)
        );

        this.roads.push(
            this.add.rectangle(1375, 734, 70, 1069, roadColor)
        );

        this.roads.push(
            this.add.rectangle(1800, 725, 50, 600, roadColor)
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
            this.add.rectangle(1000, 609, 750, 50, roadColor)
        );

        this.roads.push(
            this.add.rectangle(930, 225, 850, 50, roadColor)
        );

        this.roads.push(
            this.add.rectangle(1600, 1000, 400, 50, roadColor)
        );

        this.roads.push(
            this.add.rectangle(2000, 450, 400, 50, roadColor)
        );

        this.roads.push(
            this.add.rectangle(750, 1100, 550, 56, roadColor)
        );

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

        this.player = this.add.rectangle(
            1020,
            700,
            30,
            30,
            0xff0000
        );

        this.physics.add.existing(this.player);

        this.player.body.setCollideWorldBounds(true);

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keys =
            this.input.keyboard.addKeys({
                W: Phaser.Input.Keyboard.KeyCodes.W,
                A: Phaser.Input.Keyboard.KeyCodes.A,
                S: Phaser.Input.Keyboard.KeyCodes.S,
                D: Phaser.Input.Keyboard.KeyCodes.D
            });

        this.cameras.main.startFollow(
            this.player,
            true
        );

        this.darkness = this.add.graphics();
this.darkness.setScrollFactor(0);
this.darkness.setDepth(1000);
        
    }

    isOnRoad(x, y) {

        const halfWidth = 10;
        const halfHeight = 10;

        const points = [
            { x: x - halfWidth, y: y - halfHeight },
            { x: x + halfWidth, y: y - halfHeight },
            { x: x - halfWidth, y: y + halfHeight },
            { x: x + halfWidth, y: y + halfHeight }
        ];

        for (const road of this.roads) {

            const cos = Math.cos(-road.rotation);
            const sin = Math.sin(-road.rotation);

            let allInside = true;

            for (const point of points) {

                const dx = point.x - road.x;
                const dy = point.y - road.y;

                const rotatedX =
                    dx * cos - dy * sin + road.x;

                const rotatedY =
                    dx * sin + dy * cos + road.y;

                if (
                    rotatedX < road.x - road.width / 2 ||
                    rotatedX > road.x + road.width / 2 ||
                    rotatedY < road.y - road.height / 2 ||
                    rotatedY > road.y + road.height / 2
                ) {
                    allInside = false;
                    break;
                }
            }

            if (allInside) {
                return true;
            }
        }

        return false;
    }

    update() {

        const speed = 75;

        let velocityX = 0;
        let velocityY = 0;

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

        if (velocityX !== 0 && velocityY !== 0) {

            const length = Math.sqrt(
                velocityX * velocityX +
                velocityY * velocityY
            );

            velocityX =
                (velocityX / length) * speed;

            velocityY =
                (velocityY / length) * speed;
        }

        const delta =
            this.game.loop.delta / 1000;

        const nextX =
            this.player.x + velocityX * delta;

        const nextY =
            this.player.y + velocityY * delta;

        if (
            velocityX !== 0 ||
            velocityY !== 0
        ) {

            if (
                this.isOnRoad(nextX, nextY)
            ) {

                this.player.body.setVelocity(
                    velocityX,
                    velocityY
                );

            } else {

                this.player.body.setVelocity(0, 0);

            }

        } else {

            this.player.body.setVelocity(0, 0);

        }

        this.darkness.clear();

const playerX =
    this.player.x - this.cameras.main.scrollX;

const playerY =
    this.player.y - this.cameras.main.scrollY;

this.darkness.fillStyle(0x000000, 0.80);

this.darkness.fillRect(
    0,
    0,
    this.scale.width,
    this.scale.height
);


    }
}