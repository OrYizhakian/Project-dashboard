# Introduction
This project is for the HIT course Introduction to Devops, where we use various tools we learned about to make an actual CI/CD pipeline.

# Setup
Recording of Jenkins:
Site monitor:
We used a plugin called SiteMonitor from inside Jenkins, and with it we monitor our localhost site.
URL for SiteMonitor: https://plugins.jenkins.io/sitemonitor/
URL for our localhost site: http://localhost:5173/ (with --host in vite settings: package.json > scripts > dev:vite --host)
In a new jenkins job: build triggers > Build periodically > Schedule: */5 * * * * (Every 5 minutes, CRON)
In the same job: Post build Actions > Monitor Site > Url: http://localhost:5173/ , Success Response Codes: 200
We checked Untrusted SSL connections because why not, the plugin isn't safe and we're doing it in localhost anyway.

Selenium IDE: 
We managed to record actions in our site, for instance we managed to add a new project and rename it.
We then can use Assert Text and check if a specific text exists.
We also have a search bar we can use to check if a specific project exists and play on that.
We'll need to call Selenium with Jenkins, TBD.

Hosting the project:
Clone the project from Github, use Visual Studio Code, install Vite (npm i Vite) and whatever missing packages.
Change the settings for localhost: (with --host in vite settings: package.json > scripts > dev:vite --host)
use npm run dev to run the site then go to its URL to start.

Gatling: After installing gatling, we recorded entering our site, then ran it with various user numbers. The results are here:
<img width="3662" height="1655" alt="gatling tests paint dashboard" src="https://github.com/user-attachments/assets/2fcfe934-9845-4127-bfba-26ba14f6c0b0" />
TBD: Find the actual capacity number to then run Load and Stress tests later.
