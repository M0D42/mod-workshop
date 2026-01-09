import React, { useEffect, useRef, useState } from "react";
import "./hero.css";

export default function Hero() {
  const canvasRef = useRef(null);
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(0); // 0 → 1 animation

  const pages = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const W = 900;
    const H = 460;
    canvas.width = W;
    canvas.height = H;

    let glow = 0;

    function drawParchment() {
      ctx.fillStyle = "#f1e2bf";
      ctx.fillRect(0, 0, W, H);

      // grain
      for (let i = 0; i < 250; i++) {
        ctx.fillStyle = "rgba(120,90,60,0.05)";
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }

      // border
      ctx.strokeStyle = "#8b6a42";
      ctx.lineWidth = 3;
      ctx.strokeRect(18, 18, W - 36, H - 36);
    }

    function drawBinding() {
      ctx.strokeStyle = "#6b4b2a";
      ctx.lineWidth = 3;
      for (let y = 70; y < H - 70; y += 26) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(60, y + 14);
        ctx.stroke();
      }
    }

    function drawGlow() {
      glow += 0.02;
      const g = ctx.createRadialGradient(W / 2, 110, 40, W / 2, 110, 320);
      g.addColorStop(0, `rgba(255,220,150,${0.25 + Math.sin(glow) * 0.05})`);
      g.addColorStop(1, "rgba(255,220,150,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function drawButtons() {
      drawButton(80, H - 60, 90, 32, "◀ Prev");
      drawButton(200, H - 60, 90, 32, "Next ▶");
    }

    function drawButton(x, y, w, h, label) {
      ctx.fillStyle = "#d6b98c";
      ctx.strokeStyle = "#8b6a42";
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = "#3a2614";
      ctx.font = "bold 14px Georgia";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x + w / 2, y + h / 2);
    }

    function drawPageContent(p, offsetX = 0) {
      ctx.save();
      ctx.translate(100 + offsetX, 80);

      ctx.fillStyle = "#5a3b1f";
      ctx.font = "28px Georgia";
      ctx.textAlign = "center";

      if (p === 0) {
        ctx.fillText("ARTIFICER NOTEBOOK", 300, 40);
        ctx.font = "16px Georgia";
        ctx.fillText("of Arcane Creations", 300, 80);
        ctx.fillText("and Concepts", 300, 100);

        ctx.strokeStyle = "#7a5733";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(300, 190, 60, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (p === 1) ctx.fillText("Mana Circuit Diagram", 300, 80);
      if (p === 2) ctx.fillText("Spell Logic Gates", 300, 80);
      if (p === 3) ctx.fillText("Automaton Assembly", 300, 80);
      if (p === 4) ctx.fillText("⚠ Failed Experiment", 300, 80);

      ctx.restore();
    }

    function drawFlip() {
      if (flip <= 0) return;

      ctx.fillStyle = `rgba(0,0,0,${0.2 * flip})`;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#e9d7b0";
      ctx.beginPath();
      ctx.moveTo(W - 20 - flip * 300, 20);
      ctx.lineTo(W - 20, 20);
      ctx.lineTo(W - 20, H - 20);
      ctx.lineTo(W - 20 - flip * 300, H - 20);
      ctx.closePath();
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawParchment();
      drawBinding();
      drawGlow();
      drawPageContent(page);
      drawFlip();
      drawButtons();
      requestAnimationFrame(draw);
    }

    draw();

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x > 80 && x < 170 && y > H - 60 && y < H - 28) {
        triggerFlip(-1);
      }

      if (x > 200 && x < 290 && y > H - 60 && y < H - 28) {
        triggerFlip(1);
      }
    };

    function triggerFlip(dir) {
      let t = 0;
      const anim = () => {
        t += 0.08;
        setFlip(t);
        if (t < 1) requestAnimationFrame(anim);
        else {
          setPage((p) => (p + dir + pages) % pages);
          setFlip(0);
        }
      };
      anim();
    }
  }, [page]);

  return (
    <div className="Hero">
      <canvas ref={canvasRef} />
    </div>
  );
}
