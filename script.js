// grabbing the username input 
const usernameInput = document.querySelector("#username");
// grabbing the password input
const passwordInput = document.querySelector("#password");
// grabbing the signIn button
const signIn = document.querySelector(".usernameLoginBtn");


function signInFunction(){

    window.location.href = "/loggedInPopup.html"
    chrome.action.setPopup({popup: "/loggedInPopup.html"})

    const signOut = document.getElementsByClassName("signOut")
    signOut.addEventListener("click", () => {
        window.location.href = "/index.html"
        chrome.action.setPopup({popup: "/index.html"})    
    })

}

// adding an event listener
signIn.addEventListener("click", () => {

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;
    chrome.storage.sync.set({usernameValue, passwordValue})

    //rudimentary password check
    if ((passwordValue === "Password") && (usernameInput.checkValidity())) {
        // sending message to content.js to run the monitoring script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {username: usernameValue});
        });
        
        // changing html file of popup to show logged in
        window.location.href = "/loggedInPopup.html"
        chrome.action.setPopup({popup: "/loggedInPopup.html"});
    } else {alert ("Hint: Username is required, and try \"Password\"")}
})

