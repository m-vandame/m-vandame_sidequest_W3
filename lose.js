// ------------------------------------------------------------
// lose.js = LOSE SCREEN (egg died)
// ------------------------------------------------------------

function drawLose() {
  // Somber background
  background(220, 210, 210);

  // ---- Loss message ----
  fill(150, 80, 80);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("💔 Your Egg Didn't Make It 💔", width / 2, 150);

  // ---- Draw cracked egg ----
  drawCrackedEgg();

  // ---- Show what went wrong ----
  textSize(24);
  fill(100);
  text("Final Stats:", width / 2, 450);

  textSize(20);
  const statY = 490;
  const spacing = 35;

  // Highlight the stat that failed
  if (eggStats.happiness <= 0) {
    fill(255, 100, 100);
    text(
      "Happiness: " + Math.round(eggStats.happiness) + " ⚠️",
      width / 2,
      statY,
    );
  } else {
    fill(255, 150, 50);
    text("Happiness: " + Math.round(eggStats.happiness), width / 2, statY);
  }

  if (eggStats.health <= 0) {
    fill(255, 100, 100);
    text(
      "Health: " + Math.round(eggStats.health) + " ⚠️",
      width / 2,
      statY + spacing,
    );
  } else {
    fill(50, 200, 100);
    text("Health: " + Math.round(eggStats.health), width / 2, statY + spacing);
  }

  fill(100, 150, 255);
  text(
    "Wisdom: " + Math.round(eggStats.wisdom),
    width / 2,
    statY + spacing * 2,
  );

  // ---- Advice message ----
  let advice = "";
  if (eggStats.happiness <= 0) {
    advice = "Your egg was too sad. Try making happier choices!";
  } else if (eggStats.health <= 0) {
    advice = "Your egg's health failed. Protect it better next time!";
  }

  fill(120, 80, 80);
  textSize(18);
  text(advice, width / 2, 630);

  // ---- Return instruction ----
  textSize(20);
  fill(120);
  text("Click anywhere or press R to try again", width / 2, 700);
}

// ------------------------------
// DRAW CRACKED EGG
// ------------------------------
function drawCrackedEgg() {
  push();
  translate(width / 2, 300);

  // Egg shadow
  noStroke();
  fill(0, 0, 0, 30);
  ellipse(0, 60, 120, 30);

  // Egg pieces (broken)
  fill(230, 220, 200);
  stroke(180, 170, 160);
  strokeWeight(3);

  // Bottom half
  arc(0, 20, 140, 160, 0, PI);

  // Top half pieces
  push();
  translate(-40, -20);
  rotate(-0.3);
  arc(0, 0, 80, 100, PI, TWO_PI);
  pop();

  push();
  translate(40, -20);
  rotate(0.3);
  arc(0, 0, 80, 100, PI, TWO_PI);
  pop();

  // Crack lines
  stroke(150, 140, 130);
  strokeWeight(2);
  line(-30, -10, -50, -40);
  line(30, -10, 50, -40);
  line(-20, 10, -35, 30);
  line(20, 10, 35, 30);

  pop();
}

function loseMousePressed() {
  currentScreen = "start";
}

function loseKeyPressed() {
  if (key === "r" || key === "R") {
    currentScreen = "start";
  }
}
