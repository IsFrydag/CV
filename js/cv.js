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