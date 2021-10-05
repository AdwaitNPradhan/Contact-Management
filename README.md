# Contact-Management

Manage your Contacts on apps you develop with this companion backend.\
TOC:

- [Contact-Management](#contact-management)
  - [Environment Variables](#environment-variables)
  - [Routes](#routes)
  - [~/](#)
  - [~/health](#health)
  - [~/api/auth/signin](#apiauthsignin)
  - [~/api/auth/signup](#apiauthsignup)
  - [~/api/auth/signout](#apiauthsignout)
  - [~/api/v1/profile](#apiv1profile)
  - [~/api/v1/contacts](#apiv1contacts)
  - [~/api/v1/contacts/:cid](#apiv1contactscid)
  - [~/api/v1/contacts/:cid](#apiv1contactscid-1)
  - [~/api/v1/contacts/:cid](#apiv1contactscid-2)
  - [~/api/v1/contacts/:cid](#apiv1contactscid-3)

## Environment Variables

|       Varname       | Definition                               | required |
| :-----------------: | :--------------------------------------- | :------: |
|     **_PORT_**      | Port on which the backend will be hosted | **YES**  |
|  **_MONGODB_URI_**  | URI string to the MongoDB                | **YES**  |
| **_COOKIE_SECRET_** | Sercret used to sign Cookies with        | **YES**  |
| **_TOKEN_SECRET_**  | Secret to Sign JWT Token with            | **YES**  |
|                     |                                          |          |

---

## Routes

---

## ~/

> _Method_: **GET**\
> _Action_: Base route\

**Response**:

```json
{
    "state": "OK",
    "url": "/"
}
```

---

## ~/health

> _Method_: **GET**\
> _Action_: Get some details about the servers health

returns

```json
{
  "status": "",
  "uptime": ,
  "upSince": "",
  "localTime": "",
  "service": {
    "name": "",
    "version": ""
  },
  "connections": {
    "database": ""
  },
  "env": {
    "nodeVersion": "",
    "processName": "",
    "pid": ,
    "cwd":  ""
  },
  "git": {
    "commitHash": "",
    "branchName": "",
    "tag":
  }
}
```

---

## ~/api/auth/signin
> _Method_: **POST**\
> _Action_: Signs in a user. After a successfull login, token is set into a cookie and sent to client, while also being sent in the **Response** object

**Request**:

```json
{
    "email": "",
    "password": ""
}
```

`email`: Email for signing in.

`password`: Password for signing in.

**Response**:

```json
{
  "success": ,
  "User": {
    "uName": "",
    "fName": "",
    "lName": "",
    "contact": {
      "email": "",
      "phone": ""
    }
  },
  "token": ""
}
```

---

## ~/api/auth/signup

> _Method_:**POST**\
> _Action_: Signs in a user. After a successfull login, token is set into a cookie and sent to client, while also being sent in the **Response** object

**Request**:

```json
{
    "fName": "",
    "lName": "",
    "uName": "",
    "email": "",
    "phone": "",
    "password": ""
}
```

`fName`: First Name of the User

`lName`: Last Name of the User

`uName`: User Name of the User

`email`: Email for the User

`phone`: Phone number of the User

`password`: password for the User Account

**Response**:

```json
{
    "state": ""
}
```

---

## ~/api/auth/signout

> _Method_:**POST**\
> _Action_: This Routes will remove the Cookies set by express which contains the JWT token

---

## ~/api/v1/profile

> **Needs Auth**\
> _Method_:**POST**\
> _Action_: Get the profile of the currently logged in user

**Response**:

```json
{
    "meta": {
        "createdAt": ""
    },
    "contact": {
        "email": "",
        "phone": ""
    },
    "fName": "",
    "lName": "",
    "uName": ""
}
```

---

## ~/api/v1/contacts

> **Needs Auth**\
> _Mehtod_: **GET**\
> _Action_: Get a list of contacts, added under a specific user

**Response**:

```json
[
    .,
    {
        "meta": {
            "createdAt": ""
        },
        "contact": {
            "email": "",
            "phone": ""
        },
        "_id": "",
        "cName": "",
        "cType": ""
    },
    .
    .
    .
]
```

---

## ~/api/v1/contacts/:cid

> **Needs Auth**\
> _Method_: **GET**\
> _Action_: If the `cid` url parameter is provided, returns with the cotact details with `_id` responing to that `cid`. If not supplied, returns a list of contacts under that user.

**Response**:

```json
{
    "meta": {
        "createdAt": ""
    },
    "contact": {
        "email": "",
        "phone": ""
    },
    "_id": "",
    "cName": "",
    "cType": ""
}
```

---

## ~/api/v1/contacts/:cid

> **Needs Auth**\
> _Method_: **POST**\
> _Action_: Create a new Contact under the currently signed in user

```json
{
    "cName": "",
    "email": "",
    "phone": "",
    "cType": ""
}
```

`cName`: Name of the contact (required)

`email`: Email address of the contact (required)

`phone`: Phone number of the contact (required)

`cType`: Type of contact detail (optional) [defaults: `NULL`]

**Response**:

```json
{
    "state": ""
}
```

---

## ~/api/v1/contacts/:cid

> **Needs Auth**\
> _Method_: **PUT**\
> _Action_: Updates only one field that has been supplied on the **Request** body on the database object with `_id` of `cid`

_Payload_:

```json
{
    "key": "",
    "value": ""
}
```

`key`: can be one of these (cName, cType, email, phone)

`value`: new value to replace to old value with

**Response**:

```json
{
    "state": ""
}
```

---

## ~/api/v1/contacts/:cid

> **Needs Auth**\
> _Method_: **DELETE**\
> _Action_: Deletes the Contact related to the given `cid` url parameter if the contact is created by the currently logged user

**Response**:

```json
{
    "state": ""
}
```
