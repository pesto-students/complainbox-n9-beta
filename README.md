# E-Complain-Box

[E-Complain-Box](https://ecomplainbox-598a53.netlify.app/) refers to the vision of the E Complain Box in Govt. Department. It is a simple platform to Raise Complaint to any department through the online. The Department have to complete complaint.  

## Table of Contents
- [Stakeholders](#stakeholders)
- [How to run project](#how-to-run-the-project)
  * [First run Express server](#first-run-express-server)
  * [For running frontend code](#for-running-frontend-code)
- [Environments and Deployments](#environments-and-deployments)
- [Error Monitoring and Logs](#error-monitoring-and-logs)
- [Artefacts](#artefacts)
- [Performance Screenshot](#performance-screenshot)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Third party tools](#third-party-tools)
- [Tech Stack](#tech-stack)

## Stakeholders 

**Please feel free to contact on Slack in case of any setup related issue or post in** [#e-comp_proj](https://join.slack.com/share/zt-sa486201-IYsy2Ms6fvqvauMmtmmbnQ)

- Kapil - [LinkedIn](https://www.linkedin.com/in/pardeep2411/) - [GitHub](https://github.com/pardeep24)
- Ramana Sankar - [LinkedIn](https://www.linkedin.com/in/ramanasankar/) - [GitHub](https://github.com/ramanasankarv)
- Sazzad Mahmud - [LinkedIn](www.linkedin.com/in/tusher-mahmud-49602a146) - [GitHub](https://github.com/tushermahmud)


## How to run the project

- Run `git clone https://github.com/pesto-students/complainbox-n9-beta.git`


### First Run Express server

*Node JS as Backend code uploaded under "packages/server" Github repo. It utilizes the Firebase Functions feature from Firebase suite of tools.*

**Requirment:** NPM v6.14.11, Node v14.15.4 and [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)

- Go to path `cd packages/server`
- Run `npm install` to install all required project dependencies
- Run `npm start` to start project on http://localhost:3001


**Note: When you execute the deploy command, public URL for the server will be visible in CLI**


### For Running frontend code

- Go to main project folder `cd packages/frontend`
- Run `npm i` to install all required project dependencies
- Run `npm start` to the project in dev mode
- Open the `https://localhost:3000` to run the project 



## Environments and Deployments

| Environment | Base URL | Description  | Deployment |
| :-------:   | :------: | :----------: | :--------: |
| Development | [http://localhost:3000](http://localhost:3000) | When running locally on your machine  | When PR is Raise Netlify will create a preview URL on related environement on based on base branch  |
| Statging | [https://amazing-goldberg-f93133.netlify.app](https://amazing-goldberg-f93133.netlify.app) | An environment corresponding to `master` branch of this repo  |  Any changes merge to `master` branch will auto deploy on `staging` environment |
| Preproduction | [https://preprod-e-complain-d8ec06.netlify.app](https://preprod-e-complain-d8ec06.netlify.app) | `preproduction` branch for QA  | Any changes merge to `preproduction` branch will auto deploy on `preproduction` environment |
| Production | [https://ecomplainbox-598a53.netlify.app](https://ecomplainbox-598a53.netlify.app) | Main production environment  | Any changes merge to `production` branch will auto deploy on `production` environment |

## Error Monitoring and Logs

- We are using [Sentry](https://sentry.io/organizations/sector-17/issues/?environment=production&project=5814430
) for application monitoring and error traking **Please feel free to contact on Slack for access to Sentry** 

## Artefacts

- [PRD](https://docs.google.com/document/d/1iLnsn0tHP4HoJXGnd6GOE8xEWvFtouTdq5fkp_DFV3c/view)

- [UI Design Figma](https://www.figma.com/file/Fzt1upFpkfYxKEiBLtVAof/E-ComplainBox?node-id=0%3A1)

- [System Design Figma](https://www.figma.com/file/s1IW8TOSCte7FasXsuaCJP/HLD)


## Performance Screenshot

![alt text](https://firebasestorage.googleapis.com/v0/b/ecomplainbox-18f35.appspot.com/o/performance%2FPerformance.png?alt=media&token=4433afad-4b67-4e0f-91bc-fcd9af919d55)


## Features

- **Authentication** - Authentication using Email, Mobile
- **Raise Complain** - Help users create complaint.
- **Complainer Dashboard** - Help show data in charts.
- **Department Dashboard** - Helps show data related to department
- **Security** - React provides protection from XSS out of the box. CORS applied on Node.JS server, so no other request from unknown origin gets executed.


## Upcoming Features

- Perfolie
- Notifications to super admin if complain not resolved in 15 days
- There will be Maintenance hierarchy of department employees.
- Aadhar card authentication
- AI to decide the priority of complaints.


## Third party tools

- Netlify (To deploy the build)
- Sentry.io (For error and performance insights)
- Heroku (To deploy the build)


## Tech Stack

- Next JS
- React JS
- Node JS / Express JS
- Firebase (Firestore DB, Authentication, Storage, Cloud Functions)
- Netlify
- Heroku

