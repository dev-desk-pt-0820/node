# **API User Guide**
|**Table of Contents:**|
|-|
|[Deployed API](#Deployed-API)|
|[Postman Documentation](#Postman-Documentation)|
|[Auth Routes](#Auth-Routes)|
|[User Routes](#User-Routes)|
|[Ticket Routes](#Ticket-Routes)|
### **Deployed App**
Server located at: https://dev-desk-queue-backend.herokuapp.com/
### **Postman Documentation**
Postman documentation located at: https://dev-desk-queue-backend.herokuapp.com/api
## **Auth Routes**
[back to top](#api-user-guide)
###  **User Creation**:
#### POST */api/auth/register*
Creates a new user.
Returns an object with the user's info such as: id, name, username, role, and token.
Request:
```javascript
{
    "name": "Jello King",
    "username": "tester",
    "password": "complicate",
    "roles": ["HELPER"]
}
```
Response:
```javascript
{
    "id": 6,
    "name": "Jello King",
    "username": "tester",
    "roles": [
        "HELPER"
    ],
    "token": "" // will return assigned token.
}
```
###  **User Login**:
#### POST */api/auth/login*
Logs user in.
Returns an object with the user's info such as: id, name, username, role, and token.
Request:
```javascript
{
    "username": "annaOne",
    "password": "password"
}
```
Response:
```javascript
{
    "id": 1,
    "name": "userOne",
    "username": "annaOne",
    "roles": [
        "HELPER"
    ],
    "token": "" // will return assigned token.
}
```
## **User Routes**
[back to top](#api-user-guide)
#### GET *api/users*
Returns an array of users. Must have to token to access.
Request:
```javascript
// No input needed
```
Response:
```javascript
[
    {
        "id": 1,
        "name": "userOne",
        "username": "annaOne",
        "password": "$2a$08$CTZouq.G08wgGG/X8QbjK.VzrFQPUa3DKt3snJO8136wPOHYhnx0S"
    },
    {
        "id": 2,
        "name": "userTwo",
        "username": "annaTwo",
        "password": "$2a$08$CTZouq.G08wgGG/X8QbjK.VzrFQPUa3DKt3snJO8136wPOHYhnx0S"
    },
    {
        "id": 3,
        "name": "userThree",
        "username": "annaOneTwoThreeFour",
        "password": "$2a$08$CTZouq.G08wgGG/X8QbjK.VzrFQPUa3DKt3snJO8136wPOHYhnx0S"
    },
    {
        "id": 4,
        "name": "Jelly",
        "username": "testified pillow",
        "password": "$2a$08$sL.4CNAFKJcW2bfLtca4Xu6PQ7oAVWwS6RrYsHgzzX/IKC.b7XRBC"
    },
    {
        "id": 5,
        "name": "Sweet summer blowout!",
        "username": "pillow certified",
        "password": "$2a$08$nDge1g6dEtgUSztZU9tD6eHmbHeH1uB/.TLS1PDuSGxbAUN24jZja"
    }
]
```
#### GET *api/users/:id*
Return a user object at the specified id, along with their role.
Request:
```javascript
// No input needed
```
Response:
```javascript
{
    "id": 4,
    "name": "Jelly",
    "username": "testified pillow",
    "roles": [
        "HELPER"
    ]
}
```
#### PUT *api/users/:id*
Updating a user's information. You cannot modify id.
Request:
```javascript
{
    "name": "Mr"
}
```
Response:
```javascript
{
    "user": 1,
    "changes": {
        "name": "Mr"
    }
}
```
## **Ticket Routes**
[back to top](#api-user-guide)
#### POST */api/tickets*
Creates a new ticket. Returns an object with all of the ticket's information.
Request:
```javascript
{
    "posted_by": 1,
    "title": "New Test Ticket",
    "description": "Testing my middleware!",
    "what_i_tried": "Adding ticket through my endpoints with updated middleware.",
    "categories": ["Lambda", "Troll Toll", "Backend", "Insanity"]
}
```
Response:
```javascript
{
    "ticket_id": 11,
    "posted_by": 1,
    "posted_by_name": "userOne",
    "posted_at": "2020-08-27 02:26:11",
    "status": "OPEN",
    "title": "New Test Ticket",
    "description": "Testing my middleware!",
    "what_i_tried": "Adding ticket through my endpoints with updated middleware.",
    "claimed_by_id": null,
    "claimed_by_name": null
}
```
#### GET *api/tickets*
Returns an array of tickets. Must have to token to access.
Request:
```javascript
// No input needed
```
Response:
```javascript
[
    {
        "ticket_id": 1,
        "posted_by": 1,
        "posted_by_name": "userOne",
        "posted_at": "2020-08-26 04:55:21",
        "status": "OPEN",
        "title": "Switching to FT from PT",
        "description": "Got hired with dream company, now I need to switch to the PT curriculum.",
        "what_i_tried": "Spoke with my TL.",
        "claimed_by_id": null,
        "claimed_by_name": null
    },
    {
        "ticket_id": 2,
        "posted_by": 1,
        "posted_by_name": "userOne",
        "posted_at": "2020-08-26 04:55:21",
        "status": "OPEN",
        "title": "My computer was running fine.",
        "description": "But then I caught it.",
        "what_i_tried": "Ba Dum Tss.",
        "claimed_by_id": 1,
        "claimed_by_name": "userOne"
    },
    {
        "ticket_id": 3,
        "posted_by": 2,
        "posted_by_name": "userTwo",
        "posted_at": "2020-08-26 04:55:21",
        "status": "OPEN",
        "title": "Newest.",
        "description": "Newer.",
        "what_i_tried": "All the new things, token abusing.",
        "claimed_by_id": 1,
        "claimed_by_name": "userOne"
    },
    {
        "ticket_id": 4,
        "posted_by": 3,
        "posted_by_name": "userThree",
        "posted_at": "2020-08-26 04:55:21",
        "status": "CLOSED",
        "title": "GitHub Merge Conflicts.",
        "description": "My repo has merge conflicts.",
        "what_i_tried": "Reading through github documentation.",
        "claimed_by_id": null,
        "claimed_by_name": null
    },
    {
        "ticket_id": 5,
        "posted_by": 2,
        "posted_by_name": "userTwo",
        "posted_at": "2020-08-26 04:55:21",
        "status": "CLOSED",
        "title": "Newest.",
        "description": "Newer.",
        "what_i_tried": "All the new things, token abusing.",
        "claimed_by_id": 1,
        "claimed_by_name": "userOne"
    },
    {
        "ticket_id": 10,
        "posted_by": 3,
        "posted_by_name": "userThree",
        "posted_at": "2020-08-27 01:58:48",
        "status": "OPEN",
        "title": "Newest",
        "description": "Test ticket!",
        "what_i_tried": "Adding ticket.",
        "claimed_by_id": null,
        "claimed_by_name": null
    }
]
```
#### GET *api/tickets/:id*
Return a ticket object at the specified id
Request:
```javascript
// No input needed
```
Response:
```javascript
{
    "ticket_id": 3,
    "posted_by": 2,
    "posted_by_name": "userTwo",
    "posted_at": "2020-08-26 04:55:21",
    "status": "OPEN",
    "title": "Newest.",
    "description": "Newer.",
    "what_i_tried": "All the new things, token abusing.",
    "claimed_by_id": 1,
    "claimed_by_name": "userOne"
}
```
#### PUT *api/tickets/:id*
Updates a ticket. You cannot modify id.
Request:
```javascript
{
    "posted_by": 2,
    "title": "Newest.",
    "description": "Newer.",
    "what_i_tried": "All the new things."
}
```
Response:
```javascript
{
    "newTicket": 2,
    "ticket": {
        "title": "Newest.",
        "description": "Newer.",
        "what_i_tried": "All the new things.",
        "posted_by": 2
    }
}
```
#### DEL *api/tickets/:id*
Delets ticket at specified id.
Request:
```javascript
// No input needed
```
Response:
```javascript
{
    "message": "Ticket successfully deleted."
}
```