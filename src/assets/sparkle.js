
// Sparkly Cursor

let sparkles = [];
let sparkleChars = [".", " ݁", "₊", "⊹", ".", " ݁", "˖", ".", " ݁", "⋆", "˚", "｡", "⋆", "˚", "✧", "˖", "°"];
let oldMouse;
let newMouse;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  oldMouse = createVector(0, 0);
  textSize(30);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  clear();
  currentMouse = createVector(mouseX, mouseY);
  if (currentMouse.equals(oldMouse)) {
    sparkles.shift();

  } else {
    let randomChar = floor(random(0, sparkleChars.length));
    let sparkleChar = sparkleChars[randomChar];
    sparkles.push(new Sparkle(oldMouse.x, oldMouse.y, sparkleChar));
  }

  if (sparkles.length >= 5) {
    sparkles.shift();
  }
  for (let everyone of sparkles) {
    everyone.display();
    everyone.shimmer();
  }
  oldMouse = createVector(currentMouse.x, currentMouse.y);
}

class Sparkle {
  constructor(x, y, sparkleChar) {
    this.x = x;
    this.y = y;
    this.opacity = 255;
    noStroke();
    this.randX = random(-10, 10);
    this.randY = random(-10, 10);
    this.sparkleChar = sparkleChar;

  }
  display() {
    fill(194, 135, 245, this.opacity);
    text(this.sparkleChar, this.x + this.randX, this.y + this.randY);
  }
  shimmer() {
    this.opacity = 255 * floor(random(0, 2));
  }
}