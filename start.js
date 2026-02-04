// ------------------------------------------------------------
// start.js = START/MENU SCREEN
// ------------------------------------------------------------
// This is the first screen players see

function drawStart() {
  // Soft pastel background
  background(255, 250, 240);

  // ---- Title ----
  fill(100, 80, 120);
  textSize(52);
  textAlign(CENTER, CENTER);
  text("🥚 Egg Guardian 🥚", width / 2, 150);

  // ---- Subtitle ----
  textSize(22);
  fill(120, 100, 140);
  text("Keep your egg safe until it hatches!", width / 2, 210);

  // ---- Buttons ----
  const startBtn = {
    x: width / 2,
    y: 350,
    w: 240,
    h: 80,
    label: "START GAME",
  };

  const instrBtn = {
    x: width / 2,
    y: 460,
    w: 240,
    h: 80,
    label: "INSTRUCTIONS",
  };

  // Draw both buttons
  drawButton(startBtn);
  drawButton(instrBtn);

  // Change cursor when hovering
  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

function startMousePressed() {
  const startBtn = { x: width / 2, y: 350, w: 240, h: 80 };
  const instrBtn = { x: width / 2, y: 460, w: 240, h: 80 };

  if (isHover(startBtn)) {
    resetGame(); // Reset stats when starting new game
    currentScreen = "game";
  } else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

function startKeyPressed() {
  if (keyCode === ENTER) {
    resetGame();
    currentScreen = "game";
  }
  if (key === "i" || key === "I") {
    currentScreen = "instr";
  }
}

// ---- HELPER: Draw a button ----
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();

  // Button color changes on hover
  if (hover) {
    fill(255, 220, 180, 230);
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(255, 200, 150);
  } else {
    fill(255, 240, 220, 210);
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = color(200, 200, 200);
  }

  rect(x, y, w, h, 14);
  drawingContext.shadowBlur = 0;

  // Button text
  fill(80, 60, 100);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
