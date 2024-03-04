//memory
const user = JSON.parse(sessionStorage.getItem("currentUser"));
console.log(user);
const usersList = JSON.parse(localStorage.getItem("users"));
console.log(usersList);
//קבלת הרמה הנוכחית של המשתמש
let currentLevel = JSON.parse(user.games[0].level)
//הודעה על הרמה הנוכחית
const level=document.querySelector(".level")
//מערך מילים לניחוש
const words1 = [
    { word: "transaction", clue: "a deal" },
    { word: "collaborate", clue: "To do an activity together, needs.." },
    { word: "overwhelming", clue: "Crucial,decisive,smashing etc." },
    { word: "satisfaction", clue: "Enjoy and feel good with dids you do" },
    { word: "consequences", clue: "What's causes and Leadings solutions" },
    { word: "siatadishmaia", clue: "we cant live without" },
    { word: "accidentally", clue: "On a mistake" },
    { word: "tremendously", clue: "Very much" },
    { word: "worthwhile", clue: "Its equal" },
    { word: "javascript", clue: "Subject and language..." },
    { word: "uneasiness", clue: "Not comofortable, restlessness" }
]
const words2 = [
    { word: "grief", clue: "Pain,anguish" },
    { word: "hire", clue: "To give a job in your company for men" },
    { word: "formerly", clue: "Previous" },
    { word: "mission", clue: "A thing to perform" },
    { word: "computer", clue: "An item to compute, type ,design forms and more." },
    { word: "hesitate", clue: "To think before any step to do.." },
    { word: "rejoice", clue: "To be happy" },
    { word: "beseech", clue: "Beg!!" },
    { word: "indebted", clue: "To be very gratefull" },
    { word: "flower", clue: "Its so nice!" },
    { word: "quilt", clue: "Blanket" }
]
const words3 = [
    { word: "cat", clue: "Pet" },
    { word: "but", clue: "So, then..." },
    { word: "etc", clue: "And more like those..." },
    { word: "bit", clue: "Item of the computer's memory" },
    { word: "yes", clue: "A positive answer" },
    { word: "name", clue: "Its belong to you!" },
    { word: "sky", clue: "Heaven" },
    { word: "fly", clue: "A bird, an airplain" },
    { word: "zone", clue: "The environment you are" },
    { word: "upon", clue: "On, by" },
    { word: "plot", clue: "The sequence of events in a story, in a play, etc." }
]
let words = []
const newLevel = () => {
    switch (currentLevel) {
        case 1: words = words1.map((element) => {
            return { word: element.word, clue: element.clue }
        })
            break;

        case 2: words = words2.map((element) => {
            return { word: element.word, clue: element.clue }
        })
            break;
        case 3: words = words3.map((element) => {
            return { word: element.word, clue: element.clue }
        })
            break;
    }
}
newLevel();
console.log(words);

let t = words.length - 1;
let count = 0;
const body = document.querySelector("body")
const box = document.querySelector(".chooseWard")
const clue = document.querySelector(".btnClue")
const btns = document.querySelector(".btnLetters")
const clueBox = document.querySelector(".clue")
const reset = document.querySelector(".newGame")
const hangMan = document.querySelector(".hangMan")
let choose = 0;
let insert = ""
let was;
choose = Math.floor(Math.random() * t)
console.log(words[choose].word.length);
let gessWord = [words[choose].word.length]
console.log(gessWord);
for (let i = 0; i < words[choose].word.length; i++)
    gessWord[i] = false
//הצגת פרטים בעת טעינה
document.addEventListener("readystatechange", () => showAll());
//show all
function showAll() {
    was = [26];
    for (let i = 0; i < 26; i++) {
        was[i] = false;
    }
    clueBox.style.display = "none";
    clue.classList.remove("clueHide");
    body.classList.remove("gameOver");
    count = 0;
    choose = Math.floor(Math.random() * t);
    gessWord = [];
    for (let i = 0; i < words[choose].word.length; i++) {
        gessWord[i] = false;
    }
    clueBox.innerText = "";
    showWard();
    createBtn();
}
//הצגת קווים
const showWard = () => {
    box.innerText = "";
    for (let i = 0; i < words[choose].word.length; i++) {
        let kav = document.createElement("div")
        kav.classList.add("chooseWard")
        if (words[choose].word.charAt(i) == ' ')
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
            if (was[btn.innerText.charCodeAt(0) - 97] === true) {
                return
            }
            btn.classList.add("btnclick");
            was[btn.innerText.charCodeAt(0) - 97] = true
            if (words[choose].word.indexOf((btn.innerText)) > -1) {
                for (let i = 0; i < words[choose].word.length; i++)
                    if (words[choose].word.charAt(i) === btn.innerText)
                        gessWord[i] = true;
                box.innerText = ""
                for (let i = 0; i < words[choose].word.length; i++) {
                    let kav = document.createElement("div")
                    kav.classList.add("chooseWard")
                    if (words[choose].word.charAt(i) == ' ')
                        kav.innerText = '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0'
                    else if (gessWord[i])
                        kav.innerText = words[choose].word.charAt(i) + '\u00A0' + '\u00A0';
                    else
                        kav.innerText = '\u00A0' + "_" + '\u00A0'
                    kav.classList.add("letter")
                    box.append(kav)
                }
                win()
            }
            else {
                fail();
            }
        })
    }
}

