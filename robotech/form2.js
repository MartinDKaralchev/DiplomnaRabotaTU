const form = document.querySelector("form");
const names=document.getElementById("names");
const email=document.getElementById("email");
const subject=document.getElementById("subject");
const que=document.getElementById("que");


function sendEmail(){
    const bodyMessage=`Имена: ${names.value} <br> Поща: ${email.value} <br> Тема: ${subject.value} <br> Текст: ${que.value} `
    
    Email.send({
        SecureToken :"d0f5629d-e491-4d60-b728-173e3587afd5",
        To : 'robotechkj@gmail.com',
        From : "robotechkj@gmail.com",
        Subject : "Ново събщение",
        Body : bodyMessage
    }).then(
      message => {
        if(message=="OK"){
            Swal.fire({
                title: "Готово!",
                text: "Ще Ви отговорим възможно най- скоро!",
                icon: "success"
            })
        }
      }
    );
}

function checkInputs(){
    const items=document.querySelectorAll(".item")

    for(const item of items){
        if(item.value==""){
            item.classList.add("error");
            item.parentElement.classList.add("error")
        }
        if(items[1].value !=""){
            checkEmail();
        }
        items[1].addEventListener("keyup", ()=>{
            checkEmail();

        });
        item.addEventListener("keyup", ()=>{
            if(item.value != ""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error")
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error")
            }
        })
    }
}


function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?/;
    const errorTxtEmail=document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");
        
        if(email.value!=""){
            errorTxtEmail.innerText="Въведи правилна поща";
        }
        else{
            errorTxtEmail.innerText="Празно поле";
        }
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
} 


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    checkInputs()
    if(!names.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !que.classList.contains("error")){
        sendEmail();
        form.reset();       
        return false;
    }else {
        Swal.fire({
            title: "Грешка!",
            text: "Има празни полета",
            icon: "error"
        });
    }
   
    //sendEmail();
});