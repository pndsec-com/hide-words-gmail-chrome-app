function getSuspiciousWords(callback) {
    chrome.storage.local.get("suspiciousWords", data => {
        callback(data.suspiciousWords || []);
    });
}

function checkEmails(suspiciousWords) {
    const emailElements = document.querySelectorAll(".y6 span[id]");

    emailElements.forEach(email => {
        const title = email.innerText.toLowerCase();
        const foundWord = suspiciousWords.find(word => title.includes(word.toLowerCase()));

        if (foundWord && !email.classList.contains("marked-suspicious")) {
            email.style.color = "red";
            email.style.fontWeight = "bold";
            email.innerHTML += ` 🔴 <span class="alert-text">(Suspicious: "${foundWord}")</span>`;
            email.classList.add("marked-suspicious");
        }
    });
}

// Automatically refresh when storage changes
chrome.storage.onChanged.addListener(() => {
    getSuspiciousWords(checkEmails);
});

// Initial load
getSuspiciousWords(suspiciousWords => {
    setInterval(() => checkEmails(suspiciousWords), 3000);
});
