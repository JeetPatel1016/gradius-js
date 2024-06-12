import Game from "./Game";

export default class Projectile {
  game: Game;
  x: number;
  y: number;
  width = 10;
  height = 3;
  speed = 15;
  markedForDelete = false;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x - this.speed;
    this.y = y;
  }
  update() {
    this.x += this.speed;
    if (this.x > this.game.width) this.markedForDelete = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
