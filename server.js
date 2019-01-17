// server.js
// load the things we need
const express = require('express');
const path = require('path')
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// set the view engine to ejs
app.set('view engine', 'hbs');
//app.use(express.static(path.join(__dirname, 'public')));

//==================================
// USE WHE APP IS IN MAINTENANCE
// without next(), middlewares block anything after from running
// app.use((req, res, next) => {
//     res.render('pages/maintenance');
// })
//==================================


// express middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    }) ;
    next();
})

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

// use res.render to load up an ejs view file
// .render() will automaticall look in the views dir for the view
// index page
app.get('/', (req, res) => {
    const family = [
        {name: "Mbinintsoa", title:"Dad"},
        {name: "Anna", title:"Mom"},
        {name: "Isaiah", title:"Son"}

    ];
    const enjoyEJS = "Enjoy it!"; 

    res.render('pages/index', {
        family, enjoyEJS
    });
})
// about page
app.get('/about', (req, res) => {
    res.render('pages/about');
})


app.listen(3000, ()=> {
    console.log('Server is listening on port 3000')
})