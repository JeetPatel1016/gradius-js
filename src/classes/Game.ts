import InputHandler from "./InputHandler";
import Player from "./Player";

export type Keys = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
};

export default class Game {
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  keys: Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  };
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
  }
  update() {
    this.player.update();
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.player.draw(ctx);
  }
}
