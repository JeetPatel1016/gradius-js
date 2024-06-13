import Game from "./Game";
import Layer from "./Layer";

export default class Background {
  game: Game;
  layers: Layer[];
  constructor(game: Game) {
    this.game = game;
    let layer1 = document.getElementById("layer1") as HTMLImageElement;
    let layer2 = document.getElementById("layer2") as HTMLImageElement;
    let layer3 = document.getElementById("layer3") as HTMLImageElement;
    let layer4 = document.getElementById("layer4") as HTMLImageElement;

    this.layers = [
      new Layer(this.game, layer1, 0.2),
      new Layer(this.game, layer2, 0.4),
      new Layer(this.game, layer3, 0.8),
      new Layer(this.game, layer4, 1),
    ];
  }
  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => layer.draw(ctx));
  }
}
