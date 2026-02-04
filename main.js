// ------------------------------------------------------------
// main.js = MASTER CONTROLLER for the egg game
// ------------------------------------------------------------
// This file controls which screen shows and tracks the egg's stats

// ------------------------------
// CURRENT SCREEN (which page we're on)
// ------------------------------
let currentScreen = "start"; // can be: "start" | "instr" | "game" | "win" | "lose"

// ------------------------------
// EGG STATS (these track throughout the game)
// ------------------------------
// These numbers represent how well you're caring for your egg
// They start at 50 (middle values) and change based on your choices
let eggStats = {
  happiness: 50, // How happy your egg is (0-100)
  health: 50, // How healthy your egg is (0-100)
  wisdom: 50, // How wise your egg is becoming (0-100)
};

// ------------------------------
// GAME PROGRESS
// ------------------------------
// This tracks how many decisions the player has made
// The egg hatches after a certain number of choices
let decisionCount = 0;
const DECISIONS_TO_HATCH = 5; // Egg hatches after 5 decisions

// ------------------------------
// setup() - RUNS ONCE when game starts
// ------------------------------
function setup() {
  createCanvas(800, 800);
  textFont("sans-serif");
}

// ------------------------------
// draw() - RUNS EVERY FRAME (many times per second)
// ------------------------------
// This decides which screen to show based on currentScreen
function draw() {
  // Call the correct drawing function for each screen
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

// ------------------------------
// mousePressed() - RUNS when you click the mouse
// ------------------------------
function mousePressed() {
  // Send the click to the correct screen's handler
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "game") gameMousePressed();
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

// ------------------------------
// keyPressed() - RUNS when you press a key
// ------------------------------
function keyPressed() {
  // Send the keypress to the correct screen's handler
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "game") gameKeyPressed?.();
  else if (currentScreen === "win") winKeyPressed?.();
  else if (currentScreen === "lose") loseKeyPressed?.();
}

// ------------------------------
// HELPER: Check if mouse is over a rectangle
// ------------------------------
// This function checks if the mouse cursor is inside a button
// We use it to detect when buttons are hovered or clicked
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 && // mouse is right of left edge
    mouseX < x + w / 2 && // mouse is left of right edge
    mouseY > y - h / 2 && // mouse is below top edge
    mouseY < y + h / 2 // mouse is above bottom edge
  );
}

// ------------------------------
// HELPER: Reset the game
// ------------------------------
// This function resets all stats and progress so you can play again
function resetGame() {
  eggStats.happiness = 50;
  eggStats.health = 50;
  eggStats.wisdom = 50;
  decisionCount = 0;
}

// ------------------------------
// HELPER: Check if egg died
// ------------------------------
// Returns true if any stat dropped too low
function checkEggDeath() {
  return eggStats.happiness <= 0 || eggStats.health <= 0;
}
