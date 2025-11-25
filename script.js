// Initialize skills datah
let skills = JSON.parse(localStorage.getItem('skills')) || {
    workout: { strength: { level: 1, xp: 0 }, speed: { level: 1, xp: 0 }, stamina: { level: 1, xp: 0 } },
    study: { knowledge: { level: 1, xp: 0 }, logic: { level: 1, xp: 0 }, creativity: { level: 1, xp: 0 } },
    coding: { algorithms: { level: 1, xp: 0 }, debugging: { level: 1, xp: 0 }, innovation: { level: 1, xp: 0 } }
};

// Tab switching
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    updateDisplay(tabName);
}

// Update skill display
function updateDisplay(category) {
    const container = document.getElementById(`${category}-skills`);
    container.innerHTML = '';
    Object.keys(skills[category]).forEach(skill => {
        const data = skills[category][skill];
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `
            <strong>${skill.charAt(0).toUpperCase() + skill.slice(1)}: Level ${data.level}</strong>
            <div class="skill-bar">
                <div class="skill-fill" style="width: ${(data.xp / 100) * 100}%"></div>
            </div>
            <small>XP: ${data.xp}/100</small>
        `;
        container.appendChild(skillDiv);
    });
}

// Handle form submissions
function handleSubmit(event, category) {
    event.preventDefault();
    const skillSelect = document.getElementById(`${category}-skill`);
    const xpInput = document.getElementById(`${category}-xp`);
    const skill = skillSelect.value;
    const xp = parseInt(xpInput.value);

    skills[category][skill].xp += xp;
    if (skills[category][skill].xp >= 100) {
        skills[category][skill].level += 1;
        skills[category][skill].xp -= 100;
        showLevelUp(skill.charAt(0).toUpperCase() + skill.slice(1), skills[category][skill].level);
    }

    localStorage.setItem('skills', JSON.stringify(skills));
    updateDisplay(category);
    xpInput.value = 10; // Reset to default
}

// Level up animation and modal
function showLevelUp(skill, level) {
    const modal = document.getElementById('level-up-modal');
    const message = document.getElementById('level-up-message');
    message.textContent = `${skill} leveled up to ${level}!`;
    modal.style.display = 'block';

    // Add glow to skill
    const skillDivs = document.querySelectorAll('.skill');
    skillDivs.forEach(div => {
        if (div.innerHTML.includes(skill.toLowerCase())) {
            div.classList.add('level-up');
            setTimeout(() => div.classList.remove('level-up'), 3000);
        }
    });
}

function closeModal() {
    document.getElementById('level-up-modal').style.display = 'none';
}

// Event listeners
document.getElementById('workout-form').addEventListener('submit', (e) => handleSubmit(e, 'workout'));
document.getElementById('study-form').addEventListener('submit', (e) => handleSubmit(e, 'study'));
document.getElementById('coding-form').addEventListener('submit', (e) => handleSubmit(e, 'coding'));

// Initial display
updateDisplay('workout');
