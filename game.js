// ------------------------------------------------------------
// game.js = MAIN GAMEPLAY SCREEN
// ------------------------------------------------------------
// This is where players make decisions to care for their egg

// ------------------------------
// SCENARIOS (the situations/choices)
// ------------------------------
// Each scenario has:
// - text: the situation description
// - choices: array of 2-3 options, each with:
//   - label: button text
//   - effects: how it changes stats {happiness, health, wisdom}

const scenarios = [
  {
    text: "Your egg is chilly! What do you do?",
    choices: [
      {
        label: "Wrap it in a cozy blanket",
        effects: { happiness: 10, health: 5, wisdom: 0 },
      },
      {
        label: "Place it near a fireplace",
        effects: { happiness: 5, health: -5, wisdom: 5 },
      },
      {
        label: "Ignore it, eggs don't feel cold",
        effects: { happiness: -15, health: -10, wisdom: 0 },
      },
    ],
  },
  {
    text: "A strange bird is pecking near your egg!",
    choices: [
      {
        label: "Shoo it away gently",
        effects: { happiness: 5, health: 10, wisdom: 5 },
      },
      {
        label: "Attack the bird aggressively",
        effects: { happiness: -5, health: 10, wisdom: -10 },
      },
      {
        label: "Observe what happens",
        effects: { happiness: -10, health: -15, wisdom: 10 },
      },
    ],
  },
  {
    text: "Your egg is making soft chirping sounds!",
    choices: [
      {
        label: "Sing a lullaby to it",
        effects: { happiness: 15, health: 0, wisdom: 5 },
      },
      {
        label: "Read it a storybook",
        effects: { happiness: 10, health: 0, wisdom: 15 },
      },
      {
        label: "Tell it to be quiet",
        effects: { happiness: -20, health: 0, wisdom: -5 },
      },
    ],
  },
  {
    text: "It's feeding time! What do you feed your egg?",
    choices: [
      {
        label: "Fresh spring water",
        effects: { happiness: 5, health: 15, wisdom: 5 },
      },
      {
        label: "Sweet nectar",
        effects: { happiness: 15, health: -5, wisdom: 0 },
      },
      {
        label: "Ancient wisdom scrolls (to absorb)",
        effects: { happiness: 0, health: 5, wisdom: 20 },
      },
    ],
  },
  {
    text: "Your egg wants to roll down a hill!",
    choices: [
      {
        label: "Let it roll - it looks fun!",
        effects: { happiness: 20, health: -10, wisdom: -5 },
      },
      {
        label: "Hold it steady and safe",
        effects: { happiness: -5, health: 15, wisdom: 10 },
      },
      {
        label: "Roll with it down the hill",
        effects: { happiness: 15, health: -5, wisdom: 5 },
      },
    ],
  },
  {
    text: "A wise old turtle offers to teach your egg!",
    choices: [
      {
        label: "Accept the wisdom lessons",
        effects: { happiness: 5, health: 0, wisdom: 20 },
      },
      {
        label: "Politely decline",
        effects: { happiness: 0, health: 5, wisdom: -5 },
      },
      {
        label: "Ask for health tips instead",
        effects: { happiness: 0, health: 15, wisdom: 5 },
      },
    ],
  },
  {
    text: "The sun is very bright today!",
    choices: [
      {
        label: "Give your egg sunglasses",
        effects: { happiness: 15, health: 5, wisdom: 0 },
      },
      {
        label: "Keep it in the shade",
        effects: { happiness: -5, health: 10, wisdom: 5 },
      },
      {
        label: "Let it enjoy the sunshine",
        effects: { happiness: 10, health: -5, wisdom: 10 },
      },
    ],
  },
];

// Current scenario index
let currentScenarioIndex = 0;

// ------------------------------
// MAIN DRAW FUNCTION
// ------------------------------
function drawGame() {
  background(255, 248, 235);

  // ---- Draw the egg ----
  drawEgg();

  // ---- Draw stat bars ----
  drawStatBars();

  // ---- Progress counter ----
  fill(100);
  textSize(18);
  textAlign(CENTER);
  text(
    "Decision " + (decisionCount + 1) + " of " + DECISIONS_TO_HATCH,
    width / 2,
    40,
  );

  // ---- Scenario text ----
  fill(60);
  textSize(24);
  textAlign(CENTER);
  const scenario = scenarios[currentScenarioIndex];
  text(scenario.text, width / 2, 520, 700, 100);

  // ---- Choice buttons ----
  const buttonY = 630;
  const buttonSpacing = 260;
  const startX =
    width / 2 - ((scenario.choices.length - 1) * buttonSpacing) / 2;

  for (let i = 0; i < scenario.choices.length; i++) {
    const btn = {
      x: startX + i * buttonSpacing,
      y: buttonY,
      w: 240,
      h: 100,
      label: scenario.choices[i].label,
      index: i,
    };
    drawChoiceButton(btn);
  }

  // ---- Cursor ----
  let hovering = false;
  for (let i = 0; i < scenario.choices.length; i++) {
    const btn = {
      x: startX + i * buttonSpacing,
      y: buttonY,
      w: 240,
      h: 100,
    };
    if (isHover(btn)) hovering = true;
  }
  cursor(hovering ? HAND : ARROW);
}

