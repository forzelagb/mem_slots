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
    "1.jpg": "Origin",
    "2.jpg": "Drop",
    "3.jpg": "Rare Face",
    "4.jpg": "Wild Form",
    "5.jpg": "Epic Shift",
    "6.jpg": "Power Meme",
    "7.jpg": "Legend Core",
    "8.jpg": "Final Skin"
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
    common: [
        5, 10, 15, 20, 30,
        40, 50, 65, 80, 100,
        120, 145, 170, 200, 235,
        270, 310, 350, 400, 450,
        500, 560, 620, 690, 760,
        840, 920, 1010, 1100, 1200,
        1310, 1420, 1540, 1660, 1790,
        1920, 2060, 2200, 2350, 2500,
        2660, 2820, 2990, 3160, 3340,
        3520, 3710, 3900, 4100, 4300
    ],

    rare: [
        8, 16, 25, 35, 50,
        70, 90, 115, 140, 170,
        205, 240, 280, 320, 365,
        410, 460, 510, 565, 620,
        680, 740, 805, 870, 940,
        1010, 1085, 1160, 1240, 1320,
        1405, 1490, 1580, 1670, 1765,
        1860, 1960, 2060, 2165, 2270,
        2380, 2490, 2605, 2720, 2840,
        2960, 3085, 3210, 3340, 3470,
        3605, 3740, 3880, 4020, 4165,
        4310, 4460, 4610, 4765, 4920,
        5080, 5240, 5405, 5570, 5740,
        5910, 6085, 6260, 6440, 6620,
        6805, 6990, 7180, 7370, 7565
    ],

    epic: [
        10, 20, 35, 50, 70,
        95, 120, 150, 185, 220,
        260, 305, 350, 400, 455,
        510, 570, 635, 700, 770,
        845, 920, 1000, 1085, 1170,
        1260, 1355, 1450, 1550, 1655,
        1760, 1870, 1985, 2100, 2220,
        2345, 2470, 2600, 2735, 2870,
        3010, 3155, 3300, 3450, 3605,
        3760, 3920, 4085, 4250, 4420,
        4595, 4770, 4950, 5135, 5320,
        5510, 5705, 5900, 6100, 6305,
        6510, 6720, 6935, 7150, 7370,
        7595, 7820, 8050, 8285, 8520,
        8760, 9005, 9250, 9500, 9755,
        10010, 10270, 10535, 10800, 11070,
        11345, 11620, 11900, 12185, 12470,
        12760, 13055, 13350, 13650, 13955,
        14260, 14570, 14885, 15200, 15520,
        15845, 16170, 16500, 16835, 17170
    ],

    legendary: [
        15, 35, 60, 90, 130,
        175, 225, 280, 340, 410,
        485, 565, 650, 745, 845,
        950, 1065, 1185, 1310, 1445,
        1585, 1735, 1890, 2055, 2225,
        2405, 2590, 2785, 2990, 3200,
        3420, 3645, 3880, 4125, 4375,
        4635, 4905, 5180, 5465, 5760,
        6065, 6380, 6705, 7040, 7385,
        7740, 8105, 8480, 8865, 9260,
        9665, 10080, 10505, 10940, 11385,
        11840, 12305, 12780, 13265, 13760,
        14265, 14780, 15305, 15840, 16385,
        16940, 17505, 18080, 18665, 19260,
        19865, 20480, 21105, 21740, 22385,
        23040, 23705, 24380, 25065, 25760,
        26465, 27180, 27905, 28640, 29385,
        30140, 30905, 31680, 32465, 33260,
        34065, 34880, 35705, 36540, 37385,
        38240, 39105, 39980, 40865, 41760,
        42665, 43580, 44505, 45440, 46385,
        47340, 48305, 49280, 50265, 51260,
        52265, 53280, 54305, 55340, 56385,
        57440, 58505, 59580, 60665, 61760,
        62865, 63980, 65105, 66240, 67385,
        68540, 69705, 70880, 72065, 73260,
        74465, 75680, 76905, 78140, 79385,
        80640, 81905, 83180, 84465, 85760,
        87065, 88380, 89705, 91040, 92385,
        93740, 95105, 96480, 97865, 99260
    ]
};
const coinsConfig = {
    defaultCoins: 0
};
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
    brain: [{src: "image/brain/1.jpg", mult: ""}, {src: "image/brain/2.jpg", mult: ""}, {src: "image/brain/3.jpg", mult: ""}, {src: "image/brain/4.jpg", mult: ""}, {src: "image/brain/5.jpg", mult: ""}, {src: "image/brain/6.jpg", mult: ""}, {src: "image/brain/7.jpg", mult: ""}, {src: "image/brain/8.jpg", mult: ""}],
    helin: [{src: "image/helin/1.jpg", mult: ""}, {src: "image/helin/2.jpg", mult: ""}, {src: "image/helin/3.jpg", mult: ""}, {src: "image/helin/4.jpg", mult: ""}, {src: "image/helin/5.jpg", mult: ""}, {src: "image/helin/6.jpg", mult: ""}, {src: "image/helin/7.jpg", mult: ""}, {src: "image/helin/8.jpg", mult: ""}],
    lexapaws: [{src: "image/lexapaws/1.jpg", mult: ""}, {src: "image/lexapaws/2.jpg", mult: ""}, {src: "image/lexapaws/3.jpg", mult: ""}, {src: "image/lexapaws/4.jpg", mult: ""}, {src: "image/lexapaws/5.jpg", mult: 3}, {src: "image/lexapaws/6.jpg", mult: ""}, {src: "image/lexapaws/7.jpg", mult: ""}, {src: "image/lexapaws/8.jpg", mult: ""}],
    litwin: [{src: "image/litwin/1.jpg", mult: ""}, {src: "image/litwin/2.jpg", mult: ""}, {src: "image/litwin/3.jpg", mult: ""}, {src: "image/litwin/4.jpg", mult: ""}, {src: "image/litwin/5.jpg", mult: ""}, {src: "image/litwin/6.jpg", mult: ""}, {src: "image/litwin/7.jpg", mult: ""}, {src: "image/litwin/8.jpg", mult: ""}],
    melstroy: [{src: "image/melstroy/1.jpg", mult: ""}, {src: "image/melstroy/2.jpg", mult: ""}, {src: "image/melstroy/3.jpg", mult: ""}, {src: "image/melstroy/4.jpg", mult: ""}, {src: "image/melstroy/5.jpg", mult: 3}, {src: "image/melstroy/6.jpg", mult: ""}, {src: "image/melstroy/7.jpg", mult: ""}, {src: "image/melstroy/8.jpg", mult: ""}],
    nikkifn: [{src: "image/nikkifn/1.jpg", mult: ""}, {src: "image/nikkifn/2.jpg", mult: ""}, {src: "image/nikkifn/3.jpg", mult: ""}, {src: "image/nikkifn/4.jpg", mult: ""}, {src: "image/nikkifn/5.jpg", mult: ""}, {src: "image/nikkifn/6.jpg", mult: ""}, {src: "image/nikkifn/7.jpg", mult: ""}, {src: "image/nikkifn/8.jpg", mult: ""}],
    rejiboi: [{src: "image/rejiboi/1.jpg", mult: ""}, {src: "image/rejiboi/2.jpg", mult: ""}, {src: "image/rejiboi/3.jpg", mult: ""}, {src: "image/rejiboi/4.jpg", mult: ""}, {src: "image/rejiboi/5.jpg", mult: ""}, {src: "image/rejiboi/6.jpg", mult: ""}, {src: "image/rejiboi/7.jpg", mult: ""}, {src: "image/rejiboi/8.jpg", mult: ""}],
    rostick: [{src: "image/rostick/1.jpg", mult:""}, {src: "image/rostick/2.jpg", mult: ""}, {src: "image/rostick/3.jpg", mult: ""}, {src: "image/rostick/4.jpg", mult: ""}, {src: "image/rostick/5.jpg", mult: ""}, {src: "image/rostick/6.jpg", mult: ""}, {src: "image/rostick/7.jpg", mult: ""}, {src: "image/rostick/8.jpg", mult: ""}],
    sasich: [{src: "image/sasich/1.jpg", mult: ""}, {src: "image/sasich/2.jpg", mult: ""}, {src: "image/sasich/3.jpg", mult: ""}, {src: "image/sasich/4.jpg", mult: ""}, {src: "image/sasich/5.jpg", mult: ""}, {src: "image/sasich/6.jpg", mult: ""}, {src: "image/sasich/7.jpg", mult: ""}, {src: "image/sasich/8.jpg", mult: ""}],
    skibiditoilet: [{src: "image/skibiditoilet/1.jpg", mult: ""}, {src: "image/skibiditoilet/2.jpg", mult: ""}, {src: "image/skibiditoilet/3.jpg", mult: 2}, {src: "image/skibiditoilet/4.jpg", mult: ""}, {src: "image/skibiditoilet/5.jpg", mult: ""}, {src: "image/skibiditoilet/6.jpg", mult: ""}, {src: "image/skibiditoilet/7.jpg", mult: ""}, {src: "image/skibiditoilet/8.jpg", mult: ""}],
    slovopatsana: [{src: "image/slovopatsana/1.jpg", mult: ""}, {src: "image/slovopatsana/2.jpg", mult: ""}, {src: "image/slovopatsana/3.jpg", mult: 2}, {src: "image/slovopatsana/4.jpg", mult: ""}, {src: "image/slovopatsana/5.jpg", mult: ""}, {src: "image/slovopatsana/6.jpg", mult: ""}, {src: "image/slovopatsana/7.jpg", mult: ""}, {src: "image/slovopatsana/8.jpg", mult: ""}],
    ronaldo: [
        {src: "image/ronaldo/1.jpg", mult: ""},
        {src: "image/ronaldo/2.jpg", mult: ""}, 
        {src: "image/ronaldo/3.jpg", mult: ""}, 
        {src: "image/ronaldo/4.jpg", mult: ""}, 
        {src: "image/ronaldo/5.jpg", mult: ""}, 
        {src: "image/ronaldo/6.jpg", mult: ""}, 
        {src: "image/ronaldo/7.jpg", mult: ""} // SIUUU JACKPOT!
    ],

shrek: [
    {src: "image/shrek/1.jpg", mult: ""},
    {src: "image/shrek/2.jpg", mult: ""},
    {src: "image/shrek/3.jpg", mult: ""},
    {src: "image/shrek/4.jpg", mult: ""},
    {src: "image/shrek/5.jpg", mult: ""},
    {src: "image/shrek/6.jpg", mult: ""},
    {src: "image/shrek/7.jpg", mult: ""}
],

spongebob: [
    {src: "image/spongebob/1.jpg", mult: ""},
    {src: "image/spongebob/2.jpg", mult: ""},
    {src: "image/spongebob/3.jpg", mult: ""},
    {src: "image/spongebob/4.jpg", mult: ""},
    {src: "image/spongebob/5.jpg", mult: ""},
    {src: "image/spongebob/6.jpg", mult: ""},
    {src: "image/spongebob/7.jpg", mult: ""}
],

speed: [
    {src: "image/speed/1.jpg", mult: ""},
    {src: "image/speed/2.jpg", mult: ""},
    {src: "image/speed/3.jpg", mult: ""},
    {src: "image/speed/4.jpg", mult: ""},
    {src: "image/speed/5.jpg", mult: ""},
    {src: "image/speed/6.jpg", mult: ""},
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

    const sortedThemes = [...orderedThemes].sort((a, b) => {
        return getThemeCompletionData(b).percent - getThemeCompletionData(a).percent;
    });

    const featuredTheme = sortedThemes[0];

    if (featuredTheme) {
        const featuredData = getThemeCompletionData(featuredTheme);
        const featuredPreview = getThemePreviewImage(featuredTheme);
        const featuredTitle = titles[featuredTheme] || featuredTheme;

        const featured = document.createElement('div');
        featured.className = `collection-featured-card theme-${featuredTheme}`;
        featured.onclick = () => openThemeDetail(featuredTheme);

        featured.innerHTML = `
            <div class="collection-featured-bg">
                <img src="${featuredPreview}" alt="">
            </div>

            <div class="collection-featured-content">
                <div class="collection-featured-label">🔥 FEATURED THEME</div>
                <h2>${featuredTitle}</h2>

                <div class="collection-featured-percent">
                    ${featuredData.percent}%
                </div>

                <p>Собрано ${featuredData.completed} из ${featuredData.total} карточек</p>

                <div class="collection-featured-bar">
                    <div style="width:${featuredData.percent}%"></div>
                </div>

                <button>ОТКРЫТЬ ТЕМУ</button>
            </div>
        `;

        listEl.appendChild(featured);
    }

    const grid = document.createElement('div');
    grid.className = 'collection-themes-showcase';

    sortedThemes.forEach(themeName => {
        const preview = getThemePreviewImage(themeName);
        const data = getThemeCompletionData(themeName);
        const themeTitle = titles[themeName] || themeName;

        const rank =
            data.percent >= 100 ? "MASTER" :
            data.percent >= 75 ? "ELITE" :
            data.percent >= 50 ? "HUNTER" :
            data.percent >= 25 ? "COLLECTOR" :
            "ROOKIE";

        const card = document.createElement('div');
        card.className = `collection-theme-card-v3 theme-${themeName}`;
        card.onclick = () => openThemeDetail(themeName);

        card.innerHTML = `
            <div class="theme-card-img-v3">
                <img src="${preview}" alt="${themeTitle}">
                <div class="theme-card-rank-v3">${rank}</div>
            </div>

            <div class="theme-card-body-v3">
                <div class="theme-card-head-v3">
                    <h3>${themeTitle}</h3>
                    <b>${data.percent}%</b>
                </div>

                <div class="theme-card-meta-v3">
                    ${data.completed} / ${data.total} карточек
                </div>

                <div class="theme-card-progress-v3">
                    <div style="width:${data.percent}%"></div>
                </div>

                <div class="theme-card-reward-v3">
                    🎁 золото • гемы • сундук
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    listEl.appendChild(grid);
}

function closeThemeDetail() {
    const homeView = document.getElementById('collection-home-view');
    const detailView = document.getElementById('collection-detail-view');

    if (!homeView || !detailView) return;

    detailView.classList.add('closing');

    setTimeout(() => {
        detailView.classList.remove('closing');
        detailView.style.display = 'none';
        homeView.style.display = 'block';
        renderAllThemesCollection();
    }, 220);
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
    const themeRank = getThemeRank(data.percent);

    heroEl.className = `collection-theme-hero-v2 theme-${themeName}`;
heroEl.innerHTML = `
    <button class="collection-back-btn-v2" onclick="closeThemeDetail()">
        ← НАЗАД
    </button>

    <div class="collection-theme-hero-bg-v3">
        <img src="${preview}" alt="">
    </div>

    <div class="collection-theme-hero-content-v3">
        <div class="collection-theme-label-v3">💠 РАНГ ТЕМЫ: ${themeRank}</div>

        <h2>${themeTitle}</h2>

        <div class="collection-theme-percent-v3">
            ${data.percent}%
            <span>завершено</span>
        </div>
    <div class="theme-rank-badge-v3 rank-${themeRank.toLowerCase()}">
    ${themeRank}
</div>
        <p>${data.completed} / ${data.total} карточек собрано</p>

        <div class="collection-theme-hero-progress-v3">
            <div style="width:${data.percent}%"></div>
        </div>
    </div>

    <div class="collection-theme-vault-v3">
        <div class="vault-title-v3">НАГРАДА ЗА 100%</div>
        <div class="vault-chest-v3">🎁</div>
        <b>5000 золота • 150 гемов • 100 энергии</b>

        <button 
            class="theme-reward-btn-v3"
            ${isThemeCompleted(themeName) && !isThemeRewardClaimed(themeName) ? "" : "disabled"}
            onclick="claimThemeReward('${themeName}')"
        >
            ${
                isThemeRewardClaimed(themeName)
                    ? "ПОЛУЧЕНО"
                    : isThemeCompleted(themeName)
                        ? "ЗАБРАТЬ"
                        : "ЗАКРЫТО"
            }
        </button>
    </div>

    <div class="collection-rarity-filter-v3">
        <button class="active" onclick="setCollectionRarityFilter('${themeName}', 'all', this)">ВСЕ</button>
        <button onclick="setCollectionRarityFilter('${themeName}', 'common', this)">COMMON</button>
        <button onclick="setCollectionRarityFilter('${themeName}', 'rare', this)">RARE</button>
        <button onclick="setCollectionRarityFilter('${themeName}', 'epic', this)">EPIC</button>
        <button onclick="setCollectionRarityFilter('${themeName}', 'legendary', this)">LEGENDARY</button>
    </div>
`;

const items = themes[themeName] || [];

items.forEach(item => {
        const fileName = getFileNameFromSrc(item.src);
        const cardKey = getCardKey(themeName, item.src);
        const rarity = cardRarity[fileName] || "common";
        const progress = playerData.cards?.[cardKey] || 0;
        const nextValue = getNextMilestoneValue(cardKey);
        const percentToNext = Math.max(0, Math.min(100, (progress / nextValue) * 100));
        const status = getCardStatus(cardKey);

        const card = document.createElement('div');
        card.className = `collection-card-v2 rarity-${rarity} status-${status}`;
        card.dataset.rarity = rarity;   
        card.onclick = () => openCardPath(themeName, item.src);

        card.innerHTML = `
    <div class="collection-card-rarity-v3">${rarity}</div>

    <div class="collection-card-image-v3">
        <img src="${item.src}" alt="">
    </div>

    <div class="collection-card-info-v3">
        <h3>${cardDisplayNames[fileName] || fileName}</h3>

        <div class="collection-card-progress-text-v3">
            ${progress} / ${nextValue}
        </div>

        <div class="collection-card-progress-v3">
            <div style="width:${percentToNext}%"></div>
        </div>

        <button>СМОТРЕТЬ ПУТЬ</button>
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
    if (tabName === 'achievements') {
    renderAchievementsScreen();
    }
    if (tabName === 'collection') {
        renderAllThemesCollection();
    }
    if (tabName === 'pass') {
    renderPassTrack();
}
    const homeIntro = document.getElementById('home-intro');

if (homeIntro) {
    homeIntro.style.display = tabName === 'games' ? 'block' : 'none';
}
}

function createGrid() {
    if (!gridEl) return;

    gridEl.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';

        const img = document.createElement('img');
        img.className = 'slot-img';
        img.style.opacity = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        cell.appendChild(img);
        gridEl.appendChild(cell);
    }
}

function clearHighlightedCells() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('win-cell', 'dim-cell', 'pulse');
    });
}

function highlightWinningCells(indexes) {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const winSet = new Set(indexes);

    cells.forEach((cell, index) => {
        cell.classList.remove('win-cell', 'dim-cell', 'pulse');

        if (winSet.has(index)) {
            cell.classList.add('win-cell');
        } else if (winSet.size > 0) {
            cell.classList.add('dim-cell');
        }
    });

    setTimeout(() => {
        cells.forEach((cell, index) => {
            if (winSet.has(index)) {
                cell.classList.add('pulse');
            }
        });
    }, 40);
}

function animateBalanceChange(type) {
    const els = [
        document.getElementById('lobby-balance'),
        document.getElementById('game-balance')
    ].filter(Boolean);

    els.forEach(el => {
        el.classList.remove('balance-pop', 'balance-loss');
        void el.offsetWidth;

        if (type === 'win') {
            el.classList.add('balance-pop');
        }

        if (type === 'loss') {
            el.classList.add('balance-loss');
        }
    });
}
function updateUI() {
    const lobbyBal = document.getElementById('lobby-balance');
    const gameBal = document.getElementById('game-balance');

    const goldEl = document.getElementById('header-gold');
    const premiumEl = document.getElementById('header-premium-tokens');
    const shardsEl = document.getElementById('header-power-shards');
    const clothEl = document.getElementById('header-cloth-fragments');

    const globalEnergy = document.getElementById('global-energy-value');
    const energyMiniFill = document.getElementById('energy-mini-fill');

    const energy = playerData.resources?.energy ?? 0;

    if (goldEl) goldEl.innerText = playerData.resources?.gold ?? 0;
    if (premiumEl) premiumEl.innerText = playerData.resources?.premiumTokens ?? 0;
    if (shardsEl) shardsEl.innerText = playerData.resources?.powerShards ?? 0;

    if (clothEl) {
        const char = currentCharacter || "sasavot";
        const rarity = currentRarity || "common";

        const cloth =
            playerData.resources?.clothFragments?.[char]?.[rarity] ?? 0;

        clothEl.innerText = cloth;
    }

    if (globalEnergy) globalEnergy.innerText = energy;

    if (energyMiniFill) {
        const maxEnergy = playerData.resources?.maxEnergy ?? 100;
        const percent = Math.max(0, Math.min(100, (energy / maxEnergy) * 100));
        energyMiniFill.style.width = percent + '%';
    }

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
    renderHomeActiveQuest();
}
function startGame(theme) {
  window.location.href = `collect.html?theme=${theme}`;
}

function goBack() {
    gameScreen.classList.remove('game-screen-themed');
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
    if (!cells || !items || cells.length !== items.length) {
        callback?.();
        return;
    }

    const cols = 5;
    const rows = 3;
    let completed = 0;

    for (let col = 0; col < cols; col++) {
        const columnDelay = col * 120;

        for (let row = 0; row < rows; row++) {
            const index = row * cols + col;
            const cell = cells[index];
            const item = items[index];
            const img = cell?.querySelector('.slot-img');

            if (!cell || !item || !img) {
                completed++;
                if (completed === cells.length) callback?.();
                continue;
            }

            cell.classList.remove('reel-spin', 'reel-land');
            void cell.offsetWidth;

            setTimeout(() => {
                img.src = item.src;
                img.style.opacity = '1';

                if (item.mult !== "" && item.mult !== undefined && item.mult !== null) {
                    cell.setAttribute('data-multiplier', item.mult);
                } else {
                    cell.setAttribute('data-multiplier', '');
                }

                cell.classList.add('reel-spin');

                setTimeout(() => {
                    cell.classList.remove('reel-spin');
                    cell.classList.add('reel-land');

                    setTimeout(() => {
                        cell.classList.remove('reel-land');
                        completed++;

                        if (completed === cells.length) {
                            callback?.();
                        }
                    }, 180);
                }, 560);
            }, columnDelay + row * 35);
        }
    }
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

    if (typeof playerData.resources.memeCoins !== "number") {
        playerData.resources.memeCoins = playerData.resources.styleCoins || 0;
    }

    if (typeof playerData.resources.collectionTokens !== "number") {
        playerData.resources.collectionTokens = 0;
    }

    if (typeof playerData.playerLevel !== "number") {
        playerData.playerLevel = 1;
    }

    if (typeof playerData.playerXP !== "number") {
        playerData.playerXP = 0;
    }
}



function addCardProgress(cardKey, amount) {
    ensureCardProgressExists(cardKey);

    playerData.cards[cardKey] += amount;

    checkMilestones(cardKey);
}

function rewardMilestone(cardKey, stage) {
    ensureCardProgressExists(cardKey);

    const rewardKey = `${cardKey}_stage_${stage}`;
    if (playerData.claimedRewards[rewardKey]) return;

    const fileName = cardKey.split(":")[1];
    const rarity = cardRarity[fileName];
    const reward = getMilestoneReward(stage, rarity);

    playerData.claimedRewards[rewardKey] = true;

    if (reward.energy) {
        playerData.resources.energy = Math.min(
            playerData.resources.maxEnergy,
            playerData.resources.energy + reward.energy
        );
    }

    if (reward.memeCoins) {
        playerData.resources.memeCoins += reward.memeCoins;
    }

    if (reward.collectionTokens) {
        playerData.resources.collectionTokens += reward.collectionTokens;
    }
}

function checkMilestones(cardKey) {
    ensureCardProgressExists(cardKey);
    // Награды больше НЕ выдаются автоматически.
    // Игрок сам забирает их в окне "Путь карточки".
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

    clearHighlightedCells();

    stopRareHitSound();
    playRollSound();

    const items = themes[currentTheme];
    if (!items || items.length === 0) {
        alert("Ошибка: тема не найдена!");
        stopRollSound();
        return;
    }
const finalGrid = [];
for (let i = 0; i < 15; i++) {
    finalGrid.push(getRandomWeightedItem(items));
}
const bestCardInSpin = finalGrid.find(item => {
    const rarity = getCardRarityBySrc(item.src);
    return rarity === "rare" || rarity === "epic" || rarity === "legendary";
});

if (bestCardInSpin) {
    addQuestProgressForCardRarity(getCardRarityBySrc(bestCardInSpin.src));
}

    playerData.resources.energy -= currentEnergyCost;
    savePlayer();
addQuestProgress("spins", 1);
addQuestProgress("energySpent", currentEnergyCost);

    updateUI();
    animateBalanceChange('loss');

    isSpinning = true;
    spinBtn.disabled = true;

    if (spinBtn) {
        spinBtn.classList.remove('ready-pulse');
        spinBtn.innerHTML = `КРУТИМ...`;
    }

if (resultText) {
    resultText.innerText = getRandomItem([
        "Крутим барабаны...",
        "Смотрим удачу...",
        "Символы летят...",
        "Сейчас будет жарко..."
    ]);
}

    const cells = Array.from(document.querySelectorAll('.cell'));
    hideRewardPreview();
    hideSlotCollectionGain();
    animateDrop(cells, finalGrid, () => {
        checkWins(finalGrid);

        isSpinning = false;
        updateUI();
    });
}
function checkWins(grid) {
    clearHighlightedCells();

    let totalEnergyReward = 0;
    let totalXpReward = 5; // базовый XP за спин
    const rows = 3;
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
            matchCount,
            src: item.src
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

    addPlayerXP(totalXpReward);
    savePlayer();

    // старый reward UI теперь безопасный
    if (rewardedCards.length > 0) {
        const firstReward = rewardedCards[0];

        if (typeof showRewardPreview === 'function') {
            showRewardPreview({
                src: firstReward.src,
                fileName: firstReward.fileName,
                amount: firstReward.amount,
                matchCount: firstReward.matchCount,
                xp: totalXpReward,
                streakBonus
            });
        }
        showSlotCollectionGainList(rewardedCards, totalXpReward, streakBonus);
        highlightCollectionHits(rewardedCards);

        if (resultText) {
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
        }
    } else {
        if (typeof hideRewardPreview === 'function') {
            hideRewardPreview();
        }

        if (resultText) {
            resultText.innerText = `Нет совпадений • +${totalXpReward} XP • серия сброшена`;
        }
    }

    updateUI();
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
    if (!window.fbFns || !window.firebaseAuth) return;

    const { onAuthStateChanged } = window.fbFns;
    const auth = window.firebaseAuth;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await loadPlayerData(user);
            await loadThemeLeaderboard('brain');
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

const styleUpgradeCosts = {
    0: { gold: 100, powerShards: 10, cloth: 5 },
    1: { gold: 200, powerShards: 20, cloth: 10 },
    2: { gold: 400, powerShards: 35, cloth: 15 },
    3: { gold: 700, powerShards: 50, cloth: 20 },
    4: { gold: 1100, powerShards: 70, cloth: 25 },
    5: { gold: 1600, powerShards: 95, cloth: 35 },
    6: { gold: 2300, powerShards: 125, cloth: 45 },
    7: { gold: 3200, powerShards: 160, cloth: 60 },
    8: { gold: 4500, powerShards: 210, cloth: 80 },
    9: { gold: 6000, powerShards: 280, cloth: 100 }
};

const maxStyleLevel = 10;

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
stats: {
    spins: 0,
    chestsOpened: 0
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
    
    equippedStyles: {
    sasavot: "default"
},
chests: {
    common: 3,
    rare: 1,
    epic: 0,
    legendary: 0
},

    gold: 5000,
    powerShards: 500,

    styleCoins: 0,
    premiumTokens: 0,

clothFragments: {
    helin: { common: 0, rare: 0, epic: 0, legendary: 0 },
    lexapaws: { common: 0, rare: 0, epic: 0, legendary: 0 },
    litwin: { common: 0, rare: 0, epic: 0, legendary: 0 },
    melstroy: { common: 0, rare: 0, epic: 0, legendary: 0 },
    nikkifn: { common: 0, rare: 0, epic: 0, legendary: 0 },
    rejiboi: { common: 0, rare: 0, epic: 0, legendary: 0 },
    rostick: { common: 0, rare: 0, epic: 0, legendary: 0 },
    sasich: { common: 0, rare: 0, epic: 0, legendary: 0 },
    skibiditoilet: { common: 0, rare: 0, epic: 0, legendary: 0 },
    slovopatsana: { common: 0, rare: 0, epic: 0, legendary: 0 }
}
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
function getMilestoneRewardLabel(stage, rarity) {
    const reward = getMilestoneReward(stage, rarity);

    const parts = [];

    if (reward.energy) parts.push(`+${reward.energy} ⚡`);
    if (reward.memeCoins) parts.push(`+${reward.memeCoins} 🪙`);
    if (reward.collectionTokens) parts.push(`+${reward.collectionTokens} 🎟`);

    return parts.length ? parts.join(' · ') : 'Награда';
}
function getCardStatus(cardKey) {
    const fileName = cardKey.split(':')[1];
    const rarity = cardRarity[fileName];
    const maxStage = progressPaths[rarity]?.length || 0;
    const stage = getCurrentStage(cardKey);
    const progress = playerData.cards?.[cardKey] || 0;

    if (stage >= maxStage) return "completed";
    if (progress > 0) return "in-progress";
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
function clearWinHighlight() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('win-cell', 'dim-cell', 'pulse');
    });
}

