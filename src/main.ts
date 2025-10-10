import "./style.css";

let counter: number = 0.0;

const playerInc: number = 1.0;
let autoInc: number = 0.0;
let cost: number = 10.0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>CMPM 121 D1 Assignment</h1>
  <p>Counter: <span id="counter">0.0</span></p>
  <p>Upgrade Count: <span id="upgradeCount">0</span></p>
  <button id="playerinc">🎷</button>
  <button id="autoinc">Upgrade: <span id="cost">10.0</span></button>
`;

// Add click handler
const button = document.getElementById("playerinc")!;
const counterElement = document.getElementById("counter")!;
const upgradeCountElem = document.getElementById("upgradeCount")!;

// Add autoInc buy
const autoIncBuy = document.getElementById("autoinc")!;

button.addEventListener("click", () => {
  counter += playerInc;
  counterElement.innerHTML = counter.toFixed(4);
});

autoIncBuy.addEventListener("click", () => {
  // upgrade AutoInc
  if (counter < cost) {
    return;
  }

  counter -= cost;
  autoInc += 1;
  cost *= 1.1;
  counterElement.innerHTML = counter.toFixed(4);
  autoIncBuy.innerHTML = "Upgrade: " + cost.toFixed(1);
  upgradeCountElem.innerHTML = (autoInc * 10).toString();
});

let lastTime = performance.now();

function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  counter += autoInc * deltaTime;
  counterElement.innerHTML = counter.toFixed(4);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
