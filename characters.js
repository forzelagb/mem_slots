const characters = [
  {
    name: "HELIN",
    folder: "helin",
    currentSkin: 1,
    rarity: "ЭПИЧЕСКИЙ",
    unlocked: true,
    selected: true,
    price: 0,
    desc: "Харизматичный и уверенный в себе герой. Его удача помогает получать лучшие награды.",
    hp: 820,
    attack: 110,
    defense: 85,
  },
  {
    name: "SASAVOT",
    folder: "sasavot",
    currentSkin: 1,
    rarity: "РЕДКИЙ",
    unlocked: false,
    selected: false,
    price: 1790,
    desc: "Сильный персонаж для стабильного прогресса и уверенного старта.",
    hp: 760,
    attack: 95,
    defense: 90,
  },
{
  name: "LEXA PAWS",
  folder: "lexapaws",
  currentSkin: 1,
    rarity: "ЭПИЧЕСКИЙ",
    unlocked: false,
    selected: false,
    price: 2250,
    desc: "Энергичный герой, который помогает быстрее возвращаться в игру.",
    hp: 700,
    attack: 125,
    defense: 70,
  },
  {
    name: "ROSTIK",
    folder: "rostickfaceskid",
    currentSkin: 1,
    rarity: "ЭПИЧЕСКИЙ",
    unlocked: false,
    selected: false,
    price: 4000,
    desc: "Яркий герой с высоким потенциалом прокачки редких наград.",
    hp: 840,
    attack: 100,
    defense: 80,
  },
  {
    name: "NIKKIFN",
    folder: "nikkifn",
    currentSkin: 1,
    rarity: "РЕДКИЙ",
    unlocked: false,
    selected: false,
    price: 3000,
    desc: "Быстрый и техничный персонаж с дополнительными бонусами.",
    hp: 720,
    attack: 130,
    defense: 65,
  },
  {
    name: "MELSTROY",
    folder: "melstroy",
    currentSkin: 1,
    rarity: "ЛЕГЕНДАРНЫЙ",
    unlocked: false,
    selected: false,
    price: 5000,
    desc: "Мощный герой, который помогает быстрее копить монеты.",
    hp: 900,
    attack: 140,
    defense: 100,
  },
  {
    name: "REJIBOY",
    folder: "rejiboi",
    currentSkin: 1,
    rarity: "РЕДКИЙ",
    unlocked: false,
    selected: false,
    price: 3500,
    desc: "Герой для уверенного развития профиля и получения опыта.",
    hp: 780,
    attack: 105,
    defense: 85,
  },
  {
    name: "LITVIN",
    folder: "litwin",
    currentSkin: 1,
    rarity: "ЛЕГЕНДАРНЫЙ",
    unlocked: false,
    selected: false,
    price: 2500,
    desc: "Редкий герой с универсальным усилением всех наград.",
    hp: 850,
    attack: 115,
    defense: 95,
  }
];

let currentIndex = 0;

const charName = document.getElementById("charName");
const charStatus = document.getElementById("charStatus");
const charDesc = document.getElementById("charDesc");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const charImage = document.getElementById("charImage");
const mainBtn = document.getElementById("mainBtn");
const cards = document.getElementById("cards");

function renderCharacter() {
  const char = characters[currentIndex];

  charName.textContent = char.name;
  charStatus.textContent = char.unlocked ? "ОТКРЫТ" : "ЗАКРЫТ";
  charStatus.style.color = char.unlocked ? "#20ff67" : "#ff4040";

  charDesc.textContent = char.desc;
  hp.textContent = char.hp;
  attack.textContent = char.attack;
  defense.textContent = char.defense;

  charImage.src = `image/characters/${char.folder}/skin-${char.currentSkin}.png`;

  mainBtn.textContent = char.unlocked
    ? "ПРИМЕНИТЬ ПЕРСОНАЖА"
    : `ОТКРЫТЬ ЗА ${char.price}`;

  renderCards();
}

function renderCards() {
  cards.innerHTML = "";

  characters.forEach((char, index) => {
    const card = document.createElement("div");
    card.className = "char-card";

    if (index === currentIndex) card.classList.add("active");
    if (!char.unlocked) card.classList.add("locked");

    card.innerHTML = `
      <img src="image/characters/${char.folder}/preview.png">
      ${!char.unlocked ? `<div class="lock-icon">🔒</div>` : ""}
      <h4>${char.name}</h4>
      <p>${char.unlocked ? "ОТКРЫТ" : char.price}</p>
    `;

    card.addEventListener("click", () => {
      currentIndex = index;
      renderCharacter();
    });

    cards.appendChild(card);
  });
}
function getSave() {
  return JSON.parse(localStorage.getItem("mccSave")) || {
    nickname: "PLAYER",
    level: 1,
    gold: 0,
    gems: 0,
    energy: 100,
    maxEnergy: 100,
    selectedCharacter: "helin"
  };
}

function setSave(save) {
  localStorage.setItem("mccSave", JSON.stringify(save));
}

function updateHeaderFromSave() {
  const save = getSave();

  document.querySelectorAll(".js-gold").forEach(el => {
    el.textContent = save.gold || 0;
  });

  document.querySelectorAll(".js-gems").forEach(el => {
    el.textContent = save.gems || 0;
  });

  document.querySelectorAll(".js-energy").forEach(el => {
    el.textContent = `${save.energy || 0}/${save.maxEnergy || 100}`;
  });

  document.querySelectorAll(".js-player-name").forEach(el => {
    el.textContent = save.nickname || "PLAYER";
  });

  document.querySelectorAll(".js-level").forEach(el => {
    el.textContent = save.level || 1;
  });
}
mainBtn.addEventListener("click", () => {
  const char = characters[currentIndex];
  const save = getSave();

  if (!char.unlocked) {
    if ((save.gold || 0) < char.price) {
      alert("Недостаточно золота!");
      return;
    }

    save.gold -= char.price;
    char.unlocked = true;
  }

  characters.forEach(c => c.selected = false);
  char.selected = true;

  save.selectedCharacter = char.folder;

  setSave(save);
  saveCharactersState();
  updateHeaderFromSave();
  renderCharacter();
});

updateHeaderFromSave();

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = characters.length - 1;
  }

  renderCharacter();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= characters.length) {
    currentIndex = 0;
  }

  renderCharacter();
});

function openSoonModal() {
    document
        .getElementById("soonModal")
        .classList.add("active");
}

function closeSoonModal() {
    document
        .getElementById("soonModal")
        .classList.remove("active");
}
function loadCharactersState() {
  const saved = JSON.parse(localStorage.getItem("mccCharactersState"));

  if (!saved) return;

  characters.forEach(char => {
    const savedChar = saved.find(item => item.name === char.name);

    if (savedChar) {
      char.unlocked = savedChar.unlocked;
      char.selected = savedChar.selected;
      char.currentSkin = savedChar.currentSkin || 1;
    }
  });
}

function saveCharactersState() {
  const state = characters.map(char => ({
    name: char.name,
    unlocked: char.unlocked,
    selected: char.selected,
    currentSkin: char.currentSkin
  }));

  localStorage.setItem("mccCharactersState", JSON.stringify(state));
}
function openStoryModal() {
    const modal = document.getElementById("storyModal");
    if (!modal) return;

    modal.classList.add("active");
}

function closeStoryModal() {
    const modal = document.getElementById("storyModal");
    if (!modal) return;

    modal.classList.remove("active");
}
loadCharactersState();
renderCharacter();