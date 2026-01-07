// ...existing code...
(function () {
  function startSparkle() {
    // remove previous instance if present
    if (window.sparkleP5) {
      try { window.sparkleP5.remove(); } catch (e) {}
      window.sparkleP5 = null;
    }

    // ensure container exists and won't block clicks
    let container = document.getElementById('sparkle-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'sparkle-container';
      container.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:9999;';
      document.body.appendChild(container);
    }

    window.sparkleP5 = new p5(function (p) {
      let sparkles = [];
      const sparkleChars = [".", " ݁", "₊", "⊹", ".", " ݁", "˖", ".", " ݁", "⋆", "˚", "｡", "⋆", "˚", "✧", "˖", "°"];
      let oldMouse;

      p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(container);
        p.frameRate(10);
        oldMouse = p.createVector(0, 0);
        p.textSize(30);
      };

      p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.draw = function () {
        p.clear();
        const currentMouse = p.createVector(p.mouseX, p.mouseY);

        if (currentMouse.equals(oldMouse)) {
          sparkles.shift();
        } else {
          const randomChar = p.floor(p.random(0, sparkleChars.length));
          const sparkleChar = sparkleChars[randomChar];
          sparkles.push(new Sparkle(oldMouse.x, oldMouse.y, sparkleChar));
        }

        if (sparkles.length >= 5) sparkles.shift();

        for (const s of sparkles) {
          s.display();
          s.shimmer();
        }

        oldMouse = p.createVector(currentMouse.x, currentMouse.y);
      };

      function Sparkle(x, y, sparkleChar) {
        this.x = x;
        this.y = y;
        this.opacity = 255;
        this.randX = p.random(-10, 10);
        this.randY = p.random(-10, 10);
        this.sparkleChar = sparkleChar;

        this.display = function () {
          p.noStroke();
          p.fill(194, 135, 245, this.opacity);
          p.text(this.sparkleChar, this.x + this.randX, this.y + this.randY);
        };

        this.shimmer = function () {
          this.opacity = 255 * p.floor(p.random(0, 2));
        };
      }
    });
  }

  // init on full load and on common partial-nav events
  document.addEventListener('DOMContentLoaded', startSparkle);
  ['turbolinks:load', 'pjax:end', 'swup:contentReplaced', 'barba:afterEnter'].forEach(ev =>
    document.addEventListener(ev, startSparkle)
  );
  window.addEventListener('popstate', startSparkle);
})();