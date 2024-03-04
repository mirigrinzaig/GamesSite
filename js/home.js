//סמל התפריט
const bar=document.getElementById("bar")
//אירוע בעת לחיצה על התפריט
bar.addEventListener("click",(e)=>{
    window.location.href ="../html/menu.html";
})
 
const article=document.querySelector(".article")
console.log(article);
article.addEventListener("scroll",()=>{
    article.classList.add("withoutBlack");
})

