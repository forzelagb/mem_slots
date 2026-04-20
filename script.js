// === КОНФИГУРАЦИЯ БИЗНЕСОВ ===
const cardRarity = {
 "1.jpg":"common",
 "2.jpg":"common",
 "3.jpg":"rare",
 "4.jpg":"rare",
 "5.jpg":"epic",
 "6.jpg":"epic",
 "7.jpg":"legendary",
 "8.jpg":"legendary"
};
const cardDisplayNames = {
    "1.jpg": "Card I",
    "2.jpg": "Card II",
    "3.jpg": "Card III",
    "4.jpg": "Card IV",
    "5.jpg": "Card V",
    "6.jpg": "Card VI",
    "7.jpg": "Card VII",
    "8.jpg": "Card VIII"
};
const orderedThemes = [
    'brain',
    'helin',
    'lexapaws',
    'litwin',
    'melstroy',
    'nikkifn',
    'rejiboi',
    'rostick',
    'sasich',
    'skibiditoilet',
    'slovopatsana'
];
let vipLevel = 0;

const progressPaths = {
 common: [50,150,400,900,1800,3500],
 rare: [30,100,250,600,1300,2600],
 epic: [15,50,140,350,800,1700],
 legendary: [8,20,60,150,350,900]
};
const coinsConfig = {
    defaultCoins: 0
};
const collectionGroups = [
    {
        id: 'streamers',
        title: '🔥 Meme Streamers',
        themes: ['helin', 'melstroy', 'lexapaws']
    },
    {
        id: 'internet',
        title: '🌐 Internet Memes',
        themes: ['brain', 'skibiditoilet', 'slovopatsana']
    },
    {
        id: 'random',
        title: '🎲 Random Pack',
        themes: ['rostick', 'sasich', 'rejiboi', 'nikkifn', 'litwin']
    }
];

function playRollSound() {
}

function stopRollSound() {
}

function playResultSound() {
}

function playRareHitSound() {
}

function stopRareHitSound() {
}
let isBigWinSoundPlaying = false;

// === ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
let currentEnergyCost = 1;
let chartInstance = null;
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
ronaldo: "🐐 RONALDO",
shrek: "🟢 SHREK",
spongebob: "🧽 SPONGEBOB",
speed: "⚡ SPEED",
};

// === ЭЛЕМЕНТЫ DOM ===
const lobbyScreen = document.getElementById('lobby-screen');
const gameScreen = document.getElementById('game-screen');
const gridEl = document.getElementById('grid');
const resultText = document.getElementById('result-text');
const spinBtn = document.getElementById('spin-btn');
const winModal = document.getElementById('win-modal');
const modalAmount = document.getElementById('modal-amount');
const slotTitle = document.getElementById('slot-title');


function renderAllThemesCollection() {
    const listEl = document.getElementById('collection-theme-list');
    const homeView = document.getElementById('collection-home-view');
    const detailView = document.getElementById('collection-detail-view');

    if (!listEl || !homeView || !detailView) return;

    homeView.style.display = 'block';
    detailView.style.display = 'none';
    listEl.innerHTML = '';

    orderedThemes.forEach(themeName => {
        const preview = getThemePreviewImage(themeName);
        const data = getThemeCompletionData(themeName);
        const themeTitle = titles[themeName] || themeName;

const card = document.createElement('div');
card.className = `theme-showcase-card theme-${themeName} ${data.percent >= 100 ? 'theme-showcase-complete' : ''}`;
        card.onclick = () => openThemeDetail(themeName);

        card.innerHTML = `
            <div class="theme-showcase-cover-wrap">
                <img class="theme-showcase-cover" src="${preview}" alt="${themeTitle}">
            </div>

            <div class="theme-showcase-main">
                <div class="theme-showcase-row">
                    <div class="theme-showcase-title">${themeTitle}</div>
                    <div class="theme-showcase-percent">${data.percent}%</div>
                </div>

                <div class="theme-showcase-subtitle">
                    Собрано ${data.completed} из ${data.total} карточек
                </div>

                <div class="theme-showcase-progress">
                    <div class="theme-showcase-progress-fill" style="width:${data.percent}%"></div>
                </div>
            </div>
        `;

        listEl.appendChild(card);
    });
}

function closeThemeDetail() {
    const homeView = document.getElementById('collection-home-view');
    const detailView = document.getElementById('collection-detail-view');

    if (!homeView || !detailView) return;

    detailView.style.display = 'none';
    homeView.style.display = 'block';

    renderAllThemesCollection();
}

function getRewardMilestones(cardKey) {
    ensureCardProgressExists(cardKey);

    const fileName = cardKey.split(':')[1];
    const rarity = cardRarity[fileName];
    return progressPaths[rarity] || [];
}

function openThemeDetail(themeName) {
    const homeView = document.getElementById('collection-home-view');
    const detailView = document.getElementById('collection-detail-view');
    const heroEl = document.getElementById('collection-detail-hero');
    const gridEl = document.getElementById('collection-detail-grid');

    if (!homeView || !detailView || !heroEl || !gridEl) return;

    homeView.style.display = 'none';
    detailView.style.display = 'block';
    heroEl.innerHTML = '';
    gridEl.innerHTML = '';

    const data = getThemeCompletionData(themeName);
    const themeTitle = titles[themeName] || themeName;
    const preview = getThemePreviewImage(themeName);
    const completedTheme = isThemeCompleted(themeName);

    heroEl.className = `collection-detail-hero theme-${themeName}`;
    heroEl.innerHTML = `
        <div class="collection-detail-hero-cover">
            <img src="${preview}" alt="${themeTitle}">
        </div>

        <div class="collection-detail-hero-body">
            <div class="collection-detail-hero-title">${themeTitle}</div>
            <div class="collection-detail-hero-subtitle">Собрано ${data.completed} из ${data.total} карточек</div>

            <div class="collection-detail-hero-progress">
                <div class="collection-detail-hero-progress-fill" style="width:${data.percent}%"></div>
            </div>

            <div class="collection-detail-hero-percent">${data.percent}% завершено</div>
            ${completedTheme ? `<div class="theme-complete-badge">ULTIMATE THEME REWARD UNLOCKED</div>` : ``}
        </div>
    `;

    const items = themes[themeName] || [];

    items.forEach((item, index) => {
        const fileName = getFileNameFromSrc(item.src);
        const cardKey = getCardKey(themeName, item.src);
        const rarity = cardRarity[fileName];
        const progress = playerData.cards?.[cardKey] || 0;
        const nextValue = getNextMilestoneValue(cardKey);
        const stage = getCurrentStage(cardKey);
        const milestones = getRewardMilestones(cardKey);
        const percentToNext = Math.max(0, Math.min(100, (progress / nextValue) * 100));

const status = getCardStatus(cardKey);

const milestoneRail = milestones.map((value, i) => {
    const stageIndex = i + 1;
    const done = progress >= value;
    const active = !done && value === nextValue;
    const rewardLabel = getMilestoneRewardLabel(stageIndex);

    return `
        <div class="milestone-item">
            <div 
                class="milestone-dot ${done ? 'done' : ''} ${active ? 'active' : ''}" 
                title="${rewardLabel}"
            ></div>
            <div class="milestone-label">${rewardLabel}</div>
        </div>
    `;
}).join('');

const card = document.createElement('div');
card.className = `collection-card-detail rarity-${rarity} status-${status}`;

card.innerHTML = `
    <div class="collection-card-detail-image-wrap">
        <img src="${item.src}" alt="${fileName}">
    </div>

    <div class="collection-card-detail-body">
        <div class="collection-card-detail-topline">
            <div class="collection-card-detail-name">${cardDisplayNames[fileName] || fileName}</div>
            <div class="collection-card-detail-rarity">${rarity}</div>
        </div>

        <div class="collection-card-detail-status ${status}">
            ${status === 'completed' ? 'COMPLETED' : status === 'in progress' ? 'IN PROGRESS' : 'LOCKED'}
        </div>

        <div class="collection-card-detail-progress-text">
            ${progress} / ${nextValue}
        </div>

        <div class="collection-card-detail-progress-bar">
            <div class="collection-card-detail-progress-fill" style="width:${percentToNext}%"></div>
        </div>

        <div class="collection-card-detail-stage">
            Уровень: ${stage}
        </div>

        <div class="milestone-rail">
            ${milestoneRail}
        </div>
    </div>
`;

        gridEl.appendChild(card);
    });
}
// === ЛОГИКА ВКЛАДОК ===
function openTab(tabName) {
    const tab = document.getElementById('tab-' + tabName);
    if (!tab) return;

    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    tab.classList.add('active');

    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
        const onclick = btn.getAttribute('onclick') || '';
        return onclick.includes(`openTab('${tabName}')`);
    });

    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    if (tabName === 'collection') {
        renderAllThemesCollection();
    }
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


