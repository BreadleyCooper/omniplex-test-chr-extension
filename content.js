// on receiving a message from the sign in event listener.
// This code will run that will modify the current tabs html and add the button on the bottom right after 5s of inactivity

chrome.runtime.onMessage.addListener(monitor);

// variable to switch when ovelay is active to prevent the overlay repeating on itself
let timedOutCheck = false

function monitor(message) {
    console.log(message)
    let time;
    resetTimer();
    let events = ["mousemove", "keypress", "keydown", "scroll", "click"]
    events.forEach(function(element) {
        document.addEventListener(element, resetTimer, true)
    })

    // executed when 5s have passed with no input
    function timedOut(){
        if (timedOutCheck === true){return} else {
            // create the elements for the alert
            const alertPopupContainer = document.createElement("div")
            const alertPopupText = document.createElement("p")
            const alertPopupButtonContainer = document.createElement("div")
            const alertPopupButtonYes = document.createElement("button")
            const alertPopupButtonNo = document.createElement("button")

            alertPopupText.textContent = `Are you lost, ${message.username}?`

            alertPopupButtonYes.textContent = "Yes"
            alertPopupButtonNo.textContent = "No"

            
            
            // toggle their css classes
            alertPopupContainer.classList.toggle("alertPopupContainer")
            alertPopupText.classList.toggle("alertPopupText")
            alertPopupButtonContainer.classList.toggle("alertPopupButtonContainer")
            alertPopupButtonYes.classList.toggle("alertPopupButtonYes")
            alertPopupButtonNo.classList.toggle("alertPopupButtonNo")

            // append to the container
            alertPopupContainer.append(alertPopupText, alertPopupButtonContainer)
            alertPopupButtonContainer.append(alertPopupButtonYes, alertPopupButtonNo)

            // adding event listeners
            alertPopupButtonYes.addEventListener("click", () => {
                timedOutCheck = false;
                alertPopupContainer.remove();
                monitor();
                window.open("https://help.nickelled.com", "_blank")
            })
            alertPopupButtonNo.addEventListener("click", () => {
                timedOutCheck = false;
                alertPopupContainer.remove();
                monitor();
            })
            // append to the body
            document.body.append(alertPopupContainer)
            timedOutCheck = true
        }}

    function resetTimer() {
        clearTimeout(time)
        time = setTimeout(timedOut, 5000)
    }
}