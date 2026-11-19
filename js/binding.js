// Draws the spiral-notebook binding: one metal coil per row down the left edge of the page.
// Each coil is a small SVG so it can have its own shading, shadow and entrance animation.

// Must match the height of .coil in css/style.css.
const COIL_HEIGHT_IN_PIXELS = 56;

// Coils far below the first screen are only seen after scrolling, so they all share the last delay.
const MAX_STAGGERED_COILS = 14;

const page = document.querySelector(".page");
const binding = document.querySelector(".binding");

// Builds the markup of one coil. The wire is drawn as three strokes (dark, mid, highlight)
// so it looks round, and a blurred copy underneath acts as its shadow on the paper.
function buildCoilMarkup(coilNumber) {
  const animationOrder = Math.min(coilNumber, MAX_STAGGERED_COILS);

  return `
    <svg class="coil" viewBox="0 0 44 56" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style="--i: ${animationOrder}">
      <path class="coil-shadow" d="M-2 18 Q 18 13 36 33" fill="none" stroke="#26324a" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="35" cy="28" rx="6.5" ry="5.5" fill="#e4dcc6"/>
      <ellipse cx="35" cy="28.5" rx="5" ry="4.2" fill="#3a3326"/>
      <path d="M-2 13 Q 18 8 33 27" fill="none" stroke="#6c7585" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M-2 12.2 Q 18 7 33 26" fill="none" stroke="#b4bcc9" stroke-width="4" stroke-linecap="round"/>
      <path d="M-2 11.2 Q 18 6 33 25.2" fill="none" stroke="#f8fafd" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;
}

// Adds or removes coils so the binding always fills the whole height of the page.
function updateCoils() {
  const neededCoils = Math.ceil(page.offsetHeight / COIL_HEIGHT_IN_PIXELS);
  let currentCoils = binding.children.length;

  while (currentCoils < neededCoils) {
    binding.insertAdjacentHTML("beforeend", buildCoilMarkup(currentCoils));
    currentCoils++;
  }

  while (currentCoils > neededCoils) {
    binding.lastElementChild.remove();
    currentCoils--;
  }

  // The plain CSS fallback drawing is only needed when this script does not run.
  binding.classList.add("has-coils");
}

if (page && binding) {
  updateCoils();

  // The page grows or shrinks when the window is resized, so the number of coils must follow.
  new ResizeObserver(updateCoils).observe(page);
}
