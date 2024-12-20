# Backend Endpoints

# User Registration Endpoint Documentation

## Endpoints

### POST /users/register

### Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. The system will hash the password, store the user details in the database, and generate a JWT token for authentication.

---

### Request

#### Headers

- **Content-Type**: `application/json`

#### Body

The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "<string>",
    "lastname": "<string>"
  },
  "email": "<string>",
  "password": "<string>"
}
```

#### Validation Rules

- **email** (string, required): Must be a valid email address.
- **fullname.firstname** (string, required): Must be at least 3 characters long.
- **fullname.lastname** (string, optional): Must be at least 3 characters long if provided.
- **password** (string, required): Must be at least 6 characters long.

---

### Response

#### Success (201 Created)

If the registration is successful, the response will include the newly created user object and a JWT token.

##### Example Response:

```json
{
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "<string>",
      "lastname": "<string>"
    },
    "email": "<string>"
  },
  "token": "<jwt_token>"
}
```

#### Error (400 Bad Request)

If the request fails validation, the response will include an array of error messages.

##### Example Response:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Status Codes

- **201 Created**: User registration successful.
- **400 Bad Request**: Validation failed or missing required fields.

---

### Notes

- Ensure that the `JWT_SECRET` environment variable is configured correctly for token generation.
- The password is stored as a hashed value using bcrypt.
- The `lastname` field is optional but, if provided, must meet the validation criteria.

---

### POST /users/login

### Description

This endpoint allows an existing user to log in by providing their email and password. The system validates the credentials and returns a JWT token upon successful authentication.

---

### Request

#### Headers

- **Content-Type**: `application/json`

#### Body

The request body must be a JSON object with the following structure:

```json
{
  "email": "<string>",
  "password": "<string>"
}
```

#### Validation Rules

- **email** (string, required): Must be a valid email address.
- **password** (string, required): Cannot be empty.

---

### Response

#### Success (200 OK)

If the login is successful, the response will include the authenticated user object and a JWT token.

##### Example Response:

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "<string>",
      "lastname": "<string>"
    },
    "email": "<string>"
  }
}
```

#### Error (400 Bad Request)

If the request fails validation, the response will include an array of error messages.

##### Example Response:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)

If the credentials are incorrect or the user does not exist, the response will include an error message.

##### Example Response:

```json
{
  "message": "Invalid email or Password"
}
```

---

### Status Codes

- **200 OK**: Login successful.
- **400 Bad Request**: Validation failed or missing required fields.
- **401 Unauthorized**: Invalid email or password.

---

### Notes

- Ensure that the `JWT_SECRET` environment variable is configured correctly for token generation.
- Passwords are compared using bcrypt.

---

### GET /users/profile

### Description

This endpoint retrieves the profile of the currently authenticated user.

---

### Request

#### Headers

- **Authorization**: `Bearer <jwt_token>`

---

### Response

#### Success (200 OK)

If the user is authenticated, the response will include the user's profile information.

##### Example Response:

```json
{
  "_id": "<user_id>",
  "fullname": {
    "firstname": "<string>",
    "lastname": "<string>"
  },
  "email": "<string>"
}
```

#### Error (401 Unauthorized)

If the token is invalid, expired, or blacklisted, the response will include an error message.

##### Example Response:

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes

- **200 OK**: Profile retrieval successful.
- **401 Unauthorized**: Invalid or missing token.

---

### Notes

- This endpoint requires authentication. Ensure the token is valid and not blacklisted.

---

### GET /users/logout

### Description

This endpoint logs out the currently authenticated user by blacklisting the token and clearing the authentication cookie.

---

### Request

#### Headers

- **Authorization**: `Bearer <jwt_token>`

---

### Response

#### Success (200 OK)

If the logout is successful, the response will confirm the operation.

##### Example Response:

