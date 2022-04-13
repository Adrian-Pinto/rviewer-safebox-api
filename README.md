# Safebox API
Safebox is a Javascript challenge part of [Rviewer Codeathon](https://go.rviewer.io/javascript-codeathon-winners-stats/)

 - [The Challenge](#the-challenge)
   - [Requirements](#requirements)
     - [Beta](#beta---functional-requirements)
     - [V1](#v10---functional-requirements)
   - [What are looking for?](#what-are-we-looking-for)
 - [External dependencies](#external-dependencies)
 - [Installation & Init.](#installation--init)
   - [.env](#env)
   - [certs](#certs)
   - [launch server](#launch-server)
 - [Runing test](#runing-test)
 - [Usage over Rest Client](#usage-over-rest-client)

# The Challenge 

Securit-ish is a security company which main business is taking care of 
houses and people belongings. 

Their next product launch is _Safe-ish_, a remote-control safebox that they
sell to their customer in order to keep their belongings as safe as possible, 
providing them the ability to control their safebox remotely through a mobile app. 

As you know, the API should be strong and secure enough to avoid leaks and security
issues.

**Current Status**

The CEO of Securit-ish, who does not have technical background, has paid for an external
consultant to develop the product. 

This guy has created an API definition (with Swagger) with the main endpoints of it, but 
once they start coding he left the company. So the CEO is looking for someone who could 
help her to create the first version of that API.

[^ Go top](#safebox-api)

## Requirements

The CEO has sent us the following business requirements:

### Beta - Functional requirements

* Each safebox will have a **unique** id, a **non-empty name** and a **password**.
* The safebox have to allow the following actions
    * Add content to the safebox (based on the generated id)
    * Get the content of the safebox (based on the generated id)
    * All endpoints have to be secured with Basic Auth (using name & password) 
* You should ensure that the password is strong enough
* The content in the safebox must also be ciphered, so even though someone
  accesses your application, the content won’t be readable
  
### v1.0 - Functional requirements

The CEO will be happy with the first version of the API, but if you want to help her
to create the full version, those are the requirements:

* To increase the security of the safebox, would be better if we split the step of 
 interacting with it (insert and get items) into two. 
    * Open the safebox (with a valid id and password) to get a token
    * Use this token lately to add or obtain items, sending it through an HTTP Header
* The token will be valid for the next **3 minutes**  
* The system will block the safebox after 3 failed opening attempts (considering a
 failing attempt as a wrong combination between safebox id and password). Don’t worry
 about unblocking it, we don’t care about that it nowadays.
 
## What are we looking for?

* **A well-designed solution and architecture.** Avoid duplication, extract re-usable code
where makes sense. We want to see that you can create an easy-to-maintain codebase.
* **Test as much as you can.** One of the main pain points of maintaining other's code
comes when it does not have tests. So try to create tests covering, at least, the main classes.
* **Document your decisions**. The CEO has a non-tech background so try to explain your decisions, 
as well as any other technical requirement (how to run the API, external dependencies, etc ...)

[^ Go top](#safebox-api)

# External dependencies
 - [Express](https://expressjs.com/)
 - [Nodemon](https://nodemon.io/)
 - [DotEnv](https://github.com/motdotla/dotenv)
 - [AJV](https://ajv.js.org/)
 - [LowDb](https://github.com/typicode/lowdb)
 - [EsLint](https://eslint.org/)
 - [c8](https://github.com/bcoe/c8)
 - [Mocha](https://mochajs.org/)
 - [Sinon](https://sinonjs.org/)
 - [Chai](https://www.chaijs.com/)
 - [Chai-HTTP](https://www.chaijs.com/plugins/chai-http/)

[^ Go top](#safebox-api)

# Installation & Init.
## .env
In .env we going to define the environment variables what our API needed
~~~bash
# First we do a .env file from .env.example
# On root folder of project
$ cp .env.example .env
# And open it with a text editor for example VsCode or Vim
$ code .env
# On PORT you need to write any unsed port for example 3000
# On CIPHER_ALGORITHM you can write any of Node createCipheriv compatible algorithm in my case i use aes-256-gcm
# The SECRET is a hexadecimal string of 32 bytes of length. Lets see how generate one if you have a Node installed in your sistem
# Enter in node cli
$ node
# Copy this
$ crypto.randomBytes(32).toString('hex');
# Store the result without ''
# To finish the TOKEN_SECRET its the same but with 10 bytes
$ crypto.randomBytes(10).toString('hex');
~~~
## Certificates
To run Safebox API you need to make the cert and key files and put then on cert folder.
In this case you can do it for a localhost usage, lets make then directly on cert folder
~~~bash
# On root folder of project
$ cd src/cert
# Make cert and key
$ openssl req -nodes -new -x509 -keyout api.key -out api.cert
~~~
## Launch the server
Once you have complete the previous steps we can launch the API
~~~bash
# On root folder of project
# Installation
npm i
# Initialization
npm start
# Dev mode
npm run dev
~~~
[^ Go top](#safebox-api)
# Runing the tests
~~~bash
# On root folder of project
# No coverage
npm run test
# With coverage
npm run test:cov
~~~
[^ Go top](#safebox-api)
# Usage over Rest Client
Before you can launching petitions to the API you need to install Rest Client extension on your VsCode
## Launch petitions
From root folder of project go to `doc/requests` and there you will find two .rest files to do petitions over both versions of API

**Before all**

Send request of variables pushing `send request` button.
You can identifique then with

`# @name <var>`

**After set variables**

You can launch a new petiton pushin the send button over each petition.

[^ Go top](#safebox-api)