function highlightWinningCells(winningIndexes) {
    const cells = Array.from(document.querySelectorAll('.cell'));

    if (!cells.length) return;

    const winSet = new Set(winningIndexes);

    cells.forEach((cell, index) => {
        cell.classList.remove('win-cell', 'dim-cell', 'pulse');

        if (winSet.has(index)) {
            cell.classList.add('win-cell');
        } else {
            cell.classList.add('dim-cell');
        }
    });

    setTimeout(() => {
        cells.forEach((cell, index) => {
            if (winSet.has(index)) {
                cell.classList.add('pulse');
            }
        });
    }, 40);
}

function getCardPathReward(level, rarity) {
    if (level % 25 === 0) {
        return {
            title: "Сундук",
            amount: 1,
            img: rarity === "legendary"
                ? "image/ui/chest-legendary.png"
                : rarity === "epic"
                    ? "image/ui/chest-epic.png"
                    : "image/ui/chest-rare.png"
        };
    }

    if (level % 10 === 0) {
        return {
            title: "Гемы",
            amount: rarity === "legendary" ? 50 : rarity === "epic" ? 30 : 15,
            img: "image/ui/gems.png"
        };
    }

    if (level % 5 === 0) {
        return {
            title: "Энергия",
            amount: 20,
            img: "image/ui/energy.png"
        };
    }

    return {
        title: "Золото",
        amount: rarity === "legendary" ? 500 : rarity === "epic" ? 300 : rarity === "rare" ? 200 : 100,
        img: "image/ui/gold.png"
    };
}

function closeCardPath() {
    const modal = document.getElementById('card-path-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}
function getXPNeededForLevel(level) {
    return Math.floor(100 * level * 1.18);
}

function addPlayerXP(amount) {
    if (!playerData) return;

    if (typeof playerData.playerLevel !== "number") {
        playerData.playerLevel = 1;
    }

    if (typeof playerData.playerXP !== "number") {
        playerData.playerXP = 0;
    }

    playerData.playerXP += amount;

    let needed = getXPNeededForLevel(playerData.playerLevel);

    while (playerData.playerXP >= needed) {
        playerData.playerXP -= needed;
        playerData.playerLevel += 1;
        needed = getXPNeededForLevel(playerData.playerLevel);
    }

    updatePlayerLevelUI();
}
function updatePlayerLevelUI() {
    const levelEl = document.getElementById('player-level-value');
    const xpFillEl = document.getElementById('player-xp-fill');

    if (!levelEl && !xpFillEl) return;

    const level = playerData.playerLevel || 1;
    const xp = playerData.playerXP || 0;
    const need = getXPNeededForLevel(level);
    const percent = Math.max(0, Math.min(100, (xp / need) * 100));

    if (levelEl) levelEl.innerText = level;
    if (xpFillEl) xpFillEl.style.width = percent + '%';
}
function getMilestoneReward(stage, rarity) {
    const table = {
        common: [
            { energy: 2, memeCoins: 5 },
            { memeCoins: 8 },
            { energy: 3, memeCoins: 10 },
            { memeCoins: 15 },
            { energy: 5, memeCoins: 20 },
            { collectionTokens: 1 }
        ],
        rare: [
            { energy: 3, memeCoins: 8 },
            { memeCoins: 12 },
            { energy: 4, memeCoins: 16 },
            { memeCoins: 24 },
            { energy: 6, memeCoins: 32 },
            { collectionTokens: 2 }
        ],
        epic: [
            { energy: 4, memeCoins: 12 },
            { memeCoins: 18 },
            { energy: 5, memeCoins: 25 },
            { memeCoins: 38 },
            { energy: 8, memeCoins: 50 },
            { collectionTokens: 3 }
        ],
        legendary: [
            { energy: 5, memeCoins: 18 },
            { memeCoins: 30 },
            { energy: 8, memeCoins: 45 },
            { memeCoins: 70 },
            { energy: 12, memeCoins: 100 },
            { collectionTokens: 5 }
        ]
    };

    return table[rarity]?.[stage - 1] || {};
}
function isMilestoneReached(cardKey, stage) {
    ensureCardProgressExists(cardKey);

    const milestones = getRewardMilestones(cardKey);
    const target = milestones[stage - 1];
    const progress = playerData.cards?.[cardKey] || 0;

    return progress >= target;
}

function isMilestoneClaimed(cardKey, stage) {
    ensureCardProgressExists(cardKey);

    const rewardKey = `${cardKey}_stage_${stage}`;
    return !!playerData.claimedRewards?.[rewardKey];
}

function canClaimMilestone(cardKey, stage) {
    return isMilestoneReached(cardKey, stage) && !isMilestoneClaimed(cardKey, stage);
}

function claimCardMilestone(cardKey, stage) {
    ensureCardProgressExists(cardKey);

    if (!canClaimMilestone(cardKey, stage)) return;

    rewardMilestone(cardKey, stage);
    savePlayer();
    updateUI();

    const [themeName, fileName] = cardKey.split(':');
    const cardSrc = `image/${themeName}/${fileName}`;

    openCardPath(themeName, cardSrc);
}
const memeCoinsEl = document.getElementById('header-meme-coins');
const collectionTokensEl = document.getElementById('header-collection-tokens');

if (memeCoinsEl) memeCoinsEl.innerText = playerData.resources?.memeCoins || 0;
if (collectionTokensEl) collectionTokensEl.innerText = playerData.resources?.collectionTokens || 0;
function openPlayerProfile() {
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;

    updatePlayerProfileUI();

    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closePlayerProfile() {
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function updatePlayerProfileUI() {
    const level = playerData.playerLevel || 1;
    const xp = playerData.playerXP || 0;
    const need = getXPNeededForLevel(level);
    const xpPercent = Math.max(0, Math.min(100, (xp / need) * 100));

    const profileLevel = document.getElementById('profile-level-value');
    const profileXpText = document.getElementById('profile-xp-text');
    const profileXpFill = document.getElementById('profile-xp-fill');

    const profileEnergy = document.getElementById('profile-energy');
    const profileMemeCoins = document.getElementById('profile-meme-coins');
    const profileCollectionTokens = document.getElementById('profile-collection-tokens');

    if (profileLevel) profileLevel.innerText = level;
    if (profileXpText) profileXpText.innerText = `${xp} / ${need} XP`;
    if (profileXpFill) profileXpFill.style.width = xpPercent + '%';

    if (profileEnergy) profileEnergy.innerText = playerData.resources?.energy || 0;
    if (profileMemeCoins) profileMemeCoins.innerText = playerData.resources?.memeCoins || 0;
    if (profileCollectionTokens) profileCollectionTokens.innerText = playerData.resources?.collectionTokens || 0;
}
function goHome() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    if (lobbyScreen) {
        lobbyScreen.classList.add("active");
    }

    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });

    const gamesTab = document.getElementById("tab-games");
    if (gamesTab) {
        gamesTab.classList.add("active");
    }

    const homeIntro = document.getElementById("home-intro");
    if (homeIntro) {
        homeIntro.style.display = "block";
    }

    document.body.classList.remove(
        "vip-theme-ronaldo",
        "vip-theme-shrek",
        "vip-theme-spongebob",
        "vip-theme-speed"
    );
}
function selectCharacter(key) {
  playerData.activeCharacter = key;
  renderCharacter();
}

const charactersConfig = {
    helin: {
        name: "HELIN",
        folder: "helin",
        rarity: "epic",
        rarityText: "ЭПИЧЕСКИЙ",
        desc: "Холодная подача, сильная харизма и высокий шанс редких наград.",
        ability: "Повышает шанс редких наград на 8%",
        stats: { hp: 820, attack: 110, defense: 85, luck: "16%" },
        preview: "image/characters/helin/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },
    melstroy: {
    name: "MELSTROY",
    folder: "melstroy",
    rarity: "legendary",
    rarityText: "ЛЕГЕНДАРНЫЙ",
    desc: "Король хайпа с мощной атакой и высоким шансом редких наград.",
    ability: "Повышает шанс редких наград на 12%",
    stats: { hp: 880, attack: 140, defense: 95, luck: "20%" },
      preview: "image/characters/melstroy/preview.png",
    styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    lexapaws: {
        name: "LEXA PAWS",
        folder: "lexapaws",
        rarity: "legendary",
        rarityText: "ЛЕГЕНДАРНЫЙ",
        desc: "Быстрый, стильный и опасный персонаж с высоким бонусом удачи.",
        ability: "Повышает шанс бонусных выпадений на 10%",
        stats: { hp: 780, attack: 135, defense: 70, luck: "22%" },
          preview: "image/characters/lexapaws/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    litwin: {
        name: "LITWIN",
        folder: "litwin",
        rarity: "rare",
        rarityText: "РЕДКИЙ",
        desc: "Уверенный герой с хорошим балансом атаки и защиты.",
        ability: "Даёт +5% к наградам за серию игр",
        stats: { hp: 900, attack: 105, defense: 100, luck: "13%" },
        preview: "image/characters/litwin/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    nikkifn: {
        name: "NIKKIFN",
        folder: "nikkifn",
        rarity: "epic",
        rarityText: "ЭПИЧЕСКИЙ",
        desc: "Точный персонаж, который хорошо подходит для фарма коллекции.",
        ability: "Повышает шанс выпадения карточек на 7%",
        stats: { hp: 800, attack: 125, defense: 80, luck: "17%" },
        preview: "image/characters/nikkifn/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    rejiboi: {
        name: "REJIBOY",
        folder: "rejiboy",
        rarity: "rare",
        rarityText: "РЕДКИЙ",
        desc: "Скоростной персонаж с хорошей удачей.",
        ability: "Иногда возвращает 1 энергию после игры",
        stats: { hp: 760, attack: 115, defense: 75, luck: "19%" },
        preview: "image/characters/rejiboi/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    rostickfaceskid: {
        name: "ROSTICK FACEKID",
        folder: "rostickfaceskid",
        rarity: "epic",
        rarityText: "ЭПИЧЕСКИЙ",
        desc: "Мемный герой с сильной защитой и стабильными бонусами.",
        ability: "Повышает награду за обычные карточки на 6%",
        stats: { hp: 920, attack: 100, defense: 120, luck: "14%" },
        preview: "image/characters/rostickfacekid/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    },

    sasavot: {
        name: "SASAVOT",
        folder: "sasavot",
        rarity: "rare",
        rarityText: "РЕДКИЙ",
        desc: "Громкий персонаж с хорошим стартовым бонусом.",
        ability: "Даёт +5% к опыту персонажа",
        stats: { hp: 850, attack: 118, defense: 88, luck: "15%" },
        preview: "image/characters/sasavot/preview.png",
        styles: ["skin-1.png", "skin-2.png", "skin-3.png", "skin-4.png"]
    }
};
const petsConfig = {
    pony: {
        name: "PONY",
        styles: [
            "image/pets/pony/skin-1.png",
            "image/pets/pony/skin-2.png",
            "image/pets/pony/skin-3.png",
            "image/pets/pony/skin-4.png"
        ]
    }
};
function getCharacterImagePath(characterKey, styleIndex = 0) {
    const config = charactersConfig[characterKey];
    if (!config) return "";

    const styleFile = config.styles[styleIndex] || config.styles[0];
    return `image/characters/${config.folder}/${styleFile}`;
}

function ensureCharactersData() {
    if (!playerData.characters) {
        playerData.characters = {};
    }

    if (!playerData.activeCharacter) {
        playerData.activeCharacter = "melstroy";
    }

    Object.keys(charactersConfig).forEach(key => {
        if (!playerData.characters[key]) {
            playerData.characters[key] = {
                unlocked: key === "melstroy" || key === "sasavot",
                level: 1,
                style: "default",
                pet: null,
                accessories: []
            };
        }
    });
}

function openCharactersScreen() {
    ensureCharactersData();

    lobbyScreen.classList.remove('active');
    gameScreen.classList.remove('active');

    const charactersScreen = document.getElementById('characters-screen');
    if (charactersScreen) {
        charactersScreen.classList.add('active');
    }

    renderCharactersScreen();
}

function renderCharactersScreen() {
    renderCharactersList();
    renderActiveCharacter();
}

let charactersScrollIndex = 0;

function renderCharactersList() {
    const list = document.getElementById('characters-list');
    if (!list) return;

    const characters = Object.keys(charactersConfig).map(key => ({
        key,
        name: charactersConfig[key].name,
        image: charactersConfig[key].image
    }));

    list.innerHTML = '';

    characters.forEach((char) => {
        const div = document.createElement('div');
        div.className = 'character-list-item';

        if (playerData.activeCharacter === char.key) {
            div.classList.add('active');
        }

        div.innerHTML = `
            <div class="character-list-avatar">
                <img src="${getCharacterImagePath(char.key, 0)}">
            </div>
            <div class="character-list-name">${char.name}</div>
        `;

        div.onclick = () => {
            selectCharacter(char.key);
        };

        list.appendChild(div);
    });

    updateCharactersScroll();
}
function scrollCharacters(direction) {
    const list = document.getElementById('characters-list');
    if (!list) return;

    const items = list.querySelectorAll('.character-list-item');
    const maxIndex = Math.max(0, items.length - 3);

    charactersScrollIndex += direction;
    charactersScrollIndex = Math.max(0, Math.min(charactersScrollIndex, maxIndex));

    updateCharactersScroll();
}

function updateCharactersScroll() {
    const list = document.getElementById('characters-list');
    if (!list) return;

    const itemHeight = 90;
    list.style.transform = `translateY(-${charactersScrollIndex * itemHeight}px)`;
}
/*
function selectCharacter(key) {
    ensureCharactersData();

    const character = playerData.characters[key];
    if (!character || !character.unlocked) return;

    playerData.activeCharacter = key;
    savePlayer();

    renderCharactersScreen();
}
*/
function renderActiveCharacter() {
    const imgEl = document.getElementById('active-character');
    if (!imgEl) return;

    const activeKey = playerData.activeCharacter || 'melstroy';
    const config = charactersConfig[activeKey];

    if (!config) return;

    imgEl.classList.remove('character-change');
    void imgEl.offsetWidth;

imgEl.src = getCharacterImagePath(activeKey, 0);
    imgEl.alt = config.name;
    imgEl.classList.add('character-change');

    const nameEl = document.getElementById('character-info-name');
    if (nameEl) {
        nameEl.innerText = config.name;
    }
}
function selectCharacter(characterKey) {
    playerData.activeCharacter = characterKey;
    if (typeof savePlayerData === "function") {
        savePlayerData();
    }

    renderCharactersList();

    renderActiveCharacter();
}/*
function openCharactersScreen() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('characters-screen').classList.add('active');

    renderCharactersList();
}
function switchCharacterStyle(direction) {
    const activeKey = playerData.activeCharacter || "melstroy";
    const config = charactersConfig[activeKey];
    if (!config) return;

    const total = config.styles.length;
    let current = playerData.activeCharacterStyle || 0;

    current += direction;

    if (current < 0) current = total - 1;
    if (current >= total) current = 0;

    playerData.activeCharacterStyle = current;

    if (typeof savePlayerData === "function") {
        savePlayerData();
    }

    renderActiveCharacter();
}*/
function getCharacterImagePath(characterKey, styleIndex = 0) {
    const config = charactersConfig[characterKey];
    if (!config) return "";

    const styleFile = config.styles[styleIndex] || config.styles[0];
    return `image/characters/${config.folder}/${styleFile}`;
}
function switchCharacterStyle(direction) {
    const activeKey = playerData.activeCharacter || "melstroy";
    const config = charactersConfig[activeKey];
    if (!config) return;

    const total = config.styles.length;
    let current = playerData.activeCharacterStyle || 0;

    current += direction;

    if (current < 0) current = total - 1;
    if (current >= total) current = 0;

    playerData.activeCharacterStyle = current;

    if (typeof savePlayerData === "function") {
        savePlayerData();
    }

    renderActiveCharacter();
}
let activePassType = "heroes";

const passRewards = {
    heroes: Array.from({ length: 30 }, (_, i) => {
        const level = i + 1;

        return {
            level,
            premium:
                level % 10 === 0 ? "👑 Стиль героя" :
                level % 5 === 0 ? "🏆 Эпик сундук" :
                level % 3 === 0 ? "💎 25 гемов" :
                level % 2 === 0 ? "🎁 Редкий сундук" :
                "🧩 Пазл стиля",

            free:
                level % 10 === 0 ? "🎁 Редкий сундук" :
                level % 5 === 0 ? "🧩 Пазл стиля" :
                level % 3 === 0 ? "🪙 150 монет" :
                "🪙 100 монет"
        };
    }),

    items: Array.from({ length: 30 }, (_, i) => {
        const level = i + 1;

        return {
            level,
            premium:
                level % 10 === 0 ? "🐉 Редкий питомец" :
                level % 5 === 0 ? "🏆 Эпик сундук" :
                level % 3 === 0 ? "🎒 Аксессуар" :
                level % 2 === 0 ? "🎁 Редкий сундук" :
                "🐾 Пазл питомца",

            free:
                level % 10 === 0 ? "🎁 Редкий сундук" :
                level % 5 === 0 ? "🧩 Пазл аксессуара" :
                level % 3 === 0 ? "🪙 150 монет" :
                "🪙 100 монет"
        };
    })
};
const fakePassState = {
    level: 32,
    xp: 4580,
    xpNeed: 7200,
    premium: false,
    claimedFree: [],
    claimedPremium: []
};
function switchPassTab(type) {
    activePassType = type;

    document.querySelectorAll(".pass-tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = Array.from(document.querySelectorAll(".pass-tab-btn")).find(btn => {
        return btn.getAttribute("onclick")?.includes(type);
    });

    if (activeBtn) {
        activeBtn.classList.add("active");
    }

    renderPassTrack();
}

function renderPassTrack() {
    const track = document.getElementById("pass-track");
    if (!track) return;

    const rewards = passRewards[activePassType] || [];
    const currentPassLevel = 2; // временно, потом заменим на playerData

    track.innerHTML = "";

    rewards.forEach(item => {
        const unlocked = item.level <= currentPassLevel;

        const row = document.createElement("div");
        row.className = `pass-row ${unlocked ? "unlocked" : "locked"}`;

        row.innerHTML = `
            <div class="pass-reward premium">
                <div class="pass-reward-icon">${item.premium.split(" ")[0]}</div>
                <div class="pass-reward-text">${item.premium}</div>
            </div>

            <div class="pass-level">
                <div class="pass-candle ${unlocked ? "lit" : ""}">🕯</div>
                <div class="pass-level-number">${item.level}</div>
            </div>

            <div class="pass-reward free">
                <div class="pass-reward-icon">${item.free.split(" ")[0]}</div>
                <div class="pass-reward-text">${item.free}</div>
            </div>
        `;

        track.appendChild(row);
    });
}
function getV2CharacterImage(key) {
    if (typeof getCharacterImagePath === "function") {
        return getCharacterImagePath(key, 0);
    }

    const config = charactersConfig[key];
    return config?.image || "";
}

function getV2GlowColor(key) {
    const colors = {
        helin: "rgba(180, 0, 255, 0.55)",
        lexapaws: "rgba(0, 255, 150, 0.55)",
        litwin: "rgba(255, 60, 60, 0.55)",
        nikkifn: "rgba(255, 211, 106, 0.55)",
        rejiboy: "rgba(255, 80, 180, 0.55)",
        rostickfaceskid: "rgba(255, 130, 40, 0.55)",
        sasavot: "rgba(0, 150, 255, 0.55)"
    };

    return colors[key] || "rgba(255, 211, 106, 0.45)";
}

function openCharactersScreenV2() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });

    const screen = document.getElementById("characters-screen-v2");
    if (screen) {
        screen.classList.add("active");
    }

    renderCharactersV2();
}

function selectCharacterV2(key) {
    playerData.activeCharacter = key;

    if (typeof savePlayerData === "function") {
        savePlayerData();
    }

    renderCharactersV2();
}

function renderCharactersV2() {
    ensureCharactersData();

    const activeKey = playerData.activeCharacter || "helin";
    const config = charactersConfig[activeKey];
    if (!config) return;

    const img = document.getElementById("v2-active-character");
    const name = document.getElementById("v2-character-name");
    const rarity = document.getElementById("v2-character-rarity");
    const desc = document.getElementById("v2-character-desc");
    const glow = document.getElementById("v2-character-glow");
    const carousel = document.getElementById("characters-v2-carousel");

    if (img) {
const selectedSkin = playerData.characterSkins?.[activeKey] || config.styles[0];
img.src = `image/characters/${config.folder}/${selectedSkin}`;
img.alt = config.name;
    }

    if (name) name.innerText = config.name;

    if (rarity) {
        rarity.innerText = config.rarityText;
        rarity.className = `v2-rarity ${config.rarity}`;
    }

    if (desc) {
        desc.innerText = config.desc;
    }

    const statRows = document.querySelectorAll(".v2-stats div b");
    if (statRows.length >= 4) {
        statRows[0].innerText = config.stats.hp;
        statRows[1].innerText = config.stats.attack;
        statRows[2].innerText = config.stats.defense;
        statRows[3].innerText = config.stats.luck;
    }

    if (glow) {
        glow.style.background = `radial-gradient(circle, ${getV2GlowColor(activeKey)}, transparent 70%)`;
    }

    if (!carousel) return;

    carousel.innerHTML = "";

    Object.keys(charactersConfig).forEach(key => {
        const char = charactersConfig[key];

        const card = document.createElement("div");
        card.className = "v2-character-card";

        if (key === activeKey) card.classList.add("active");

        card.innerHTML = `
            <img src="${getCharacterImagePath(key, 0)}" alt="${char.name}">
            <span>${char.name}</span>
        `;

        card.onclick = () => selectCharacterV2(key);
        carousel.appendChild(card);
    });
}
function confirmCharacterV2() {
    const activeKey = playerData.activeCharacter || "helin";
    playerData.selectedCharacter = activeKey;

    if (typeof savePlayerData === "function") {
        savePlayerData();
    }

    alert("Персонаж выбран!");
}
function openCharacterStylesV2() {
    const modal = document.getElementById("character-styles-modal");
    const list = document.getElementById("character-styles-list");

    const activeKey = playerData.activeCharacter || "helin";
    const char = charactersConfig[activeKey];

    if (!modal || !list || !char) return;

    list.innerHTML = "";

    char.styles.forEach((skinFile, index) => {
        const rarity = ["basic", "rare", "epic", "mythic"][index];
        const rarityText = {
            basic: "БАЗОВЫЙ",
            rare: "РЕДКИЙ",
            epic: "ЭПИЧЕСКИЙ",
            mythic: "МИФИЧЕСКИЙ"
        }[rarity];

        const card = document.createElement("div");
        card.className = `style-card style-${rarity}`;

        card.innerHTML = `
            <img src="image/characters/${char.folder}/${skinFile}" alt="">
            <div class="style-rarity">${rarityText}</div>
            <button onclick="selectCharacterSkinV2('${skinFile}')">ВЫБРАТЬ</button>
        `;

        list.appendChild(card);
    });

    modal.classList.add("active");
}

function closeCharacterStylesV2() {
    document.getElementById("character-styles-modal")?.classList.remove("active");
}

function selectCharacterSkinV2(skinFile) {
    const activeKey = playerData.activeCharacter || "helin";
    playerData.characterSkins = playerData.characterSkins || {};
    playerData.characterSkins[activeKey] = skinFile;

    const img = document.getElementById("v2-active-character");
    if (img) {
        img.src = `image/characters/${charactersConfig[activeKey].folder}/${skinFile}`;
    }

    if (typeof savePlayerData === "function") savePlayerData();

    closeCharacterStylesV2();
}
function openNewCharactersScreen() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    const screen = document.getElementById('heroes-screen');
    if (screen) screen.classList.add('active');

    renderNewHeroesScreen();
}

function renderNewHeroesScreen() {
    const list = document.getElementById('heroes-carousel');
    if (!list) return;

    list.innerHTML = '';

    Object.entries(charactersConfig).forEach(([key, char], index) => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.dataset.heroKey = key;

const previewSrc = char.preview || `image/characters/${char.folder}/skin-1.png`;

card.innerHTML = `
    <img src="${previewSrc}" />
    <div>${char.name}</div>
`;

        card.onclick = () => selectHero(key, 0);
        list.appendChild(card);

        if (index === 0) selectHero(key, 0);
    });
}
function selectHero(key, skinIndex = 0) {
    const char = charactersConfig[key];
    if (!char) return;

    selectedHeroKey = key;
    selectedHeroSkinIndex = skinIndex;

    const skinFile = char.styles[skinIndex] || "skin-1.png";

    const rarityEl = document.getElementById('hero-rarity');
    rarityEl.innerText = char.rarityText || "ДЕФОЛТ";
    rarityEl.className = "hero-rarity";

    if (char.rarity === "common") rarityEl.classList.add("rarity-common");
    if (char.rarity === "rare") rarityEl.classList.add("rarity-rare");
    if (char.rarity === "epic") rarityEl.classList.add("rarity-epic");
    if (char.rarity === "legendary") rarityEl.classList.add("rarity-legendary");

    document.getElementById('hero-name').innerText = char.name;
    document.getElementById('hero-desc').innerText = char.desc || '';
    document.getElementById('hero-ability').innerText = char.ability || '';

    document.getElementById('hero-hp').innerText = char.stats?.hp || 0;
    document.getElementById('hero-attack').innerText = char.stats?.attack || 0;
    document.getElementById('hero-defense').innerText = char.stats?.defense || 0;
    document.getElementById('hero-luck').innerText = char.stats?.luck || '0%';

    document.getElementById('hero-main-img').src =
        `image/characters/${char.folder}/${skinFile}`;

    document.querySelectorAll('.hero-card').forEach(card => {
        card.classList.toggle('active', card.dataset.heroKey === key);
    });
}

function renderHeroSkins() {
    const list = document.getElementById('hero-skins-list');
    if (!list || !selectedHeroKey) return;

    const char = charactersConfig[selectedHeroKey];
    if (!char) return;

    list.innerHTML = '';

    char.styles.forEach((skinFile, index) => {
        const rarity = heroSkinRarities[index] || heroSkinRarities[0];

        const btn = document.createElement('button');
        btn.className = 'hero-skin-btn';
        btn.dataset.rarity = rarity.id;

        if (index === selectedHeroSkinIndex) {
            btn.classList.add('active');
        }

        btn.innerHTML = `<span>${rarity.name}</span>`;
        btn.onclick = () => selectHero(selectedHeroKey, index);

        list.appendChild(btn);
    });
}


const heroSkinRarities = [
    { id: "common", name: "ОБЫЧНЫЙ", color: "#b8b8b8" },
    { id: "rare", name: "РЕДКИЙ", color: "#3aa0ff" },
    { id: "epic", name: "ЭПИЧЕСКИЙ", color: "#b84dff" },
    { id: "legendary", name: "ЛЕГЕНДАРНЫЙ", color: "#ffd36a" }
];

