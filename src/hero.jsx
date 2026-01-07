import React, { useEffect, useRef } from 'react';
import './hero.css';

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("useEffect running...");

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ⭐ Generate stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
    }));

    const drawStars = () => {
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";
        ctx.fill();
      });
    };

    // 👨‍🚀 Astronaut
    const astronaut = new Image();
    astronaut.src =
      "./astronaut.png";

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    const astronautWidth = 100;
    const astronautHeight = 100;

    let frameId;

    const spacewalker = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();
      ctx.drawImage(astronaut, x, y, astronautWidth, astronautHeight);

      x += dx;
      y += dy;

      // Bounce off edges
      if (x <= 0 || x + astronautWidth >= canvas.width) dx = -dx;
      if (y <= 0 || y + astronautHeight >= canvas.height) dy = -dy;

      frameId = requestAnimationFrame(spacewalker);
    };

    astronaut.onload = () => {
      spacewalker();
    };

    // 🧹 Cleanup
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="Hero">
      <canvas className="canvas" ref={canvasRef}></canvas>
      <h1>M0D Workshop</h1>
    </div>
  );
}

export default Hero;
