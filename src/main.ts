import "./style.css";

let counter: number = 0.0;

const playerInc: number = 1.0;
//let autoInc: number = 0.0;
//let cost: number = 10.0;

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
//const upgradeCountElem = document.getElementById("upgradeCount")!;

// Add autoInc buy
//const autoIncBuy = document.getElementById("autoinc")!;

button.addEventListener("click", () => {
  counter += playerInc;
  counterElement.innerHTML = counter.toFixed(4);
});

