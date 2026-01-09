useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 520;
  }
  resize();
  window.addEventListener("resize", resize);

  let page = 0;
  const pages = 5;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background (transparent / unchanged site bg)
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // CENTER NOTEBOOK
    const bookW = 780;
    const bookH = 440;
    const x = (canvas.width - bookW) / 2;
    const y = (canvas.height - bookH) / 2;

    drawShadow(x, y, bookW, bookH);
    drawBook(x, y, bookW, bookH);
    drawPageContent(x, y, page);
    drawButtons(x, y, bookW, bookH);
  }

  function drawShadow(x, y, w, h) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "#e9d8b4";
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  function drawBook(x, y, w, h) {
    ctx.fillStyle = "#ecd9b0";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "#8a6a3f";
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 10, y + 10, w - 20, h - 20);

    // binding
    ctx.strokeStyle = "#6b4f2b";
    for (let i = 0; i < h - 80; i += 24) {
      ctx.beginPath();
      ctx.moveTo(x + 48, y + 40 + i);
      ctx.lineTo(x + 48, y + 52 + i);
      ctx.stroke();
    }
  }

  function drawPageContent(x, y, p) {
    ctx.fillStyle = "#5a3c1d";
    ctx.font = "28px Georgia";
    ctx.textAlign = "center";

    if (p === 0) {
      ctx.fillText("ARTIFICER NOTEBOOK", x + 390, y + 120);
      ctx.font = "18px Georgia";
      ctx.fillText("Arcane Creations & Concepts", x + 390, y + 160);
    }

    if (p === 1) {
      ctx.fillText("Mana Circuit Diagram", x + 390, y + 120);
    }

    if (p === 2) {
      ctx.fillText("Spell Logic Gates", x + 390, y + 120);
    }

    if (p === 3) {
      ctx.fillText("Automaton Core", x + 390, y + 120);
    }

    if (p === 4) {
      ctx.fillStyle = "#8b2c2c";
      ctx.fillText("FAILED EXPERIMENT", x + 390, y + 160);
    }
  }

  function drawButtons(x, y, w, h) {
    drawBtn(x + 60, y + h - 56, "◀ Prev", () => page = (page - 1 + pages) % pages);
    drawBtn(x + w - 140, y + h - 56, "Next ▶", () => page = (page + 1) % pages);
  }

  function drawBtn(x, y, label, action) {
    ctx.fillStyle = "#c9a86a";
    ctx.fillRect(x, y, 90, 34);
    ctx.strokeStyle = "#7b5a2f";
    ctx.strokeRect(x, y, 90, 34);

    ctx.fillStyle = "#3b2a14";
    ctx.font = "14px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 45, y + 17);

    canvas.onclick = e => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      if (mx > x && mx < x + 90 && my > y && my < y + 34) action();
    };
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();

  return () => window.removeEventListener("resize", resize);
}, []);
