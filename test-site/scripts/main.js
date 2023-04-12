const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/sakura.jpg") {
    myImage.setAttribute("src", "images/sakura2.jpg");
  } else {
    myImage.setAttribute("src", "images/sakura.jpg");
  }
};

//Change user
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
function setUserName() {
    const myName = prompt("What's your name?");
    if(!myName){
        setUserName();
    } else{
        localStorage.setItem("name", myName);
        myHeading.textContent = `Welcome to hanami, ${myName}!`;
    }
    
}

//It runs when the web first load
if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Welcome to hanami, ${storedName}`;
}

myButton.onclick = () => {
    setUserName();
  };

  