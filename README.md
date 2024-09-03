# e-portfolio

This page provides more technical information about my experiences and past projects, interview screening tests, sample codes with removed company logic for simplicity, including both ReactJS, .NET Core, Golang, and system design.

## Demo application using React and Node.js with clean architecture

Build a simple FE and BE application to demonstrate the use of popular React libraries.

[FE React application](https://github.com/truongngoctuan/si-screening-fe-app)

* This project was bootstrapped with Create React App, using the Redux and Redux Toolkit template.
* Integrated with Tailwind CSS.
* Provides basic unit tests for reducers.

[BE application](https://github.com/truongngoctuan/si-screening-be-app)

* Provides an example of a simple RESTful API Node.js application.
* Technical stack:
  * Node.js, TypeScript
  * RESTful API hapi, swagger
  * MongoDB, Mongoose
* Each service follows a 3-layer architecture.

## Demo application using Angular and .NET Core

An [application](https://github.com/truongngoctuan/coding-test001) that submits a simple form to the server.

* FrontEnd: Angular application with 2 components to display users and create new ones.
* BackEnd: .NET Core Web API to deliver RESTful API.

## Web-based application for private clinics

Apply Design Thinking, OKR in the process of implementing a new application, integrate with SOAP-based APIs, and standards in healthcare.

FrontEnd stack:

* React, Redux, Next.js
* State management: Redux, Valtio
* Styled-components
* Integrate with block-based Lexical editor (similar to Notion) to provide interactive command-like actions, customize [a select node](Silent/Lexical/custom-select/CustomSelect.component.tsx)
* Code samples for [a React component](Silent/CodeSamples/module_mail/mail-item/MailItem.tsx) with hooks, TypeScript type definition, Valtio store, styled-components
* Code samples: [a shared component](Silent/CodeSamples/design_system/ReactSelect/ReactSelect.tsx) from the design system, customize ReactSelect lib to provide a simpler version and adapt to the current theme
* Implement WebWorkers to prove fuzzy search capacity in the browser for a fixed set of text data

Systems Design using microservices (from modulo-monolith, ready to split into microservices by topics or serverless), event-based programming with nat.io.
![Systems Design](/Silent/systems_design_silent.drawio.png)

BackEnd stack:

* Golang APIs, Dockerize, MongoDB
* Multi-tenant, microservices using nat.io as a service bus
* BFF architecture (ensure simplicity on the FE side, shifting rules and complexity to the BE side for easy testing)
* Switch between Restful APIs and Websocket to retrieve event notification for FE
* CI/CD from GitLab running ShellScript
* End-to-end testing using PlayWright for happy cases
* Custom proto code generation for both API Golang server and API Typescript server for both RESTful API and websocket connection

## Multi-players web-based racing game to engage kids to learn literacy

Here is the [portfolio of Readirace game](https://yummyux.com.au/readiracer/) from the Lead designer of 3PL, presenting the idea and implementation.

FrontEnd:

* Using Lottie and animation library to control objects and do animation as per event
* Viewport detection for iOS and Android devices to change the layout when the keyboard shows up (challenging with older iOS versions in Safari)
* Micro-frontend using iframe, sharing authentication tokens, each module hosted in different repositories

Systems Design using Onion Architecture, microservices:
![Systems Design](/3PL/Systems_Design_3PL.drawio.png)

BackEnd:

* Websocket and long-polling connection to ensure data is updated across multiple players in the same room
* Show the number of online users
* Join room
* [Technical design 1](3PL/PYCO-TechnicaldesignforReadiRacergame-060921-0913.pdf) [Technical design 2](3PL/PYCO-MultiplayermodeforReadiRacer-060921-0913.pdf) for the game
* Cypress end-to-end testing
* Postman/NewMan to automate API testing
* [System design](3PL/SATURN-SchoolActivityUsageReport-060921-0915.pdf) for the report and [background request](3PL/SATURN-BackgroundRequestProcessingSystem-060921-0917.pdf)

## Side project: build a React Native application to offer a platform for people to share their trips

TripBff is a traveling mobile app that provides a convenient way to import your images and export infographics to Facebook and other social networks.
![Video Demo](/TripBff/DemoVideoV1.mp4)

React Native application repository: [TripBffMobile](https://github.com/Reborn1320/tripbffmobile/tree/master/TripBffMobileV2)

* React Native, Redux, Redux Thunk

Backend repository: [TripBff](https://github.com/Reborn1320/tripbffserver/tree/master/apis/trip-api)

* Node.js, Express, MongoDB
* Terraform to deploy to AWS
