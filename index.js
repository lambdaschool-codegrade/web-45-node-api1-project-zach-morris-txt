const server = require('./api/server');

const port = 5000;

server.listen(port, () => {
    console.log(`Server Listening On ${port}`)
})

// START YOUR SERVER HERE