```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)

If the token is invalid, expired, or blacklisted, the response will include an error message.

##### Example Response:

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes

- **200 OK**: Logout successful.
- **401 Unauthorized**: Invalid or missing token.

---

### Notes

- This endpoint requires authentication. Ensure the token is valid and not blacklisted.
- Blacklisted tokens are stored in the `blackListToken` collection.

# Captain Registration Endpoint Documentation

## Endpoint

### POST /captains/register

---

## Description

This endpoint allows a new captain to register by providing their personal details, email, password, and vehicle information. The system will hash the password, store the captain details in the database, and generate a JWT token for authentication.

---

## Request

### Headers

- **Content-Type**: `application/json`

### Body

The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "<string>",
    "lastname": "<string>"
  },
  "email": "<string>",
  "password": "<string>",
  "vehicle": {
    "color": "<string>",
    "plate": "<string>",
    "capacity": <number>,
    "vehicleType": "<string>"
  }
}
```

### Validation Rules

- **email** (string, required): Must be a valid email address.
- **fullname.firstname** (string, required): Must be at least 3 characters long.
- **fullname.lastname** (string, optional): Must be at least 3 characters long if provided.
- **password** (string, required): Must be at least 6 characters long.
- **vehicle.color** (string, required): Must be at least 3 characters long.
- **vehicle.plate** (string, required): Must be unique and at least 3 characters long.
- **vehicle.capacity** (number, required): Must be an integer greater than or equal to 1.
- **vehicle.vehicleType** (string, required): Must be one of `car`, `motorcycle`, or `auto`.

---

## Response

### Success (201 Created)

If the registration is successful, the response will include the newly created captain object and a JWT token.

#### Example Response:

```json
{
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "<string>",
      "lastname": "<string>"
    },
    "email": "<string>",
    "vehicle": {
      "color": "<string>",
      "plate": "<string>",
      "capacity": <number>,
      "vehicleType": "<string>"
    }
  },
  "token": "<jwt_token>"
}
```

### Error (400 Bad Request)

If the request fails validation or the captain already exists, the response will include an error message.

#### Example Response:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

- **201 Created**: Captain registration successful.
- **400 Bad Request**: Validation failed or missing required fields.
- **409 Conflict**: Captain with the provided email already exists.

---

## Notes

- Ensure that the `JWT_SECRET` environment variable is configured correctly for token generation.
- The password is stored as a hashed value using bcrypt.
- The vehicle plate number must be unique across all captains.

---

## Additional Endpoints

### POST /captains/login

### Description

This endpoint allows a captain to log in by providing valid credentials.

---

### Request

#### Headers

- **Content-Type**: `application/json`

#### Body

The request body must be a JSON object with the following structure:

```json
{
  "email": "<string>",
  "password": "<string>"
}
```

#### Validation Rules

- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

---

### Response

#### Success (200 OK)

If login is successful, the response will include the captain object and a JWT token.

##### Example Response:

```json
{
  "captain": {
    "_id": "<captain_id>",
    "email": "<string>"
  },
  "token": "<jwt_token>"
}
```

#### Error (401 Unauthorized)

If the credentials are invalid, the response will include an error message.

##### Example Response:

```json
{
  "message": "Invalid email or password"
}
```

---

### GET /captains/profile

### Description

This endpoint allows a captain to retrieve their profile details. Requires authentication.

---

### Request

#### Headers

- **Authorization**: `Bearer <token>`

---

### Response

#### Success (200 OK)

If authentication is successful, the response will include the captain's profile details.

##### Example Response:

```json
{
  "captain": {
    "_id": "<captain_id>",
    "email": "<string>"
  }
}
```

#### Error (401 Unauthorized)

If authentication fails, the response will include an error message.

##### Example Response:

```json
{
  "message": "Unauthorized"
}
```

---

### GET /captains/logout

### Description

This endpoint logs out a captain by invalidating their token.

---

### Request

#### Headers

- **Authorization**: `Bearer <token>`

---

### Response

#### Success (200 OK)

If logout is successful, the response will include a confirmation message.

##### Example Response:

```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)

If authentication fails, the response will include an error message.

##### Example Response:

```json
{
  "message": "Unauthorized"
}
```

---


