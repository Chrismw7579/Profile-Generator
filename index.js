const fs = require("fs");
const inquirer = require("inquirer");
const axios = require('axios');
const convert = require('electron-html-to');

var conversion = convert({
    converterPath: convert.converters.PDF
  });




inquirer.prompt(
    [
        {
            message: "What is your Github username?",
            name: "username"
        },

        // {
        //     message: "What is your favorite color?",
        //     name: "color"
        // }
    ]
) .then(({username, color}) => {
    const url = `https://api.github.com/users/${username}`; 

    axios.get(url)
        .then(res => {
            // console.log(res.data);
            const name = res.data.login;
            const profileImage = res.data.avatar_url;
            const bio = res.data.bio;
            
            let pdf = '';

            console.log(name);
            console.log(profileImage);
            console.log(bio);
            console.log(res.data.public_repos, "Public Repos");
            console.log(res.data.followers, "followers");
            console.log(res.data.following, "following");

            const starredUrl = `https://api.github.com/users/${username}/starred`;
            axios.get(starredUrl)
                .then(repos => {
                    const starNum = repos.data.length;
                    // console.log('Starred: ' + starNum);

                    pdf = `
                        
                    `


                    conversion({ html: pdf }, function(err, result) {
                        if (err) {
                          return console.error(err);
                        }

                })    
                
            
            
        })
});