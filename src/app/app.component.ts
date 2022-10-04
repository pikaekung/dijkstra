import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('canvas') canvas!: ElementRef;

  private gridSize = 30;
  private fps = 10;
  private direction = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  private ctx!: CanvasRenderingContext2D;
  private snake = {
    position: { x: 5, y: 5 },
    action: [0, 0]
  }

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');

    this.initInputEvent();
    requestAnimationFrame(this.frame.bind(this));
  }

  private initInputEvent(): void {
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        tap((e: KeyboardEvent) => {
          if (e.key === 'ArrowUp') {
            this.snake.action = this.direction[0];
          } else if (e.key === 'ArrowRight') {
            this.snake.action = this.direction[1];
          } else if (e.key === 'ArrowDown') {
            this.snake.action = this.direction[2];
          } else if (e.key === 'ArrowLeft') {
            this.snake.action = this.direction[3];
          }
        }),
      ).subscribe();
  }

  private frame(): void {
    const t0 = performance.now();
    this.update();
    this.render();
    const t1 = performance.now();
    this.drawLog(t1 - t0);

    setTimeout(() => {
      requestAnimationFrame(this.frame.bind(this))
    }, 1000 / this.fps);
  }

  private update(): void {
    // console.log(`Update: ${Date.now()}`)
    this.snake.position.x += this.snake.action[0];
    this.snake.position.y += this.snake.action[1];

    // Check map
    if (this.snake.position.x === 17) {
      this.snake.position.x = 0;
    }

    if (this.snake.position.x === -1) {
      this.snake.position.x = 17;
    }

    if (this.snake.position.y === 10) {
      this.snake.position.y = 0;
    }

    if (this.snake.position.y === -1) {
      this.snake.position.y = 10;
    }
  }

  private render(): void {
    // Clear rect
    this.ctx.clearRect(0, 0, 510, 300);

    this.drawGrid();

    this.drawSnake();
  }

  private drawSnake(): void {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.snake.position.x * this.gridSize, this.snake.position.y * this.gridSize, this.gridSize, this.gridSize);
  }

  private drawLog(timeMs: number): void {
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(`Time: ${timeMs}`, 10, 15);
    this.ctx.fillText(`Position: (${this.snake.position.x}, ${this.snake.position.y})`, 10, 25);
  }

  private draw(): void {
    this.ctx.fillRect(25, 25, 100, 100);
    this.ctx.clearRect(45, 45, 60, 60);
    this.ctx.strokeRect(50, 50, 50, 50);

    this.ctx.lineWidth = 10;
    this.ctx.strokeRect(75, 140, 150, 110);
    this.ctx.fillRect(130, 190, 40, 60);

    this.ctx.beginPath();
    this.ctx.moveTo(50, 140);
    this.ctx.lineTo(150, 60);
    this.ctx.lineTo(250, 140);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawGrid(): void {
    const gridSize = this.gridSize;
    const gridHeight = 10;
    const gridWidth = 17;
    this.ctx.lineWidth = 0.1;
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        this.ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
      }
    }

  }
}