let selectedHeroKey = null;
let selectedHeroSkinIndex = 0;
function scrollHeroesCarousel(direction) {
    const carousel = document.getElementById('heroes-carousel');
    if (!carousel) return;

    const cardWidth = 191; // 175 карточка + 16 gap
    carousel.scrollLeft += direction * cardWidth;
}
let currentCharacter = "sasavot";
let currentRarity = "common";
let selectedStyle = null;
const stylesData = {
    sasavot: {
        common: [
            {
                id: "default",
                name: "ДЕФОЛТ",
                img: "image/characters/sasavot/skin-1.png",
                unlocked: true,
                rarity: "common",
                required: 0,
                level: 3
            }
        ],
        rare: [
            {
                id: "rare",
                name: "РЕДКИЙ",
                img: "image/characters/sasavot/skin-2.png",
                unlocked: false,
                rarity: "rare",
                required: 80,
                level: 0
            }
        ],
        epic: [
            {
                id: "epic",
                name: "ЭПИЧЕСКИЙ",
                img: "image/characters/sasavot/skin-3.png",
                unlocked: false,
                rarity: "epic",
                required: 150,
                level: 0
            }
        ],
        legendary: [
            {
                id: "legendary",
                name: "ЛЕГЕНДАРНЫЙ",
                img: "image/characters/sasavot/skin-4.png",
                unlocked: false,
                rarity: "legendary",
                required: 300,
                level: 0
            }
        ]
    }
};

function openStylesScreen(character) {
    currentCharacter = character;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('styles-screen').classList.add('active');

    renderStyles();
}

function selectRarity(rarity) {
    currentRarity = rarity;

    document.querySelectorAll('.style-rarity').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    renderStyles();
    updateUI();
}

function renderStyles() {
    const list = stylesData[currentCharacter][currentRarity] || [];
    const container = document.getElementById('styles-carousel');

    container.innerHTML = '';

    list.forEach(style => {
        const div = document.createElement('div');
        const equippedId = playerData.equippedStyles?.[currentCharacter];

div.className = 'style-card '
    + (style.unlocked ? '' : 'locked ')
    + (equippedId === style.id ? 'equipped' : '');

        div.innerHTML = `
            <img src="${style.img}" style="width:100%">
            <div>${style.id}</div>
        `;

        div.onclick = () => selectStyle(style);

        container.appendChild(div);
    });

    if (list[0]) selectStyle(list[0]);
}

function selectStyle(style) {
    selectedStyle = style;

    const characterConfig = charactersConfig[currentCharacter];

    document.getElementById('style-preview-img').src = style.img;
    document.getElementById('styles-character-name').innerText =
        characterConfig?.name || currentCharacter.toUpperCase();

    document.getElementById('style-name').innerText = style.name || style.id;
    document.getElementById('style-desc').innerText =
        style.unlocked ? "Стиль доступен для выбора." : "Собери тканевые фрагменты, чтобы открыть этот стиль.";

    document.getElementById('style-level').innerText =
        `УРОВЕНЬ ${style.level || 0}`;

    const badge = document.getElementById('style-rarity-badge');
    if (badge) {
        badge.className = `style-rarity-badge ${style.rarity}`;
        badge.innerText = getStyleRarityText(style.rarity);
    }

    if (style.unlocked) {
        document.getElementById('style-action-btn').innerText = "ВЫБРАТЬ";
    } else {
        const playerClothForOpen =
    playerData.resources.clothFragments?.[currentCharacter]?.[style.rarity] ?? 0;

document.getElementById('style-action-btn').innerText =
    `ОТКРЫТЬ: ${playerClothForOpen}/${style.required} ФРАГМЕНТОВ`;
    }
const level = style.level || 0;
const upgradeCostLine = document.getElementById('upgrade-cost-line');
const upgradeBtn = document.getElementById('style-upgrade-btn');
const costText = document.querySelector('.styles-dota-cost');

if (level < maxStyleLevel) {
    const cost = styleUpgradeCosts[level];

    const playerGold = playerData.resources.gold ?? 0;
    const playerShards = playerData.resources.powerShards ?? 0;
    const playerCloth =
        playerData.resources.clothFragments?.[currentCharacter]?.[style.rarity] ?? 0;

    if (upgradeCostLine && upgradeBtn) {
        upgradeCostLine.innerHTML = `
            <span class="${playerGold >= cost.gold ? 'cost-ok' : 'cost-bad'}">🪙 ${cost.gold}</span>
            <span class="${playerShards >= cost.powerShards ? 'cost-ok' : 'cost-bad'}">🔮 ${cost.powerShards}</span>
            <span class="${playerCloth >= cost.cloth ? 'cost-ok' : 'cost-bad'}">🧵 ${cost.cloth}</span>
        `;

        upgradeBtn.disabled =
            !style.unlocked ||
            playerGold < cost.gold ||
            playerShards < cost.powerShards ||
            playerCloth < cost.cloth;
    }

    if (costText) {
        costText.innerText = style.unlocked
            ? "Ресурсы для прокачки"
            : "Сначала открой этот стиль";
    }
} else {
    if (costText) costText.innerText = "Максимальный уровень";
    if (upgradeCostLine) upgradeCostLine.innerText = "MAX";
    if (upgradeBtn) upgradeBtn.disabled = true;
}
}
function getStyleRarityText(rarity) {
    const map = {
        common: "ОБЫЧНЫЙ",
        rare: "РЕДКИЙ",
        epic: "ЭПИЧЕСКИЙ",
        legendary: "ЛЕГЕНДАРНЫЙ"
    };

    return map[rarity] || rarity;
}
function upgradeSelectedStyle() {
    if (!selectedStyle) return;

    const level = selectedStyle.level || 0;

    if (level >= maxStyleLevel) {
        alert("Максимальный уровень!");
        return;
    }

    const cost = styleUpgradeCosts[level];
    if (!cost) return;

    const char = currentCharacter;
    const rarity = selectedStyle.rarity;

    const playerRes = playerData.resources;

    const hasGold = playerRes.gold >= cost.gold;
    const hasShards = playerRes.powerShards >= cost.powerShards;
    const hasCloth =
        playerRes.clothFragments?.[char]?.[rarity] >= cost.cloth;

    if (!hasGold || !hasShards || !hasCloth) {
        alert("Недостаточно ресурсов!");
        return;
    }
    playerRes.gold -= cost.gold;
    playerRes.powerShards -= cost.powerShards;
    playerRes.clothFragments[char][rarity] -= cost.cloth;

    selectedStyle.level = level + 1;
    savePlayer();
    selectStyle(selectedStyle);
    updateUI();
    alert("Стиль улучшен!");
}
const styleActionBtn = document.getElementById('style-action-btn');

if (styleActionBtn) {
    styleActionBtn.onclick = function () {
        if (!selectedStyle) return;

if (selectedStyle.unlocked) {
    if (!playerData.equippedStyles) {
        playerData.equippedStyles = {};
    }

    playerData.equippedStyles[currentCharacter] = selectedStyle.id;

    savePlayer();
    renderStyles();
    selectStyle(selectedStyle);
    updateUI();

    alert("Стиль выбран!");
    return;
}

        const char = currentCharacter;
        const rarity = selectedStyle.rarity;

        const required = selectedStyle.required || 0;

        const playerCloth =
            playerData.resources.clothFragments?.[char]?.[rarity] ?? 0;

        if (playerCloth < required) {
            alert("Недостаточно тканевых фрагментов!");
            return;
        }

        playerData.resources.clothFragments[char][rarity] -= required;

        selectedStyle.unlocked = true;
        savePlayer();

        selectStyle(selectedStyle);
        updateUI();

        alert("Стиль открыт!");
    };
}
function savePlayer() {
    localStorage.setItem('playerData', JSON.stringify(playerData));
}

function loadPlayer() {
    const saved = localStorage.getItem('playerData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(playerData, data);
        } catch (e) {
            console.error("Ошибка загрузки сохранения");
        }
    }
}
function openShopTab(tab) {
    const content = document.getElementById("shop-content");
    content.innerHTML = "";

    shopData[tab].forEach(item => {
        const div = document.createElement("div");
        div.className = "shop-item";

        div.innerHTML = `
            <div class="shop-title">${item.name}</div>
            <div class="shop-desc">
                ${item.amount ? "+" + item.amount : item.reward || ""}
            </div>
            <button onclick="buyItem('${tab}', '${item.id}')">
                Купить за ${item.price} 💎
            </button>
        `;

        content.appendChild(div);
    });
}
function buyItem(type, id) {
    const item = shopData[type].find(i => i.id === id);

    if (!item) return;

    if (playerData.resources.premiumTokens < item.price) {
        alert("Недостаточно гемов!");
        return;
    }

    playerData.resources.premiumTokens -= item.price;

    if (type === "currency") {
        if (id.includes("gold")) playerData.resources.gold += item.amount;
        if (id === "shards") playerData.resources.powerShards += item.amount;
        if (id === "energy") playerData.resources.energy += item.amount;
    }

    if (type === "chests") {
        openChest(item.id); // потом сделаем
    }

    if (type === "packs") {
        alert("Пак куплен (потом сделаем награды)");
    }

    savePlayer();
    updateUI();
}



function openShopScreen() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('shop-screen').classList.add('active');

    openShopTab('chests');
    updateUI();
}

function openShopTab(tab) {
    const content = document.getElementById("shop-content");
    if (!content) return;

    content.innerHTML = "";

    document.querySelectorAll('.shop-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = Array.from(document.querySelectorAll('.shop-tabs button')).find(btn => {
        return btn.getAttribute('onclick')?.includes(`'${tab}'`);
    });

    if (activeBtn) activeBtn.classList.add('active');

    shopData[tab].forEach(item => {
        const div = document.createElement("div");
        div.className = `shop-item shop-item-${tab}`;

        div.innerHTML = `
            <div class="shop-icon">${item.icon}</div>

            <div class="shop-title">${item.name}</div>

            <div class="shop-desc">
                ${item.amount ? "+" + item.amount.toLocaleString() : item.reward || item.desc || ""}
            </div>

            <button onclick="buyItem('${tab}', '${item.id}')">
                Купить за ${item.price} 💎
            </button>
        `;

        content.appendChild(div);
    });
}

function buyItem(type, id) {
    const item = shopData[type].find(i => i.id === id);
    if (!item) return;

    if (!playerData.resources.premiumTokens) {
        playerData.resources.premiumTokens = 0;
    }

    if (playerData.resources.premiumTokens < item.price) {
        alert("Недостаточно гемов!");
        return;
    }

    playerData.resources.premiumTokens -= item.price;

    if (type === "currency") {
        if (id.includes("gold")) {
            playerData.resources.gold += item.amount;
        }

        if (id.includes("shards")) {
            playerData.resources.powerShards += item.amount;
        }

        if (id.includes("energy")) {
            playerData.resources.energy += item.amount;
        }
    }

    if (type === "chests") {
        if (!playerData.chests) {
            playerData.chests = {
                common: 0,
                rare: 0,
                epic: 0,
                legendary: 0
            };
        }

        playerData.chests[item.id] += 1;
        alert(`${item.name} добавлен в инвентарь!`);
    }

    if (type === "packs") {
        givePackReward(item.id);
    }

    savePlayer();
    updateUI();
    openShopTab(type);
}

function givePackReward(packId) {
    if (!playerData.chests) {
        playerData.chests = {
            common: 0,
            rare: 0,
            epic: 0,
            legendary: 0
        };
    }

    if (packId === "starter") {
        playerData.resources.gold += 10000;
        playerData.resources.powerShards += 300;
        playerData.chests.rare += 1;
    }

    if (packId === "power") {
        playerData.resources.gold += 50000;
        playerData.resources.powerShards += 1500;
        playerData.chests.epic += 1;
    }

    if (packId === "legend") {
        playerData.resources.gold += 100000;
        playerData.resources.powerShards += 3000;
        playerData.chests.legendary += 1;
    }

    alert("Набор куплен!");
}

const chestsConfig = {
    common: {
        price: 50,
        rewards: {
            gold: [100, 200],
            powerShards: [10, 20],
            clothChance: {
                common: 70,
                rare: 25,
                epic: 5,
                legendary: 0
            }
        }
    },
    rare: {
        price: 120,
        rewards: {
            gold: [200, 400],
            powerShards: [20, 50],
            clothChance: {
                common: 40,
                rare: 40,
                epic: 15,
                legendary: 5
            }
        }
    },
    epic: {
        price: 300,
        rewards: {
            gold: [500, 1000],
            powerShards: [50, 120],
            clothChance: {
                common: 20,
                rare: 40,
                epic: 30,
                legendary: 10
            }
        }
    },
    legendary: {
        price: 800,
        rewards: {
            gold: [1500, 3000],
            powerShards: [150, 300],
            clothChance: {
                common: 0,
                rare: 30,
                epic: 50,
                legendary: 20
            }
        }
    }
};function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRarity(chances) {
    const rand = Math.random() * 100;
    let sum = 0;

    for (let rarity in chances) {
        sum += chances[rarity];
        if (rand <= sum) return rarity;
    }

    return "common";
}
function openChest(type) {
    const chest = chestsConfig[type];

    // проверка валюты
    if (playerData.resources.energy < 1) {
        alert("Нет энергии");
        return;
    }

    playerData.resources.energy -= 1;

    const gold = getRandom(...chest.rewards.gold);
    const shards = getRandom(...chest.rewards.powerShards);
    const rarity = getRandomRarity(chest.rewards.clothChance);

    const character = "sasavot"; // потом сделаем выбор

    // начисляем
    playerData.resources.gold += gold;
    playerData.resources.powerShards += shards;

    if (!playerData.resources.clothFragments[character]) {
        playerData.resources.clothFragments[character] = {
            common: 0,
            rare: 0,
            epic: 0,
            legendary: 0
        };
    }

    playerData.resources.clothFragments[character][rarity] += 1;

    showChestReward({
        gold,
        shards,
        rarity
    });

    updateUI();
}
function showChestReward(reward) {
    document.getElementById("reward-gold").innerText =
        `🪙 Золото: +${reward.gold}`;

    document.getElementById("reward-shards").innerText =
        `🔮 Осколки: +${reward.shards}`;

    document.getElementById("reward-cloth").innerText =
        `🧵 Ткань (${reward.rarity}): +1`;

    document.getElementById("chest-reward-modal").classList.add("active");
}

function closeChestReward() {
    document.getElementById("chest-reward-modal").classList.remove("active");
}
function switchShopTab(tab) {
    document.querySelectorAll('.shop-grid').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.shop-tab').forEach(el => el.classList.remove('active'));

    document.getElementById('shop-' + tab).classList.add('active');

    event.target.classList.add('active');
}
// === НОВЫЙ МАГАЗИН С КАРТИНКАМИ UI ===

const shopData = {
    currency: [
        {
            id: "gold-small",
            name: "Мешок золота",
            desc: "+10 000",
            price: 80,
            img: "image/ui/gold.png"
        },
        {
            id: "gold-big",
            name: "Сундук золота",
            desc: "+50 000",
            price: 300,
            img: "image/ui/gold.png"
        },
        {
            id: "shards-small",
            name: "Осколки силы",
            desc: "+500",
            price: 120,
            img: "image/ui/power-shards.png"
        },
        {
            id: "shards-big",
            name: "Большие осколки",
            desc: "+2 500",
            price: 500,
            img: "image/ui/power-shards.png"
        },
        {
            id: "energy-small",
            name: "Энергия",
            desc: "+50",
            price: 40,
            img: "image/ui/energy.png"
        },
        {
            id: "energy-big",
            name: "Большая энергия",
            desc: "+120",
            price: 80,
            img: "image/ui/energy.png"
        }
    ],

    chests: [
        {
            id: "common",
            name: "Обычный сундук",
            desc: "Базовые награды",
            price: 50,
            img: "image/ui/chest-common.png"
        },
        {
            id: "rare",
            name: "Редкий сундук",
            desc: "Больше редких наград",
            price: 120,
            img: "image/ui/chest-rare.png"
        },
        {
            id: "epic",
            name: "Эпический сундук",
            desc: "Высокий шанс ценных наград",
            price: 300,
            img: "image/ui/chest-epic.png"
        },
        {
            id: "legendary",
            name: "Легендарный сундук",
            desc: "Лучшие награды",
            price: 800,
            img: "image/ui/chest-legendary.png"
        }
    ],

    packs: [
        {
            id: "starter",
            name: "Стартовый набор",
            desc: "Золото + осколки + сундук",
            price: 149,
            img: "image/ui/chest-rare.png"
        },
        {
            id: "power",
            name: "Набор силы",
            desc: "Много осколков силы",
            price: 299,
            img: "image/ui/power-shards.png"
        },
        {
            id: "legend",
            name: "Легендарный набор",
            desc: "Топ награды",
            price: 599,
            img: "image/ui/chest-legendary.png"
        }
    ]
};

function openShopScreen() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    let shopScreen = document.getElementById("shop-screen");

    if (!shopScreen) {
        shopScreen = document.createElement("div");
        shopScreen.id = "shop-screen";
        shopScreen.className = "screen active";

        shopScreen.innerHTML = `
            <div class="shop-page">
                <h1 class="shop-title-main">МАГАЗИН</h1>

                <div class="shop-tabs">
                    <button class="active" onclick="openShopTab('currency')">Валюта</button>
                    <button onclick="openShopTab('chests')">Сундуки</button>
                    <button onclick="openShopTab('packs')">Наборы</button>
                </div>

                <div id="shop-content" class="shop-content"></div>
            </div>
        `;

        document.body.appendChild(shopScreen);
    } else {
        shopScreen.classList.add("active");
    }

    openShopTab("currency");
}

function openShopTab(tab) {
    const content = document.getElementById("shop-content");
    if (!content) return;

    content.innerHTML = "";

    document.querySelectorAll(".shop-tabs button").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = Array.from(document.querySelectorAll(".shop-tabs button")).find(btn => {
        return btn.getAttribute("onclick")?.includes(`'${tab}'`);
    });

    if (activeBtn) activeBtn.classList.add("active");

    shopData[tab].forEach(item => {
        const div = document.createElement("div");
        div.className = `shop-item shop-item-${tab}`;

        div.innerHTML = `
            <div class="shop-icon-wrap">
                <img class="shop-item-img" src="${item.img}" alt="${item.name}">
            </div>

            <div class="shop-title">${item.name}</div>

            <div class="shop-desc">${item.desc}</div>

            <button onclick="buyItem('${tab}', '${item.id}')">
                Купить за ${item.price} 💎
            </button>
        `;

        content.appendChild(div);
    });
}
// === SHOP V2: магазин как на рефе ===

window.shopV2Data = {
    recommended: [
        {
            title: "Стартовый набор",
            img: "./image/ui/chest-epic.png",
            rewards: "💎 500   🪙 10 000   📦 x2",
            price: "149 ₽",
            badge: "ВЫГОДНО"
        },
        {
            title: "Набор силы",
            img: "./image/ui/power-shards.png",
            rewards: "💎 1200   🔮 600   🪙 20 000",
            price: "299 ₽",
            badge: "ХИТ"
        },
        {
            title: "Эпический набор",
            img: "./image/ui/chest-epic.png",
            rewards: "💎 2500   🔮 1500   📦 x5",
            price: "599 ₽",
            badge: "ЛУЧШИЙ"
        },
        {
            title: "Легендарный набор",
            img: "./image/ui/chest-legendary.png",
            rewards: "💎 5000   🔮 3000   📦 x10",
            price: "1199 ₽",
            badge: "МАКСИМУМ"
        }
    ],

    chests: [
        {
            id: "common",
            title: "Обычный сундук",
            img: "./image/ui/chest-common.png",
            desc: "Содержит обычные награды",
            price: "50"
        },
        {
            id: "rare",
            title: "Редкий сундук",
            img: "./image/ui/chest-rare.png",
            desc: "Больше редких наград",
            price: "120"
        },
        {
            id: "epic",
            title: "Эпический сундук",
            img: "./image/ui/chest-epic.png",
            desc: "Высокий шанс эпических наград",
            price: "300"
        },
        {
            id: "legendary",
            title: "Легендарный сундук",
            img: "./image/ui/chest-legendary.png",
            desc: "Лучшие награды",
            price: "800"
        }
    ],

    currency: [
        {
            title: "Золото",
            img: "./image/ui/gold.png",
            amount: "10 000",
            price: "50"
        },
        {
            title: "Гемы",
            img: "./image/ui/gems.png",
            amount: "500",
            price: "100"
        },
        {
            title: "Осколки силы",
            img: "./image/ui/power-shards.png",
            amount: "500",
            price: "100"
        },
        {
            title: "Осколки силы",
            img: "./image/ui/power-shards.png",
            amount: "2500",
            price: "400"
        },
        {
            title: "Энергия",
            img: "./image/ui/energy.png",
            amount: "50",
            price: "30"
        },
        {
            title: "Энергия",
            img: "./image/ui/energy.png",
            amount: "120",
            price: "60"
        }
    ]
};

function openShopScreen() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    let shopScreen = document.getElementById("shop-screen");

    if (!shopScreen) {
        shopScreen = document.createElement("div");
        shopScreen.id = "shop-screen";
        shopScreen.className = "screen active";

        shopScreen.innerHTML = `
            <div class="shop-v2">

                <aside class="shop-v2-sidebar">
                    <div class="shop-v2-side-item active">🛒 <span>Магазин</span></div>
                    <div class="shop-v2-side-item">📦 <span>Сундуки</span></div>
                    <div class="shop-v2-side-item">💎 <span>Валюта</span></div>
                    <div class="shop-v2-side-item">🎁 <span>Наборы</span></div>
                    <div class="shop-v2-side-item">⚡ <span>Энергия</span></div>
                </aside>

                <main class="shop-v2-main">
                    <div class="shop-v2-top">
                        <h1>МАГАЗИН</h1>
                    </div>

                    <div class="shop-v2-tabs">
                        <button class="active">Рекомендуем</button>
                        <button>Сундуки</button>
                        <button>Валюта</button>
                        <button>Наборы</button>
                        <button>Энергия</button>
                    </div>

                    <section>
                        <div class="shop-v2-section-title">РЕКОМЕНДУЕМ</div>
                        <div class="shop-v2-recommend-grid" id="shop-v2-recommended"></div>
                    </section>

                    <section>
                        <div class="shop-v2-section-row">
                            <div class="shop-v2-section-title">СУНДУКИ</div>
                            <div class="shop-v2-see-all">СМОТРЕТЬ ВСЕ ›</div>
                        </div>
                        <div class="shop-v2-chest-grid" id="shop-v2-chests"></div>
                    </section>

                    <section>
                        <div class="shop-v2-section-row">
                            <div class="shop-v2-section-title">ВАЛЮТА</div>
                            <div class="shop-v2-see-all">СМОТРЕТЬ ВСЕ ›</div>
                        </div>
                        <div class="shop-v2-currency-grid" id="shop-v2-currency"></div>
                    </section>
                </main>

            </div>
        `;

        document.body.appendChild(shopScreen);
    } else {
        shopScreen.classList.add("active");
    }

    renderShopV2();
}

function renderShopV2() {
    const rec = document.getElementById("shop-v2-recommended");
    const chests = document.getElementById("shop-v2-chests");
    const currency = document.getElementById("shop-v2-currency");

    if (!rec || !chests || !currency) return;

    rec.innerHTML = window.shopV2Data.recommended.map(item => `
        <div class="shop-v2-pack-card">
            <div class="shop-v2-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            <img src="${item.img}" alt="${item.title}">
            <div class="shop-v2-rewards">${item.rewards}</div>
            <button>${item.price}</button>
        </div>
    `).join("");

    chests.innerHTML = window.shopV2Data.chests.map(item => `
        <div class="shop-v2-chest-card" onclick="openChest('${item.id}')">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <button>💎 ${item.price}</button>
        </div>
    `).join("");

    currency.innerHTML = window.shopV2Data.currency.map(item => `
        <div class="shop-v2-small-card">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <strong>${item.amount}</strong>
            <button>💎 ${item.price}</button>
        </div>
    `).join("");
}
// === SHOP V3 FINAL ===

const shopV3 = {
recommend: [
    { title: "СТАРТОВЫЙ СУНДУК", img: "./image/ui/pack-starter-chest.png", rewards: "💎 550   🪙 10 000   📦 x2", price: "199 ₽", badge: "ВЫГОДНО" },
    { title: "СУНДУК СИЛЫ", img: "./image/ui/pack-power-chest.png", rewards: "🔮 1200   🪙 20 000   💎 500", price: "299 ₽", badge: "ХИТ" },
    { title: "ЭПИЧЕСКИЙ ЗАПАС", img: "./image/ui/pack-epic-supply.png", rewards: "📦 x5   🔮 1500   💎 1200", price: "599 ₽", badge: "ЛУЧШИЙ" },
    { title: "КОРОЛЕВСКИЙ СУНДУК", img: "./image/ui/pack-royal-chest.png", rewards: "📦 x10   💎 2500   🪙 50 000", price: "999 ₽", badge: "ТОП" },
    { title: "ПРОПУСК СТИЛЕЙ", img: "./image/ui/pass-style.png", rewards: "14 дней • стили и ткань", price: "399 ₽", badge: "PASS" },
    { title: "ПРОПУСК СПУТНИКОВ+", img: "./image/ui/pass-pet-plus.png", rewards: "+10 уровней • финальный питомец", price: "699 ₽", badge: "MAX" }
],

    chests: [
        { id: "common", title: "ОБЫЧНЫЙ СУНДУК", img: "./image/ui/chest-common.png", desc: "Базовые награды", price: "50" },
        { id: "rare", title: "РЕДКИЙ СУНДУК", img: "./image/ui/chest-rare.png", desc: "Больше редких наград", price: "120" },
        { id: "epic", title: "ЭПИЧЕСКИЙ СУНДУК", img: "./image/ui/chest-epic.png", desc: "Высокий шанс эпика", price: "300" },
        { id: "legendary", title: "ЛЕГЕНДАРНЫЙ СУНДУК", img: "./image/ui/chest-legendary.png", desc: "Лучшие награды", price: "800" }
    ],

currency: [
    { title: "100 ГЕМОВ", img: "./image/ui/gems-100.png", amount: "100 💎", price: "49 ₽" },
    { title: "550 ГЕМОВ", img: "./image/ui/gems-550.png", amount: "550 💎", price: "199 ₽" },
    { title: "1200 ГЕМОВ", img: "./image/ui/gems-1200.png", amount: "1200 💎", price: "399 ₽" },
    { title: "2500 ГЕМОВ", img: "./image/ui/gems-2500.png", amount: "2500 💎", price: "799 ₽" },
    { title: "5500 ГЕМОВ", img: "./image/ui/gems-5500.png", amount: "5500 💎", price: "1499 ₽" },
    { title: "12000 ГЕМОВ", img: "./image/ui/gems-12000.png", amount: "12000 💎", price: "2999 ₽" }
],

packs: [
    { title: "НАБОР НОВИЧКА", img: "./image/ui/pack-starter.png", rewards: "💎 100   🪙 5000   📦 x1", price: "99 ₽", badge: "START" },
    { title: "НАБОР ОХОТНИКА", img: "./image/ui/pack-hunter.png", rewards: "💎 550   📦 x2   ⚡ 120", price: "199 ₽", badge: "NEW" },
    { title: "НАБОР СИЛЫ", img: "./image/ui/pack-power.png", rewards: "🔮 1500   🪙 20000   💎 500", price: "299 ₽", badge: "ХИТ" },
    { title: "ЭПИЧЕСКИЙ НАБОР", img: "./image/ui/pack-epic.png", rewards: "📦 x5   💎 1200   🔮 1500", price: "599 ₽", badge: "EPIC" },
    { title: "ЛЕГЕНДАРНЫЙ НАБОР", img: "./image/ui/pack-legendary.png", rewards: "📦 x10   💎 2500   🪙 50000", price: "999 ₽", badge: "LEGEND" },
    { title: "МАКСИМАЛЬНЫЙ НАБОР", img: "./image/ui/pack-max.png", rewards: "📦 x20   💎 5500   🔮 5000", price: "1999 ₽", badge: "MAX" },
    { title: "СУНДУК ГЕМОБОЯ", img: "./image/ui/pack-gems.png", rewards: "💎 2500   📦 x4   ⚡ 300", price: "899 ₽", badge: "GEMS" },
    { title: "СУНДУК ЛЕГЕНД", img: "./image/ui/pack-ultra.png", rewards: "📦 x25   💎 8000   🔮 8000", price: "2999 ₽", badge: "ULTRA" }
],
energy: [
    { title: "50 ЭНЕРГИИ", img: "./image/ui/energy-50.png", amount: "+50 ⚡", price: "30 💎" },
    { title: "120 ЭНЕРГИИ", img: "./image/ui/energy-120.png", amount: "+120 ⚡", price: "60 💎" },
    { title: "300 ЭНЕРГИИ", img: "./image/ui/energy-300.png", amount: "+300 ⚡", price: "140 💎" },
    { title: "700 ЭНЕРГИИ", img: "./image/ui/energy-700.png", amount: "+700 ⚡", price: "300 💎" }
],

pass: [
    { title: "ПРОПУСК СТИЛЕЙ", img: "./image/ui/pass-style.png", amount: "14 дней • стили и ткань", price: "399 ₽" },
    { title: "ПРОПУСК СТИЛЕЙ+", img: "./image/ui/pass-style-plus.png", amount: "+10 уровней • финальный скин", price: "699 ₽" },
    { title: "ПРОПУСК СПУТНИКОВ", img: "./image/ui/pass-pet.png", amount: "14 дней • питомцы и предметы", price: "399 ₽" },
    { title: "ПРОПУСК СПУТНИКОВ+", img: "./image/ui/pass-pet-plus.png", amount: "+10 уровней • финальный питомец", price: "699 ₽" },
    { title: "5 УРОВНЕЙ", img: "./image/ui/pass-level-5.png", amount: "Для активного пропуска", price: "350 💎" },
    { title: "10 УРОВНЕЙ", img: "./image/ui/pass-level-10.png", amount: "Для активного пропуска", price: "650 💎" }
]
};

