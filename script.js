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
    brain: [{src: "image/brain/1.jpg", mult: ""}, {src: "image/brain/2.jpg", mult: ""}, {src: "image/brain/3.jpg", mult: "x2"}, {src: "image/brain/4.jpg", mult: ""}, {src: "image/brain/5.jpg", mult: "x3"}, {src: "image/brain/6.jpg", mult: ""}, {src: "image/brain/7.jpg", mult: ""}, {src: "image/brain/8.jpg", mult: "x5"}],
    helin: [{src: "image/helin/1.jpg", mult: ""}, {src: "image/helin/2.jpg", mult: ""}, {src: "image/helin/3.jpg", mult: "x2"}, {src: "image/helin/4.jpg", mult: ""}, {src: "image/helin/5.jpg", mult: "x3"}, {src: "image/helin/6.jpg", mult: ""}, {src: "image/helin/7.jpg", mult: ""}, {src: "image/helin/8.jpg", mult: "x5"}],
    lexapaws: [{src: "image/lexapaws/1.jpg", mult: ""}, {src: "image/lexapaws/2.jpg", mult: ""}, {src: "image/lexapaws/3.jpg", mult: "x2"}, {src: "image/lexapaws/4.jpg", mult: ""}, {src: "image/lexapaws/5.jpg", mult: "x3"}, {src: "image/lexapaws/6.jpg", mult: ""}, {src: "image/lexapaws/7.jpg", mult: ""}, {src: "image/lexapaws/8.jpg", mult: "x5"}],
    litwin: [{src: "image/litwin/1.jpg", mult: ""}, {src: "image/litwin/2.jpg", mult: ""}, {src: "image/litwin/3.jpg", mult: "x2"}, {src: "image/litwin/4.jpg", mult: ""}, {src: "image/litwin/5.jpg", mult: "x3"}, {src: "image/litwin/6.jpg", mult: ""}, {src: "image/litwin/7.jpg", mult: ""}, {src: "image/litwin/8.jpg", mult: "x5"}],
    melstroy: [{src: "image/melstroy/1.jpg", mult: ""}, {src: "image/melstroy/2.jpg", mult: ""}, {src: "image/melstroy/3.jpg", mult: "x2"}, {src: "image/melstroy/4.jpg", mult: ""}, {src: "image/melstroy/5.jpg", mult: "x3"}, {src: "image/melstroy/6.jpg", mult: ""}, {src: "image/melstroy/7.jpg", mult: ""}, {src: "image/melstroy/8.jpg", mult: "x5"}],
    nikkifn: [{src: "image/nikkifn/1.jpg", mult: ""}, {src: "image/nikkifn/2.jpg", mult: ""}, {src: "image/nikkifn/3.jpg", mult: "x2"}, {src: "image/nikkifn/4.jpg", mult: ""}, {src: "image/nikkifn/5.jpg", mult: "x3"}, {src: "image/nikkifn/6.jpg", mult: ""}, {src: "image/nikkifn/7.jpg", mult: ""}, {src: "image/nikkifn/8.jpg", mult: "x5"}],
    rejiboi: [{src: "image/rejiboi/1.jpg", mult: ""}, {src: "image/rejiboi/2.jpg", mult: ""}, {src: "image/rejiboi/3.jpg", mult: "x2"}, {src: "image/rejiboi/4.jpg", mult: ""}, {src: "image/rejiboi/5.jpg", mult: "x3"}, {src: "image/rejiboi/6.jpg", mult: ""}, {src: "image/rejiboi/7.jpg", mult: ""}, {src: "image/rejiboi/8.jpg", mult: "x5"}],
    rostick: [{src: "image/rostick/1.jpg", mult: ""}, {src: "image/rostick/2.jpg", mult: ""}, {src: "image/rostick/3.jpg", mult: "x2"}, {src: "image/rostick/4.jpg", mult: ""}, {src: "image/rostick/5.jpg", mult: "x3"}, {src: "image/rostick/6.jpg", mult: ""}, {src: "image/rostick/7.jpg", mult: ""}, {src: "image/rostick/8.jpg", mult: "x5"}],
    sasich: [{src: "image/sasich/1.jpg", mult: ""}, {src: "image/sasich/2.jpg", mult: ""}, {src: "image/sasich/3.jpg", mult: "x2"}, {src: "image/sasich/4.jpg", mult: ""}, {src: "image/sasich/5.jpg", mult: "x3"}, {src: "image/sasich/6.jpg", mult: ""}, {src: "image/sasich/7.jpg", mult: ""}, {src: "image/sasich/8.jpg", mult: "x5"}],
    skibiditoilet: [{src: "image/skibiditoilet/1.jpg", mult: ""}, {src: "image/skibiditoilet/2.jpg", mult: ""}, {src: "image/skibiditoilet/3.jpg", mult: "x2"}, {src: "image/skibiditoilet/4.jpg", mult: ""}, {src: "image/skibiditoilet/5.jpg", mult: "x3"}, {src: "image/skibiditoilet/6.jpg", mult: ""}, {src: "image/skibiditoilet/7.jpg", mult: ""}, {src: "image/skibiditoilet/8.jpg", mult: "x5"}],
    slovopatsana: [{src: "image/slovopatsana/1.jpg", mult: ""}, {src: "image/slovopatsana/2.jpg", mult: ""}, {src: "image/slovopatsana/3.jpg", mult: "x2"}, {src: "image/slovopatsana/4.jpg", mult: ""}, {src: "image/slovopatsana/5.jpg", mult: "x3"}, {src: "image/slovopatsana/6.jpg", mult: ""}, {src: "image/slovopatsana/7.jpg", mult: ""}, {src: "image/slovopatsana/8.jpg", mult: "x5"}],
    ronaldo: [
        {src: "image/ronaldo/1.jpg", mult: ""},
        {src: "image/ronaldo/2.jpg", mult: "x2"}, 
        {src: "image/ronaldo/3.jpg", mult: "x3"}, 
        {src: "image/ronaldo/4.jpg", mult: "x5"}, 
        {src: "image/ronaldo/5.jpg", mult: "x10"}, 
        {src: "image/ronaldo/6.jpg", mult: "x20"}, 
        {src: "image/ronaldo/7.jpg", mult: "x50"} // SIUUU JACKPOT!
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
    ronaldo: "🐐 RONALDO VIP"
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
    gridEl.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const img = document.createElement('img');
        img.src = ""; 
img.style.background = "#1a1a1a";
img.style.borderRadius = "5px";
        img.style.opacity = '0';
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

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function animateDrop(cells, items, callback) {
    cells.forEach((img, index) => {
        const item = items[index];
        img.style.transition = 'none';
        img.style.transform = 'translateY(-200px)';
        img.style.opacity = '0';
        img.src = item.src;
        const cell = img.parentElement;
        cell.setAttribute('data-multiplier', item.mult || '');
        setTimeout(() => {
            img.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
            img.style.transform = 'translateY(0)';
            img.style.opacity = '1';
        }, index * 30);
    });
    setTimeout(() => callback(), 20 * 30 + 500);
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

    gems -= currentBet;
    updateUI();
    animateBalanceChange('loss');
    isSpinning = true;
    spinBtn.disabled = true;
    
    autoBtn.disabled = true;
    resultText.innerText = "Крутим...";



    if (isSpinning || !currentTheme || gems < currentBet) return;
    gems -= currentBet;
    updateUI();
    animateBalanceChange('loss');
    isSpinning = true;
    spinBtn.disabled = true;
    autoBtn.disabled = true;
    resultText.innerText = "Крутим...";
    const items = themes[currentTheme];
    const cells = document.querySelectorAll('.cell img');
    const finalGrid = [];
    for(let i=0; i<20; i++) finalGrid.push(getRandomItem(items));
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
    const rows = 4;
    const cols = 5;

    // Проверка по строкам
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + 1];
            const item3 = grid[idx + 2];

            if (item1.src === item2.src && item2.src === item3.src) {
                let matchCount = 3;
                if (col + 3 < cols && grid[idx + 3].src === item1.src) matchCount++;
                if (col + 4 < cols && grid[idx + 4].src === item1.src) matchCount++;

                const multiplier = parseFloat(item1.mult) || 1;
                let winAmount = 0;

                if (matchCount === 3) winAmount = currentBet * 1 * multiplier;
                else if (matchCount === 4) winAmount = currentBet * 5 * multiplier;
                else if (matchCount === 5) winAmount = currentBet * 50 * multiplier;

                totalWin += winAmount;
                col += matchCount - 1;
            }
        }
    }

    // Начисляем выигрыш
    if (totalWin > 0) {
        gems += totalWin;
        resultText.innerText = `ВЫИГРЫШ! +${totalWin} 💎`;
        animateBalanceChange('win');

        if (totalWin >= currentBet * 5) {
            addToLeaderboard(totalWin);
        }

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
    "TEST-VIP": true,       // Для теста
    "RONALDO-FAN": true     // Пример реального кода
};

