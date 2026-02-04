// ------------------------------------------------------------
// instructions.js = INSTRUCTIONS SCREEN
// ------------------------------------------------------------
// Explains how to play the game

function drawInstr() {
  background(250, 245, 255);

  // ---- Title ----
  fill(0);
  textAlign(CENTER, TOP);
  textSize(40);
  text("How to Play", width / 2, 60);

  // ---- Instructions text ----
  textSize(20);
  textAlign(LEFT, TOP);
  fill(60);

  const x = 100;
  let y = 140;
  const lineHeight = 35;

  text("🎯 GOAL:", x, y);
  y += lineHeight;
  text(
    "   Keep your egg alive for " +
      DECISIONS_TO_HATCH +
      " decisions until it hatches!",
    x,
    y,
  );

  y += lineHeight * 1.5;
  text("📊 STATS TO WATCH:", x, y);
  y += lineHeight;
  text("   • Happiness - Keep your egg content and joyful", x, y);
  y += lineHeight;
  text("   • Health - Protect from harm and feed well", x, y);
  y += lineHeight;
  text("   • Wisdom - Help your egg learn and grow", x, y);

  y += lineHeight * 1.5;
  text("⚠️ WARNING:", x, y);
  y += lineHeight;
  text("   If Happiness or Health reach 0, your egg dies!", x, y);

  y += lineHeight * 1.5;
  text("✨ Each choice affects your egg's stats differently.", x, y);

  // ---- Back button ----
  const backBtn = {
    x: width / 2,
    y: 650,
    w: 220,
    h: 70,
    label: "BACK",
  };

  drawInstrButton(backBtn);
  cursor(isHover(backBtn) ? HAND : ARROW);
}

function instrMousePressed() {
  const backBtn = { x: width / 2, y: 650, w: 220, h: 70 };
  if (isHover(backBtn)) {
    currentScreen = "start";
  }
}

function instrKeyPressed() {
  if (keyCode === ESCAPE || key === "b" || key === "B") {
    currentScreen = "start";
  }
}

// ---- HELPER: Draw instruction screen button ----
function drawInstrButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(220, 200, 255, 220) : color(240, 230, 255, 200));
  rect(x, y, w, h, 12);

  fill(0);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
