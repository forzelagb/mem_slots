// === КОНФИГУРАЦИЯ БИЗНЕСОВ ===

// === КОНФИГУРАЦИЯ МОНЕТ ===
const coinsConfig = {
    burmal: { name: "БурмалCOIN", basePrice: 100, volatility: 0.05, amount: 0, history: [], currentPrice: 100 },
    burmaldook: { name: "БурмалДук", basePrice: 500, volatility: 0.08, amount: 0, history: [], currentPrice: 500 },
    hecio: { name: "HeCION", basePrice: 50, volatility: 0.1, amount: 0, history: [], currentPrice: 50 },
    ciondic: { name: "CIONдиции", basePrice: 200, volatility: 0.06, amount: 0, history: [], currentPrice: 200 },
    analdoc: { name: "ANalDOCion", basePrice: 10, volatility: 0.15, amount: 0, history: [], currentPrice: 10 },
    tuncion: { name: "TunCION", basePrice: 1000, volatility: 0.04, amount: 0, history: [], currentPrice: 1000 }
};


// === ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
let gems = parseInt(localStorage.getItem('memeGems')) || 10000;
// === VIP УРОВНИ ===
let vipLevel = parseInt(localStorage.getItem('memeVIPLevel')) || 0;
let currentBet = parseInt(localStorage.getItem('memeBet')) || 250;
let currentSelectedCoin = 'burmal';
let marketInterval;
let chartInstance = null;
let autoSpinActive = false; // <-- ОБЪЯВЛЕНО ДО ИСПОЛЬЗОВАНИЯ
let autoSpinCount = 0;
let isSpinning = false;
let currentTheme = '';
const dailyRewardTable = [
    250, 300, 350, 400, 500,
    550, 650, 750, 850, 1000,
    1100, 1200, 1300, 1400, 1500,
    1600, 1700, 1800, 1900, 2000,
    2200, 2400, 2600, 2800, 3000,
    3200, 3500, 3800, 4200, 5000
];



// === ТЕМЫ ИГРЫ ===
const themes = {
    brain: [{src: "image/brain/1.jpg", mult: ""}, {src: "image/brain/2.jpg", mult: ""}, {src: "image/brain/3.jpg", mult: 2}, {src: "image/brain/4.jpg", mult: ""}, {src: "image/brain/5.jpg", mult: 3}, {src: "image/brain/6.jpg", mult: ""}, {src: "image/brain/7.jpg", mult: ""}, {src: "image/brain/8.jpg", mult: 5}],
    helin: [{src: "image/helin/1.jpg", mult: ""}, {src: "image/helin/2.jpg", mult: ""}, {src: "image/helin/3.jpg", mult: 2}, {src: "image/helin/4.jpg", mult: ""}, {src: "image/helin/5.jpg", mult: 3}, {src: "image/helin/6.jpg", mult: ""}, {src: "image/helin/7.jpg", mult: ""}, {src: "image/helin/8.jpg", mult: 5}],
    lexapaws: [{src: "image/lexapaws/1.jpg", mult: ""}, {src: "image/lexapaws/2.jpg", mult: ""}, {src: "image/lexapaws/3.jpg", mult: 2}, {src: "image/lexapaws/4.jpg", mult: ""}, {src: "image/lexapaws/5.jpg", mult: 3}, {src: "image/lexapaws/6.jpg", mult: ""}, {src: "image/lexapaws/7.jpg", mult: ""}, {src: "image/lexapaws/8.jpg", mult: 5}],
    litwin: [{src: "image/litwin/1.jpg", mult: ""}, {src: "image/litwin/2.jpg", mult: ""}, {src: "image/litwin/3.jpg", mult: 2}, {src: "image/litwin/4.jpg", mult: ""}, {src: "image/litwin/5.jpg", mult: 3}, {src: "image/litwin/6.jpg", mult: ""}, {src: "image/litwin/7.jpg", mult: ""}, {src: "image/litwin/8.jpg", mult: 5}],
    melstroy: [{src: "image/melstroy/1.jpg", mult: ""}, {src: "image/melstroy/2.jpg", mult: ""}, {src: "image/melstroy/3.jpg", mult: 2}, {src: "image/melstroy/4.jpg", mult: ""}, {src: "image/melstroy/5.jpg", mult: 3}, {src: "image/melstroy/6.jpg", mult: ""}, {src: "image/melstroy/7.jpg", mult: ""}, {src: "image/melstroy/8.jpg", mult: 5}],
    nikkifn: [{src: "image/nikkifn/1.jpg", mult: ""}, {src: "image/nikkifn/2.jpg", mult: ""}, {src: "image/nikkifn/3.jpg", mult: 2}, {src: "image/nikkifn/4.jpg", mult: ""}, {src: "image/nikkifn/5.jpg", mult: 3}, {src: "image/nikkifn/6.jpg", mult: ""}, {src: "image/nikkifn/7.jpg", mult: ""}, {src: "image/nikkifn/8.jpg", mult: 5}],
    rejiboi: [{src: "image/rejiboi/1.jpg", mult: ""}, {src: "image/rejiboi/2.jpg", mult: ""}, {src: "image/rejiboi/3.jpg", mult: 2}, {src: "image/rejiboi/4.jpg", mult: ""}, {src: "image/rejiboi/5.jpg", mult: 3}, {src: "image/rejiboi/6.jpg", mult: ""}, {src: "image/rejiboi/7.jpg", mult: ""}, {src: "image/rejiboi/8.jpg", mult: 5}],
    rostick: [{src: "image/rostick/1.jpg", mult:""}, {src: "image/rostick/2.jpg", mult: ""}, {src: "image/rostick/3.jpg", mult: 2}, {src: "image/rostick/4.jpg", mult: ""}, {src: "image/rostick/5.jpg", mult: 3}, {src: "image/rostick/6.jpg", mult: ""}, {src: "image/rostick/7.jpg", mult: ""}, {src: "image/rostick/8.jpg", mult: 5}],
    sasich: [{src: "image/sasich/1.jpg", mult: ""}, {src: "image/sasich/2.jpg", mult: ""}, {src: "image/sasich/3.jpg", mult: 2}, {src: "image/sasich/4.jpg", mult: ""}, {src: "image/sasich/5.jpg", mult: 3}, {src: "image/sasich/6.jpg", mult: ""}, {src: "image/sasich/7.jpg", mult: ""}, {src: "image/sasich/8.jpg", mult: 5}],
    skibiditoilet: [{src: "image/skibiditoilet/1.jpg", mult: ""}, {src: "image/skibiditoilet/2.jpg", mult: ""}, {src: "image/skibiditoilet/3.jpg", mult: 2}, {src: "image/skibiditoilet/4.jpg", mult: ""}, {src: "image/skibiditoilet/5.jpg", mult: 3}, {src: "image/skibiditoilet/6.jpg", mult: ""}, {src: "image/skibiditoilet/7.jpg", mult: ""}, {src: "image/skibiditoilet/8.jpg", mult: 5}],
    slovopatsana: [{src: "image/slovopatsana/1.jpg", mult: ""}, {src: "image/slovopatsana/2.jpg", mult: ""}, {src: "image/slovopatsana/3.jpg", mult: 2}, {src: "image/slovopatsana/4.jpg", mult: ""}, {src: "image/slovopatsana/5.jpg", mult: 3}, {src: "image/slovopatsana/6.jpg", mult: ""}, {src: "image/slovopatsana/7.jpg", mult: ""}, {src: "image/slovopatsana/8.jpg", mult: 5}],
    ronaldo: [
        {src: "image/ronaldo/1.jpg", mult: 8},
        {src: "image/ronaldo/2.jpg", mult: ""}, 
        {src: "image/ronaldo/3.jpg", mult: 3}, 
        {src: "image/ronaldo/4.jpg", mult: ""}, 
        {src: "image/ronaldo/5.jpg", mult: 10}, 
        {src: "image/ronaldo/6.jpg", mult: 5}, 
        {src: "image/ronaldo/7.jpg", mult: ""} // SIUUU JACKPOT!
    ],

shrek: [
    {src: "image/shrek/1.jpg", mult: ""},
    {src: "image/shrek/2.jpg", mult: 2},
    {src: "image/shrek/3.jpg", mult: 3},
    {src: "image/shrek/4.jpg", mult: 5},
    {src: "image/shrek/5.jpg", mult: 8},
    {src: "image/shrek/6.jpg", mult: ""},
    {src: "image/shrek/7.jpg", mult: 10}
],

spongebob: [
    {src: "image/spongebob/1.jpg", mult: ""},
    {src: "image/spongebob/2.jpg", mult: 2},
    {src: "image/spongebob/3.jpg", mult: 3},
    {src: "image/spongebob/4.jpg", mult: 5},
    {src: "image/spongebob/5.jpg", mult: 8},
    {src: "image/spongebob/6.jpg", mult: 10},
    {src: "image/spongebob/7.jpg", mult: ""}
],

speed: [
    {src: "image/speed/1.jpg", mult: ""},
    {src: "image/speed/2.jpg", mult: 2},
    {src: "image/speed/3.jpg", mult: 3},
    {src: "image/speed/4.jpg", mult: 5},
    {src: "image/speed/5.jpg", mult: 8},
    {src: "image/speed/6.jpg", mult: 10},
    {src: "image/speed/7.jpg", mult: ""}
]

};

const titles = { 
    brain: "🧠 BRAIN ROT", 
    helin: "🎤 HELIN", 
    lexapaws: "🐾 LEXA PAWS", 
    litwin: "🎮 LITWIN", 
    melstroy: "👑 MELLSTROY", 
    nikkifn: "🎯 NIKKIFN", 
    rejiboi: "🕺 REJIBOI", 
    rostick: "🌭 ROSTICK", 
    sasich: "🗣️ SASICH", 
    skibiditoilet: "🚽 SKIBIDI", 
    slovopatsana: "👊 SLOVO PATSANA",
    ronaldo: "🐐 RONALDO VIP",
    shrek: "🟢 SHREK VIP",
    spongebob: "🧽 SPONGEBOB VIP",
    speed: "⚡ SPEED VIP",
};

// === ЭЛЕМЕНТЫ DOM ===
const lobbyScreen = document.getElementById('lobby-screen');
const gameScreen = document.getElementById('game-screen');
const gridEl = document.getElementById('grid');
const resultText = document.getElementById('result-text');
const spinBtn = document.getElementById('spin-btn');
const autoBtn = document.getElementById('auto-btn');
const winModal = document.getElementById('win-modal');
const modalAmount = document.getElementById('modal-amount');
const slotTitle = document.getElementById('slot-title');
const currentCostEl = document.getElementById('current-cost');

// === СИСТЕМА СОХРАНЕНИЯ ===
function saveData() {
    localStorage.setItem('memeGems', gems);
    localStorage.setItem('memeBet', currentBet);
    localStorage.setItem('memeCoinsPro', JSON.stringify(coinsConfig));
}

function loadData() {
    const savedCoins = JSON.parse(localStorage.getItem('memeCoinsPro'));
    if (savedCoins) {
        for (let key in savedCoins) {
            if (coinsConfig[key]) {
                coinsConfig[key].amount = savedCoins[key].amount || 0;
                coinsConfig[key].history = savedCoins[key].history || [];
                coinsConfig[key].currentPrice = savedCoins[key].currentPrice || coinsConfig[key].basePrice;
            }
        }
    } else {
        for (let key in coinsConfig) {
            coinsConfig[key].currentPrice = coinsConfig[key].basePrice;
            let price = coinsConfig[key].basePrice;
            for(let i=0; i<20; i++) coinsConfig[key].history.push(price);
        }
    }
}

// === ЛОГИКА ВКЛАДОК ===
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const tab = document.getElementById('tab-' + tabName);
    if (tab) {
        tab.classList.add('active');
    }

    let activeBtn = null;

    if (tabName === 'secret') {
        activeBtn = document.getElementById('btn-secret');
    } else {
        activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
            const onclick = btn.getAttribute('onclick') || '';
            return onclick.includes(`openTab('${tabName}')`);
        });
    }

    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// === ЛОГИКА БИРЖИ ===
function simulateMarket() {
    for (let key in coinsConfig) {
        let coin = coinsConfig[key];
        let change = 1 + (Math.random() * coin.volatility * 2 - coin.volatility);
        coin.currentPrice *= change;
        if (coin.currentPrice < coin.basePrice * 0.01) coin.currentPrice = coin.basePrice * 0.01;
        coin.history.push(coin.currentPrice);
        if (coin.history.length > 50) coin.history.shift();
    }
    saveData();
    updateMarketUI();
}

