# e-portfolio
This page provide more technical information of my experiences and past projects, interview screening tests, samples codes with removed company' logic for simplicity including both ReactJs, Net Core, Golang, system design.


## Demo application using React and NodeJs with clean architecture
Build simple FE and BE application to demonstrate the using popular React libraries

[FE React application](https://github.com/truongngoctuan/si-screening-fe-app)
* This project was bootstrapped with Create React App, using the Redux and Redux Toolkit template.
* Integrated with TailwindCSS
* Provide basic unit tests for reducers

[BE application](https://github.com/truongngoctuan/si-screening-be-app)
* Provide example of simple RESTful API Nodejs application
* Technical stack
  * nodejs, typescript
  * RESTful API hapi, swagger
  * mongo, mongoose
* Each service follow 3 layer architectures


## Demo application using Angular and Net Core
An [application](https://github.com/truongngoctuan/coding-test001) that submit a simple form to server
* FrontEnd: Angular application with 2 components to display users and create new one
* BackEnd: Net Core Web Api to delivery RESTful API

## Web-based application for private clinics
Apply Design Thinking, OKR in the process of implementing new application, integrate with SOAP based APIs, and standards in healthcare

FrontEnd stack:
* React, redux, NextJs
* State management: redux, valtio
* styled-components
* integrate with block-based Lexical editor (similar to Notion) to provide interactive command-like actions, customize [a select node](Silent/Lexical/custom-select/CustomSelect.component.tsx)
* code samples for [a React component](Silent/CodeSamples/module_mail/mail-item/MailItem.tsx) with hooks, TypeScript type definition, valtio store, styled-components
* code samples: [a shared component](Silent/CodeSamples/design_system/ReactSelect/ReactSelect.tsx) from design system, customize ReactSelect lib to provide simpler version and adapt to current theme
* Implement WebWorkers to prove fuzzy search capacity in the browser for a fixed set of text data
  

BackEnd stack:
* GOlang APIs, Dockerize, mongoDB
* multi-tenant, microservices using nat.io as service bus
* BFF architecture (ensure simplicity in FE side, shifting rules and complexity to BE side for easy testing)
* Switch between Restful APIs and Websocket to retrieve event notification for FE
* CI/CD from GitLab running ShellScript
* end to end testing using PlayWright for happy cases
* custom proto code generation for both API Golang server, and API Typescript server for both RESTfulAPI and websocket connection

## Multi-players web-based racing game to engage kid to learn literacy
Here is the [porfolio of Readirace game](https://yummyux.com.au/readiracer/) from Lead designer of 3PL, presenting the idea and implementation

FrontEnd
* using Lottie and animation library to control objects and doing animation as per event
* ViewPort detection for iOS and Android devices to change layout on keyboard showing up (challenge with older iOS version in Safari)
* Micro-frontend using iframe, sharing authentication tokens, each module host in different repositories

BackEnd
* Websocket and long-polling connection to ensure data updated across multiple players in the same room
* show number of online users
* Join room
* [Technical design1](3PL/PYCO-TechnicaldesignforReadiRacergame-060921-0913.pdf) [Technical design 2](3PL/PYCO-MultiplayermodeforReadiRacer-060921-0913.pdf) for game
* Cypress end to end testing
* Postman/NewMan to automate APIs testing
* [System design](3PL/SATURN-SchoolActivityUsageReport-060921-0915.pdf) for report and [background request](3PL/SATURN-BackgroundRequestProcessingSystem-060921-0917.pdf)