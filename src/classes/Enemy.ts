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
  constructor(game: Game) {
    super(game);
    this.width = 50;
    this.height = 50;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
}
