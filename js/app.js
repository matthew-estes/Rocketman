const key = document.querySelectorAll(".key");
const playBtn = document.querySelector(".play")
const mysteryWordReveal = document.querySelector(".mysteryWordReveal");
const mysteryLetters = document.querySelectorAll(".letter");
const messageEl = document.querySelector(".message");

const mysteryWordArray = [
  "GALAXY",
  "PLANET",
  "SATELLITE",
  "COSMOS",
  "ASTRONAUT",
  "TELESCOPE",
  "ROCKET",
  "INTERSTELLAR",
  "CONSTELLATION",
  "EXTRATERRESTRIAL",
  "JUPITER",
  "SUPERNOVA",
  "METEORITE",
];

let mysteryWord;
let correctLetters = 0;
let badAttempts = 0;

/*----------------------------- Functions -----------------------------*/

function init() {
  correctLetters = 0;
  badAttempts = 0;
  messageEl.innerText = "";

  key.forEach((key) => {
    key.classList.remove("wrong");
    key.classList.remove("correct");
  })
  
  mysteryWordReveal.innerHTML = "";

  mysteryWord = mysteryWordArray[Math.floor(Math.random() * mysteryWordArray.length)];
  console.log(mysteryWord);

  for (let i = 0; i < mysteryWord.length; i++){
    const hiddenDiv = document.createElement('div');
    hiddenDiv.classList.add('letter');
    hiddenDiv.innerText = "★";
    mysteryWordReveal.appendChild(hiddenDiv);
  }
   
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
      if (mysteryWord[i] === clickedKey && mysteryWordReveal.children[i].innerText === "★") {
        mysteryWordReveal.children[i].innerText = clickedKey;
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

