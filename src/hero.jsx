import React, { useEffect, useRef } from 'react';
import './hero.css';

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;

        // Dragon object
        const dragon = {
            x: 100,
            y: 150,
            width: 80,
            height: 60,
            velocityY: 0,
            velocityX: 2,
        };

        // Fireballs array
        let fireballs = [];
        let people = [];

        // Create people at the bottom
        function createPeople() {
            for (let i = 0; i < 5; i++) {
                people.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height - 100,
                    width: 30,
                    height: 40,
                    alive: true,
                });
            }
        }

        // Draw dragon
        function drawDragon() {
            // Body
            ctx.fillStyle = '#2d5016';
            ctx.fillRect(dragon.x, dragon.y, dragon.width, dragon.height);

            // Head
            ctx.fillStyle = '#3d6b1f';
            ctx.beginPath();
            ctx.arc(dragon.x + dragon.width - 20, dragon.y + 20, 15, 0, Math.PI * 2);
            ctx.fill();

            // Eye
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(dragon.x + dragon.width - 10, dragon.y + 15, 5, 0, Math.PI * 2);
            ctx.fill();

            // Wings
            ctx.fillStyle = 'rgba(61, 107, 31, 0.7)';
            ctx.beginPath();
            ctx.ellipse(dragon.x + 30, dragon.y - 10, 20, 35, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(dragon.x + 30, dragon.y + dragon.height + 10, 20, 35, 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Tail
            ctx.strokeStyle = '#2d5016';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(dragon.x, dragon.y + 20);
            ctx.quadraticCurveTo(dragon.x - 40, dragon.y - 20, dragon.x - 60, dragon.y + 30);
            ctx.stroke();
        }

        // Draw fireballs
        function drawFireballs() {
            fireballs.forEach((fireball, index) => {
                // Outer flame (orange)
                ctx.fillStyle = '#ff6b35';
                ctx.beginPath();
                ctx.arc(fireball.x, fireball.y, fireball.radius, 0, Math.PI * 2);
                ctx.fill();

                // Inner flame (yellow)
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.arc(fireball.x, fireball.y, fireball.radius * 0.6, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                fireball.x += fireball.velocityX;
                fireball.y += fireball.velocityY;

                // Remove if off screen
                if (fireball.y > canvas.height || fireball.x > canvas.width) {
                    fireballs.splice(index, 1);
                }
            });
        }

        // Draw people
        function drawPeople() {
            people.forEach((person) => {
                if (!person.alive) return;

                // Body
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(person.x, person.y, person.width, person.height);

                // Head
                ctx.fillStyle = '#ffdbac';
                ctx.beginPath();
                ctx.arc(person.x + person.width / 2, person.y - 10, 8, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Check collisions
        function checkCollisions() {
            fireballs.forEach((fireball, fIndex) => {
                people.forEach((person, pIndex) => {
                    const distance = Math.hypot(
                        fireball.x - (person.x + person.width / 2),
                        fireball.y - (person.y + person.height / 2)
                    );

                    if (distance < fireball.radius + 15) {
                        person.alive = false;
                        fireballs.splice(fIndex, 1);
                    }
                });
            });
        }

        // Shoot fireballs
        let shootCounter = 0;
        function shootFireball() {
            shootCounter++;
            if (shootCounter > 30) {
                const fireball = {
                    x: dragon.x + dragon.width - 20,
                    y: dragon.y + 20,
                    velocityX: 3,
                    velocityY: 2,
                    radius: 10,
                };
                fireballs.push(fireball);
                shootCounter = 0;
            }
        }

        // Animation loop
        function animate() {
            // Clear canvas
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stars (background)
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 100; i++) {
                const x = (i * 137.508) % canvas.width;
                const y = (i * 73.4) % (canvas.height * 0.5);
                ctx.fillRect(x, y, 2, 2);
            }

            // Update dragon position (flying pattern)
            dragon.y += Math.sin(dragon.x * 0.02) * 0.5;
            dragon.x += dragon.velocityX;

            // Reset dragon position when off screen
            if (dragon.x > canvas.width + 100) {
                dragon.x = -100;
                fireballs = [];
                people.forEach((p) => (p.alive = true));
            }

            // Shoot fireballs
            shootFireball();

            // Check collisions
            checkCollisions();

            // Draw everything
            drawDragon();
            drawFireballs();
            drawPeople();

            requestAnimationFrame(animate);
        }

        createPeople();
        animate();

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.8;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="Hero">
            <canvas ref={canvasRef} style={{ display: 'block', backgroundColor: '#000' }} />
        </div>
    );
};

export default Hero;