//new game
const newGame = () => {
    dolfin.style.left = 0 + "vw";
    dolfin.style.bottom = 35 + "vh";
    dolfin.classList.remove("dolfinSuccess")
    dolfin.classList.remove("dolfinGameOver")
    body.classList.remove("success");
    hangMan.classList.remove("hangManGameOver")
    hangMan.style.left = 38 + "vw";
    hangMan.style.top = 10 + "px";
    hangMan.src = "../pictures/pirate2.png"
    showAll()
    for (let i = 0; i < gessWord.length; i++) {
        gessWord[i] = false;
    }
}

//new game when click
reset.addEventListener("click", () => {
    newGame();
})
//success-win-finish
const win = () => {
    let audioWin = new Audio('../music/success.mp3');
    audioWin.play();
    let flag = true;
    for (let i = 0; i < words[choose].word.length; i++) {
        if (!gessWord[i])
            flag = false;
    }
    if (flag) {
        user.games[0].wins++;
        console.log("wins:" + user.games[0].wins);
        //העלאת רמה במקרה שהנצחונות גדולים מ10 
        if (user.games[0].wins === 10) {
            user.games[0].level++
            currentLevel = JSON.parse(user.games[0].level);
            newLevel()
            console.log(words);
            level.innerText = ""
                level.innerText = `You leveled up to level ${user.games[0].level}`
                level.style.display = "block";

        }
        else if (user.games[0].wins === 20) {
            user.games[0].level++
            currentLevel = JSON.parse(user.games[0].level);
            newLevel()
            console.log(words);
            level.innerText = ""
                level.innerText = `You leveled up to level ${user.games[0].level}`
                level.style.display = "block";
        }
        saveStatus();
        body.classList.add("success");
        dolfin.classList.add("dolfinSuccess")
        let audioWin1 = new Audio('../music/win.mp3');
        audioWin1.play();
        btns.innerText = "wow!!! amazing! congratulations!!!!!";
        clueBox.innerText = ""
        clueBox.style.display = "none";
        clue.classList.add("clueHide");
    }
}

//game over
const fail = () => {
    let audioFail = new Audio('../music/error2.mp3');
    audioFail.play();
    count++;
    hangMan.style.left = 38 - 1 * count + "vw";
    if (count >= 7) {
        user.games[0].failed++;
        console.log("failed:" + user.games[0].failed);
        audioFail = new Audio('../music/failure.mp3');
        audioFail.play();
        hangMan.src = "../pictures/rotatePirate.png"
        animateHangMan();
        hangMan.style.left = 0 + "vw";
        saveStatus();
        btns.innerText = "Game over!!!!!";
        clueBox.innerText = ""
        btns.classList.add("gameOver");
        clueBox.innerText = ""
        clueBox.style.display = "none";
        clue.classList.add("clueHide");
        startAnimation();
    }
}
// Update the user's data in local storage
//פונקציה 1  מחפשת באחסון המקומי את המשתמש הנוכחי
const updatedUsersList = usersList.map((e) => {
    if (user.userName === e.userName) {
        return user;
    }
    return e;
});
//  פונקציה 2 מעדכנת את המשתמש הנוכחי באחסון המקומי כפי שהתקבל מפונקציה 1
//וגם מעדכנת בזכרון המקומי
const saveStatus = () => {
    // Store the updated usersList in local storage
    localStorage.setItem("users", JSON.stringify(updatedUsersList));
    // Update currentUser in session storage
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem("users")));
}


//clue
clue.addEventListener("click", (e) => {
    if (clueBox.innerText === "") {
        clueBox.innerText = words[choose].clue
        clueBox.style.display = "block"
    }
    else {
        clueBox.innerText = ""
        clueBox.style.display = "none"
    }

})

