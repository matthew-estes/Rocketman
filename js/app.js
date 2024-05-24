const key = document.querySelectorAll('.key');
const playBtn = document.querySelector('.play')

const mysteryLetters = document.querySelectorAll(".letter");
const messageEl = document.querySelector(".message");

const mysteryWordArray = [
  "SWEATER",
  "HEADSET",
  "TOOLBOX",
  "LUGGAGE",
  "JOURNAL",
  "CABINET",
  "CURTAIN",
  "PERFUME",
  "JOURNAL",
  "PRINTER",
  "SAILING",
  "CYCLING",
  "CRICKET",
  "FISHING",
  "LASAGNA",
  "MUSTARD",
  "BURRITO",
  "BROWNIE",
  "PICKLES",
  "JUKEBOX",
  "SQUEEZE",
  "JACKPOT",
  "JEWELRY",
  "CUPCAKE",
];

let mysteryWord = mysteryWordArray[Math.floor(Math.random() * mysteryWordArray.length)];
let correctLetters = 0;
let badAttempts = 0;

/*----------------------------- Functions -----------------------------*/

function init() {
  correctLetters = 0;
  badAttempts = 0;
  messageEl.innerText = "";

  mysteryWord = mysteryWordArray[Math.floor(Math.random() * mysteryWordArray.length)];
  console.log(mysteryWord);

  key.forEach((key) => {
    key.classList.remove("wrong");
    key.classList.remove("correct");
  })
  
  mysteryLetters.forEach((letter, idx) => {
    letter.innerText = "_"
    letter.classList.remove("guess");
    });

}

function checkForWin() {
  if (correctLetters == mysteryWord.length) {
    messageEl.innerText = "Congrats, you won!";
  } else if (badAttempts == 4) {
    messageEl.innerText = "Houston, we have a problem! The word was " + mysteryWord;
  }
}

/*----------------------------- Event Listeners -----------------------------*/

key.forEach((key) => {
  key.addEventListener("click", (event) => {
    const clickedKey = event.target.innerText;

    let successful = false;

    for (let i = 0; i < mysteryWord.length; i++) {
      if (
        mysteryWord[i] === clickedKey &&
        !mysteryLetters[i].classList.contains("guess")
      ) {
        mysteryLetters[i].innerText = clickedKey;
        mysteryLetters[i].classList.add("guess");
        correctLetters++;
        successful = true;
        event.target.classList.add("correct");  
        console.log("correct attempts:", correctLetters);
      }
    }
    if (!successful) {
      badAttempts++;
      event.target.classList.add("wrong"); 
      console.log("bad attempts:", badAttempts);
    }
    checkForWin();
  });
});



playBtn.addEventListener("click", (event) => {
  init();
  console.log("clicked!");
})