function selectCoin(coinKey, btnElement) {
    currentSelectedCoin = coinKey;
    document.querySelectorAll('.coin-tab').forEach(tab => tab.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    updateMarketUI();
}

function tradeCoin(type) {
    const amountInput = document.getElementById('trade-amount');
    const amount = parseInt(amountInput.value);
    if (!amount || amount <= 0) return;
    const coin = coinsConfig[currentSelectedCoin];
    const totalCost = coin.currentPrice * amount;
    if (type === 'buy') {
        if (gems >= totalCost) { gems -= totalCost; coin.amount += amount; }
        else { alert("Недостаточно средств!"); return; }
    } else if (type === 'sell') {
        if (coin.amount >= amount) { gems += totalCost; coin.amount -= amount; }
        else { alert("Недостаточно монет!"); return; }
    }
    saveData();
    updateUI();
    updateMarketUI();
}

function updateMarketUI() {
    const coin = coinsConfig[currentSelectedCoin];
    const nameEl = document.getElementById('display-name');
    const priceEl = document.getElementById('display-price');
    const amountEl = document.getElementById('display-amount');
    const valueEl = document.getElementById('display-value');
    const changeEl = document.getElementById('display-change');
    if(nameEl) nameEl.innerText = coin.name;
    if(priceEl) priceEl.innerText = coin.currentPrice.toFixed(2) + ' ₽';
    if(amountEl) amountEl.innerText = coin.amount;
    if(valueEl) valueEl.innerText = (coin.amount * coin.currentPrice).toFixed(2);
    if(changeEl) {
        const lastPrice = coin.history[coin.history.length - 2] || coin.currentPrice;
        const changePercent = ((coin.currentPrice - lastPrice) / lastPrice) * 100;
        changeEl.innerText = (changePercent >= 0 ? '+' : '') + changePercent.toFixed(2) + '%';
        changeEl.className = 'coin-change ' + (changePercent >= 0 ? 'up' : 'down');
    }
    updateChart(coin);
}

function updateChart(coin) {
    // Просто обновляем цену и процент изменения — без графика
    const priceEl = document.getElementById('display-price');
    const changeEl = document.getElementById('display-change');
    
    if (priceEl) {
        priceEl.innerText = coin.currentPrice.toFixed(2) + ' ₽';
    }
    
    if (changeEl) {
        const lastPrice = coin.history[coin.history.length - 2] || coin.currentPrice;
        const changePercent = ((coin.currentPrice - lastPrice) / lastPrice) * 100;
        changeEl.innerText = (changePercent >= 0 ? '+' : '') + changePercent.toFixed(2) + '%';
        changeEl.className = 'coin-change ' + (changePercent >= 0 ? 'up' : 'down');
    }

    // Если хочешь, можно добавить простую визуализацию цены через прогресс-бар
    // Но это опционально
}

// === ЛОГИКА ИГРЫ ===
function adjustBet(amount) {
    let newBet = currentBet + amount;
    if (newBet < 250) newBet = 250;
    if (newBet > gems) newBet = gems;
    currentBet = newBet;
    saveData();
    updateUI();
}

function doubleBet() {
    let newBet = currentBet * 2;
    if (newBet > gems) newBet = gems;
    currentBet = newBet;
    saveData();
    updateUI();
}

function halveBet() {
    let newBet = Math.floor(currentBet / 2);
    if (newBet < 250) newBet = 250;
    currentBet = newBet;
    saveData();
    updateUI();
}

function maxBet() {
    currentBet = gems;
    saveData();
    updateUI();
}

function createGrid() {
    gridEl.innerHTML = ''; // Очищаем сетку
    
    // 👇 ИЗМЕНЕНИЕ: было 20, стало 25 (5 строк * 5 столбцов)
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const img = document.createElement('img');
        img.className = 'slot-img';
        img.style.opacity = '0'; 
        img.style.background = '#1a1a1a'; 
        img.style.borderRadius = '5px';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        cell.appendChild(img);
        gridEl.appendChild(cell);
    }
}

function animateBalanceChange(type) {
    const els = [document.getElementById('lobby-balance'), document.getElementById('game-balance')];
    els.forEach(el => {
        el.classList.remove('balance-pop', 'balance-loss');
        void el.offsetWidth;
        if (type === 'win') el.classList.add('balance-pop');
        if (type === 'loss') el.classList.add('balance-loss');
    });
}

function updateUI() {
    const lobbyBal = document.getElementById('lobby-balance');
    const gameBal = document.getElementById('game-balance');
    if(lobbyBal) lobbyBal.innerText = gems;
    if(gameBal) gameBal.innerText = gems;
    const betDisplay = document.getElementById('bet-value-display');
    if (betDisplay) betDisplay.innerText = currentBet;
    if(currentCostEl) currentCostEl.innerText = currentBet;
    const btnMinus = document.querySelector('.btn-adjust:first-child');
    const btnPlus = document.querySelector('.btn-adjust:last-child');
    if (btnMinus) btnMinus.disabled = (currentBet <= 250);
    if (btnPlus) btnPlus.disabled = (currentBet >= gems);
    const btnMax = document.querySelector('.btn-max');
    if (btnMax) {
        btnMax.disabled = (currentBet >= gems);
        btnMax.style.opacity = (currentBet >= gems) ? "0.5" : "1";
    }
if (gems < currentBet) {
    if (spinBtn) {
        spinBtn.disabled = true;
        spinBtn.classList.remove('ready-pulse');
        spinBtn.innerHTML = `НЕ ХВАТАЕТ<br><span class="cost">Нужно ${currentBet} 💎</span>`;
    }
    if (autoBtn) autoBtn.disabled = true;
} else {
    if (spinBtn) {
        spinBtn.disabled = false;
        if (!isSpinning) {
            spinBtn.classList.add('ready-pulse');
        }
        spinBtn.innerHTML = `SPIN <br><span class="cost">-${currentBet} 💎</span>`;
    }
    if (autoBtn) autoBtn.disabled = false;
}
}

function startGame(themeName) {
    applyVIPTheme(themeName);
    if (themeName === 'kaka' && upgrades.highroller < 1) {
    if (blackMarketItems.highRollerPass > 0) {
        blackMarketItems.highRollerPass -= 1;
        saveBlackMarket();
        updateBlackMarketUI();
    } else {
        alert("❌ Открой High Roller в улучшениях или купи пропуск в Black Market!");
        return;
    }
}
    // Проверка баланса
    if (currentBet > gems) { 
    currentBet = 250; 
    saveData(); 
    }
    
    if (gems < currentBet) {
        if (gems <= 0) { 
            gems += 100; 
            saveData(); 
            updateUI(); 
            alert("Банкрот! Дали 100 гемов."); 
        } else { 
            return; 
        }
    }

    // Устанавливаем тему
    currentTheme = themeName;
    slotTitle.innerText = titles[themeName];
    
    // Переключаем экраны
    lobbyScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Создаём сетку и обновляем UI
    createGrid();
    updateUI();
    resultText.innerText = "Нажми SPIN!";
    
    // Сбрасываем авто-спин
    autoSpinActive = false;
    autoBtn.innerText = "AUTO";

    // Показываем счётчик лимита ТОЛЬКО если это Ronaldo (опционально)
    const limitEl = document.getElementById('ronaldo-win-limit-display');
    if (limitEl) {
        if (themeName === 'ronaldo') {
            // Если хочешь показать лимит — раскомментируй следующие строки
            // checkAndResetDailyWinLimit();
            // const leftEl = document.getElementById('win-limit-left');
            // if (leftEl) {
            //     limitEl.style.display = 'block';
            //     leftEl.innerText = (MAX_RONALDO_WIN_PER_DAY - todayRonaldoWinnings).toLocaleString();
            // }
        } else {
            limitEl.style.display = 'none';
        }
    }
}

function goBack() {
    document.body.classList.remove(
        'vip-theme-ronaldo',
        'vip-theme-shrek',
        'vip-theme-spongebob',
        'vip-theme-speed'
    );

    gameScreen.classList.remove('active');
    lobbyScreen.classList.add('active');
    autoSpinActive = false;

    // Скрываем счётчик лимита Ronaldo
    const limitEl = document.getElementById('ronaldo-win-limit-display');
    if (limitEl) {
        limitEl.style.display = 'none';
    }
}

function animateDrop(cells, items, callback) {
    cells.forEach((img, index) => {
        const item = items[index];
        if (!item) return; // Защита от undefined
        
        img.style.transition = 'none';
        img.style.transform = 'translateY(-200px)';
        img.style.opacity = '0';
        img.src = item.src; // ← здесь загружается реальная картинка
        img.style.background = 'transparent'; // Убираем тёмный фон
        
        const cell = img.parentElement;
        cell.setAttribute('data-multiplier', item.mult || '');
        
        setTimeout(() => {
            img.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
            img.style.transform = 'translateY(0)';
            img.style.opacity = '1';
        }, index * 30);
    });
    
// 👇 ИЗМЕНЕНИЕ: используем длину массива cells вместо хардкода 20
const animationTime = cells.length * 30 + 500;
setTimeout(() => callback(), animationTime);
}

function toggleAuto() {
    if (autoSpinActive) {
        autoSpinActive = false;
        autoBtn.innerText = "AUTO";
        autoBtn.style.background = "linear-gradient(to bottom, #00f2ff, #0099cc)";
    } else {
        autoSpinActive = true;
        autoSpinCount = 5 + (upgrades.auto || 0) * 2;

        if ((blackMarketItems.autoPack || 0) > 0) {
            autoSpinCount += 10;
            blackMarketItems.autoPack -= 1;
            saveBlackMarket();
            updateBlackMarketUI();
        }

        autoBtn.innerText = "STOP";
        autoBtn.style.background = "linear-gradient(to bottom, #ff4444, #cc0000)";
        spin();
    }
}

function spin() {
    
    console.log("=== DEBUG SPIN ===");
console.log("Тема:", currentTheme);
console.log("Количество картинок в теме:", themes[currentTheme]?.length);
console.log("Функция getRandomWeightedItem существует?", typeof getRandomWeightedItem === 'function');

    if (isSpinning || !currentTheme || gems < currentBet) return;

    // Генерируем результат спина
    const items = themes[currentTheme];
    if (!items || items.length === 0) {
        alert("Ошибка: тема не найдена!");
        return;
    }

    const finalGrid = [];
for (let i = 0; i < 25; i++) {  // 👇 ИЗМЕНЕНИЕ: было 20, стало 25
    finalGrid.push(getRandomWeightedItem(items));
}

    // Списываем ставку
    gems -= currentBet;
    updateUI();
    animateBalanceChange('loss');
    
isSpinning = true;
spinBtn.disabled = true;
autoBtn.disabled = true;

if (spinBtn) {
    spinBtn.classList.remove('ready-pulse');
    spinBtn.innerHTML = `КРУТИМ...`;
}

resultText.innerText = getRandomFrom([
    "Крутим...",
    "Удачи 🍀",
    "Погнали!",
    "Сейчас будет красиво..."
]);

    // Получаем ячейки сетки
    const cells = Array.from(gridEl.querySelectorAll('.slot-img'));

    // Запускаем анимацию
    animateDrop(cells, finalGrid, () => {
        checkWins(finalGrid);
        isSpinning = false;
        spinBtn.disabled = false;
        autoBtn.disabled = false;
        updateUI();
        
        if (autoSpinActive && autoSpinCount > 0) {
            autoSpinCount--;
            if (autoSpinCount === 0) toggleAuto();
            else setTimeout(spin, 1000);
        }
    });
}

function checkWins(grid) {
    console.log("=== ПРОВЕРКА ВЫИГРЫШЕЙ ===");
    console.log("Ставка:", currentBet);

    clearHighlightedCells();

    const profile = getSlotProfile(currentTheme);
    let totalWin = 0;
    const rows = 5;
    const cols = 5;

    // собираем все выигрышные ячейки, чтобы подсветить их разом
    const allWinningIndexes = new Set();

    function addIndexesToHighlight(indexes) {
        indexes.forEach(i => allWinningIndexes.add(i));
    }

    // === ГОРИЗОНТАЛЬНЫЕ ЛИНИИ ===
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + 1];
            const item3 = grid[idx + 2];

            if (
                item1 &&
                item2 &&
                item3 &&
                item1.src === item2.src &&
                item2.src === item3.src
            ) {
                let matchCount = 3;

                if (col + 3 < cols && grid[idx + 3] && grid[idx + 3].src === item1.src) matchCount++;
                if (col + 4 < cols && grid[idx + 4] && grid[idx + 4].src === item1.src) matchCount++;

                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                let winAmount = 0;

                if (matchCount === 3) winAmount = currentBet * profile.pay3 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * profile.pay4 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * profile.pay5 * multiplier;

                totalWin += winAmount;

                const winIndexes = [];
                for (let i = 0; i < matchCount; i++) {
                    winIndexes.push(idx + i);
                }
                addIndexesToHighlight(winIndexes);

                // пропускаем уже учтённые клетки в этой линии
                col += matchCount - 1;
            }
        }
    }

    // === ВЕРТИКАЛЬНЫЕ ЛИНИИ ===
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 2; row++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + cols];
            const item3 = grid[idx + cols * 2];

            if (
                item1 &&
                item2 &&
                item3 &&
                item1.src === item2.src &&
                item2.src === item3.src
            ) {
                let matchCount = 3;

                if (row + 3 < rows && grid[idx + cols * 3] && grid[idx + cols * 3].src === item1.src) matchCount++;
                if (row + 4 < rows && grid[idx + cols * 4] && grid[idx + cols * 4].src === item1.src) matchCount++;

                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                let winAmount = 0;

                if (matchCount === 3) winAmount = currentBet * profile.pay3 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * profile.pay4 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * profile.pay5 * multiplier;

                totalWin += winAmount;

                const winIndexes = [];
                for (let i = 0; i < matchCount; i++) {
                    winIndexes.push(idx + cols * i);
                }
                addIndexesToHighlight(winIndexes);
            }
        }
    }

    // === ДИАГОНАЛИ: слева направо ===
    for (let row = 0; row < rows - 2; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + cols + 1];
            const item3 = grid[idx + cols * 2 + 2];

            if (
                item1 &&
                item2 &&
                item3 &&
                item1.src === item2.src &&
                item2.src === item3.src
            ) {
                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                totalWin += currentBet * profile.diag3 * multiplier;

                const winIndexes = [
                    idx,
                    idx + cols + 1,
                    idx + cols * 2 + 2
                ];
                addIndexesToHighlight(winIndexes);
            }
        }
    }

    // === ДИАГОНАЛИ: справа налево ===
    for (let row = 0; row < rows - 2; row++) {
        for (let col = 2; col < cols; col++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + cols - 1];
            const item3 = grid[idx + cols * 2 - 2];

            if (
                item1 &&
                item2 &&
                item3 &&
                item1.src === item2.src &&
                item2.src === item3.src
            ) {
                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                totalWin += currentBet * profile.diag3 * multiplier;

                const winIndexes = [
                    idx,
                    idx + cols - 1,
                    idx + cols * 2 - 2
                ];
                addIndexesToHighlight(winIndexes);
            }
        }
    }

    // === ПОДСВЕТКА ВСЕХ ВЫИГРЫШНЫХ ЯЧЕЕК ===
    if (allWinningIndexes.size > 0) {
        const shouldUseStrongHighlight = allWinningIndexes.size >= 4 || totalWin >= currentBet * 2;
        highlightCells([...allWinningIndexes], shouldUseStrongHighlight);
        flashSlotContainer();
    }

    // === НАЧИСЛЕНИЕ ВЫИГРЫША ===
