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
const abilityName = document.getElementById("abilityName");
const abilityText = document.getElementById("abilityText");
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
  abilityName.textContent = char.abilityName;
  abilityText.textContent = char.abilityText;

  charImage.src =
charImage.src =
`image/characters/${char.folder}/skin-${char.currentSkin}.png`;

  if (!char.unlocked) {
    mainBtn.textContent = `КУПИТЬ ЗА ${char.price}`;
  } else if (char.selected) {
    mainBtn.textContent = "ВЫБРАН";
  } else {
    mainBtn.textContent = "ПРИМЕНИТЬ ПЕРСОНАЖА";
  }

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

mainBtn.addEventListener("click", () => {
  const char = characters[currentIndex];

  if (!char.unlocked) {
    char.unlocked = true;
    alert(`${char.name} куплен!`);
  } else {
    characters.forEach(c => c.selected = false);
    char.selected = true;
  }

  renderCharacter();
});

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
function openStoryModal() {
  const char = characters[currentIndex];

  document.getElementById("storyCharName").textContent = char.name;
  document.getElementById("storyModal").classList.add("active");
}

function closeStoryModal() {
  document.getElementById("storyModal").classList.remove("active");
}
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

renderCharacter();