import { Component,OnInit  } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, SobreMiComponent, ProyectosComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    const canvas: HTMLCanvasElement = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];

    // Crear círculos
    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 5 + 2;
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: radius,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const circle of circles) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(151, 0, 0, 0.6)';
        ctx.fill();
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Rebotar en los bordes
        if (circle.x + circle.r > canvas.width || circle.x - circle.r < 0) circle.dx *= -1;
        if (circle.y + circle.r > canvas.height || circle.y - circle.r < 0) circle.dy *= -1;
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Redimensionar canvas dinámicamente
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}