const fs = require("fs-extra");
const inquirer = require("inquirer");
const axios = require('axios');
const puppeteer = require('puppeteer');


inquirer.prompt(
    [
        {
            message: "What is your Github username?",
            name: "username"
        },

        {
            message: "What is your favorite color?",
            name: "color"
        }
    ]
) .then(({username, color}) => {
    const url = `https://api.github.com/users/${username}`; 

    axios.get(url)
        .then(res => {
            
            const name = res.data.login;
            const profileImage = res.data.avatar_url;
            const bio = res.data.bio;
            const repositories = res.data.public_repos;
            const followers = res.data.followers;
            const following = res.data.following;
            const company = res.data.company;
            const location = res.data.location;
            const blog = res.data.blog;
            const htmlUrl = res.data.html_url;

            let pdf = '';


            const starredUrl = `https://api.github.com/users/${username}/starred`;
            axios.get(starredUrl)
                .then(repos => {
                    const starNum = repos.data.length;
                   

                    pdf = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                        <style>
                        #top {
                            background-color: rgb(73, 131, 240);
                            height: 500px;
                            position: relative;
                        }
                        
                        #middle {
                            background-color: white;
                            height: 500px;
                            width: 90%;
                            margin-left: auto;
                            margin-right: auto;
                            right: 0;
                            left: 0;
                            text-align: center;
                        }
                        
                        #bottom {
                            background-color: rgb(73, 131, 240);
                            height: 500px;
                        }
                        
                        #main {
                            position: absolute;
                            top: 100px;
                            right: 0;
                            left: 0;
                            background-color: ${color};
                            height: 500px;
                            width: 95%;
                            margin-left: auto;
                            margin-right: auto;
                            border-radius: 10px;
                            text-align: center;
                        }
                        
                        .container {
                            display: flex;
                            justify-content: space-between;
                        }
                        
                        .card {
                            justify-content: space-between;
                            width: 500px;
                            height: 160px;
                            background-color: ${color};
                            right: 0;
                            left: 0;
                            display: inline-block;
                            margin-top: 50px;
                            margin-left: auto;
                            margin-right: auto;
                            border-radius: 10px;
                        }
                        
                        #bio {
                            margin-top: 150px;
                            text-align: center;
                        }
                        
                        .icon {
                            width: 16px;
                            height: 16px;
                        }
                        
                        #photo {
                            border-radius: 50%;
                            border-style: solid;
                            border-width: 5px;
                            border-color: yellow;
                            width: 250px;
                            height: 250px;
                            top: -25px;
                        }
                        
                        #info {
                            position: absolute;
                            top: -60px;
                            margin-left: auto;
                            margin-right: auto;
                            right: 0;
                            left: 0;
                        }
                        </style>
                    </head>
                    <body>
                        <section id="top">
                            <div id="main">
                                <div id="info">
                                    <img id="photo" src="${profileImage}" alt="">
                                    <h1>Hi!</h1>
                                    <h1>My name is ${name}</h1>
                                    <h1>Currently @ ${company}</h1>
                                    <div id="links">
                                        <img class="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fsoftware-menu-icons%2F256%2FSoftwareIcons-38-512.png&f=1&nofb=1" alt="">
                                        <a href="https://maps.google.com/?q=${location}" target="_blank">${location}</a>
                                        <img class="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-256%2Fgithub-153-675523.png&f=1&nofb=1" alt="">
                                        <a href="${htmlUrl}" target="_blank">GitHub</a>
                                        <img class="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.dada.nyc%2Fassets%2Funiversal-blog-icon-e068228a5790200fea9fc49f3babc55c.png&f=1&nofb=1" alt="">
                                        <a href="${blog}" target="_blank">Blog</a>
                                    </div>
                                </div>
                                
                            </div>
                        </section>
                        <section id="middle">
                            <h1 id="bio">${bio}</h1>
                            <div class="container">
                                <div class="card">
                                    <h2>Public Repositories</h2>
                                    <h2>${repositories}</h2>
                                </div>
                                <div class="card">
                                    <h2>Followers</h2>
                                    <h2>${followers}</h2>
                                </div>
                            </div>
                            <div class="container">
                                <div class="card">
                                    <h2>GitHub Stars</h2>
                                    <h2>${starNum}</h2>
                                </div>
                                <div class="card">
                                    <h2>Following</h2>
                                    <h2>${following}</h2>
                                </div>
                            </div>
                          
                        </section>
                        <section id="bottom"></section>
                    </body>
                    </html>
                    `;

                    async function makePDF() {
                        
                        try {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            
                            await page.setViewport({ width: 2000, height: 800 });
                            await page.setContent(pdf);
                            await page.emulateMedia('screen');
                            await page.pdf({
                                path: 'profile.pdf',
                                format: 'A4',
                                printBackground: true
                            });
                            console.log('done');
                            await browser.close();
                            process.exit();
                    
                        } catch (e) {
                            console.log('Error', e);
                        }
                    }                   
                    makePDF();
                })    
                
        })
});



