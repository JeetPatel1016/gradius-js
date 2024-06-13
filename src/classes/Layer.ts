import Game from "./Game";

export default class Layer {
  game: Game;
  image: HTMLImageElement;
  speedModifier: number;
  width = 1768;
  height = 500;
  x = 0;
  y = 0;
  constructor(game: Game, image: HTMLImageElement, speedModifier: number) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y);
    ctx.drawImage(this.image, this.x + this.width, this.y);
  }
}
