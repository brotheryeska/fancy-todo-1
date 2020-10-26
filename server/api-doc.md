# TO-DO-LIST-APP
This application is to list what should you do in today. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## TODO ROUTES
### GET /todos  

> Show all to-do lists

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_ : OK
```
[
  {
    "id": 1,
    "title": "Main dota 2",
    "description": "<asset description>",
    "status": "uncompleted"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Main PUBG",
    "description": "Mabar sama tim Vintage-Fox",
    "status": "on progress"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 1,
    "title": "Bersih-bersih rumah",
    "description": "Sapu rumah, lantai atas, bawah, dan sikat kamar mandi",
    "status": "uncompleted"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
 
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /todos/:id  

> Show to-do list based on the ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "id": "<selected to-do list id>"
}
```

_Response (200)_ : OK
```
[
  {
    "id": 2,
    "title": "Main PUBG",
    "description": "Mabar sama tim Vintage-Fox",
    "status": "on progress"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```

---
### POST /todos

> Create new to-do-list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<To-do-list-title>",
  "description": "<explanation about what are you going to do>",
  "status": "<status of to-do-completion>",
  "due_date": "<deadline of to-do>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<Validation error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```
---
### PUT /todos:id

> Update to-do-list into the new one

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Parameter_
```
{
    "id": "<selected to-do list id>"
}
```

_Request Body_
```
{
   "title": "<To-do title>",
   "description": "<description of to-do>",
   "status": "<status of to-do completion>",
   "due_date": "<deadline of to-do>"
}
```

_Response (200 - OK)_
```
{
    "id": <selected to-do list id>,
    "title": "<updated to-do title>",
    "description": "<updated description>",
    "status": "<updated status>",
    "due_date": "<updated deadline of to-do>",
    "createdAt": "<date given by system>",
    "updatedAt": "<date given by system>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<Validation error message>"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```
---
### PATCH /todos:id

> Update to-do-list status based on ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Parameter_
```
{
    "id": "<selected to-do list id>"
}
```

_Request Body_
```
{
    "status": "<todo status>"
}
```

_Response (200 - OK)_
```
{
    "id": "<id that match with param>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>"
    "createdAt": "<given by system>",
    "updatedAt": "<given by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```

---
### DELETE /todos:id

> Delete to-do-list based on ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Parameter_
```
{
    "id": "<selected to-do list id>"
}
```

_Request Body_
```
Not required
```

_Response (200 - OK)_
```
{
    "id": 2,
    "title": "Main PUBG",
    "description": "Mabar sama tim Vintage-Fox",
    "status": "on progress"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```