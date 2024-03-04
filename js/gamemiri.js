//memory
const user = JSON.parse(sessionStorage.getItem("currentUser")) || "";
console.log(user);
//מערך מילים לניחוש
const wards = [

    { ward: "sari", clue: "name" },
    { ward: "jerusalem", clue: "city" },
    { ward: "amerika", clue: "yabeshet" },
    { ward: "name", clue: "its belong to you!" },
    { ward: "computer", clue: "An electric item" },
    { ward: "siatadishmaia", clue: "we cant live without" },
    { ward: "sky", clue: "high" },
    { ward: "flower", clue: "Its so nice !" },
    { ward: "miri", clue: "Can you guess yourself ? " },
    { ward: "javascript", clue: "subject and language..." },
    { ward: "jerusalem", clue: "city" }
]
let t = wards.length - 1;
let count = 0;
const body = document.querySelector("body")
const box = document.querySelector(".chooseWard")
const clue = document.querySelector(".btnClue")
const btns = document.querySelector(".btnLetters")
const clueBox = document.querySelector(".clue")
const reset = document.querySelector(".newGame")
const hangMan = document.querySelector(".hangMan")
// console.log(hangMan);
let choose = 0;
let insert = ""
let gessWard;
let was;
choose = Math.floor(Math.random() * t)
console.log(wards[choose].ward.length);
gessWard = [wards[choose].ward.length]
for (let i = 0; i < wards[choose].ward.length; i++)
    gessWard[i] = false
