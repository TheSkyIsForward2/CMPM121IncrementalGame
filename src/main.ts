import "./style.css";

let counter: number = 0.0;

const playerInc: number = 1.0;
let autoInc: number = 0.0;
let cost: number = 10.0;
let cost2: number = 100.0;
let cost3: number = 1000.0;

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
        grid-template-columns: 1fr 2fr 1fr; /* three columns: left, middle, right */
        align-items: start;
        width: 100%;
        gap: 20px;
        margin-top: 20px;
      ">
        <!-- Left: Upgrade buttons -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        ">
          <button id="autoinc" style="
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background-color: #fff;
            cursor: pointer;
          ">
            Buy Entry-level programmer: <span id="cost">10.0</span>
          </button>

          <button id="autoinc2" style="
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background-color: #fff;
            cursor: pointer;
          ">
            Buy Server Farm: <span id="cost2">100.0</span>
          </button>

          <button id="autoinc3" style="
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background-color: #fff;
            cursor: pointer;
          ">
            Buy Senior Software Engineer <span id="cost3">1000.0</span>
          </button>
        </div>

        <!-- Middle: Description -->
        <div id="desc" style="
          text-align: center;
        ">
          <h3 style="margin: 0 0 8px 0;">Description</h3>
          <p style="margin: 0;">Select an upgrade to see its effects here.</p>
        </div>

        <!-- Right: Number of upgrades -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background-color: rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 10px;
        ">
          <h3 style="margin: 0 0 8px 0;">Upgrades</h3>
          <p style="margin: 0;">Owned: <span id="upgradeCount">0</span></p>
        </div>
      </div>
    </div>
  </div>
`;

// Add click handler
const button = document.getElementById("playerinc")!;
const counterElement = document.getElementById("counter")!;
const upgradeCountElem = document.getElementById("upgradeCount")!;
const autoIncreaseElem = document.getElementById("autoIncrease")!;

// Add autoInc buys
const autoIncBuy1 = document.getElementById("autoinc")!;
const autoIncBuy2 = document.getElementById("autoinc2")!;
const autoIncBuy3 = document.getElementById("autoinc3")!;

button.addEventListener("click", () => {
  counter += playerInc;
  counterElement.innerHTML = counter.toFixed(4);
});

autoIncBuy1.addEventListener("click", () => {
  // upgrade AutoInc
  if (counter < cost) {
    return;
  }

  counter -= cost;
  autoInc += 0.1;
  cost *= 1.15;
  counterElement.innerHTML = counter.toFixed(4);
  autoIncBuy1.innerHTML = "Buy Entry-level programmer: " + cost.toFixed(1);
  upgradeCountElem.innerHTML = (autoInc * 10).toFixed(1);
  autoIncreaseElem.innerHTML = autoInc.toFixed(1);
});

autoIncBuy2.addEventListener("click", () => {
  // upgrade AutoInc
  if (counter < cost2) {
    return;
  }

  counter -= cost2;
  autoInc += 1.0;
  cost2 *= 1.15;
  counterElement.innerHTML = counter.toFixed(4);
  autoIncBuy2.innerHTML = "Buy Server Farm: " + cost2.toFixed(1);
  upgradeCountElem.innerHTML = autoInc.toString();
  autoIncreaseElem.innerHTML = autoInc.toFixed(1);
});

autoIncBuy3.addEventListener("click", () => {
  // upgrade AutoInc
  if (counter < cost3) {
    return;
  }

  counter -= cost3;
  autoInc += 10.0;
  cost3 *= 1.15;
  counterElement.innerHTML = counter.toFixed(4);
  autoIncBuy3.innerHTML = "Buy Senior Software Engineer: " + cost3.toFixed(1);
  upgradeCountElem.innerHTML = (autoInc * 10).toString();
  autoIncreaseElem.innerHTML = autoInc.toFixed(1);
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
