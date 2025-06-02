import React, { useEffect, useRef } from 'react';
import './hero.css';

function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log('useEffect is running');
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
     

        // Generate stars
        const stars = [];
        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1, // Random size
            });
        }

        // Draw stars
        const drawStars = () => {
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.shadowBlur = 5;
                ctx.shadowColor = 'white';
                ctx.fill();
            });
        };

        // Load the astronaut image
        const astronaut = new Image();
        astronaut.src = 'https://pnghq.com/wp-content/uploads/astronaut-png-photos-free-png-images-97212-768x859.png';
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        const astronautWidth = 100;
        const astronautHeight = 100;
        const heroHeight = window.innerHeight * 0.8;
        const spacewalker = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawStars(); // Draw stars first
            ctx.drawImage(astronaut, x, y, astronautWidth, astronautHeight); // Draw astronaut

            x += dx;
            y += dy;

            // Reverse direction when hitting canvas edges
            if (x + astronautWidth > canvas.width || x < 0) {
                dx = -dx;
            }
            if (y + astronautHeight > heroHeight || y < 0) {
                dy = -dy;
            }

            requestAnimationFrame(spacewalker); // Request the next frame
        };

        astronaut.onload = () => {
            spacewalker(); // Start the animation when the image is loaded
        };
    }, []);

    return (
        <div className="Hero">
            <canvas id="canvas" className="canvas" ref={canvasRef}></canvas>
            <h1>M0D Workshop</h1>
        </div>
    );
}

export default Hero;