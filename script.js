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
        {src: "image/ronaldo/1.jpg", mult: ""},
        {src: "image/ronaldo/2.jpg", mult: 2}, 
        {src: "image/ronaldo/3.jpg", mult: 3}, 
        {src: "image/ronaldo/4.jpg", mult: 5}, 
        {src: "image/ronaldo/5.jpg", mult: 10}, 
        {src: "image/ronaldo/6.jpg", mult: 20}, 
        {src: "image/ronaldo/7.jpg", mult: 50} // SIUUU JACKPOT!
    ],
    // === НОВЫЕ VIP СЛОТЫ ===
patorka: [
    {src: "image/patorka/1.jpg", mult: ""},
    {src: "image/patorka/2.jpg", mult: 2},
    {src: "image/patorka/3.jpg", mult: 3},
    {src: "image/patorka/4.jpg", mult: 5},
    {src: "image/patorka/5.jpg", mult: 10},
    {src: "image/patorka/6.jpg", mult: 20},
    {src: "image/patorka/7.jpg", mult: 50}
],

goobka: [
    {src: "image/goobka/1.jpg", mult: ""},
    {src: "image/goobka/2.jpg", mult: 2},
    {src: "image/goobka/3.jpg", mult: 3},
    {src: "image/goobka/4.jpg", mult: 5},
    {src: "image/goobka/5.jpg", mult: 10},
    {src: "image/goobka/6.jpg", mult: 25},
    {src: "image/goobka/7.jpg", mult: 75}
],

kaka: [
    {src: "image/kaka/1.jpg", mult: ""},
    {src: "image/kaka/2.jpg", mult: 3},
    {src: "image/kaka/3.jpg", mult: 5},
    {src: "image/kaka/4.jpg", mult: 10},
    {src: "image/kaka/5.jpg", mult: 25},
    {src: "image/kaka/6.jpg", mult: 50},
    {src: "image/kaka/7.jpg", mult: 100}
],

zidane: [
    {src: "image/zidane/1.jpg", mult: ""},
    {src: "image/zidane/2.jpg", mult: 3},
    {src: "image/zidane/3.jpg", mult: 5},
    {src: "image/zidane/4.jpg", mult: 10},
    {src: "image/zidane/5.jpg", mult: 25},
    {src: "image/zidane/6.jpg", mult: 50},
    {src: "image/zidane/7.jpg", mult: 150} // ЛЕГЕНДАРНЫЙ ДЖЕКПОТ!
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
    patorka: "🐐 PATORKA VIP",
    goobka: "🐐 GOOBKA GOLD",
    kaka: "✨ KAKA PLATINUM",
    zidane: "👑 ZIDANE LEGEND"
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
        if(spinBtn) { spinBtn.disabled = true; spinBtn.innerHTML = `НЕ ХВАТАЕТ<br><span class="cost">Нужно ${currentBet} 💎</span>`; }
        if(autoBtn) autoBtn.disabled = true;
    } else {
        if(spinBtn) { spinBtn.disabled = false; spinBtn.innerHTML = `SPIN <br><span class="cost">-${currentBet} 💎</span>`; }
        if(autoBtn) autoBtn.disabled = false;
    }
}

