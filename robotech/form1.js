const form = document.querySelector("form");
const parentName=document.getElementById("parentName");
const parentEmail=document.getElementById("parentEmail");
const parentPhone=document.getElementById("parentPhone");
const studentName=document.getElementById("studentName");
const studentClass=document.getElementById("studentClass");
const correntCour=document.getElementById("h2").innerText;

// Деклариране на променлива за оставащите места
let remainingSeats = 1;// Започваме с 6 места
document.getElementById("remainingSeats").innerHTML = `${remainingSeats}<br> Места`;

// Функция за намаляване на броя на местата
function decreaseSeats() {
    

    if (remainingSeats > 0) {        
        remainingSeats--;
        document.getElementById("remainingSeats").innerHTML = `${remainingSeats}<br> Места`;
    }
}

function sendEmail(){
    const bodyMessage=`Имена на родителя: ${parentName.value} <br> Телефон на родител: ${parentPhone.value} <br> Поща на родител: ${parentEmail.value} <br> Имена на детето: ${studentName.value} Клас: ${studentClass.value} <br> Се записва за курс: ${correntCour} `
    
    Email.send({
        SecureToken :"d0f5629d-e491-4d60-b728-173e3587afd5",
        To : 'robotechkj@gmail.com',
        From : "robotechkj@gmail.com",
        Subject : "Ново дете",
        Body : bodyMessage
    }).then(
      message => {
        if(message=="OK"){
            Swal.fire({
                title: "Готово!",
                text: "Нека приключението започне!",
                icon: "success"
            }).then(() => {
                decreaseSeats(); // Намалете броя на местата
                /*if (remainingSeats === 0) {
                    form.querySelector('button[type="submit"]').disabled = true; // Деактивирайте бутона за подаване
                    
                }*/
            });
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

    if (!parentEmail.value.match(emailRegex)){
        parentEmail.classList.add("error");
        parentEmail.parentElement.classList.add("error");
        
        if(parentEmail.value!=""){
            errorTxtEmail.innerText="Въведи правилна поща";
        }
        else{
            errorTxtEmail.innerText="Празно поле";
        }
    }
    else{
        parentEmail.classList.remove("error");
        parentEmail.parentElement.classList.remove("error");
    }
} 


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (remainingSeats > 0) { // Проверете дали има налични места
        checkInputs();
        if (!parentName.classList.contains("error") && !parentEmail.classList.contains("error") && !parentPhone.classList.contains("error") && !studentName.classList.contains("error") && !studentClass.classList.contains("error")) {
            sendEmail();
            form.reset();
            return false;
        }
    } else {
        Swal.fire({
            title: "Грешка!",
            text: "Всички места са заети!",
            icon: "error"
        });
    }

    
});

/*checkInputs()
    if(!parentName.classList.contains("error") && !parentEmail.classList.contains("error") && !parentPhone.classList.contains("error") && !studentName.classList.contains("error") && !studentClass.classList.contains("error")){
        sendEmail();
        form.reset();       
        return false;
    }
   
    //sendEmail();*/