function openShopScreen() {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

    const shop = document.getElementById("shop-screen");
    if (!shop) return;

    shop.classList.add("active");
    renderShopV3();
    setShopCategory("recommend");
}

function renderShopV3() {
    const rec = document.getElementById("shop-v3-recommend");
    const chests = document.getElementById("shop-v3-chests");
    const currency = document.getElementById("shop-v3-currency");

    if (!rec || !chests || !currency) return;

    rec.innerHTML = shopV3.recommend.map(item => `
        <div class="shop-v3-pack-card">
            <div class="shop-v3-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            <img src="${item.img}" alt="${item.title}">
            <div class="shop-v3-rewards">${item.rewards}</div>
            <button>${item.price}</button>
        </div>
    `).join("");

    chests.innerHTML = shopV3.chests.map(item => `
        <div class="shop-v3-chest-card" onclick="buyChest('${item.id}')">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <button><img src="./image/ui/gems.png"> ${item.price}</button>
        </div>
    `).join("");

    currency.innerHTML = shopV3.currency.map(item => `
        <div class="shop-v3-small-card">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <strong>${item.amount}</strong>
            <button><img src="./image/ui/gems.png"> ${item.price}</button>
        </div>
    `).join("");
    const packs = document.getElementById("shop-v3-packs");
const energy = document.getElementById("shop-v3-energy-grid");
const pass = document.getElementById("shop-v3-pass");

if (packs) {
    packs.innerHTML = shopV3.packs.map(item => `
        <div class="shop-v3-pack-card">
            <div class="shop-v3-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            <img src="${item.img}" alt="${item.title}">
            <div class="shop-v3-rewards">${item.rewards}</div>
            <button>${item.price}</button>
        </div>
    `).join("");
}

if (energy) {
    energy.innerHTML = shopV3.energy.map(item => `
        <div class="shop-v3-small-card">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <strong>${item.amount}</strong>
            <button>${item.price}</button>
        </div>
    `).join("");
}

if (pass) {
    pass.innerHTML = shopV3.pass.map(item => `
        <div class="shop-v3-small-card">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <strong>${item.amount}</strong>
            <button>${item.price}</button>
        </div>
    `).join("");
}

    if (typeof playerData !== "undefined") {
        document.getElementById("shop-v3-gold").innerText = playerData.resources?.gold ?? 0;
        document.getElementById("shop-v3-gems").innerText = playerData.resources?.premiumTokens ?? 0;
        document.getElementById("shop-v3-shards").innerText = playerData.resources?.powerShards ?? 0;
        document.getElementById("shop-v3-energy").innerText = `${playerData.resources?.energy ?? 0}/120`;
    }
}
function setShopCategory(category) {
    document.querySelectorAll(".shop-v3-tabs button").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelectorAll(".shop-v3-side").forEach(btn => {
        btn.classList.remove("active");
    });

    const map = {
        recommended: 0,
        chests: 1,
        currency: 2,
        packs: 3,
        energy: 4,
        pass: 5
    };

    const index = map[category];

    const tabs = document.querySelectorAll(".shop-v3-tabs button");
    const side = document.querySelectorAll(".shop-v3-side");

    if (tabs[index]) tabs[index].classList.add("active");
    if (side[index]) side[index].classList.add("active");

    renderShopCategory(category);
}
// === SHOP V3 CATEGORY FILTER ===

function setShopCategory(category) {
    const sections = {
        recommend: ["shop-v3-recommend"],
        chests: ["shop-v3-chests"],
        currency: ["shop-v3-currency"],
        packs: ["shop-v3-packs"],
        energy: ["shop-v3-energy-grid"],
        pass: ["shop-v3-pass"]
    };

    // скрываем всё
    document.querySelectorAll(".shop-v3-section").forEach(section => {
        section.style.display = "none";
    });

    // показываем нужное
    const ids = sections[category] || sections.recommend;

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const section = el.closest(".shop-v3-section");
            if (section) section.style.display = "block";
        }
    });

    // убираем активность
    document.querySelectorAll(".shop-v3-side").forEach(btn => {
        btn.classList.remove("active");
    });

    // активная кнопка
    const btn = document.querySelector(`.shop-v3-side[onclick*="${category}"]`);
    if (btn) btn.classList.add("active");
}
// === CHEST OPENING CINEMATIC ===

let selectedChestType = "common";

const openingChestImages = {
    common: "./image/ui/chest-common.png",
    rare: "./image/ui/chest-rare.png",
    epic: "./image/ui/chest-epic.png",
    legendary: "./image/ui/chest-legendary.png"
};

function openChest(type) {
    selectedChestType = type || "common";

    const screen = document.getElementById("chest-opening-screen");
    const img = document.getElementById("opening-chest-img");
    const status = document.getElementById("chest-opening-status");
    const btn = document.getElementById("chest-open-action");

    if (!screen || !img || !status || !btn) return;

    img.src = openingChestImages[selectedChestType] || openingChestImages.common;
    img.classList.remove("shake");

    status.innerText = "Нажми открыть";
    btn.style.display = "block";
    btn.disabled = false;

    screen.classList.add("active");
}

function closeChestOpening() {
    const screen = document.getElementById("chest-opening-screen");
    if (screen) screen.classList.remove("active");
}

function startChestOpenAnimation() {
    const img = document.getElementById("opening-chest-img");
    const flash = document.querySelector(".chest-flash");
    const status = document.getElementById("chest-opening-status");
    const btn = document.getElementById("chest-open-action");

    if (!img || !flash || !status || !btn) return;

    btn.disabled = true;
    btn.style.display = "none";
    status.innerText = "Сундук открывается...";

    img.classList.add("shake");

    setTimeout(() => {
        img.classList.remove("shake");
        flash.classList.add("active");
        status.innerText = "Награда найдена!";
    }, 1400);

    setTimeout(() => {
        flash.classList.remove("active");
        closeChestOpening();
const rewards = generateChestRewards(selectedChestType);
openRewardScreen(rewards);
    }, 2300);
}
// === REWARD REVEAL ===

function openRewardScreen(rewards) {
    pendingChestRewards = rewards;
    const screen = document.getElementById("reward-screen");
    const list = document.getElementById("reward-list");

    if (!screen || !list) return;

    list.innerHTML = rewards.map(reward => `
        <div class="reward-card ${reward.rarity}">
            <img src="${reward.img}">
            <h3>${reward.title}</h3>
            <strong>${reward.amount}</strong>
        </div>
    `).join("");

    screen.classList.add("active");
}

function closeRewardScreen() {
    const screen = document.getElementById("reward-screen");

    if (pendingChestRewards.length > 0) {
        applyRewardsToPlayer(pendingChestRewards);
        pendingChestRewards = [];
    }

    if (screen) {
        screen.classList.remove("active");
    }
}
const clothThemes = [
    "helin",
    "lexapaws",
    "litwin",
    "melstroy",
    "nikkifn",
    "rejiboi",
    "rostickfaceskid",
    "sasavot"
];

const clothRarities = ["common", "rare", "epic", "legendary"];

function getClothImage(theme, rarity) {
    return `./image/ui/cloth/${theme}-${rarity}.png`;
}

function getRandomClothReward(rarity = "common") {
    const theme = clothThemes[Math.floor(Math.random() * clothThemes.length)];

    return {
        type: "cloth",
        theme,
        rarity,
        title: `ТКАНЬ ${theme.toUpperCase()}`,
        amount: "+40",
        img: getClothImage(theme, rarity)
    };
}
const chestDropConfig = {
    common: {
        gold: [1000, 3000],
        shards: [50, 120],
        clothSlots: 1,
        clothAmount: [10, 25],
        clothChance: { common: 80, rare: 20, epic: 0, legendary: 0 }
    },

    rare: {
        gold: [3000, 7000],
        shards: [100, 250],
        clothSlots: 1,
        clothAmount: [20, 45],
        clothChance: { common: 35, rare: 50, epic: 15, legendary: 0 }
    },

    epic: {
        gold: [7000, 15000],
        shards: [250, 600],
        clothSlots: 2,
        clothAmount: [35, 80],
        clothChance: { common: 0, rare: 55, epic: 40, legendary: 5 }
    },

    legendary: {
        gold: [15000, 35000],
        shards: [600, 1500],
        clothSlots: 3,
        clothAmount: [70, 160],
        clothChance: { common: 0, rare: 0, epic: 70, legendary: 30 }
    }
};

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollRarity(chances) {
    const roll = Math.random() * 100;
    let total = 0;

    for (const rarity in chances) {
        total += chances[rarity];
        if (roll <= total) return rarity;
    }

    return "common";
}


function applyRewardsToPlayer(rewards) {
    rewards.forEach(reward => {
        if (reward.type === "gold") {
            playerData.resources.gold += reward.value;
        }

        if (reward.type === "powerShards") {
            playerData.resources.powerShards += reward.value;
        }

        if (reward.type === "cloth") {
            const theme = reward.theme;
            const rarity = reward.rarity;

            if (!playerData.resources.clothFragments[theme]) {
                playerData.resources.clothFragments[theme] = {
                    common: 0,
                    rare: 0,
                    epic: 0,
                    legendary: 0
                };
            }

            playerData.resources.clothFragments[theme][rarity] += reward.value;
        }
    });

    updateUI();

    if (typeof saveGame === "function") {
        saveGame();
    }
}
const chestPrices = {
    common: 50,
    rare: 120,
    epic: 300,
    legendary: 800
};

function buyChest(type) {
    const price = chestPrices[type] || 0;

    if ((playerData.resources.premiumTokens ?? 0) < price) {
        alert("Недостаточно гемов");
        return;
    }

    playerData.resources.premiumTokens -= price;

    updateUI();

    if (typeof saveGame === "function") {
        saveGame();
    }

    openChest(type);
}

function renderChestsInventory() {
    const grid = document.getElementById("inventory-chests-grid");
    if (!grid) return;

    const chestList = [
        {
            id: "common",
            title: "ОБЫЧНЫЙ СУНДУК",
            img: "./image/ui/chest-common.png"
        },
        {
            id: "rare",
            title: "РЕДКИЙ СУНДУК",
            img: "./image/ui/chest-rare.png"
        },
        {
            id: "epic",
            title: "ЭПИЧЕСКИЙ СУНДУК",
            img: "./image/ui/chest-epic.png"
        },
        {
            id: "legendary",
            title: "ЛЕГЕНДАРНЫЙ СУНДУК",
            img: "./image/ui/chest-legendary.png"
        }
    ];

    grid.innerHTML = chestList.map(chest => {
        const count = playerData.chests?.[chest.id] ?? 0;
        const disabled = count <= 0;

        return `
            <div class="inventory-chest-card ${chest.id}">
                <h3>${chest.title}</h3>
                <img src="${chest.img}" alt="${chest.title}">
                <div class="inventory-chest-count">x ${count}</div>
                <button ${disabled ? "disabled" : ""} onclick="openInventoryChest('${chest.id}')">
                    ${disabled ? "НЕТ СУНДУКОВ" : "ОТКРЫТЬ"}
                </button>
            </div>
        `;
    }).join("");
}

function openInventoryChest(type) {
    if (!playerData.chests) return;

    if ((playerData.chests[type] ?? 0) <= 0) {
        alert("Нет сундуков");
        return;
    }

    playerData.chests[type] -= 1;

    if (typeof saveGame === "function") {
        saveGame();
    }

    renderChestsInventory();
    openChest(type);
}
let inventoryData = {
    chests: {
        common: 7,
        rare: 3,
        epic: 1,
        legendary: 0
    },

    fragments: {
        common: 120,
        rare: 45,
        epic: 12,
        legendary: 2
    },

    materials: {
        energy: 50,
        gems: 1200
    }
};
function renderInventory() {
    document.getElementById('common-count').innerText =
        inventoryData.chests.common;

    document.getElementById('rare-count').innerText =
        inventoryData.chests.rare;

    document.getElementById('epic-count').innerText =
        inventoryData.chests.epic;

    document.getElementById('legendary-count').innerText =
        inventoryData.chests.legendary;
}
function openChest(type) {
    if (inventoryData.chests[type] <= 0) {
        alert("Нет сундуков");
        return;
    }

    inventoryData.chests[type]--;
    renderInventory();

    selectedChestType = type || "common";

    const screen = document.getElementById("chest-opening-screen");
    const img = document.getElementById("opening-chest-img");
    const status = document.getElementById("chest-opening-status");
    const btn = document.getElementById("chest-open-action");

    if (!screen || !img || !status || !btn) return;

    img.src = openingChestImages[selectedChestType] || openingChestImages.common;
    img.classList.remove("shake");

    status.innerText = "Нажми открыть";
    btn.style.display = "block";
    btn.disabled = false;

    screen.classList.add("active");
}

function giveRandomReward(chestType) {
    const rewards = generateChestRewards(chestType);

    addQuestProgress("chestsOpened", 1);

    const clothAmount = rewards
        .filter(reward => reward.type === "cloth")
        .reduce((sum, reward) => sum + reward.amount, 0);

    if (clothAmount > 0) {
        addQuestProgress("clothCollected", clothAmount);
    }

    showChestOpeningModal(chestType, rewards);
}


function generateChestRewards(chestType) {
    const config = chestRewardConfig[chestType];

    const rewards = [];

    rewards.push({
        type: "gold",
        amount: randomBetween(config.gold[0], config.gold[1]),
        icon: "image/ui/gold.png",
        title: "Золото"
    });

    rewards.push({
        type: "power",
        amount: randomBetween(config.power[0], config.power[1]),
        icon: "image/ui/power-shards.png",
        title: "Осколки силы"
    });

    for (let i = 0; i < config.clothSlots; i++) {
        const theme = randomFrom(inventoryThemes);
        const rarity = randomFrom(config.clothRarities);

        rewards.push({
            type: "cloth",
            theme,
            rarity,
            amount: randomBetween(2, 6),
            icon: `image/ui/cloth/${theme}-${rarity}.png`,
            title: `${theme} ткань`
        });
    }

    return rewards;
}

const chestRewardConfig = {
    common: {
        gold: [80, 150],
        power: [3, 6],
        clothSlots: 1,
        clothRarities: ["common", "rare"]
    },
    rare: {
        gold: [180, 350],
        power: [6, 12],
        clothSlots: 1,
        clothRarities: ["common", "rare", "epic"]
    },
    epic: {
        gold: [450, 800],
        power: [14, 25],
        clothSlots: 2,
        clothRarities: ["rare", "epic", "legendary"]
    },
    legendary: {
        gold: [1000, 1800],
        power: [30, 55],
        clothSlots: 3,
        clothRarities: ["epic", "legendary"]
    }
};

const inventoryThemes = [
    "helin",
    "lexapaws",
    "litwin",
    "melstroy",
    "nikkifn",
    "rejiboi",
    "rostickfaceskid",
    "sasavot"
];

const rewardIcons = {
    gold: "image/ui/gold.png",
    power: "image/ui/power-shards.png"
};

const chestIcons = {
    common: "image/ui/chest-common.png",
    rare: "image/ui/chest-rare.png",
    epic: "image/ui/chest-epic.png",
    legendary: "image/ui/chest-legendary.png"
};

let pendingChestRewards = [];

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getClothIcon(theme, rarity) {
    return `image/ui/cloth/${theme}-${rarity}.png`;
}

function generateChestRewards(chestType) {
    const config = chestRewardConfig[chestType] || chestRewardConfig.common;
    const rewards = [];

    rewards.push({
        type: "gold",
        title: "Золото",
        amount: randomBetween(config.gold[0], config.gold[1]),
        icon: rewardIcons.gold,
        rarity: "gold"
    });

    rewards.push({
        type: "power",
        title: "Осколки силы",
        amount: randomBetween(config.power[0], config.power[1]),
        icon: rewardIcons.power,
        rarity: "power"
    });

    for (let i = 0; i < config.clothSlots; i++) {
        const theme = randomFrom(inventoryThemes);
        const rarity = randomFrom(config.clothRarities);

        rewards.push({
            type: "cloth",
            title: `${theme} ткань`,
            theme,
            rarity,
            amount: randomBetween(2, 6),
            icon: getClothIcon(theme, rarity)
        });
    }

    return rewards;
}

function showChestOpeningModal(chestType, rewards) {
    pendingChestRewards = rewards;

    const modal = document.getElementById("chest-reward-modal");
    const title = document.getElementById("chest-reward-title");
    const chestImg = document.getElementById("chest-reward-icon");
    const list = document.getElementById("chest-rewards-list");

    if (!modal || !title || !chestImg || !list) return;

    modal.classList.add("active");

    title.innerText = "ОТКРЫВАЕМ...";
    list.innerHTML = "";

    chestImg.style.display = "block";
    chestImg.src = chestIcons[chestType] || chestIcons.common;
    chestImg.classList.remove("reward-pop");
    chestImg.classList.add("chest-shake");

    setTimeout(() => {
        chestImg.classList.remove("chest-shake");
        chestImg.style.display = "none";
        renderChestRewards(pendingChestRewards);
    }, 900);
}

function renderChestRewards(rewards) {
    const title = document.getElementById("chest-reward-title");
    const list = document.getElementById("chest-rewards-list");

    if (!title || !list) return;

    title.innerText = "НАГРАДЫ";
    list.innerHTML = "";

    rewards.forEach((reward, index) => {
        const card = document.createElement("div");
        card.className = `chest-reward-card reward-${reward.rarity || reward.type}`;
        card.style.animationDelay = `${index * 0.14}s`;

        card.innerHTML = `
            <img src="${reward.icon}" alt="${reward.title}" onerror="this.src='image/ui/gems.png'">
            <div class="chest-reward-card-title">${reward.title}</div>
            <div class="chest-reward-card-amount">${reward.amount}</div>
        `;

        list.appendChild(card);
    });
}

function closeChestRewardModal() {
    applyPendingChestRewards();

    const modal = document.getElementById("chest-reward-modal");
    const chestImg = document.getElementById("chest-reward-icon");
    const list = document.getElementById("chest-rewards-list");

    if (modal) modal.classList.remove("active");
    if (chestImg) chestImg.style.display = "block";
    if (list) list.innerHTML = "";

    pendingChestRewards = [];

    updateUI();
    savePlayer();
}

function applyPendingChestRewards() {
    if (!playerData.resources) playerData.resources = {};

    if (!playerData.resources.clothFragments) {
        playerData.resources.clothFragments = {};
    }

    pendingChestRewards.forEach(reward => {
        if (reward.type === "gold") {
            playerData.resources.gold = (playerData.resources.gold || 0) + reward.amount;
        }

        if (reward.type === "power") {
            playerData.resources.powerShards = (playerData.resources.powerShards || 0) + reward.amount;
        }

        if (reward.type === "cloth") {
            if (!playerData.resources.clothFragments[reward.theme]) {
                playerData.resources.clothFragments[reward.theme] = {
                    common: 0,
                    rare: 0,
                    epic: 0,
                    legendary: 0
                };
            }

            playerData.resources.clothFragments[reward.theme][reward.rarity] =
                (playerData.resources.clothFragments[reward.theme][reward.rarity] || 0) + reward.amount;
        }
    });
}
const inventoryTabMeta = {
    chests: {
        title: "СУНДУКИ",
        subtitle: "Открывай сундуки и получай награды!",
        info: "ⓘ Сундуки хранятся в инвентаре."
    },
    cloth: {
        title: "ТКАНИ",
        subtitle: "Собирай ткани по темам и редкостям.",
        info: "ⓘ Ткани нужны для прокачки персонажей."
    },
    fragments: {
        title: "ФРАГМЕНТЫ",
        subtitle: "Фрагменты для улучшений и крафта.",
        info: "ⓘ Этот раздел скоро будет расширен."
    },
    resources: {
        title: "РЕСУРСЫ",
        subtitle: "Все основные валюты и материалы игрока.",
        info: "ⓘ Ресурсы используются в магазине и прокачке."
    }
};
function renderResourcesInventory() {
    const grid = document.getElementById("resources-inventory-grid");
    if (!grid) return;

    const resources = playerData.resources || {};

    const items = [
        {
            title: "Золото",
            amount: resources.gold ?? 0,
            icon: "image/ui/gold.png"
        },
        {
            title: "Гемы",
            amount: resources.premiumTokens ?? 0,
            icon: "image/ui/gems.png"
        },
        {
            title: "Энергия",
            amount: resources.energy ?? 0,
            icon: "image/ui/energy.png"
        },
        {
            title: "Осколки силы",
            amount: resources.powerShards ?? 0,
            icon: "image/ui/power-shards.png"
        }
    ];

    grid.innerHTML = items.map(item => `
        <div class="resource-inventory-card">
            <img src="${item.icon}" onerror="this.style.display='none'">
            <div class="resource-inventory-title">${item.title}</div>
            <div class="resource-inventory-amount">${item.amount}</div>
        </div>
    `).join("");
}

function renderClothInventory() {
    const grid = document.getElementById("cloth-inventory-grid");
    if (!grid) return;

    if (!playerData.resources) playerData.resources = {};
    if (!playerData.resources.clothFragments) {
        playerData.resources.clothFragments = {};
    }

    grid.innerHTML = "";

    clothInventoryThemes.forEach(theme => {
        const themeBox = document.createElement("div");
        themeBox.className = "cloth-theme-card";

        const title = theme.toUpperCase();

        const rows = clothRarityList.map(rarity => {
            const amount =
                playerData.resources.clothFragments?.[theme]?.[rarity] ?? 0;

            return `
                <div class="cloth-rarity-row rarity-${rarity}">
                    <img src="image/ui/cloth/${theme}-${rarity}.png"
                         onerror="this.src='image/ui/cloth-common.png'">
                    <span>${rarity}</span>
                    <b>${amount}</b>
                </div>
            `;
        }).join("");

        themeBox.innerHTML = `
            <div class="cloth-theme-title">${title}</div>
            <div class="cloth-rarity-list">
                ${rows}
            </div>
        `;

        grid.appendChild(themeBox);
    });
}
const clothInventoryThemes = [
    "helin",
    "lexapaws",
    "litwin",
    "melstroy",
    "nikkifn",
    "rejiboi",
    "rostickfaceskid",
    "sasavot"
];

const clothRarityList = [
    "common",
    "rare",
    "epic",
    "legendary"
];



function renderClothInventory() {

    const grid =
        document.getElementById("cloth-inventory-grid");

    if (!grid) return;

    grid.innerHTML = "";

    clothInventoryThemes.forEach(theme => {

        const card = document.createElement("div");

        card.className = "cloth-theme-card";

        const rows =
            clothRarityList.map(rarity => {

                const amount =
                    playerData.resources
                    ?.clothFragments
                    ?.[theme]
                    ?.[rarity] ?? 0;

                return `
                    <div class="cloth-rarity-row rarity-${rarity}">
                        
                        <img
                            src="image/ui/cloth/${theme}-${rarity}.png"
                            onerror="this.src='image/ui/cloth-common.png'"
                        >

                        <span>${rarity}</span>

                        <b>${amount}</b>

                    </div>
                `;
            }).join("");

        card.innerHTML = `
            <div class="cloth-theme-title">
                ${theme.toUpperCase()}
            </div>

            <div class="cloth-rarity-list">
                ${rows}
            </div>
        `;

        grid.appendChild(card);
    });
}

function renderResourcesInventory() {
    const grid = document.getElementById("resources-inventory-grid");
    if (!grid) return;

    const resources = playerData.resources || {};

    const items = [
        {
            title: "Золото",
            amount: resources.gold ?? 0,
            icon: "image/ui/gold.png"
        },
        {
            title: "Гемы",
            amount: resources.premiumTokens ?? 0,
            icon: "image/ui/gems.png"
        },
        {
            title: "Энергия",
            amount: resources.energy ?? 0,
            icon: "image/ui/energy.png"
        },
        {
            title: "Осколки силы",
            amount: resources.powerShards ?? 0,
            icon: "image/ui/power-shards.png"
        }
    ];

    grid.innerHTML = items.map(item => `
        <div class="resource-inventory-card">
            <img src="${item.icon}" onerror="this.style.display='none'">
            <div class="resource-inventory-title">${item.title}</div>
            <div class="resource-inventory-amount">${item.amount}</div>
        </div>
    `).join("");
}   

function openInventoryTab(tabName) {

    document.querySelectorAll('.inventory-tab-content')
        .forEach(tab => {
            tab.classList.remove('active');
        });

    document.querySelectorAll('.inventory-side-btn')
        .forEach(btn => {
            btn.classList.remove('active');
        });

    const tab =
        document.getElementById(
            `inventory-tab-${tabName}`
        );

    if (tab) {
        tab.classList.add('active');
    }

    const activeBtn =
        Array.from(
            document.querySelectorAll('.inventory-side-btn')
        ).find(btn =>
            btn.getAttribute('onclick')
            ?.includes(tabName)
        );

    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}
function openInventoryV3() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById("inventory-v3-screen");
    if (!screen) return;

    screen.classList.add("active");
    openInventoryV3Tab("chests");
}

