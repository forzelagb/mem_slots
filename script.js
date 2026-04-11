// === КОНФИГУРАЦИЯ БИЗНЕСОВ ===
const businessesConfig = [
    { 
        id: 'murino', 
        name: "Мурино", 
        img: "1.png", 
        baseCost: 1000, 
        baseIncome: 0.001,   // <-- БЫЛО 0.01, СТАЛО 0.001 (в 10 раз меньше!)
        level: 1, 
        accumulated: 0,
        lastCollect: Date.now()
    },
    { 
        id: 'elgeeika', 
        name: "Элджеевка", 
        img: "2026-04-10_13-13-20.png", 
        baseCost: 5000, 
        baseIncome: 0.005,   // <-- БЫЛО 0.05, СТАЛО 0.005
        level: 1, 
        accumulated: 0,
        lastCollect: Date.now()
    },
    { 
        id: 'poteryaevka', 
        name: "Потеряевка", 
        img: "poteraevka.png", 
        baseCost: 20000, 
        baseIncome: 0.02,    // <-- БЫЛО 0.2, СТАЛО 0.02
        level: 1, 
        accumulated: 0,
        lastCollect: Date.now()
    }
];

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
let currentBet = parseInt(localStorage.getItem('memeBet')) || 50;
let currentSelectedCoin = 'burmal';
let marketInterval;
let chartInstance = null;
let autoSpinActive = false; // <-- ОБЪЯВЛЕНО ДО ИСПОЛЬЗОВАНИЯ
let autoSpinCount = 0;
let isSpinning = false;
let currentTheme = '';
// === ТЕМЫ ИГРЫ ===
const themes = {
    brain: [{src: "image/brain/1.jpg", mult: 1}, {src: "image/brain/2.jpg", mult: 1}, {src: "image/brain/3.jpg", mult: 2}, {src: "image/brain/4.jpg", mult: 1}, {src: "image/brain/5.jpg", mult: 3}, {src: "image/brain/6.jpg", mult: 1}, {src: "image/brain/7.jpg", mult: 1}, {src: "image/brain/8.jpg", mult: 5}],
    helin: [{src: "image/helin/1.jpg", mult: 1}, {src: "image/helin/2.jpg", mult: 1}, {src: "image/helin/3.jpg", mult: 2}, {src: "image/helin/4.jpg", mult: 1}, {src: "image/helin/5.jpg", mult: 3}, {src: "image/helin/6.jpg", mult: 1}, {src: "image/helin/7.jpg", mult: 1}, {src: "image/helin/8.jpg", mult: 5}],
    lexapaws: [{src: "image/lexapaws/1.jpg", mult: 1}, {src: "image/lexapaws/2.jpg", mult: 1}, {src: "image/lexapaws/3.jpg", mult: 2}, {src: "image/lexapaws/4.jpg", mult: 1}, {src: "image/lexapaws/5.jpg", mult: 3}, {src: "image/lexapaws/6.jpg", mult: 1}, {src: "image/lexapaws/7.jpg", mult: 1}, {src: "image/lexapaws/8.jpg", mult: 5}],
    litwin: [{src: "image/litwin/1.jpg", mult: 1}, {src: "image/litwin/2.jpg", mult: 1}, {src: "image/litwin/3.jpg", mult: 2}, {src: "image/litwin/4.jpg", mult: 1}, {src: "image/litwin/5.jpg", mult: 3}, {src: "image/litwin/6.jpg", mult: 1}, {src: "image/litwin/7.jpg", mult: 1}, {src: "image/litwin/8.jpg", mult: 5}],
    melstroy: [{src: "image/melstroy/1.jpg", mult: 1}, {src: "image/melstroy/2.jpg", mult: 1}, {src: "image/melstroy/3.jpg", mult: 2}, {src: "image/melstroy/4.jpg", mult: 1}, {src: "image/melstroy/5.jpg", mult: 3}, {src: "image/melstroy/6.jpg", mult: 1}, {src: "image/melstroy/7.jpg", mult: 1}, {src: "image/melstroy/8.jpg", mult: 5}],
    nikkifn: [{src: "image/nikkifn/1.jpg", mult: 1}, {src: "image/nikkifn/2.jpg", mult: 1}, {src: "image/nikkifn/3.jpg", mult: 2}, {src: "image/nikkifn/4.jpg", mult: 1}, {src: "image/nikkifn/5.jpg", mult: 3}, {src: "image/nikkifn/6.jpg", mult: 1}, {src: "image/nikkifn/7.jpg", mult: 1}, {src: "image/nikkifn/8.jpg", mult: 5}],
    rejiboi: [{src: "image/rejiboi/1.jpg", mult: 1}, {src: "image/rejiboi/2.jpg", mult: 1}, {src: "image/rejiboi/3.jpg", mult: 2}, {src: "image/rejiboi/4.jpg", mult: 1}, {src: "image/rejiboi/5.jpg", mult: 3}, {src: "image/rejiboi/6.jpg", mult: 1}, {src: "image/rejiboi/7.jpg", mult: 1}, {src: "image/rejiboi/8.jpg", mult: 5}],
    rostick: [{src: "image/rostick/1.jpg", mult: 1}, {src: "image/rostick/2.jpg", mult: 1}, {src: "image/rostick/3.jpg", mult: 2}, {src: "image/rostick/4.jpg", mult: 1}, {src: "image/rostick/5.jpg", mult: 3}, {src: "image/rostick/6.jpg", mult: 1}, {src: "image/rostick/7.jpg", mult: 1}, {src: "image/rostick/8.jpg", mult: 5}],
    sasich: [{src: "image/sasich/1.jpg", mult: 1}, {src: "image/sasich/2.jpg", mult: 1}, {src: "image/sasich/3.jpg", mult: 2}, {src: "image/sasich/4.jpg", mult: 1}, {src: "image/sasich/5.jpg", mult: 3}, {src: "image/sasich/6.jpg", mult: 1}, {src: "image/sasich/7.jpg", mult: 1}, {src: "image/sasich/8.jpg", mult: 5}],
    skibiditoilet: [{src: "image/skibiditoilet/1.jpg", mult: 1}, {src: "image/skibiditoilet/2.jpg", mult: 1}, {src: "image/skibiditoilet/3.jpg", mult: 2}, {src: "image/skibiditoilet/4.jpg", mult: 1}, {src: "image/skibiditoilet/5.jpg", mult: 3}, {src: "image/skibiditoilet/6.jpg", mult: 1}, {src: "image/skibiditoilet/7.jpg", mult: 1}, {src: "image/skibiditoilet/8.jpg", mult: 5}],
    slovopatsana: [{src: "image/slovopatsana/1.jpg", mult: 1}, {src: "image/slovopatsana/2.jpg", mult: 1}, {src: "image/slovopatsana/3.jpg", mult: 2}, {src: "image/slovopatsana/4.jpg", mult: 1}, {src: "image/slovopatsana/5.jpg", mult: 3}, {src: "image/slovopatsana/6.jpg", mult: 1}, {src: "image/slovopatsana/7.jpg", mult: 1}, {src: "image/slovopatsana/8.jpg", mult: 5}],
    ronaldo: [
        {src: "image/ronaldo/1.jpg", mult: 1},
        {src: "image/ronaldo/2.jpg", mult: 2}, 
        {src: "image/ronaldo/3.jpg", mult: 3}, 
        {src: "image/ronaldo/4.jpg", mult: 5}, 
        {src: "image/ronaldo/5.jpg", mult: 10}, 
        {src: "image/ronaldo/6.jpg", mult: 20}, 
        {src: "image/ronaldo/7.jpg", mult: 50} // SIUUU JACKPOT!
    ],
    // === НОВЫЕ VIP СЛОТЫ ===
patorka: [
    {src: "image/patorka/1.jpg", mult: 1},
    {src: "image/patorka/2.jpg", mult: 2},
    {src: "image/patorka/3.jpg", mult: 3},
    {src: "image/patorka/4.jpg", mult: 5},
    {src: "image/patorka/5.jpg", mult: 10},
    {src: "image/patorka/6.jpg", mult: 20},
    {src: "image/patorka/7.jpg", mult: 50}
],

goobka: [
    {src: "image/goobka/1.jpg", mult: 1},
    {src: "image/goobka/2.jpg", mult: 2},
    {src: "image/goobka/3.jpg", mult: 3},
    {src: "image/goobka/4.jpg", mult: 5},
    {src: "image/goobka/5.jpg", mult: 10},
    {src: "image/goobka/6.jpg", mult: 25},
    {src: "image/goobka/7.jpg", mult: 75}
],

kaka: [
    {src: "image/kaka/1.jpg", mult: 1},
    {src: "image/kaka/2.jpg", mult: 3},
    {src: "image/kaka/3.jpg", mult: 5},
    {src: "image/kaka/4.jpg", mult: 10},
    {src: "image/kaka/5.jpg", mult: 25},
    {src: "image/kaka/6.jpg", mult: 50},
    {src: "image/kaka/7.jpg", mult: 100}
],

zidane: [
    {src: "image/zidane/1.jpg", mult: 1},
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
    saveBusinesses();
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

// === ЛОГИКА БИЗНЕСА ===
function loadBusinesses() {
    const savedBiz = JSON.parse(localStorage.getItem('memeBusinesses'));
    if (savedBiz) {
        savedBiz.forEach(sb => {
            const biz = businessesConfig.find(b => b.id === sb.id);
            if (biz) {
                biz.level = sb.level;
                biz.accumulated = sb.accumulated;
                biz.lastCollect = sb.lastCollect;
            }
        });
    }
}

function saveBusinesses() {
    localStorage.setItem('memeBusinesses', JSON.stringify(businessesConfig));
}

function getBizStats(biz) {
    let cost = Math.floor(biz.baseCost * Math.pow(1.5, biz.level - 1));
    let income = biz.baseIncome * Math.pow(1.1, biz.level - 1); // гораздо медленнее растёт
    return { cost, income };
}

function upgradeBusiness(id) {
    const biz = businessesConfig.find(b => b.id === id);
    if (!biz) return;
    if (biz.level >= 5) { alert("Максимальный уровень!"); return; }
    const stats = getBizStats(biz);
    if (gems >= stats.cost) {
        gems -= stats.cost;
        biz.level++;
        saveData();
        updateUI();
        updateBusinessUI();
    } else { alert("Не хватает гемов!"); }
}

function collectProfit(id) {
    const biz = businessesConfig.find(b => b.id === id);
    if (!biz) return;
    calculateOfflineProfit(biz);
    const collected = Math.floor(biz.accumulated);
    if (collected > 0) {
        gems += collected;
        biz.accumulated = 0;
        biz.lastCollect = Date.now();
        saveData();
        updateUI();
        updateBusinessUI();
        alert(`Собрано ${collected} 💎 из ${biz.name}!`);
    }
}

function calculateOfflineProfit(biz) {
    const now = Date.now();
    const timeDiff = now - biz.lastCollect;
    const secondsPassed = timeDiff / 1000; // <-- ТЕПЕРЬ В СЕКУНДАХ!
    const stats = getBizStats(biz);
    const profit = stats.income * secondsPassed;
    biz.accumulated += profit;
}

function updateBusinessUI() {
    let totalIncome = 0;

    businessesConfig.forEach(biz => {
        calculateOfflineProfit(biz);
        const stats = getBizStats(biz);
        totalIncome += stats.income;

        // Находим нужный блок по ID
        const cardEl = document.getElementById(`biz-${biz.id}`);
        if (!cardEl) return;

        const isMaxLevel = biz.level >= 5;
        const upgradeBtnText = isMaxLevel ? "МАКС" : `Улучшить (Ур. ${biz.level + 1})`;
        const upgradeCost = isMaxLevel ? 0 : stats.cost;

        cardEl.innerHTML = `
            <img src="${biz.img}" alt="${biz.name}" class="biz-image">
            <div class="biz-body">
                <div class="biz-info">
                    <h4>${biz.name}</h4>
                    <span class="biz-level">Уровень: ${biz.level}/5</span>
                    <p class="biz-income">Доход: ${stats.income.toFixed(2)} 💎/сек</p>
                    <p class="biz-accumulated">Накоплено: ${Math.floor(biz.accumulated)} 💎</p>
                </div>
                <div class="biz-actions">
                    <button class="btn-collect-profit" onclick="collectProfit('${biz.id}')" ${biz.accumulated < 1 ? 'disabled' : ''}>
                        СОБРАТЬ
                    </button>
                    <button class="btn-upgrade-biz" onclick="upgradeBusiness('${biz.id}')" ${isMaxLevel || gems < upgradeCost ? 'disabled' : ''}>
                        ${upgradeBtnText}<br>${isMaxLevel ? '' : upgradeCost + ' 💎'}
                    </button>
                </div>
            </div>
        `;
    });

    const incomeEl = document.getElementById('total-passive-income');
    if(incomeEl) incomeEl.innerText = totalIncome.toFixed(2);
}

// Таймер пассивного дохода (обновляет каждую секунду, даже если вкладка не активна)
setInterval(() => {
    businessesConfig.forEach(biz => {
        const stats = getBizStats(biz);
        biz.accumulated += stats.income;
    });
    saveBusinesses();
    updateBusinessUI(); // <-- ОБНОВЛЯЕМ ВСЕГДА, ЧТОБЫ ВИДЕТЬ ИЗМЕНЕНИЯ
}, 1000);

// === ЛОГИКА ВКЛАДОК ===
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    const buttons = document.querySelectorAll('.tab-btn');
    if(tabName === 'games') buttons[0].classList.add('active');
    if(tabName === 'market') buttons[1].classList.add('active');
    if(tabName === 'business') buttons[2].classList.add('active');
    if(tabName === 'market') updateMarketUI();
    if(tabName === 'business') updateBusinessUI();
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
    if (newBet < 10) newBet = 10;
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
    if (newBet < 10) newBet = 10;
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
    if (btnMinus) btnMinus.disabled = (currentBet <= 10);
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
    // Проверка баланса
    if (currentBet > gems) { 
        currentBet = 50; 
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
        autoSpinCount = 10;
        autoBtn.innerText = "STOP";
        autoBtn.style.background = "linear-gradient(to bottom, #ff4444, #cc0000)";
        spin();
    }
}

function spin() {
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
    let totalWin = 0;
    
    // 👇 ИЗМЕНЕНИЕ: размеры сетки теперь 5x5
    const rows = 5;
    const cols = 5;

    // Проходим по каждой строке
    for (let row = 0; row < rows; row++) {
        // Проходим по каждому столбцу (останавливаемся за 3 до конца, т.к. мин. совпадение 3)
        for (let col = 0; col < cols - 2; col++) {
            
            // Вычисляем индекс первой ячейки в ряду
            const idx = row * cols + col;
            
            const item1 = grid[idx];
            const item2 = grid[idx + 1];
            const item3 = grid[idx + 2];

            // Проверяем, что картинки существуют и совпадают
            if (item1 && item2 && item3 && 
                item1.src === item2.src && 
                item2.src === item3.src) {
                
                let matchCount = 3;
                
                // Проверяем 4-ю картинку, если есть место
                if (col + 3 < cols && grid[idx + 3].src === item1.src) matchCount++;
                
                // Проверяем 5-ю картинку, если есть место
                if (col + 4 < cols && grid[idx + 4].src === item1.src) matchCount++;

                // Берём множитель
                const multiplier = (item1.mult && !isNaN(parseFloat(item1.mult))) ? parseFloat(item1.mult) : 1;

                let winAmount = 0;

                // Формула выигрыша
                if (matchCount === 3) winAmount = currentBet * 1 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * 5 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * 50 * multiplier;

                totalWin += winAmount;
                
                // Пропускаем проверенные ячейки, чтобы не считать одни и те же дважды
                col += matchCount - 1;
            }
        }
    }

    // ... остальной код начисления гемов без изменений ...
    if (totalWin > 0) {
        gems += totalWin;
        resultText.innerText = `ВЫИГРЫШ! +${totalWin} 💎`;
        animateBalanceChange('win');

        if (totalWin >= currentBet * 5) addToLeaderboard(totalWin);
        if (totalWin >= currentBet * 20) showBigWin(totalWin);
    } else {
        resultText.innerText = "Попробуй еще...";
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
    "TEST-VIP": 1,           // Для теста
    "VIP-BRONZE": 1,         // 50₽ → Bronze
    "VIP-SILVER": 2,         // 100₽ → Silver
    "VIP-GOLD": 3,           // 200₽ → Gold
    "VIP-PLATINUM": 4        // 500₽ → Platinum
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
        case 1: return "Bronze";
        case 2: return "Silver";
        case 3: return "Gold";
        case 4: return "Platinum";
        default: return "Игрок";
    }
}

function getLevelName(level) {
    switch(level) {
        case 1: return "Bronze";
        case 2: return "Silver";
        case 3: return "Gold";
        case 4: return "Platinum";
        default: return "Обычный";
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
    
    if (vipLevel >= 1) addMiniSlotCard(slotsGrid, 'ronaldo', 'Ronaldo', 'ronaldo-bg');
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

    // Создаём веса: чем больше множитель — тем меньше шанс
    const weights = items.map(item => {
        const mult = parseFloat(item.mult) || 1;
        // Формула: базовый вес 100, делим на множитель
        // x1 → 100, x2 → 50, x5 → 20, x10 → 10, x20 → 5, x50 → 2
        return Math.max(1, 100 / mult);
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) return items[i];
    }

    return items[0]; // fallback
}


// === ОБЫЧНАЯ СЛУЧАЙНОСТЬ (для совместимости) ===
function getRandomItem(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

// === ЗАПУСК ===
window.onload = () => {
    setBet(currentBet);
    createGrid();
    updateUI();
    loadData();
    loadBusinesses();
    updateMarketUI();
    updateBusinessUI();
    updateLeaderboardUI();
    marketInterval = setInterval(simulateMarket, 3000);
};

function setBet(bet) {
    currentBet = bet;
    updateUI();
}