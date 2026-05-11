const inventoryData = {
    chests: {
        title: "СУНДУКИ",
        subtitle: "Открывай сундуки и получай награды",
        items: [
            {
                title: "Обычный сундук",
                rarity: "COMMON",
                count: 12,
                img: "image/ui/chest-common.png",
                obtain: "Можно получить за квесты, ежедневные награды и игру."
            },
            {
                title: "Редкий сундук",
                rarity: "RARE",
                count: 8,
                img: "image/ui/chest-rare.png",
                obtain: "Можно получить за квесты, пропуск и магазин."
            },
            {
                title: "Эпический сундук",
                rarity: "EPIC",
                count: 6,
                img: "image/ui/chest-epic.png",
                obtain: "Можно получить в боевом пропуске и наборах."
            },
            {
                title: "Легендарный сундук",
                rarity: "LEGENDARY",
                count: 3,
                img: "image/ui/chest-legendary.png",
                obtain: "Редкая награда за прогресс, пропуск и специальные наборы."
            }
        ]
    },

    cloth: {
        title: "ТКАНИ",
        subtitle: "Ткани нужны для открытия стилей персонажей",
        items: []
    },

    resources: {
        title: "РЕСУРСЫ",
        subtitle: "Основные валюты и материалы аккаунта",
        items: [
            {
                title: "Золото",
                rarity: "COMMON",
                count: 12500,
                img: "image/ui/gold.png",
                obtain: "Получается за игру, квесты и сундуки."
            },
            {
                title: "Гемы",
                rarity: "EPIC",
                count: 5000,
                img: "image/ui/gems.png",
                obtain: "Премиальная валюта. Используется для покупок в магазине."
            },
            {
                title: "Энергия",
                rarity: "RARE",
                count: 100,
                img: "image/ui/energy.png",
                obtain: "Восстанавливается со временем и покупается за гемы."
            },
            {
                title: "Осколки силы",
                rarity: "EPIC",
                count: 240,
                img: "image/ui/power-shards.png",
                obtain: "Нужны для будущей прокачки персонажей."
            }
        ]
    },

    passes: {
        title: "ПРОПУСКА",
        subtitle: "Активные и будущие пропуска сезона",
        items: [
            {
                title: "Пропуск стилей",
                rarity: "LEGENDARY",
                count: 1,
                img: "image/ui/pass-style.png",
                obtain: "Открывает премиальную линию наград со стилями."
            },
            {
                title: "Пропуск питомцев",
                rarity: "EPIC",
                count: 0,
                img: "image/ui/pass-pet.png",
                obtain: "Будущий пропуск для питомцев и предметов."
            },
            {
                title: "Уровень пропуска +5",
                rarity: "RARE",
                count: 2,
                img: "image/ui/pass-level-5.png",
                obtain: "Можно купить в магазине или получить в наборе."
            },
            {
                title: "Уровень пропуска +10",
                rarity: "EPIC",
                count: 1,
                img: "image/ui/pass-level-10.png",
                obtain: "Редкий предмет для быстрого повышения уровня пропуска."
            }
        ]
    }
};

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

const rarityNames = {
    common: "COMMON",
    rare: "RARE",
    epic: "EPIC",
    legendary: "LEGENDARY"
};

const themeNames = {
    helin: "Helin",
    lexapaws: "Lexapaws",
    litwin: "Litwin",
    melstroy: "Melstroy",
    nikkifn: "Nikkifn",
    rejiboi: "Rejiboi",
    rostickfaceskid: "Rostick",
    sasavot: "Sasavot"
};

clothThemes.forEach(theme => {
    clothRarities.forEach(rarity => {
        inventoryData.cloth.items.push({
            title: `${themeNames[theme]} ткань`,
            rarity: rarityNames[rarity],
            count: Math.floor(Math.random() * 18),
            img: `image/ui/cloth/${theme}-${rarity}.png`,
            obtain: "Выпадает из сундуков, пропуска и наград за коллекцию."
        });
    });
});

const sideButtons = document.querySelectorAll(".inventory-side-btn");
const titleEl = document.querySelector(".inventory-main h1");
const subtitleEl = document.querySelector(".inventory-subtitle");
const gridEl = document.querySelector(".inventory-grid");
const detailsEl = document.querySelector(".inventory-details");

let currentTab = "chests";

sideButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        sideButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        if (index === 0) currentTab = "chests";
        if (index === 1) currentTab = "cloth";
        if (index === 2) currentTab = "resources";
        if (index === 3) currentTab = "passes";

        renderInventoryTab(currentTab);
    });
});

