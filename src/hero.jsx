import React, { useEffect, useRef } from "react";
import "./hero.css";

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let page = 0;
    const pages = 5;

    const prevBtn = { x: 40, y: 380, w: 90, h: 32 };
    const nextBtn = { x: 160, y: 380, w: 90, h: 32 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 460;
      draw();
    };

    window.addEventListener("resize", resize);
    resize();

    /* ================= DRAW LOOP ================= */

    function draw() {
      drawParchment();
      drawBinding();
      drawGlow();
      drawPage(page);
      drawButtons();
      drawPageNumber();
    }

    /* ================= PAPER ================= */

    function drawParchment() {
      ctx.fillStyle = "rgb(238,220,185)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 200; i++) {
        ctx.fillStyle = "rgba(190,165,125,0.25)";
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1,
          1
        );
      }

      ctx.strokeStyle = "rgb(140,110,70)";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    }

    /* ================= BINDING ================= */

    function drawBinding() {
      ctx.strokeStyle = "rgb(110,80,50)";
      ctx.lineWidth = 3;
      for (let y = 70; y < canvas.height - 70; y += 26) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(60, y + 14);
        ctx.stroke();
      }
    }

    /* ================= MAGIC GLOW ================= */

    function drawGlow() {
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        120,
        40,
        canvas.width / 2,
        120,
        300
      );
      grad.addColorStop(0, "rgba(255,220,140,0.25)");
      grad.addColorStop(1, "rgba(255,220,140,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /* ================= PAGE CONTENT ================= */

    function drawPage(p) {
      ctx.save();
      ctx.translate(90, 70);

      if (p === 0) coverPage();
      if (p === 1) manaCircuit();
      if (p === 2) spellLogic();
      if (p === 3) automaton();
      if (p === 4) warningPage();

      ctx.restore();
    }

    function coverPage() {
      ctx.textAlign = "center";
      ctx.fillStyle = "rgb(120,85,45)";
      ctx.font = "30px Georgia";
      ctx.fillText(
        "ARTIFICER NOTEBOOK",
        canvas.width / 2 - 90,
        90
      );

      ctx.font = "16px Georgia";
      ctx.fillStyle = "rgb(90,60,35)";
      ctx.fillText("of Arcane Creations", canvas.width / 2 - 90, 130);
      ctx.fillText("and Concepts", canvas.width / 2 - 90, 155);

      ctx.strokeStyle = "rgb(150,110,70)";
      ctx.beginPath();
      ctx.moveTo(140, 180);
      ctx.lineTo(340, 180);
      ctx.stroke();

      ctx.strokeStyle = "rgb(120,90,60)";
      ctx.beginPath();
      ctx.arc(240, 255, 50, 0, Math.PI * 2);
      ctx.arc(240, 255, 32, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgb(90,60,35)";
      ctx.font = "14px Georgia";
      ctx.fillText(
        "Property of the Guild Artificer",
        canvas.width / 2 - 90,
        330
      );
    }

    function manaCircuit() {
      ctx.strokeStyle = "rgb(70,45,25)";
      ctx.lineWidth = 2;
      jitterLine(40, 120, 260, 120);
      ctx.beginPath();
      ctx.arc(40, 120, 8, 0, Math.PI * 2);
      ctx.arc(260, 120, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgb(70,45,25)";
      ctx.font = "18px Georgia";
      ctx.fillText("Mana Conduit Flow", 40, 80);
    }

    function spellLogic() {
      ctx.strokeStyle = "rgb(70,45,25)";
      ctx.strokeRect(60, 80, 80, 44);
      ctx.strokeRect(200, 80, 80, 44);

      ctx.beginPath();
      ctx.moveTo(20, 102);
      ctx.lineTo(60, 102);
      ctx.moveTo(140, 102);
      ctx.lineTo(200, 102);
      ctx.moveTo(280, 102);
      ctx.lineTo(340, 102);
      ctx.stroke();

      ctx.fillStyle = "rgb(70,45,25)";
      ctx.fillText("AND Rune", 62, 72);
      ctx.fillText("OR Sigil", 202, 72);
    }

    function automaton() {
      ctx.strokeStyle = "rgb(70,45,25)";
      ctx.beginPath();
      ctx.arc(140, 120, 30, 0, Math.PI * 2);
      ctx.moveTo(140, 150);
      ctx.lineTo(140, 230);
      ctx.moveTo(140, 180);
      ctx.lineTo(100, 220);
      ctx.moveTo(140, 180);
      ctx.lineTo(180, 220);
      ctx.stroke();

      ctx.fillText("Golem Core Assembly", 70, 70);
    }

    function warningPage() {
      ctx.strokeStyle = "rgb(130,45,45)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 40);
      ctx.lineTo(300, 220);
      ctx.moveTo(300, 40);
      ctx.lineTo(40, 220);
      ctx.stroke();

      ctx.fillStyle = "rgb(130,45,45)";
      ctx.font = "26px Georgia";
      ctx.fillText("FAILED", 90, 120);
      ctx.fillText("EXPERIMENT", 70, 150);
    }

    /* ================= BUTTONS ================= */

    function drawButtons() {
      drawButton(prevBtn, "◀ Prev");
      drawButton(nextBtn, "Next ▶");
    }

    function drawButton(b, label) {
      ctx.fillStyle = "rgb(200,170,130)";
      ctx.strokeStyle = "rgb(120,90,60)";
      ctx.lineWidth = 2;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      ctx.fillStyle = "rgb(60,40,20)";
      ctx.font = "14px Georgia";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, b.x + b.w / 2, b.y + b.h / 2);
    }

    function drawPageNumber() {
      ctx.textAlign = "right";
      ctx.fillStyle = "rgb(100,75,50)";
      ctx.fillText(`Page ${page}`, canvas.width - 50, canvas.height - 28);
    }

    function jitterLine(x1, y1, x2, y2) {
      ctx.beginPath();
      for (let i = 0; i <= 1; i += 0.1) {
        ctx.lineTo(
          x1 + (x2 - x1) * i + Math.random() * 2 - 1,
          y1 + (y2 - y1) * i + Math.random() * 2 - 1
        );
      }
      ctx.stroke();
    }

    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (hit(mx, my, prevBtn)) page = (page - 1 + pages) % pages;
      if (hit(mx, my, nextBtn)) page = (page + 1) % pages;
      draw();
    });

    function hit(mx, my, b) {
      return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h;
    }

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="Hero">
      <canvas ref={canvasRef} className="canvas" />
      <h1>Artificer Workshop</h1>
    </div>
  );
}

export default Hero;
