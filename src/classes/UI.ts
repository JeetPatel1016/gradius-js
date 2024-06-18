import Game from "./Game";

export default class UI {
  digitSheet: HTMLImageElement;
  letterSheet: HTMLImageElement;
  livesSprite: HTMLImageElement;
  game: Game;
  fontSize = 25;
  fontFamily = "Press Start 2P";
  color = "white";

  characterWidth = 32;
  characterHeight = 32;

  constructor(game: Game) {
    this.game = game;
    this.digitSheet = document.getElementById("fontDigits") as HTMLImageElement;
    this.letterSheet = document.getElementById(
      "fontLetters"
    ) as HTMLImageElement;
    this.livesSprite = document.getElementById("lives") as HTMLImageElement;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.renderScore(ctx);
    this.renderPlayerLives(ctx);
  }

  renderPlayerLives(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px '${this.fontFamily}'`;
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.livesSprite, 0, 0, 32, 32, 30, 600 - 12 - 32, 32, 32);
    ctx.restore();
    this.drawDigit(
      ctx,
      this.game.player.lives,
      80,
      600 - 12 - this.characterHeight
    );
  }

  renderScore(ctx: CanvasRenderingContext2D) {
    const scoreString = String(this.game.score).padStart(7, "0");
    const startX = 250;
    const startY = 600 - 12;

    if (!this.game.gameOver) {
      for (let i = 0; i < scoreString.length; i++) {
        const digit = parseInt(scoreString[i], 10);
        this.drawDigit(
          ctx,
          digit,
          startX + i * this.characterWidth,
          startY - this.characterHeight
        );
      }
      return;
    }

    "GAME OVER"
      .split("")
      .forEach((letter, index) =>
        this.drawCharacter(
          ctx,
          letter.charCodeAt(0),
          startX + index * this.characterWidth,
          startY - this.characterHeight
        )
      );
  }

  drawDigit(
    ctx: CanvasRenderingContext2D,
    digit: number,
    x: number,
    y: number
  ) {
    ctx.drawImage(
      this.digitSheet,
      digit * (this.characterWidth + 2),
      0,
      this.characterWidth + 2,
      this.characterHeight,
      x,
      y,
      this.characterWidth + 2,
      this.characterHeight
    );
  }
  drawCharacter(
    ctx: CanvasRenderingContext2D,
    letterCode: number,
    x: number,
    y: number
  ) {
    ctx.drawImage(
      this.letterSheet,
      (letterCode - 65) * (this.characterWidth + 2),
      0,
      this.characterWidth + 2,
      this.characterHeight,
      x,
      y,
      this.characterWidth + 2,
      this.characterHeight
    );
  }
}