if (totalWin > 0) {
    let finalMultiplier = 1;

    // Rare Drop
    finalMultiplier += (upgrades.rare || 0) * 0.03;

    // Critical Spin
    const critChance = Math.min(0.05 + (upgrades.crit || 0) * 0.02, 0.25);
    const isCrit = Math.random() < critChance;
    if (isCrit) {
        finalMultiplier *= 2;
    }

    // Gem Booster
    if ((activeEffects.gemBoosterSpins || 0) > 0) {
        finalMultiplier *= 1.5;
        activeEffects.gemBoosterSpins -= 1;
        saveBlackMarket();
    }

    totalWin = Math.floor(totalWin * finalMultiplier);

    // жёсткий потолок выигрыша
    const maxAllowedWin = Math.floor(currentBet * profile.maxWinMultiplier);
    if (totalWin > maxAllowedWin) {
        totalWin = maxAllowedWin;
    }

    gems += totalWin;

    saveData();
    updateUI();
    animateBalanceChange('win');

    if (typeof addToLeaderboard === 'function') {
        addToLeaderboard(totalWin);
    }

    // Сначала даём игроку увидеть подсветку, потом показываем текст выигрыша
setTimeout(() => {
    let resultMessage = "";

    if (totalWin >= currentBet * 10) {
        resultMessage = getBigWinMessage(totalWin);
    } else if (totalWin >= currentBet * 2) {
        resultMessage = getMediumWinMessage(totalWin);
    } else {
        resultMessage = getSmallWinMessage(totalWin);
    }

    if (isCrit) {
        resultMessage += " — CRITICAL x2!";
    }

    resultText.innerText = resultMessage;
}, 350);

    // Big Win показываем чуть позже, чтобы анимация клеток успела сыграть
    if (totalWin >= currentBet * 10) {
        setTimeout(() => {
            showBigWin(totalWin);
        }, 550);
    }
} else {
    const saverChance = Math.min((upgrades.saver || 0) * 0.04, 0.20);

    if (Math.random() < saverChance) {
        gems += currentBet;
        saveData();
        updateUI();
        animateBalanceChange('win');
        resultText.innerText = "🛟 Bet Saver сработал! Ставка возвращена";
    } else {
        if (hasNearMiss(grid)) {
            resultText.innerText = getRandomFrom([
                "Почти! Комбинация была рядом 👀",
                "Очень близко...",
                "Ещё чуть-чуть!"
            ]);
        } else {
            resultText.innerText = getLossMessage();
        }
    }
}

    saveData();
}

function fireConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function showBigWin(amount) {
    modalAmount.innerText = amount;
    winModal.classList.add('active');
    document.querySelector('.slot-container').classList.add('win-pulse');
    fireConfetti();
}

function closeModal() {
    winModal.classList.remove('active');
    const slotContainer = document.querySelector('.slot-container');
    if (slotContainer) slotContainer.classList.remove('win-pulse');
}


// === ТАБЛИЦА ЛИДЕРОВ ===
let leaderboard = JSON.parse(localStorage.getItem('memeLeaderboard')) || [];

function addToLeaderboard(amount) {
    if (amount <= 0) return;
    
    const now = new Date();
    // Форматируем дату: ДД.ММ ЧЧ:ММ
    const dateStr = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
    
    // Добавляем новый рекорд
    leaderboard.push({ amount: amount, date: dateStr });
    
    // Сортируем по сумме (по убыванию)
    leaderboard.sort((a, b) => b.amount - a.amount);
    
    // Оставляем только топ-5
    if (leaderboard.length > 5) {
        leaderboard = leaderboard.slice(0, 5);
    }
    
    // Сохраняем в память браузера
    localStorage.setItem('memeLeaderboard', JSON.stringify(leaderboard));
    
    // Обновляем отображение
    updateLeaderboardUI();
}

function updateLeaderboardUI() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (leaderboard.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="leaderboard-empty">Пока нет рекордов. Крути слоты!</td></tr>';
        return;
    }
    
    leaderboard.forEach((record, index) => {
        const row = document.createElement('tr');
        // Добавляем медальки для топ-3
        let rankIcon = index + 1;
        if (index === 0) rankIcon = '🥇';
        if (index === 1) rankIcon = '🥈';
        if (index === 2) rankIcon = '🥉';

        row.innerHTML = `
            <td>${rankIcon}</td>
            <td>${record.amount.toLocaleString()} 💎</td>
            <td style="color:#aaa; font-size:14px;">${record.date}</td>
        `;
        tbody.appendChild(row);
    });
}



// === СИСТЕМА VIP КОДОВ ===
const vipCodes = {
    "TEST-VIP": 1,
    "VIP-LUCKY": 1,
    "VIP-HIGHROLLER": 2,
    "VIP-MEMELORD": 3,
    "VIP-VEGASLEGEND": 4
};

let hasVIPAccess = localStorage.getItem('memeVIPAccess') === 'true';

function checkSecretAccess() {
    openTab('secret');
    
    if (vipLevel >= 1) {
        // Если есть VIP - сразу показываем кабинет
        document.getElementById('secret-lock-screen').style.display = 'none';
        document.getElementById('secret-content').style.display = 'block';
        showVIPDashboard();
    } else {
        // Если нет VIP - показываем витрину
        document.getElementById('secret-lock-screen').style.display = 'none';
        document.getElementById('secret-content').style.display = 'block';
        showVIPStorefront();
    }
}

function activateVIPCodeFromStore() {
    const input = document.getElementById('vip-code-input-activate');
    const code = input.value.trim().toUpperCase();
    const messageEl = document.getElementById('store-message');

    if (vipCodes[code]) {
        const newLevel = vipCodes[code];
        
        if (newLevel > vipLevel) {
            vipLevel = newLevel;
            currentVIPLevel = newLevel;
            localStorage.setItem('memeVIPLevel', String(newLevel));
            saveVIPData();
            renderVIPSlots();
            updateVIPZoneUI();
            
            messageEl.style.color = '#00ff88';
            messageEl.innerText = `✅ Код принят! Уровень ${getLevelName(vipLevel)} активирован.`;
            
            // Через секунду переключаем на кабинет
            setTimeout(() => {
                showVIPDashboard();
                messageEl.innerText = '';
                input.value = '';
                if (typeof fireConfetti === 'function') fireConfetti();
            }, 1500);
            
        } else {
            messageEl.style.color = '#ffa500';
            messageEl.innerText = `⚠️ У вас уже есть уровень ${getLevelName(vipLevel)} или выше.`;
        }
    } else {
        messageEl.style.color = '#ff4444';
        messageEl.innerText = "❌ Неверный код!";
    }
}

// Вспомогательная функция для получения названия уровня

function getLevelName(level) {
    switch(level) {
        case 1: return "Lucky";
        case 2: return "High Roller";
        case 3: return "Meme Lord";
        case 4: return "Vegas Legend";
        default: return "Guest";
    }
}