function openInventoryV3Tab(tabName) {
    document.querySelectorAll(".inventory-v3-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".inventory-v3-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const tab = document.getElementById(`inventory-v3-${tabName}`);
    if (tab) tab.classList.add("active");

    const btn = Array.from(document.querySelectorAll(".inventory-v3-btn"))
        .find(button => button.getAttribute("onclick")?.includes(tabName));

    if (btn) btn.classList.add("active");

    const meta = {
        chests: ["СУНДУКИ", "Открывай сундуки и получай награды"],
        cloth: ["ТКАНИ", "Ткани по темам и редкостям"],
        resources: ["РЕСУРСЫ", "Все валюты и материалы игрока"]
    };

    const title = document.getElementById("inventory-v3-title");
    const subtitle = document.getElementById("inventory-v3-subtitle");

    if (meta[tabName]) {
        if (title) title.innerText = meta[tabName][0];
        if (subtitle) subtitle.innerText = meta[tabName][1];
    }

    if (tabName === "chests") renderInventoryV3Chests();
    if (tabName === "cloth") renderInventoryV3Cloth();
    if (tabName === "resources") renderInventoryV3Resources();
}

function renderInventoryV3Chests() {
    const chests = inventoryData?.chests || {};

    const ids = {
        common: "common-count-v3",
        rare: "rare-count-v3",
        epic: "epic-count-v3",
        legendary: "legendary-count-v3"
    };

    Object.keys(ids).forEach(type => {
        const el = document.getElementById(ids[type]);
        if (el) el.innerText = "x" + (chests[type] ?? 0);
    });
}

function renderInventoryV3Cloth() {
    const grid = document.getElementById("inventory-v3-cloth-grid");
    if (!grid) return;

    const themes = [
        "helin",
        "lexapaws",
        "litwin",
        "melstroy",
        "nikkifn",
        "rejiboi",
        "rostickfaceskid",
        "sasavot"
    ];

    const rarities = ["common", "rare", "epic", "legendary"];
    const cloth = playerData.resources?.clothFragments || {};

    grid.innerHTML = themes.map(theme => {
        const rows = rarities.map(rarity => {
            const amount = cloth?.[theme]?.[rarity] ?? 0;

            return `
                <div class="inventory-v3-cloth-row rarity-${rarity}">
                    <img src="image/ui/cloth/${theme}-${rarity}.png"
                         onerror="this.src='image/ui/cloth-common.png'">
                    <span>${rarity}</span>
                    <b>${amount}</b>
                </div>
            `;
        }).join("");

        return `
            <div class="inventory-v3-cloth-card">
                <h3>${theme.toUpperCase()}</h3>
                ${rows}
            </div>
        `;
    }).join("");
}

function renderInventoryV3Resources() {
    const grid = document.getElementById("inventory-v3-resources-grid");
    if (!grid) return;

    const r = playerData.resources || {};

    const items = [
        ["Золото", r.gold ?? 0, "image/ui/gold.png"],
        ["Гемы", r.premiumTokens ?? 0, "image/ui/gems.png"],
        ["Энергия", r.energy ?? 0, "image/ui/energy.png"],
        ["Осколки силы", r.powerShards ?? 0, "image/ui/power-shards.png"]
    ];

    grid.innerHTML = items.map(item => `
        <div class="inventory-v3-card">
            <img src="${item[2]}" onerror="this.style.display='none'">
            <h3>${item[0]}</h3>
            <div>x${item[1]}</div>
        </div>
    `).join("");
}
const oldRenderInventoryV3Chests = renderInventoryV3Chests;

renderInventoryV3Chests = function () {
    const chests = inventoryData?.chests || {};

    const ids = {
        common: "common-count-v3",
        rare: "rare-count-v3",
        epic: "epic-count-v3",
        legendary: "legendary-count-v3"
    };

    Object.keys(ids).forEach(type => {
        const el = document.getElementById(ids[type]);
        if (el) el.innerText = "x" + (chests[type] ?? 0);
    });
};

const oldOpenChest = openChest;

openChest = function (type) {
    oldOpenChest(type);

    setTimeout(() => {
        renderInventoryV3Chests();
    }, 100);
};
renderInventoryV3Chests = function () {
    const chests = inventoryData?.chests || {};

    const data = {
        common: "common-count-v3",
        rare: "rare-count-v3",
        epic: "epic-count-v3",
        legendary: "legendary-count-v3"
    };

    Object.keys(data).forEach(type => {
        const count = chests[type] ?? 0;
        const countEl = document.getElementById(data[type]);

        if (countEl) {
            countEl.innerText = "x" + count;
        }

        const card = countEl?.closest(".inventory-v3-card");
        const btn = card?.querySelector("button");

        if (btn) {
            btn.disabled = count <= 0;
            btn.innerText = count <= 0 ? "НЕТ СУНДУКОВ" : "ОТКРЫТЬ";
            btn.classList.toggle("disabled", count <= 0);
        }
    });
};
// === INVENTORY V4 ===

function openInventoryV4Tab(tabName) {
    document.querySelectorAll(".inventory-v4-tab").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");

    document.querySelectorAll(".inventory-v4-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.inventory-v4-btn[onclick*="${tabName}"]`)?.classList.add("active");

    const titles = {
        chests: ["СУНДУКИ", "Открывай сундуки и получай награды"],
        cloth: ["ТКАНИ", "Ткани по темам и редкостям"],
        resources: ["РЕСУРСЫ", "Все валюты и материалы игрока"],
        fragments: ["ФРАГМЕНТЫ", "Фрагменты для крафта и прокачки"]
    };

    const titleEl = document.getElementById("inventory-v4-title");
    const subtitleEl = document.getElementById("inventory-v4-subtitle");
    if (titles[tabName]) {
        titleEl.innerText = titles[tabName][0];
        subtitleEl.innerText = titles[tabName][1];
    }

    // Рендерим контент
    if(tabName === "chests") renderInventoryV4Chests();
    if(tabName === "cloth") renderInventoryV4Cloth();
    if(tabName === "resources") renderInventoryV4Resources();
    if(tabName === "fragments") renderInventoryV4Fragments();
}

// Пример рендеринга сундуков с подсветкой редкости
function renderInventoryV4Chests() {
    const grid = document.querySelector("#chests .inventory-v4-grid");
    grid.innerHTML = "";
    const chests = [
        {type: "common", count: 7, name:"Обычный", desc:"Золото, осколки силы, common/rare ткань"},
        {type: "rare", count: 3, name:"Редкий", desc:"Золото, осколки силы, rare/epic ткань"},
        {type: "epic", count: 1, name:"Эпический", desc:"Больше наград, rare/epic/legendary ткань"},
        {type: "legendary", count: 0, name:"Легендарный", desc:"Максимальные награды, epic/legendary ткань"}
    ];

    chests.forEach(chest => {
        const div = document.createElement("div");
        div.className = `inventory-v4-card chest-${chest.type}-v4`;
        div.innerHTML = `
            <div class="chest-card-rarity">${chest.type.toUpperCase()}</div>
            <img src="image/ui/chest-${chest.type}.png">
            <h3>${chest.name}</h3>
            <p>${chest.desc}</p>
            <div class="chest-count">x${chest.count}</div>
            <button ${chest.count===0?'disabled':''} onclick="openChestV4(this)">${chest.count===0?'НЕТ':'ОТКРЫТЬ'}</button>
        `;
        grid.appendChild(div);
    });
}

function openChestV4(btn) {
    const card = btn.closest(".inventory-v4-card");
    let count = parseInt(card.querySelector(".chest-count").innerText.slice(1));
    if(count <= 0) return;

    count--;
    card.querySelector(".chest-count").innerText = "x" + count;
    if(count===0) {
        btn.disabled = true;
        btn.innerText = "НЕТ";
    }

    // Анимация открытия сундука
    card.classList.add("opening");
    setTimeout(()=>card.classList.remove("opening"),1000);

    // Всплывающая награда
    const reward = document.createElement("div");
    reward.className = "chest-reward";
    reward.innerText = "💰 "+(Math.floor(Math.random()*500)+50)+" золота";
    card.appendChild(reward);
    setTimeout(()=>reward.remove(),1200);
}
// === Рендер тканей ===
function renderInventoryV4Cloth() {
    const grid = document.getElementById("inventory-v4-cloth-grid");
    if (!grid) return;

    grid.innerHTML = ""; // очищаем

    const themes = [
        "sasavot",
        "helin",
        "lexapaws",
        "melstroy"
    ];

    const rarities = ["common", "rare", "epic", "legendary"];

    // пример данных игрока
    const clothData = {
        sasavot: {common: 5, rare: 2, epic:1, legendary:0},
        helin: {common:3, rare:0, epic:0, legendary:0},
        lexapaws:{common:7, rare:1, epic:0, legendary:0},
        melstroy:{common:4, rare:2, epic:1, legendary:0}
    };

    themes.forEach(theme => {
        const card = document.createElement("div");
        card.className = "inventory-v4-cloth-card";
        card.innerHTML = `<h3>${theme.toUpperCase()}</h3>`;

        rarities.forEach(rarity => {
            const amount = clothData[theme][rarity] ?? 0;
            const row = document.createElement("div");
            row.className = `inventory-v4-cloth-row rarity-${rarity}`;
            row.innerHTML = `
                <img src="image/ui/cloth/${theme}-${rarity}.png" 
                     onerror="this.src='image/ui/cloth-common.png'">
                <span>${rarity.toUpperCase()}</span>
                <b>${amount}</b>
            `;
            card.appendChild(row);
        });

        grid.appendChild(card);
    });
}

// === Рендер ресурсов ===
function renderInventoryV4Resources() {
    const grid = document.getElementById("inventory-v4-resources-grid");
    if (!grid) return;

    grid.innerHTML = ""; // очищаем

    const resources = [
        {name: "Золото", amount: 5000, icon:"image/ui/coin.png"},
        {name: "Гемы", amount: 50, icon:"image/ui/gem.png"},
        {name: "Энергия", amount: 100, icon:"image/ui/battery.png"},
        {name: "Осколки силы", amount: 250, icon:"image/ui/shard.png"}
    ];

    resources.forEach(res => {
        const div = document.createElement("div");
        div.className = "inventory-v4-card resource-card-v4";
        div.innerHTML = `
            <img src="${res.icon}" alt="${res.name}">
            <h3>${res.name}</h3>
            <div class="resource-count">x${res.amount}</div>
        `;
        grid.appendChild(div);
    });
}
function spawnResourceParticles(chestType) {
    const resourcesMap = {
        common: ["coin", "battery"],
        rare: ["coin","gem","battery"],
        epic: ["coin","gem","battery","shard"],
        legendary: ["coin","gem","shard"]
    };

    const chestCard = document.querySelector(`.chest-${chestType}-v4`);
    const container = chestCard;

    const resources = resourcesMap[chestType];

    resources.forEach((res,i) => {
        const particle = document.createElement("div");
        particle.className = "chest-particle";
        particle.innerHTML = `<img src="image/ui/${res}.png" width="32">`;
        container.appendChild(particle);

        const angle = (Math.random()*60-30); // немного влево-вправо
        particle.style.transform = `translate(0,0) rotate(0deg)`;
        particle.style.opacity = 1;

        setTimeout(()=>{
            particle.style.transition = "transform 1s ease-out, opacity 1s ease-out";
            particle.style.transform = `translate(${Math.cos(angle)*80}px,-100px) rotate(${angle*3}deg)`;
            particle.style.opacity = 0;
        },50);

        setTimeout(()=>particle.remove(),1100);
    });
}

// Внутри openChestV4 добавляем:
// Внутри openChestV4 после spawnResourceParticles
function spawnChestGlow(chestType) {
    const card = document.querySelector(`.chest-${chestType}-v4`);
    if(!card) return;

    card.classList.add("glow");
    setTimeout(()=>card.classList.remove("glow"),1200);
}
function pulseResource(resourceName, amount) {
    const grid = document.getElementById("inventory-v4-resources-grid");
    const card = Array.from(grid.children).find(c=>c.querySelector("h3").innerText===resourceName);
    if(!card) return;

    const countEl = card.querySelector(".resource-count");
    countEl.innerText = "x"+amount;

    card.classList.add("pulse");
    setTimeout(()=>card.classList.remove("pulse"),400);
}
function addClothParticle(theme, rarity, amount=1) {
    const grid = document.getElementById("inventory-v4-cloth-grid");
    const card = Array.from(grid.children).find(c=>c.querySelector("h3").innerText.toLowerCase()===theme);
    if(!card) return;

    const row = card.querySelector(`.rarity-${rarity}`);
    if(!row) return;

    const particle = document.createElement("div");
    particle.className="cloth-particle";
    particle.innerText = `+${amount}`;
    row.appendChild(particle);

    setTimeout(()=>particle.remove(),800);
}
document.querySelectorAll(".inventory-v4-tab").forEach(tab=>{
    tab.style.transition="opacity 0.25s ease";
});

// ====== Дополнительно добавляем остальные предметы ======

// Ткани (из cloth)
const clothItems = [
  { name: "Helin", category: "cloth", rarity: "common", count: 48, img: "image/ui/cloth/helin-common.png", source: "Обычные сундуки" },
  { name: "Helin", category: "cloth", rarity: "rare", count: 36, img: "image/ui/cloth/helin-rare.png", source: "Обычные сундуки" },
  { name: "Helin", category: "cloth", rarity: "epic", count: 24, img: "image/ui/cloth/helin-epic.png", source: "Epic Chest" },
  { name: "Helin", category: "cloth", rarity: "legendary", count: 12, img: "image/ui/cloth/helin-legendary.png", source: "Legendary Chest" },

  { name: "Lexapaws", category: "cloth", rarity: "common", count: 52, img: "image/ui/cloth/lexapaws-common.png", source: "Обычные сундуки" },
  { name: "Lexapaws", category: "cloth", rarity: "rare", count: 41, img: "image/ui/cloth/lexapaws-rare.png", source: "Обычные сундуки" },
  { name: "Lexapaws", category: "cloth", rarity: "epic", count: 27, img: "image/ui/cloth/lexapaws-epic.png", source: "Epic Chest" },
  { name: "Lexapaws", category: "cloth", rarity: "legendary", count: 9, img: "image/ui/cloth/lexapaws-legendary.png", source: "Legendary Chest" },

  { name: "Litwin", category: "cloth", rarity: "common", count: 43, img: "image/ui/cloth/litwin-common.png", source: "Обычные сундуки" },
  { name: "Litwin", category: "cloth", rarity: "rare", count: 38, img: "image/ui/cloth/litwin-rare.png", source: "Обычные сундуки" },
  { name: "Litwin", category: "cloth", rarity: "epic", count: 21, img: "image/ui/cloth/litwin-epic.png", source: "Epic Chest" },
  { name: "Litwin", category: "cloth", rarity: "legendary", count: 8, img: "image/ui/cloth/litwin-legendary.png", source: "Legendary Chest" },

  { name: "Melstroy", category: "cloth", rarity: "common", count: 60, img: "image/ui/cloth/melstroy-common.png", source: "Обычные сундуки" },
  { name: "Melstroy", category: "cloth", rarity: "rare", count: 45, img: "image/ui/cloth/melstroy-rare.png", source: "Rare Chest" },
  { name: "Melstroy", category: "cloth", rarity: "epic", count: 29, img: "image/ui/cloth/melstroy-epic.png", source: "Epic Chest" },
  { name: "Melstroy", category: "cloth", rarity: "legendary", count: 11, img: "image/ui/cloth/melstroy-legendary.png", source: "Legendary Chest" },

  { name: "Nikkifn", category: "cloth", rarity: "common", count: 40, img: "image/ui/cloth/nikkifn-common.png", source: "Обычные сундуки" },
  { name: "Nikkifn", category: "cloth", rarity: "rare", count: 35, img: "image/ui/cloth/nikkifn-rare.png", source: "Rare Chest" },
  { name: "Nikkifn", category: "cloth", rarity: "epic", count: 20, img: "image/ui/cloth/nikkifn-epic.png", source: "Epic Chest" },
  { name: "Nikkifn", category: "cloth", rarity: "legendary", count: 7, img: "image/ui/cloth/nikkifn-legendary.png", source: "Legendary Chest" },

  { name: "Rejiboi", category: "cloth", rarity: "common", count: 39, img: "image/ui/cloth/rejiboi-common.png", source: "Обычные сундуки" },
  { name: "Rejiboi", category: "cloth", rarity: "rare", count: 32, img: "image/ui/cloth/rejiboi-rare.png", source: "Rare Chest" },
  { name: "Rejiboi", category: "cloth", rarity: "epic", count: 18, img: "image/ui/cloth/rejiboi-epic.png", source: "Epic Chest" },
  { name: "Rejiboi", category: "cloth", rarity: "legendary", count: 6, img: "image/ui/cloth/rejiboi-legendary.png", source: "Legendary Chest" },

  { name: "Rostick", category: "cloth", rarity: "common", count: 50, img: "image/ui/cloth/rostickfaceskid-common.png", source: "Обычные сундуки" },
  { name: "Rostick", category: "cloth", rarity: "rare", count: 40, img: "image/ui/cloth/rostickfaceskid-rare.png", source: "Rare Chest" },
  { name: "Rostick", category: "cloth", rarity: "epic", count: 26, img: "image/ui/cloth/rostickfaceskid-epic.png", source: "Epic Chest" },
  { name: "Rostick", category: "cloth", rarity: "legendary", count: 9, img: "image/ui/cloth/rostickfaceskid-legendary.png", source: "Legendary Chest" },

  { name: "Sasavot", category: "cloth", rarity: "common", count: 45, img: "image/ui/cloth/sasavot-common.png", source: "Обычные сундуки" },
  { name: "Sasavot", category: "cloth", rarity: "rare", count: 34, img: "image/ui/cloth/sasavot-rare.png", source: "Rare Chest" },
  { name: "Sasavot", category: "cloth", rarity: "epic", count: 20, img: "image/ui/cloth/sasavot-epic.png", source: "Epic Chest" },
  { name: "Sasavot", category: "cloth", rarity: "legendary", count: 7, img: "image/ui/cloth/sasavot-legendary.png", source: "Legendary Chest" },
];

// Ресурсы
const resourcesItems = [
  { name: "Gems", category: "resources", rarity: "rare", count: 5430, img: "image/ui/gems.png", source: "Сундуки и квесты" },
  { name: "Energy", category: "resources", rarity: "epic", count: 87, img: "image/ui/energy.png", source: "Сундуки и квесты" },
  { name: "Gold", category: "resources", rarity: "epic", count: 128, img: "image/ui/gold.png", source: "Сундуки и квесты" }
];

// Сундуки
const chestsItems = [
  { name: "Common Chest", category: "chests", rarity: "common", count: 8, img: "image/ui/chest-common.png", source: "Магазин / Квесты" },
  { name: "Epic Chest", category: "chests", rarity: "epic", count: 6, img: "image/ui/chest-epic.png", source: "Магазин / Квесты" },
  { name: "Legendary Chest", category: "chests", rarity: "legendary", count: 3, img: "image/ui/chest-legendary.png", source: "Магазин / Квесты" }
];

// Пропуска
const passesItems = [
  { name: "Premium Pass", category: "passes", rarity: "epic", count: 2, img: "image/ui/menu-pass.png", source: "Магазин" },
  { name: "Golden Pass", category: "passes", rarity: "legendary", count: 1, img: "image/ui/menu-pass.png", source: "Магазин" }
];
function claimCardPathReward(cardKey, level, rarity, themeName, cardSrc) {
    if (!playerData.claimedCardRewards) {
        playerData.claimedCardRewards = {};
    }

    if (!playerData.claimedCardRewards[cardKey]) {
        playerData.claimedCardRewards[cardKey] = [];
    }

    if (playerData.claimedCardRewards[cardKey].includes(level)) {
        return;
    }

    playerData.claimedCardRewards[cardKey].push(level);

    const reward = getCardPathReward(level, rarity);

    applyCardPathReward(reward);

    savePlayerData();
    updateUI();

    openCardPath(themeName, cardSrc);
}

function applyCardPathReward(reward) {
    if (!playerData.resources) {
        playerData.resources = {};
    }

    if (reward.title === "Золото") {
        playerData.resources.gold = (playerData.resources.gold || 0) + reward.amount;
    }

    if (reward.title === "Гемы") {
        playerData.resources.premiumTokens = (playerData.resources.premiumTokens || 0) + reward.amount;
    }

    if (reward.title === "Энергия") {
        playerData.resources.energy = (playerData.resources.energy || 0) + reward.amount;
    }

    if (reward.title === "Сундук") {
        playerData.resources.chests = (playerData.resources.chests || 0) + reward.amount;
    }
}   
function setCollectionRarityFilter(themeName, rarity, clickedBtn) {
    document.querySelectorAll(".collection-rarity-filter-v2 button").forEach(btn => {
        btn.classList.remove("active");
    });

    clickedBtn.classList.add("active");

    document.querySelectorAll(".collection-card-v2").forEach(card => {
        card.style.display = rarity === "all" || card.dataset.rarity === rarity
            ? "flex"
            : "none";
    });
}
function getThemeReward(themeName) {
    return {
        gold: 5000,
        gems: 150,
        energy: 100,
        chest: "epic"
    };
}

function isThemeRewardClaimed(themeName) {
    if (!playerData.claimedThemeRewards) {
        playerData.claimedThemeRewards = {};
    }

    return playerData.claimedThemeRewards[themeName] === true;
}

function claimThemeReward(themeName) {
    if (!isThemeCompleted(themeName)) return;

    if (!playerData.claimedThemeRewards) {
        playerData.claimedThemeRewards = {};
    }

    if (playerData.claimedThemeRewards[themeName]) return;

    const reward = getThemeReward(themeName);

    playerData.resources.gold = (playerData.resources.gold || 0) + reward.gold;
    playerData.resources.premiumTokens = (playerData.resources.premiumTokens || 0) + reward.gems;
    playerData.resources.energy = (playerData.resources.energy || 0) + reward.energy;

    playerData.claimedThemeRewards[themeName] = true;

    savePlayerData();
    updateUI();
    openThemeDetail(themeName);
}
const battlePassData = {
    heroes: {
        title: "MEME HERO SEASON",
        description: "Собирай ткани, сундуки и куски стилей для персонажей.",
        premiumTitle: "Премиум персонажей",

        free: [
            ["🪙", "Золото", "x500"],
            ["⚡", "Энергия", "x20"],
            ["🧵", "Common ткань", "x15"],
            ["💎", "Гемы", "x25"],
            ["🎁", "Обычный сундук", "x1"],

            ["🪙", "Золото", "x1000"],
            ["🧵", "Rare ткань", "x8"],
            ["⚡", "Энергия", "x30"],
            ["💎", "Гемы", "x40"],
            ["🎁", "Редкий сундук", "x1"],

            ["🪙", "Золото", "x1500"],
            ["🧵", "Common ткань", "x30"],
            ["🧵", "Rare ткань", "x12"],
            ["💎", "Гемы", "x60"],
            ["🏆", "Эпик сундук", "x1"],

            ["🪙", "Золото", "x2000"],
            ["⚡", "Энергия", "x50"],
            ["🧵", "Epic ткань", "x6"],
            ["💎", "Гемы", "x80"],
            ["🎁", "Редкий сундук", "x2"],

            ["🪙", "Золото", "x3000"],
            ["🧵", "Rare ткань", "x20"],
            ["⚡", "Энергия", "x80"],
            ["💎", "Гемы", "x100"],
            ["🏆", "Эпик сундук", "x1"],

            ["🪙", "Золото", "x5000"],
            ["🧵", "Epic ткань", "x10"],
            ["💎", "Гемы", "x150"],
            ["🧵", "Legend ткань", "x3"],
            ["👑", "Финальная награда", "x1"]
        ],

        premium: [
            ["🧩", "Пазл стиля", "x1"],
            ["🎁", "Редкий сундук", "x1"],
            ["🧵", "Rare ткань", "x20"],
            ["💎", "Гемы", "x80"],
            ["🏆", "Эпик сундук", "x1"],

            ["🧩", "Пазл стиля", "x1"],
            ["🧵", "Epic ткань", "x12"],
            ["🎫", "+5 уровней", "x1"],
            ["💎", "Гемы", "x120"],
            ["👑", "Кусок скина", "x1"],

            ["🎁", "Эпик сундук", "x1"],
            ["🧵", "Rare ткань", "x35"],
            ["🧵", "Epic ткань", "x18"],
            ["💎", "Гемы", "x160"],
            ["👑", "Кусок скина", "x1"],

            ["🏆", "Легенд. сундук", "x1"],
            ["🧵", "Epic ткань", "x25"],
            ["🧵", "Legend ткань", "x8"],
            ["💎", "Гемы", "x220"],
            ["🧩", "Пазл стиля", "x2"],

            ["🎁", "Эпик сундук", "x2"],
            ["🧵", "Legend ткань", "x12"],
            ["🎫", "+10 уровней", "x1"],
            ["💎", "Гемы", "x300"],
            ["👑", "Кусок скина", "x2"],

            ["🏆", "Легенд. сундук", "x2"],
            ["🧵", "Legend ткань", "x20"],
            ["💎", "Гемы", "x500"],
            ["🧩", "Пазл стиля", "x3"],
            ["👑", "Финальный стиль", "x1"]
        ]
    },

    items: {
        title: "PET & ITEM SEASON",
        description: "Открывай материалы питомцев, предметы, аксессуары и редкие сундуки.",
        premiumTitle: "Премиум питомцев",

        free: [
            ["🪙", "Золото", "x500"],
            ["⚡", "Энергия", "x20"],
            ["🐾", "Корм питомца", "x15"],
            ["🔹", "Осколки предмета", "x10"],
            ["🎁", "Обычный сундук", "x1"],

            ["🪙", "Золото", "x1000"],
            ["🐾", "Корм питомца", "x25"],
            ["🔹", "Осколки предмета", "x15"],
            ["💎", "Гемы", "x40"],
            ["🎁", "Редкий сундук", "x1"],

            ["🪙", "Золото", "x1500"],
            ["🐾", "Корм питомца", "x35"],
            ["🔮", "Материал предмета", "x12"],
            ["💎", "Гемы", "x60"],
            ["🏆", "Эпик сундук", "x1"],

            ["🪙", "Золото", "x2000"],
            ["⚡", "Энергия", "x50"],
            ["🐾", "Редкий корм", "x8"],
            ["💎", "Гемы", "x80"],
            ["🎁", "Редкий сундук", "x2"],

            ["🪙", "Золото", "x3000"],
            ["🔮", "Материал предмета", "x20"],
            ["⚡", "Энергия", "x80"],
            ["💎", "Гемы", "x100"],
            ["🏆", "Эпик сундук", "x1"],

            ["🪙", "Золото", "x5000"],
            ["🐾", "Редкий корм", "x15"],
            ["💎", "Гемы", "x150"],
            ["🔮", "Редкий материал", "x5"],
            ["💠", "Финальная награда", "x1"]
        ],

        premium: [
            ["🐾", "Пазл питомца", "x1"],
            ["🎁", "Редкий сундук", "x1"],
            ["🔮", "Материал предмета", "x20"],
            ["💎", "Гемы", "x80"],
            ["🏆", "Эпик сундук", "x1"],

            ["🐾", "Пазл питомца", "x1"],
            ["🎒", "Аксессуар", "x1"],
            ["🎫", "+5 уровней", "x1"],
            ["💎", "Гемы", "x120"],
            ["🔮", "Редкий материал", "x10"],

            ["🎁", "Эпик сундук", "x1"],
            ["🐾", "Корм питомца", "x60"],
            ["🔮", "Материал предмета", "x35"],
            ["💎", "Гемы", "x160"],
            ["🎒", "Редкий аксессуар", "x1"],

            ["🏆", "Легенд. сундук", "x1"],
            ["🐾", "Редкий корм", "x30"],
            ["🔮", "Редкий материал", "x18"],
            ["💎", "Гемы", "x220"],
            ["🐾", "Пазл питомца", "x2"],

            ["🎁", "Эпик сундук", "x2"],
            ["🔮", "Редкий материал", "x25"],
            ["🎫", "+10 уровней", "x1"],
            ["💎", "Гемы", "x300"],
            ["🐉", "Кусок питомца", "x2"],

            ["🏆", "Легенд. сундук", "x2"],
            ["🐾", "Редкий корм", "x50"],
            ["💎", "Гемы", "x500"],
            ["🐉", "Редкий питомец", "x1"],
            ["💠", "Финальный предмет", "x1"]
        ]
    }
};

function switchPassTab(type) {
    activePassType = type;

    document.querySelectorAll(".pass-switch-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeButton = Array.from(document.querySelectorAll(".pass-switch-btn")).find(btn => {
        return btn.getAttribute("onclick")?.includes(type);
    });

    if (activeButton) {
        activeButton.classList.add("active");
    }

    renderBattlePass();
}

function renderBattlePass() {
    const data = battlePassData[activePassType];
    const road = document.getElementById("pass-road");

    if (!data || !road) return;

    const title = document.getElementById("pass-title");
    const desc = document.getElementById("pass-description");
    const premiumTitle = document.getElementById("premium-title");
    const levelEl = document.getElementById("pass-current-level");

    if (title) title.innerText = data.title;
    if (desc) desc.innerText = data.description;
    if (premiumTitle) premiumTitle.innerText = data.premiumTitle;
    if (levelEl) levelEl.innerText = fakePassState.level;
    const xpText = document.getElementById("pass-xp-text");
const xpFill = document.querySelector(".pass-xp-fill");

fakePassState.xp = fakePassState.xp || 0;
fakePassState.xpNeed = fakePassState.xpNeed || getPassXpNeed(fakePassState.level);

const xpPercent = Math.min(100, (fakePassState.xp / fakePassState.xpNeed) * 100);

if (xpText) xpText.innerText = `${fakePassState.xp} / ${fakePassState.xpNeed} XP`;
if (xpFill) xpFill.style.width = `${xpPercent}%`;
    const levels = Array.from({ length: 30 }, (_, i) => i + 1);

    road.innerHTML = `
        <div class="pass-road-levels">
            <div class="pass-line-title">Бесплатно</div>
            ${levels.map(level => renderPassRewardCard(level, data.free[level - 1], "free")).join("")}
        </div>

        <div class="pass-level-row">
            <div class="pass-line-title">Уровень</div>
            ${levels.map(level => `
                <div class="pass-level-node ${level === fakePassState.level ? "current" : ""}">
                    ${level}
                </div>
            `).join("")}
        </div>

        <div class="pass-road-levels">
            <div class="pass-line-title">Премиум</div>
            ${levels.map(level => renderPassRewardCard(level, data.premium[level - 1], "premium")).join("")}
        </div>
    `;
}

function getRewardRarity(level) {
    if (level >= 30) return "legendary";
    if (level >= 20) return "epic";
    if (level >= 10) return "rare";
    return "common";
}

function renderPassRewardCard(level, reward, line) {
    const [icon, name, amount] = reward;

    const rarity = getRewardRarity(level);
    const isFinalReward = level === 30;

    const isUnlocked = level <= fakePassState.level;
    const isPremiumLocked = line === "premium" && !fakePassState.premium;

    const claimedList = line === "premium"
        ? fakePassState.claimedPremium
        : fakePassState.claimedFree;

    const isClaimed = claimedList.includes(level);
    const isClaimable = isUnlocked && !isClaimed && !isPremiumLocked;

    let buttonText = "Закрыто";

    if (isPremiumLocked) buttonText = "🔒 Premium";
    else if (isClaimed) buttonText = "✅ Забрано";
    else if (isClaimable) buttonText = "Забрать";

    return `
        <div class="pass-reward-card ${line} ${rarity} ${isFinalReward ? "final-reward" : ""} ${level === fakePassState.level ? "current" : ""} ${isClaimable ? "claimable" : ""} ${isPremiumLocked ? "locked-premium" : ""}">
            <div class="pass-reward-icon">${icon}</div>

            <div class="pass-reward-name">
                ${name}
            </div>

            <div class="pass-reward-amount">
                ${amount}
            </div>

            <button onclick="claimPassReward(${level}, '${line}')">
                ${buttonText}
            </button>
        </div>
    `;
}

function claimPassReward(level, line) {
    const data = battlePassData[activePassType];
    const reward = data[line][level - 1];

    const claimedList = line === "premium"
        ? fakePassState.claimedPremium
        : fakePassState.claimedFree;

    if (level > fakePassState.level) {
        alert("Этот уровень ещё закрыт.");
        return;
    }

    if (line === "premium" && !fakePassState.premium) {
        alert("Нужен премиум пропуск.");
        return;
    }

    if (claimedList.includes(level)) {
        alert("Награда уже забрана.");
        return;
    }

    claimedList.push(level);

    addQuestProgress("passRewardsClaimed", 1);

    savePassState();

    renderBattlePass();

    openPassRewardModal(reward);
}

function openPassRewardModal(reward) {
    const modal = document.getElementById("pass-reward-modal");
    const icon = document.getElementById("pass-modal-icon");
    const title = document.getElementById("pass-modal-title");
    const amount = document.getElementById("pass-modal-amount");

    if (!modal || !reward) return;

    icon.innerText = reward[0];
    title.innerText = reward[1];
    amount.innerText = reward[2];

    modal.classList.add("active");
}

function closePassRewardModal() {
    const modal = document.getElementById("pass-reward-modal");
    if (modal) modal.classList.remove("active");
}
function activatePremiumPass() {
    fakePassState.premium = true;
    savePassState();
    renderBattlePass();

    openPassRewardModal([
        "👑",
        "Премиум пропуск активирован",
        "Премиум награды открыты"
    ]);
}
function claimAllPassRewards() {
    const data = battlePassData[activePassType];

    let claimedCount = 0;
    let lastReward = null;

    data.free.forEach((reward, index) => {
        const level = index + 1;

        if (
            level <= fakePassState.level &&
            !fakePassState.claimedFree.includes(level)
        ) {
            fakePassState.claimedFree.push(level);
            claimedCount++;
            lastReward = reward;
        }
    });

    if (fakePassState.premium) {
        data.premium.forEach((reward, index) => {
            const level = index + 1;

            if (
                level <= fakePassState.level &&
                !fakePassState.claimedPremium.includes(level)
            ) {
                fakePassState.claimedPremium.push(level);
                claimedCount++;
                lastReward = reward;
            }
        });
    }

    renderBattlePass();

    if (claimedCount === 0) {
        alert("Нет доступных наград.");
        return;
    }

    openPassRewardModal([
        "🎁",
        `Получено наград: ${claimedCount}`,
        lastReward ? "Награды добавлены" : ""
    ]);
}
const passQuests = [
    {
        title: "Сделать 10 прокрутов",
        progress: 7,
        max: 10,
        xp: 250
    },

    {
        title: "Открыть 2 сундука",
        progress: 1,
        max: 2,
        xp: 400
    },

    {
        title: "Получить epic карточку",
        progress: 0,
        max: 1,
        xp: 600
    }
];

function renderPassQuests() {
    const list = document.getElementById("pass-quests-list");

    if (!list) return;

    list.innerHTML = passQuests.map((quest, index) => {
        const percent = Math.min(
            100,
            (quest.progress / quest.max) * 100
        );

        const completed = quest.progress >= quest.max;

        return `
            <div class="pass-quest">
                <div class="pass-quest-left">
                    <div class="pass-quest-title">
                        ${quest.title}
                    </div>

                    <div class="pass-quest-progress">
                        <div style="width:${percent}%"></div>
                    </div>

                    <div class="pass-quest-xp">
                        ${quest.progress}/${quest.max} • ${quest.xp} XP
                    </div>
                </div>

                ${
                    completed
                        ? `<button onclick="claimQuestReward(${index})">
                            Забрать
                           </button>`
                        : `<button disabled>
                            В процессе
                           </button>`
                }
            </div>
        `;
    }).join("");
}

function claimQuestReward(index) {
    const quest = passQuests[index];

    fakePassState.level += 1;

    openPassRewardModal([
        "⭐",
        "Получен уровень пропуска",
        `+${quest.xp} XP`
    ]);

    passQuests.splice(index, 1);

    renderPassQuests();
    renderBattlePass();
}
let activeQuestTab = "daily";

const questsData = {
    daily: [
        {
            icon: "🎰",
            title: "Сделать 10 прокрутов",
            desc: "Играй в любые мем-темы и трать энергию.",
            progress: 7,
            max: 10,
            xp: 250
        },
        {
            icon: "🎁",
            title: "Открыть 2 сундука",
            desc: "Открой любые сундуки из инвентаря.",
            progress: 1,
            max: 2,
            xp: 400
        },
        {
            icon: "🃏",
            title: "Получить rare карточку",
            desc: "Выбей любую карточку редкости rare или выше.",
            progress: 1,
            max: 1,
            xp: 350
        }
    ],

    season: [
        {
            icon: "🏆",
            title: "Сделать 300 прокрутов",
            desc: "Длинное сезонное задание для активных игроков.",
            progress: 84,
            max: 300,
            xp: 2500
        },
        {
            icon: "🧵",
            title: "Собрать 100 тканей",
            desc: "Получай ткани из сундуков, пропуска и коллекций.",
            progress: 36,
            max: 100,
            xp: 1800
        },
        {
            icon: "👑",
            title: "Забрать 20 наград пропуска",
            desc: "Продвигайся по пропуску и забирай награды.",
            progress: 8,
            max: 20,
            xp: 2200
        }
    ]
};

function switchQuestTab(type) {
    activeQuestTab = type;

    document.querySelectorAll(".quest-tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeButton = Array.from(document.querySelectorAll(".quest-tab-btn")).find(btn => {
        return btn.getAttribute("onclick")?.includes(type);
    });

    if (activeButton) {
        activeButton.classList.add("active");
    }

    renderQuestsScreen();
}

