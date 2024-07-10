
$(".addbtn").on("click",function(){
    $(".addnewcontact").show()
    $(".form").addClass("overlay")
})

$(".fa-window-close").on("click",function(){
    $(".addnewcontact").hide(100);
    $(".form").removeClass("overlay")
    })



    
let nameInpute = document.querySelector("#contact_for-name")
let phoneInpute = document.querySelector("#contact_for-phone")
let emailInpute = document.querySelector("#contact_for-email")
let adressInpute = document.querySelector("#contact_for-addres")
let saveBtn = document.querySelector(".save-btn")


let savedata = localStorage.getItem("contact");
let contactList = JSON.parse(savedata || "[]");
displayContact()

    let lastId = contactList.length;


    function getValue(){
       contactList.push({
        id : contactList.length +1,
        name : nameInpute.value,
        phone : phoneInpute.value,
        email : emailInpute.value,
        adress:  adressInpute.value,
    })
    }


    function displayContact(){
        tr = "";
        contactList.forEach(contact => {
            tr += `
            <tr data-id=${contact.id}>
            <td>${contact.id}</td>
            <td>${contact.name || ''}</td>
            <td>${contact.phone || ''}</td>
            <td>${contact.email || ''}</td>
            <td>${contact.adress || ''}</td>   
            <td class="green">Edit</td>
            <td class="red">delete</td>
            </tr>
            `;
        });
        document.querySelector("#tbody").innerHTML = tr
        }

function clearform(){
  nameInpute.value = "";
   phoneInpute.value = "";
   emailInpute.value = "";
   adressInpute.value = "";
}

        function saveBtnHandelar(){
            $(".addnewcontact").hide(100);
            $(".form").removeClass("overlay")
            localStorage.setItem("contact",JSON.stringify(contactList))
            getValue()
            displayContact()
            clearform()
        }
        saveBtn.addEventListener("click", saveBtnHandelar)

 // Edite btn
        document.querySelector("#tbody").addEventListener("click",(e)=>{
          if(e.target.classList.contains("green")){
            let tr = e.target.parentElement;
            let id = tr.dataset.id;
            let index = id -1 ;
            nameInpute.value = contactList[index].name ;
            phoneInpute.value = contactList[index].phone;
            emailInpute.value = contactList[index].email;
            adressInpute.value = contactList[index].adress;
            $(".addnewcontact").show()
            $(".form").addClass("overlay")
   // update handelar  
   let updateHandelar = ()=>{
    let updateContact = {
        id : parseInt(id),
        name : nameInpute.value,
        phone : phoneInpute.value,
        email : emailInpute.value,
        adress:  adressInpute.value
    }
    contactList[index] = updateContact;
    localStorage.setItem("contact",JSON.stringify(contactList))
    clearform()
    displayContact()
    $(".addnewcontact").hide(100);
    $(".form").removeClass("overlay")
    saveBtn.removeEventListener("click",updateHandelar);
    saveBtn.addEventListener("click",saveBtnHandelar) 
}
    saveBtn.removeEventListener('click',saveBtnHandelar)
    saveBtn.addEventListener('click',updateHandelar)
}

// delete
if(e.target.classList.contains("red")){
    let tr = e.target.parentElement;
    let id = tr.dataset.id;
    let index = contactList.findIndex(contact => contact.id === parseInt(id));
    contactList.splice(index,1);
    localStorage.setItem("contact",JSON.stringify(contactList));
    displayContact();
}

})

// search 

let searchinput = document.getElementById("search");
let form = searchinput.parentElement;
let trs = document.querySelectorAll("tbody tr");
form.addEventListener('submit',e=> e.preventDefault())
searchinput.addEventListener('keyup',()=>{
    let searchinputvalue = searchinput.value;
    trs.forEach(tr=>{
        trName = tr.children[1].textContent;
        if(trName.includes(searchinputvalue)){
            tr.style.display = "";
        }else{
            tr.style.display = "none"; 
        }
    })
});





     



      
    
