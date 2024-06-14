import Background from "./Background";
import { Enemy, Flipper, Garun } from "./Enemy";
import InputHandler from "./InputHandler";
import Player from "./Player";
import Projectile from "./Projectile";
import UI from "./UI";

export type Keys = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
};

export default class Game {
  // Meta variables
  width: number;
  height: number;
  ui: UI;
  score = 0;

  // Variables for Player and input handling
  player: Player;
  input: InputHandler;
  keys: Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
  };
  // Variables for enemies
  enemies: Enemy[] = [];
  enemyTimer = 0;
  enemyInterval = 100;

  // Game States
  gameOver = false;

  // Background Layers Handling
  speed = 1;
  bg: Background;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.bg = new Background(this);
  }
  update() {
    this.bg.update();
    this.player.update();
    this.enemies.forEach((enemy) => {
      enemy.update();
      // Check collision of enemy with player
      if (this.checkCollision(this.player, enemy)) {
        this.player.lives = Math.max(this.player.lives - 1, 0);
        enemy.markedForDeletion = true;
      }
      // Check collision of enemy with projectiles
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDelete = true;
          if (enemy.lives <= 0) {
            this.score += enemy.score;
            enemy.markedForDeletion = true;
          }
        }
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer++;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.bg.draw(ctx);
    this.player.draw(ctx);
    this.ui.draw(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
  addEnemy() {
    this.enemies.push(new Garun(this), new Flipper(this));
  }
  checkCollision(
    rect1: Player | Enemy | Projectile,
    rect2: Player | Enemy | Projectile
  ) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
