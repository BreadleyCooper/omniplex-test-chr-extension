// on receiving a message from the sign in event listener.
// This code will run that will modify the current tabs html and add the button on the bottom right after 5s of inactivity

chrome.runtime.onMessage.addListener(monitor);

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
        // create the elements for the alert
        const alertPopupContainer = document.createElement("div")
        const alertPopupText = document.createElement("p")
        const alertPopupButtonYes = document.createElement("button")
        const alertPopupButtonNo = document.createElement("button")

        alertPopupText.textContent = `Are you lost, ${message.username}?`

        alertPopupButtonYes.textContent = "Yes"
        alertPopupButtonNo.textContent = "No"

        
        
        // toggle their css classes
        alertPopupContainer.classList.toggle("alertPopupContainer")
        alertPopupText.classList.toggle("alertPopupText")
        alertPopupButtonYes.classList.toggle("alertPopupButtonYes")
        alertPopupButtonNo.classList.toggle("alertPopupButtonNo")

        // append to the container
        alertPopupContainer.append(alertPopupText, alertPopupButtonYes, alertPopupButtonNo)
        // append to the body
        document.body.append(alertPopupContainer)
    }

    function resetTimer() {
        clearTimeout(time)
        time = setTimeout(timedOut, 5000)
    }
}