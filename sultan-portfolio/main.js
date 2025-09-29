document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

function createLeaf() {
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');

    const images = [
        "assets/leaves/leaf1.png",
        "assets/leaves/leaf2.png",
        "assets/leaves/leaf3.png",
        "assets/leaves/leaf4.png",
        "assets/leaves/leaf5.png",
        "assets/leaves/leaf6.png",
        "assets/leaves/leaf7.png",
    ];
    
    leaf.src = images[Math.floor(Math.random() * images.length)];
    
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = 5 + Math.random() * 5 + 's'; 
    leaf.style.width = 20 + Math.random() * 30 + 'px'; 
    
    document.getElementById('leaves').appendChild(leaf);
    
    setTimeout(() => leaf.remove(), 10000);
}

setInterval(createLeaf, 300);