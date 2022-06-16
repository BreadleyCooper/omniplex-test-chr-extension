// array to hold log in objects for saving into local storage.
let localStorageArray = []

// factory function to create an object that contains the login details.

function User (username, password) {
    this.username = username;
    this.password = password;
    this.storeDetails = function() {
        localStorageArray.push(this)
    }
}

