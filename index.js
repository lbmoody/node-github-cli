const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

// inquirer questions
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

// inquirer package used to ask the user question in cli
inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`;
        // color array used when user answers inquirer questions
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

        // api call made against github api
        axios
            .get(queryUrl)
            .then(function ({data}) {

                // setting variables from axios call
                const { avatar_url, login, location, html_url, name, company, blog, bio, public_repos, public_gists, followers, following} = data;
                console.log(data);

                // massive html template literal to use for generating pdf
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
                            .main {
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
                                            <a href="http://maps.google.com/maps?q=${location.split(' ').join('+')}"><i class="fas fa-location-arrow"></i>${location}</a>
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
                            <div class="main pt-5 pb-1 px-3 mb-0">
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
                                            <h6>${public_gists}</h6>
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

                // set options for pdf type
                var options = { format: 'Letter'};

                // generate pdf document from html template and options. Also sets file location
                pdf.create(html, options).toFile(`./pdfs/${login}.pdf`, function(err, res) {
                    if (err) return console.log(err);
                    console.log('Github snapshot successfully created!');
                    console.log(res);
                });

            });
    });
