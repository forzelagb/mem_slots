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
let gems = parseInt(localStorage.getItem('memeGems')) || 1000;
let currentBet = parseInt(localStorage.getItem('memeBet')) || 50;
let currentSelectedCoin = 'burmal';
let marketInterval;
let chartInstance = null;
let lastBonusTime = parseInt(localStorage.getItem('lastBonusTime')) || 0;
const BONUS_AMOUNT = 500;
const BONUS_COOLDOWN = 30 * 60 * 1000; // 30 минут

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
    slovopatsana: [{src: "image/slovopatsana/1.jpg", mult: ""}, {src: "image/slovopatsana/2.jpg", mult: ""}, {src: "image/slovopatsana/3.jpg", mult: "x2"}, {src: "image/slovopatsana/4.jpg", mult: ""}, {src: "image/slovopatsana/5.jpg", mult: "x3"}, {src: "image/slovopatsana/6.jpg", mult: ""}, {src: "image/slovopatsana/7.jpg", mult: ""}, {src: "image/slovopatsana/8.jpg", mult: "x5"}]
};

const titles = {
    brain: "🧠 BRAIN ROT", helin: "🎤 HELIN", lexapaws: "🐾 LEXA PAWS", litwin: "🎮 LITWIN",
    melstroy: "👑 MELLSTROY", nikkifn: "🎯 NIKKIFN", rejiboi: "🕺 REJIBOI", rostick: "🌭 ROSTICK",
    sasich: "🗣️ SASICH", skibiditoilet: "🚽 SKIBIDI", slovopatsana: "👊 SLOVO PATSANA"
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
    localStorage.setItem('lastBonusTime', lastBonusTime);
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
        if (gems >= totalCost) {
            gems -= totalCost;
            coin.amount += amount;
            alert(`Куплено ${amount} ${coin.name}`);
        } else { alert("Недостаточно средств!"); }
    } else if (type === 'sell') {
        if (coin.amount >= amount) {
            gems += totalCost;
            coin.amount -= amount;
            alert(`Продано ${amount} ${coin.name}`);
        } else { alert("Недостаточно монет!"); }
    }
    saveData();
    updateUI();
    updateMarketUI();
}

function updateMarketUI() {
    const coin = coinsConfig[currentSelectedCoin];
    document.getElementById('display-name').innerText = coin.name;
    document.getElementById('display-price').innerText = coin.currentPrice.toFixed(2) + ' ₽';
    document.getElementById('display-amount').innerText = coin.amount;
    document.getElementById('display-value').innerText = (coin.amount * coin.currentPrice).toFixed(2);

    const lastPrice = coin.history[coin.history.length - 2] || coin.currentPrice;
    const changePercent = ((coin.currentPrice - lastPrice) / lastPrice) * 100;
    const changeEl = document.getElementById('display-change');
    
    changeEl.innerText = (changePercent >= 0 ? '+' : '') + changePercent.toFixed(2) + '%';
    changeEl.className = 'coin-change ' + (changePercent >= 0 ? 'up' : 'down');

    updateChart(coin);
}

function updateChart(coin) {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    const isUp = coin.currentPrice >= (coin.history[coin.history.length - 2] || coin.currentPrice);
    const color = isUp ? '#00ff88' : '#ff4444';

    chartInstance = new Chart(ctx, {
        type: 'line',
         {
            labels: coin.history.map((_, i) => i),
            datasets: [{
                label: 'Цена',
                 coin.history,
                borderColor: color,
                backgroundColor: isUp ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } }
            },
            animation: { duration: 0 }
        }
    });
}