let hasVIPAccess = localStorage.getItem('memeVIPAccess') === 'true';

function checkSecretAccess() {
    // Открываем вкладку secret
    openTab('secret');

    if (vipLevel >= 1) {
        document.getElementById('secret-lock-screen').style.display = 'none';
        document.getElementById('secret-content').style.display = 'block';
        updateSecretContentByLevel();
    } else {
        document.getElementById('secret-lock-screen').style.display = 'block';
        document.getElementById('secret-content').style.display = 'none';
    }
}

function activateVIPCode() {
    const input = document.getElementById('vip-code-input');
    const code = input.value.trim().toUpperCase();
    const messageEl = document.getElementById('vip-message');

    if (vipCodes[code]) {
        // Код верный!
        hasVIPAccess = true;
        localStorage.setItem('memeVIPAccess', 'true');
        
        messageEl.style.color = '#00ff88';
        messageEl.innerText = "✅ Доступ разрешен! Добро пожаловать.";
        
        // Сразу показываем контент
        document.getElementById('secret-lock-screen').style.display = 'none';
        document.getElementById('secret-content').style.display = 'block';
        
        // Обновляем кнопку бонуса
        updateVIPBonusButton();
        
        // Эффект конфетти
        if (typeof fireConfetti === 'function') fireConfetti();
        
        // Очищаем поле ввода
        input.value = '';
    } else {
        messageEl.style.color = '#ff4444';
        messageEl.innerText = "❌ Неверный код! Попробуйте еще раз.";
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