const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

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
        console.log(username, color);
        axios
            .get(queryUrl)
            .then(function (response) {
                const {avatar_url, login, location, html_url, blog, bio, public_repos, followers, following} = response.data;
            })
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