function clearHighlightedCells() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('win-cell');
    });
}

function highlightWinningCells(indexes) {
    indexes.forEach(index => {
        const cell = document.querySelectorAll('.cell')[index];
        if (cell) {
            cell.classList.add('win-cell');
        }
    });
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

    const energy = playerData.resources?.energy ?? 0;

    if (lobbyBal) lobbyBal.innerText = energy;
    if (gameBal) gameBal.innerText = energy;

    if (!spinBtn) return;

    if (energy < currentEnergyCost) {
        spinBtn.disabled = true;
        spinBtn.classList.remove('ready-pulse');
        spinBtn.innerHTML = `НЕТ ЭНЕРГИИ`;
    } else {
        spinBtn.disabled = false;
        if (!isSpinning) {
            spinBtn.classList.add('ready-pulse');
        }
        spinBtn.innerHTML = `PLAY`;
    }
}

function startGame(themeName) {
    applyVIPTheme(themeName);

    // Устанавливаем тему
    currentTheme = themeName;
    slotTitle.innerText = titles[themeName];
    
    // Переключаем экраны
    lobbyScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Создаём сетку и обновляем UI
    createGrid();
    updateUI();
    resultText.innerText = "Запусти игру!";

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

    // Скрываем счётчик лимита Ronaldo
    const limitEl = document.getElementById('ronaldo-win-limit-display');
    if (limitEl) {
        limitEl.style.display = 'none';
    }
}

function animateDrop(cells, items, callback) {
    cells.forEach((img, index) => {
        const item = items[index];
        if (!item) return;

        img.style.transition = 'none';
        img.style.transform = 'translateY(-200px)';
        img.style.opacity = '0';
        img.src = item.src;
        img.style.background = 'transparent';

        const cell = img.parentElement;
        cell.setAttribute('data-multiplier', item.mult || '');

        let delay = index * 30;

        // последние 3 клетки падают медленнее
        if (index >= cells.length - 3) {
            const extraIndex = index - (cells.length - 3); // 0,1,2
            delay += extraIndex * 200;
        }

        setTimeout(() => {
            const isLastCell = index === cells.length - 1;

            img.style.transition = isLastCell
                ? 'transform 0.9s cubic-bezier(0.2, 1.5, 0.5, 1), opacity 0.3s ease'
                : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';

            img.style.transform = 'translateY(0)';
            img.style.opacity = '1';

            // звук последней клетки
            if (isLastCell) {
    stopRollSound();
    playResultSound();
}
        }, delay);
    });

    // финальное время анимации с учётом последних 3 клеток
    const animationTime = (cells.length - 1) * 30 + 400 + 900;

    setTimeout(() => {
        callback();
    }, animationTime);
}


let currentWheelRotation = 0;

function getWeightedWheelReward() {
    const totalWeight = wheelRewards.reduce((sum, reward) => sum + reward.weight, 0);
    let random = Math.random() * totalWeight;

    for (const reward of wheelRewards) {
        random -= reward.weight;
        if (random <= 0) return reward;
    }

    return wheelRewards[0];
}
function renderWheelTrack() {
    renderCircleWheel();
    renderWheelRewardsPreview();
}

function renderCircleWheel() {
    const wheelEl = document.getElementById('vip-wheel');
    if (!wheelEl) return;

const wheelSegments = [
    wheelRewards.find(r => r.id === 'gems700'),
    wheelRewards.find(r => r.id === 'ticket1'),
    wheelRewards.find(r => r.id === 'gems5000'),
    wheelRewards.find(r => r.id === 'auto1'),
    wheelRewards.find(r => r.id === 'gems12000'),
    wheelRewards.find(r => r.id === 'shield1'),
    wheelRewards.find(r => r.id === 'gemBooster'),
    wheelRewards.find(r => r.id === 'doubleRoll1'),
    wheelRewards.find(r => r.id === 'gems25000'),
    wheelRewards.find(r => r.id === 'auto2'),
    wheelRewards.find(r => r.id === 'hrpass2'),
    wheelRewards.find(r => r.id === 'secretBox'),
    wheelRewards.find(r => r.id === 'secretKey')
].filter(Boolean);

    const segmentAngle = 360 / wheelSegments.length;
    wheelEl.innerHTML = '';

    wheelSegments.forEach((reward, index) => {
        const segment = document.createElement('div');
        segment.className = `vip-wheel-segment ${reward.rarity}${(reward.rarity === 'legendary' || reward.rarity === 'mythic') ? ' glow' : ''}`;

        const rotate = index * segmentAngle - 90 - segmentAngle / 2;
        segment.style.transform = `rotate(${rotate}deg) skewY(${90 - segmentAngle}deg)`;

        const content = document.createElement('div');
        content.className = 'vip-wheel-segment-content';
        content.style.transform = `skewY(-${90 - segmentAngle}deg) rotate(${segmentAngle / 2}deg)`;

        content.innerHTML = `
            <div class="vip-wheel-segment-icon">${reward.icon}</div>
            <div class="vip-wheel-segment-label">${reward.label}</div>
        `;

        segment.appendChild(content);
        wheelEl.appendChild(segment);
    });

    wheelEl.dataset.segmentIds = JSON.stringify(wheelSegments.map(r => r.id));
    wheelEl.style.transform = `rotate(${currentWheelRotation}deg)`;
}

function renderWheelRewardsPreview() {
    const previewEl = document.getElementById('vip-wheel-rewards-preview');
    if (!previewEl) return;

    previewEl.innerHTML = '';

    wheelRewards.forEach(reward => {
        const item = document.createElement('div');
        item.className = `vip-wheel-preview-item ${reward.rarity}`;
        item.innerHTML = `
            <div class="vip-wheel-preview-icon">${reward.icon}</div>
            <div class="vip-wheel-preview-label">${reward.label}</div>
        `;
        previewEl.appendChild(item);
    });
}

function getWheelRewardById(id) {
    return wheelRewards.find(item => item.id === id);
}


let currentStreakCard = null;
let currentStreakCount = 0;

function getFileNameFromSrc(src) {
    if (!src) return "";
    return src.split("/").pop();
}
function getCardKey(theme, src) {
    const fileName = getFileNameFromSrc(src);
    return `${theme}:${fileName}`;
}

function getCardRarityBySrc(src) {
    const fileName = getFileNameFromSrc(src);
    return cardRarity[fileName];
}
function getSelectedCollectionTheme() {
    const select = document.getElementById('collection-theme-select');
    if (!select) return currentTheme || 'brain';
    return select.value || 'brain';
}

function getCurrentStage(cardKey) {
    ensureCardProgressExists(cardKey);

    const fileName = cardKey.split(":")[1];
    const rarity = cardRarity[fileName];
    const path = progressPaths[rarity] || [];
    const progress = playerData.cards[cardKey] || 0;

    let stage = 0;
    for (let i = 0; i < path.length; i++) {
        if (progress >= path[i]) {
            stage = i + 1;
        }
    }
    return stage;
}