//הצגת פרטים בעת טעינה
document.addEventListener("readystatechange", () => showAll());
//show all
function showAll() {
    was = [26];
    for (let i = 0; i < 26; i++) {
        was[i] = false;
    }
    clue.classList.remove("clueHide");
    body.classList.remove("gameOver");
    count = 0;
    choose = Math.floor(Math.random() * t);
    console.log(wards[choose].ward.length);
    gessWard = [];
    for (let i = 0; i < wards[choose].ward.length; i++) {
        gessWard[i] = false;
    }
    console.log(gessWard);
    clueBox.innerText = "";
    showWard();
    createBtn();
}
//הצגת קויים
const showWard = () => {
    box.innerText = "";

    for (let i = 0; i < wards[choose].ward.length; i++) {
        let kav = document.createElement("div")
        kav.classList.add("chooseWard")
        if (wards[choose].ward.charAt(i) == ' ')
            kav.innerText = '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0'
        else {
            kav.innerText = '\u00A0' + "_" + '\u00A0'
        }
        kav.classList.add("letter")
        box.append(kav)
    }
}
//הצגת מקלדת
const createBtn = () => {
    btns.innerText = ""
    for (let i = 0; i < 26; i++) {
        const btn = document.createElement("button")
        btn.innerText = String.fromCharCode(97 + i);
        btn.classList.add("btn")
        btns.append(btn)
        btn.addEventListener("click", (e) => {
           
            if (was[btn.innerText.charCodeAt(0) - 97] === true)
                return
            btn.classList.add("btnclick");
            was[btn.innerText.charCodeAt(0) - 97] = true
            if (wards[choose].ward.indexOf((btn.innerText)) > -1) {
                for (let i = 0; i < wards[choose].ward.length; i++)
                    if (wards[choose].ward.charAt(i) === btn.innerText)
                        gessWard[i] = true;
                box.innerText = ""
                for (let i = 0; i < wards[choose].ward.length; i++) {
                    let kav = document.createElement("div")
                    kav.classList.add("chooseWard")
                    if (wards[choose].ward.charAt(i) == ' ')
                        kav.innerText = '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0'
                    else if (gessWard[i])
                        kav.innerText = wards[choose].ward.charAt(i) + '\u00A0' + '\u00A0';
                    else
                        kav.innerText = '\u00A0' + "_" + '\u00A0'
                    kav.classList.add("letter")
                    box.append(kav)
                }

                win()

            }
            else
               
                fail();
           
        })
    }
}
//שמירת נתונים במערך
const saveData = () => {
    //reset details: count of failuer and success

}
//new game
const newGame = () => {
    dolfin.style.left = 0 + "vw";
    dolfin.style.bottom = 27+"vh";
    dolfin.classList.remove("dolfinSuccess")
    dolfin.classList.remove("dolfinGameOver")
    body.classList.remove("success");
    hangMan.classList.remove("hangManGameOver")
    hangMan.style.left = 38 + "vw";
    hangMan.style.top = 10 + "px";

    hangMan.src = "../pictures/pirate2.png"
    showAll()
    for (let i = 0; i < gessWard.length; i++) {
        gessWard[i] = false;
    }
}
//event of type
//not workink!!!!
// const btnEvent=()=>{
//     if(wards[choose].ward.includes(btn.innerText))
//     alert("yes")
//     elsealert("no")
// }
//new game when click
reset.addEventListener("click", (e) => {
    newGame();
})
//success-win-finish
const win = () => {
    let audioWin = new Audio('../music/success.mp3');
        audioWin.play();
    console.log(audioWin);
    let flag = true;
    for (let i = 0; i < wards[choose].ward.length; i++) {
        if (!gessWard[i])
            flag = false;
    }
    if (flag) {
        saveStatus();
        body.classList.add("success");
        dolfin.classList.add("dolfinSuccess")
        let audioWin1 = new Audio('../music/win.mp3');
        audioWin1.play();
        console.log(audioWin1);
        btns.innerText = "wow!!! amazing! congratulations!!!!!";
        clueBox.innerText = ""
        clue.classList.add("clueHide");
    }

}
//game over
const fail = () => {
    let audioFail = new Audio('../music/error2.mp3');
    audioFail.play();
    console.log(audioFail);
    count++;
    hangMan.style.left = 38 - 1 * count + "vw";
    if (count >= 7) {
        audioFail = new Audio('../music/failure.mp3');
        audioFail.play();
        console.log(audioFail);
        hangMan.src = "../pictures/rotatePirate.png"
        animateHangMan();
        hangMan.style.left = 0+ "vw";
        saveStatus();
        btns.innerText = "Game over!!!!!";
        clueBox.innerText = ""
        body.classList.add("gameOver");
        clueBox.innerText = ""
        clue.classList.add("clueHide");
        startAnimation();
    }

}
//clue
clue.addEventListener("click", (e) => {
    if (clueBox.innerText === "")
        clueBox.innerText = wards[choose].clue
    else
        clueBox.innerText = ""

})

function animateHangMan() {
    let currentPosition = 0; // Initial position in vw units
    let left = 38 - 0.8 * count;
    let interval = setInterval(function () {
        if (currentPosition >=20) {
            hangMan.classList.add("hangManGameOver")
            clearInterval(interval);
            return;
        }
        currentPosition += 1; // Change this value to control the animation speed
        left -= 2;
        hangMan.style.top = currentPosition*0.8 + "vw";
        hangMan.style.left = left*0.8 + "vw";
    }, 20);
}

const dolfin = document.querySelector(".dolfin")
let currentIndex=0;
function changeClassName() {
    if(currentIndex%2===0&&currentIndex<5)
        dolfin.classList.add("dolfinGameOver")
    else
        dolfin.classList.remove("dolfinGameOver")
    currentIndex+=1;
    if(currentIndex<3){
        dolfin.style.left = currentIndex*3+(currentIndex-1)*7+ "vw";
        dolfin.style.bottom = 27-(currentIndex*3+(currentIndex-1)*7)+ "vh";
    }
    
  }

  function startAnimation() {
    currentIndex=0;
    changeClassName();
    intervalId = setInterval(changeClassName, 500);
    setTimeout(stopAnimation, 6000);
  }

  function stopAnimation() {
    clearInterval(intervalId);
    animationDiv.className = "dolfin";
    console.log(animationDiv);
  }
