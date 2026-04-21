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

        // Load dragon sprite
        const dragonImg = new Image();
        dragonImg.src = 'https://lazfar.wordpress.com/wp-content/uploads/2012/10/flying-dragon2.gif';

        // Dragon object
        const dragon = {
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height * 0.3) + 50,
            width: 120,
            height: 100,
            velocityX: Math.random() > 0.5 ? 2 : -2,
            velocityY: Math.sin(Math.random() * Math.PI) * 0.5,
            direction: Math.random() > 0.5 ? 1 : -1, // 1 = right, -1 = left
        };

        // Castle object - random position
        const castle = {
            x: Math.random() * (canvas.width - 300) + 100,
            y: canvas.height - 250,
            width: 200,
            height: 200,
            health: 100,
            maxHealth: 100,
        };

        // Fireballs array
        let fireballs = [];
        let defenders = [];
        let score = 0;
        let gameActive = true;

        // Create defenders on the castle
        function createDefenders() {
            defenders = [
                { x: castle.x + 40, y: castle.y - 30, width: 20, height: 25, alive: true },
                { x: castle.x + 90, y: castle.y - 35, width: 20, height: 25, alive: true },
                { x: castle.x + 140, y: castle.y - 28, width: 20, height: 25, alive: true },
            ];
        }

        // Draw castle
        function drawCastle() {
            // Main walls
            ctx.fillStyle = '#8b7355';
            ctx.fillRect(castle.x, castle.y, castle.width, castle.height);

            // Castle outline
            ctx.strokeStyle = '#5a4a3a';
            ctx.lineWidth = 3;
            ctx.strokeRect(castle.x, castle.y, castle.width, castle.height);

            // Towers (corners)
            const towerWidth = 30;
            const towerHeight = 80;

            // Top left tower
            ctx.fillStyle = '#8b7355';
            ctx.fillRect(castle.x - 15, castle.y - towerHeight, towerWidth, towerHeight);
            ctx.strokeRect(castle.x - 15, castle.y - towerHeight, towerWidth, towerHeight);

            // Top right tower
            ctx.fillRect(castle.x + castle.width - 15, castle.y - towerHeight, towerWidth, towerHeight);
            ctx.strokeRect(castle.x + castle.width - 15, castle.y - towerHeight, towerWidth, towerHeight);

            // Crenellations (castle teeth)
            const crenellationWidth = 20;
            const crenellationHeight = 30;
            for (let i = 0; i < 6; i++) {
                ctx.fillStyle = '#8b7355';
                ctx.fillRect(
                    castle.x + i * 35,
                    castle.y - crenellationHeight,
                    crenellationWidth,
                    crenellationHeight
                );
                ctx.strokeRect(
                    castle.x + i * 35,
                    castle.y - crenellationHeight,
                    crenellationWidth,
                    crenellationHeight
                );
            }

            // Castle gate (door)
            ctx.fillStyle = '#3a2a1a';
            ctx.fillRect(castle.x + 80, castle.y + castle.height - 60, 40, 60);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(castle.x + 80, castle.y + castle.height - 60, 40, 60);

            // Castle flag on tower
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(castle.x + 10, castle.y - towerHeight + 10, 40, 20);
            ctx.fillStyle = '#ffff00';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('♟', castle.x + 15, castle.y - towerHeight + 23);

            // Health bar
            ctx.fillStyle = '#333';
            ctx.fillRect(castle.x, castle.y - 50, castle.width, 15);
            ctx.fillStyle = castle.health > 50 ? '#00ff00' : castle.health > 25 ? '#ffff00' : '#ff0000';
            ctx.fillRect(castle.x, castle.y - 50, (castle.health / 100) * castle.width, 15);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(castle.x, castle.y - 50, castle.width, 15);

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(`HP: ${Math.floor(castle.health)}`, castle.x + 70, castle.y - 37);
        }

        // Draw dragon with sprite image
        function drawDragon() {
            if (dragonImg.complete) {
                // Draw dragon sprite
                if (dragon.direction === 1) {
                    ctx.drawImage(dragonImg, dragon.x, dragon.y, dragon.width, dragon.height);
                } else {
                    // Flip horizontally
                    ctx.save();
                    ctx.translate(dragon.x + dragon.width, dragon.y);
                    ctx.scale(-1, 1);
                    ctx.drawImage(dragonImg, 0, 0, dragon.width, dragon.height);
                    ctx.restore();
                }

                // Fire breath indicator
                ctx.fillStyle = 'rgba(255, 100, 0, 0.5)';
                ctx.beginPath();
                ctx.arc(
                    dragon.direction === 1 ? dragon.x + dragon.width : dragon.x,
                    dragon.y + dragon.height / 2,
                    25,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
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

                // Glow effect
                ctx.fillStyle = 'rgba(255, 107, 53, 0.3)';
                ctx.beginPath();
                ctx.arc(fireball.x, fireball.y, fireball.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                fireball.x += fireball.velocityX;
                fireball.y += fireball.velocityY;

                // Remove if off screen
                if (fireball.y > canvas.height || fireball.x > canvas.width || fireball.x < 0) {
                    fireballs.splice(index, 1);
                }
            });
        }

        // Draw defenders
        function drawDefenders() {
            defenders.forEach((defender) => {
                if (!defender.alive) return;

                // Body
                ctx.fillStyle = '#3333ff';
                ctx.fillRect(defender.x, defender.y, defender.width, defender.height);

                // Head
                ctx.fillStyle = '#ffdbac';
                ctx.beginPath();
                ctx.arc(defender.x + defender.width / 2, defender.y - 8, 6, 0, Math.PI * 2);
                ctx.fill();

                // Shield
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.arc(defender.x + defender.width / 2, defender.y + 10, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ff6600';
                ctx.lineWidth =](#)*

