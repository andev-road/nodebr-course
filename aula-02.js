console.log("project aula-02.js started");

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                var userObj = {
                    id: id, // to test the reject callback, just change the value to any var that doesnt exists
                    name: 'André',
                    birthday: new Date()
                };
                resolve(userObj);
            } catch (err) {
                reject(err);
            }
        }, 1000);  
    });
}

getUser(1).then((result) => {
    console.log("retorned user: ", result);
}).catch((err) => {
    console.log("log error: ", err);
});