import Game from "./classes/Game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 800;
canvas.height = 600;

const game = new Game(canvas.width, canvas.height);

const FPS = 60;
let elapsed: number, end: number;
let now = Date.now();

function animate() {
  requestAnimationFrame(animate);
  end = Date.now();
  elapsed = end - now;
  if (elapsed > 1000 / FPS) {
    end = now;
    now = Date.now();
    // Main Code here
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
  }
}

animate();