function getNextMilestoneValue(cardKey) {
    ensureCardProgressExists(cardKey);

    const fileName = cardKey.split(":")[1];
    const rarity = cardRarity[fileName];
    const path = progressPaths[rarity] || [];
    const progress = playerData.cards[cardKey] || 0;

    for (let i = 0; i < path.length; i++) {
        if (progress < path[i]) {
            return path[i];
        }
    }

    return path[path.length - 1] || 1;
}

function renderCollectionScreen() {
    const grid = document.getElementById('collection-grid');
    const energyEl = document.getElementById('collection-energy');
    const styleCoinsEl = document.getElementById('collection-style-coins');
    const summaryEl = document.getElementById('collection-summary');

    if (!grid || !energyEl || !styleCoinsEl || !summaryEl) return;

    const themeName = getSelectedCollectionTheme();
    const themeItems = themes[themeName] || [];

    energyEl.innerText = playerData.resources?.energy ?? 0;
    styleCoinsEl.innerText = playerData.resources?.styleCoins ?? 0;

    grid.innerHTML = '';

    let completedCount = 0;

    themeItems.forEach((item, index) => {
        const fileName = getFileNameFromSrc(item.src);
        const cardKey = getCardKey(themeName, item.src);

        ensureCardProgressExists(cardKey);

        const rarity = cardRarity[fileName];
        const progress = playerData.cards[cardKey] || 0;
        const stage = getCurrentStage(cardKey);
        const nextValue = getNextMilestoneValue(cardKey);
        const percent = Math.max(0, Math.min(100, (progress / nextValue) * 100));
        const isCompleted = stage >= (progressPaths[rarity]?.length || 0);

        if (isCompleted) {
            completedCount += 1;
        }

        const card = document.createElement('div');
        card.className = 'collection-card';

        card.innerHTML = `
            <img src="${item.src}" alt="card ${index + 1}">
            <div class="collection-card-body">
                <div class="collection-card-title">
                    Карточка ${index + 1}
                    <span class="collection-rarity-${rarity}">• ${rarity}</span>
                </div>

                <div class="collection-card-meta">
                    Прогресс: ${progress} / ${nextValue}
                </div>

                <div class="collection-progress-bar">
                    <div class="collection-progress-fill" style="width: ${percent}%"></div>
                </div>

                <div class="collection-card-meta">
                    Этап: ${stage} ${isCompleted ? '• completed' : ''}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    summaryEl.innerText = `Прогресс темы: ${completedCount} / ${themeItems.length}`;
}

function getMatchRewardAmount(matchCount) {
    if (matchCount === 3) return 3;
    if (matchCount === 4) return 5;
    if (matchCount >= 5) return 8;
    return 0;
}
function ensureCardProgressExists(cardKey) {
    if (!playerData.cards) {
        playerData.cards = {};
    }

    if (typeof playerData.cards[cardKey] !== "number") {
        playerData.cards[cardKey] = 0;
    }

    if (!playerData.claimedRewards) {
        playerData.claimedRewards = {};
    }

    if (!playerData.resources) {
        playerData.resources = {};
    }

    if (typeof playerData.resources.energy !== "number") {
        playerData.resources.energy = 100;
    }

    if (typeof playerData.resources.maxEnergy !== "number") {
        playerData.resources.maxEnergy = 100;
    }

    if (typeof playerData.resources.styleCoins !== "number") {
        playerData.resources.styleCoins = 0;
    }
}



function addCardProgress(cardKey, amount) {
    ensureCardProgressExists(cardKey);

    playerData.cards[cardKey] += amount;

    checkMilestones(cardKey);
}

function rewardMilestone(cardKey, stage) {
    const rewardKey = `${cardKey}_stage_${stage}`;

    if (playerData.claimedRewards[rewardKey]) return;

    playerData.claimedRewards[rewardKey] = true;

    let coins = 0;
    let energyBonus = 0;

    if (stage === 1) {
        energyBonus = 5;
    } else if (stage === 2) {
        coins = 2;
    } else if (stage === 3) {
        coins = 4;
    } else if (stage === 4) {
        coins = 7;
    } else if (stage === 5) {
        coins = 12;
    } else if (stage === 6) {
        coins = 20;
    }

    if (coins > 0) {
        playerData.resources.styleCoins += coins;
    }

    if (energyBonus > 0) {
        playerData.resources.energy = Math.min(
            playerData.resources.maxEnergy,
            playerData.resources.energy + energyBonus
        );
    }
}

function checkMilestones(cardKey) {
    ensureCardProgressExists(cardKey);

    const fileName = cardKey.split(":")[1];
    const rarity = cardRarity[fileName];
    const path = progressPaths[rarity];
    const progress = playerData.cards[cardKey];

    if (!path) return;

    for (let i = 0; i < path.length; i++) {
        if (progress >= path[i]) {
            rewardMilestone(cardKey, i + 1);
        }
    }
}

function updateCardStreak(cardKey) {
    let streakBonus = 0;

    if (!cardKey) {
        currentStreakCard = null;
        currentStreakCount = 0;
        return streakBonus;
    }

    if (currentStreakCard === cardKey) {
        currentStreakCount += 1;
    } else {
        currentStreakCard = cardKey;
        currentStreakCount = 1;
    }

    if (currentStreakCount === 3) {
        streakBonus = 2;
        addCardProgress(cardKey, 3);
    } else if (currentStreakCount === 5) {
        streakBonus = 5;
        addCardProgress(cardKey, 4);
    }

    return streakBonus;
}


function spin() {
    console.log("=== DEBUG SPIN ===");
    console.log("Тема:", currentTheme);
    console.log("Количество картинок в теме:", themes[currentTheme]?.length);
    console.log("Функция getRandomWeightedItem существует?", typeof getRandomWeightedItem === 'function');

    const currentEnergy = playerData.resources?.energy ?? 0;

    if (isSpinning || !currentTheme || currentEnergy < currentEnergyCost) return;

    stopRareHitSound();
    playRollSound();

    const items = themes[currentTheme];
    if (!items || items.length === 0) {
        alert("Ошибка: тема не найдена!");
        stopRollSound();
        return;
    }

    const finalGrid = [];
    for (let i = 0; i < 25; i++) {
        finalGrid.push(getRandomWeightedItem(items));
    }

    playerData.resources.energy -= currentEnergyCost;
    savePlayer();

    updateUI();
    animateBalanceChange('loss');

    isSpinning = true;
    spinBtn.disabled = true;

    if (spinBtn) {
        spinBtn.classList.remove('ready-pulse');
        spinBtn.innerHTML = `КРУТИМ...`;
    }

    resultText.innerText = getRandomItem([
        "Крутим барабаны...",
        "Смотрим удачу...",
        "Символы летят...",
        "Сейчас будет жарко..."
    ]);

    const cells = Array.from(document.querySelectorAll('.slot-img'));
    hideRewardPreview();
    animateDrop(cells, finalGrid, () => {
        checkWins(finalGrid);

        isSpinning = false;
        updateUI();
    });
}
function checkWins(grid) {
    clearHighlightedCells();

    let totalEnergyReward = 0;
    let totalXpReward = 1; // базовый XP за сам спин
    const rows = 5;
    const cols = 5;
    const allWinningIndexes = new Set();

    let spinMainMatchedCard = null;
    let spinMainMatchedCount = 0;
    const rewardedCards = [];

    function addIndexesToHighlight(indexes) {
        indexes.forEach(i => allWinningIndexes.add(i));
    }

    function registerMatch(item, matchCount, indexes) {
        const rewardAmount = getMatchRewardAmount(matchCount);
        const fileName = getFileNameFromSrc(item.src);
        const cardKey = getCardKey(currentTheme, item.src);

        totalEnergyReward += rewardAmount;
        totalXpReward += matchCount;

        addCardProgress(cardKey, matchCount);

        rewardedCards.push({
            cardKey,
            fileName,
            amount: rewardAmount,
            matchCount
        });

        if (matchCount > spinMainMatchedCount) {
            spinMainMatchedCount = matchCount;
            spinMainMatchedCard = cardKey;
        }

        addIndexesToHighlight(indexes);
    }

    // ГОРИЗОНТАЛЬНЫЕ ЛИНИИ
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + 1];
            const item3 = grid[idx + 2];

            if (item1 && item2 && item3 && item1.src === item2.src && item2.src === item3.src) {
                let matchCount = 3;

                if (col + 3 < cols && grid[idx + 3] && grid[idx + 3].src === item1.src) matchCount++;
                if (col + 4 < cols && grid[idx + 4] && grid[idx + 4].src === item1.src) matchCount++;

                const winIndexes = [];
                for (let i = 0; i < matchCount; i++) {
                    winIndexes.push(idx + i);
                }

                registerMatch(item1, matchCount, winIndexes);
                col += matchCount - 1;
            }
        }
    }

    // ВЕРТИКАЛЬНЫЕ ЛИНИИ
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 2; row++) {
            const idx = row * cols + col;
            const item1 = grid[idx];
            const item2 = grid[idx + cols];
            const item3 = grid[idx + cols * 2];

            if (item1 && item2 && item3 && item1.src === item2.src && item2.src === item3.src) {
                let matchCount = 3;

                if (row + 3 < rows && grid[idx + cols * 3] && grid[idx + cols * 3].src === item1.src) matchCount++;
                if (row + 4 < rows && grid[idx + cols * 4] && grid[idx + cols * 4].src === item1.src) matchCount++;

                const winIndexes = [];
                for (let i = 0; i < matchCount; i++) {
                    winIndexes.push(idx + cols * i);
                }

                registerMatch(item1, matchCount, winIndexes);
                row += matchCount - 1;
            }
        }
    }

    highlightWinningCells([...allWinningIndexes]);

    let streakBonus = 0;

    if (spinMainMatchedCard) {
        streakBonus = updateCardStreak(spinMainMatchedCard);
        totalEnergyReward += streakBonus;
    } else {
        currentStreakCard = null;
        currentStreakCount = 0;
    }

    if (totalEnergyReward > 0) {
        playerData.resources.energy = Math.min(
            playerData.resources.maxEnergy,
            playerData.resources.energy + totalEnergyReward
        );
        animateBalanceChange('win');
    }

    addXP(totalXpReward);
    savePlayer();

if (rewardedCards.length > 0) {
    const firstReward = rewardedCards[0];

    showRewardPreview({
        src: `image/${currentTheme}/${firstReward.fileName}`,
        fileName: firstReward.fileName,
        amount: firstReward.amount,
        matchCount: firstReward.matchCount,
        xp: totalXpReward,
        streakBonus
    });

    let text = `+${firstReward.amount} к прогрессу ${firstReward.fileName}`;

    if (firstReward.matchCount === 4) {
        text = `Совпадение x4 • +${firstReward.amount} к прогрессу ${firstReward.fileName}`;
    }

    if (firstReward.matchCount >= 5) {
        text = `Совпадение x5 • +${firstReward.amount} к прогрессу ${firstReward.fileName}`;
    }

    text += ` • +${totalXpReward} XP`;

    if (streakBonus > 0) {
        text += ` • Серия +${streakBonus} энергии`;
    }

    resultText.innerText = text;
} else {
    hideRewardPreview();
    resultText.innerText = `Нет совпадений • +${totalXpReward} XP • серия сброшена`;
}

    updateUI();
    renderCollectionScreen();
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
    stopRollSound();

    modalAmount.innerText = amount;
    winModal.classList.add('active');

    const slotContainer = document.querySelector('.slot-container');
    if (slotContainer) {
        slotContainer.classList.add('win-pulse');
    }

    fireConfetti();
    playRareHitSound();
}

function closeModal() {
    stopRareHitSound();

    winModal.classList.remove('active');

    const slotContainer = document.querySelector('.slot-container');
    if (slotContainer) {
        slotContainer.classList.remove('win-pulse');
    }
}
let leaderboard = [];
let leaderboardMode = 'theme';
let myLeaderboardRank = null;
let myLeaderboardRecord = null;

async function addToLeaderboard(amount) {
    if (amount <= 0 || !currentUser || !currentTheme) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU') + ' ' +
        now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    try {
        const { doc, getDoc, setDoc, serverTimestamp } = window.fbFns;
        const db = window.firebaseDb;

        const recordId = `${currentTheme}_${currentUser.uid}`;
        const ref = doc(db, "leaderboard", recordId);
        const snap = await getDoc(ref);

        let oldBest = 0;
        if (snap.exists()) {
            oldBest = snap.data().bestWin || 0;
        }

        await setDoc(ref, {
            uid: currentUser.uid,
            nickname: playerProfile?.nickname || "Игрок",
            vipLevel: vipLevel || 0,
            theme: currentTheme,
            bestWin: Math.max(oldBest, amount),
            lastWin: amount,
            lastWinDate: dateStr,
            updatedAt: serverTimestamp()
        }, { merge: true });

        await loadThemeLeaderboard(currentTheme);
    } catch (error) {
        console.error("Ошибка сохранения лидерборда:", error);
    }
}

function updateLeaderboardUI() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!leaderboard || leaderboard.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="leaderboard-empty">
                    <div class="leaderboard-empty-box">
                        <div class="leaderboard-empty-icon">🏆</div>
                        <div class="leaderboard-empty-title">Пока нет рекордов</div>
                        <div class="leaderboard-empty-subtitle">Стань первым игроком в этом режиме</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    leaderboard.forEach((record, index) => {
        const row = document.createElement('tr');

        const isMe = currentUser && record.uid === currentUser.uid;

        let rankIcon = `${index + 1}`;
        let rankClass = 'rank-default';

        if (index === 0) {
            rankIcon = '🥇';
            rankClass = 'rank-gold';
        } else if (index === 1) {
            rankIcon = '🥈';
            rankClass = 'rank-silver';
        } else if (index === 2) {
            rankIcon = '🥉';
            rankClass = 'rank-bronze';
        }

        row.className = `leaderboard-row ${index < 3 ? 'top-row' : ''} ${isMe ? 'current-user-row' : ''}`;

const scoreValue = leaderboardMode === 'gems'
    ? (record.gems || 0).toLocaleString()
    : (record.bestWin || 0).toLocaleString();

        row.innerHTML = `
            <td>
                <div class="leaderboard-rank ${rankClass}">
                    ${rankIcon}
                </div>
            </td>
            <td>
                <div class="leaderboard-player">
                    <div class="leaderboard-avatar">
                        ${(record.nickname || 'И')[0].toUpperCase()}
                    </div>
                    <div class="leaderboard-player-meta">
                        <div class="leaderboard-player-name">
                            ${record.nickname || 'Игрок'}
                            ${isMe ? '<span class="me-badge">Ты</span>' : ''}
                        </div>
                        <div class="leaderboard-player-theme">
                            ${leaderboardMode === 'gems' ? 'Общий баланс' : (record.theme || '')}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div class="leaderboard-score ${isMe ? 'current-user-score' : ''}">
                    ${scoreValue} <span>💎</span>
                </div>
            </td>
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

            saveData();
            updateVIPZoneUI();

            messageEl.style.color = '#00ff88';
            messageEl.innerText = `✅ Код принят! Уровень ${getLevelName(vipLevel)} активирован.`;

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

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastVIPBonusTime < oneDay) {
        alert("⏳ VIP-бонус доступен только раз в 24 часа.");
        updateVIPZoneUI();
        updateVIPBonusButton();
        return;
    }

    const reward = getVIPDailyBonus();

    gems += reward;
    lastVIPBonusTime = now;

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
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastVIPBonusTime >= oneDay) {
        btn.disabled = false;
        btn.innerText = `Забрать ${reward.toLocaleString()} 💎`;
        if (msg) {
            msg.innerText = `Ежедневная VIP-награда: ${reward.toLocaleString()} 💎`;
        }
    } else {
        btn.disabled = true;
        btn.innerText = "Уже получено";

        const timeLeftMs = oneDay - (now - lastVIPBonusTime);
        const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

        if (msg) {
            msg.innerText = `Следующая VIP-награда через ${hours} ч. ${minutes} мин.`;
        }
    }
}

