import Game from "./Game";

export default class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  speedX = 0;
  speedY = 0;
  maxSpeed = 3;
  constructor(game: Game) {
    this.game = game;
    this.x = 20;
    this.y = 100;
    this.width = 70;
    this.height = 30;
  }
  update() {
    const sin45 = Math.sin(Math.PI / 4);
    // Reset speed
    this.speedX = 0;
    this.speedY = 0;

    // Handle vertical movement
    if (this.game.keys.up) {
      this.speedY =
        -this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    } else if (this.game.keys.down) {
      this.speedY =
        this.maxSpeed *
        (this.game.keys.left || this.game.keys.right ? sin45 : 1);
    }

    // Handle horizontal movement
    if (this.game.keys.right && !this.game.keys.left) {
      this.speedX = this.maxSpeed;
    } else if (this.game.keys.left && !this.game.keys.right) {
      this.speedX = -this.maxSpeed;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
