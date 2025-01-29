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
    const numCircles = 75;
    const maxDistance = 200; // Distancia máxima para conectar círculos
  
    // Crear círculos con posiciones aleatorias
    for (let i = 0; i < numCircles; i++) {
      const radius = Math.random() * 5 + 2;
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: radius,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      });
    }
  
    function drawLines() {
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const dx = circles[i].x - circles[j].x;
          const dy = circles[i].y - circles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(circles[i].x, circles[i].y);
            ctx.lineTo(circles[j].x, circles[j].y);
  
            // Opacidad basada en la distancia (más cerca = más visible)
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(29, 182, 149, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Dibujar círculos
      for (const circle of circles) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(98, 149, 132, 0.8)';
        ctx.fill();
        circle.x += circle.dx;
        circle.y += circle.dy;
  
        // Si el círculo toca el borde, reposiciónalo en una posición aleatoria
        if (circle.x + circle.r > canvas.width || circle.x - circle.r < 0 || circle.y + circle.r > canvas.height || circle.y - circle.r < 0) {
          circle.x = Math.random() * canvas.width;  // Posición aleatoria en el eje X
          circle.y = Math.random() * canvas.height; // Posición aleatoria en el eje Y
        }
      }
  
      // Dibujar líneas entre círculos cercanos
      drawLines();
  
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