function resetVIPTest() {
    if (confirm("Сбросить VIP статус для теста?")) {
        vipLevel = 0;
        currentVIPLevel = 0;
        lastVIPBonusTime = 0;
        saveData();
        updateVIPZoneUI();
        updateVIPBonusButton();
        location.reload();
    }
}



function checkAndResetRonaldoLimit() {
    const today = new Date().toLocaleDateString(); // Например: "10.04.2026"
    
    // Если дата изменилась — сбрасываем счётчик
    if (lastRonaldoResetDate !== today) {
        ronaldoSpinsToday = 0;
        lastRonaldoResetDate = today;
    }
}


function checkAndResetDailyWinLimit() {
    const today = new Date().toLocaleDateString(); 
    
    // Если наступил новый день — сбрасываем счётчик
    if (lastRonaldoWinDate !== today) {
        todayRonaldoWinnings = 0;
        lastRonaldoWinDate = today;
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
    resetBtn.onclick = () => { location.reload(); };
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
        alert("Недостаточно энергии !");
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
function getUpgradeCost(type) {
    if (type === 'highroller') {
        return upgradeBaseCosts.highroller;
    }
    return Math.floor(upgradeBaseCosts[type] * Math.pow(1.55, upgrades[type] || 0));
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




function giveWheelReward(reward) {
    if (!reward) return;

    if (reward.type === 'gems') {
        gems += reward.value;
    }

    if (reward.type === 'ticket') {
        blackMarketItems.luckyTicket = (blackMarketItems.luckyTicket || 0) + reward.value;
    }

    if (reward.type === 'auto') {
        blackMarketItems.autoPack = (blackMarketItems.autoPack || 0) + reward.value;
    }

    if (reward.type === 'shield') {
        blackMarketItems.shield = (blackMarketItems.shield || 0) + reward.value;
    }

    if (reward.type === 'pass') {
        blackMarketItems.highRollerPass = (blackMarketItems.highRollerPass || 0) + reward.value;
    }

    if (reward.type === 'doubleRoll') {
        blackMarketItems.doubleRoll = (blackMarketItems.doubleRoll || 0) + reward.value;
    }

    if (reward.type === 'rageSpin') {
        blackMarketItems.rageSpin = (blackMarketItems.rageSpin || 0) + reward.value;
    }

    if (reward.type === 'gemBooster') {
        activeEffects.gemBoosterSpins = (activeEffects.gemBoosterSpins || 0) + reward.value;
    }

    if (reward.type === 'secretBox') {
        blackMarketItems.secretBox = (blackMarketItems.secretBox || 0) + reward.value;
    }

    if (reward.type === 'secretKey') {
        blackMarketItems.secretKey = (blackMarketItems.secretKey || 0) + reward.value;
    }

    saveData();
    saveBlackMarket();
    updateUI();
    updateBlackMarketUI();
    updateWheelUI();
    animateBalanceChange('win');
}



function updateWheelUI() {
    const textEl = document.getElementById('wheel-status-text');
    const btn = document.getElementById('wheel-spin-btn');

    if (!textEl || !btn) return;

    const effectiveVIP = getEffectiveVIPLevel();

    if (effectiveVIP < 3) {
        textEl.innerText = 'Рулетка доступна только для VIP 3 — SpongeBob Elite и выше';
        btn.disabled = true;
        btn.innerText = 'VIP 3 REQUIRED';
        return;
    }

    const lastSpin = parseInt(localStorage.getItem('wheelSpinTime')) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastSpin >= oneDay) {
        textEl.innerText = 'Сегодняшний VIP-спин доступен';
        btn.disabled = false;
        btn.innerText = 'Крутить рулетку';
    } else {
        const left = oneDay - (now - lastSpin);
        const hours = Math.floor(left / (1000 * 60 * 60));
        const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        textEl.innerText = `Следующий спин через ${hours}ч ${minutes}м`;
        btn.disabled = true;
        btn.innerText = 'СПИН ИСПОЛЬЗОВАН';
    }
}

function spinWheel() {
    const effectiveVIP = getEffectiveVIPLevel();

    if (effectiveVIP < 3) {
        alert("❌ Рулетка доступна только для VIP 3 — SpongeBob Elite и выше");
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

    const wheelEl = document.getElementById('vip-wheel');
    const resultEl = document.getElementById('wheel-result');
    const btn = document.getElementById('wheel-spin-btn');
    const panel = document.querySelector('.vip-wheel-panel');

    if (!wheelEl || !btn || !resultEl) return;

    const segmentIds = JSON.parse(wheelEl.dataset.segmentIds || '[]');
    const wheelSegments = segmentIds
        .map(id => wheelRewards.find(r => r.id === id))
        .filter(Boolean);

    if (wheelSegments.length === 0) {
        resultEl.innerText = 'Ошибка: сегменты рулетки не найдены';
        return;
    }

    const chosenReward = getWeightedWheelReward();

    let chosenIndex = wheelSegments.findIndex(item => item.id === chosenReward.id);

    // Если награда не представлена напрямую на колесе —
    // ставим её на сектор той же редкости
    if (chosenIndex === -1) {
        const fallbackPool = wheelSegments.filter(r => r.rarity === chosenReward.rarity);
        const fallback = fallbackPool[Math.floor(Math.random() * fallbackPool.length)] || wheelSegments[0];
        chosenIndex = wheelSegments.findIndex(item => item.id === fallback.id);
    }

    const segmentAngle = 360 / wheelSegments.length;
    const fullSpins = 6;
    const randomJitter = (Math.random() * 6) - 3;

    const targetAngle = 360 - (chosenIndex * segmentAngle + segmentAngle / 2);
    const finalRotation = currentWheelRotation + fullSpins * 360 + targetAngle + randomJitter;

    isWheelSpinning = true;
    btn.disabled = true;
    resultEl.innerText = 'Крутим VIP рулетку...';

    if (panel) {
        panel.classList.remove('win-legendary', 'win-mythic');
    }

    playRollSound();

    wheelEl.style.transition = 'transform 5.4s cubic-bezier(0.08, 0.82, 0.17, 1)';
    wheelEl.style.transform = `rotate(${finalRotation}deg)`;

    currentWheelRotation = finalRotation % 360;

    setTimeout(() => {
        stopRollSound();
        playResultSound();

        giveWheelReward(chosenReward);
        localStorage.setItem('wheelSpinTime', Date.now().toString());

        if (chosenReward.rarity === 'mythic') {
            if (chosenReward.type === 'secretBox') {
                resultEl.innerText = '🎁 SECRET BOX! Напиши админу и отправь скрин выпадения.';
            } else if (chosenReward.type === 'secretKey') {
                resultEl.innerText = '🔑 SECRET KEY! Напиши админу и отправь скрин, чтобы активировать ключ.';
            } else {
                resultEl.innerText = `🔴 MYTHIC ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;
            }

            if (panel) panel.classList.add('win-mythic');
            playRareHitSound();
            setTimeout(() => stopRareHitSound(), 2600);

        } else if (chosenReward.rarity === 'legendary') {
            resultEl.innerText = `👑 ЛЕГЕНДАРНЫЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;

            if (panel) panel.classList.add('win-legendary');
            playRareHitSound();
            setTimeout(() => stopRareHitSound(), 2200);

        } else if (chosenReward.rarity === 'epic') {
            resultEl.innerText = `✨ ЭПИЧЕСКИЙ ПРИЗ: ${chosenReward.icon} ${chosenReward.label}`;

        } else {
            resultEl.innerText = `Ты выбил: ${chosenReward.icon} ${chosenReward.label}`;
        }

        updateUI();
        updateBlackMarketUI();
        updateWheelUI();

        btn.disabled = false;
        isWheelSpinning = false;
    }, 5400);
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
    renderWheelTrack();
    updateWheelUI();
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


window.addEventListener('click', (e) => {
    const modal = document.getElementById('gems-shop-modal');
    if (e.target === modal) {
        closeGemsShop();
    }
});

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

function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('active');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
}

async function registerPlayer() {
    const nickname = document.getElementById('auth-nickname').value.trim();
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value.trim();

    if (!nickname || !email || !password) {
        alert("Заполни все поля");
        return;
    }

    try {
        const { createUserWithEmailAndPassword, doc, setDoc, serverTimestamp } = window.fbFns;
        const auth = window.firebaseAuth;
        const db = window.firebaseDb;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "players", user.uid), {
            nickname,
            email,
            gems: 10000,
            vipLevel: 0,
            vipName: "",
            currentBet: 250,
            coinsConfig,
            leaderboard: [],
            lastVIPBonusTime: 0,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            lastSeenAt: serverTimestamp(),
            isOnline: true
        });

        currentUser = user;
        gems = 10000;
        vipLevel = 0;
        currentBet = 250;

        updateUI();
        //updateMarketUI();
        closeAuthModal();
        alert("Аккаунт создан!");
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        alert("Ошибка Firebase:\n" + error.code + "\n" + error.message);
    }
}


let currentUser = null;
let playerProfile = null;

async function loadPlayerData(user) {
    try {
        const { doc, getDoc } = window.fbFns;
        const db = window.firebaseDb;

        const snap = await getDoc(doc(db, "players", user.uid));
        if (!snap.exists()) return;

        const data = snap.data();

        currentUser = user;
        playerProfile = data;

        gems = data.gems ?? 10000;
        totalGemsEarned = data.totalGemsEarned ?? 0;
        vipLevel = data.vipLevel ?? 0;
        currentBet = data.currentBet ?? 250;
        leaderboard = Array.isArray(data.leaderboard) ? data.leaderboard : [];
        lastVIPBonusTime = data.lastVIPBonusTime ?? 0;
        currentVIPLevel = vipLevel;

        if (data.coinsConfig) {
            for (const key in data.coinsConfig) {
                if (coinsConfig[key]) {
                    coinsConfig[key].amount = data.coinsConfig[key].amount ?? 0;
                    coinsConfig[key].history = data.coinsConfig[key].history ?? [];
                    coinsConfig[key].currentPrice =
                        data.coinsConfig[key].currentPrice ?? coinsConfig[key].basePrice;
                }
            }
        } else {
            for (const key in coinsConfig) {
                if (!coinsConfig[key].history.length) {
                    let price = coinsConfig[key].basePrice;
                    for (let i = 0; i < 20; i++) {
                        coinsConfig[key].history.push(price);
                    }
                    coinsConfig[key].currentPrice = coinsConfig[key].basePrice;
                }
            }
        }

        updateUI();
        //updateMarketUI();
        updateLeaderboardUI();
        updateVIPBonusButton();
        updateProfileUI(data);
    } catch (error) {
        console.error("Ошибка загрузки игрока:", error);
    }
}

async function savePlayerData() {
    if (!currentUser) return;

    try {
        const { doc, setDoc, serverTimestamp } = window.fbFns;
        const db = window.firebaseDb;

        await setDoc(doc(db, "players", currentUser.uid), {
            gems,
            totalGemsEarned,
            vipLevel,
            currentBet,
            leaderboard,
            lastVIPBonusTime,
            lastSeenAt: serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error("Ошибка сохранения игрока:", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const { onAuthStateChanged } = window.fbFns;
    const auth = window.firebaseAuth;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await loadPlayerData(user);
            await loadThemeLeaderboard('brain');
        } else {
            leaderboard = [];
            updateLeaderboardUI();
            updateGuestUI();
        }
    });
});

function updateProfileUI(data) {
    const nicknameEl = document.getElementById("profile-nickname");
    const vipEl = document.getElementById("profile-vip");
    const balanceEl = document.getElementById("lobby-balance");

    if (nicknameEl) nicknameEl.textContent = data.nickname || "Игрок";
    if (vipEl) vipEl.textContent = data.vipName || `VIP ${data.vipLevel || 0}`;
    if (balanceEl) balanceEl.textContent = data.gems ?? 0;
}

function saveData() {
    savePlayerData();
}



async function loadThemeLeaderboard(themeName, btnElement = null) {
    try {
        leaderboardMode = 'theme';
        const themeBtn = document.getElementById('mode-theme-btn');
        const gemsBtn = document.getElementById('mode-gems-btn');

        if (themeBtn) themeBtn.classList.add('active');
        if (gemsBtn) gemsBtn.classList.remove('active');

        const themeTabs = document.querySelector('.leaderboard-theme-tabs');
        if (themeTabs) themeTabs.style.display = 'flex';
        const db = window.firebaseDb;
        const {
            collection,
            query,
            where,
            orderBy,
            limit,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        if (btnElement) {
            document.querySelectorAll('.leaderboard-theme-btn')
                .forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');
        }

        const q = query(
            collection(db, "leaderboard"),
            where("theme", "==", themeName),
            orderBy("bestWin", "desc"),
            limit(10)
        );

        const snapshot = await getDocs(q);

leaderboard = snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
}));

updateLeaderboardUI();
updateLeaderboardPanelText();
await loadMyThemeRank(themeName);
    } catch (error) {
        console.error("Ошибка загрузки лидерборда темы:", error);
    }
}
function switchLeaderboardMode(mode) {
    leaderboardMode = mode;

    const themeBtn = document.getElementById('mode-theme-btn');
    const gemsBtn = document.getElementById('mode-gems-btn');

    if (themeBtn) themeBtn.classList.toggle('active', mode === 'theme');
    if (gemsBtn) gemsBtn.classList.toggle('active', mode === 'gems');

    const themeTabs = document.querySelector('.leaderboard-theme-tabs');
    if (themeTabs) {
        themeTabs.style.display = mode === 'theme' ? 'flex' : 'none';
    }

    if (mode === 'theme') {
        loadThemeLeaderboard('brain');
    } else {
        loadGemsLeaderboard();
    }
}

