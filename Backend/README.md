# User Registration Endpoint Documentation

## Endpoint

**POST /users/register**

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. The system will hash the password, store the user details in the database, and generate a JWT token for authentication.

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
  "password": "<string>"
}
```

### Validation Rules

- **email** (string, required): Must be a valid email address.
- **fullname.firstname** (string, required): Must be at least 3 characters long.
- **fullname.lastname** (string, optional): Must be at least 3 characters long if provided.
- **password** (string, required): Must be at least 6 characters long.

---

## Response

### Success (201 Created)

If the registration is successful, the response will include the newly created user object and a JWT token.

#### Example Response:

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

### Error (400 Bad Request)

If the request fails validation, the response will include an array of error messages.

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

- **201 Created**: User registration successful.
- **400 Bad Request**: Validation failed or missing required fields.

---

## Notes

- Ensure that the `JWT_SECRET` environment variable is configured correctly for token generation.
- The password is stored as a hashed value using bcrypt.
- The `lastname` field is optional but, if provided, must meet the validation criteria.
