import React, { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let pageIndex = 0;

    /* =========================
       CANVAS SETUP
    ========================= */
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = 540;
      draw();
    }
    window.addEventListener("resize", resize);
    resize();

    /* =========================
       PAGE CANVASES
    ========================= */
    const PAGE_W = 520;
    const PAGE_H = 300;
    const pages = [];

    function createPage(drawFn) {
      const c = document.createElement("canvas");
      c.width = PAGE_W;
      c.height = PAGE_H;
      drawFn(c.getContext("2d"));
      return c;
    }

    /* =========================
       PAGE 0 — COVER
    ========================= */
    pages.push(
      createPage((c) => {
        parchment(c);

        c.fillStyle = "#3b2a14";
        c.textAlign = "center";
        c.font = "32px Georgia";
        c.fillText("ARTIFICER NOTEBOOK", PAGE_W / 2, 90);

        c.font = "18px Georgia";
        c.fillText("of Arcane Creations", PAGE_W / 2, 140);
        c.fillText("and Concepts", PAGE_W / 2, 170);

        c.strokeStyle = "#6b4f2b";
        c.beginPath();
        c.arc(PAGE_W / 2, 230, 40, 0, Math.PI * 2);
        c.stroke();
      })
    );

    /* =========================
       PAGE 1 — SPELL LOGIC (GLOW)
    ========================= */
    pages.push(
      createPage((c) => {
        parchment(c);
        glow(c); // ✨ PAGE-SPECIFIC GLOW

        c.strokeStyle = "#3b2a14";
        c.lineWidth = 2;

        c.strokeRect(60, 120, 80, 50);
        c.strokeRect(220, 120, 80, 50);

        c.beginPath();
        c.moveTo(20, 145);
        c.lineTo(60, 145);
        c.moveTo(140, 145);
        c.lineTo(220, 145);
        c.moveTo(300, 145);
        c.lineTo(360, 145);
        c.stroke();

        c.fillStyle = "#3b2a14";
        c.font = "16px Georgia";
        c.fillText("AND Rune", 70, 110);
        c.fillText("OR Sigil", 230, 110);
      })
    );

    /* =========================
       PAGE 2 — AUTOMATON
    ========================= */
    pages.push(
      createPage((c) => {
        parchment(c);

        c.strokeStyle = "#3b2a14";
        c.lineWidth = 2;

        c.beginPath();
        c.arc(260, 90, 30, 0, Math.PI * 2);
        c.stroke();

        c.beginPath();
        c.moveTo(260, 120);
        c.lineTo(260, 220);
        c.lineTo(220, 260);
        c.moveTo(260, 220);
        c.lineTo(300, 260);
        c.stroke();

        c.fillStyle = "#3b2a14";
        c.font = "18px Georgia";
        c.fillText("Golem Core Assembly", 160, 40);
      })
    );

    /* =========================
       DRAW HERO NOTEBOOK
    ========================= */
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bookW = 760;
      const bookH = 420;
      const bx = (canvas.width - bookW) / 2;
      const by = (canvas.height - bookH) / 2;

      // background
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // book shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = "#f0deb8";
      ctx.fillRect(bx, by, bookW, bookH);
      ctx.restore();

      // border
      ctx.strokeStyle = "#6b4f2b";
      ctx.lineWidth = 4;
      ctx.strokeRect(bx + 10, by + 10, bookW - 20, bookH - 20);

      // binding
      ctx.strokeStyle = "#5a3c1d";
      for (let y = 40; y < bookH - 60; y += 26) {
        ctx.beginPath();
        ctx.moveTo(bx + 60, by + y);
        ctx.lineTo(bx + 60, by + y + 14);
        ctx.stroke();
      }

      // page canvas
      ctx.drawImage(pages[pageIndex], bx + 140, by + 60);

      button(bx + 140, by + bookH - 70, "< Prev");
      button(bx + bookW - 240, by + bookH - 70, "Next >");
    }

    /* =========================
       HELPERS
    ========================= */
    function parchment(c) {
      c.fillStyle = "#f0deb8";
      c.fillRect(0, 0, PAGE_W, PAGE_H);
    }

    function glow(c) {
      c.save();
      c.globalAlpha = 0.35;
      c.fillStyle = "#ffd88a";
      c.beginPath();
      c.ellipse(PAGE_W / 2, PAGE_H / 2, 220, 120, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function button(x, y, label) {
      ctx.fillStyle = "#d8c59a";
      ctx.fillRect(x, y, 100, 40);
      ctx.strokeStyle = "#6b4f2b";
      ctx.strokeRect(x, y, 100, 40);
      ctx.fillStyle = "#3b2a14";
      ctx.font = "16px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(label, x + 50, y + 26);
    }

    function click(e) {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;

      const bx = (canvas.width - 760) / 2;
      const by = (canvas.height - 420) / 2;

      if (mx > bx + 140 && mx < bx + 240 && my > by + 350 && my < by + 390)
        pageIndex = (pageIndex - 1 + pages.length) % pages.length;

      if (mx > bx + 520 && mx < bx + 620 && my > by + 350 && my < by + 390)
        pageIndex = (pageIndex + 1) % pages.length;

      draw();
    }

    canvas.addEventListener("click", click);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", click);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