function renderQuestsScreen() {
    const list = document.getElementById("quests-list");
    const count = document.getElementById("quests-today-count");

    if (!list) return;

    const quests = activeQuestTab === "daily" ? dailyQuests : seasonQuests;

    if (count) {
        count.innerText = `${quests.length} задания`;
    }

    list.innerHTML = quests.map((quest, index) => {
        const percent = Math.min(100, (quest.progress / quest.need) * 100);
        const completed = quest.progress >= quest.need;
        const claimed = quest.claimed;

        return `
            <div class="quest-card ${completed ? "completed" : ""} ${claimed ? "claimed" : ""}">
                <div class="quest-icon">${quest.icon}</div>

                <div class="quest-info">
                    <h3>${quest.title}</h3>
                    <p>${quest.description}</p>

                    <div class="quest-progress-bar">
                        <div class="quest-progress-fill" style="width:${percent}%"></div>
                    </div>
                </div>

                <div class="quest-meta">
                    <b>+${quest.rewardXP} XP</b>
                    <span>${quest.progress}/${quest.need}</span>

                    <button 
                        onclick="claimQuestScreenReward(${index})" 
                        ${completed && !claimed ? "" : "disabled"}
                    >
                        ${claimed ? "Получено" : completed ? "Забрать" : "В процессе"}
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function claimQuestScreenReward(index) {
    const quests = activeQuestTab === "daily"
        ? dailyQuests
        : seasonQuests;

    const quest = quests[index];

    if (!quest) return;

    if (quest.claimed) return;

    if (quest.progress < quest.need) return;

    let rewardXP = quest.rewardXP;

    if (fakePassState?.premium) {
        rewardXP = Math.floor(rewardXP * 1.2);
    }

    addPassXP(rewardXP);

    quest.claimed = true;

    saveQuestState();

    renderQuestsScreen();

    showFloatingReward?.(`+${rewardXP} XP`);
}
function addQuestProgressByTitle(text, amount = 1) {
    Object.keys(questsData).forEach(tabName => {
        questsData[tabName].forEach(quest => {
            if (quest.title.includes(text)) {
                quest.progress = Math.min(quest.max, quest.progress + amount);
            }
        });
    });

    renderQuestsScreen();
}
function addQuestProgressForCardRarity(rarity) {
    const goodRarities = ["rare", "epic", "legendary"];

    if (goodRarities.includes(rarity)) {
        addQuestProgress("rareCards", 1);
    }

    if (rarity === "epic" || rarity === "legendary") {
        addQuestProgress("epicCards", 1);
    }
}

function getPassStateKey() {
    return "memeBattlePassStateV1";
}

function savePassState() {
    localStorage.setItem(getPassStateKey(), JSON.stringify(fakePassState));
}

function loadPassState() {
    const saved = localStorage.getItem(getPassStateKey());

    if (!saved) {
        fakePassState.xp = fakePassState.xp || 0;
        fakePassState.xpNeed = fakePassState.xpNeed || 1000;
        return;
    }

    const parsed = JSON.parse(saved);

    fakePassState.level = parsed.level ?? fakePassState.level;
    fakePassState.xp = parsed.xp ?? 0;
    fakePassState.xpNeed = parsed.xpNeed ?? 1000;
    fakePassState.premium = parsed.premium ?? false;
    fakePassState.claimedFree = parsed.claimedFree || [];
    fakePassState.claimedPremium = parsed.claimedPremium || [];
}

function getPassXpNeed(level) {
    return 800 + level * 200;
}

function addPassXP(amount) {
    fakePassState.xp = fakePassState.xp || 0;
    fakePassState.xpNeed = fakePassState.xpNeed || getPassXpNeed(fakePassState.level);

    fakePassState.xp += amount;

    while (fakePassState.xp >= fakePassState.xpNeed && fakePassState.level < 30) {
        fakePassState.xp -= fakePassState.xpNeed;
        fakePassState.level += 1;
        fakePassState.xpNeed = getPassXpNeed(fakePassState.level);
    }

    if (fakePassState.level >= 30) {
        fakePassState.level = 30;
        fakePassState.xp = 0;
        fakePassState.xpNeed = getPassXpNeed(30);
    }

    savePassState();
    renderBattlePass();
}
function openProfileScreen() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const profileScreen = document.getElementById("profile-screen");
    if (profileScreen) {
        profileScreen.classList.add("active");
    }

    renderProfileScreen();
}
function ensurePlayerStats() {
    if (!playerData.stats) {
        playerData.stats = {};
    }

    const defaults = {
        spins: 0,
        energySpent: 0,
        chestsOpened: 0,
        rareCards: 0,
        epicCards: 0,
        clothCollected: 0,
        passRewardsClaimed: 0,
        collectionsCompleted: 0
    };

    Object.keys(defaults).forEach(key => {
        if (typeof playerData.stats[key] !== "number") {
            playerData.stats[key] = defaults[key];
        }
    });
}
const simpleInventoryItems = [
    {
        category: "chests",
        name: "Обычный сундук",
        rarity: "common",
        count: 12,
        img: "image/ui/chest-common.png",
        obtain: "Можно получить за квесты и пропуск."
    },
    {
        category: "chests",
        name: "Редкий сундук",
        rarity: "rare",
        count: 8,
        img: "image/ui/chest-rare.png",
        obtain: "Можно получить в пропуске и наградах."
    },
    {
        category: "resources",
        name: "Золото",
        rarity: "common",
        count: 5000,
        img: "image/ui/gold.png",
        obtain: "Получается за игру, квесты и сундуки."
    },
    {
        category: "resources",
        name: "Гемы",
        rarity: "epic",
        count: 0,
        img: "image/ui/gems.png",
        obtain: "Премиальная валюта."
    },
    {
        category: "passes",
        name: "Пропуск персонажей",
        rarity: "legendary",
        count: 1,
        img: "image/ui/pass-style.png",
        obtain: "Открывает премиум линию пропуска."
    }
];

let activeInventoryCategory = "all";

function renderInventoryItems() {
    const grid = document.getElementById("inventory-items-grid");
    if (!grid) return;

    const items = activeInventoryCategory === "all"
        ? simpleInventoryItems
        : simpleInventoryItems.filter(item => item.category === activeInventoryCategory);

    grid.innerHTML = items.map((item, index) => `
        <div class="inventory-item-card" onclick="selectInventoryItem(${index})">
            <img src="${item.img}" alt="">
            <h3>${item.name}</h3>
            <p>x${item.count}</p>
        </div>
    `).join("");
}

function selectInventoryItem(index) {
    const item = simpleInventoryItems[index];
    if (!item) return;

    const panel = document.querySelector(".inventory-preview, .inventory-details, .inventory-right-panel");
    if (!panel) return;

    panel.innerHTML = `
        <img src="${item.img}" alt="Preview">
        <h2>${item.name}</h2>
        <p>Редкость: ${item.rarity}</p>
        <p>В наличии: ${item.count}</p>
        <p>Можно получить из: ${item.obtain}</p>
        <button>Использовать</button>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderInventoryItems();
    updateCollectionHeaderResources();
});
let currentCollectionCharacter = null;
const inventoryItems = [
    {
        name: "Common ткань",
        rarity: "common",
        category: "cloth",
        count: 15,
        source: "Обычные сундуки",
        image: "image/ui/cloth-common.png"
    },

    {
        name: "Rare ткань",
        rarity: "rare",
        category: "cloth",
        count: 7,
        source: "Rare сундуки",
        image: "image/ui/cloth-rare.png"
    },

    {
        name: "Epic ткань",
        rarity: "epic",
        category: "cloth",
        count: 3,
        source: "Epic сундуки",
        image: "image/ui/cloth-epic.png"
    },

    {
        name: "Legendary ткань",
        rarity: "legendary",
        category: "cloth",
        count: 1,
        source: "Legendary сундуки",
        image: "image/ui/cloth-legendary.png"
    }
];

function renderInventoryItems(category = "all") {

    const grid = document.getElementById("inventoryGrid");

    if (!grid) return;

    grid.innerHTML = "";

    let filtered = inventoryItems;

    if (category !== "all") {
        filtered = inventoryItems.filter(item => item.category === category);
    }

    filtered.forEach(item => {

        const card = document.createElement("div");

        card.className = `inventory-item rarity-${item.rarity}`;

        card.innerHTML = `
            <img src="${item.image}" alt="">
            <h4>${item.name}</h4>
            <p>x${item.count}</p>
        `;

card.onclick = () => {
    document.querySelectorAll(".inventory-item").forEach(el => {
        el.classList.remove("selected");
    });

    card.classList.add("selected");

    showInventoryPreview(item);
};

        grid.appendChild(card);
    });
}
let selectedInventoryItem = null;

function showInventoryPreview(item) {
    selectedInventoryItem = item;

    const img = document.getElementById("previewImg");
    const name = document.getElementById("previewName");
    const rarity = document.getElementById("previewRarity");
    const count = document.getElementById("previewCount");
    const source = document.getElementById("previewSource");
    const btn = document.getElementById("useItemBtn");

    if (img) img.src = item.image;
    if (name) name.innerText = item.name;
    if (rarity) rarity.innerText = item.rarity.toUpperCase();
    if (count) count.innerText = item.count;
    if (source) source.innerText = item.source;

    if (btn) {
        if (item.category === "chests") {
            btn.innerText = "ОТКРЫТЬ";
        } else if (item.category === "passes") {
            btn.innerText = "ИСПОЛЬЗОВАТЬ";
        } else {
            btn.innerText = "ПОСМОТРЕТЬ";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderInventoryItems();
});
function setupInventoryTabs() {
    const buttons = document.querySelectorAll(".inventory-sidebar li");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const category = button.dataset.category || "all";

            renderInventoryItems(category);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupInventoryTabs();
    renderInventoryItems("all");
});
function useSelectedInventoryItem() {
    if (!selectedInventoryItem) {
        alert("Сначала выберите предмет.");
        return;
    }

    if (selectedInventoryItem.category === "chests") {
        alert("Скоро здесь будет анимация открытия сундука.");
        return;
    }

    if (selectedInventoryItem.category === "passes") {
        alert("Предмет пропуска использован.");
        return;
    }

    alert("Этот предмет пока нельзя использовать.");
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("useItemBtn");

    if (btn) {
        btn.onclick = useSelectedInventoryItem;
    }
});
const dailyQuests = [
{
    id: "daily_spins",
    type: "spins",
    title: "Сделать 10 прокрутов",
    description: "Играй в любые мем-темы и трать энергию.",
    icon: "🎰",
    need: 10,
    progress: 0,
    rewardXP: 250,
    claimed: false
},

{
    id: "daily_energy",
    type: "energySpent",
    title: "Потратить 20 энергии",
    description: "Трать энергию во время игры.",
    icon: "⚡",
    need: 20,
    progress: 0,
    rewardXP: 300,
    claimed: false
},

{
    id: "daily_chests",
    type: "chestsOpened",
    title: "Открыть 2 сундука",
    description: "Открывай любые сундуки.",
    icon: "🎁",
    need: 2,
    progress: 0,
    rewardXP: 400,
    claimed: false
},

{
    id: "daily_rare",
    type: "rareCards",
    title: "Получить rare карточку",
    description: "Выбей любую rare+ карточку.",
    icon: "🃏",
    need: 1,
    progress: 0,
    rewardXP: 350,
    claimed: false
}
];
const seasonQuests = [

{
    id: "season_spins",
    type: "spins",
    title: "Сделать 300 прокрутов",
    description: "Длинное сезонное задание.",
    icon: "🏆",
    need: 300,
    progress: 0,
    rewardXP: 2500,
    claimed: false
},

{
    id: "season_cloth",
    type: "clothCollected",
    title: "Собрать 100 тканей",
    description: "Получай ткани из сундуков и наград.",
    icon: "🧵",
    need: 100,
    progress: 0,
    rewardXP: 1800,
    claimed: false
},

{
    id: "season_pass",
    type: "passRewardsClaimed",
    title: "Забрать 20 наград пропуска",
    description: "Продвигайся по пропуску.",
    icon: "👑",
    need: 20,
    progress: 0,
    rewardXP: 2200,
    claimed: false
}
];
function getAllQuests() {
    return [...dailyQuests, ...seasonQuests];
}
function addQuestProgress(type, amount = 1) {
    addPlayerStat(type, amount);
    getAllQuests().forEach(quest => {
        if (quest.type !== type) return;
        if (quest.claimed) return;

        quest.progress = Math.min(
            quest.need,
            quest.progress + amount
        );
    });
    addAchievementProgress(type, amount);
    saveQuestState();
    renderQuestsScreen();
}
function addQuestProgress(type, amount = 1) {
    getAllQuests().forEach(quest => {
        if (quest.type !== type) return;
        if (quest.claimed) return;

        quest.progress = Math.min(
            quest.need,
            quest.progress + amount
        );
    });

    saveQuestState();
    renderQuestsScreen();
}

function getTodayQuestDate() {
    return new Date().toISOString().slice(0, 10);
}

function resetDailyQuestsOnly() {
    dailyQuests.forEach(quest => {
        quest.progress = 0;
        quest.claimed = false;
    });
}

function saveQuestState() {
    const state = {
        dailyQuests,
        seasonQuests,
        savedDate: getTodayQuestDate()
    };

    localStorage.setItem("memeQuestStateV1", JSON.stringify(state));
}

function loadQuestState() {
    const saved = localStorage.getItem("memeQuestStateV1");

    if (!saved) {
        saveQuestState();
        return;
    }

    const state = JSON.parse(saved);
    const today = getTodayQuestDate();

    if (state.seasonQuests) {
        state.seasonQuests.forEach(savedQuest => {
            const quest = seasonQuests.find(q => q.id === savedQuest.id);
            if (quest) {
                quest.progress = savedQuest.progress || 0;
                quest.claimed = savedQuest.claimed || false;
            }
        });
    }

    if (state.savedDate === today && state.dailyQuests) {
        state.dailyQuests.forEach(savedQuest => {
            const quest = dailyQuests.find(q => q.id === savedQuest.id);
            if (quest) {
                quest.progress = savedQuest.progress || 0;
                quest.claimed = savedQuest.claimed || false;
            }
        });
    } else {
        resetDailyQuestsOnly();
    }

    saveQuestState();
}
const achievements = [
    // === ПРОКРУТЫ ===
    { id: "spin_1", title: "Первый запуск", description: "Сделай первый прокрут.", icon: "🎰", type: "spins", need: 1, category: "game" },
    { id: "spin_10", title: "Новичок слота", description: "Сделай 10 прокрутов.", icon: "🎲", type: "spins", need: 10, category: "game" },
    { id: "spin_100", title: "Любитель прокрутов", description: "Сделай 100 прокрутов.", icon: "🔥", type: "spins", need: 100, category: "game" },
    { id: "spin_500", title: "Гриндер", description: "Сделай 500 прокрутов.", icon: "⚙️", type: "spins", need: 500, category: "game" },
    { id: "spin_1000", title: "Бесконечный игрок", description: "Сделай 1000 прокрутов.", icon: "🌌", type: "spins", need: 1000, category: "game" },

    // === ЭНЕРГИЯ ===
    { id: "energy_100", title: "Энергичный старт", description: "Потрать 100 энергии.", icon: "⚡", type: "energySpent", need: 100, category: "progress" },
    { id: "energy_1000", title: "Запас силы", description: "Потрать 1000 энергии.", icon: "🔋", type: "energySpent", need: 1000, category: "progress" },
    { id: "energy_5000", title: "Генератор энергии", description: "Потрать 5000 энергии.", icon: "🌩️", type: "energySpent", need: 5000, category: "progress" },

    // === КАРТОЧКИ ===
    { id: "rare_1", title: "Редкая находка", description: "Получи 1 rare+ карточку.", icon: "🃏", type: "rareCards", need: 1, category: "collection" },
    { id: "rare_10", title: "Охотник за редкостью", description: "Получи 10 rare+ карточек.", icon: "🎴", type: "rareCards", need: 10, category: "collection" },
    { id: "rare_50", title: "Коллекционер редкостей", description: "Получи 50 rare+ карточек.", icon: "💠", type: "rareCards", need: 50, category: "collection" },

    { id: "epic_1", title: "Эпический момент", description: "Получи 1 epic+ карточку.", icon: "💜", type: "epicCards", need: 1, category: "collection" },
    { id: "epic_10", title: "Эпический охотник", description: "Получи 10 epic+ карточек.", icon: "🔮", type: "epicCards", need: 10, category: "collection" },

    // === СУНДУКИ ===
    { id: "chest_1", title: "Первый сундук", description: "Открой 1 сундук.", icon: "🎁", type: "chestsOpened", need: 1, category: "chests" },
    { id: "chest_10", title: "Охотник за сундуками", description: "Открой 10 сундуков.", icon: "📦", type: "chestsOpened", need: 10, category: "chests" },
    { id: "chest_50", title: "Сундуковый мастер", description: "Открой 50 сундуков.", icon: "🧰", type: "chestsOpened", need: 50, category: "chests" },
    { id: "chest_100", title: "Король сундуков", description: "Открой 100 сундуков.", icon: "👑", type: "chestsOpened", need: 100, category: "chests" },

    // === ТКАНИ ===
    { id: "cloth_10", title: "Первые ткани", description: "Собери 10 тканей.", icon: "🧵", type: "clothCollected", need: 10, category: "chests" },
    { id: "cloth_100", title: "Собиратель тканей", description: "Собери 100 тканей.", icon: "🪡", type: "clothCollected", need: 100, category: "chests" },
    { id: "cloth_1000", title: "Мастер ткани", description: "Собери 1000 тканей.", icon: "🧶", type: "clothCollected", need: 1000, category: "chests" },

    // === ПРОПУСК ===
    { id: "pass_1", title: "Первая награда", description: "Забери 1 награду пропуска.", icon: "🎟️", type: "passRewardsClaimed", need: 1, category: "pass" },
    { id: "pass_10", title: "Игрок пропуска", description: "Забери 10 наград пропуска.", icon: "👑", type: "passRewardsClaimed", need: 10, category: "pass" },
    { id: "pass_30", title: "Герой сезона", description: "Забери 30 наград пропуска.", icon: "🏆", type: "passRewardsClaimed", need: 30, category: "pass" },

    // === БУДУЩИЕ КОЛЛЕКЦИИ ===
    { id: "collection_1", title: "Первая закрытая тема", description: "Закрой 1 коллекционную тему.", icon: "📚", type: "collectionsCompleted", need: 1, category: "collection" },
    { id: "collection_5", title: "Коллекционер", description: "Закрой 5 коллекционных тем.", icon: "🏛️", type: "collectionsCompleted", need: 5, category: "collection" },
    { id: "collection_all", title: "Собрал всё", description: "Закрой все темы.", icon: "🌟", type: "collectionsCompleted", need: 11, category: "collection" }
];

let achievementState = {};

function loadAchievements() {
    const saved = localStorage.getItem("memeAchievementsV1");

    if (saved) {
        try {
            achievementState = JSON.parse(saved);
        } catch {
            achievementState = {};
        }
    }

    achievements.forEach(ach => {
        if (!achievementState[ach.id]) {
            achievementState[ach.id] = {
                progress: 0,
                completed: false,
                equipped: false
            };
        }

        if (achievementState[ach.id].progress >= ach.need) {
            achievementState[ach.id].completed = true;
        }
    });

    saveAchievements();
}
function saveAchievements() {
    localStorage.setItem("memeAchievementsV1", JSON.stringify(achievementState));
}

function addAchievementProgress(type, amount = 1) {
    achievements.forEach(ach => {
        if (ach.type !== type) return;

        const state = achievementState[ach.id];
        if (!state || state.completed) return;

        state.progress = Math.min(ach.need, state.progress + amount);

        if (state.progress >= ach.need) {
            state.completed = true;
            showAchievementToast(ach);
        }
    });

    saveAchievements();
}
let activeAchievementFilter = "all";

function setAchievementFilter(filter, btn) {
    activeAchievementFilter = filter;

    document.querySelectorAll(".achievement-filter").forEach(item => {
        item.classList.remove("active");
    });

    if (btn) btn.classList.add("active");

    renderAchievementsScreen();
}

function getAchievementCategory(type) {
    if (["spins", "energySpent"].includes(type)) return "game";
    if (["rareCards", "epicCards", "collectionsCompleted"].includes(type)) return "collection";
    if (["chestsOpened", "clothCollected"].includes(type)) return "chests";
    if (["passRewardsClaimed"].includes(type)) return "pass";
    return "progress";
}

