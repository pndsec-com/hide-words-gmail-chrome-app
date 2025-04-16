document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("wordInput");
    const addWordButton = document.getElementById("addWord");
    const wordList = document.getElementById("wordList");

    function loadWords() {
        chrome.storage.local.get("suspiciousWords", data => {
            wordList.innerHTML = "";
            const words = data.suspiciousWords || [];
            words.forEach(word => {
                const li = document.createElement("li");
                li.textContent = word;
                const removeBtn = document.createElement("span");
                removeBtn.textContent = "❌";
                removeBtn.classList.add("remove-btn");
                removeBtn.onclick = () => removeWord(word);
                li.appendChild(removeBtn);
                wordList.appendChild(li);
            });
        });
    }

    function addWord() {
        const newWord = wordInput.value.trim();
        if (newWord) {
            chrome.storage.local.get("suspiciousWords", data => {
                const words = data.suspiciousWords || [];
                if (!words.includes(newWord)) {
                    words.push(newWord);
                    chrome.storage.local.set({ suspiciousWords: words }, loadWords);
                }
            });
            wordInput.value = "";
        }
    }

    function removeWord(word) {
        chrome.storage.local.get("suspiciousWords", data => {
            let words = data.suspiciousWords || [];
            words = words.filter(w => w !== word);
            chrome.storage.local.set({ suspiciousWords: words }, loadWords);
        });
    }

    addWordButton.addEventListener("click", addWord);
    loadWords();
});
