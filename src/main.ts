import "./style.css";

// idea from InvinciblePyro
const audioElement = new Audio("./src/groovy-vibe-427121.mp3");

let counter: number = 0.0;
let linesPerSecond: number = 0.0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  numberOf: number;
  description: string;
}

const upgrades: Item[] = [
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
  {
    name: "Programmer Prodigy",
    cost: 10000,
    rate: 350,
    numberOf: 0,
    description: "Every company has one",
  },
  {
    name: "Coding Jesus",
    cost: 100000,
    rate: 800,
    numberOf: 0,
    description: "Did I stutter?",
  },
];

// Create basic HTML structure

document.body.style.backgroundImage =
  "url('https://i.pinimg.com/originals/c5/9a/d2/c59ad2bd4ad2fbacd04017debc679ddb.gif')";
document.body.style.backgroundSize = "cover"; // make it cover the entire screen
document.body.style.backgroundPosition = "center"; // center the image
document.body.style.backgroundRepeat = "no-repeat"; // prevent tiling

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
        <h1 style="margin: 10;">Crack The Code</h1>
        <p style="margin: 4px 20;">Lines of Code: <span id="counter">0.0</span></p>
        <p style="margin: 4px 0;"><span id="linesPerSecondrease">0.0</span> lines of code per second</p>
      </div>
      
      <button class="clickButton mainButton" id="codeClickButton">
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
const button = document.getElementById("codeClickButton")!;
const counterDisplay = document.getElementById("counter")!;
const linesPerSecondreaseElem = document.getElementById("linesPerSecondrease")!;

button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = counter.toFixed(4);
});

const upgradeContainer = document.getElementById("upgradeButtons")!;

// Create Buttons
upgrades.forEach((item, index) => {
  const btn = document.createElement("button");
  btn.textContent = `${item.name} - Cost: ${
    item.cost.toFixed(1)
  } (Owned: ${item.numberOf})`;
  btn.className = "clickButton mainButton";
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

upgrades.forEach((item) => {
  const desc = document.createElement("p");
  desc.textContent = item.description + " - " + item.rate.toFixed(1) +
    " LoC/sec";
  desc.style.margin = "8px"; // remove default spacing
  descContainer.appendChild(desc);
});

// Purchase an upgrade by index
// - Deducts item cost from counter
// - Increases auto-increment rate by item.rate
// - Applies 15% cost increase (balance mechanism)
function buyUpgrade(index: number) {
  const item = upgrades[index];
  if (counter >= item.cost) {
    linesPerSecond += item.rate;
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
  upgrades.forEach((item, i) => {
    buttons[i].textContent = `${item.name} - Cost: ${
      item.cost.toFixed(1)
    } (Owned: ${item.numberOf})`;
  });

  linesPerSecondreaseElem.innerHTML = linesPerSecond.toFixed(1);
}

audioElement.currentTime = 0;
audioElement.loop = true;

function startMusicOnce() {
  audioElement.play();
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

// update counter dynamically
let lastTime = performance.now();

function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  counter += linesPerSecond * deltaTime;
  counterDisplay.innerHTML = counter.toFixed(4);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
