// grabbing the username input 
const usernameInput = document.querySelector("#username");
// grabbing the password input
const passwordInput = document.querySelector("#username");
// grabbing the signIn button
const signIn = document.querySelector(".usernameLoginBtn");

// Attempting to make the popup change on login persistant. Not working...
let signedIn = undefined

if (signedIn === true){
    const header = document.querySelector(".header")
    header.textContent = `Signed in as ${usernameValue}`
    const button = document.querySelector(".usernameLoginBtn")
    button.textContent = "Sign Out"
}
// chrome.browserAction.setPopup({popup: "./loggedInPopup.html"}); - 
// ^This should point to a new html file for the popup when you sign in but it's reading undefined. Not sure why


// 
function signInFunction(){
    chrome.storage.sync.get("usernameValue", ({usernameValue})=> {
        alert(usernameValue)
        // const header = document.getElementsByTagName("h1");
        // header.textContent = `Signed In as ${usernameValue}`
    })
}

// adding an event listener
signIn.addEventListener("click", () => {
    signedIn = true //attempting to add persistence to the popup

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;
    chrome.storage.sync.set({usernameValue, passwordValue})

    // sending message to content.js to run the monitoring script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {username: usernameValue});
        });

    const header = document.querySelector(".header")
    header.textContent = `Signed in as ${usernameValue}`
    const button = document.querySelector(".usernameLoginBtn")
    button.textContent = "Sign Out"

})

