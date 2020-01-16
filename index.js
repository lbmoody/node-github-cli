const fs = require("fs")
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
            "green"
            , "blue"
            , "pink"
            , "red"
        ]
    }
];


inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`;
        const colors = {
            green: {
                wrapperBackground: "#E6E1C3",
                headerBackground: "#C1C72C",
                headerColor: "black",
                photoBorderColor: "#black"
            },
            blue: {
                wrapperBackground: "#5F64D3",
                headerBackground: "#26175A",
                headerColor: "white",
                photoBorderColor: "#73448C"
            },
            pink: {
                wrapperBackground: "#879CDF",
                headerBackground: "#FF8374",
                headerColor: "white",
                photoBorderColor: "#FEE24C"
            },
            red: {
                wrapperBackground: "#DE9967",
                headerBackground: "#870603",
                headerColor: "white",
                photoBorderColor: "white"
            }
        };

        axios
            .get(queryUrl)
            .then(function (response) {
                const {avatar_url, login, location, html_url, name, company, blog, bio, public_repos, followers, following} = response.data;
                // console.log(response.data);
                const html = 
                    `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                        <title>Document</title>
                        <style>
                            @page {
                                margin: 0;
                            }
                            *,
                            *::after,
                            *::before {
                                box-sizing: border-box;
                            }
                            html, body {
                                padding: 0;
                                margin: 0;
                            }
                            html, body, .wrapper {
                                height: 100%;
                            }
                            .wrapper {
                                background-color: ${colors[color].wrapperBackground};
                                padding-top: 100px;
                            }

                            .bottom {
                                background-color: ${colors[color].wrapperBackground};
                                padding-top: 200px;
                                height: auto;
                            }

                            body {
                                background-color: white;
                                -webkit-print-color-adjust: exact !important;
                                font-family: 'Cabin', sans-serif;
                            }
                            main {
                                background-color: #e9edee !important;
                                height: auto;
                                padding-top: 30px;
                            }
                            h1, h2, h3, h4, h5, h6 {
                                font-family: 'BioRhyme', serif;
                                margin: 0;
                            }
                            h1 {
                                font-size: 3em;
                            }
                            h2 {
                                font-size: 2.5em;
                            }
                            h3 {
                                font-size: 2em;
                            }
                            h4 {
                                font-size: 1.5em;
                            }
                            h5 {
                                font-size: 1.3em;
                            }
                            h6 {
                                font-size: 1.2em;
                            }
                            .photo-header {
                                position: relative;
                                margin: 0 auto;
                                margin-bottom: -50px;
                                display: flex;
                                justify-content: center;
                                flex-wrap: wrap;
                                background-color: ${colors[color].headerBackground};
                                color: ${colors[color].headerColor};
                                padding: 10px;
                                width: 95%;
                                border-radius: 6px;
                            }
                            .photo-header img {
                                width: 250px;
                                height: 250px;
                                border-radius: 50%;
                                object-fit: cover;
                                margin-top: -75px;
                                border: 6px solid ${colors[color].photoBorderColor};
                                box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                            }
                            .photo-header h1, .photo-header h2 {
                                width: 100%;
                                text-align: center;
                            }
                            .photo-header h1 {
                                margin-top: 10px;
                            }
                            .links-nav {
                                width: 100%;
                                text-align: center;
                                padding: 20px 0;
                                font-size: 1.1em;
                            }
                            .nav-link {
                                display: inline-block;
                                margin: 5px 10px;
                            }
                            .workExp-date {
                                font-style: italic;
                                font-size: .7em;
                                text-align: right;
                                margin-top: 10px;
                            }
                            .container {
                                padding: 50px;
                                padding-left: 100px;
                                padding-right: 100px;
                            }

                            .card {
                                padding: 30px;
                                border-radius: 6px;
                                background-color: ${colors[color].headerBackground};
                                color: ${colors[color].headerColor};
                                margin: 40px;
                                text-align: center;
                            }
                            
                            a, a:hover {
                                text-decoration: none !important;
                                color: inherit;
                                font-weight: bold;
                            }

                            @media print { 
                                body { 
                                    zoom: .75; 
                                } 
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="wrapper">
                                <div class="photo-header">
                                    <img src="${avatar_url}">
                                    <h1>Hi!</h1>
                                    <h2>My name is ${name}</h2>
                                    <div class="my-3 text-center">
                                        <h6>Currently @ ${company}</h6>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col text-right">
                                            <a><i class="fas fa-location-arrow"></i>${location}</a>
                                        </div>
                                        <div class="col text-center">
                                            <a href="${html_url}"><i class="fab fa-github"></i> GitHub</a>
                                        </div>
                                        <div class="col text-left">
                                            <a href="${blog}"><i class="fas fa-blog"></i>Blog</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main mt-5 pt-3 px-3">
                                <div>
                                    <h4 style="text-align: center;">${bio}</h4>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-6">
                                        <div class="card m-0">
                                            <h4 class="mb-2">Public Respositories</h4>
                                            <h6>${public_repos}</h6>
                                        </div>
                                    </div>    
                                    <div class="col-6">
                                        <div class="card m-0">
                                            <h4 class="mb-2">Followers</h4>
                                            <h6>${followers}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4 mb-5">
                                    <div class="col-6">
                                        <div class="card m-0">
                                            <h4 class="mb-2">GitHub Stars</h4>
                                            <h6>***</h6>
                                        </div>
                                    </div>    
                                    <div class="col-6">
                                        <div class="card m-0">
                                            <h4 class="mb-2">Following</h4>
                                            <h6>${following}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                            </div>
                        </div>
                    </body>
                    </html>`
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