function animateHangMan() {
    let currentPosition = 0; // Initial position in vw units
    let left = 38 - 0.8 * count;
    let interval = setInterval(function () {
        if (currentPosition >= 20) {
            hangMan.classList.add("hangManGameOver")
            clearInterval(interval);
            return;
        }
        currentPosition += 1; // Change this value to control the animation speed
        left -= 2;
        hangMan.style.top = currentPosition * 0.8 + "vw";
        hangMan.style.left = left * 0.8 + "vw";
    }, 20);
}

const dolfin = document.querySelector(".dolfin")
console.log("dolfin: " + dolfin);
let currentIndex = 0;
function changeClassName() {
    if (currentIndex % 2 === 0 && currentIndex < 5)
        dolfin.classList.add("dolfinGameOver")
    else
        dolfin.classList.remove("dolfinGameOver")
    currentIndex += 1;
    if (currentIndex < 3) {
        dolfin.style.left = currentIndex * 3 + (currentIndex - 1) * 7 + "vw";
        dolfin.style.bottom = 27 - (currentIndex * 3 + (currentIndex - 1) * 7) + "vh";
    }

}

function startAnimation() {
    currentIndex = 0;
    changeClassName();
    intervalId = setInterval(changeClassName, 500);
    setTimeout(stopAnimation, 6000);
}

function stopAnimation() {
    clearInterval(intervalId);
    dolfin.className = "dolfin";
    console.log(dolfin);
}

//הצגה בעת לחיצה על סמל המשתמש
//קבלת לחצן המשתמש
const openMenu = document.querySelector("#user")
//קבלת המשתנה להכנסת הנתונים
const sidenav = document.querySelector(".sidenav")
console.log(openMenu);
console.log(sidenav);
openMenu.addEventListener("click", () => {
    openNav()
    displayUser()
})
/* Set the width of the side navigation to 250px */
function openNav() {
    sidenav.style.width = "25vw";
}

/* Set the width of the side navigation to 0  */
function closeNav() {
    sidenav.style.width = "0";
}

//פונקציה להצגת שם המשתמש בדף
const d = document.querySelector(".d")
const displayUser = () => {
    if (user != "") {
        d.innerText = `Welcome to us, ${user.userName}`
        d.style.display = "block"
    }
    else {
        d.innerText = ""
        d.style.display = "none"
    }
}

//פונקציה להצגת סטטוס המשתמש בעת לחיצה
const showStatus = document.querySelector(".viewStatus")
console.log(showStatus);
const viewD = document.querySelector(".newDetails")
showStatus.addEventListener("click", e => {
    if (user != "") {
        if (viewD.style.display != "block") {
            viewD.innerText = `your current status- wins: ${user.games[0].wins} failed: ${user.games[0].failed}\n
        The highest score till now was: ${highestScore()}`
            viewD.style.display = "block"
        }
        else {
            viewD.innerText = ""
            viewD.style.display = "none"
        }
    }
    else {
        viewD.innerText = ""
        viewD.style.display = "none"
    }
})
//פונקציה לקבלת הסטטוס הגבוה ביותר
const highestScore = () => {
    //all of the users
    let high = 0;
    usersList.map(element => {
        if (high < element.games[0].wins)
            high = element.games[0].wins
    }
    )
    return high
}
//פונקציה לקבלת הרמה המבוקשת
const inputs = document.querySelectorAll("input")
console.log(inputs);
inputs.forEach((inputEl) => {
    inputEl.addEventListener("change", function () {
        // This code will execute when the radio button selection changes.
        //and when the chooses level is lower or same then the current level allowed
        if (user.games[0].wins >= 10 && user.games[0].wins < 20) {
            if (this.value <= 2) {
                user.games[0].level = this.value;
                level.innerText = ""
                level.innerText = `You are on level ${user.games[0].level}`
                level.style.display = "block";
            }
            else {
                level.innerText = "You cannot advance to a level below your achievements"
                level.style.display = "block";
            }
        }

        else if (user.games[0].wins >= 20) {
            user.games[0].level = this.value;
            level.innerText = ""
            level.innerText = `You are on level ${user.games[0].level}`
            level.style.display = "block";
        }
        else {
            level.innerText = ""
            level.innerText = "You cannot advance to a level below your achievements"
            level.style.display = "block";
        }
        console.log("selected level: " + user.games[0].level);
        //שמירה בזיכרון
        saveStatus();
        //העברה למשחק המתאים
        currentLevel = JSON.parse(user.games[0].level);
        newLevel()
        console.log(words);
    }
    )
})
