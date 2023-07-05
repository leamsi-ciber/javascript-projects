const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

let inpWord = document.getElementById("inp-word");

const findWord = () => {
  let inputW = inpWord.value
  fetch(`${url}${inputW}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
            <div class="word">
            <h3>${inputW}</h3>
            <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
            </button>
          </div>
          <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
          </div>
          <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
          </p>
            `;

      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    }).catch(() => {
      if (inputW.length == 0) {
        result.innerHTML = `<h3 class="error">The Input Cannot Be Empty</h3>`;
      } else {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
      }
    });
};

function playSound() {
  sound.play();
}

inpWord.addEventListener("keyup", findWord)
btn.addEventListener("click", findWord);
