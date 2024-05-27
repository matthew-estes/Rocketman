const key = document.querySelectorAll(".key");
const playBtn = document.querySelector(".play");
const mysteryWordReveal = document.querySelector(".mysteryWordReveal");
const mysteryLetters = document.querySelectorAll(".letter");
const winMessageEl = document.querySelector(".message1");
const loseMessageEl = document.querySelector(".message2");
const instructions = document.querySelector(".instructions");
const imageLayers = document.querySelectorAll(".layers")

const mysteryWordArray = [
  "GALAXY",
  "PLANET",
  "SATELLITE",
  "COSMOS",
  "ASTRONAUT",
  "TELESCOPE",
  "ROCKET",
  "JUPITER",
  "SUPERNOVA",
  "METEORITE",
];

let mysteryWord;
let correctLetters = 0;
let badAttempts = 0;

function init() {
  correctLetters = 0;
  badAttempts = 0;
  winMessageEl.innerText = "";
  loseMessageEl.innerText = "";
  instructions.innerHTML = "";

  imageLayers.forEach((layer, index) => {
    if (index === 0) {
      layer.style.display = 'block';
    } else {
      layer.style.display = 'none';
    }
  });

  key.forEach((key) => {
    key.classList.remove("wrong");
    key.classList.remove("correct");
  });

  mysteryWordReveal.innerHTML = "";

  mysteryWord =
    mysteryWordArray[Math.floor(Math.random() * mysteryWordArray.length)];
  console.log(mysteryWord);

  for (let i = 0; i < mysteryWord.length; i++) {
    const hiddenDiv = document.createElement("div");
    hiddenDiv.classList.add("letter");
    hiddenDiv.innerText = "★";
    mysteryWordReveal.appendChild(hiddenDiv);
  }
}

function checkForWin() {
  if (correctLetters == mysteryWord.length) {
    winMessageEl.innerText =
      "Thank you and congratulations! May you live long and prosper!";
  } else if (badAttempts == 4) {
    loseMessageEl.innerText = `Houston, we have a problem! 
    The mystery word was: ${mysteryWord}.`;
  }
}

key.forEach((key) => {
  key.addEventListener("click", (event) => {
    const clickedKey = event.target.innerText;

    let successful = false;

    for (let i = 0; i < mysteryWord.length; i++) {
      if (
        mysteryWord[i] === clickedKey &&
        mysteryWordReveal.children[i].innerText === "★"
      ) {
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
      if (badAttempts <= 4) {
        imageLayers[badAttempts - 1].style.display = 'none';
        imageLayers[badAttempts].style.display = 'block';
      }
    }
    checkForWin();
  });
});

playBtn.addEventListener("click", () => {
  init();
  console.log("clicked!");
});
