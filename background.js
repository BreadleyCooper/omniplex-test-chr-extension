let localStorageArray = []

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({localStorageArray})
    console.log("local storage initialised")
})