import "./style.css";

let counter: number = 0.0;
let autoInc: number = 0.0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  numberOf: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Entry-Level Programmers",
    cost: 10,
    rate: 0.1,
    numberOf: 0,
    description: "They're all you can afford",
  },
  {
    name: "Senior Software Engineers",
    cost: 100,
    rate: 2,
    numberOf: 0,
    description: "The backbone of any good operation",
  },
  {
    name: "Server Farms",
    cost: 1000,
    rate: 50,
    numberOf: 0,
    description: "For when humans aren't enough",
  },
];

// Create basic HTML structure

document.body.innerHTML = `
  <div style="
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  ">
    <div style="
      background: #508513ff;
      font-size: 20px;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px; /* space between elements */
      text-align: center;
    ">

     <!-- Grouped text block -->
      <div style="
        margin: 0;
        padding: 0;
      ">
        <h1 style="margin: 10;">CMPM 121 D1 Assignment</h1>
        <p style="margin: 4px 20;">Lines of Code: <span id="counter">0.0</span></p>
        <p style="margin: 4px 0;"><span id="autoIncrease">0.0</span> lines of code per second</p>
      </div>
      

      <!-- Larger button -->
      <button id="playerinc" style="
        font-size: 24px;
        padding: 15px 50px;
        border: none;
        border-radius: 10px;
        background-color: #c8d930ff;
        cursor: pointer;
      ">
        🖥
      </button>

      <!-- Bottom section: 3 columns -->
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        width: 100%;
        gap: 20px;
        margin-top: 20px;
      ">
         <!-- Left column: dynamic buttons -->
        <div id="upgradeButtons" style="
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 15px;
        "></div>

        <!-- Middle: Description (for later) -->
        <div id="upgradeDescriptions" style="
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 15px;
        "></div>

        <!-- Right: Number of upgrades -->
        <div id="upgradeCounts" style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;">
        </div>
      </div>
    </div>
  </div>
`;

// Add click handler
const button = document.getElementById("playerinc")!;
const counterDisplay = document.getElementById("counter")!;
const autoIncreaseElem = document.getElementById("autoIncrease")!;

button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = counter.toFixed(4);
});

const upgradeContainer = document.getElementById("upgradeButtons")!;

// Create Buttons
availableItems.forEach((item, index) => {
  const btn = document.createElement("button");
  btn.textContent = `${item.name} - Cost: ${
    item.cost.toFixed(1)
  } (Owned: ${item.numberOf})`;
  btn.style.cssText = `
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
  `;
  btn.addEventListener("click", () => buyUpgrade(index));
  upgradeContainer.appendChild(btn);
});

// Create Descriptions
const descContainer = document.getElementById("upgradeDescriptions")!;

availableItems.forEach((item) => {
  const desc = document.createElement("p");
  desc.textContent = item.description;
  desc.style.margin = "7px"; // remove default spacing
  descContainer.appendChild(desc);
});

// Purchase function
function buyUpgrade(index: number) {
  const item = availableItems[index];
  if (counter >= item.cost) {
    autoInc += item.rate;
    counter -= item.cost;
    item.numberOf++;
    item.cost *= 1.15; // increase cost by 15%
    updateDisplay();
  }
}

// Update all visible info
function updateDisplay() {
  counterDisplay.textContent = counter.toFixed(1);

  // Update buttons
  const buttons = upgradeContainer.querySelectorAll("button");
  availableItems.forEach((item, i) => {
    buttons[i].textContent = `${item.name} - Cost: ${
      item.cost.toFixed(1)
    } (Owned: ${item.numberOf})`;
  });

  autoIncreaseElem.innerHTML = autoInc.toFixed(1);
}

// update counter dynamically
let lastTime = performance.now();

function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  counter += autoInc * deltaTime;
  counterDisplay.innerHTML = counter.toFixed(4);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
