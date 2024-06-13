import Game from "./Game";

export default class UI {
  game: Game;
  fontSize = 25;
  fontFamily = "Press Start 2P";
  color = "white";
  constructor(game: Game) {
    this.game = game;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.renderScore(ctx);
    this.renderPlayerLives(ctx);
  }
  renderPlayerLives(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px '${this.fontFamily}'`;
    ctx.fillStyle = this.color;
    ctx.fillRect(40, 600 - 38, 24, 24);
    ctx.fillText(String(this.game.player.lives), 80, 600 - 12);
  }
  renderScore(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px '${this.fontFamily}'`;
    ctx.fillStyle = this.color;
    ctx.fillText(String(this.game.score).padStart(7, "0"), 250, 600 - 12);
  }
}
