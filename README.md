# Safebox API
Safebox is a Javascript challenge part of [Rviewer Codeathon]()

 - The Challenge
   - Requirements
     - Beta
     - V1
   - What are looking for?
 - External dependencies
 - Installation & Init.
   - .env
   - certs
   - launch server
 - Runing test
   - Setup
   - Launch test
 - Usage
   - curl
   - Rest Client

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

---

## How to submit your solution

* Push your code to the `devel` branch - we encourage you to commit regularly to show your thinking process was.
* **Create a new Pull Request** to `main` branch & **merge it**.

Once merged you **won't be able to change or add** anything to your solution, so double-check that everything is as
you expected!

Remember that **there is no countdown**, so take your time and implement a solution that you are proud!
