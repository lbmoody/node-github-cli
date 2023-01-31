# node-github-cli
Command line application using node, github api, inquirer, and html to pdf generation

## installation
This project uses 3 npm packages: [axios](https://www.npmjs.com/package/axios), [inquirer](https://www.npmjs.com/package/inquirer), and [html-pdf](https://www.npmjs.com/package/html-pdf). after downloading the project please run `npm i` or `npm install` to download these dependancies.

## usage
The application requires you to have or know a user's github username. This is a command line application that will prompt the user through inquirer to enter a github username.

`What is your github username:`

Then it will prompt the user with a second question which will apply a unique color backaground to a pdf generated based off that users github account.

`Which color do you want as the background?`

After these questions are answered the application will make a call to the github api with the user name entered and create a pdf in the `/pdfs` folder in the repository. A sample of the pdf generated can be viewed in the repo [here](https://github.com/lbmoody/node-github-cli/blob/master/pdfs/lbmoody.pdf).

## API References
This project also uses the github api. Documentation for the github api can be found [here](https://developer.github.com/v3/).
