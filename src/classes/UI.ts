import Game from "./Game";

export default class UI {
  game: Game;
  fontSize = 25;
  fontFamily = "Press Start 2P";
  color = "black";
  constructor(game: Game) {
    this.game = game;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.renderScore(ctx);
  }
  renderScore(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px '${this.fontFamily}'`;
    ctx.fillStyle = this.color;
    ctx.fillText(String(this.game.score).padStart(7, "0"), 250, 600 - 12);
  }
}