function renderAchievementsScreen() {
    const grid = document.getElementById("achievements-grid");
    if (!grid) return;

    const sortEl = document.getElementById("achievements-sort");
    const sort = sortEl ? sortEl.value : "unfinished";

    let list = achievements.map(ach => {
        const state = achievementState[ach.id] || {
            progress: 0,
            completed: false,
            equipped: false
        };

        return {
            ...ach,
            state,
            category: ach.category || getAchievementCategory(ach.type)
        };
    });

    if (activeAchievementFilter !== "all") {
        list = list.filter(ach => ach.category === activeAchievementFilter);
    }

    if (sort === "unfinished") {
        list.sort((a, b) => Number(a.state.completed) - Number(b.state.completed));
    }

    if (sort === "completed") {
        list.sort((a, b) => Number(b.state.completed) - Number(a.state.completed));
    }

    grid.innerHTML = list.map(ach => {
        const progress = ach.state.progress || 0;
        const percent = Math.min(100, (progress / ach.need) * 100);
        const completed = ach.state.completed;

        return `
            <div class="achievement-card ${completed ? "completed" : "locked"} medal-${getAchievementMedalRarity(ach.need)}">
                <div class="achievement-medal">
                    <div class="achievement-medal-icon">${completed ? ach.icon : "🔒"}</div>
                </div>

                <div class="achievement-info">
                    <h3>${ach.title}</h3>
                    <p>${ach.description}</p>

                    <div class="achievement-progress">
                        <div style="width:${percent}%"></div>
                    </div>

                    <span>${progress} / ${ach.need}</span>
                </div>

                <div class="achievement-status">
                    ${
                        completed
                            ? `<button onclick="equipAchievement('${ach.id}')">${ach.state.equipped ? "Стоит" : "Поставить"}</button>`
                            : `<b>${Math.floor(percent)}%</b>`
                    }
                </div>
            </div>
        `;
    }).join("");

    updateAchievementsTotal();
}

function updateAchievementsTotal() {
    const totalText = document.getElementById("achievements-total-text");
    const totalFill = document.getElementById("achievements-total-fill");

    const total = achievements.length;
    const completed = achievements.filter(ach => achievementState[ach.id]?.completed).length;
    const percent = total > 0 ? Math.floor((completed / total) * 100) : 0;

    if (totalText) totalText.innerText = `${completed} / ${total}`;
    if (totalFill) totalFill.style.width = percent + "%";
}

function equipAchievement(id) {
    Object.keys(achievementState).forEach(key => {
        achievementState[key].equipped = false;
    });

    achievementState[id].equipped = true;
saveAchievements();

updateEquippedAchievementBadge();

renderAchievementsScreen();

openAchievementsMedals();

    alert("🏅 Медаль выбрана для профиля!");
}

function openAchievementsMedals() {
    const modal = document.getElementById("medals-modal");
    const grid = document.getElementById("medals-modal-grid");

    if (!modal || !grid) return;

    grid.innerHTML = achievements.map(ach => {
        const state = achievementState[ach.id];
        const completed = state?.completed;
        const equipped = state?.equipped;
        const rarity = getAchievementMedalRarity(ach.need);

        return `
            <div class="medal-item medal-${rarity} ${completed ? "unlocked" : "locked"} ${equipped ? "equipped" : ""}">
                <div class="medal-item-icon">${completed ? ach.icon : "🔒"}</div>
                <h3>${ach.title}</h3>
                <p>${completed ? "Открыта" : "Не открыта"}</p>

                ${
                    completed
                        ? `<button onclick="equipAchievement('${ach.id}')">${equipped ? "Стоит" : "Поставить"}</button>`
                        : `<button disabled>Закрыто</button>`
                }
            </div>
        `;
    }).join("");

    modal.classList.add("active");
}

function closeAchievementsMedals() {
    const modal = document.getElementById("medals-modal");
    if (modal) modal.classList.remove("active");
}
function getAchievementMedalRarity(need) {
    if (need >= 1000) return "legendary";
    if (need >= 500) return "epic";
    if (need >= 100) return "gold";
    if (need >= 10) return "silver";
    return "bronze";
}
function resetAchievementsTest() {
    if (!confirm("Сбросить достижения для теста?")) return;

    localStorage.removeItem("memeAchievementsV1");
    achievementState = {};
    loadAchievements();
    renderAchievementsScreen();
}
function updateEquippedAchievementBadge() {
    const badge = document.getElementById("equipped-achievement-badge");

    if (!badge) return;

    const equippedAchievement = achievements.find(ach =>
        achievementState[ach.id]?.equipped
    );

    if (!equippedAchievement) {
        badge.innerHTML = "—";
        badge.className = "equipped-achievement-badge";
        return;
    }

    const rarity = getAchievementMedalRarity(equippedAchievement.need);

    badge.innerHTML = `
        <span>${equippedAchievement.icon}</span>
        <b>${equippedAchievement.title}</b>
    `;

    badge.className = `
        equipped-achievement-badge
        medal-${rarity}
    `;
}
function showAchievementToast(ach) {
    const toast = document.getElementById("achievement-toast");
    const icon = document.getElementById("achievement-toast-icon");
    const title = document.getElementById("achievement-toast-title");

    if (!toast || !icon || !title) return;

    icon.innerText = ach.icon;
    title.innerText = ach.title;

    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}
function openProfileScreen() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("profile-screen").classList.add("active");

    renderProfileScreen();
}

function renderProfileScreen() {
    const nameEl = document.getElementById("profile-player-name");
    const headerName = document.querySelector(".header-v2-name");

    if (nameEl) {
        nameEl.textContent = headerName?.textContent || "PLAYER";
    }

    const medalEl = document.getElementById("profile-equipped-medal");

    const equippedAchievement = achievements.find(ach =>
        achievementState[ach.id]?.equipped
    );

    if (medalEl) {
        if (equippedAchievement) {
            medalEl.innerHTML = `
                <div class="profile-medal-v2">
                    ${equippedAchievement.icon}
                    <span>${equippedAchievement.title}</span>
                </div>
            `;
        } else {
            medalEl.innerHTML = `
                <div class="profile-medal-v2 empty">
                    Нет выбранной медали
                </div>
            `;
        }
    }

    const stats = playerData.stats || {};

    document.getElementById("profile-total-spins").textContent =
        stats.spins || 0;

    document.getElementById("profile-total-chests").textContent =
        stats.chestsOpened || 0;

    document.getElementById("profile-total-rare").textContent =
        stats.rareCards || 0;

    document.getElementById("profile-total-cloth").textContent =
        stats.clothCollected || 0;

    const characterName = currentCharacter || "helin";
    const characterImg = document.getElementById("profile-character-image");
    const characterTitle = document.getElementById("profile-character-name");

    if (characterImg) {
        characterImg.src = `./image/characters/${characterName}/skin-1.png`;
    }

    if (characterTitle) {
        characterTitle.textContent = characterName.toUpperCase();
    }
}
function addPlayerStat(type, amount = 1) {
    ensurePlayerStats();

    if (typeof playerData.stats[type] !== "number") {
        playerData.stats[type] = 0;
    }

    playerData.stats[type] += amount;

    savePlayer();
}
function openCardPath(themeName, itemSrc) {
    const detailView = document.getElementById('collection-detail-view');
    const pathView = document.getElementById('collection-card-path-view');

    if (!detailView || !pathView) return;

    const fileName = getFileNameFromSrc(itemSrc);
    const cardKey = getCardKey(themeName, itemSrc);
    const rarity = cardRarity[fileName] || "common";
    const progress = playerData.cards?.[cardKey] || 0;
    const milestones = getRewardMilestones(cardKey);
    const nextValue = getNextMilestoneValue(cardKey);
    const percent = Math.min(100, Math.round((progress / nextValue) * 100));
    const cardName = cardDisplayNames[fileName] || fileName;
    const levelInfo = getCardLevelInfo(cardKey);
    const claimedRewards = getClaimedCardRewards(cardKey);
const availableRewardsCount = milestones.filter(value => {
    return progress >= value && !claimedRewards.includes(value);
}).length;
    const hero = document.getElementById('collection-detail-hero');
const grid = document.getElementById('collection-detail-grid');

if (hero) hero.style.display = 'none';
if (grid) grid.style.display = 'none';
    pathView.style.display = 'block';
    pathView.innerHTML = `
        <div class="card-path-panel rarity-${rarity}">
            <button class="card-path-back" onclick="closeCardPath()">
                ← НАЗАД К ТЕМЕ
            </button>

            <div class="card-path-left">
                <div class="card-path-image">
                    <img src="${itemSrc}" alt="">
                </div>

                <div class="card-path-rarity">${rarity}</div>
            </div>

            <div class="card-path-right">
                <div class="card-path-level">
    LEVEL ${levelInfo.level}
</div>
                <h2>${cardName}</h2>

                <p>
                    Прокачивай эту карточку через совпадения в слоте.
                    Чем выше прогресс, тем больше наград открывается.
                </p>

<div class="card-path-progress">
    <div style="width:${levelInfo.progress}%"></div>
</div>

<div class="card-path-next-text">
    До следующего уровня: ${progress} / ${levelInfo.next}
</div>
<button 
    class="card-path-claim-btn ${availableRewardsCount <= 0 ? 'disabled' : ''}" 
    onclick="claimAvailableCardRewards('${cardKey}')"
    ${availableRewardsCount <= 0 ? "disabled" : ""}
>
    ${
        availableRewardsCount > 0
            ? `ЗАБРАТЬ НАГРАДЫ x${availableRewardsCount}`
            : "НЕТ ДОСТУПНЫХ НАГРАД"
    }
</button>
                <div class="card-path-milestones">
                    ${milestones.slice(0, 12).map(value => {
                        const isDone = progress >= value;
                        const isClaimed = getClaimedCardRewards(cardKey).includes(value);

                        return `
                            <div class="card-path-reward ${isDone ? "done" : ""} ${isClaimed ? "claimed" : ""}">
                                <div class="reward-dot">
    ${isClaimed ? "✓" : isDone ? "!" : value}
</div> 
<div class="reward-box">
    ${getMilestoneRewardIcon(rarity, value)}

    <div class="reward-status-text">
        ${isClaimed ? "ПОЛУЧЕНО" : isDone ? "ДОСТУПНО" : "ЗАКРЫТО"}
    </div>
</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

function closeCardPath() {
    const pathView = document.getElementById('collection-card-path-view');
    if (!pathView) return;

    pathView.style.display = 'none';
    pathView.innerHTML = '';
    const hero = document.getElementById('collection-detail-hero');
const grid = document.getElementById('collection-detail-grid');

if (hero) hero.style.display = 'block';
if (grid) grid.style.display = 'grid';
}

function getMilestoneRewardIcon(rarity, value) {
    const reward = getCardPathReward(rarity, value);

    return `
        <div class="reward-icon">${reward.icon}</div>
        <div class="reward-amount">${reward.amount}</div>
    `;
}

function getCardPathReward(rarity, value) {
    if (rarity === "legendary") {
        if (value % 5 === 0) return { icon: "🎁", amount: "сундук" };
        return { icon: "💎", amount: "x25" };
    }

    if (rarity === "epic") {
        if (value % 4 === 0) return { icon: "💎", amount: "x10" };
        return { icon: "🪙", amount: "x500" };
    }

    if (rarity === "rare") {
        if (value % 3 === 0) return { icon: "⚡", amount: "x2" };
        return { icon: "🪙", amount: "x250" };
    }

    if (value % 2 === 0) return { icon: "⚡", amount: "x1" };
    return { icon: "🪙", amount: "x100" };
}
function ensureClaimedCardRewards() {
    if (!playerData.claimedCardRewards) {
        playerData.claimedCardRewards = {};
    }
}

function getClaimedCardRewards(cardKey) {
    ensureClaimedCardRewards();

    if (!playerData.claimedCardRewards[cardKey]) {
        playerData.claimedCardRewards[cardKey] = [];
    }

    return playerData.claimedCardRewards[cardKey];
}

function claimAvailableCardRewards(cardKey) {
    ensureClaimedCardRewards();

    const progress = playerData.cards?.[cardKey] || 0;
    const milestones = getRewardMilestones(cardKey);
    const claimed = getClaimedCardRewards(cardKey);

    let claimedCount = 0;

    milestones.forEach(value => {
        if (progress >= value && !claimed.includes(value)) {
            claimed.push(value);
            giveCardPathReward(cardKey, value);
            claimedCount++;
        }
    });

    if (claimedCount <= 0) {
        showToastMessage("Нет доступных наград");
        return;
    }

    savePlayerData();
    showRewardBurstModal(claimedCount);

    const parts = cardKey.split(':');
    const themeName = parts[0];
    const fileName = parts[1];
    openCardPath(themeName, `image/${themeName}/${fileName}`);
}

function giveCardPathReward(cardKey, value) {
    const fileName = cardKey.split(':')[1];
    const rarity = cardRarity[fileName] || "common";
    const reward = getCardPathReward(rarity, value);

    if (reward.icon === "🪙") {
        playerData.gold = (playerData.gold || 0) + parseInt(reward.amount.replace("x", ""));
    }

    if (reward.icon === "💎") {
        playerData.premiumTokens = (playerData.premiumTokens || 0) + parseInt(reward.amount.replace("x", ""));
    }

    if (reward.icon === "⚡") {
        playerData.energy = (playerData.energy || 0) + parseInt(reward.amount.replace("x", ""));
    }

    if (reward.icon === "🎁") {
        playerData.chests = playerData.chests || {};
        playerData.chests.legendary = (playerData.chests.legendary || 0) + 1;
    }

    updateHeaderResources?.();
}

function showToastMessage(text) {
    let toast = document.getElementById('game-toast-message');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'game-toast-message';
        toast.className = 'game-toast-message';
        document.body.appendChild(toast);
    }

    toast.textContent = text;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}   
