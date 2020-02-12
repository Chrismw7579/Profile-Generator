const fs = require("fs");
const inquirer = require("inquirer");
const axios = require('axios');

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
            console.log(res.data);
            const name = res.data.login;
            const profileImage = res.data.avatar_url;
            const bio = res.data.bio;
            
            // console.log(bio);

            const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
            axios.get(reposUrl)
                .then(repos => {
                    const repoNum = res.data.length;
                })
        })


});