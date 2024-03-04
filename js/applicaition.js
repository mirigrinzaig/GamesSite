
//memory
const user = JSON.parse(sessionStorage.getItem("currentUser")) || "";
// (לדף הראשי) יציאה מהדף
const exit = document.querySelector("#exit")
exit.addEventListener("click", e => {
    window.location.href = "../html/home.html";
})
// כניסה למשחק מסוים 
//או שהמשחק בבניה/ חסום ע"י נטפרי
//או שהמשחק לא רשום כמשתמש נוכחי ואז חוסמים לו את הגישה
const game1 = document.querySelector(".game1")
const game2 = document.querySelector(".game2")
const game3 = document.querySelector(".game3")
const game4 = document.querySelector(".game4")
const game5 = document.querySelector(".game5")
const game6 = document.querySelector(".game6")
game2.addEventListener("click", () => {
    if(moveToGame()){
    window.location.href = "../html/game.html";
    }
    else{
alert("You are not registered as a user")
    }
})
game1.addEventListener("click", () => {
    if(moveToGame()){
    notExist()
    }
    else{
        alert("You are not registered as a user")
    }
})
game3.addEventListener("click", () => {
    if(moveToGame()){
        notExist()
        }
        else{
            alert("You are not registered as a user")
        }
})
game4.addEventListener("click", () => {
    if(moveToGame()){
        notExist()
        }
        else{
            alert("You are not registered as a user")
        }
})
game5.addEventListener("click", () => {
    if(moveToGame()){
        notExist()
        }
        else{
            alert("You are not registered as a user")
        }
    })
game6.addEventListener("click", () => {
    if(moveToGame()){
        notExist()
        }
        else{
            alert("You are not registered as a user")
        }
    })
const notExist = () => {
    window.location.href = "../html/j.html";
}
//פונקציה לבדיקה איזה משחק זה ומעבר לדף המתאים. אם המשתמש לא רשום (תופיע לו הודעת חסימה) והוא לא יוכל לעבור
const moveToGame = () => {
    if (user === "") {
        return false;
    }
    else {
        return true;
    }
}
//פונקציה להצגת שם המשתמש בדף
const d=document.querySelector(".d")
const displayUser = () => {
    if (user != "") {
        d.innerText = `Welcome to us, ${user.userName}`
        d.style.display="block"
    }
    else {
        d.innerText = "Welcome to us!"
        d.style.display="block"
    }
}
displayUser()