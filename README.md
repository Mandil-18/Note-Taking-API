# Note-Taking API

This project implements a simple RESTful API for a note-taking application. It allows users to create, retrieve, update, and delete text notes using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Usage](#usage)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [1. Create a New Note](#1-create-a-new-note)
  - [2. Retrieve All Notes](#2-retrieve-all-notes)
  - [3. Retrieve a Single Note](#3-retrieve-a-single-note)
  - [4. Update an Existing Note](#4-update-an-existing-note)
  - [5. Delete a Note](#5-delete-a-note)
- [Error Responses](#error-responses)
- [Authentication](#authentication)

## Features

- Create a new note with title and content.
- Retrieve a list of all notes or a single note by ID.
- Update the content of an existing note.
- Delete a note from the database.
- Data validation for note creation and updating.
- Comprehensive error handling.
- Optional Basic Authentication.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose (MongoDB ODM)

## Usage

Developers can use this API as the backend service for a note-taking application. Integrate it with a front-end to create a complete note management system.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/note-taking-api.git

2. Install Dependencies:

   ```bash 
   cd note-taking-api
   npm install

3. Start the Server

    ```bash
    npm start

The API will be accessible at http://localhost:3000 (or adjust the port as necessary).

## Configuration

Configure MongoDB connection in db.js:

    mongoose.connect('mongodb://127.0.0.1:27017/notes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

## API Endpoints

### 1. Create a New Note

- **Endpoint:** `POST /notes`
- **Description:** Create a new note with a title and content.
- **Request Format:**
  - **Method:** POST
  - **URL:** `http://localhost:3000/notes`
  - **Body:**
    ```json
    {
      "title": "Your Note Title",
      "content": "Your note content goes here."
    }
    ```
- **Response Format:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "_id": "generatedId",
      "title": "Your Note Title",
      "content": "Your note content goes here.",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```

### 2. Retrieve All Notes

- **Endpoint:** `GET /notes`
- **Description:** Retrieve a list of all notes.
- **Request Format:**
  - **Method:** GET
  - **URL:** `http://localhost:3000/notes`
- **Response Format:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      {
        "_id": "noteId1",
        "title": "Note Title 1",
        "content": "Note content 1",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      {
        "_id": "noteId2",
        "title": "Note Title 2",
        "content": "Note content 2",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
    ]
    ```

### 3. Retrieve a Single Note

- **Endpoint:** `GET /notes/:id`
- **Description:** Retrieve details of a specific note.
- **Request Format:**
  - **Method:** GET
  - **URL:** `http://localhost:3000/notes/noteId` // Replace noteId with the actual ID
- **Response Format:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "_id": "noteId",
      "title": "Note Title",
      "content": "Note content",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```

### 4. Update an Existing Note

- **Endpoint:** `PUT /notes/:id`
- **Description:** Update the content of an existing note.
- **Request Format:**
  - **Method:** PUT
  - **URL:** `http://localhost:3000/notes/noteId` // Replace noteId with the actual ID
  - **Body:**
    ```json
    {
      "title": "Updated Note Title",
      "content": "Updated note content"
    }
    ```
- **Response Format:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "_id": "noteId",
      "title": "Updated Note Title",
      "content": "Updated note content",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```

### 5. Delete a Note

- **Endpoint:** `DELETE /notes/:id`
- **Description:** Delete a specific note.
- **Request Format:**
  - **Method:** DELETE
  - **URL:** `http://localhost:3000/notes/noteId` // Replace noteId with the actual ID
- **Response Format:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "message": "Note deleted successfully."
    }
    ```

## Error Responses

### 400 Bad Request:

- **Body:**
  ```json
  {
    "error": "Title and content are required."
  }

### 404 Not Found:

- **Body:**
  ```json
  {
    "error": "Note not found."
  }

### 500 Internal Server Error:

- **Body:**
  ```json
  {
    "error": "Internal Server Error."
  }

## Authentication
This API uses Basic Authentication. Include the following credentials in the request headers:

**Username:**  "your_username"

**Password:**  "your_password"
