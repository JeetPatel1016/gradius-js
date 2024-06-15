import Game from "./Game";

export default class Layer {
  game: Game;
  image: HTMLImageElement;
  speedModifier: number;
  width = 1800 * 0.8;
  height = 600 * 0.8;
  x = 0;
  y = 0;
  alpha: number;
  constructor(
    game: Game,
    image: HTMLImageElement,
    speedModifier: number,
    alpha: number
  ) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.alpha = alpha;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
  reset() {
    this.x = 0;
  }
}
