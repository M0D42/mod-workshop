import React, { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let page = 0;

    /* =====================
       SIZE (FIXED HERO)
    ===================== */
    const HERO_H = 520;
    const BOOK_W = 760;
    const BOOK_H = 420;
    const PAGE_W = 480;
    const PAGE_H = 280;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = HERO_H;
      draw();
    }
    window.addEventListener("resize", resize);
    resize();

    /* =====================
       PAGE CANVASES
    ===================== */
    function makePage(drawFn) {
      const c = document.createElement("canvas");
      c.width = PAGE_W;
      c.height = PAGE_H;
      drawFn(c.getContext("2d"));
      return c;
    }

    const pages = [];

    /* -------- PAGE 0 : COVER -------- */
    pages.push(
      makePage((c) => {
        parchment(c);
        c.fillStyle = "#3b2a14";
        c.textAlign = "center";
        c.font = "32px Georgia";
        c.fillText("ARTIFICER NOTEBOOK", PAGE_W / 2, 90);
        c.font = "18px Georgia";
        c.fillText("of Arcane Creations", PAGE_W / 2, 140);
        c.fillText("and Concepts", PAGE_W / 2, 170);
      })
    );

    /* -------- PAGE 1 : SPELL LOGIC (GLOW) -------- */
    pages.push(
      makePage((c) => {
        parchment(c);
        glow(c);

        c.strokeStyle = "#3b2a14";
        c.lineWidth = 2;

        c.strokeRect(80, 120, 80, 50);
        c.strokeRect(260, 120, 80, 50);

        c.beginPath();
        c.moveTo(40, 145);
        c.lineTo(80, 145);
        c.moveTo(160, 145);
        c.lineTo(260, 145);
        c.moveTo(340, 145);
        c.lineTo(400, 145);
        c.stroke();

        c.fillStyle = "#3b2a14";
        c.font = "16px Georgia";
        c.fillText("AND Rune", 90, 110);
        c.fillText("OR Sigil", 270, 110);
      })
    );

    /* -------- PAGE 2 : AUTOMATON -------- */
    pages.push(
      makePage((c) => {
        parchment(c);
        c.strokeStyle = "#3b2a14";
        c.lineWidth = 2;

        c.beginPath();
        c.arc(240, 80, 30, 0, Math.PI * 2);
        c.stroke();

        c.beginPath();
        c.moveTo(240, 110);
        c.lineTo(240, 220);
        c.lineTo(200, 260);
        c.moveTo(240, 220);
        c.lineTo(280, 260);
        c.stroke();

        c.fillStyle = "#3b2a14";
        c.font = "18px Georgia";
        c.fillText("Golem Core Assembly", 130, 40);
      })
    );

    /* =====================
       DRAW
    ===================== */
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bx = (canvas.width - BOOK_W) / 2;
      const by = (canvas.height - BOOK_H) / 2;

      /* parchment background (NOT black) */
      ctx.fillStyle = "#e7d3aa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* book */
      ctx.fillStyle = "#f0deb8";
      ctx.fillRect(bx, by, BOOK_W, BOOK_H);

      ctx.strokeStyle = "#6b4f2b";
      ctx.lineWidth = 4;
      ctx.strokeRect(bx, by, BOOK_W, BOOK_H);

      /* binding */
      ctx.strokeStyle = "#5a3c1d";
      for (let y = 50; y < BOOK_H - 50; y += 26) {
        ctx.beginPath();
        ctx.moveTo(bx + 60, by + y);
        ctx.lineTo(bx + 60, by + y + 14);
        ctx.stroke();
      }

      /* page */
      ctx.drawImage(
        pages[page],
        bx + 140,
        by + 70
      );

      button(bx + 140, by + BOOK_H - 60, "◀ Prev");
      button(bx + BOOK_W - 240, by + BOOK_H - 60, "Next ▶");
    }

    /* =====================
       HELPERS
    ===================== */
    function parchment(c) {
      c.fillStyle = "#f0deb8";
      c.fillRect(0, 0, PAGE_W, PAGE_H);
    }

    function glow(c) {
      c.save();
      c.globalAlpha = 0.35;
      c.fillStyle = "#ffd88a";
      c.beginPath();
      c.ellipse(PAGE_W / 2, PAGE_H / 2, 200, 110, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function button(x, y, label) {
      ctx.fillStyle = "#d8c59a";
      ctx.fillRect(x, y, 100, 36);
      ctx.strokeStyle = "#6b4f2b";
      ctx.strokeRect(x, y, 100, 36);
      ctx.fillStyle = "#3b2a14";
      ctx.font = "15px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(label, x + 50, y + 24);
    }

    function click(e) {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;

      const bx = (canvas.width - BOOK_W) / 2;
      const by = (canvas.height - BOOK_H) / 2;

      if (mx > bx + 140 && mx < bx + 240 && my > by + BOOK_H - 60 && my < by + BOOK_H - 24)
        page = (page - 1 + pages.length) % pages.length;

      if (mx > bx + BOOK_W - 240 && mx < bx + BOOK_W - 140 && my > by + BOOK_H - 60 && my < by + BOOK_H - 24)
        page = (page + 1) % pages.length;

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
