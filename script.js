let level = 1;
let points = 0;
let stats = {
    strength: 10,
    agility: 10,
    stamina: 10,
    intelligence: 10
};

function saveData() {
    const data = {
        level,
        points,
        stats
    };
    localStorage.setItem('soloLevelingData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('soloLevelingData');
    if (saved) {
        const data = JSON.parse(saved);
        level = data.level;
        points = data.points;
        stats = data.stats;
    }
    updateUI();
}

function updateUI() {
    document.getElementById("level").textContent = level;
    document.getElementById("points").textContent = points;
    for (let key in stats) {
        document.getElementById(key).textContent = stats[key];
    }
}

function completeWorkout() {
    points += 5;
    level += 1;
    saveData();
    updateUI();
}

function increaseStat(stat) {
    if (points > 0) {
        stats[stat]++;
        points--;
        saveData();
        updateUI();
    }
}

loadData();