function renderInventoryTab(tabName) {
    const tab = inventoryData[tabName];

    titleEl.innerText = tab.title;
    subtitleEl.innerText = tab.subtitle;
    gridEl.innerHTML = "";

    tab.items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = `inventory-card ${item.rarity.toLowerCase()}`;

        if (index === 0) {
            card.classList.add("selected");
        }

        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <span>${item.rarity}</span>
            <p>${item.count}</p>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".inventory-card").forEach(c => {
                c.classList.remove("selected");
            });

            card.classList.add("selected");
            renderDetails(item);
        });

        gridEl.appendChild(card);
    });

    if (tab.items.length > 0) {
        renderDetails(tab.items[0]);
    }
}

function renderDetails(item) {
    let buttonText = "ИСПОЛЬЗОВАТЬ";
    let buttonDisabled = false;

if (currentTab === "chests") {
    buttonText = "ОТКРЫТЬ";
}
if (currentTab === "chests" && item.count <= 0) {
    buttonText = "НЕТ СУНДУКОВ";
    buttonDisabled = true;
}

if (currentTab === "resources") {
    buttonText = "ПОДРОБНЕЕ";
}

if (currentTab === "passes") {
    buttonText = "АКТИВИРОВАТЬ";
}
    detailsEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}">

        <div class="details-rarity ${item.rarity.toLowerCase()}">
            ${item.rarity}
        </div>

        <h2>${item.title.toUpperCase()}</h2>

        <div class="details-count">
            В наличии: ${item.count}
        </div>

        <div class="details-obtain">
            <span>Как получить:</span>
            <p>${item.obtain}</p>
        </div>

        <button class="use-btn" ${buttonDisabled ? "disabled" : ""}>
            ${buttonText}
        </button>
    `;

    const useBtn = detailsEl.querySelector(".use-btn");

useBtn.addEventListener("click", () => {
if (currentTab === "chests") {
    openChestModal(item);
    return;
}

    if (currentTab === "resources") {
        alert(`${item.title}: ${item.obtain}`);
        return;
    }

    if (currentTab === "passes") {
        alert(`Активируем: ${item.title}`);
        return;
    }

    alert(`Используем: ${item.title}`);
});
}
let selectedChest = null;
let chestIsOpened = false;
let pendingRewards = [];
function openChestModal(item) {
    if (item.count <= 0) {
    return;
}
    selectedChest = item;
    chestIsOpened = false;
    const modal = document.getElementById("chest-modal");
    const modalImg = document.getElementById("chest-modal-img");
    const modalStatus = document.getElementById("chest-modal-status");
    const openBtn = document.getElementById("chest-open-btn");

    modalImg.src = item.img;
    modalStatus.innerText = `Готов открыть: ${item.title}`;
    openBtn.innerText = "ОТКРЫТЬ";
    document.getElementById("chest-rewards").innerHTML = "";
    modal.classList.add("active");
}

function closeChestModal() {
    const modal = document.getElementById("chest-modal");
    modal.classList.remove("active");
}

const chestCloseBtn = document.getElementById("chest-modal-close");
const chestOpenBtn = document.getElementById("chest-open-btn");

chestCloseBtn.addEventListener("click", closeChestModal);

chestOpenBtn.addEventListener("click", () => {
    if (!selectedChest) return;

    if (chestIsOpened) {
        selectedChest.count = Math.max(0, selectedChest.count - 1);
        saveInventory();
        applyRewards(pendingRewards);

closeChestModal();
renderInventoryTab(currentTab);

        return;
    }

    const modalImg = document.getElementById("chest-modal-img");
    const modalStatus = document.getElementById("chest-modal-status");

    modalImg.classList.remove("shake");
    void modalImg.offsetWidth;
    modalImg.classList.add("shake");

    modalStatus.innerText = "Сундук открывается...";
    chestOpenBtn.disabled = true;

    setTimeout(() => {
        const rewards = generateChestRewards(selectedChest);

        pendingRewards = rewards;

        renderChestRewards(rewards);

        modalStatus.innerText = "🎁 Награды получены!";
        chestOpenBtn.innerText = "ЗАБРАТЬ";
        chestOpenBtn.disabled = false;

        chestIsOpened = true;
    }, 700);
});


function generateChestRewards(chest) {
    const rewards = [];

    if (chest.rarity === "COMMON") {
        rewards.push(createReward("Золото", randomInt(250, 700), "image/ui/gold.png", "common"));
        rewards.push(createReward("Осколки", randomInt(5, 18), "image/ui/power-shards.png", "rare   "));
    }

    if (chest.rarity === "RARE") {
        rewards.push(createReward("Золото", randomInt(250, 700), "image/ui/gold.png", "common"));
        rewards.push(createReward("Осколки", randomInt(15, 35), "image/ui/power-shards.png", "rare"));
        rewards.push(createReward("Гемы", randomInt(10, 45), "image/ui/gems.png","epic"));
        rewards.push(createRandomCloth(["common", "rare"]));
    }

    if (chest.rarity === "EPIC") {
        rewards.push(createReward("Золото", randomInt(250, 700), "image/ui/gold.png", "common"));
        rewards.push(createReward("Осколки", randomInt(35, 70), "image/ui/power-shards.png", "rare"));
        rewards.push(createReward("Гемы", randomInt(45, 95), "image/ui/gems.png","epic"));
        rewards.push(createRandomCloth(["rare", "epic"]));
        rewards.push(createRandomCloth(["rare", "epic"]));
    }

    if (chest.rarity === "LEGENDARY") {
        rewards.push(createReward("Золото", randomInt(250, 700), "image/ui/gold.png", "common"));
        rewards.push(createReward("Осколки", randomInt(80, 150), "image/ui/power-shards.png", "rare"));
        rewards.push(createReward("Гемы", randomInt(100, 220), "image/ui/gems.png","epic"));
        rewards.push(createRandomCloth(["epic", "legendary"]));
        rewards.push(createRandomCloth(["epic", "legendary"]));
        rewards.push(createRandomCloth(["legendary"]));
    }

    return rewards;
}

function renderChestRewards(rewards) {
    const rewardsEl = document.getElementById("chest-rewards");

    rewardsEl.innerHTML = "";
const hasLegendary = rewards.some(r => r.rarity === "LEGENDARY");

if (hasLegendary) {
    triggerLegendaryEffect();
}
    rewards.forEach((reward, index) => {
        const card = document.createElement("div");
        card.className = `reward-card ${reward.rarity ? reward.rarity.toLowerCase() : ""}`;
        card.style.animationDelay = `${index * 0.22}s`;

        card.innerHTML = `
            <img src="${reward.img}" alt="${reward.title}">
            <div class="reward-card-title">${reward.title}</div>
            <div class="reward-card-amount">x${reward.amount}</div>
        `;

        rewardsEl.appendChild(card);
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createReward(title, amount, img, rarity = "") {
    return {
        title: title,
        amount: amount,
        img: img,
        rarity: rarity
    };
}

function createRandomCloth(allowedRarities) {
    const theme = clothThemes[randomInt(0, clothThemes.length - 1)];
    const rarity = allowedRarities[randomInt(0, allowedRarities.length - 1)];

    return {
        title: `${themeNames[theme]} ткань`,
        amount: randomInt(1, rarity === "legendary" ? 2 : 4),
        img: `image/ui/cloth/${theme}-${rarity}.png`,
        rarity: rarity.toUpperCase()
    };
}
function triggerLegendaryEffect() {
    const flash = document.getElementById("legendary-flash");

    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
}
function applyRewards(rewards) {
    rewards.forEach(reward => {

        if (reward.title === "Золото") {
            const goldItem = inventoryData.resources.items.find(i => i.title === "Золото");

            if (goldItem) {
                goldItem.count += reward.amount;
            }
        }

        if (reward.title === "Гемы") {
            const gemsItem = inventoryData.resources.items.find(i => i.title === "Гемы");

            if (gemsItem) {
                gemsItem.count += reward.amount;
            }
        }

        if (reward.title === "Осколки") {
            const shardsItem = inventoryData.resources.items.find(i => i.title === "Осколки силы");

            if (shardsItem) {
                shardsItem.count += reward.amount;
            }
        }

if (reward.title.includes("ткань")) {
    const existingCloth = inventoryData.cloth.items.find(item => {
        return item.title === reward.title && item.rarity === reward.rarity;
    });

    if (existingCloth) {
        existingCloth.count += reward.amount;
    } else {
        inventoryData.cloth.items.push({
            title: reward.title,
            rarity: reward.rarity || "COMMON",
            count: reward.amount,
            img: reward.img,
            obtain: "Получено из сундука."
        });
    }
}

    });
    updateHeaderResources();
}
function updateHeaderResources() {
    const gold = inventoryData.resources.items.find(i => i.title === "Золото");
    const gems = inventoryData.resources.items.find(i => i.title === "Гемы");
    const energy = inventoryData.resources.items.find(i => i.title === "Энергия");

    const goldEl = document.getElementById("header-gold");
    const gemsEl = document.getElementById("header-gems");
    const energyEl = document.getElementById("header-energy");

    if (goldEl && gold) goldEl.innerText = gold.count;
    if (gemsEl && gems) gemsEl.innerText = gems.count;
    if (energyEl && energy) energyEl.innerText = energy.count;
}
function saveInventory() {
    localStorage.setItem("mcc_inventory", JSON.stringify(inventoryData));
}

function loadInventory() {
    const saved = localStorage.getItem("mcc_inventory");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    if (parsed.chests) inventoryData.chests.items = parsed.chests.items;
    if (parsed.cloth) inventoryData.cloth.items = parsed.cloth.items;
    if (parsed.resources) inventoryData.resources.items = parsed.resources.items;
    if (parsed.passes) inventoryData.passes.items = parsed.passes.items;
}
loadInventory();
renderInventoryTab("chests");
updateHeaderResources();
saveInventory();