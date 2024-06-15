import Game from "./Game";

export class Explosion {
  game: Game;
  sheet: HTMLImageElement;
  x: number;
  y: number;
  width = 60 / 1.2;
  height = 60 / 1.2;
  markedForDeletion = false;
  // Animation parameters
  sheetOffsetX = 0;
  staggerFrames = 2;
  maxFrames = 5;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.sheet = document.getElementById("enemyExplosion") as HTMLImageElement;
    this.x = x;
    this.y = y;
  }
  update() {
    this.staggerFrames--;
    if (this.staggerFrames < 0) {
      this.staggerFrames = 2;
      this.sheetOffsetX++;
    }
    if (this.sheetOffsetX >= this.maxFrames) {
      this.markedForDeletion = true;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.sheet,
      this.sheetOffsetX * 60,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class PlayerExplosion extends Explosion {
  maxFrames = 4;
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.width = 128 / 1.2;
    this.height = 60 / 1.2;
    this.sheet = document.getElementById("playerExplosion") as HTMLImageElement;
  }
  update() {
    this.staggerFrames--;
    if (this.staggerFrames < 0) {
      this.staggerFrames = 2;
      this.sheetOffsetX++;
    }
    if (this.sheetOffsetX >= this.maxFrames) {
      this.markedForDeletion = true;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.sheet,
      this.sheetOffsetX * 128,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