async function loadThemeLeaderboard(themeName, btnElement = null) {
    try {
        leaderboardMode = 'theme';

        const themeBtn = document.getElementById('mode-theme-btn');
        const gemsBtn = document.getElementById('mode-gems-btn');

        if (themeBtn) themeBtn.classList.add('active');
        if (gemsBtn) gemsBtn.classList.remove('active');

        const themeTabs = document.querySelector('.leaderboard-theme-tabs');
        if (themeTabs) themeTabs.style.display = 'flex';

        const db = window.firebaseDb;
        const {
            collection,
            query,
            where,
            orderBy,
            limit,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        if (btnElement) {
            document.querySelectorAll('.leaderboard-theme-btn')
                .forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');
        }

        const q = query(
            collection(db, "leaderboard"),
            where("theme", "==", themeName),
            orderBy("bestWin", "desc"),
            limit(10)
        );

        const snapshot = await getDocs(q);

        leaderboard = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }));

        updateLeaderboardUI();
        await loadMyThemeRank(themeName);
    } catch (error) {
        console.error("Ошибка загрузки лидерборда темы:", error);
    }
}



async function loadMyGemsRank() {
    try {
        if (!currentUser) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
            updateMyRankCard();
            return;
        }

        const db = window.firebaseDb;
        const {
            collection,
            query,
            orderBy,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        const q = query(
            collection(db, "players"),
            orderBy("gems", "desc")
        );

        const snapshot = await getDocs(q);
        const allPlayers = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }));

        const myIndex = allPlayers.findIndex(player => player.uid === currentUser.uid);

        if (myIndex === -1) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
        } else {
            myLeaderboardRank = myIndex + 1;
            myLeaderboardRecord = allPlayers[myIndex];
        }

        updateMyRankCard();
    } catch (error) {
        console.error("Ошибка загрузки твоего места по алмазам:", error);
    }
}



