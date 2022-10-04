import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('canvas') canvas!: ElementRef;

  title = 'dijkstra';

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
  }
}
