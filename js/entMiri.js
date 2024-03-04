//כפתור לכניסה למערכת
const login=document.querySelector("#login")
//קבלת משתמש וסיסמת משתמש
const logN = document.querySelector("#nameN")
const logP = document.querySelector("#password")

const registrationN = document.querySelector(".nameN")
const registrationP = document.querySelector(".password")
//קבלת אלמנט להכלת השגיאות בדף
const warning = document.querySelector(".warnings")

// Parse and provide a default empty array if no data is found
const users = JSON.parse(localStorage.getItem("users") || "[]"); 
console.log(users)

const loginS = (e) => {
    e.preventDefault()
    //בדיקה במערך המשתמשים האם קיים כזה שם משתמש
    const user = users.find((el) => el.userName === logN.value);
    //אם קיים, בדיקה אם הסיסמה תואמת
    if (user) {
        if(user.password === logP.value)
            addTosessionStorage(user);
        else {
            registrationN.classList.remove("warnings")
        registrationN.innerHTML = ""
         registrationP.innerHTML=`<i class="fa-solid fa-triangle-exclamation"> This password is'nt correct</i>`
        registrationP.classList.add("warnings")
         return
        }
    } 
    //אחרת, הודעת שגיאה
    else  {
        registrationN.innerHTML=`<i class="fa-solid fa-triangle-exclamation"> This name does'nt existed!</i>`
        registrationN.classList.add("warnings")
        return
    }
   
};

const addTosessionStorage = (user) => {

    //המשתמש הנוכחי נשמר בזכרון הדפדפן
    sessionStorage.setItem("currentUser", JSON.stringify(user))
    //העברה לדף משחקים
    window.location.href ="../html/appMiri.html" ;

}

login.addEventListener("click",loginS)

