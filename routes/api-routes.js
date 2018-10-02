const db = require('../model');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function (app) {
    // Route for retrieving all Inventory from the database via a GET request
    app.get('/api/todoList', function (req, res) {
        // Find all Inventory
        db.todoList.find({})
            .then(function (dbtodoList) {
                // If all Inventory are successfully found, send them back to the client
                res.json(dbtodoList);
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });
    });

    // Route for saving a new Inventory entry to the database via a POST request
    app.post('/api/todoList', function (req, res) {
        // Create a new Inventory entry in the database
        db.todoList.create(req.body)
            .then(function (dbtodoList) {
                // Then send the results to the client
                res.json(dbtodoList);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });

    // Route for saving updates to inventory
    app.put('/api/todoList', function (req, res) {
        db.todoList.findOneAndUpdate({content: req.body.content}, {$set: {isChecked: req.body.isChecked}})
            .then(function (dbtodoList) {
                // Then send the results to the client
                res.json(dbtodoList);
            })
            .catch(function(err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });

    app.delete('api/todoList', function (req,res) {
        db.todoList.findOneAndDelete({content: req.body.content})
        .then(function (dbtodoList) {
            // If all Inventory are successfully found, send them back to the client
            res.json(dbtodoList);
        })
        .catch(function (err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
});
};