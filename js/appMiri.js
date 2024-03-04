//הצגת שם משתמש נוכחי
const currentUser1=document.querySelector(".currentUser1")
const currentUser2=document.querySelector(".currentUser2")
console.log(currentUser1);
let user=JSON.parse(sessionStorage.getItem("currentUser")) || 0
console.log(user);
//פונקציה להצגת שם המשתמש בדף
const displayUser=(e)=>{
    currentUser1.innerHTML=`name: ${user.userName} , `
    currentUser2.innerHTML=`status: ${user.statusBar}`
}
displayUser()
// (לדף הראשי) יציאה מהדף
const exit=document.querySelector(".exit")
console.log(exit);
exit.addEventListener("click",e=>{
   window.location.href = "../html/homeMiri.html";
})
// כניסה למשחק מסוים 
//או שהמשחק בבניה/ חסום ע"י נטפרי
//או שהמשחק לא רשום כמשתמש נוכחי ואז חוסמים לו את הגישה
//קבלת משתנה לכניסה למשחק (צריך לכאורה להיות לכל משחק בנפרד? כי אם לא איך נדע איזה משחק שייך למי ולאן להעביר אותו?)
const game1=document.querySelector(".game1")
const game2=document.querySelector(".game2")
const game3=document.querySelector(".game3")
const game4=document.querySelector(".game4")
const game5=document.querySelector(".game5")
const game6=document.querySelector(".game6")
game1.addEventListener("click",()=>{
    window.location.href = "../html/gameMiri.html";
})
game2.addEventListener("click",()=>{
    notExist()
})
game3.addEventListener("click",()=>{
    notExist()
})
game4.addEventListener("click",()=>{
    notExist()
})
game5.addEventListener("click",()=>{
    notExist()
})
game6.addEventListener("click",()=>{
    notExist()
})
const notExist=()=>{
    window.location.href = "../html/j.html";
}