async function loadMyThemeRank(themeName) {
    try {
        if (!currentUser) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
            updateMyRankCard();
            return;
        }

        const db = window.firebaseDb;
        const {
            collection,
            query,
            where,
            orderBy,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        const q = query(
            collection(db, "leaderboard"),
            where("theme", "==", themeName),
            orderBy("bestWin", "desc")
        );

        const snapshot = await getDocs(q);
        const allRecords = snapshot.docs.map(doc => ({
            uid: doc.data().uid || doc.id,
            ...doc.data()
        }));

        const myIndex = allRecords.findIndex(record => record.uid === currentUser.uid);

        if (myIndex === -1) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
        } else {
            myLeaderboardRank = myIndex + 1;
            myLeaderboardRecord = allRecords[myIndex];
        }

        updateMyRankCard();
    } catch (error) {
        console.error("Ошибка загрузки твоего места по теме:", error);
    }
}

function updateMyRankCard() {
    const card = document.getElementById('my-rank-card');
    const subtitle = document.getElementById('my-rank-subtitle');
    const position = document.getElementById('my-rank-position');
    const value = document.getElementById('my-rank-value');

    if (!card || !subtitle || !position || !value) return;

    if (!currentUser || !myLeaderboardRecord || !myLeaderboardRank) {
        card.style.display = 'none';
        return;
    }

    card.style.display = 'flex';
    position.textContent = `#${myLeaderboardRank}`;

    if (leaderboardMode === 'gems') {
        subtitle.textContent = 'Твой общий баланс в рейтинге игроков';
        value.textContent = `${(myLeaderboardRecord.gems || 0).toLocaleString()} 💎`;
    } else {
        subtitle.textContent = `Твой лучший рекорд в режиме ${myLeaderboardRecord.theme || ''}`;
        value.textContent = `${(myLeaderboardRecord.bestWin || 0).toLocaleString()} 💎`;
    }
}