// ------------------------------
// DRAW THE EGG (visual representation)
// ------------------------------
function drawEgg() {
  push();
  translate(width / 2, 280);

  // Egg shadow
  noStroke();
  fill(0, 0, 0, 30);
  ellipse(0, 60, 120, 30);

  // Egg body (changes color based on health)
  const healthColor = map(eggStats.health, 0, 100, 150, 255);
  fill(healthColor, 240, 220);
  stroke(200, 180, 160);
  strokeWeight(3);

  // Egg shape
  ellipse(0, 0, 140, 180);

  // Happy face if happiness > 50
  if (eggStats.happiness > 50) {
    fill(80);
    noStroke();
    // Eyes
    ellipse(-20, -10, 8, 12);
    ellipse(20, -10, 8, 12);
    // Smile
    noFill();
    stroke(80);
    strokeWeight(2);
    arc(0, 10, 40, 30, 0, PI);
  } else if (eggStats.happiness > 20) {
    // Neutral face
    fill(80);
    noStroke();
    ellipse(-20, -10, 8, 12);
    ellipse(20, -10, 8, 12);
    stroke(80);
    strokeWeight(2);
    line(-15, 15, 15, 15);
  } else {
    // Sad face
    fill(80);
    noStroke();
    ellipse(-20, -10, 8, 12);
    ellipse(20, -10, 8, 12);
    noFill();
    stroke(80);
    strokeWeight(2);
    arc(0, 25, 40, 30, PI, TWO_PI);
  }

  pop();
}

// ------------------------------
// DRAW STAT BARS
// ------------------------------
function drawStatBars() {
  const barX = 100;
  const barY = 80;
  const barWidth = 200;
  const barHeight = 25;
  const spacing = 45;

  // Draw each stat bar
  drawSingleStatBar(
    "Happiness",
    eggStats.happiness,
    barX,
    barY,
    barWidth,
    barHeight,
    color(255, 200, 100),
  );
  drawSingleStatBar(
    "Health",
    eggStats.health,
    barX,
    barY + spacing,
    barWidth,
    barHeight,
    color(100, 255, 150),
  );
  drawSingleStatBar(
    "Wisdom",
    eggStats.wisdom,
    barX,
    barY + spacing * 2,
    barWidth,
    barHeight,
    color(150, 180, 255),
  );
}

function drawSingleStatBar(label, value, x, y, w, h, col) {
  // Label - positioned above the bar
  fill(60);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(label, x, y - 18);

  // Bar background (unfilled portion)
  noStroke();
  fill(220);
  rectMode(CORNER); // Use corner mode for accurate positioning
  rect(x, y, w, h, 5);

  // Bar fill (filled portion based on value)
  // Constrain value to 0-100 and map to bar width
  const safeValue = constrain(value, 0, 100);
  const fillWidth = (safeValue / 100) * w; // Direct percentage calculation

  // Change color to red if below threshold (for happiness and health only)
  let barColor = col;
  if (
    (label === "Happiness" || label === "Health") &&
    safeValue < CRITICAL_THRESHOLD
  ) {
    barColor = color(255, 100, 100); // Red warning color
  }

  fill(barColor);
  rect(x, y, fillWidth, h, 5);

  // Value text - positioned to the RIGHT of the bar to avoid overlap
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(14);

  // Add warning symbol if critical
  let displayText = Math.round(safeValue);
  if (
    (label === "Happiness" || label === "Health") &&
    safeValue < CRITICAL_THRESHOLD
  ) {
    displayText += " ⚠️";
    fill(255, 100, 100); // Red text for warning
  }

  text(displayText, x + w + 10, y + h / 2);
}

// ------------------------------
// DRAW CHOICE BUTTON
// ------------------------------
function drawChoiceButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(200, 220, 255) : color(230, 240, 255));

  if (hover) {
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(180, 200, 255);
  }

  rect(x, y, w, h, 10);
  drawingContext.shadowBlur = 0;

  // Text
  fill(40, 60, 100);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x, y, w - 20, h - 20);
}

// ------------------------------
// MOUSE INPUT
// ------------------------------
function gameMousePressed() {
  const scenario = scenarios[currentScenarioIndex];
  const buttonY = 630;
  const buttonSpacing = 260;
  const startX =
    width / 2 - ((scenario.choices.length - 1) * buttonSpacing) / 2;

  // Check which choice was clicked
  for (let i = 0; i < scenario.choices.length; i++) {
    const btn = {
      x: startX + i * buttonSpacing,
      y: buttonY,
      w: 240,
      h: 100,
    };

    if (isHover(btn)) {
      makeChoice(i);
      return;
    }
  }
}

// ------------------------------
// MAKE A CHOICE (apply effects)
// ------------------------------
function makeChoice(choiceIndex) {
  const scenario = scenarios[currentScenarioIndex];
  const choice = scenario.choices[choiceIndex];

  // Apply stat changes
  eggStats.happiness += choice.effects.happiness;
  eggStats.health += choice.effects.health;
  eggStats.wisdom += choice.effects.wisdom;

  // Keep stats in valid range (0-100)
  eggStats.happiness = constrain(eggStats.happiness, 0, 100);
  eggStats.health = constrain(eggStats.health, 0, 100);
  eggStats.wisdom = constrain(eggStats.wisdom, 0, 100);

  // Check if egg died
  if (checkEggDeath()) {
    currentScreen = "lose";
    return;
  }

  // Increment decision count
  decisionCount++;

  // Check if egg hatched
  if (decisionCount >= DECISIONS_TO_HATCH) {
    currentScreen = "win";
    return;
  }

  // Move to next random scenario
  currentScenarioIndex = floor(random(scenarios.length));
}
