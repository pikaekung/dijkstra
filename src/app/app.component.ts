import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('canvas') canvas!: ElementRef;

  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');


    requestAnimationFrame(this.frame.bind(this));
  }

  private frame(): void {
    const t0 = performance.now();
    this.update();
    this.render();
    const t1 = performance.now();
    this.drawLog(t1 - t0);
    requestAnimationFrame(this.frame.bind(this))
  }

  private update(): void {
    // console.log(`Update: ${Date.now()}`)
  }

  private render(): void {
    // this.draw();
    // Clear rect
    this.ctx.clearRect(0, 0, 510, 300);
    this.drawGrid();
  }

  private drawLog(timeMs: number): void {
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(`Time: ${timeMs}`, 10, 15);
    const t0 = performance.now();

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
    const gridSize = 30;
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