async function loadMyGemsRank() {
    try {
        if (!currentUser) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
            updateMyRankCard();
            return;
        }

        const db = window.firebaseDb;
        const {
            collection,
            query,
            orderBy,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        const q = query(
            collection(db, "players"),
            orderBy("gems", "desc")
        );

        const snapshot = await getDocs(q);
        const allPlayers = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }));

        const myIndex = allPlayers.findIndex(player => player.uid === currentUser.uid);

        if (myIndex === -1) {
            myLeaderboardRank = null;
            myLeaderboardRecord = null;
        } else {
            myLeaderboardRank = myIndex + 1;
            myLeaderboardRecord = allPlayers[myIndex];
        }

        updateMyRankCard();
    } catch (error) {
        console.error("Ошибка загрузки твоего места по алмазам:", error);
    }
}

async function loadGemsLeaderboard() {
    try {
        leaderboardMode = 'gems';

        const themeBtn = document.getElementById('mode-theme-btn');
        const gemsBtn = document.getElementById('mode-gems-btn');

        if (themeBtn) themeBtn.classList.remove('active');
        if (gemsBtn) gemsBtn.classList.add('active');

        const themeTabs = document.querySelector('.leaderboard-theme-tabs');
        if (themeTabs) themeTabs.style.display = 'none';

        const db = window.firebaseDb;
        const {
            collection,
            query,
            orderBy,
            limit,
            getDocs
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

        const q = query(
            collection(db, "players"),
            orderBy("gems", "desc"),
            limit(10)
        );

        const snapshot = await getDocs(q);

        leaderboard = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
        }));

        updateLeaderboardUI();
        updateLeaderboardPanelText();
        await loadMyGemsRank();
    } catch (error) {
        console.error("Ошибка загрузки топа по алмазам:", error);
    }
}

function updateLeaderboardPanelText() {
    const titleEl = document.getElementById('leaderboard-panel-title');
    const subtextEl = document.getElementById('leaderboard-panel-subtext');

    if (!titleEl || !subtextEl) return;

    if (leaderboardMode === 'gems') {
        titleEl.textContent = '💎 ТОП ИГРОКОВ ПО БАЛАНСУ';
        subtextEl.textContent = 'Игроки с самым большим текущим количеством алмазов';
    } else {
        titleEl.textContent = '🌍 ТОП ИГРОКОВ ПО ТЕМЕ';
        subtextEl.textContent = 'Лучшие результаты среди всех игроков';
    }
}


function playRollSound() {
}

function stopRollSound(){
}

function playResultSound() {
}

function playRareHitSound() {
}

function stopRareHitSound() {
}
function getEffectiveVIPLevel() {
    const storedMain = parseInt(localStorage.getItem('memeVIPLevel')) || 0;
    const trialUntil = parseInt(localStorage.getItem('vipTrialUntil')) || 0;
    const hasTrial = Date.now() < trialUntil;

    const trialLevel = hasTrial ? 3 : 0;

    return Math.max(
        vipLevel || 0,
        currentVIPLevel || 0,
        storedMain,
        trialLevel
    );
}


const playerData = {
    cards: {
   "1.jpg": 0,
   "2.jpg": 0,
   "3.jpg": 0,
   "4.jpg": 0,
   "5.jpg": 0,
   "6.jpg": 0,
   "7.jpg": 0,
   "8.jpg": 0
},
    profile: {
        name: "Player",
        level: 1,
        xp: 0,
        xpNeeded: 50
    },

    resources: {
        energy: 100,
        maxEnergy: 100,
        styleCoins: 0,
        premiumTokens: 0
    },

    timers: {
        lastEnergyRegen: Date.now(),
        dailyClaim: 0
    },

    stats: {
        totalSpins: 0,
        totalCardsCollected: 0,
        totalThemesCompleted: 0
    },

    themes: {},

    achievements: {},

    battlePass: {
        level: 1,
        xp: 0,
        premium: false
    },

    settings: {
        sound: true,
        music: true
    }
};

function savePlayer() {
    localStorage.setItem("mcc_player", JSON.stringify(playerData));
}

function loadPlayer() {
    const save = localStorage.getItem("mcc_player");

    if (save) {
        const parsed = JSON.parse(save);
        Object.assign(playerData, parsed);
    }
}

function regenEnergy() {
    const now = Date.now();
    const diff = now - playerData.timers.lastEnergyRegen;

    const minutes = Math.floor(diff / 60000);

    const gained = Math.floor(minutes / 8);

    if (gained > 0) {
        playerData.resources.energy = Math.min(
            playerData.resources.maxEnergy,
            playerData.resources.energy + gained
        );

        playerData.timers.lastEnergyRegen = now;
        savePlayer();
    }
}

function addXP(amount) {
    playerData.profile.xp += amount;

    while (playerData.profile.xp >= playerData.profile.xpNeeded) {
        playerData.profile.xp -= playerData.profile.xpNeeded;
        playerData.profile.level++;

        playerData.profile.xpNeeded = Math.floor(
            playerData.profile.xpNeeded * 1.15
        );

        playerData.resources.energy = playerData.resources.maxEnergy;
    }

    savePlayer();
}
function addCard(theme, cardId, amount = 1) {
    playerData.themes[theme].cards[cardId] += amount;
    playerData.stats.totalCardsCollected += amount;

    savePlayer();
}