// === НАКОПИТЕЛЬНЫЙ БОНУС ===
function checkAndGiveBonus() {
    let now = Date.now();
    let timePassed = now - lastBonusTime;
    const bonusBtn = document.getElementById('claim-bonus-btn');
    const timerDisplay = document.getElementById('bonus-timer');

    if (timePassed >= BONUS_COOLDOWN) {
        if (bonusBtn) {
            bonusBtn.disabled = false;
            bonusBtn.innerText = `ЗАБРАТЬ ${BONUS_AMOUNT} 💎`;
            bonusBtn.onclick = () => {
                gems += BONUS_AMOUNT;
                lastBonusTime = Date.now();
                saveData();
                updateUI();
                checkAndGiveBonus();
                alert(`Бонус получен!`);
            };
        }
        if (timerDisplay) timerDisplay.innerText = "Готово!";
    } else {
        let timeLeft = Math.ceil((BONUS_COOLDOWN - timePassed) / 1000);
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        if (bonusBtn) {
            bonusBtn.disabled = true;
            bonusBtn.innerText = `ЖДИ: ${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
            bonusBtn.onclick = null;
        }
        if (timerDisplay) timerDisplay.innerText = `${minutes}м ${seconds}с`;
        setTimeout(checkAndGiveBonus, 1000);
    }
}

// === ЛОГИКА ИГРЫ (СТАВКИ И СПИН) ===
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
        img.src = "https://via.placeholder.com/150/000000/FFFFFF?text=?";
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
    document.getElementById('lobby-balance').innerText = gems;
    document.getElementById('game-balance').innerText = gems;
    const betDisplay = document.getElementById('bet-value-display');
    if (betDisplay) betDisplay.innerText = currentBet;
    currentCostEl.innerText = currentBet;
    
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
        spinBtn.disabled = true;
        spinBtn.innerHTML = `НЕ ХВАТАЕТ<br><span class="cost">Нужно ${currentBet} 💎</span>`;
        autoBtn.disabled = true;
    } else {
        spinBtn.disabled = false;
        spinBtn.innerHTML = `SPIN <br><span class="cost">-${currentBet} 💎</span>`;
        autoBtn.disabled = false;
    }
}

function startGame(themeName) {
    if (currentBet > gems) { currentBet = 50; saveData(); }
    if (gems < currentBet) {
        if (gems <= 0) {
            gems += 100; saveData(); updateUI();
            alert("Банкрот! Дали 100 гемов.");
        } else { return; }
    }

    currentTheme = themeName;
    slotTitle.innerText = titles[themeName];
    lobbyScreen.classList.remove('active');
    gameScreen.classList.add('active');
    createGrid();
    updateUI();
    resultText.innerText = "Нажми SPIN!";
    autoSpinActive = false;
    autoBtn.innerText = "AUTO";
}

function goBack() {
    gameScreen.classList.remove('active');
    lobbyScreen.classList.add('active');
    autoSpinActive = false;
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

let isSpinning = false;
let autoSpinActive = false;
let autoSpinCount = 0;

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
    let hasBigWin = false;
    for (let row = 0; row < 4; row++) {
        let startIndex = row * 5;
        let rowItems = grid.slice(startIndex, startIndex + 5);
        for (let col = 0; col <= 2; col++) {
            let matchCount = 1;
            let multiplier = 1;
            for (let k = col + 1; k < 5; k++) {
                if (rowItems[k].src === rowItems[col].src) {
                    matchCount++;
                    if (rowItems[k].mult) multiplier *= parseInt(rowItems[k].mult.replace('x', ''));
                } else break;
            }
            if (matchCount >= 3) {
                let winAmount = 0;
                if (matchCount === 3) winAmount = currentBet * 1;
                else if (matchCount === 4) winAmount = currentBet * 5 * multiplier;
                else if (matchCount === 5) { winAmount = currentBet * 50 * multiplier; hasBigWin = true; }
                totalWin += winAmount;
                col += matchCount - 1;
            }
        }
    }
    if (totalWin > 0) {
        gems += totalWin;
        resultText.innerText = `ВЫИГРЫШ! +${totalWin} 💎`;
        animateBalanceChange('win');
        if (hasBigWin || totalWin >= currentBet * 20) showBigWin(totalWin);
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

// === ЗАПУСК ===
window.onload = () => {
    setBet(currentBet); // Функция setBet теперь просто обновляет UI, так как логика в adjustBet
    createGrid();
    updateUI();
    loadData();
    updateMarketUI();
    checkAndGiveBonus();
    marketInterval = setInterval(simulateMarket, 3000);
};

// Вспомогательная функция для начальной ставки
function setBet(bet) {
    currentBet = bet;
    updateUI();
}