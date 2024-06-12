import Game from "./Game";

export default class InputHandler {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          this.game.keys.up = true;
          break;
        case "ArrowDown":
          this.game.keys.down = true;
          break;
        case "ArrowLeft":
          this.game.keys.left = true;
          break;
        case "ArrowRight":
          this.game.keys.right = true;
          break;
        case "z":
          this.game.keys.shoot = true;
          break;
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          this.game.keys.up = false;
          break;
        case "ArrowDown":
          this.game.keys.down = false;
          break;
        case "ArrowLeft":
          this.game.keys.left = false;
          break;
        case "ArrowRight":
          this.game.keys.right = false;
          break;
        case "z":
          this.game.keys.shoot = false;
          break;
      }
    });
  }
}
