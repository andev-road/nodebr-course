console.log("project aula-04.js started");

// core
const EventEmitter = require('events');

// generating my class (to override what i need)
class Emitter extends EventEmitter {

}

// creating my event observable
const emitter = new Emitter();
const eventName = "user:click";
emitter.on(eventName, (event) => { // jquery devs feeling old right now
    console.log("*** event fired: ", event);
});

// simulate my event (emit)
var toggle = false;
setInterval(() => {
    if (toggle)
        emitter.emit(eventName, { _timestamp: new Date(), _id: 'fake-event', _target: '#container' });
    else
        emitter.emit(eventName, { _timestamp: new Date(), _id: 'fake-event', _target: '#user' });

    toggle = !toggle;
}, 1000);