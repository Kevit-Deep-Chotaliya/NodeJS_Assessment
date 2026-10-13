const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

// Handler 1
eventEmitter.on('userRegistered', (user) => {
    setTimeout(() => {
        console.log(`Email sent to ${user.email}`);
    }, 1000);
});

// Handler 2
eventEmitter.on('userRegistered', (user) => {
    setTimeout(() => {
        console.log(`Profile created for ${user.name}`);
    }, 500);
});

// Handler 3
eventEmitter.on('userRegistered', (user) => {
    setTimeout(() => {
        console.log(`Activity logged for user ${user.id}`);
    }, 200);
});

function registerUser(user) {
    console.log('Registration Successfull!!');

    eventEmitter.emit('userRegistered', user);
}

registerUser({
    id : 101,
    name : 'Rahul',
    email : 'rahul@example.com'
});