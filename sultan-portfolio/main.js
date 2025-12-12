/* ===== Smooth Scroll for Navbar ===== */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

/* ===== Falling Leaves ===== */
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


/* ===================== AdviceSlip API ===================== */
async function fetchWithTimeout(url, timeoutMs = 6000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal, cache: "no-cache" });
        clearTimeout(id);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

/* Fetch advice from AdviceSlip API */
async function tryAdviceSlip() {
    const url = "https://api.adviceslip.com/advice";
    try {
        const res = await fetchWithTimeout(url);
        const json = await res.json();
        return { text: json.slip.advice, author: "AdviceSlip" };
    } catch {
        return null;
    }
}

/* HTML escaping */
function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, m => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[m]);
}

/* AdviceSlip API */
async function generateQuote() {
    const quoteTextEl = document.getElementById("quote-text");
    const quoteSourceEl = document.getElementById("quote-source");

    quoteTextEl.textContent = "Loading quote...";
    quoteSourceEl.textContent = "";

    const advice = await tryAdviceSlip();
    if (advice) {
        quoteTextEl.innerHTML =
            `"${escapeHtml(advice.text)}"<br><span style='font-size:15px;font-weight:bold;'>— ${escapeHtml(advice.author || "Unknown")}</span>`;
        quoteSourceEl.textContent = `Source: AdviceSlip`;
        return;
    }
    quoteTextEl.textContent = "Unable to load quote.";
}

/* Initialize quote button */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("new-quote-btn").addEventListener("click", generateQuote);
    generateQuote();
});