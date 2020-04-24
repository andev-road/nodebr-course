console.log("project aula-03.js started");

function getUser(id) {
    return new Promise((resolve, reject) => {
        try {
            const userObj = {
                id: id,
                nome: "André",
                birthday: new Date
            };
            resolve(userObj);
        } catch (err) {
            reject(err);
        }
    });
}

// simulate one core function
async function main() { // async says "im a promise"
    try {
        const usuario = await getUser(1);
        console.log("returned user: ", usuario);
        console.log("i just can run after the getUser beacuse of the await");

        // ******** check it out: ****************************************
        // const results = Promise.all([array of promises]);
        // results[0] is the return from the 1st promise of the array
        // results[1] is the return from the 2nd promise of the array
        // ****************************************************************
    } catch (err) {
        console.log("Log error: ", err);
    }
}

// running everything
main();