function initThemes() {
    const themeNames = [
        "sasavot",
        "ronaldo",
        "mellstroy"
    ];

    themeNames.forEach(theme => {
        if (!playerData.themes[theme]) {
            playerData.themes[theme] = {
                unlocked: true,
                progress: 0,

                cards: {
                    card1:0, card2:0, card3:0, card4:0,
                    card5:0, card6:0, card7:0, card8:0
                },

                rewardsClaimed: {},

                cosmetics: {
                    head:"default",
                    body:"default",
                    legs:"default",
                    aura:"none",
                    background:"default"
                }
            };
        }
    });
}
function addCardProgress(cardKey, matchCount) {
    ensureCardProgressExists(cardKey);

    const amount = getMatchRewardAmount(matchCount);
    playerData.cards[cardKey] += amount;

    checkMilestones(cardKey);
    savePlayer();
}
function rewardMilestone(cardName, stage) {

    const key = cardName + "_stage_" + stage;

    if (playerData.claimedRewards?.[key]) return;

    if (!playerData.claimedRewards) {
        playerData.claimedRewards = {};
    }

    playerData.claimedRewards[key] = true;

    let coins = 0;

    if (stage === 1) coins = 2;
    if (stage === 2) coins = 3;
    if (stage === 3) coins = 5;
    if (stage === 4) coins = 8;
    if (stage === 5) coins = 12;
    if (stage === 6) coins = 20;

    playerData.resources.styleCoins += coins;

    resultText.innerText =
      `Награда! +${coins} монет`;
}
document.addEventListener('DOMContentLoaded', () => {
    loadPlayer();
    initThemes();
    regenEnergy();
    updateUI();
    renderAllThemesCollection();
});
function hideRewardPreview() {
    const box = document.getElementById('reward-preview');
    if (box) {
        box.style.display = 'none';
    }
}

function showRewardPreview(item) {
    const box = document.getElementById('reward-preview');
    const image = document.getElementById('reward-preview-image');
    const title = document.getElementById('reward-preview-title');
    const meta = document.getElementById('reward-preview-meta');
    const extra = document.getElementById('reward-preview-extra');

    if (!box || !image || !title || !meta || !extra) return;

    image.src = item.src;
    title.innerText = `Карточка • ${item.fileName}`;
    meta.innerText = `+${item.amount} к прогрессу • ${item.matchCount} match`;
    extra.innerText = `+${item.xp} XP${item.streakBonus > 0 ? ` • +${item.streakBonus} энергии` : ''}`;

    box.style.display = 'grid';
}

function renderCollectionGroups() {
    const container = document.getElementById('collection-groups');
    if (!container) return;

    container.innerHTML = '';

    collectionGroups.forEach(group => {
        const el = document.createElement('div');
        el.className = 'collection-group';
        el.innerText = group.title;

        el.onclick = () => openCollectionGroup(group.id);

        container.appendChild(el);
    });
}

function openCollectionGroup(groupId) {
    const group = collectionGroups.find(g => g.id === groupId);
    if (!group) return;

    const container = document.getElementById('collection-themes');
    container.style.display = 'block';

    container.innerHTML = '';

    group.themes.forEach(theme => {
        const items = themes[theme] || [];

        let completed = 0;

        items.forEach(item => {
            const key = getCardKey(theme, item.src);
            const stage = getCurrentStage(key);
            const rarity = cardRarity[getFileNameFromSrc(item.src)];

            if (stage >= (progressPaths[rarity]?.length || 0)) {
                completed++;
            }
        });

        const el = document.createElement('div');
        el.className = 'collection-theme-card';

        el.innerHTML = `
            <div class="theme-title">${theme.toUpperCase()}</div>
            <div class="theme-progress">${completed} / ${items.length}</div>
        `;

        el.onclick = () => openThemeDetail(theme);

        container.appendChild(el);
    });
}

function openThemeDetail(themeName) {
    const container = document.getElementById('collection-theme-detail');
    container.style.display = 'block';

    const items = themes[themeName] || [];

    container.innerHTML = '';

    items.forEach((item, index) => {
        const key = getCardKey(themeName, item.src);
        const stage = getCurrentStage(key);

        const el = document.createElement('div');
        el.className = 'path-node';

        el.innerHTML = `
            <img src="${item.src}">
            <div class="node-stage">lvl ${stage}</div>
        `;

        container.appendChild(el);
        animateThemeDetailEntrance();
    });
}
function animateThemeDetailEntrance() {
    const hero = document.getElementById('collection-detail-hero');
    const cards = document.querySelectorAll('.collection-card-detail');

    if (hero) {
        hero.classList.remove('animate-in');
        void hero.offsetWidth;
        hero.classList.add('animate-in');
    }

    cards.forEach((card, index) => {
        card.classList.remove('animate-in');
        card.style.animationDelay = `${index * 70}ms`;

        requestAnimationFrame(() => {
            card.classList.add('animate-in');
        });
    });
}
function renderAllThemesCollection() {
    const themesEl = document.getElementById('collection-themes');
    const detailEl = document.getElementById('collection-theme-detail');

    if (!themesEl || !detailEl) return;

    detailEl.style.display = 'none';
    detailEl.innerHTML = '';
    themesEl.innerHTML = '';

    const orderedThemes = [
        'brain',
        'helin',
        'lexapaws',
        'litwin',
        'melstroy',
        'nikkifn',
        'rejiboi',
        'rostick',
        'sasich',
        'skibiditoilet',
        'slovopatsana'
    ];

    orderedThemes.forEach(themeName => {
        const items = themes[themeName] || [];
        let completed = 0;

        items.forEach(item => {
            const fileName = getFileNameFromSrc(item.src);
            const cardKey = getCardKey(themeName, item.src);
            const rarity = cardRarity[fileName];
            const stage = getCurrentStage(cardKey);
            const maxStage = progressPaths[rarity]?.length || 0;

            if (stage >= maxStage) {
                completed++;
            }
        });

        const themeCard = document.createElement('div');
        themeCard.className = 'collection-theme-card';
        themeCard.innerHTML = `
            <div class="collection-theme-title">${titles[themeName] || themeName}</div>
            <div class="collection-theme-progress">${completed} / ${items.length}</div>
        `;
        themeCard.onclick = () => openThemeDetail(themeName);

        themesEl.appendChild(themeCard);
    });
}
function getThemeCompletionData(themeName) {
    const items = themes[themeName] || [];
    let completed = 0;

    items.forEach(item => {
        const fileName = getFileNameFromSrc(item.src);
        const cardKey = getCardKey(themeName, item.src);
        const rarity = cardRarity[fileName];
        const stage = getCurrentStage(cardKey);
        const maxStage = progressPaths[rarity]?.length || 0;

        if (stage >= maxStage) {
            completed++;
        }
    });

    const total = items.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percent };
}

function getThemePreviewImage(themeName) {
    const items = themes[themeName] || [];
    return items[0]?.src || '';
}
function getMilestoneRewardLabel(stage) {
    if (stage === 1) return "+5 energy";
    if (stage === 2) return "+2 style coins";
    if (stage === 3) return "+4 style coins";
    if (stage === 4) return "+7 style coins";
    if (stage === 5) return "+12 style coins";
    if (stage === 6) return "+20 style coins";
    return "reward";
}
function getCardStatus(cardKey) {
    const fileName = cardKey.split(':')[1];
    const rarity = cardRarity[fileName];
    const maxStage = progressPaths[rarity]?.length || 0;
    const stage = getCurrentStage(cardKey);
    const progress = playerData.cards?.[cardKey] || 0;

    if (stage >= maxStage) return "completed";
    if (progress > 0) return "in progress";
    return "locked";
}
function isThemeCompleted(themeName) {
    const data = getThemeCompletionData(themeName);
    return data.total > 0 && data.completed >= data.total;
}
function updateUpgradesUI() {
    // временно пусто (удалено вместе со старой системой)
}
function updateMarketUI() {}
function simulateMarket() {}
function updateUpgradesUI() {}

function animateThemeDetailEntrance() {
    const hero = document.getElementById('collection-detail-hero');
    const cards = document.querySelectorAll('.collection-card-detail');

    if (hero) {
        hero.classList.remove('animate-in');
        void hero.offsetWidth;
        hero.classList.add('animate-in');
    }

    cards.forEach((card, index) => {
        card.classList.remove('animate-in');
        card.style.animationDelay = `${index * 70}ms`;

        requestAnimationFrame(() => {
            card.classList.add('animate-in');
        });
    });
}
// === ЗАПУСК ===
window.onload = () => {
    currentVIPLevel = vipLevel;

    createGrid();
    updateUI();
    //updateMarketUI();
    updateLeaderboardUI();
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