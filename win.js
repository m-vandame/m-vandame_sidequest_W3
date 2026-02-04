// ------------------------------------------------------------
// win.js = WIN SCREEN (egg hatched successfully!)
// ------------------------------------------------------------

function drawWin() {
  // Celebratory gradient background
  background(255, 250, 220);

  // ---- Celebration message ----
  fill(100, 180, 100);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("🎉 Your Egg Hatched! 🎉", width / 2, 150);

  // ---- Draw the hatched creature ----
  drawHatchedCreature();

  // ---- Show final stats ----
  textSize(24);
  fill(80);
  text("Final Stats:", width / 2, 450);

  textSize(20);
  const statY = 490;
  const spacing = 35;

  fill(255, 150, 50);
  text("Happiness: " + Math.round(eggStats.happiness), width / 2, statY);

  fill(50, 200, 100);
  text("Health: " + Math.round(eggStats.health), width / 2, statY + spacing);

  fill(100, 150, 255);
  text(
    "Wisdom: " + Math.round(eggStats.wisdom),
    width / 2,
    statY + spacing * 2,
  );

  // ---- Flavor text based on highest stat ----
  let message = "";
  if (
    eggStats.wisdom > eggStats.happiness &&
    eggStats.wisdom > eggStats.health
  ) {
    message = "A wise and thoughtful creature emerged!";
  } else if (
    eggStats.health > eggStats.happiness &&
    eggStats.health > eggStats.wisdom
  ) {
    message = "A strong and healthy creature emerged!";
  } else {
    message = "A joyful and happy creature emerged!";
  }

  fill(100);
  textSize(18);
  text(message, width / 2, 630);

  // ---- Return instruction ----
  textSize(20);
  fill(120);
  text("Click anywhere or press R to play again", width / 2, 700);
}

// ------------------------------
// DRAW HATCHED CREATURE
// ------------------------------
function drawHatchedCreature() {
  push();
  translate(width / 2, 300);

  // The creature's appearance is based on stats
  // Higher stats = bigger features

  // Body
  fill(255, 220, 180);
  stroke(200, 180, 150);
  strokeWeight(3);
  ellipse(0, 0, 160, 180);

  // Eyes (size based on wisdom)
  const eyeSize = map(eggStats.wisdom, 0, 100, 10, 20);
  fill(50);
  noStroke();
  ellipse(-25, -20, eyeSize, eyeSize + 5);
  ellipse(25, -20, eyeSize, eyeSize + 5);

  // Smile (width based on happiness)
  const smileWidth = map(eggStats.happiness, 0, 100, 30, 60);
  noFill();
  stroke(100, 80, 60);
  strokeWeight(3);
  arc(0, 10, smileWidth, 40, 0, PI);

  // Wings (size based on health)
  const wingSize = map(eggStats.health, 0, 100, 30, 60);
  fill(220, 200, 255, 150);
  stroke(180, 160, 200);
  strokeWeight(2);
  ellipse(-80, 0, wingSize, wingSize * 1.5);
  ellipse(80, 0, wingSize, wingSize * 1.5);

  // Crest on top
  fill(255, 180, 100);
  noStroke();
  triangle(-10, -90, 0, -110, 10, -90);

  pop();
}

function winMousePressed() {
  currentScreen = "start";
}

function winKeyPressed() {
  if (key === "r" || key === "R") {
    currentScreen = "start";
  }
}
