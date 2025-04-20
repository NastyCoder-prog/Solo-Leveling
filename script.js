let level = 1;
let points = 0;
let stats = {
    strength: 10,
    agility: 10,
    stamina: 10,
    intelligence: 10
};

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
    updateUI();
}

function increaseStat(stat) {
    if (points > 0) {
        stats[stat]++;
        points--;
        updateUI();
    }
}

updateUI();
