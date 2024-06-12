import Game from "./Game";

export default class UI {
  game: Game;
  fontSize = 25;
  fontFamily = "Press Start 2P";
  color = "red";
  constructor(game: Game) {
    this.game = game;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px '${this.fontFamily}'`;
    ctx.fillStyle = this.color;
    ctx.fillText("Gradius", 10, 50);
  }
}
