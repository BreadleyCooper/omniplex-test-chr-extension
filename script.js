// grabbing the username input 
const usernameInput = document.querySelector("#username");
// grabbing the password input
const passwordInput = document.querySelector("#username");
// grabbing the signIn button
const signIn = document.querySelector(".usernameLoginBtn");

// function to run after succesful sign in
function signedIn() {
    alert ("Succesfully signed in!")
}

// function to check password match
function checkPassword(){
    alert("checkpassword is fired")
    chrome.storage.sync.get("passwordValue", ({passwordValue}) => {
        if (passwordValue === "Password"){
            signedInCheck = true;
            signedIn()
        } else {alert("Hint: password is Password")}
    })
}
// function to call on signIn button - because I'm calling this function in the .executeScript API, eveything needs to be in here (spaghetti code time... not sure if there's a better way to do this...)
function signInFunction(){
    chrome.storage.sync.get(["usernameValue", "passwordValue"], function(user) {
        alert (user.usernameValue)
        alert (user.passwordValue) //THIS IS ANNOYING! NEED TO FIND A WAY TO ACCESS BOTH INPUTS
    })
}


// adding an event listener
signIn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;
    chrome.storage.sync.set({usernameValue, passwordValue})

    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        function: signInFunction,
    })
})

// // array to hold log in objects for saving into local storage.
// let localStorageArray = []

// function createUserObject(username, password){
//     username = usernameInput.value;
//     password = passwordInput.value;
//     chrome.storage.sync.set({"username":username, "password":password})
// }


// adding the event listener to the signIn button

// signIn.addEventListener("click", () => {
//     createUserObject();
//     console.log(localStorageArray)
// })