AOS.init();

const navBar = document.querySelector("nav");
const resMenu = document.querySelector(".nav_tabs2")

const toggleBtn= document.querySelector("nav i");

const navBarLink = document.querySelectorAll(".nav_tabs2 li");
for (let i = 0; i < navBarLink.length; i++) {
  navBarLink[i].addEventListener("click",()=>{
    resMenu.classList.remove("show");
    toggleBtn.classList.remove("fa-xmark");
  })
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    navBar.style.background="rgba(255, 255, 255, 0.26)";
    navBar.style.backdropFilter="blur(5px)";
  } else {
    navBar.style.background="transparent";
    navBar.style.backdropFilter="blur(0px)";
  }
});

toggleBtn.addEventListener("click",()=>{
    toggleBtn.classList.toggle("fa-xmark");
    resMenu.classList.toggle("show");
})


document.addEventListener("mousemove", parallax);

function parallax(e) {
    this.querySelectorAll(".image").forEach((shift) => {
        const position = shift.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX * position) / 90;
        const y = (window.innerHeight - e.pageY * position) / 90;

        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}



const firebaseConfig = {
  apiKey: "AIzaSyBxwXUKtXiDxet5lDjAgEUAA9x5XipdRiE",
  authDomain: "cswdweb-a610c.firebaseapp.com",
  databaseURL: "https://cswdweb-a610c-default-rtdb.firebaseio.com",
  projectId: "cswdweb-a610c",
  storageBucket: "cswdweb-a610c.appspot.com",
  messagingSenderId: "156334956420",
  appId: "1:156334956420:web:e9e3a19cf6ee05c473c7d1",
  measurementId: "G-WWBNTP1V5Y"
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();

  var firstName = getElementVal("firstName");
  var lastName = getElementVal("lastName");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(firstName, lastName, emailid, msgContent);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("form").reset();
}

const saveMessages = (firstName, lastName, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    firstName: firstName,
    lastName: lastName,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};