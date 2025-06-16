const canvas = document.getElementById("spark-canvas");
const ctx = canvas.getContext("2d");
let sparks = [];

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.getElementById("spark-wrapper").addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const now = performance.now();
  const sparkCount = 8;
  const sparkRadius = 15;
  const sparkSize = 10;

  for (let i = 0; i < sparkCount; i++) {
    const angle = (2 * Math.PI * i) / sparkCount;
    sparks.push({
      x,
      y,
      angle,
      startTime: now,
      duration: 400
    });
  }
});

function easeOut(t) {
  return t * (2 - t);
}

function draw(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparks = sparks.filter((spark) => {
    const elapsed = timestamp - spark.startTime;
    if (elapsed > spark.duration) return false;

    const progress = easeOut(elapsed / spark.duration);
    const distance = progress * 15;
    const size = 10 * (1 - progress);

    const x1 = spark.x + distance * Math.cos(spark.angle);
    const y1 = spark.y + distance * Math.sin(spark.angle);
    const x2 = x1 + size * Math.cos(spark.angle);
    const y2 = y1 + size * Math.sin(spark.angle);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    return true;
  });

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);