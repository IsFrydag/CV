document.addEventListener('DOMContentLoaded', () => {
    const orbits = document.querySelectorAll('.orbit');

    orbits.forEach((orbit, index) => {
        const radius = 30;
        const circles = orbit.querySelectorAll('.circle');
        circles.forEach((circle, i) => {
            const angle = (i / circles.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            circle.style.left = `calc(50% + ${x}px - 30px)`;
            circle.style.top = `calc(50% + ${y}px - 30px)`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const orbits = document.querySelectorAll('.orbit');

    orbits.forEach((orbit) => {
        const radius = orbit.offsetWidth / 2; // Use half the orbit width as radius
        const circles = orbit.querySelectorAll('.circle');
        circles.forEach((circle, i) => {
            const angle = (i / circles.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            // Adjust left and top to center the circle based on its actual size
            circle.style.left = `calc(50% + ${x}px - ${circle.offsetWidth / 2}px)`;
            circle.style.top = `calc(50% + ${y}px - ${circle.offsetHeight / 2}px)`;
        });
    });
});

function toggleReferences() {
    const container = document.querySelector('.references-container');
    container.classList.toggle('expanded');
}

document.querySelector('.contactReference').addEventListener('click', function() {
    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 1700);
});

document.querySelector('.contactReference').addEventListener('click', function() {
    const panel = document.querySelector('.reference-panel');
    if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        panel.classList.add('closing');
        this.classList.add('closing');
        setTimeout(() => {
            panel.classList.remove('closing');
            this.classList.remove('closing');
        }, 1000);
    } else {
        this.classList.add('active');
        panel.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 1800);
    }
});

document.querySelectorAll('.subHeadTitle').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('active');
    });
});

const speed = 0.15;  

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function toggleLines(linesArray, delay, turnOn = true) {
    if (turnOn) {
        for (let line of linesArray) {
            document.getElementById(line).classList.add('active');
            await sleep(delay * speed);
        }
    } else {
        for (let line of linesArray.slice().reverse()) {
            document.getElementById(line).classList.remove('active');
            await sleep(delay * speed);
        }
    }
}

// --- Circles appear after branches finish ---
async function toggleCircle(circleId, turnOn = true) {
    const circle = document.getElementById(circleId);
    if (turnOn) {
        circle.classList.add('active');
        // 1s later, glow activates
        await sleep(1000 * speed);
        circle.classList.add('glow');
    } else {
        // Remove glow first, then circle
        circle.classList.remove('glow');
        await sleep(300 * speed); 
        circle.classList.remove('active');
    }
}

// Branch definitions
const branch1 = ['line1','line2','line3','line11','line4','line5'];
const branch2 = ['line15','line6','line40','line7','line8','line9','line10','line12','line13','line14'];
const branch3_main = ['line16','line17','line18','line39','line19','line20'];
const branch3_off  = ['line24','line21','line25','line22','line26','line23','line27'];
const branch3_rest = ['line28','line29','line37','line30','line31','line32','line33','line34','line35','line36'];

// Branch3 with off-branch timing
async function lightBranch3(turnOn = true) {
    if (turnOn) {
        await toggleLines(branch3_main, 500, true);
        await toggleLines(branch3_off, 250, true);
        await toggleLines(branch3_rest, 500, true);
        await toggleCircle("skills", true);
    } else {
        await toggleCircle("skills", false);
        await toggleLines(branch3_rest, 500, false);
        await toggleLines(branch3_off, 250, false);
        await toggleLines(branch3_main, 500, false);
    }
}

async function lightBranch1(turnOn = true) {
    if (turnOn) {
        await toggleLines(branch1, 500, true);
        await toggleCircle("personInfo", true);
    } else {
        await toggleCircle("personInfo", false);
        await toggleLines(branch1, 500, false);
    }
}

async function lightBranch2(turnOn = true) {
    if (turnOn) {
        await toggleLines(branch2, 500, true);
        await toggleCircle("secondaryEd", true);
        await toggleCircle("tertiaryEd", true);
    } else {
        await toggleCircle("tertiaryEd", false);
        await toggleCircle("secondaryEd", false);
        await toggleLines(branch2, 500, false);
    }
}

const subHeadTitle = document.querySelector('.subHeadTitle');
let isActive = false;

subHeadTitle.addEventListener('click', async () => {
    if (!isActive) {
        subHeadTitle.classList.add('active');
        await sleep(5000 * speed);

        // Start all branches simultaneously
        lightBranch1(true);
        lightBranch2(true);
        lightBranch3(true);

        isActive = true;
    } else {
        await Promise.all([
            lightBranch1(false),
            lightBranch2(false),
            lightBranch3(false)
        ]);

        subHeadTitle.classList.remove('active');
        isActive = false;
    }
});

const circles = document.querySelectorAll('.infoCircle');

const circleToSection = {
    personInfo: document.querySelector('.details'),
    secondaryEd: document.querySelector('.education'),
    tertiaryEd: document.querySelector('.tertiaryEd'),
    skills: document.querySelector('.skills')
};

function closeAllSections() {
    Object.values(circleToSection).forEach(section => {
        if (section) {
            section.classList.remove('expand');
            section.classList.add('collapse');
        }
    });
}

function toggleSection(section) {
    if (section.classList.contains('expand')) {
        section.classList.remove('expand');
        section.classList.add('collapse');
    } else {
        closeAllSections();
        section.classList.remove('collapse');
        section.classList.add('expand');
    }
}

circles.forEach(circle => {
    circle.addEventListener('click', () => {
        if (!circle.classList.contains('active')) return;
        const section = circleToSection[circle.id];
        if (!section) return;
        toggleSection(section);
    });
});

subHeadTitle.addEventListener('click', () => {
    closeAllSections();
});

