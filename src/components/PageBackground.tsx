import React, { useEffect, useRef } from 'react';

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic density particle count based on screen area
    const getParticleCount = (w: number, h: number) => {
      const area = w * h;
      return Math.min(130, Math.max(40, Math.floor(area / 16000)));
    };

    let particlesArray: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    const initParticles = (w: number, h: number) => {
      particlesArray = [];
      const count = getParticleCount(w, h);
      for (let i = 0; i < count; i++) {
        particlesArray.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.4, // delicate gold dust size
          d: Math.random() * 100,
          speedY: -(Math.random() * 0.4 + 0.15), // floating upward gently
          speedX: Math.random() * 0.25 - 0.125,
          opacity: Math.random() * 0.45 + 0.15,
        });
      }
    };

    initParticles(width, height);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Warm radial atmospheric background glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, '#FCFAF6');
      grad.addColorStop(0.5, '#F7F3E9');
      grad.addColorStop(1, '#EFEAE0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update active gold dust embers
      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fillStyle = `rgba(154, 125, 60, ${p.opacity})`;
        ctx.fill();

        // Positional physics updates
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.d) * 0.08;
        p.d += 0.008;

        // Reset particle position if it drifts off the screen top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        // Wrap horizontally
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
    />
  );
}
