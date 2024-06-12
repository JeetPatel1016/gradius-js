import Game from "./Game";
import Projectile from "./Projectile";

export default class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  speedX = 0;
  speedY = 0;
  maxSpeed = 3;
  projectiles: Projectile[] = [];

  lastShotTime = 0;
  shootCooldown = 100;

  constructor(game: Game) {
    this.game = game;
    this.x = 20;
    this.y = 100;
    this.width = 70;
    this.height = 30;
  }
  update() {
    const sin45 = Math.sin(Math.PI / 4);
    // Reset speed
    this.speedX = 0;
    this.speedY = 0;

    // Handle vertical movement
    if (this.game.keys.up) {
      this.speedY =
        -this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    } else if (this.game.keys.down) {
      this.speedY =
        this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    }

    // Handle horizontal movement
    if (this.game.keys.right && !this.game.keys.left) {
      this.speedX = this.maxSpeed;
    } else if (this.game.keys.left && !this.game.keys.right) {
      this.speedX = -this.maxSpeed;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    // Handle shooting projectiles
    if (this.game.keys.shoot) this.shoot();

    this.projectiles.forEach((projectile) => projectile.update());
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDelete
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach((projectile) => projectile.draw(ctx));
  }

  shoot() {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime > this.shootCooldown) {
      this.projectiles.push(
        new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
      );
      this.lastShotTime = currentTime;
    }
    // this.projectiles.push(
    //   new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
    // );
  }
}
