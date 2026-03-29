# microServicesN1

A simple event-driven microservices project for creating posts and comments with moderation.

## Overview

This project is split into independent Node.js services plus a React client:

- `posts`: creates and stores posts.
- `comments`: creates and stores comments per post.
- `moderation`: reviews new comments and marks them as `approved` or `rejected`.
- `query`: builds a read model with posts and comments for the UI.
- `event-bus`: receives events and broadcasts them to all services.
- `client`: React frontend.

The services communicate using events, not direct database sharing.

## Architecture

### Event flow

1. A post is created in `posts` -> emits `PostCreated`.
2. A comment is created in `comments` -> emits `CommentCreated` with `pending` status.
3. `moderation` receives `CommentCreated`, checks content, emits `CommentModerated`.
4. `comments` updates the comment status and emits `CommentUpdated`.
5. `query` consumes all events and exposes aggregated data for the UI.
6. `event-bus` stores events and replays them to recovering services (used by `query` on startup).

### Moderation rule

- If a comment contains the word `orange`, it is marked as `rejected`.
- Otherwise, it is marked as `approved`.

## Ports

- `client`: `3000`
- `posts`: `4000`
- `comments`: `4001`
- `query`: `4002`
- `moderation`: `4003`
- `event-bus`: `4005`

## Tech stack

- Node.js + Express
- React (Create React App)
- Axios
- CORS
- Nodemon

## Getting started

### 1. Install dependencies

Run this in each service folder:

```bash
npm install
```

Folders:

- `posts/`
- `comments/`
- `query/`
- `moderation/`
- `event-bus/`
- `client/`

### 2. Start all services

Open a terminal for each folder and run:

```bash
npm start
```

Start order is flexible, but a common order is:

1. `event-bus`
2. `posts`
3. `comments`
4. `moderation`
5. `query`
6. `client`

### 3. Use the app

Open:

- http://localhost:3000

Create posts and comments from the UI.

## API summary

### `posts` service (`4000`)

- `GET /posts`
- `POST /posts`
- `POST /events`

### `comments` service (`4001`)

- `GET /posts/:id/comments`
- `POST /posts/:id/comments`
- `POST /events`

### `query` service (`4002`)

- `GET /posts`
- `POST /events`

### `moderation` service (`4003`)

- `POST /events`

### `event-bus` service (`4005`)

- `POST /events`
- `GET /events`

## Notes

- Data is stored in memory in each service and resets when service restarts.
- This project is intended for learning event-driven microservice communication.
