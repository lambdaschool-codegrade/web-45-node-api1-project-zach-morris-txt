// BUILD YOUR SERVER HERE


//Imports
const express = require('express')
const User = require('./users/model.js') //Object W/ Methods


//Instance Of Express
const server = express()


//Global Middleware
server.use(express.json()) //Allows Express JSON Compatibility


//Endpoints
        //[POST]
server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ 
            message: "Please provide name and bio for the user" })
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: "There was an error while saving the user to the database" })
        })
    }
})

        //[GET]
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: "The users information could not be retrieved" })
        })
})

        //[GET] ID
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ 
                    message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: "The user information could not be retrieved" })
        })
})

        //[DELETE] ID
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ 
                    message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: "The user could not be removed" })
        })
})

        //[PUT] ID
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    const result = await User.update(id, changes)

    try {
        if(result) {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user" })
            } else {
                res.status(200).json(result)
            }
        } else{
            res.status(404).json({
                message: "The user with the specified ID does not exist" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            message: "The user information could not be modified" })
    }
})

        //Catchall
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Sorry, Not Found'
    })
})


//Exports (Exposing Modules)
module.exports = server; // EXPORT YOUR SERVER instead of {}
