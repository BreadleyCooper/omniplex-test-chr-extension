chrome.storage.sync.get(["usernameValue"], function(obj) {
    const header = document.querySelector(".header")
    header.textContent = `Hi, ${obj.usernameValue}`
})

const signOut = document.querySelector(".signOut")
signOut.addEventListener("click", () => {
    chrome.storage.sync.clear()
    window.location.href = "/index.html"
    chrome.action.setPopup({popup: "/index.html"})    
})
