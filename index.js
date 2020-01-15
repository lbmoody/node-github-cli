const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
// var conversion = require("phantom-html-to-pdf")();

const questions = [
    {
        type: "input"
        , name: "username"
        , message: "Enter your GitHub username"
    },
    {
        type: "list"
        , name: "color"
        , message: "Which color do you want as the background?"
        , choices: [
            "Green"
            , "Blue"
            , "Pink"
            , "Red"
        ]
    }
];


inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`;
        console.log(color);
        axios
            .get(queryUrl)
            .then(function (response) {
                const {avatar_url, login, location, html_url, blog, bio, public_repos, followers, following} = response.data;
                const html = 
                    `<h1>${login}</h1>
                    <img src="${avatar_url}">
                    <a href="${html_url}">GitHub</a>
                    <p>${location}</p>
                    <p>${color}</p>`
                ;
                var options = { format: 'Letter'};

                pdf.create(html, options).toFile(`./pdfs/${login}.pdf`, function(err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });

            });
    });



// data needed for app
    // - Profile image                          avatar_url
    // - User name                              login
    // - Links to the following:
    //     - User location via Google Maps      location
    //     - User GitHub profile                html_url
    //     - User blog                          blog
    // - User bio                               bio
    // - Number of public repositories          public_repos
    // - Number of followers                    followers
    // - Number of GitHub stars                 
    // - Number of users following              following