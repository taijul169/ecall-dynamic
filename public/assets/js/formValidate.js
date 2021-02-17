// const errorMsg = document.getElementById("error-msg");
// const formLoader = document.getElementById("form-loader");
// const successMsg = document.getElementById("nameDisplay");
// const dataForm = document.getElementById("formData");
// const successMsgBox = document.getElementById("successMsgBox");
// const bgMusk = document.getElementById("bg-musk");
// form-data-initialization
const firstName = document.getElementById("f_name");
const email = document.getElementById("u_email");
const subject = document.getElementById("subject");
const message = document.getElementById("u_message");
const phone = document.getElementById("u_phone");
const service = document.getElementById("service");
const submitBtn = document.querySelector(".submit-message");
const msgBox = document.querySelector(".msg-box");
const loader = document.querySelector(".loader-box");
const loadingArea = document.getElementById("loadingArea");
const errorMsgBox = document.getElementById("errorMsgBox");
const color = "#01A479";
submitBtn.addEventListener("click", (e) => {
  console.log('working!!');
  disLoader();
  hideMsg();
  setTimeout(() => {
    hideLoader();
    checkField();
    disMsg();
  }, 3000);
  
  e.preventDefault();
});
// show-loader
function disLoader() {
  loader.style = "display:block";
}
// hide-loader
function hideLoader() {
  loader.style = "display:none";
}
// hide-success msg
function hideMsg() {
  msgBox.style = "display:none";
}
// hide-success msg
function disMsg() {
  msgBox.style = "display:block";
}


// form-validation
function checkField() {
  if (firstName.value == "") {
    msgBox.innerText = "Please enter your name!!.";
  }
  else if (email.value == "") {
      msgBox.innerText = "Please enter Email Address!!.";
    
  } 
  else if (subject.value == "") {
      msgBox.innerText = "Please enter your Subject!!.";
    
    msgBox.style = "display:block";
  }  else if (message.value == "") {
      msgBox.innerText = "Please write something on Message field!!";
  }  
  else if (phone.value == "") {
    msgBox.innerText = "Please Enter Your Mobile Number!!";
}
 else if (phone.service == "") {
  msgBox.innerText = "Please Select  Your Service!!";
 }
  else {
    msgBox.classList.add("msg-box-success")
    msgBox.innerHTML =`${firstName.value} Your Message has been successfully sent.`;
    
  }
}
