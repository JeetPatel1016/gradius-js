import Game from "./Game";
import Player from "./Player";
import Projectile from "./Projectile";

export default class Option {
  game: Game;
  player: Player;
  x: number;
  y: number;
  offset: number;
  width = 40;
  height = 30;

  // Projectiles
  projectiles: Projectile[] = [];
  lastShotTime = 0;
  shootCooldown = 100;

  // Animation Sprite
  sheet: HTMLImageElement;
  static instanceCount = 0;
  static sheetOffsetX = 0;
  static maxFrames = 4;
  static staggerFrames = 10;

  constructor(game: Game, player: Player, offset: number) {
    this.game = game;
    this.player = player;
    this.offset = offset;
    this.x = this.player.previousPositions[(offset + 1) * 10]?.x;
    this.y = this.player.previousPositions[(offset + 1) * 10]?.y;
    this.sheet = document.getElementById("option") as HTMLImageElement;
    Option.instanceCount++;
  }
  update() {
    // Update Position
    this.x = this.player.previousPositions[(this.offset + 1) * 25]?.x;
    this.y = this.player.previousPositions[(this.offset + 1) * 25]?.y;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.drawImage(
      this.sheet,
      Option.sheetOffsetX * 48,
      0,
      48,
      36,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.projectiles.forEach((projectile) => projectile.draw(ctx));
  }
  animateSprite() {
    Option.staggerFrames--;
    if (Option.staggerFrames < 0) {
      Option.staggerFrames = 10;
      Option.sheetOffsetX = (Option.sheetOffsetX + 1) % Option.maxFrames;
    }
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
}
