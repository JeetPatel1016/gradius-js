import Game from "./Game";
import Option from "./Option";
import Projectile from "./Projectile";

export default class Player {
  game: Game;
  width: number;
  height: number;
  // Speed and Position
  x: number;
  y: number;
  speedX = 0;
  speedY = 0;
  maxSpeed = 3;
  // Lives and Projectiles
  lives = 3;
  projectiles: Projectile[] = [];
  lastShotTime = 0;
  shootCooldown = 100;

  // Options
  previousPositions: { x: number; y: number }[] = [];
  options: Option[] = [];

  // Sprite Animation
  sheet: HTMLImageElement;
  sheetOffsetX = 2;
  staggerFrames = 2;

  constructor(game: Game) {
    this.game = game;
    this.x = 20;
    this.y = (this.game.height * 0.8) / 2;
    this.width = 90 / 1.2;
    this.height = 48 / 1.2;
    this.sheet = document.getElementById("vicViper") as HTMLImageElement;
  }
  update() {
    const sin45 = Math.sin(Math.PI / 4);
    // Reset speed
    this.speedX = 0;
    this.speedY = 0;

    // Handle vertical movement
    if (this.game.keys.up) {
      this.rollUp();
      this.speedY =
        -this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    } else if (this.game.keys.down) {
      this.rollDown();
      this.speedY =
        this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    } else {
      this.rollToIdle();
    }

    // Handle horizontal movement
    if (this.game.keys.right && !this.game.keys.left) {
      this.speedX = this.maxSpeed;
    } else if (this.game.keys.left && !this.game.keys.right) {
      this.speedX = -this.maxSpeed;
    }

    this.x = this.x + this.speedX;
    this.x = Math.max(12, Math.min(this.x, this.game.width - this.width - 12));

    this.y = this.y + this.speedY;
    this.y = Math.max(
      12,
      Math.min(this.y, this.game.height * 0.8 - this.height - 12)
    );

    if (this.isLastPositionChanged()) {
      this.previousPositions = this.previousPositions.slice(0, 100);
      this.previousPositions.unshift({ x: this.x, y: this.y });
      this.options.length && this.options.forEach((option) => option.update());
    }
    this.options.length &&
      this.options.forEach((option) => option.animateSprite());

    // Handle shooting projectiles
    if (this.game.keys.shoot) {
      this.options.length && this.options.forEach((option) => option.shoot());
      this.shoot();
    }

    this.options.forEach((option) => {
      option.projectiles.forEach((projectile) => projectile.update());
      option.projectiles = option.projectiles.filter(
        (projectile) => !projectile.markedForDelete
      );
    });
    this.projectiles.forEach((projectile) => projectile.update());
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDelete
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.isMoving) {
      this.options.length && this.options.forEach((option) => option.draw(ctx));
      ctx.drawImage(
        this.sheet,
        90 * this.sheetOffsetX,
        0,
        90,
        48,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
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
  }

  reset() {
    this.x = 20;
    this.y = (this.game.height * 0.8) / 2;
    this.previousPositions = [];
    this.options = [];
  }
  // Animation methods
  rollUp() {
    if (this.sheetOffsetX > 0) {
      this.staggerFrames--;
      if (this.staggerFrames < 0) {
        this.staggerFrames = 2;
        this.sheetOffsetX--;
      }
    }
  }
  rollDown() {
    if (this.sheetOffsetX < 4) {
      this.staggerFrames--;
      if (this.staggerFrames < 0) {
        this.staggerFrames = 2;
        this.sheetOffsetX++;
      }
    }
  }
  rollToIdle() {
    let diff = 2 > this.sheetOffsetX;
    if (this.sheetOffsetX !== 2) {
      this.staggerFrames--;
      if (this.staggerFrames < 0) {
        this.staggerFrames = 2;
        this.sheetOffsetX += diff ? 1 : -1;
      }
    }
  }
  // Handling options
  addOption() {
    this.options.push(new Option(this.game, this, this.options.length));
  }
  isLastPositionChanged() {
    if (!this.previousPositions[0]) return true;
    const { x, y } = this.previousPositions[0];
    if (x !== this.x || y !== this.y) return true;

    return false;
  }
}
