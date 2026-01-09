import React, { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let page = 0;

    const pages = [
      {
        title: "ARTIFICER NOTEBOOK",
        body: [
          "Arcane Creations",
          "& Mechanical Concepts",
          "",
          "Property of the Guild",
        ],
      },
      {
        title: "SPELL LOGIC GATES",
        body: [
          "AND → Dual Runes",
          "OR → Parallel Sigils",
          "NOT → Inversion Glyph",
          "",
          "Mana-efficient designs",
        ],
      },
      {
        title: "SCHEMATIC NOTES",
        body: [
          "Copper runes etched",
          "Aether crystal core",
          "Rotational stabilizer",
          "",
          "⚠ unstable prototype",
        ],
      },
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = 540;
      draw();
    }

    window.addEventListener("resize", resize);
    resize();

    function drawNotebook() {
      const bookW = 760;
      const bookH = 420;
      const x = (canvas.width - bookW) / 2;
      const y = (canvas.height - bookH) / 2;

      // background strip (canvas only)
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 10;

      ctx.fillStyle = "#f0deb8";
      ctx.fillRect(x, y, bookW, bookH);
      ctx.restore();

      // border
      ctx.strokeStyle = "#6b4f2b";
      ctx.lineWidth = 4;
      ctx.strokeRect(x + 10, y + 10, bookW - 20, bookH - 20);

      // binding
      ctx.strokeStyle = "#5a3c1d";
      ctx.lineWidth = 3;
      for (let i = 0; i < bookH - 80; i += 26) {
        ctx.beginPath();
        ctx.moveTo(x + 60, y + 40 + i);
        ctx.lineTo(x + 60, y + 54 + i);
        ctx.stroke();
      }

      // page content
      const content = pages[page];
      ctx.fillStyle = "#3b2a14";
      ctx.textAlign = "center";

      ctx.font = "28px Georgia";
      ctx.fillText(content.title, canvas.width / 2 + 20, y + 110);

      ctx.font = "18px Georgia";
      content.body.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2 + 20, y + 160 + i * 28);
      });

      // buttons
      drawButton(x + 120, y + bookH - 70, "< Prev");
      drawButton(x + bookW - 220, y + bookH - 70, "Next >");
    }

    function drawButton(x, y, text) {
      ctx.fillStyle = "#d8c59a";
      ctx.fillRect(x, y, 100, 40);
      ctx.strokeStyle = "#6b4f2b";
      ctx.strokeRect(x, y, 100, 40);

      ctx.fillStyle = "#3b2a14";
      ctx.font = "16px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(text, x + 50, y + 26);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNotebook();
    }

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const bookW = 760;
      const bookH = 420;
      const x = (canvas.width - bookW) / 2;
      const y = (canvas.height - bookH) / 2;

      // prev
      if (
        mx > x + 120 &&
        mx < x + 220 &&
        my > y + bookH - 70 &&
        my < y + bookH - 30
      ) {
        page = (page - 1 + pages.length) % pages.length;
        draw();
      }

      // next
      if (
        mx > x + bookW - 220 &&
        mx < x + bookW - 120 &&
        my > y + bookH - 70 &&
        my < y + bookH - 30
      ) {
        page = (page + 1) % pages.length;
        draw();
      }
    }

    canvas.addEventListener("click", handleClick);
    draw();

    return () => {
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
