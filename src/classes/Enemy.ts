import Game from "./Game";

export class Enemy {
  game: Game;
  width = 10;
  height = 10;
  x: number;
  y: number;
  markedForDeletion = false;
  speedX = -2;
  color = "red";
  lives = 1;
  score = 100;
  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.y = 200;
  }
  update() {
    this.x += this.speedX;
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Garun extends Enemy {
  sheet: HTMLImageElement;
  staggerFrames = 2;
  sheetOffsetX = 0;

  constructor(game: Game) {
    super(game);
    this.width = 60 / 1.2;
    this.height = 60 / 1.2;
    this.y = Math.random() * (this.game.height * 0.8 - this.height);
    this.sheet = document.getElementById("garun") as HTMLImageElement;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.sheet,
      60 * this.sheetOffsetX,
      0,
      60,
      60,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    super.update();
    this.animateSprite();
  }
  animateSprite() {
    this.staggerFrames--;
    if (this.staggerFrames < 0) {
      this.staggerFrames = 2;
      this.sheetOffsetX = (this.sheetOffsetX + 1) % 8;
    }
  }
}

export class Flipper extends Enemy {
  sheet: HTMLImageElement;
  staggerFrames = 2;
  sheetOffsetX = 0;

  constructor(game: Game) {
    super(game);
    this.width = 48 / 1.2;
    this.height = 48 / 1.2;
    this.y = Math.random() * (this.game.height * 0.8 - this.height);
    this.sheet = document.getElementById("flipper") as HTMLImageElement;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.filter = "hue-rotate(125deg) saturate(1.25)";
    ctx.drawImage(
      this.sheet,
      48 * this.sheetOffsetX,
      0,
      48,
      48,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
  update() {
    super.update();
    this.animateSprite();
  }
  animateSprite() {
    this.staggerFrames--;
    if (this.staggerFrames < 0) {
      this.staggerFrames = 2;
      this.sheetOffsetX = (this.sheetOffsetX + 1) % 6;
    }
  }
}