function startGame(themeName) {
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
     if (themeName === 'ronaldo') {
        alert("❌ Слот Ronaldo временно недоступен.");
        return; // Не открываем игру
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
    autoSpinCount = 10 + upgrades.auto * 5;

    if (blackMarketItems.autoPack > 0) {
    autoSpinCount += 20;
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
    resultText.innerText = "Крутим...";

    // Получаем ячейки сетки
    const cells = Array.from(gridEl.querySelectorAll('.slot-img'));

    // Запускаем анимацию
    animateDrop(cells, finalGrid, () => {
        checkWins(finalGrid);
        isSpinning = false;
        spinBtn.disabled = false;
        autoBtn.disabled = false;
        
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

    let totalWin = 0;
    const rows = 5;
    const cols = 5;

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

                if (col + 3 < cols && grid[idx + 3].src === item1.src) matchCount++;
                if (col + 4 < cols && grid[idx + 4].src === item1.src) matchCount++;

                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                let winAmount = 0;

                if (matchCount === 3) winAmount = currentBet * 1.2 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * 3 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * 20 * multiplier;

                totalWin += winAmount;

                // Пропускаем уже проверенные ячейки
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

                if (row + 3 < rows && grid[idx + cols * 3].src === item1.src) matchCount++;
                if (row + 4 < rows && grid[idx + cols * 4].src === item1.src) matchCount++;

                const multiplier =
                    item1.mult && !isNaN(parseFloat(item1.mult))
                        ? parseFloat(item1.mult)
                        : 1;

                let winAmount = 0;

                if (matchCount === 3) winAmount = currentBet * 1.2 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * 3 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * 20 * multiplier;

                totalWin += winAmount;
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

                totalWin += currentBet * 1 * multiplier;
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

                totalWin += currentBet * 1 * multiplier;
            }
        }
    }

    // === НАЧИСЛЕНИЕ ВЫИГРЫША ===
    if (totalWin > 0) {
        const luckBonus = 1 + upgrades.luck * 0.02;

        let blackMarketBonus = 1;
        let usedLuckyTicket = false;

        if (blackMarketItems.luckyTicket > 0) {
            blackMarketBonus += 0.10; // +10% к следующему выигрышу
            blackMarketItems.luckyTicket -= 1;
            saveBlackMarket();
            updateBlackMarketUI();
            usedLuckyTicket = true;
        }

        totalWin = Math.floor(totalWin * luckBonus * blackMarketBonus);

        gems += totalWin;

        if (usedLuckyTicket) {
            resultText.innerText = `🎟 LUCKY TICKET! +${totalWin} 💎`;
        } else {
            resultText.innerText = `ВЫИГРЫШ! +${totalWin} 💎`;
        }

        animateBalanceChange('win');

        if (totalWin >= currentBet * 5) addToLeaderboard(totalWin);
        if (totalWin >= currentBet * 20) showBigWin(totalWin);
    } else {
        if (blackMarketItems.shield > 0) {
            const refund = Math.floor(currentBet * 0.5);
            gems += refund;
            blackMarketItems.shield -= 1;

            saveBlackMarket();
            updateBlackMarketUI();
            saveData();
            updateUI();

            resultText.innerText = `🛡 Щит спас ${refund} 💎`;
            animateBalanceChange('win');
        } else {
            resultText.innerText = "Попробуй еще...";
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
            localStorage.setItem('memeVIPLevel', vipLevel.toString());
            
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
    const lastClaim = parseInt(localStorage.getItem('lastVIPBonusTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

    if (now - lastClaim > oneDay) {
        gems += 1000;
        localStorage.setItem('lastVIPBonusTime', now);
        saveData();
        updateUI();
        
        alert("🎉 Вы получили 1000 гемов! SIUUU!");
        updateVIPBonusButton();
    } else {
        alert("⏳ Бонус доступен только раз в 24 часа.");
    }
}

function updateVIPBonusButton() {
    const btn = document.getElementById('btn-daily-vip');
    const msg = document.getElementById('vip-timer-msg');
    if (!btn) return;

    const lastClaim = parseInt(localStorage.getItem('lastVIPBonusTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastClaim > oneDay) {
        btn.disabled = false;
        btn.innerText = "Забрать 1000 💎";
        msg.innerText = "";
    } else {
        btn.disabled = true;
        btn.innerText = "Уже получено";
        const timeLeft = Math.ceil((oneDay - (now - lastClaim)) / (60 * 60 * 1000));
        msg.innerText = `Следующий бонус через ${timeLeft} ч.`;
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

    // 1. ОПРЕДЕЛЯЕМ СЛОЖНОСТЬ В ЗАВИСИМОСТИ ОТ СТАВКИ
    let difficultyFactor = 1;
    
    if (currentBet > 1000) difficultyFactor = 2;    // Ставка > 1к: сложнее в 2 раза
    if (currentBet > 5000) difficultyFactor = 5;    // Ставка > 5к: сложнее в 5 раз
    if (currentBet > 20000) difficultyFactor = 10;  // Ставка > 20к: сложнее в 10 раз
    if (currentBet > 100000) difficultyFactor = 50; // Ставка > 100к: почти невозможно выбить джекпот

    const weights = items.map(item => {
        const mult = parseFloat(item.mult) || 1;
        
        // Базовый вес: 100 / множитель. 
        // x1 -> вес 100. x50 -> вес 2.
        let weight = 100 / mult;
        
        // ЕСЛИ КАРТИНКА РЕДКАЯ (множитель > 5), ПРИМЕНЯЕМ ШТРАФ ЗА ВЫСОКУЮ СТАВКУ
        if (mult > 5) {
            weight = weight / difficultyFactor;
        }
        
        return Math.max(0.1, weight); // Вес не может быть меньше 0.1
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) return items[i];
    }

    return items[0];
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
    luck: 0,
    daily: 0,
    auto: 0,
    highroller: 0
};

const upgradeBaseCosts = {
    luck: 5000,
    daily: 7500,
    auto: 10000,
    highroller: 15000
};

function getUpgradeCost(type) {
    return Math.floor(upgradeBaseCosts[type] * Math.pow(1.8, upgrades[type]));
}

function saveUpgrades() {
    localStorage.setItem('memeUpgrades', JSON.stringify(upgrades));
}

function updateUpgradesUI() {
    const mapping = [
        ['luck', 'upgrade-luck-level', 'upgrade-luck-cost'],
        ['daily', 'upgrade-daily-level', 'upgrade-daily-cost'],
        ['auto', 'upgrade-auto-level', 'upgrade-auto-cost'],
        ['highroller', 'upgrade-highroller-level', 'upgrade-highroller-cost']
    ];

    mapping.forEach(([type, levelId, costId]) => {
        const levelEl = document.getElementById(levelId);
        const costEl = document.getElementById(costId);
        if (levelEl) levelEl.innerText = upgrades[type];
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
    upgrades[type]++;
    saveUpgrades();
    saveData();
    updateUI();
    updateUpgradesUI();
    animateBalanceChange('loss');
}


function claimDailyReward() {
    const lastClaim = parseInt(localStorage.getItem('dailyRewardTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastClaim < oneDay) {
        updateDailyRewardUI();
        alert("⏳ Ты уже забрал бонус сегодня");
        return;
    }

    const baseReward = 500;
    const bonusFromUpgrade = upgrades.daily * 250;
    const reward = baseReward + bonusFromUpgrade;

    gems += reward;
    localStorage.setItem('dailyRewardTime', now);

    saveData();
    updateUI();
    updateDailyRewardUI();
    animateBalanceChange('win');

    alert(`🎁 Ты получил ${reward} 💎`);
}

function updateDailyRewardUI() {
    const btn = document.getElementById('daily-reward-btn');
    const text = document.getElementById('daily-reward-text');
    if (!btn || !text) return;

    const lastClaim = parseInt(localStorage.getItem('dailyRewardTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const reward = 500 + upgrades.daily * 250;

    if (now - lastClaim >= oneDay) {
        btn.disabled = false;
        btn.innerText = `Забрать ${reward} 💎`;
        text.innerText = "Забери бесплатные гемы каждый день";
    } else {
        btn.disabled = true;
        const hoursLeft = Math.ceil((oneDay - (now - lastClaim)) / (60 * 60 * 1000));
        btn.innerText = "Уже получено";
        text.innerText = `Следующий бонус через ${hoursLeft} ч.`;
    }
}



let blackMarketItems = JSON.parse(localStorage.getItem('memeBlackMarket')) || {
    luckyTicket: 0,
    autoPack: 0,
    shield: 0,
    highRollerPass: 0
};

function saveBlackMarket() {
    localStorage.setItem('memeBlackMarket', JSON.stringify(blackMarketItems));
}

function buyBlackMarketItem(type) {
    const prices = {
        luckyTicket: 150000,
        autoPack: 100000,
        shield: 250000,
        highRollerPass: 300000
    };

    const cost = prices[type];

    if (gems < cost) {
        alert("Недостаточно гемов!");
        return;
    }

    gems -= cost;
    blackMarketItems[type] += 1;

    saveBlackMarket();
    saveData();
    updateUI();
    updateBlackMarketUI();
    animateBalanceChange('loss');
    

    alert("Покупка успешна!");
}



function updateBlackMarketUI() {
    const mapping = [
        ['luckyTicket', 'owned-luckyTicket', 'inv-luckyTicket'],
        ['autoPack', 'owned-autoPack', 'inv-autoPack'],
        ['shield', 'owned-shield', 'inv-shield'],
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
    if (vipLevel < 3) {
        alert("❌ Доступно только для Elite Meme и выше");
        return;
    }

    const lastSpin = parseInt(localStorage.getItem('wheelSpinTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastSpin < oneDay) {
        alert("⏳ Ты уже крутил сегодня!");
        return;
    }

    const rewards = [
        { type: 'gems', value: 500, chance: 30 },
        { type: 'gems', value: 1000, chance: 25 },
        { type: 'ticket', value: 1, chance: 15 },
        { type: 'auto', value: 1, chance: 10 },
        { type: 'shield', value: 1, chance: 10 },
        { type: 'gems', value: 5000, chance: 7 },
        { type: 'gems', value: 10000, chance: 2.5 },
        { type: 'vip', value: 1, chance: 0.5 }
    ];

    // VIP 4 буст шанса
    if (vipLevel >= 4) {
        rewards.forEach(r => {
            if (r.chance < 10) r.chance *= 1.5;
        });
    }

    const roll = Math.random() * 100;
    let sum = 0;
    let reward;

    for (let r of rewards) {
        sum += r.chance;
        if (roll <= sum) {
            reward = r;
            break;
        }
    }

    giveWheelReward(reward);

    localStorage.setItem('wheelSpinTime', now);
    updateWheelUI();
}
function giveWheelReward(reward) {
    const resultEl = document.getElementById('wheel-result');

    if (!reward) return;

    if (reward.type === 'gems') {
        gems += reward.value;
        resultEl.innerText = `💎 +${reward.value}`;
    }

    if (reward.type === 'ticket') {
        blackMarketItems.luckyTicket += 1;
        resultEl.innerText = `🎟 Lucky Ticket`;
    }

    if (reward.type === 'auto') {
        blackMarketItems.autoPack += 1;
        resultEl.innerText = `⚡ Auto Pack`;
    }

    if (reward.type === 'shield') {
        blackMarketItems.shield += 1;
        resultEl.innerText = `🛡 Shield`;
    }

    if (reward.type === 'vip') {
        vipLevel = Math.min(vipLevel + 1, 4);
        resultEl.innerText = `👑 VIP UPGRADE!`;
    }

    saveData();
    saveBlackMarket();
    updateUI();
    updateBlackMarketUI();
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
        text.innerText = "Можно крутить!";
    } else {
        btn.disabled = true;
        const hours = Math.ceil((oneDay - (now - lastSpin)) / 3600000);
        text.innerText = `Следующий спин через ${hours} ч`;
    }
}


// === ЗАПУСК ===
window.onload = () => {
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
    marketInterval = setInterval(simulateMarket, 3000);
};

function setBet(bet) {
    currentBet = bet;
    updateUI();
}