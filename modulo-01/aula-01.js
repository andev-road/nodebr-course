function getUser(id, callback) {
    setTimeout(() => {
        try {
            callback(null, {
                id: id, // change for any var name that doesnt exists to test the callback error
                name: "André",
                birthday: new Date()
            });
        } catch (err) {
            callback(err, null);
        }
    }, 1000);
}

function callbackGetUser(error, user) {
    if (error) { // that means diff from null, '' and 0
        console.log("Error log: ", error);
    } else {
        console.log("User log: ", user);
    }
}

getUser(1, callbackGetUser);