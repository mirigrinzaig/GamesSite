
//מערך משתמשים
let users = localStorage.getItem("users");
if (!users) {
    let users = [];
    localStorage.setItem("users", JSON.stringify(users));
    users = JSON.parse(localStorage.getItem("users"));
} else {
    users = JSON.parse(users);
}
console.log(users);

//משתנה לאישור הרישום 
const registration = document.querySelector("#submitS")
//משתנה לקבלת שם משתמש
const registrationN = document.querySelector(".nameN")
const regN = document.querySelector("#nameN")
//משתנה לקבלת מייל משתמש
const registrationE = document.querySelector(".email")
const regE = document.querySelector("#email")
//משתנה לקבלת סיסמה
const registrationP = document.querySelector(".password")
const regP = document.querySelector("#password")
//משתנה לקבלת אימות סיסמה
const registrationPV = document.querySelector(".verification")
const regPV = document.querySelector("#verification")
//קבלת אלמנט להכלת השגיאות בדף
const warning = document.querySelector(".warnings")
//קבלת אלמנט לקבלת המסמך
const detailesUser = document.querySelector(".detailesUser")
console.log(detailesUser);
//פונקציה לבדיקת תקינות אימייל
const isValidEmail = (email) => {
    if (email.indexOf("@") <= 0 || email.lastIndexOf(".") < 0)
        return false
    return true
}

//פונקציה לבדיקה שיש אותיות בלבד
//שימוש בביטוי רגולרי לבדיקת אותיות 
const validName = (name) => {
    return /^[A-Za-z]+$/.test(name)
}

//פונקציה לבדיקה שיש לפחות אות אחת
const containLet = (password) => {
    let letter = /[a-zA-Z]/;
    return letter.test(password)
}

//פונקציה לבדיקה שיש לפחות מספר אחד
const containNum = (password) => {
    let num = /[0-9]/;
    return num.test(password)
}
//פונקציה לבדיקת תקינות הנתונים ושאכן הנתונים מולאו ואינם ריקים

const validaition = (e) => {
    e.preventDefault()
    //בדיקת שם משתמש
    if (regN.value == "") {
        registrationN.innerHTML = `<i class="fa-solid fa-triangle-exclamation"> Enter your given name</i>`
        registrationN.classList.add("warnings")
        return
    }
    else
        if (!validName(regN.value)) {
            registrationN.classList.remove("warnings")
            registrationN.innerHTML = ""
            registrationN.innerHTML = errorName
            registrationN.classList.add("warnings")
            return
        }
        else
            //בדיקה שהמשתמש אינו קיים במערכת
            if (users != []) {
                if (users.find((el) => { return el.userName === regN.value })) {
                    registrationN.classList.remove("warnings")
                    registrationN.innerHTML = ""
                    registrationN.innerHTML = `<i class="fa-solid fa-triangle-exclamation"> This name existed! if you registrated ,enter the home page</i>`
                    registrationN.classList.add("warnings")
                    return
                }
            }
            else {
                registrationN.classList.remove("warnings")
                registrationN.innerHTML = ""
            }

    //בדיקה שהאימייל מלא ותקין
    if (regE.value === "") {
        registrationE.classList.remove("warnings")
        registrationE.innerHTML = ""
        registrationE.innerHTML = `<i class="fa-solid fa-triangle-exclamation"> Enter an email adress</i>`
        registrationE.classList.add("warnings")
        return
    }
    else
        if (!isValidEmail(regE.value)) {
            registrationE.classList.remove("warnings")
            registrationE.innerHTML = ""
            registrationE.innerHTML = errorEmail
            registrationE.classList.add("warnings")
            return
        }
        else {
            registrationE.classList.remove("warnings")
            registrationE.innerHTML = ""
        }

    //בדיקה שהסיסמה מכילה את התווים הרצויים והיא באורך הרצוי
    if (regP.value.length < 8) {
        registrationP.classList.remove("warnings")
        registrationP.innerHTML = ""
        registrationP.innerHTML = errorPass8
        registrationP.classList.add("warnings")
        return
    }
    else
        if (!containLet(regP.value)) {
            registrationP.classList.remove("warnings")
            registrationP.innerHTML = ""
            registrationP.innerHTML = errorPassLet
            registrationP.classList.add("warnings")
            return
        }
        else
            if (!containNum(regP.value)) {
                registrationP.classList.remove("warnings")
                registrationP.innerHTML = ""
                registrationP.innerHTML = errorPassNum
                registrationP.classList.add("warnings")
                return
            }
            else {
                registrationP.classList.remove("warnings")
                registrationP.innerHTML = ""
            }

    //בדיקה שהאימות תואם לסיסמה שהוקשה
    if (!(regPV.value === regP.value)) {
        registrationPV.classList.remove("warnings")
        registrationPV.innerHTML = ""
        registrationPV.innerHTML = `<i class="fa-solid fa-triangle-exclamation"> You entered a password that doesnt match your password</i>`
        registrationPV.classList.add("warnings")
        return
    }
    else {
        registrationPV.classList.remove("warnings")
        registrationPV.innerHTML = ""
    }
    addToUsers()
}

//שגיאות לבדיקת תקינות סיסמה:
//אין אות גדולה בסיסמה
const errorPassLet = `<i class="fa-solid fa-triangle-exclamation"> The password doesn't contain at least one letter</i> `
//אין 8 תווים בסיסמה
const errorPass8 = `<i class="fa-solid fa-triangle-exclamation"> The password does'nt contain at least 8 characters</i>`
//אין מספר בסיסמה
const errorPassNum = `<i class="fa-solid fa-triangle-exclamation"> The password does'nt contain at least one number</i> `
//שגיאות בשם המשתמש
const errorName = `<i class="fa-solid fa-triangle-exclamation"> The name must contain only letters</i>`
//שגיאות באימייל
const errorEmail = `<i class="fa-solid fa-triangle-exclamation"> The email is not valid</i>`

//פונקציה להוספת משתמש למערך הלוקאלי 
const addToUsers = () => {
    let obj = { userName: regN.value, password: regP.value, email: regE.value, games: [{ wins: 0, failed: 0, level: 1 }] }
    console.log((obj));
    addToLocalStorege(obj);
}

const addToLocalStorege = (currentUser) => {
    //מקבלת אובייקט משתמש ומוסיפה אותו בלוקאל סטוריג' בסוף המערך
    users.push(currentUser)
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
    //העברה לדף משחקים
    window.location.href = "../html/applicaition.html";

}

registration.addEventListener("click", validaition)