function showRewardBurstModal(count) {
    let modal = document.getElementById('reward-burst-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'reward-burst-modal';
        modal.className = 'reward-burst-modal';

        modal.innerHTML = `
            <div class="reward-burst-card">
                <div class="reward-burst-label">НАГРАДЫ ПОЛУЧЕНЫ</div>
                <div class="reward-burst-icon">🎁</div>
                <h2>Отлично!</h2>
                <p id="reward-burst-text">Получено наград: ${count}</p>
                <button onclick="closeRewardBurstModal()">Забрать</button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    document.getElementById('reward-burst-text').textContent = `Получено наград: ${count}`;
    modal.classList.add('active');
}

function closeRewardBurstModal() {
    const modal = document.getElementById('reward-burst-modal');
    if (!modal) return;

    modal.classList.remove('active');
}
function getCardLevelInfo(cardKey) {
    const progress = playerData.cards?.[cardKey] || 0;
    const milestones = getRewardMilestones(cardKey);

    let level = 1;

    milestones.forEach(value => {
        if (progress >= value) level++;
    });

    const currentLevel = Math.min(level, milestones.length + 1);
    const nextMilestone = milestones.find(value => progress < value) || milestones[milestones.length - 1];
    const prevMilestone = milestones.slice().reverse().find(value => progress >= value) || 0;

    const levelProgress = nextMilestone === prevMilestone
        ? 100
        : Math.round(((progress - prevMilestone) / (nextMilestone - prevMilestone)) * 100);

    return {
        level: currentLevel,
        progress: Math.max(0, Math.min(100, levelProgress)),
        next: nextMilestone
    };
}
function getThemeRank(percent) {
    if (percent >= 100) return "MASTER";
    if (percent >= 75) return "ELITE";
    if (percent >= 50) return "HUNTER";
    if (percent >= 25) return "COLLECTOR";
    return "ROOKIE";
}
function showSlotCollectionGain(reward, xp = 0, streakBonus = 0) {
    const panel = document.getElementById('slot-collection-gain');
    const img = document.getElementById('slot-gain-img');
    const title = document.getElementById('slot-gain-title');
    const text = document.getElementById('slot-gain-text');

    if (!panel || !img || !title || !text || !reward) return;

    const cleanName = cardDisplayNames?.[reward.fileName] || reward.fileName;
    const rarity = cardRarity?.[reward.fileName] || "common";

    img.src = reward.src;
    title.innerText = `+${reward.amount} • ${cleanName}`;
    text.innerText = `Комбо x${reward.matchCount} • +${xp} XP${streakBonus > 0 ? ` • серия +${streakBonus}⚡` : ""}`;

    panel.classList.remove('show', 'rarity-common', 'rarity-rare', 'rarity-epic', 'rarity-legendary');
    void panel.offsetWidth;

    panel.classList.add('show', `rarity-${rarity}`);

    animateCardFlyToCollection(reward.src, panel);

    setTimeout(() => {
        panel.classList.remove('show');
    }, 3600);
}

function animateCardFlyToCollection(src, targetPanel) {
    const grid = document.getElementById('grid');
    if (!grid || !targetPanel) return;

    const firstCellImg = grid.querySelector(`.cell img[src="${src}"]`) || grid.querySelector('.cell img');
    if (!firstCellImg) return;

    const start = firstCellImg.getBoundingClientRect();
    const end = targetPanel.getBoundingClientRect();

    const flying = document.createElement('img');
    flying.src = src;
    flying.className = 'flying-collection-card';

    flying.style.left = `${start.left}px`;
    flying.style.top = `${start.top}px`;
    flying.style.width = `${start.width}px`;
    flying.style.height = `${start.height}px`;

    document.body.appendChild(flying);

    requestAnimationFrame(() => {
        flying.style.left = `${end.left + 22}px`;
        flying.style.top = `${end.top + 48}px`;
        flying.style.width = `54px`;
        flying.style.height = `54px`;
        flying.style.opacity = `0.15`;
        flying.style.transform = `rotate(12deg) scale(0.65)`;
    });

    setTimeout(() => {
        flying.remove();
        targetPanel.classList.add('hit');

        setTimeout(() => {
            targetPanel.classList.remove('hit');
        }, 450);
    }, 720);
}

function hideSlotCollectionGain() {
    const panel = document.getElementById('slot-collection-gain');
    if (panel) {
    panel.classList.remove('show');

    const list = panel.querySelector('.slot-gain-list');
    if (list) list.innerHTML = '';
}
}
function showSlotCollectionGainList(rewards, xp = 0, streakBonus = 0) {
    if (!rewards || rewards.length <= 0) return;

    showSlotCollectionGain(rewards[0], xp, streakBonus);

    const panel = document.getElementById('slot-collection-gain');
    if (!panel) return;

    let list = panel.querySelector('.slot-gain-list');

    if (!list) {
        list = document.createElement('div');
        list.className = 'slot-gain-list';
        panel.appendChild(list);
    }

    list.innerHTML = '';

    rewards.slice(0, 4).forEach(reward => {
        const cleanName = cardDisplayNames?.[reward.fileName] || reward.fileName;
        const rarity = cardRarity?.[reward.fileName] || "common";

        const item = document.createElement('div');
        item.className = `slot-gain-list-item rarity-${rarity}`;

        item.innerHTML = `
            <img src="${reward.src}" alt="">
            <div>
                <b>+${reward.amount} ${cleanName}</b>
                <span>Комбо x${reward.matchCount}</span>
            </div>
        `;

        list.appendChild(item);
    });

    if (rewards.length > 4) {
        const more = document.createElement('div');
        more.className = 'slot-gain-more';
        more.textContent = `+ ещё ${rewards.length - 4} совпад.`;
        list.appendChild(more);
    }
}
function highlightCollectionHits(rewards) {
    if (!rewards || rewards.length <= 0) return;

    const cells = document.querySelectorAll('#grid .cell');

    cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (!img) return;

        const isHit = rewards.some(reward => img.src.includes(reward.fileName));

        if (isHit) {
            cell.classList.remove('collection-hit');
            void cell.offsetWidth;
            cell.classList.add('collection-hit');

            setTimeout(() => {
                cell.classList.remove('collection-hit');
            }, 800);
        }
    });
}
function showFloatingReward(text) {
    showToastMessage(text);
}
const homeQuestChain = [
    { title: "Сделай 10 запусков", type: "spins", need: 10 },
    { title: "Потрать 20 энергии", type: "energySpent", need: 20 },
    { title: "Получи Rare карту", type: "rareCards", need: 1 },
    { title: "Открой 3 награды", type: "rewardsClaimed", need: 3 }
];

function getQuestProgressValue(type) {
    return playerData.questsProgress?.[type] || 0;
}

function renderHomeActiveQuest() {
    const titleEl = document.getElementById("gl-active-quest-title");
    const progressEl = document.getElementById("gl-active-quest-progress");
    const fillEl = document.getElementById("gl-active-quest-fill");

    if (!titleEl || !progressEl || !fillEl) return;

    const activeQuest = homeQuestChain.find(quest => {
        return getQuestProgressValue(quest.type) < quest.need;
    });

    if (!activeQuest) {
        titleEl.innerText = "Все квесты выполнены";
        progressEl.innerText = "MAX";
        fillEl.style.width = "100%";
        return;
    }

    const current = getQuestProgressValue(activeQuest.type);
    const percent = Math.min(100, (current / activeQuest.need) * 100);

    titleEl.innerText = activeQuest.title;
    progressEl.innerText = `${current} / ${activeQuest.need}`;
    fillEl.style.width = percent + "%";
}
const track = document.getElementById("themesTrack");

document.getElementById("themesNext")?.addEventListener("click", () => {
    track.scrollBy({
        left: 320,
        behavior: "smooth"
    });
});

document.getElementById("themesPrev")?.addEventListener("click", () => {
    track.scrollBy({
        left: -320,
        behavior: "smooth"
    });
});
function goHome() {
  window.location.href = "index.html";
}

function getCollectTheme() {
  const params = new URLSearchParams(window.location.search);
  return params.get("theme") || "sasavot";
}

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("collectThemeTitle");

  if (title) {
    const theme = getCollectTheme();

    const names = {
      sasavot: "SASAVOT PACK",
      helin: "HELIN PACK",
      lexapaws: "LEXA PAWS PACK",
      litwin: "LITWIN PACK",
      melstroy: "MELSTROY PACK",
      nikkifn: "NIKKIFN PACK",
      rejiboi: "REJIBOY PACK",
      rostik: "ROSTIKFACEKID PACK"
    };

    title.textContent = names[theme] || "MEME COLLECTION CLUB";
  }
});
const COLLECT_ENERGY_COST = 10;

const collectPacks = {
  1: "image/ui/collect/pack-common.png",
  2: "image/ui/collect/pack-common.png",
  3: "image/ui/collect/pack-rare.png",
  4: "image/ui/collect/pack-rare.png",
  5: "image/ui/collect/pack-epic.png",
  6: "image/ui/collect/pack-legendary.png"
};

const collectPacksOpen = {
  1: "image/ui/collect/pack-common-open.png",
  2: "image/ui/collect/pack-common-open.png",
  3: "image/ui/collect/pack-rare-open.png",
  4: "image/ui/collect/pack-rare-open.png",
  5: "image/ui/collect/pack-epic-open.png",
  6: "image/ui/collect/pack-legendary-open.png"
};

const packRarityChances = {
  1: [
    { rarity: "common", chance: 75 },
    { rarity: "rare", chance: 22 },
    { rarity: "epic", chance: 3 }
  ],
  2: [
    { rarity: "common", chance: 75 },
    { rarity: "rare", chance: 22 },
    { rarity: "epic", chance: 3 }
  ],
  3: [
    { rarity: "common", chance: 45 },
    { rarity: "rare", chance: 40 },
    { rarity: "epic", chance: 13 },
    { rarity: "legendary", chance: 2 }
  ],
  4: [
    { rarity: "common", chance: 45 },
    { rarity: "rare", chance: 40 },
    { rarity: "epic", chance: 13 },
    { rarity: "legendary", chance: 2 }
  ],
  5: [
    { rarity: "rare", chance: 35 },
    { rarity: "epic", chance: 50 },
    { rarity: "legendary", chance: 15 }
  ],
  6: [
    { rarity: "epic", chance: 60 },
    { rarity: "legendary", chance: 40 }
  ]
};

const diceProgressMultiplier = {
  1: 1,
  2: 1.1,
  3: 1.25,
  4: 1.5,
  5: 2,
  6: 2.5
};

const rarityProgressRange = {
  common: [2, 4],
  rare: [4, 7],
  epic: [7, 13],
  legendary: [12, 22]
};

const rarityToOldCard = {
  common: "1.jpg",
  rare: "3.jpg",
  epic: "5.jpg",
  legendary: "7.jpg"
};

let currentCollectResult = null;
let isPackOpened = false;
let flippedCollectCards = 0;
let lastCollectRewards = [];
let collectRewardSaved = false;

function getCollectThemeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("theme") || "sasich";
}

function getCollectThemeFolder() {
    const theme = normalizeCollectionKey(getCollectThemeFromUrl());

    const folders = {
        helin: "helin",
        sasavot: "sasavot",
        lexapaws: "lexapaws",
        rejiboy: "rejiboi",
        rostik: "rostick",
        nikkifn: "nikkifn",
        melstroy: "melstroy",
        litvin: "litwin"
    };

    return folders[theme] || theme;
}
function getCollectDataTheme() {
  return normalizeCollectionKey(getCollectThemeFromUrl());
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollRarityByDice(diceResult) {
  const chances = packRarityChances[diceResult] || packRarityChances[1];
  const roll = Math.random() * 100;

  let current = 0;

  for (const item of chances) {
    current += item.chance;
    if (roll <= current) return item.rarity;
  }

  return "common";
}

function getProgressByDiceAndRarity(diceResult, rarity) {
  const range = rarityProgressRange[rarity] || rarityProgressRange.common;
  const base = getRandomInt(range[0], range[1]);
  const multiplier = diceProgressMultiplier[diceResult] || 1;

  return Math.round(base * multiplier);
}

function getCollectEnergy() {
  if (window.playerData?.resources) {
    if (playerData.resources.energy === undefined) playerData.resources.energy = 100;
    if (playerData.resources.maxEnergy === undefined) playerData.resources.maxEnergy = 100;
    return playerData.resources.energy;
  }

  return Number(localStorage.getItem("collect_energy") || 100);
}

function setCollectEnergy(value) {
  const max = getCollectMaxEnergy();
  const finalValue = Math.max(0, Math.min(max, value));

  if (window.playerData?.resources) {
    playerData.resources.energy = finalValue;
    if (typeof savePlayer === "function") savePlayer();
  } else {
    localStorage.setItem("collect_energy", String(finalValue));
  }

  updateCollectEnergyUI();
}

function getCollectMaxEnergy() {
  if (window.playerData?.resources?.maxEnergy !== undefined) {
    return playerData.resources.maxEnergy;
  }

  return 100;
}

function updateCollectEnergyUI() {
  const current = document.getElementById("collectEnergyValue");
  const max = document.getElementById("collectEnergyMax");

  if (current) current.textContent = getCollectEnergy();
  if (max) max.textContent = getCollectMaxEnergy();
}

function regenCollectEnergy() {
  const max = getCollectMaxEnergy();
  let energy = getCollectEnergy();

  if (energy >= max) {
    localStorage.setItem("collect_last_regen", String(Date.now()));
    updateCollectEnergyUI();
    return;
  }

  const last = Number(localStorage.getItem("collect_last_regen") || Date.now());
  const now = Date.now();
  const minutes = Math.floor((now - last) / 60000);
  const gained = Math.floor(minutes / 5);

  if (gained > 0) {
    setCollectEnergy(energy + gained);
    localStorage.setItem("collect_last_regen", String(now));
  } else {
    updateCollectEnergyUI();
  }
}

function generateCollectRewards() {
  const folder = getCollectThemeFolder();
  const dataTheme = getCollectDataTheme();

  lastCollectRewards = [];

  for (let i = 0; i < 3; i++) {
    const rarity = rollRarityByDice(currentCollectResult);
    const progress = getProgressByDiceAndRarity(currentCollectResult, rarity);

    lastCollectRewards.push({
      theme: dataTheme,
      folder,
      rarity,
      progress,
      img: `image/ui/collect/${folder}/${rarity}.png`
    });
  }

  collectRewardSaved = false;
  return lastCollectRewards;
}

function rollCollectDice() {
  regenCollectEnergy();

  const energy = getCollectEnergy();

  if (energy < COLLECT_ENERGY_COST) {
    showEnergyWarning();
    return;
  }

  const dice = document.getElementById("collectDice");
  const pack = document.getElementById("collectPack");
  const cardsBox = document.getElementById("rewardCards");
  const rollBtn = document.querySelector(".collect-roll-button");
  const resultModal = document.getElementById("collectResultModal");

  if (!dice || !pack) return;

  setCollectEnergy(energy - COLLECT_ENERGY_COST);
  addProfileStat("profileRolls", 1);
  addProfileStat("profileEnergySpent", COLLECT_ENERGY_COST);

  if (resultModal) resultModal.classList.remove("show");
  if (cardsBox) {
    cardsBox.innerHTML = "";
    cardsBox.classList.remove("show");
  }

  pack.className = "collect-pack";
  pack.src = "";
  pack.style.display = "none";

  dice.style.display = "block";
  if (rollBtn) rollBtn.style.display = "none";

  flippedCollectCards = 0;
  isPackOpened = false;
  currentCollectResult = null;
  lastCollectRewards = [];
  collectRewardSaved = false;

  dice.classList.remove("rolling", "result");
  void dice.offsetWidth;
  dice.classList.add("rolling");

  const spinInterval = setInterval(() => {
    const randomSide = Math.floor(Math.random() * 6) + 1;
    dice.src = `image/ui/collect/dice-${randomSide}.png`;
  }, 90);

  setTimeout(() => {
    clearInterval(spinInterval);

    const result = Math.floor(Math.random() * 6) + 1;
    currentCollectResult = result;

    dice.classList.remove("rolling");
    dice.src = `image/ui/collect/dice-${result}.png`;
    dice.classList.add("result");

    setTimeout(() => {
      dice.classList.remove("result");
      dice.style.display = "none";

      pack.src = collectPacks[result];
      pack.style.display = "block";

      setTimeout(() => {
        pack.classList.add("show");
      }, 100);

    }, 1500);

  }, 1400);
}

function openCollectPack() {
  const pack = document.getElementById("collectPack");
  const cardsBox = document.getElementById("rewardCards");

  if (!pack || !cardsBox || !currentCollectResult || isPackOpened) return;

  isPackOpened = true;
  addProfileStat("profilePacksOpened", 1);
  flippedCollectCards = 0;

  pack.classList.add("opening");

  setTimeout(() => {
    pack.src = collectPacksOpen[currentCollectResult];

    const rewards = generateCollectRewards();

    cardsBox.innerHTML = rewards.map((reward, index) => `
      <div class="collect-reward-card pos-${index}" onclick="flipCollectCard(this)">
        <div class="card-inner">
          <img class="card-face card-back-face" src="image/ui/collect/card-back.png">
          <img class="card-face card-front-face" src="${reward.img}">
        </div>
      </div>
    `).join("");

    cardsBox.classList.add("show");
  }, 450);
}

function flipCollectCard(card) {
  if (!card || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCollectCards++;

  if (flippedCollectCards >= 3) {
    setTimeout(() => {
      showCollectResult();
    }, 900);
  }
}

function saveCollectRewards() {
    if (collectRewardSaved) return;
    if (!lastCollectRewards || lastCollectRewards.length === 0) return;

    addProfileStat("profileCards", lastCollectRewards.length);

    lastCollectRewards.forEach(reward => {
        const themeKey = normalizeCollectionKey(reward.theme);

        const rarityKey = `collection_${themeKey}_${reward.rarity}`;
        const currentRarityPoints = Number(localStorage.getItem(rarityKey)) || 0;

        localStorage.setItem(
            rarityKey,
            currentRarityPoints + reward.progress
        );

        const scoreKey = `collection_score_${themeKey}`;
        const currentScore = Number(localStorage.getItem(scoreKey)) || 0;

        localStorage.setItem(
            scoreKey,
            currentScore + reward.progress
        );
    });

    if (typeof savePlayer === "function") savePlayer();
    if (typeof updateUI === "function") updateUI();

    collectRewardSaved = true;
}

function showCollectResult() {
  const modal = document.getElementById("collectResultModal");
  const cardsBox = document.getElementById("collectResultCards");

  if (!modal || !cardsBox) return;

  let total = 0;

  const sums = {
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0
  };

  cardsBox.innerHTML = "";

  lastCollectRewards.forEach(item => {
    total += item.progress;
    sums[item.rarity] += item.progress;

    const img = document.createElement("img");
    img.src = item.img;
    cardsBox.appendChild(img);
  });

  document.getElementById("collectResultTotal").textContent = total;
  document.getElementById("resultCommon").textContent = "+" + sums.common;
  document.getElementById("resultRare").textContent = "+" + sums.rare;
  document.getElementById("resultEpic").textContent = "+" + sums.epic;
  document.getElementById("resultLegendary").textContent = "+" + sums.legendary;

  saveCollectRewards();

  modal.classList.add("show");
}

function resetCollectScene() {
  const pack = document.getElementById("collectPack");
  const cardsBox = document.getElementById("rewardCards");
  const dice = document.getElementById("collectDice");
  const rollBtn = document.querySelector(".collect-roll-button");

  if (cardsBox) {
    cardsBox.innerHTML = "";
    cardsBox.classList.remove("show");
  }

  if (pack) {
    pack.className = "collect-pack";
    pack.src = "";
    pack.style.display = "none";
  }

  if (dice) {
    dice.style.display = "block";
    dice.classList.remove("rolling", "result");
    dice.src = "image/ui/collect/dice-1.png";
  }

  if (rollBtn) rollBtn.style.display = "block";

  flippedCollectCards = 0;
  isPackOpened = false;
  currentCollectResult = null;
  lastCollectRewards = [];
  collectRewardSaved = false;
}

function closeCollectResult() {

  const modal = document.getElementById("collectResultModal");
  if (modal) modal.classList.remove("show");

  resetCollectScene();
}

function openAgainCollect() {

  const modal = document.getElementById("collectResultModal");
  if (modal) modal.classList.remove("show");

  resetCollectScene();

  setTimeout(() => {
    rollCollectDice();
  }, 300);
}

function openChancesModal() {
  const modal = document.getElementById("collectChancesModal");
  if (modal) modal.classList.add("show");
}

function closeChancesModal() {
  const modal = document.getElementById("collectChancesModal");
  if (modal) modal.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  regenCollectEnergy();
  updateCollectEnergyUI();

  setInterval(() => {
    regenCollectEnergy();
  }, 30000);
});
function showEnergyWarning(){

    const warning = document.getElementById("energyWarning");

    warning.classList.add("show");

    setTimeout(() => {
        warning.classList.remove("show");
    }, 2500);

}
function loadProfileNickname() {
    const nicknameEl = document.getElementById("profileNickname");
    const letterEl = document.getElementById("profileLetter");

    const savedName = localStorage.getItem("playerNickname") || "PLAYER";

    if (nicknameEl) {
        nicknameEl.textContent = savedName;
    }

    if (letterEl) {
        letterEl.textContent = savedName.charAt(0).toUpperCase();
    }
}
function openChangeNameModal() {
    const modal = document.getElementById("changeNameModal");
    const input = document.getElementById("nicknameInput");
    const counter = document.getElementById("nicknameCounter");

    if (!modal || !input || !counter) return;

    const currentName = localStorage.getItem("playerNickname") || "";

    input.value = currentName;
    counter.textContent = `${currentName.length}/14`;

    modal.classList.add("active");
    input.focus();
}

function closeChangeNameModal() {
    const modal = document.getElementById("changeNameModal");
    if (modal) modal.classList.remove("active");
}

function saveProfileNickname() {
    const input = document.getElementById("nicknameInput");
    if (!input) return;

    let newName = input.value.trim();

    if (newName.length < 3) {
        alert("Минимум 3 символа");
        return;
    }

    localStorage.setItem("playerNickname", newName);

    loadProfileNickname();
    closeChangeNameModal();
}

const nicknameInput = document.getElementById("nicknameInput");

if (nicknameInput) {
    nicknameInput.addEventListener("input", function () {
        const counter = document.getElementById("nicknameCounter");
        if (counter) counter.textContent = `${this.value.length}/14`;
    });
}

function changeProfileNickname() {
    const currentName = localStorage.getItem("playerNickname") || "PLAYER";

    let newName = prompt("Введите новый ник:", currentName);

    if (!newName) return;

    newName = newName.trim();

    if (newName.length < 3) {
        alert("Ник должен быть минимум 3 символа");
        return;
    }

    if (newName.length > 14) {
        alert("Ник должен быть максимум 14 символов");
        return;
    }

    localStorage.setItem("playerNickname", newName);

    loadProfileNickname();
}
function loadProfileStats() {
    const rollsEl = document.getElementById("profileRolls");
    const cardsEl = document.getElementById("profileCards");
    const energyEl = document.getElementById("profileEnergy");
    const packsEl = document.getElementById("profilePacks");

    if (!rollsEl || !cardsEl || !energyEl || !packsEl) return;

    const rolls = localStorage.getItem("profileRolls") || 0;
    const cards = localStorage.getItem("profileCards") || 0;
    const energy = localStorage.getItem("profileEnergySpent") || 0;
    const packs = localStorage.getItem("profilePacksOpened") || 0;

    rollsEl.textContent = rolls;
    cardsEl.textContent = cards;
    energyEl.textContent = energy;
    packsEl.textContent = packs;
}
function loadProfileCharacter() {
    const img = document.getElementById("profileCharacterImg");
    if (!img) return;

    const character = localStorage.getItem("profileCharacter") || "lexapaws";

    img.src = `image/characters/${character}/preview.png`;
}

function openCharacterModal() {
    const character = prompt(
        "Выбери персонажа: helin, lexapaws, litwin, melstroy, nikkifn, rejiboi, rostickfaceskid, sasavot"
    );

    if (!character) return;

    const validCharacters = [
        "helin",
        "lexapaws",
        "litwin",
        "melstroy",
        "nikkifn",
        "rejiboi",
        "rostickfaceskid",
        "sasavot"
    ];

    const selected = character.trim().toLowerCase();

    if (!validCharacters.includes(selected)) {
        alert("Такого персонажа нет");
        return;
    }

    localStorage.setItem("profileCharacter", selected);
    loadProfileCharacter();
}

document.addEventListener("DOMContentLoaded", loadProfileCharacter);
document.addEventListener("DOMContentLoaded", loadProfileStats);
document.addEventListener("DOMContentLoaded", loadProfileNickname);
function addProfileStat(key, amount = 1) {
    const current = Number(localStorage.getItem(key) || 0);
    localStorage.setItem(key, current + amount);
}

function loadProfileStats() {
    const stats = {
        profileRolls: "profileRolls",
        profileCards: "profileCards",
        profileEnergy: "profileEnergySpent",
        profilePacks: "profilePacksOpened"
    };

    for (const id in stats) {
        const el = document.getElementById(id);
        if (el) el.textContent = localStorage.getItem(stats[id]) || 0;
    }
}

document.addEventListener("DOMContentLoaded", loadProfileStats);
function getProfileLevelData() {
    const xp = Number(localStorage.getItem("profileXP") || 0);
    const xpPerLevel = 500;

    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentXp = xp % xpPerLevel;
    const percent = (currentXp / xpPerLevel) * 100;

    return {
        xp,
        level,
        currentXp,
        xpPerLevel,
        percent
    };
}

function loadProfileLevel() {
    const levelEl = document.getElementById("profileLevel");
    const fillEl = document.getElementById("profileXpFill");
    const textEl = document.getElementById("profileXpText");

    if (!levelEl || !fillEl || !textEl) return;

    const data = getProfileLevelData();

    levelEl.textContent = data.level;
    fillEl.style.width = data.percent + "%";
    textEl.textContent = `${data.currentXp} / ${data.xpPerLevel} XP`;
}

function addProfileXP(amount) {
    const current = Number(localStorage.getItem("profileXP") || 0);
    localStorage.setItem("profileXP", current + amount);
    loadProfileLevel();
}

document.addEventListener("DOMContentLoaded", loadProfileLevel);
const profileCharacters = [
    "helin",
    "lexapaws",
    "litwin",
    "melstroy",
    "nikkifn",
    "rejiboi",
    "rostickfaceskid",
    "sasavot"
];

let currentCharacterIndex = 0;

function openCharacterModal() {
    const modal = document.getElementById("characterModal");

    const savedCharacter = localStorage.getItem("profileCharacter") || "lexapaws";
    const savedIndex = profileCharacters.indexOf(savedCharacter);

    currentCharacterIndex = savedIndex >= 0 ? savedIndex : 0;

    updateCharacterModalPreview();

    if (modal) {
        modal.classList.add("active");
    }
}

function closeCharacterModal() {
    const modal = document.getElementById("characterModal");

    if (modal) {
        modal.classList.remove("active");
    }
}

function updateCharacterModalPreview() {
    const preview = document.getElementById("characterModalPreview");

    if (!preview) return;

    const character = profileCharacters[currentCharacterIndex];

    preview.src = `image/characters/${character}/preview.png`;
}

function prevCharacter() {
    currentCharacterIndex--;

    if (currentCharacterIndex < 0) {
        currentCharacterIndex = profileCharacters.length - 1;
    }

    updateCharacterModalPreview();
}

function nextCharacter() {
    currentCharacterIndex++;

    if (currentCharacterIndex >= profileCharacters.length) {
        currentCharacterIndex = 0;
    }

    updateCharacterModalPreview();
}

function selectCurrentCharacter() {
    const character = profileCharacters[currentCharacterIndex];

    localStorage.setItem("profileCharacter", character);

    loadProfileCharacter();
    closeCharacterModal();
}
/* ========================================
   COLLECTION PAGE
======================================== */

const collectionCharacters = [
    {
        name: "HELIN",
        image: "image/ui/gl/card-helin.png",
        key: "helin"
    },
    {
        name: "SASAVOT",
        image: "image/ui/gl/card-sasavot.png",
        key: "sasavot"
    },
    {
        name: "LEXA PAWS",
        image: "image/ui/gl/card-lexapaws.png",
        key: "lexapaws"
    },
    {
        name: "REJIBOY",
        image: "image/ui/gl/card-rejiboi.png",
        key: "rejiboy"
    },
    {
        name: "ROSTIK",
        image: "image/ui/gl/card-rostick.png",
        key: "rostik"
    },
    {
        name: "NIKKIFN",
        image: "image/ui/gl/card-nikkifn.png",
        key: "nikkifn"
    },
    {
        name: "MELSTROY",
        image: "image/ui/gl/card-melstroy.png",
        key: "melstroy"
    },
    {
        name: "LITVIN",
        image: "image/ui/gl/card-litwin.png",
        key: "litvin"
    }
];
function getRarityPoints(characterKey, rarity) {
    characterKey = normalizeCollectionKey(characterKey);
    return Number(localStorage.getItem(`collection_${characterKey}_${rarity}`)) || 0;
}

function getRarityPercent(characterKey, rarity) {
    const points = getRarityPoints(characterKey, rarity);
    const limit = COLLECTION_LIMITS[rarity] || 10000;

    return Math.min(100, Math.floor((points / limit) * 100));
}

function getCollectionProgress(characterKey) {
    characterKey = normalizeCollectionKey(characterKey);

    const rarities = ["common", "rare", "epic", "legendary"];

    const totalPercent = rarities.reduce((sum, rarity) => {
        return sum + getRarityPercent(characterKey, rarity);
    }, 0);

    return Math.floor(totalPercent / rarities.length);
}

function getCollectionScore(characterKey) {
    characterKey = normalizeCollectionKey(characterKey);
    return Number(localStorage.getItem(`collection_score_${characterKey}`)) || 0;
}
function renderCollectionCards(sortType = "all") {
    const grid = document.getElementById("collectionCardsGrid");

    if (!grid) return;

    let characters = [...collectionCharacters];

    if (sortType === "progress") {
        characters.sort((a, b) => {
    return getCollectionProgress(b.key) - getCollectionProgress(a.key);
});
    }

    grid.innerHTML = "";

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "collection-card";
        card.onclick = () => openCollectionModal(character);
const progress = getCollectionProgress(character.key);
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">

            <div class="collection-card-body">
                <div class="collection-card-name">${character.name}</div>

                <div class="collection-progress-top">
                    <span>Прогресс</span>
                    <span>${progress}%</span>
                </div>

                <div class="collection-progress-bar">
                    <div class="collection-progress-fill" style="width:${progress}%"></div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    const buttons = document.querySelectorAll(".collection-filter-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    if (sortType === "all") {
        buttons[0]?.classList.add("active");
    }

    if (sortType === "progress") {
        buttons[1]?.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCollectionCards("all");
});
function openCollectionModal(character) {
    const modal = document.getElementById("collectionModal");
    const image = document.getElementById("collectionModalImage");
    const title = document.getElementById("collectionModalTitle");
    const progressText = document.getElementById("collectionModalProgress");
    const progressFill = document.getElementById("collectionModalProgressFill");

    if (!modal) return;

    currentCollectionCharacter = character;

    const progress = getCollectionProgress(character.key);

    image.src = character.image;
    title.textContent = `КОЛЛЕКЦИЯ КАРТОЧЕК ${character.name}`;
    progressText.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    updateCollectionRarityProgress(character.key);
    
    renderCollectionRewardRoad(character.key);

    showCollectionTab("cards");

    modal.classList.add("active");
}
function updateCollectionRarityProgress(characterKey) {
    characterKey = normalizeCollectionKey(characterKey);

    const rarities = ["common", "rare", "epic", "legendary"];

    rarities.forEach(rarity => {
        const card = document.querySelector(`.rarity-card.${rarity}`);
        if (!card) return;

        const points = getRarityPoints(characterKey, rarity);
        const limit = COLLECTION_LIMITS[rarity];

        card.innerHTML = `
            <img class="collection-rarity-img"
                 src="${getCollectionCardImage(characterKey, rarity)}"
                 alt="${rarity}">

            <div class="collection-rarity-info">
                <h3>${rarity.toUpperCase()}</h3>
                <span>${points} / ${limit}</span>
            </div>
        `;
    });
}

function closeCollectionModal() {
    const modal = document.getElementById("collectionModal");

    if (!modal) return;

    modal.classList.remove("active");
}
function showCollectionTab(tabName) {
    const cardsTab = document.getElementById("collectionCardsTab");
    const rewardsTab = document.getElementById("collectionRewardsTab");

    const cardsBtn = document.getElementById("collectionCardsBtn");
    const rewardsBtn = document.getElementById("collectionRewardsBtn");

    if (!cardsTab || !rewardsTab) return;

    if (tabName === "cards") {
        cardsTab.classList.remove("hidden");
        rewardsTab.classList.remove("active");

        cardsBtn.classList.add("active");
        rewardsBtn.classList.remove("active");
    }

    if (tabName === "rewards") {
        cardsTab.classList.add("hidden");
        rewardsTab.classList.add("active");

        cardsBtn.classList.remove("active");
        rewardsBtn.classList.add("active");
    }
}
function renderCollectionRewardRoad(characterKey) {
    characterKey = normalizeCollectionKey(characterKey);

    const road = document.getElementById("collectionRewardRoad");
    const scoreValue = document.getElementById("collectionScoreValue");

    if (!road) return;

    const score = getCollectionScore(characterKey);

    if (scoreValue) {
        scoreValue.textContent = score;
    }

    road.innerHTML = COLLECTION_REWARD_MILESTONES.map(reward => {
        const rewardKey = `reward_${characterKey}_${reward.need}_${reward.type}`;
        const claimed = localStorage.getItem(rewardKey) === "claimed";
        const available = score >= reward.need;

        return `
            <div class="road-reward ${available ? "active" : ""} ${claimed ? "claimed" : ""}"
                 onclick="claimRoadReward('${characterKey}', ${reward.need}, '${reward.type}', ${reward.amount})">

                <div class="road-reward-need">${reward.need}</div>

                <img src="${reward.image}" alt="">

                <div class="road-reward-amount">x${reward.amount}</div>

                <div class="road-reward-status">
                    ${claimed ? "✓" : available ? "ЗАБРАТЬ" : "🔒"}
                </div>
            </div>
        `;
    }).join("");
}

function claimRoadReward(characterKey, need, rewardType, rewardAmount) {
    characterKey = normalizeCollectionKey(characterKey);

    const score = getCollectionScore(characterKey);
    const rewardKey = `reward_${characterKey}_${need}_${rewardType}`;

    if (score < need) return;
    if (localStorage.getItem(rewardKey) === "claimed") return;

    if (rewardType === "gold") {
        addPlayerResource("gold", rewardAmount);
    }

    if (rewardType === "gems") {
        addPlayerResource("gems", rewardAmount);
    }

    if (rewardType === "energy") {
        addPlayerEnergy(rewardAmount);
    }

    if (rewardType.includes("chest")) {
        addPlayerResource(rewardType, rewardAmount);
    }

    localStorage.setItem(rewardKey, "claimed");

    renderCollectionRewardRoad(characterKey);
}
function addPlayerResource(resourceKey, amount){
    const currentValue = Number(localStorage.getItem(resourceKey)) || 0;
    const newValue = currentValue + amount;

    localStorage.setItem(resourceKey, newValue);

    updateCollectionHeaderResources();
}

function addPlayerEnergy(amount){
    const currentEnergy = Number(localStorage.getItem("player_energy")) || 100;
    const newEnergy = currentEnergy + amount;

    localStorage.setItem("player_energy", newEnergy);

    updateCollectionHeaderResources();
}

function updateCollectionHeaderResources(){
    const gold = Number(localStorage.getItem("gold")) || 0;
    const gems = Number(localStorage.getItem("gems")) || 0;
    const energy = Number(localStorage.getItem("player_energy")) || 100;

    const goldEl = document.querySelector(".collection-resource:nth-child(2) span");
    const gemsEl = document.querySelector(".collection-resource:nth-child(3) span");
    const energyEl = document.querySelector(".collection-resource:nth-child(1) span");

    if(goldEl) goldEl.textContent = gold;
    if(gemsEl) gemsEl.textContent = gems;
    if(energyEl) energyEl.textContent = energy + "/100";
}

const COLLECTION_LIMITS = {
    common: 12000,
    rare: 7000,
    epic: 3500,
    legendary: 1200
};

const THEME_KEY_MAP = {
    sasich: "sasavot",
    sasavot: "sasavot",

    rejiboi: "rejiboy",
    rejiboy: "rejiboy",

    rostick: "rostik",
    rostik: "rostik",

    litwin: "litvin",
    litvin: "litvin",

    helin: "helin",
    lexapaws: "lexapaws",
    melstroy: "melstroy",
    nikkifn: "nikkifn"
};

function normalizeCollectionKey(theme) {
    return THEME_KEY_MAP[theme] || theme;
}

const COLLECTION_REWARD_MILESTONES = [
    { need: 50, type: "gold", amount: 100, image: "image/ui/gold.png" },
    { need: 100, type: "energy", amount: 10, image: "image/ui/energy-50.png" },
    { need: 200, type: "gold", amount: 200, image: "image/ui/gold.png" },
    { need: 350, type: "gems", amount: 10, image: "image/ui/gems-100.png" },
    { need: 500, type: "chest_common", amount: 1, image: "image/ui/chest-common.png" },

    { need: 750, type: "energy", amount: 25, image: "image/ui/energy-50.png" },
    { need: 1000, type: "gems", amount: 200, image: "image/ui/gems-550.png" },
    { need: 1300, type: "gold", amount: 500, image: "image/ui/gold.png" },
    { need: 1700, type: "chest_rare", amount: 1, image: "image/ui/chest-rare.png" },
    { need: 2200, type: "energy", amount: 50, image: "image/ui/energy-120.png" },

    { need: 3000, type: "gold", amount: 1000, image: "image/ui/gold.png" },
    { need: 4000, type: "gems", amount: 100, image: "image/ui/gems-550.png" },
    { need: 5500, type: "chest_epic", amount: 1, image: "image/ui/chest-epic.png" },
    { need: 7000, type: "energy", amount: 100, image: "image/ui/energy-120.png" },
    { need: 9000, type: "chest_legendary", amount: 1, image: "image/ui/chest-legendary.png" },

    { need: 12000, type: "gems", amount: 250, image: "image/ui/gems-1200.png" },
    { need: 15000, type: "gold", amount: 2500, image: "image/ui/gold.png" },
    { need: 20000, type: "chest_epic", amount: 2, image: "image/ui/chest-epic.png" },
    { need: 30000, type: "gems", amount: 500, image: "image/ui/gems-2500.png" },
    { need: 50000, type: "chest_legendary", amount: 3, image: "image/ui/chest-legendary.png" }
];
function openComingSoon() {
    const modal = document.getElementById("comingSoonModal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeComingSoon() {
    const modal = document.getElementById("comingSoonModal");
    if (modal) {
        modal.classList.remove("active");
    }
}
function openDonateModal() {
    const modal = document.getElementById("donateModal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeDonateModal() {
    const modal = document.getElementById("donateModal");
    if (modal) {
        modal.classList.remove("active");
    }
}
function openDonateModal() {
    const modal = document.getElementById("donateModal");
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeDonateModal() {
    const modal = document.getElementById("donateModal");
    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
}
const COLLECTION_CARD_FOLDERS = {
    helin: "helin",
    sasavot: "sasavot",
    lexapaws: "lexapaws",
    rejiboy: "rejiboi",
    rostik: "rostick",
    nikkifn: "nikkifn",
    melstroy: "melstroy",
    litvin: "litwin"
};

function getCollectionCardImage(characterKey, rarity) {
    characterKey = normalizeCollectionKey(characterKey);

    const folder = COLLECTION_CARD_FOLDERS[characterKey] || characterKey;

    return `image/ui/collect/${folder}/${rarity}.png`;
}
const DEFAULT_SAVE = {
    nickname: "PLAYER",
    gold: 12500,
    gems: 2150,
    energy: 100,
    maxEnergy: 100,
    level: 1
};

function getSave() {
    return JSON.parse(localStorage.getItem("mccSave")) || DEFAULT_SAVE;
}

function saveGame(data) {
    localStorage.setItem("mccSave", JSON.stringify(data));
}
function updateHeader() {
    const save = getSave();

    document.querySelectorAll(".js-player-name").forEach(el => {
        el.textContent = save.nickname;
    });

    document.querySelectorAll(".js-player-letter").forEach(el => {
        el.textContent = save.nickname.slice(0, 1).toUpperCase();
    });

    document.querySelectorAll(".js-gold").forEach(el => {
        el.textContent = save.gold;
    });

    document.querySelectorAll(".js-gems").forEach(el => {
        el.textContent = save.gems;
    });

    document.querySelectorAll(".js-energy").forEach(el => {
        el.textContent = `${save.energy}/${save.maxEnergy}`;
    });

    document.querySelectorAll(".js-level").forEach(el => {
        el.textContent = save.level;
    });
}

document.addEventListener("DOMContentLoaded", updateHeader);
//  ЗАПУСК
window.onload = () => {
    currentVIPLevel = vipLevel;

    if (typeof loadPlayer === "function") loadPlayer();
    if (typeof createGrid === "function") createGrid();
    if (typeof updateUI === "function") updateUI();

    if (typeof updateLeaderboardUI === "function") updateLeaderboardUI();
    if (typeof updateDailyRewardUI === "function") updateDailyRewardUI();
    if (typeof updateBlackMarketUI === "function") updateBlackMarketUI();
    if (typeof updateWheelUI === "function") updateWheelUI();
    if (typeof renderWheelTrack === "function") renderWheelTrack();
    if (typeof updateVIPZoneUI === "function") updateVIPZoneUI();
    if (typeof updatePlayerLevelUI === "function") updatePlayerLevelUI();

    if (typeof loadPassState === "function") loadPassState();
    if (typeof renderBattlePass === "function") renderBattlePass();
    if (typeof loadAchievements === "function") loadAchievements();
    if (typeof loadQuestState === "function") loadQuestState();
    if (typeof renderQuestsScreen === "function") renderQuestsScreen();
    if (typeof updateEquippedAchievementBadge === "function") {
    updateEquippedAchievementBadge();
    }


    if (typeof simulateMarket === "function") {
        marketInterval = setInterval(simulateMarket, 3000);
    }
};

function setBet(bet) {
    currentBet = bet;
    updateUI();
}