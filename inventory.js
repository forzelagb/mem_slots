function openInventoryV4Tab(tabId) {
  const tabs = ['chests', 'cloth', 'resources', 'fragments'];
  tabs.forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  document.querySelectorAll('.inventory-v4-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[onclick="openInventoryV4Tab('${tabId}')"]`).classList.add('active');

  // Обновляем заголовки
  const titles = {
    chests: 'СУНДУКИ',
    cloth: 'ТКАНИ',
    resources: 'РЕСУРСЫ',
    fragments: 'ФРАГМЕНТЫ'
  };
  document.getElementById('inventory-v4-title').textContent = titles[tabId];
  document.getElementById('inventory-v4-subtitle').textContent = `Просматривай и управляй своими ${titles[tabId].toLowerCase()}`;
}

// Здесь позже можно добавить рендер картинок сундуков, анимации и т.д.