// === ЕЖЕДНЕВНЫЙ БОНУС VIP ===
function claimDailyVIPBonus() {
    const rank = currentVIPLevel;
    if (rank < 1) {
        alert("❌ У тебя нет активного VIP");
        return;
    }

    const lastClaim = parseInt(localStorage.getItem('lastVIPBonusTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastClaim < oneDay) {
        alert("⏳ VIP-бонус доступен только раз в 24 часа.");
        updateVIPZoneUI();
        updateVIPBonusButton();
        return;
    }

    const reward = getVIPDailyBonus();

    gems += reward;
    localStorage.setItem('lastVIPBonusTime', now.toString());

    saveData();
    updateUI();
    updateVIPZoneUI();
    updateVIPBonusButton();
    animateBalanceChange('win');

    alert(`🎉 Ты получил VIP-бонус: ${reward.toLocaleString()} 💎`);
}

function getDailyVIPReward(level) {
    switch (level) {
        case 1: return 1000;   // Ronaldo Pass
        case 2: return 2500;   // Shrek Club
        case 3: return 5000;   // SpongeBob Elite
        case 4: return 10000;  // Speed Legend
        default: return 0;
    }
}

function updateVIPBonusButton() {
    const btn = document.getElementById('btn-daily-vip');
    const msg = document.getElementById('vip-timer-msg');
    if (!btn) return;

    const reward = getVIPDailyBonus();
    const lastClaim = parseInt(localStorage.getItem('lastVIPBonusTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastClaim >= oneDay) {
        btn.disabled = false;
        btn.innerText = `Забрать ${reward.toLocaleString()} 💎`;
        if (msg) {
            msg.innerText = `Ежедневная VIP-награда: ${reward.toLocaleString()} 💎`;
        }
    } else {
        btn.disabled = true;
        btn.innerText = "Уже получено";

        const timeLeftMs = oneDay - (now - lastClaim);
        const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

        if (msg) {
            msg.innerText = `Следующая VIP-награда через ${hours} ч. ${minutes} мин.`;
        }
    }
}

function resetVIPTest() {
    if(confirm("Сбросить VIP статус для теста?")) {
        localStorage.removeItem('memeVIPAccess');
        localStorage.removeItem('lastVIPBonusTime');
        hasVIPAccess = false;
        location.reload();
    }
}



function checkAndResetRonaldoLimit() {
    const today = new Date().toLocaleDateString(); // Например: "10.04.2026"
    
    // Если дата изменилась — сбрасываем счётчик
    if (lastRonaldoResetDate !== today) {
        ronaldoSpinsToday = 0;
        lastRonaldoResetDate = today;
        localStorage.setItem('ronaldoSpinsToday', '0');
        localStorage.setItem('lastRonaldoResetDate', today);
    }
}


function checkAndResetDailyWinLimit() {
    const today = new Date().toLocaleDateString(); 
    
    // Если наступил новый день — сбрасываем счётчик
    if (lastRonaldoWinDate !== today) {
        todayRonaldoWinnings = 0;
        lastRonaldoWinDate = today;
        localStorage.setItem('todayRonaldoWinnings', '0');
        localStorage.setItem('lastRonaldoWinDate', today);
    }
}


function updateSecretContentByLevel() {
    const contentDiv = document.getElementById('secret-content');
    if (!contentDiv) return;

    // Очищаем контент
    contentDiv.innerHTML = '';

    // === ЗАГОЛОВОК ===
    const title = document.createElement('h2');
    title.className = 'secret-title-open';
    title.innerText = `👑 ВАШ VIP СТАТУС: ${getLevelName(vipLevel)}`;
    contentDiv.appendChild(title);

    // === ТАБЛИЦА ТАРИФОВ ===
    const pricingContainer = document.createElement('div');
    pricingContainer.className = 'pricing-grid';
    
    // Данные уровней
    const levels = [
        { id: 1, name: "Bronze", price: 50, color: "#cd7f32", perks: ["Слот Ronaldo", "1000 гемов/день", "20 спинов/день"] },
        { id: 2, name: "Silver", price: 100, color: "#c0c0c0", perks: ["Всё из Bronze", "+ Слот Messi", "x2 множитель", "30 спинов/день"] },
        { id: 3, name: "Gold", price: 200, color: "#ffd700", perks: ["Всё из Silver", "+ Слот Neymar", "x3 множитель", "Доступ к Сапёру"] },
        { id: 4, name: "Platinum", price: 500, color: "#e5e4e2", perks: ["Всё из Gold", "+ Слоты Kaka & Zidane", "x5 множитель", "Доступ к Ракетке"] }
    ];

    levels.forEach(lvl => {
        const isCurrent = vipLevel === lvl.id;
        const isLocked = vipLevel > lvl.id; // Если уровень уже выше, показываем как полученный
        
        let statusText = "";
        let btnClass = "btn-buy-level";
        let btnAction = `window.open('https://www.donationalerts.com/r/forzelagb?amount=${lvl.price}&message=ХОЧУ+${lvl.name.toUpperCase()}', '_blank')`;

        if (isCurrent) {
            statusText = "<span style='color:#00ff88'>✅ АКТИВЕН</span>";
            btnClass = "btn-current-level";
            btnAction = "alert('У вас уже есть этот уровень!')";
        } else if (isLocked) {
            statusText = "<span style='color:#aaa'>🔒 ПОЛУЧЕН</span>";
            btnClass = "btn-locked-level";
            btnAction = "return false";
        } else {
            statusText = `<span style='color:${lvl.color}'>💎 ${lvl.price}₽</span>`;
        }

        const card = document.createElement('div');
        card.className = `pricing-card ${isCurrent ? 'active-card' : ''}`;
        card.style.borderColor = lvl.color;
        
        // Генерируем список преимуществ
        const perksList = lvl.perks.map(p => `<li>✔️ ${p}</li>`).join('');

        card.innerHTML = `
            <div class="card-header" style="background:${lvl.color}; color: #000;">
                <h3>${lvl.name}</h3>
                <div class="price">${statusText}</div>
            </div>
            <div class="card-body">
                <ul class="perks-list">
                    ${perksList}
                </ul>
                <button class="${btnClass}" onclick="${btnAction}" ${isLocked || isCurrent ? 'disabled' : ''}>
                    ${isCurrent ? 'Текущий уровень' : (isLocked ? 'Доступно' : 'Купить доступ')}
                </button>
            </div>
        `;
        pricingContainer.appendChild(card);
    });

    contentDiv.appendChild(pricingContainer);

    // === РАЗДЕЛИТЕЛЬ ===
    contentDiv.appendChild(document.createElement('hr')).style.borderColor = 'rgba(255,255,255,0.1)';

    // === БЛОК СЛОТОВ (Как было раньше, но короче) ===
    const slotsTitle = document.createElement('h3');
    slotsTitle.innerText = "🎮 Ваши эксклюзивные слоты:";
    contentDiv.appendChild(slotsTitle);

    const slotsGrid = document.createElement('div');
    slotsGrid.className = 'vip-slots-grid';
    
    //if (vipLevel >= 1) addMiniSlotCard(slotsGrid, 'ronaldo', 'Ronaldo', 'ronaldo-bg');
    if (vipLevel >= 2) addMiniSlotCard(slotsGrid, 'messi', 'Messi', 'messi-bg');
    if (vipLevel >= 3) addMiniSlotCard(slotsGrid, 'neymar', 'Neymar', 'neymar-bg');
    if (vipLevel >= 4) {
        addMiniSlotCard(slotsGrid, 'kaka', 'Kaka', 'kaka-bg');
        addMiniSlotCard(slotsGrid, 'zidane', 'Zidane', 'zidane-bg');
    }
    
    contentDiv.appendChild(slotsGrid);

    // === КНОПКА СБРОСА ===
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn-reset-vip';
    resetBtn.innerText = '[Тест] Сбросить прогресс';
    resetBtn.onclick = () => { localStorage.clear(); location.reload(); };
    contentDiv.appendChild(resetBtn);
}

// Вспомогательная функция для маленьких карточек слотов
function addMiniSlotCard(parent, themeId, name, bgClass) {
    const div = document.createElement('div');
    div.className = 'mini-slot-card';
    div.onclick = () => startGame(themeId);
    div.innerHTML = `
        <div class="mini-img ${bgClass}"></div>
        <span>${name}</span>
    `;
    parent.appendChild(div);
}
// Вспомогательная функция для создания карточки слота
function addSlotCard(parent, themeId, titleText, subTitle, desc, color) {
    const card = document.createElement('div');
    card.className = 'game-card vip-card';
    card.style.marginBottom = '15px';
    card.onclick = () => startGame(themeId);
    
    // Определяем класс фона в зависимости от темы
    let bgClass = '';
    if (themeId === 'ronaldo') bgClass = 'ronaldo-bg';
    if (themeId === 'messi') bgClass = 'messi-bg';
    if (themeId === 'neymar') bgClass = 'neymar-bg';
    if (themeId === 'kaka') bgClass = 'kaka-bg';
    if (themeId === 'zidane') bgClass = 'zidane-bg';

    card.innerHTML = `
        <div class="card-image ${bgClass}"></div> 
        <div class="card-content">
            <h3 style="color: ${color};">${titleText}</h3>
            <p><b>${subTitle}</b></p>
            <p>${desc}</p>
        </div>
    `;
    parent.appendChild(card);
}


function renderVIPStorefront() {
    const container = document.getElementById('pricing-cards-container');
    if (!container) return;
    container.innerHTML = '';

    const levels = [
        { id: 1, name: "Bronze", price: 50, color: "#cd7f32", perks: ["Слот Ronaldo", "1000 гемов/день", "20 спинов/день"] },
        { id: 2, name: "Silver", price: 100, color: "#c0c0c0", perks: ["Всё из Bronze", "+ Слот Messi", "x2 множитель", "30 спинов/день"] },
        { id: 3, name: "Gold", price: 200, color: "#ffd700", perks: ["Всё из Silver", "+ Слот Neymar", "x3 множитель", "Доступ к Сапёру"] },
        { id: 4, name: "Platinum", price: 500, color: "#e5e4e2", perks: ["Всё из Gold", "+ Слоты Kaka & Zidane", "x5 множитель", "Доступ к Ракетке"] }
    ];

    levels.forEach(lvl => {
        const card = document.createElement('div');
        card.className = 'pricing-card';
        card.style.borderColor = lvl.color;
        
        // Ссылка на донат с предзаполненной суммой и сообщением
        const donateLink = `https://www.donationalerts.com/r/forzelagb?amount=${lvl.price}&message=ХОЧУ+VIP+${lvl.name.toUpperCase()}`;

        card.innerHTML = `
            <div class="card-header" style="background:${lvl.color};">
                <h3>${lvl.name}</h3>
                <div class="price-tag">${lvl.price}₽</div>
            </div>
            <div class="card-body">
                <ul class="perks-list">
                    ${lvl.perks.map(p => `<li>${p}</li>`).join('')}
                </ul>
                <a href="${donateLink}" target="_blank" class="btn-buy-vip" style="text-decoration:none; display:block; text-align:center;">
                    Поддержать и получить ключ
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}


// Показать витрину (магазин)
function showVIPStorefront() {
    document.getElementById('vip-storefront').style.display = 'block';
    document.getElementById('vip-dashboard').style.display = 'none';
    renderVIPStorefront(); // Перерисовываем карточки
}

// Показать личный кабинет (после активации)
function showVIPDashboard() {
    document.getElementById('vip-storefront').style.display = 'none';
    document.getElementById('vip-dashboard').style.display = 'block';
    
    // Заполняем данные кабинета
    document.getElementById('dashboard-level-name').innerText = getLevelName(vipLevel).toUpperCase();
    document.getElementById('dash-bonus').innerText = (vipLevel * 1000).toLocaleString();
    
    // Генерируем слоты
    const slotsContainer = document.getElementById('dash-slots-container');
    slotsContainer.innerHTML = '';
    
    if (vipLevel >= 1) addMiniSlotCard(slotsContainer, 'ronaldo', 'Ronaldo', 'ronaldo-bg');
    if (vipLevel >= 2) addMiniSlotCard(slotsContainer, 'messi', 'Messi', 'messi-bg');
    if (vipLevel >= 3) addMiniSlotCard(slotsContainer, 'neymar', 'Neymar', 'neymar-bg');
    if (vipLevel >= 4) {
        addMiniSlotCard(slotsContainer, 'kaka', 'Kaka', 'kaka-bg');
        addMiniSlotCard(slotsContainer, 'zidane', 'Zidane', 'zidane-bg');
    }
    
    updateVIPBonusButton(); // Обновляем кнопку бонуса
}



// === ВЗВЕШЕННАЯ СЛУЧАЙНОСТЬ ДЛЯ КАРТИНОК ===
function getRandomWeightedItem(items) {
    if (!items || items.length === 0) return null;

    const profile = getSlotProfile(currentTheme);

    const weights = items.map(item => {
        const mult = parseFloat(item.mult) || 1;

    if (mult >= 50) return profile.w50 ?? 0.005;
    if (mult >= 20) return profile.w20 ?? 0.03;
    if (mult >= 10) return profile.w10 ?? 0.12;
    if (mult >= 8)  return profile.w8  ?? 0.5;
    if (mult >= 5)  return profile.w5  ?? 1.5;
    if (mult >= 3)  return profile.w3  ?? 7;
    if (mult >= 2)  return profile.w2  ?? 18;
    return profile.w1 ?? 60;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) return items[i];
    }

    return items[items.length - 1];
}

function getSlotProfile(themeName) {
    const profiles = {
        // Обычные слоты: комфортная игра, частые маленькие возвраты
        default: {
            w1: 70,
            w2: 19,
            w3: 8,
            w5: 2.2,
            w8: 0.5,
            w10: 0.15,
            w20: 0.01,
            w50: 0.0001,

            pay3: 0.22,
            pay4: 0.75,
            pay5: 2.8,
            diag3: 0.14,

            maxWinMultiplier: 12
        },

        // Ronaldo: рискованный VIP-слот, но уже не ломает экономику
        ronaldo: {
            w1: 68,
            w2: 18,
            w3: 8,
            w5: 3.0,
            w8: 1.0,
            w10: 0.35,
            w20: 0.04,
            w50: 0.001,

            pay3: 0.26,
            pay4: 0.90,
            pay5: 3.6,
            diag3: 0.16,

            maxWinMultiplier: 18
        },

        // Shrek: VIP 2, приятный и стабильный
        shrek: {
            w1: 66,
            w2: 19,
            w3: 8.5,
            w5: 3.5,
            w8: 1.4,
            w10: 0.25,
            w20: 0.00,
            w50: 0.00,

            pay3: 0.28,
            pay4: 1.00,
            pay5: 4.0,
            diag3: 0.17,

            maxWinMultiplier: 16
        },

        // SpongeBob: VIP 3, самый "ровный" и приятный
        spongebob: {
            w1: 65,
            w2: 19,
            w3: 9,
            w5: 3.8,
            w8: 1.7,
            w10: 0.35,
            w20: 0.00,
            w50: 0.00,

            pay3: 0.30,
            pay4: 1.08,
            pay5: 4.4,
            diag3: 0.18,

            maxWinMultiplier: 18
        },

        // Speed: VIP 4, самый мощный среди стабильных VIP
        speed: {
            w1: 64,
            w2: 19,
            w3: 9,
            w5: 4.0,
            w8: 2.0,
            w10: 0.45,
            w20: 0.00,
            w50: 0.00,

            pay3: 0.32,
            pay4: 1.15,
            pay5: 4.8,
            diag3: 0.19,

            maxWinMultiplier: 20
        }
    };

    return profiles[themeName] || profiles.default;
}

// === ОБЫЧНАЯ СЛУЧАЙНОСТЬ (для совместимости) ===
function getRandomItem(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}



function goBackToLobby() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('crash-screen').style.display = 'none';
    document.getElementById('mines-screen').style.display = 'none';
    
    document.getElementById('lobby-screen').classList.add('active');
    
    autoSpinActive = false;
    clearInterval(crashInterval);
    cancelAnimationFrame(animationFrameId); // 👈 Добавь это, если используешь requestAnimationFrame
}




// === ПЕРЕМЕННЫЕ РАКЕТКИ ===
let crashGameActive = false;
let currentCrashMultiplier = 1.00;
let crashPoint = 0;
let crashInterval;
let crashBet = 0;
let animationFrameId;

function openCrashGame() {
    // Скрываем лобби и слоты
    document.getElementById('lobby-screen').classList.remove('active');
    document.getElementById('game-screen').style.display = 'none';
    
    // Показываем экран ракетки
    document.getElementById('crash-screen').style.display = 'block';
    updateCrashBalance();
}

function openMinesGame() {
    // Скрываем лобби и слоты
    document.getElementById('lobby-screen').classList.remove('active');
    document.getElementById('game-screen').style.display = 'none';
    
    // Показываем экран сапёра
    document.getElementById('mines-screen').style.display = 'block';
    
    // Инициализируем сетку сапёра при первом открытии
    if (!document.getElementById('mines-grid').hasChildNodes()) {
        renderMinesGridVisuals();
    }
}

function updateCrashBalance() {
    const crashBalEl = document.getElementById('crash-balance-display');
    if (crashBalEl) {
        crashBalEl.innerText = gems.toLocaleString();
    }
}



function changeCrashBet(multiplier) {
    const input = document.getElementById('crash-bet-input');
    if (crashGameActive) return; // Нельзя менять ставку во время игры

    let currentBet = parseInt(input.value);
    let newBet = Math.floor(currentBet * multiplier);

    // Ограничения
    if (newBet < 250) newBet = 250;
    if (newBet > gems) newBet = gems;

    input.value = newBet;
}

function setMaxCrashBet() {
    const input = document.getElementById('crash-bet-input');
    if (!crashGameActive) {
        input.value = gems;
    }
}


function changeCrashBet(multiplier) {
    const input = document.getElementById('crash-bet-input');
    let currentBet = parseInt(input.value);
    if (crashGameActive) return;

    let newBet = Math.floor(currentBet * multiplier);
    if (newBet < 250) newBet = 250;
    if (newBet > gems) newBet = gems;
    input.value = newBet;
}

function setMaxCrashBet() {
    const input = document.getElementById('crash-bet-input');
    if (!crashGameActive) {
        input.value = gems;
    }
}


function updateCrashBalance() {
    const crashBalEl = document.getElementById('crash-balance-display');
    if (crashBalEl) {
        crashBalEl.innerText = gems.toLocaleString();
    }
}



// === ОСНОВНАЯ ЛОГИКА CRASH GAME ===

function playCrash() {
    const betInput = document.getElementById('crash-bet-input');
    const bet = parseInt(betInput.value);
    const btn = document.getElementById('crash-btn');
    const display = document.getElementById('multiplier-display');
    const rocket = document.getElementById('rocket-container');
    const pilotFace = document.getElementById('pilot-face');

    if (bet > gems || bet <= 0) {
        alert("Недостаточно гемов!");
        return;
    }

    if (crashGameActive) {
        cashOutCrash();
        return;
    }

    gems -= bet;
    crashBet = bet;
    updateUI();
    updateCrashBalance();

    // Генерация точки краша
    crashPoint = (0.99 / (1 - Math.random())).toFixed(2);
    if (Math.random() < 0.03) crashPoint = 1.00;

    currentCrashMultiplier = 1.00;
    crashGameActive = true;

    // Сброс визуала
    display.classList.remove('crashing', 'winning');
    display.innerText = "1.00x";
    display.style.color = "#fff";
    
    rocket.style.transform = "translateY(0)";
    rocket.style.display = 'block'; // Показываем ракету
    pilotFace.src = "image/melstroy_calm.png";

    btn.innerText = "ЗАБРАТЬ";
    btn.style.background = "linear-gradient(to bottom, #00ff88, #00cc6a)";

    let startTime = Date.now();
    let particleInterval;

    function animate() {
        if (!crashGameActive) return;

        let elapsed = (Date.now() - startTime) / 1000;
        // Формула роста множителя
        currentCrashMultiplier = Math.pow(Math.E, 0.15 * elapsed).toFixed(2);
        
        display.innerText = currentCrashMultiplier + "x";

        // Движение ракеты вверх (до 80% высоты экрана)
        let progress = Math.min(elapsed / 8, 1); 
        let yOffset = progress * 80; 
        rocket.style.transform = `translateY(-${yOffset}%)`;

        // Смена эмоции Мелстроя
        if (currentCrashMultiplier > 15) {
            pilotFace.src = "image/melstroy_scared.png"; // Нужна картинка melstroy_scared.png
        } else if (currentCrashMultiplier > 5) {
            pilotFace.src = "image/melstroy_surprised.png"; // Нужна картинка melstroy_surprised.png
        }

        // Генерация частиц (монеты, гемы и т.д.)
        if (Math.random() < 0.3) {
            spawnParticle();
        }

        // Проверка на краш
        if (parseFloat(currentCrashMultiplier) >= parseFloat(crashPoint)) {
            endCrashGame(false);
            clearInterval(particleInterval);
            return;
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Запуск генерации частиц каждые 100мс
    particleInterval = setInterval(() => {
        if (crashGameActive) spawnParticle();
    }, 100);

    animate();
}

function spawnParticle() {
    const container = document.getElementById('engine-effects');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Случайный выбор: монета, гем, огонь или кубок
    const types = ['coin', 'gem-particle', 'fire-particle', 'trophy'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    particle.classList.add(randomType);
    
    // Разброс влево-вправо
    let randomX = (Math.random() - 0.5) * 60;
    particle.style.left = `calc(50% - 15px + ${randomX}px)`;
    particle.style.bottom = '-10px';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 1200);
}

function endCrashGame(win) {
    crashGameActive = false;
    cancelAnimationFrame(animationFrameId);
    
    const btn = document.getElementById('crash-btn');
    const display = document.getElementById('multiplier-display');
    const pilotFace = document.getElementById('pilot-face');

    if (win) {
        const winAmount = Math.floor(crashBet * currentCrashMultiplier);
        gems += winAmount;
        display.classList.add('winning');
        display.innerText = `WIN: ${winAmount}`;
        btn.innerText = "ПОБЕДА!";
        updateCrashBalance();
    } else {
        display.classList.add('crashing');
        display.innerText = `CRASHED ${crashPoint}x`;
        btn.innerText = "ВЗРЫВ!";
        btn.style.background = "#ff4444";
        
        // Эффект при проигрыше
        pilotFace.src = "image/melstroy_screaming.png"; // Нужна картинка melstroy_screaming.png
        setTimeout(() => { 
            document.getElementById('rocket-container').style.display = 'none'; 
        }, 500);
    }

    updateUI();

    setTimeout(() => {
        display.classList.remove('crashing', 'winning');
        display.style.color = "#fff";
        display.innerText = "1.00x";
        btn.innerText = "СТАРТ";
        btn.style.background = "linear-gradient(to bottom, #9d4edd, #7b2cbf)";
        document.getElementById('rocket-container').style.display = 'block';
        pilotFace.src = "image/melstroy_calm.png";
    }, 2500);
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

function cashOutCrash() {
    if (!crashGameActive) return;
    endCrashGame(true);
}

function changeCrashBet(multiplier) {
    const input = document.getElementById('crash-bet-input');
    if (crashGameActive) return;
    let newBet = Math.floor(parseInt(input.value) * multiplier);
    if (newBet < 250) newBet = 250;
    if (newBet > gems) newBet = gems;
    input.value = newBet;
}

function setMaxCrashBet() {
    if (!crashGameActive) {
        document.getElementById('crash-bet-input').value = gems;
    }
}

function updateCrashBalance() {
    const el = document.getElementById('crash-balance-display');
    if (el) el.innerText = gems.toLocaleString();
}

// === MINES GAME VARIABLES ===
let minesGrid = [];
let minesCount = 3; // По умолчанию 3 мины
let minesBet = 0;
let minesActive = false;
let openedCells = 0;
let minesCurrentWin = 0;
let multipliers = [];

// --- ФУНКЦИИ УПРАВЛЕНИЯ СТАВКОЙ ---

// Изменение ставки кнопками /2, x2
function changeMinesBet(multiplier) {
    if (minesActive) return; // Нельзя менять во время игры
    
    const input = document.getElementById('mines-bet-input');
    let currentVal = parseInt(input.value) || 100;
    let newVal = Math.floor(currentVal * multiplier);
    
    if (newVal < 10) newVal = 10;
    if (newVal > gems) newVal = gems;
    
    input.value = newVal;
}

// Кнопка MAX
function setMaxMinesBet() {
    if (minesActive) return;
    const input = document.getElementById('mines-bet-input');
    input.value = gems;
}

// Слушатель ручного ввода (чтобы можно было писать цифрами)
document.addEventListener('DOMContentLoaded', () => {
    const betInput = document.getElementById('mines-bet-input');
    if(betInput) {
        betInput.addEventListener('input', function() {
            if(minesActive) return;
            let val = parseInt(this.value);
            if(isNaN(val) || val < 10) this.value = 10;
            if(val > gems) this.value = gems;
        });
    }
});

// --- ВЫБОР КОЛИЧЕСТВА МИН ---

function setMinesCount(count, btnElement) {
    if (minesActive) return; // Нельзя менять во время игры
    
    minesCount = count;
    
    // Визуальное обновление кнопок
    const buttons = document.querySelectorAll('.btn-mine-count');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if(btnElement) {
        btnElement.classList.add('active');
    } else {
        // Если вызвано программно, ищем кнопку с нужным текстом
        buttons.forEach(btn => {
            if(parseInt(btn.innerText) === count) btn.classList.add('active');
        });
    }
    
    // Пересчитываем множители для нового количества мин
    calculateMultipliers();
    updateMinesInfo();
}

// --- ОСНОВНАЯ ЛОГИКА ИГРЫ ---

function startMinesGame() {
    const betInput = document.getElementById('mines-bet-input');
    const bet = parseInt(betInput.value);
    
    if (bet > gems || bet <= 0) {
        alert("Недостаточно гемов или неверная ставка!");
        return;
    }

    // Списываем ставку
    gems -= bet;
    minesBet = bet;
    minesActive = true;
    openedCells = 0;
    minesCurrentWin = 0;
    
    saveData();
    updateUI();
    updateMinesBalance();

    // Генерация поля (25 клеток)
    minesGrid = Array(25).fill('safe');
    let placed = 0;
    while (placed < minesCount) {
        let idx = Math.floor(Math.random() * 25);
        if (minesGrid[idx] === 'safe') {
            minesGrid[idx] = 'mine';
            placed++;
        }
    }

    renderMinesGrid();
    calculateMultipliers();
    updateMinesInfo();

    // UI переключение
    document.getElementById('mines-current-win').innerText = "0";
    document.getElementById('mines-cashout-btn').style.display = 'none';
    document.getElementById('mines-start-btn').style.display = 'none';
    
    // Разблокируем поле для кликов
    const cells = document.querySelectorAll('.mine-cell');
    cells.forEach(c => c.style.pointerEvents = 'auto');
}

function renderMinesGrid() {
    const container = document.getElementById('mines-grid');
    container.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'mine-cell';
        cell.dataset.index = i;
        cell.onclick = () => clickMineCell(i);
        container.appendChild(cell);
    }
}

function clickMineCell(index) {
    if (!minesActive) return;
    
    const cell = document.querySelector(`.mine-cell[data-index="${index}"]`);
    if (cell.classList.contains('revealed')) return; // Уже открыта

    cell.classList.add('revealed');

    if (minesGrid[index] === 'mine') {
        // --- ПРОИГРЫШ ---
        cell.classList.add('mine-hit');
        cell.innerHTML = '💣'; // Или картинка бомбы
        
        minesActive = false;
        showMineExplosion();
        revealAllMines(); // Показать все остальные мины
        
        document.getElementById('mines-cashout-btn').style.display = 'none';
        
        // Возвращаем кнопку старта через паузу
        setTimeout(() => {
            document.getElementById('mines-start-btn').style.display = 'block';
            document.getElementById('mines-start-btn').innerText = "ИГРАТЬ СНОВА";
        }, 1500);
        
    } else {
        // --- УСПЕХ (Алмаз) ---
        cell.classList.add('gem');
        cell.innerHTML = '💎'; // Или картинка алмаза
        
        openedCells++;
        
        // Расчет выигрыша
        // Берем множитель из массива (индекс = открытые клетки - 1)
        let currentMult = 1;
        if (openedCells <= multipliers.length) {
            currentMult = multipliers[openedCells - 1];
        } else {
            currentMult = multipliers[multipliers.length - 1];
        }
        
        minesCurrentWin = Math.floor(minesBet * currentMult);
        
        document.getElementById('mines-current-win').innerText = minesCurrentWin.toLocaleString();
        document.getElementById('cashout-amount-display').innerText = minesCurrentWin.toLocaleString();
        document.getElementById('mines-cashout-btn').style.display = 'block';
        
        updateMinesInfo();
        
        // Проверка на полную победу (открыты все безопасные)
        if (openedCells === (25 - minesCount)) {
            cashOutMines(); 
        }
    }
}

function cashOutMines() {
    if (!minesActive) return;
    
    gems += minesCurrentWin;
    minesActive = false;
    
    saveData();
    updateUI();
    updateMinesBalance();
    
    revealAllMines();
    
    document.getElementById('mines-cashout-btn').style.display = 'none';
    document.getElementById('mines-start-btn').style.display = 'block';
    document.getElementById('mines-start-btn').innerText = "ИГРАТЬ СНОВА";
    
    alert(`Вы забрали ${minesCurrentWin.toLocaleString()} гемов!`);
}

function revealAllMines() {
    minesGrid.forEach((type, idx) => {
        const cell = document.querySelector(`.mine-cell[data-index="${idx}"]`);
        if (!cell.classList.contains('revealed')) {
            cell.classList.add('revealed');
            if (type === 'mine') {
                cell.innerHTML = '💣';
                cell.style.opacity = '0.5';
            } else {
                cell.innerHTML = '💎';
                cell.style.opacity = '0.3';
            }
        }
    });
    // Блокируем клики
    const cells = document.querySelectorAll('.mine-cell');
    cells.forEach(c => c.style.pointerEvents = 'none');
}

function calculateMultipliers() {
    multipliers = [];
    let multiplier = 1;
    // Формула расчета множителя для каждой следующей клетки
    for (let i = 0; i < 25 - minesCount; i++) {
        let safeRemaining = 25 - minesCount - i;
        let totalRemaining = 25 - i;
        // Шанс угадать следующую = safeRemaining / totalRemaining
        // Множитель = 1 / шанс * 0.97 (комиссия казино 3%)
        let probability = safeRemaining / totalRemaining;
        multiplier = multiplier * (1 / probability) * 0.97;
        
        multipliers.push(parseFloat(multiplier.toFixed(2)));
    }
}

function updateMinesInfo() {
    document.getElementById('diamonds-left').innerText = 25 - minesCount - openedCells;
    document.getElementById('tiles-opened').innerText = `${openedCells}/${25 - minesCount}`;
    
    let risk = 0;
    if (openedCells < 25 - minesCount) {
        // Риск того, что следующая клетка - мина
        let remainingTiles = 25 - openedCells;
        risk = ((minesCount / remainingTiles) * 100).toFixed(1);
    }
    document.getElementById('mine-risk').innerText = `${risk}%`;
}

function updateMinesBalance() {
    const el = document.getElementById('mines-balance-display');
    if (el) el.innerText = gems.toLocaleString();
}

function showMineExplosion() {
    // Простая визуальная вспышка экрана красным
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0'; overlay.style.left = '0';
    overlay.style.width = '100%'; overlay.style.height = '100%';
    overlay.style.background = 'rgba(255, 0, 0, 0.2)';
    overlay.style.zIndex = '999';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 300);
}



let upgrades = JSON.parse(localStorage.getItem('memeUpgrades')) || {
    crit: 0,
    saver: 0,
    auto: 0,
    rare: 0,
    highroller: 0
};

const upgradeBaseCosts = {
    crit: 1200,
    saver: 1800,
    auto: 2200,
    rare: 2600,
    highroller: 5000
};

function getUpgradeCost(type) {
    return Math.floor(upgradeBaseCosts[type] * Math.pow(1.55, upgrades[type] || 0));
}

function saveUpgrades() {
    localStorage.setItem('memeUpgrades', JSON.stringify(upgrades));
}

function updateUpgradesUI() {
    const mapping = [
        ['crit', 'upgrade-crit-level', 'upgrade-crit-cost'],
        ['saver', 'upgrade-saver-level', 'upgrade-saver-cost'],
        ['auto', 'upgrade-auto-level', 'upgrade-auto-cost'],
        ['rare', 'upgrade-rare-level', 'upgrade-rare-cost'],
        ['highroller', 'upgrade-highroller-level', 'upgrade-highroller-cost']
    ];

    mapping.forEach(([type, levelId, costId]) => {
        const levelEl = document.getElementById(levelId);
        const costEl = document.getElementById(costId);

        if (levelEl) levelEl.innerText = upgrades[type] || 0;
        if (costEl) costEl.innerText = getUpgradeCost(type);
    });
}

function buyUpgrade(type) {
    const cost = getUpgradeCost(type);

    if (gems < cost) {
        alert('Недостаточно гемов!');
        return;
    }

    gems -= cost;
    upgrades[type] = (upgrades[type] || 0) + 1;

    saveUpgrades();
    saveData();
    updateUI();
    updateUpgradesUI();
    animateBalanceChange('loss');
}


function claimDailyReward() {
    normalizeDailyStreak();

    if (!canClaimDailyReward()) return;

    let streak = getDailyStreak();
    let rewardIndex = streak;

    if (rewardIndex > 29) {
        rewardIndex = 29;
    }

    const reward = dailyRewardTable[rewardIndex] || dailyRewardTable[dailyRewardTable.length - 1];

    gems += reward;

    streak += 1;
    if (streak > 30) {
        streak = 1;
    }

    setDailyStreak(streak);
    setLastDailyClaimDate(getTodayDateString());

    saveData();
    updateUI();
    updateDailyRewardUI();
    renderDailyCalendar();
    animateBalanceChange('win');
}

function updateDailyRewardUI() {
    normalizeDailyStreak();

    const btn = document.getElementById('daily-reward-btn');
    const text = document.getElementById('daily-reward-text');

    if (!btn || !text) return;

    const streak = getDailyStreak();

    if (canClaimDailyReward()) {
        btn.disabled = false;
        btn.innerText = "Открыть награды";
        text.innerHTML = `Твоя серия: ${streak} дн.<br><span style="color:#ffd700;">Заходи каждый день и увеличивай бонус 💎</span>`;
    } else {
        btn.disabled = false;
        btn.innerText = "Посмотреть календарь";

        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);

        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));

        text.innerText = `Серия: ${streak} дн. • Следующий бонус через ${hours} ч.`;
    }
}



let blackMarketItems = JSON.parse(localStorage.getItem('memeBlackMarket')) || {
    doubleRoll: 0,
    autoPack: 0,
    gemBooster: 0,
    rageSpin: 0,
    highRollerPass: 0
};

let activeEffects = JSON.parse(localStorage.getItem('memeActiveEffects')) || {
    gemBoosterSpins: 0
};

function saveBlackMarket() {
    localStorage.setItem('memeBlackMarket', JSON.stringify(blackMarketItems));
    localStorage.setItem('memeActiveEffects', JSON.stringify(activeEffects));
}

function buyBlackMarketItem(type) {
    const prices = {
        doubleRoll: 2200,
        autoPack: 1800,
        gemBooster: 3200,
        rageSpin: 2600,
        highRollerPass: 4500
    };

    const cost = prices[type];

    if (gems < cost) {
        alert("Недостаточно гемов!");
        return;
    }

    gems -= cost;

    if (type === 'gemBooster') {
        activeEffects.gemBoosterSpins += 5;
    } else {
        blackMarketItems[type] = (blackMarketItems[type] || 0) + 1;
    }

    saveBlackMarket();
    saveData();
    updateUI();
    updateBlackMarketUI();
    animateBalanceChange('loss');

    alert("Покупка успешна!");
}

function updateBlackMarketUI() {
    const mapping = [
        ['doubleRoll', 'owned-doubleRoll', 'inv-doubleRoll'],
        ['autoPack', 'owned-autoPack', 'inv-autoPack'],
        ['gemBooster', 'owned-gemBooster', 'inv-gemBooster'],
        ['rageSpin', 'owned-rageSpin', 'inv-rageSpin'],
        ['highRollerPass', 'owned-highRollerPass', 'inv-highRollerPass']
    ];

    mapping.forEach(([key, ownedId, invId]) => {
        const ownedEl = document.getElementById(ownedId);
        const invEl = document.getElementById(invId);

        if (ownedEl) ownedEl.innerText = blackMarketItems[key] || 0;
        if (invEl) invEl.innerText = blackMarketItems[key] || 0;
    });
}

function spinWheel() {
    if (isWheelSpinning) return;

    const track = document.getElementById('wheel-track');
    const resultEl = document.getElementById('wheel-result');
    const btn = document.getElementById('wheel-spin-btn');

    if (!track || !btn || !resultEl) return;
    if (!track.dataset.ready) renderWheelTrack();

    isWheelSpinning = true;
    btn.disabled = true;
    resultEl.innerText = 'Крутим...';

    const rewardsSequence = [];
    for (let i = 0; i < 60; i++) {
        rewardsSequence.push(wheelRewards[i % wheelRewards.length]);
    }

    const chosenReward = getWeightedWheelReward();

    const finalRewardIndexInBase = wheelRewards.findIndex(r => r.id === chosenReward.id);
    const stopIndex = 40 + finalRewardIndexInBase;

    track.innerHTML = '';
    rewardsSequence.forEach(reward => {
        const item = document.createElement('div');
        item.className = `wheel-item ${reward.rarity}`;
        item.innerHTML = `
            <div class="wheel-item-icon">${reward.icon}</div>
            <div class="wheel-item-label">${reward.label}</div>
        `;
        track.appendChild(item);
    });

    const itemWidth = 122;
    const windowWidth = 560;
    const centerOffset = windowWidth / 2 - itemWidth / 2;
    const finalX = -(stopIndex * itemWidth - centerOffset);

    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.transition = 'transform 4.8s cubic-bezier(0.08, 0.82, 0.17, 1)';
            track.style.transform = `translateX(${finalX}px)`;
        });
    });

    setTimeout(() => {
        giveWheelReward(chosenReward);
        if (chosenReward.rarity === 'legendary') {
    resultEl.innerText = `👑 ЛЕГЕНДАРНЫЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;
} else if (chosenReward.rarity === 'epic') {
    resultEl.innerText = `✨ ЭПИЧЕСКИЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;
} else {
    resultEl.innerText = `Ты выбил: ${chosenReward.icon} ${chosenReward.label}`;
}
        btn.disabled = false;
        isWheelSpinning = false;
    }, 5000);
}


function giveWheelReward(reward) {
    if (!reward) return;

    if (reward.type === 'gems') {
        gems += reward.value;
    }

    if (reward.type === 'ticket') {
        blackMarketItems.luckyTicket += reward.value;
    }

    if (reward.type === 'auto') {
        blackMarketItems.autoPack += reward.value;
    }

    if (reward.type === 'shield') {
        blackMarketItems.shield += reward.value;
    }

    if (reward.type === 'pass') {
        blackMarketItems.highRollerPass += reward.value;
    }

    if (reward.type === 'vipTrial') {
        localStorage.setItem('vipTrialUntil', Date.now() + 24 * 60 * 60 * 1000);
    }

    saveData();
    saveBlackMarket();
    updateUI();
    updateBlackMarketUI();
    animateBalanceChange('win');
}



function updateWheelUI() {
    const btn = document.getElementById('wheel-spin-btn');
    const text = document.getElementById('wheel-status-text');

    if (!btn || !text) return;

    const lastSpin = parseInt(localStorage.getItem('wheelSpinTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (vipLevel < 3) {
        btn.disabled = true;
        text.innerText = "Открывается с Elite Meme";
        return;
    }

    if (now - lastSpin >= oneDay) {
        btn.disabled = false;
        text.innerText = vipLevel >= 4
            ? "Vegas Legend: доступна ежедневная крутка с лучшими шансами"
            : "Elite Meme: доступна 1 крутка в день";
    } else {
        btn.disabled = true;
        const hours = Math.ceil((oneDay - (now - lastSpin)) / 3600000);
        text.innerText = `Следующая крутка через ${hours} ч.`;
    }
}



const wheelRewards = [
    { id: 'gems500', label: '500 💎', icon: '💎', rarity: 'common', type: 'gems', value: 500, weight: 38 },
    { id: 'gems1000', label: '1000 💎', icon: '💎', rarity: 'common', type: 'gems', value: 1000, weight: 26 },

    { id: 'ticket', label: 'Lucky Ticket', icon: '🎟', rarity: 'rare', type: 'ticket', value: 1, weight: 13 },
    { id: 'auto', label: 'Auto Pack', icon: '⚡', rarity: 'rare', type: 'auto', value: 1, weight: 9 },
    { id: 'shield', label: 'Shield', icon: '🛡', rarity: 'rare', type: 'shield', value: 1, weight: 8 },

    { id: 'gems5000', label: '5000 💎', icon: '💎', rarity: 'epic', type: 'gems', value: 5000, weight: 3 },
    { id: 'doubleTicket', label: '2x Lucky Ticket', icon: '🎟', rarity: 'epic', type: 'ticket', value: 2, weight: 1.2 },
    { id: 'doubleAuto', label: '2x Auto Pack', icon: '⚡', rarity: 'epic', type: 'auto', value: 2, weight: 0.8 },
    { id: 'doubleShield', label: '2x Shield', icon: '🛡', rarity: 'epic', type: 'shield', value: 2, weight: 0.7 },

    { id: 'gems10000', label: '10000 💎', icon: '💎', rarity: 'legendary', type: 'gems', value: 10000, weight: 0.25 },
    { id: 'gems25000', label: '25000 💎', icon: '💎', rarity: 'legendary', type: 'gems', value: 25000, weight: 0.05 },
    { id: 'doublePass', label: '2x HR Pass', icon: '💎', rarity: 'legendary', type: 'pass', value: 2, weight: 0.2 },
    { id: 'vipTrial', label: 'VIP Trial 1D', icon: '👑', rarity: 'legendary', type: 'vipTrial', value: 1, weight: 0.05 }
];

let isWheelSpinning = false;

function renderWheelTrack() {
    const track = document.getElementById('wheel-track');
    if (!track) return;

    track.innerHTML = '';

    const repeatedRewards = [];
    for (let i = 0; i < 30; i++) {
        repeatedRewards.push(wheelRewards[i % wheelRewards.length]);
    }

    repeatedRewards.forEach(reward => {
        const item = document.createElement('div');
        item.className = `wheel-item ${reward.rarity}`;
        item.innerHTML = `
            <div class="wheel-item-icon">${reward.icon}</div>
            <div class="wheel-item-label">${reward.label}</div>
        `;
        track.appendChild(item);
    });

    track.style.transform = 'translateX(0px)';
    track.dataset.ready = 'true';
}


function spinWheel() {
    if (vipLevel < 3) {
    alert("❌ Рулетка доступна только для Elite Meme и выше");
    return;
}

const lastSpin = parseInt(localStorage.getItem('wheelSpinTime')) || 0;
const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

if (now - lastSpin < oneDay) {
    alert("⏳ Ты уже крутил сегодня!");
    return;
}
    if (isWheelSpinning) return;

    const track = document.getElementById('wheel-track');
    const resultEl = document.getElementById('wheel-result');
    const btn = document.getElementById('wheel-spin-btn');

    if (!track) return;
    if (!track.dataset.ready) renderWheelTrack();

    isWheelSpinning = true;
    btn.disabled = true;
    resultEl.innerText = 'Крутим...';

    const rewardsSequence = [];
    for (let i = 0; i < 50; i++) {
        rewardsSequence.push(wheelRewards[i % wheelRewards.length]);
    }

    track.innerHTML = '';
    rewardsSequence.forEach(reward => {
        const item = document.createElement('div');
        item.className = `wheel-item ${reward.rarity}`;
        item.innerHTML = `
            <div class="wheel-item-icon">${reward.icon}</div>
            <div class="wheel-item-label">${reward.label}</div>
        `;
        track.appendChild(item);
    });

    const finalRewardIndex = Math.floor(Math.random() * wheelRewards.length);
    const stopIndex = 35 + finalRewardIndex;

    const itemWidth = 122; // 110 + gap/padding примерно
    const windowWidth = 560;
    const centerOffset = windowWidth / 2 - itemWidth / 2;

    const finalX = -(stopIndex * itemWidth - centerOffset);

    track.style.transition = 'none';
    track.style.transform = 'translateX(0px)';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.transition = 'transform 4.8s cubic-bezier(0.08, 0.82, 0.17, 1)';
            track.style.transform = `translateX(${finalX}px)`;
        });
    });

    setTimeout(() => {
    giveWheelReward(chosenReward);

    if (chosenReward.rarity === 'legendary') {
        resultEl.innerText = `👑 ЛЕГЕНДАРНЫЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;
    } else if (chosenReward.rarity === 'epic') {
        resultEl.innerText = `✨ ЭПИЧЕСКИЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;
    } else {
        resultEl.innerText = `Ты выбил: ${chosenReward.icon} ${chosenReward.label}`;
    }

    localStorage.setItem('wheelSpinTime', Date.now().toString());
    updateWheelUI();

    btn.disabled = false;
    isWheelSpinning = false;
}, 5000);
}



function giveWheelReward(reward) {
    if (!reward) return;

    if (reward.type === 'gems') {
        gems += reward.value;
    }

    if (reward.type === 'ticket') {
        blackMarketItems.luckyTicket += reward.value;
    }

    if (reward.type === 'auto') {
        blackMarketItems.autoPack += reward.value;
    }

    if (reward.type === 'shield') {
        blackMarketItems.shield += reward.value;
    }

    if (reward.type === 'pass') {
        blackMarketItems.highRollerPass += reward.value;
    }

    if (reward.type === 'vipTrial') {
        const now = Date.now();
        const currentTrial = parseInt(localStorage.getItem('vipTrialUntil')) || 0;

        const oneDay = 24 * 60 * 60 * 1000;
        const newUntil = Math.max(now, currentTrial) + oneDay;

        localStorage.setItem('vipTrialUntil', newUntil.toString());
    }

    saveData();
    saveBlackMarket();
    updateUI();
    updateBlackMarketUI();
    animateBalanceChange('win');
}


function getWeightedWheelReward() {
    const adjustedRewards = wheelRewards.map(reward => {
        let adjustedWeight = reward.weight;

        if (vipLevel >= 4) {
            if (reward.rarity === 'epic') adjustedWeight *= 1.25;
            if (reward.rarity === 'legendary') adjustedWeight *= 1.4;
        }

        return { ...reward, adjustedWeight };
    });

    const totalWeight = adjustedRewards.reduce((sum, reward) => sum + reward.adjustedWeight, 0);
    let random = Math.random() * totalWeight;

    for (const reward of adjustedRewards) {
        random -= reward.adjustedWeight;
        if (random <= 0) {
            return reward;
        }
    }

    return adjustedRewards[0];
}
function activateVIP(level) {
    localStorage.setItem("vipLevel", level);
    renderVIPSlots();
    updateVIPZoneUI();
    alert("VIP активирован: " + level);
}

function updateVIPZoneUI() {
    const lockedEl = document.getElementById('vip-zone-locked');
    const contentEl = document.getElementById('vip-zone-content');
    const levelNameEl = document.getElementById('vip-zone-level-name');
    const dailyBonusEl = document.getElementById('vip-zone-daily-bonus');
    const timerEl = document.getElementById('vip-zone-timer-msg');
    const slotsContainer = document.getElementById('vip-zone-slots-container');

    if (!lockedEl || !contentEl) return;

    const rank = getCurrentVIPRank();

    if (rank < 1) {
        lockedEl.style.display = 'block';
        contentEl.style.display = 'none';
        return;
    }

    lockedEl.style.display = 'none';
    contentEl.style.display = 'block';

    let dailyBonus = 0;
    if (rank === 1) dailyBonus = 1000;
    if (rank === 2) dailyBonus = 5000;
    if (rank === 3) dailyBonus = 8500;
    if (rank === 4) dailyBonus = 15000;

    if (levelNameEl) levelNameEl.innerText = getVIPRankLabel(rank);
    if (dailyBonusEl) dailyBonusEl.innerText = dailyBonus;

    if (slotsContainer) {
        slotsContainer.innerHTML = '';

        vipSlotsConfig.forEach(slot => {
            if (rank >= slot.requiredRank) {
                const card = document.createElement('div');
                card.className = 'mini-slot-card';
                card.onclick = () => tryOpenVIPSlot(slot);

                card.innerHTML = `
                    <div class="mini-img ${slot.bgClass}"></div>
                    <div>${slot.title}</div>
                `;

                slotsContainer.appendChild(card);
            }
        });
    }

    const lastClaim = parseInt(localStorage.getItem('lastVIPBonusTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (timerEl) {
        if (now - lastClaim > oneDay) {
            timerEl.innerText = "VIP-бонус доступен сейчас";
        } else {
            const hoursLeft = Math.ceil((oneDay - (now - lastClaim)) / 3600000);
            timerEl.innerText = `Следующий VIP-бонус через ${hoursLeft} ч.`;
        }
    }
}


/* === VIP STORE: STATUS + PROMOCODES === */
let currentVIPLevel = parseInt(localStorage.getItem('memeVIPLevel')) || 0;

const vipLevelNames = {
    0: 'Без VIP',
    1: 'VIP 1 — Ronaldo Pass',
    2: 'VIP 2 — Shrek Club',
    3: 'VIP 3 — SpongeBob Elite',
    4: 'VIP 4 — Speed Legend'
};

const vipPromoCodes = {
    VIP1: 1,
    VIP2: 2,
    VIP3: 3,
    VIP4: 4,
    RONALDO: 1,
    SHREK: 2,
    SPONGEBOB: 3,
    SPEED: 4
};

function saveVIPData() {
    localStorage.setItem('memeVIPLevel', currentVIPLevel);
}

function updateVIPStatusUI() {
    const statusEl = document.getElementById('vip-current-status');
    if (statusEl) {
        statusEl.innerText = vipLevelNames[currentVIPLevel] || 'Без VIP';
    }

    const vipZoneLevelEl = document.getElementById('vip-zone-level-name');
    if (vipZoneLevelEl) {
        vipZoneLevelEl.innerText = vipLevelNames[currentVIPLevel] || 'Без VIP';
    }

    const vipZoneBonusEl = document.getElementById('vip-zone-daily-bonus');
    if (vipZoneBonusEl) {
        vipZoneBonusEl.innerText = getVIPDailyBonus();
    }
}

function getVIPDailyBonus() {
    if (currentVIPLevel === 1) return 1000;
    if (currentVIPLevel === 2) return 2500;
    if (currentVIPLevel === 3) return 5000;
    if (currentVIPLevel === 4) return 10000;
    return 0;
}

function activateVIPCode() {
    const input = document.getElementById('vip-code-input');
    const messageEl = document.getElementById('vip-message');

    if (!input || !messageEl) return;

    const code = input.value.trim().toUpperCase();

    if (!code) {
        messageEl.innerText = 'Введите промокод.';
        messageEl.style.color = '#ff4d6d';
        return;
    }

    if (vipPromoCodes[code]) {
        currentVIPLevel = vipPromoCodes[code];
        saveVIPData();
        updateVIPStatusUI();

        messageEl.innerText = `Активирован ${vipLevelNames[currentVIPLevel]}!`;
        messageEl.style.color = '#34ff9c';
        input.value = '';
    } else {
        messageEl.innerText = 'Промокод не найден.';
        messageEl.style.color = '#ff4d6d';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateVIPStatusUI();
});


/* === VIP ZONE ACCESS === */
function updateVIPZoneAccess() {
    const lockedEl = document.getElementById('vip-zone-locked');
    const contentEl = document.getElementById('vip-zone-content');

    if (!lockedEl || !contentEl) return;

    if (currentVIPLevel > 0) {
        lockedEl.style.display = 'none';
        contentEl.style.display = 'block';
    } else {
        lockedEl.style.display = 'block';
        contentEl.style.display = 'none';
    }

    updateVIPStatusUI();
}

const originalOpenTab = openTab;

openTab = function(tabName) {
    originalOpenTab(tabName);

    if (tabName === 'vipzone') {
        updateVIPZoneAccess();
    }

    if (tabName === 'secret') {
        updateVIPStatusUI();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateVIPZoneAccess();
});



/* === VIP ZONE SLOTS === */
const vipSlotsConfig = [
    {
        level: 1,
        key: 'ronaldo',
        title: '🐐 Ronaldo',
        desc: 'Легендарный VIP-слот для старта',
        available: true,
        themeClass: 'vip-preview-ronaldo'
    },
    {
        level: 2,
        key: 'shrek',
        title: '🟢 Shrek',
        desc: 'Мемный премиум-слот второго уровня',
        available: true,
        themeClass: 'vip-preview-shrek'
    },
    {
        level: 3,
        key: 'spongebob',
        title: '🧽 SpongeBob',
        desc: 'Яркий VIP-слот с особыми наградами',
        available: true,
        themeClass: 'vip-preview-spongebob'
    },
    {
        level: 4,
        key: 'speed',
        title: '⚡ Speed',
        desc: 'Топовый слот для максимального VIP',
        available: true,
        themeClass: 'vip-preview-speed'
    }
];

function renderVIPZoneSlots() {
    const container = document.getElementById('vip-zone-slots-container');
    if (!container) return;

    container.innerHTML = '';

    vipSlotsConfig.forEach(slot => {
        const unlocked = currentVIPLevel >= slot.level;

        const card = document.createElement('div');
        card.className = 'mini-slot-card vip-zone-slot-card';

        if (!unlocked) {
            card.classList.add('locked-slot');
        }

        const preview = document.createElement('div');
        preview.className = `mini-img vip-slot-preview ${slot.themeClass || ''}`;

        const title = document.createElement('div');
        title.className = 'vip-slot-title';
        title.innerText = slot.title;

        const desc = document.createElement('div');
        desc.className = 'vip-slot-desc';

        if (unlocked) {
            desc.innerText = slot.desc;
        } else {
            desc.innerText = `Открывается на VIP ${slot.level}`;
        }
        const status = document.createElement('div');
status.className = 'vip-slot-status';

if (!unlocked) {
    status.innerText = '🔒 Заблокировано';
} else if (slot.available) {
    status.innerText = '🔥 Доступно сейчас';
} else {
    status.innerText = '🛠 Скоро открытие';
}

        const badge = document.createElement('div');
        badge.className = 'vip-slot-level-badge';
        badge.innerText = `VIP ${slot.level}`;

        const actionBtn = document.createElement('button');
        actionBtn.className = 'vip-slot-btn';

        if (!unlocked) {
            actionBtn.innerText = 'Закрыто';
            actionBtn.onclick = () => {
                showVIPSlotMessage(`Для слота ${slot.title} нужен VIP ${slot.level}`);
            };
        } else if (slot.available) {
            actionBtn.innerText = 'Играть';
            actionBtn.onclick = () => startGame(slot.key);
        } else {
            actionBtn.innerText = 'Скоро';
            actionBtn.disabled = true;
        }

        card.onclick = () => {
            if (!unlocked) {
                showVIPSlotMessage(`Для слота ${slot.title} нужен VIP ${slot.level}`);
            }
        };

card.appendChild(badge);
card.appendChild(preview);
card.appendChild(title);
card.appendChild(status);
card.appendChild(desc);
card.appendChild(actionBtn);

        container.appendChild(card);
    });
}

const originalUpdateVIPZoneAccess = updateVIPZoneAccess;

updateVIPZoneAccess = function() {
    originalUpdateVIPZoneAccess();
    renderVIPZoneSlots();
};

/* === VIP 30-DAY REWARDS CALENDAR === */
let selectedVIPRewardDay = null;

const vipRewardTables = {
    1: Array.from({ length: 30 }, () => 1000),   // Ronaldo Pass
    2: Array.from({ length: 30 }, () => 2500),   // Shrek Club
    3: Array.from({ length: 30 }, () => 5000),   // SpongeBob Elite
    4: Array.from({ length: 30 }, () => 10000)   // Speed Legend
};

function getVIPRewardStorageKey() {
    return `memeVIPRewardProgress_${currentVIPLevel}`;
}

function getVIPRewardProgress() {
    const saved = parseInt(localStorage.getItem(getVIPRewardStorageKey()), 10);
    if (Number.isNaN(saved) || saved < 1) return 1;
    if (saved > 30) return 30;
    return saved;
}

function setVIPRewardProgress(day) {
    localStorage.setItem(getVIPRewardStorageKey(), String(day));
}

function getVIPRewardAmount(day) {
    const table = vipRewardTables[currentVIPLevel];
    if (!table || day < 1 || day > 30) return 0;
    return table[day - 1];
}

function openVIPRewardsModal() {
    if (currentVIPLevel <= 0) {
        const timerMsg = document.getElementById('vip-zone-timer-msg');
        if (timerMsg) {
            timerMsg.innerText = 'Сначала нужно получить VIP-статус.';
        }
        return;
    }

    const modal = document.getElementById('vip-rewards-modal');
    if (!modal) return;

    modal.classList.add('active');
    selectedVIPRewardDay = getVIPRewardProgress();
    renderVIPRewardsCalendar();
}

function closeVIPRewardsModal() {
    const modal = document.getElementById('vip-rewards-modal');
    if (!modal) return;

    modal.classList.remove('active');
    selectedVIPRewardDay = null;
}

function renderVIPRewardsCalendar() {
    const grid = document.getElementById('vip-rewards-grid');
    const levelNameEl = document.getElementById('vip-rewards-level-name');
    const currentDayEl = document.getElementById('vip-rewards-current-day');
    const selectedTextEl = document.getElementById('vip-rewards-selected-text');
    const claimBtn = document.getElementById('vip-rewards-claim-btn');

    if (!grid || !levelNameEl || !currentDayEl || !selectedTextEl || !claimBtn) return;

    const progressDay = getVIPRewardProgress();
    const canClaimToday = canClaimVIPRewardToday();

    levelNameEl.innerText = vipLevelNames[currentVIPLevel] || 'Без VIP';
    currentDayEl.innerText = progressDay;

    grid.innerHTML = '';

    for (let day = 1; day <= 30; day++) {
        const reward = getVIPRewardAmount(day);
        const card = document.createElement('div');
        card.className = 'vip-reward-day';

        let statusText = '';

if (day < progressDay) {
    card.classList.add('claimed');
    statusText = 'Забрано';
} else if (day === progressDay) {
    if (canClaimToday) {
        card.classList.add('available');
        statusText = 'Сегодня';
    } else {
        card.classList.add('claimed');
        statusText = 'Получено';
    }
} else {
    card.classList.add('locked');
    statusText = 'Скоро';
}

        if (day === selectedVIPRewardDay) {
            card.classList.add('selected');
        }

        card.innerHTML = `
            <div class="vip-reward-day-number"><span>${day}</span> день</div>
            <div class="vip-reward-status">${statusText}</div>
            <div class="vip-reward-icon">💎</div>
            <div class="vip-reward-amount">${reward}</div>
            <div class="vip-reward-label">ежедневная награда</div>
        `;

        if (day === progressDay && canClaimToday) {
            card.onclick = () => {
                selectedVIPRewardDay = day;
                renderVIPRewardsCalendar();
            };
        }

        grid.appendChild(card);
    }

    if (selectedVIPRewardDay !== progressDay) {
        selectedVIPRewardDay = progressDay;
    }

    const currentReward = getVIPRewardAmount(progressDay);

    if (canClaimToday) {
        selectedTextEl.innerText = `Сегодня доступна награда за ${progressDay}-й день: ${currentReward} 💎`;
        claimBtn.disabled = false;
        claimBtn.innerText = `Забрать ${currentReward} 💎`;
    } else {
        selectedTextEl.innerText = `Награда за ${progressDay}-й день уже получена сегодня. Возвращайся завтра.`;
        claimBtn.disabled = true;
        claimBtn.innerText = 'Уже получено сегодня';
    }
}

function claimVIPCalendarReward() {
    if (currentVIPLevel <= 0) return;

    if (!canClaimVIPRewardToday()) {
        const timerMsg = document.getElementById('vip-zone-timer-msg');
        if (timerMsg) {
            timerMsg.innerText = 'Сегодня VIP-награда уже получена.';
        }
        renderVIPRewardsCalendar();
        return;
    }

    const progressDay = getVIPRewardProgress();
    if (selectedVIPRewardDay !== progressDay) return;

    const reward = getVIPRewardAmount(progressDay);
    if (reward <= 0) return;

    gems += reward;
    setVIPRewardLastClaimDate(getTodayDateKey());

    if (progressDay < 30) {
        setVIPRewardProgress(progressDay + 1);
    } else {
        setVIPRewardProgress(30);
    }

    saveData();
    updateUI();
    updateVIPStatusUI();

    if (typeof animateBalanceChange === 'function') {
        animateBalanceChange('win');
    }

    const timerMsg = document.getElementById('vip-zone-timer-msg');
    if (timerMsg) {
        timerMsg.innerText = `Ты получил ${reward} 💎 за ${progressDay}-й VIP-день. Следующая награда будет доступна завтра.`;
    }

    renderVIPRewardsCalendar();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVIPRewardsModal();
    }
});


/* === VIP REWARDS: ONCE PER DAY === */
function getTodayDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getVIPRewardLastClaimKey() {
    return `memeVIPRewardLastClaim_${currentVIPLevel}`;
}

function getVIPRewardLastClaimDate() {
    return localStorage.getItem(getVIPRewardLastClaimKey()) || '';
}

function setVIPRewardLastClaimDate(dateStr) {
    localStorage.setItem(getVIPRewardLastClaimKey(), dateStr);
}

function canClaimVIPRewardToday() {
    if (currentVIPLevel <= 0) return false;
    return getVIPRewardLastClaimDate() !== getTodayDateKey();
}

function showVIPSlotMessage(text) {
    const timerMsg = document.getElementById('vip-zone-timer-msg');
    if (timerMsg) {
        timerMsg.innerText = text;
    } else {
        alert(text);
    }
}




/* === APPLY VIP SLOT THEME === */
function applyVIPTheme(mode) {
document.body.classList.remove(
    'vip-theme-ronaldo',
    'vip-theme-shrek',
    'vip-theme-spongebob',
    'vip-theme-speed'
);

    if (mode === 'ronaldo') {
        document.body.classList.add('vip-theme-ronaldo');
    }
    if (mode === 'shrek') {
        document.body.classList.add('vip-theme-shrek');
    }
    if (mode === 'spongebob') {
        document.body.classList.add('vip-theme-spongebob');
    }
    if (mode === 'speed') {
        document.body.classList.add('vip-theme-speed');
    }
}



function getCurrentVIPRank() {
    const vipLevel = parseInt(localStorage.getItem('memeVIPLevel')) || 0;

    const ranks = {
        0: { name: "Без VIP", bonus: 0 },
        1: { name: "VIP 1 🟢", bonus: 1000 },
        2: { name: "VIP 2 🔵", bonus: 2500 },
        3: { name: "VIP 3 🟣", bonus: 5000 },
        4: { name: "VIP 4 🔴", bonus: 10000 }
    };

    return ranks[vipLevel] || ranks[0];
}
function getVIPRankLabel(level) {
    const labels = {
        0: 'Без VIP',
        1: 'VIP 1 — Ronaldo Pass',
        2: 'VIP 2 — Shrek Club',
        3: 'VIP 3 — SpongeBob Elite',
        4: 'VIP 4 — Speed Legend'
    };

    return labels[level] || 'Без VIP';
}


function canClaimDailyReward() {
    const lastClaim = localStorage.getItem('lastDailyClaim');
    const today = new Date().toDateString();
    return lastClaim !== today;
}

function updateDailyRewardUI() {
    const btn = document.getElementById('daily-reward-btn');
    const text = document.getElementById('daily-reward-text');

    if (!btn || !text) return;

    if (canClaimDailyReward()) {
        btn.disabled = false;
        btn.innerText = "Забрать бонус";
        text.innerHTML = `Ежедневная награда для всех<br>
        <span style="color:#ffd700;">С VIP — больше бонусов 💎</span>`;
    } else {
        btn.disabled = true;

        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0);

        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));

        btn.innerText = "Уже получено";
        text.innerText = `Следующий бонус через ${hours} ч.`;
    }
}


function getTodayDateString() {
    const now = new Date();
    return now.toDateString();
}

function getYesterdayDateString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toDateString();
}

function getDailyStreak() {
    return parseInt(localStorage.getItem('dailyStreak')) || 0;
}

function setDailyStreak(value) {
    localStorage.setItem('dailyStreak', String(value));
}

function getLastDailyClaimDate() {
    return localStorage.getItem('lastDailyClaimDate');
}

function setLastDailyClaimDate(value) {
    localStorage.setItem('lastDailyClaimDate', value);
}

function canClaimDailyReward() {
    const lastClaim = getLastDailyClaimDate();
    const today = getTodayDateString();
    return lastClaim !== today;
}

function normalizeDailyStreak() {
    const lastClaim = getLastDailyClaimDate();
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let streak = getDailyStreak();

    if (!lastClaim) {
        return 0;
    }

    if (lastClaim === today || lastClaim === yesterday) {
        return streak;
    }

    // если пропустил день — сброс
    setDailyStreak(0);
    return 0;
}

function renderDailyCalendar() {
    normalizeDailyStreak();

    const grid = document.getElementById('daily-calendar-grid');
    const streakLabel = document.getElementById('daily-streak-label');
    const nextLabel = document.getElementById('daily-next-label');

    if (!grid) return;

    const streak = getDailyStreak();
    const lastClaim = getLastDailyClaimDate();
    const canClaim = canClaimDailyReward();

    let currentDayIndex = streak;
    if (!canClaim && streak > 0) {
        currentDayIndex = streak - 1;
    }

    if (currentDayIndex < 0) currentDayIndex = 0;
    if (currentDayIndex > 29) currentDayIndex = 29;

    streakLabel.innerText = `Серия: ${streak} дн.`;
    const currentDisplayDay = canClaim ? streak + 1 : streak;
    nextLabel.innerText = `Текущий день: ${Math.min(currentDisplayDay, 30)} / 30`;

    grid.innerHTML = '';

    dailyRewardTable.forEach((reward, index) => {
        const day = index + 1;
        const card = document.createElement('div');
        card.className = 'daily-card';

        let statusText = 'Скоро';
        let statusClass = 'locked';

        if (index < streak && lastClaim) {
            card.classList.add('day-claimed');
            statusText = 'Забрано';
            statusClass = 'claimed';
        }

        if (index === streak && canClaim) {
            card.classList.add('day-current');
            statusText = 'Сегодня';
            statusClass = 'current';
        } else if (index > streak || !canClaim) {
            card.classList.add('day-locked');
        }

        if (!canClaim && index === streak - 1 && streak > 0) {
            card.classList.remove('day-locked');
            card.classList.add('day-claimed');
            statusText = 'Получено';
            statusClass = 'claimed';
        }

        card.innerHTML = `
            <div class="daily-status ${statusClass}">${statusText}</div>
            <div class="daily-day">${day} день</div>
            <div class="daily-gem">💎</div>
            <div class="daily-amount">${reward}</div>
            <div class="daily-subtext">ежедневная награда</div>
        `;

        if (index === streak && canClaim) {
            card.style.cursor = 'pointer';
            card.onclick = claimDailyReward;
        }

        grid.appendChild(card);
    });
}

function openDailyCalendar() {
    renderDailyCalendar();
    const modal = document.getElementById('daily-calendar-modal');
    if (modal) modal.classList.add('active');
}

function closeDailyCalendar() {
    const modal = document.getElementById('daily-calendar-modal');
    if (modal) modal.classList.remove('active');
}


function clearHighlightedCells() {
    document.querySelectorAll('.cell.win-cell, .cell.win-cell-strong').forEach(cell => {
        cell.classList.remove('win-cell', 'win-cell-strong');
    });
}

function flashSlotContainer() {
    const slotContainer = document.querySelector('.slot-container');
    if (!slotContainer) return;

    slotContainer.classList.remove('slot-win-flash');
    void slotContainer.offsetWidth;
    slotContainer.classList.add('slot-win-flash');

    setTimeout(() => {
        slotContainer.classList.remove('slot-win-flash');
    }, 1200);
}

function highlightCells(indexes, strong = false) {
    const cells = document.querySelectorAll('.cell');
    const className = strong ? 'win-cell-strong' : 'win-cell';

    indexes.forEach(i => {
        if (cells[i]) {
            cells[i].classList.add(className);
        }
    });

    setTimeout(() => {
        indexes.forEach(i => {
            if (cells[i]) {
                cells[i].classList.remove(className);
            }
        });
    }, 1500);
}


function getRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getLossMessage() {
    return getRandomFrom([
        "Попробуй еще...",
        "Чуть-чуть не хватило",
        "Удача рядом 👀",
        "Следующий спин может занести",
        "Слот ещё разогревается"
    ]);
}

function getSmallWinMessage(amount) {
    return getRandomFrom([
        `Неплохо! +${amount} 💎`,
        `Есть плюс: ${amount} 💎`,
        `Хороший старт — ${amount} 💎`
    ]);
}

function getMediumWinMessage(amount) {
    return getRandomFrom([
        `Хороший занос! +${amount} 💎`,
        `Вот это уже красиво: ${amount} 💎`,
        `Слот ожил! +${amount} 💎`
    ]);
}

function getBigWinMessage(amount) {
    return getRandomFrom([
        `BIG WIN! ${amount} 💎`,
        `МОЩНО! +${amount} 💎`,
        `Жирный занос: ${amount} 💎`
    ]);
}


function hasNearMiss(grid) {
    const rows = 5;
    const cols = 5;

    // горизонтали
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const idx = row * cols + col;
            const a = grid[idx];
            const b = grid[idx + 1];
            const c = grid[idx + 2];

            if (!a || !b || !c) continue;

            const ab = a.src === b.src && a.src !== c.src;
            const bc = b.src === c.src && a.src !== b.src;

            if (ab || bc) return true;
        }
    }

    // вертикали
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 2; row++) {
            const idx = row * cols + col;
            const a = grid[idx];
            const b = grid[idx + cols];
            const c = grid[idx + cols * 2];

            if (!a || !b || !c) continue;

            const ab = a.src === b.src && a.src !== c.src;
            const bc = b.src === c.src && a.src !== b.src;

            if (ab || bc) return true;
        }
    }

    return false;
}

function openGemsShop() {
    const modal = document.getElementById('gems-shop-modal');
    if (modal) modal.classList.add('active');
}

function closeGemsShop() {
    const modal = document.getElementById('gems-shop-modal');
    if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('gems-shop-modal');
    if (e.target === modal) {
        closeGemsShop();
    }
});
function openPurchaseConfirm(packName, amount, bonus, price, paymentUrl) {
    closeGemsShop();

    const modal = document.getElementById('purchase-confirm-modal');
    const nameEl = document.getElementById('confirm-pack-name');
    const amountEl = document.getElementById('confirm-pack-amount');
    const bonusEl = document.getElementById('confirm-pack-bonus');
    const priceEl = document.getElementById('confirm-pack-price');
    const paymentLink = document.getElementById('confirm-payment-link');

    if (nameEl) nameEl.innerText = packName;
    if (amountEl) amountEl.innerText = amount;
    if (bonusEl) bonusEl.innerText = bonus;
    if (priceEl) priceEl.innerText = price;
    if (paymentLink) paymentLink.href = paymentUrl;

    if (modal) modal.classList.add('active');
}

function closePurchaseConfirm() {
    const modal = document.getElementById('purchase-confirm-modal');
    if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    const shopModal = document.getElementById('gems-shop-modal');
    const confirmModal = document.getElementById('purchase-confirm-modal');

    if (e.target === shopModal) {
        closeGemsShop();
    }

    if (e.target === confirmModal) {
        closePurchaseConfirm();
    }
});


// === ЗАПУСК ===
window.onload = () => {
    vipLevel = parseInt(localStorage.getItem('memeVIPLevel')) || 0;
    currentVIPLevel = vipLevel;

    setBet(currentBet);
    createGrid();
    updateUI();
    loadData();
    updateMarketUI();
    updateLeaderboardUI();
    updateUpgradesUI();
    updateDailyRewardUI();
    updateBlackMarketUI();
    updateWheelUI();
    renderWheelTrack();
    updateVIPZoneUI();
    marketInterval = setInterval(simulateMarket, 3000);
};

function setBet(bet) {
    currentBet = bet;
    updateUI();
}