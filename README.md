# Code Editor IDE

A browser-based development environment that combines a code editor, project and file management, an integrated terminal, and AI-assisted coding in one workspace. The application is built with React and Node.js and uses a service-oriented backend to separate authentication, project operations, file operations, AI workflows, terminal sessions, and payments.

Repository: https://github.com/aryannair005/Code-Editor-IDE

## Overview

Code Editor IDE is designed to bring common development tasks into a single interface. Users can work with project files, edit source code, interact with an AI coding assistant, and use a terminal connected to a project workspace.

The backend is organized as multiple Node.js services behind an API gateway. Redis is used for session storage, while MongoDB is used by the application services for persistent data. Firebase Authentication is used for sign-in.

> **Project status:** This project is under active development. Features and setup details may change as the architecture evolves. Review the current source code and environment configuration before deploying it.

## Features

- **Code editor:** In-browser editor powered by Monaco Editor.
- **Project management:** Create and work with projects through a dedicated project service.
- **File explorer:** Create, read, update, and delete files and folders in a project.
- **Integrated terminal:** Terminal interface powered by xterm and a Node.js pseudo-terminal process.
- **AI coding assistant:** AI chat workflow implemented with LangChain/LangGraph, with streaming responses and tool events.
- **Authentication:** Firebase-based sign-in with server-side session handling.
- **API gateway:** Central entry point that routes requests to backend services and applies session protection to protected routes.
- **Session storage:** Redis-backed session lookup for authenticated requests.
- **Payments and credits:** A payment service and credit deduction flow are included in the backend.
- **Responsive interface:** React interface styled with Tailwind CSS, with motion effects and icons.

Availability and behavior of individual features depend on the current implementation and correct configuration of all required services.

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit and React Redux
- Monaco Editor
- xterm
- Axios
- Tailwind CSS
- Motion
- Firebase Authentication
- Socket.IO Client

### Backend

- Node.js
- Express
- MongoDB and Mongoose
- Redis and ioredis
- Firebase authentication integration
- LangChain and LangGraph
- Socket.IO
- node-pty
- HTTP proxying through the API gateway

### Development and infrastructure

- Docker
- Docker Compose
- Git and GitHub

## Architecture

The frontend communicates with the API gateway. The gateway routes HTTP requests to the appropriate backend service and checks the Redis-backed session for protected routes. The terminal service also uses Socket.IO for interactive terminal communication.

```text
React Frontend
     |
     | HTTP / Socket.IO
     v
API Gateway (:8000)
     |
     +---- Auth Service       (:8001)
     +---- Project Service    (:8002)
     +---- File Service       (:8003)
     +---- AI Service         (:8004)
     +---- Terminal Service   (:8005)
     +---- Payment Service    (:8006)
     |
     +---- Redis (sessions)
     
Backend services ---- MongoDB
```

The ports shown above are the default ports used by the service entry points. Environment variables can override them. When services run in separate Docker containers, configure service URLs using Docker Compose service names rather than `localhost`.

### Service responsibilities

| Component | Responsibility |
|---|---|
| Frontend | User interface, editor, project navigation, AI chat, and terminal UI |
| API Gateway | Request routing, cookie handling, CORS, request logging, and session protection |
| Auth Service | Authentication-related routes and user/session workflows |
| Project Service | Project-related API operations |
| File Service | File and folder operations and project tree retrieval |
| AI Service | AI chat workflow, streamed events, and credit deduction integration |
| Terminal Service | Terminal sessions, project workspace synchronization, and Socket.IO communication |
| Payment Service | Payment-related API operations |
| Redis | Session lookup and session data |
| MongoDB | Persistent application data |

## Repository Structure

The repository is organized into a frontend and a backend containing the gateway, shared backend utilities, and independent services.

```text
Code-Editor-IDE/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── gateway/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── utils/
    │   └── index.js
    ├── shared/
    │   └── redis/
    ├── services/
    │   ├── auth/
    │   ├── project/
    │   ├── file/
    │   ├── ai/
    │   ├── terminal/
    │   └── payment/
    └── docker-compose.yml
```

Some folders contain additional routes, controllers, models, configuration, and service-specific dependencies.

## Prerequisites

Install the following before running the project:

- Node.js and npm (use a version compatible with the packages in the repository).
- MongoDB, either a local instance or a hosted MongoDB deployment.
- Redis, locally or through Docker.
- Firebase project configured for the authentication flow.
- Required AI provider credentials and any other credentials used by the current AI graph and payment implementation.
- Git.

The terminal service uses `node-pty`, which may require platform-specific build tools. Follow the package's installation requirements for your operating system.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aryannair005/Code-Editor-IDE.git
cd Code-Editor-IDE
```

### 2. Configure environment variables

Create the required `.env` files for the frontend, gateway, and each backend service that needs configuration. Environment variables are loaded by individual service processes, so a variable in one service's `.env` file is not automatically available to another service.

Do not commit real credentials. Keep local environment files out of version control and provide only placeholder values in any example environment files.

#### Frontend

Create `frontend/.env`:

```dotenv
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
```

Set the Firebase web configuration to match your Firebase project. Other Firebase configuration values are defined in the frontend configuration and should be checked against your own Firebase project.

#### API Gateway

Create `backend/gateway/.env`:

```dotenv
PORT=8000
FRONTEND_URL=http://localhost:5173
AUTH_SERVICE=http://localhost:8001
PROJECT_SERVICE=http://localhost:8002
FILE_SERVICE=http://localhost:8003
AI_SERVICE=http://localhost:8004
TERMINAL_SERVICE=http://localhost:8005
PAYMENT_SERVICE=http://localhost:8006
REDIS_URL=redis://localhost:6379
```

If Redis or the services run in Docker, update the URLs to use the appropriate container/service hostnames and exposed ports.

#### Backend services

Create a separate environment file in each service directory that requires it, for example:

- `backend/services/auth/.env`
- `backend/services/project/.env`
- `backend/services/file/.env`
- `backend/services/ai/.env`
- `backend/services/terminal/.env`
- `backend/services/payment/.env`

Configure the variables used by each service's source code. Common configuration includes:

```dotenv
PORT=8001
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
```

Use the correct port for each service. The gateway imports the shared Redis client, so its Redis configuration must be available when the gateway starts. If another service imports shared Redis utilities, configure Redis for that service as well.

The AI and payment services may require provider-specific API keys, Firebase server credentials, or payment gateway credentials. Check the corresponding service configuration and controllers for the exact variable names required by your current checkout. Never publish private keys, service-account JSON files, database credentials, payment secrets, or production tokens.

### 3. Start Redis

If Docker is installed, the backend includes a Compose file for Redis:

```bash
cd backend
docker compose up -d redis
```

Check that the Redis container is running:

```bash
docker compose ps
```

The provided Compose file starts Redis only. It does not automatically start all backend services or MongoDB.

If Redis runs inside Docker while Node.js services run directly on your machine, `redis://localhost:6379` works when port 6379 is published to the host. If the Node.js services also run in Docker, use the Redis Compose service name (for example, `redis://redis:6379`) on the shared Docker network.

### 4. Install dependencies

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install dependencies separately in the gateway and each service:

```bash
cd ../backend/gateway
npm install
```

Repeat `npm install` inside each service directory that has its own `package.json`:

```text
backend/services/auth
backend/services/project
backend/services/file
backend/services/ai
backend/services/terminal
backend/services/payment
```

The repository uses service-specific package manifests; installing dependencies in the frontend does not install backend dependencies.

### 5. Start the backend services

Open a separate terminal for each process. Start the services after configuring their environment variables and ensuring their dependencies are available.

For each service, run its development script from that service's directory if available. For example:

```bash
cd backend/gateway
npm run dev
```

The gateway's default port is `8000`. The service entry points default to ports `8001` through `8006` as listed in the architecture section.

Start Redis and MongoDB before starting services that depend on them. Confirm that each service connects successfully by checking its terminal logs. If a service fails to start, check its own `.env` file, connection string, port, and dependencies.

### 6. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

Make sure `VITE_SERVER_URL` points to the running gateway and `FRONTEND_URL` in the gateway matches the frontend origin. Restart the affected process after changing environment variables.

## Available Scripts

### Frontend

Run these commands from `frontend/`:

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Backend services

The gateway and service package manifests generally provide:

| Command | Description |
|---|---|
| `npm run dev` | Start the service with Nodemon, where configured |
| `npm start` | Start the service with Node.js, where configured |

Run backend commands from the relevant service directory. There is currently no single root command documented here that starts every service at once.

## AI Workflow

The AI service exposes a chat route through the gateway and uses a LangGraph workflow. The controller accepts a project identifier, a message, and optional conversation history. Responses are streamed to the client using Server-Sent Events, including message, tool, completion, and error events.

The AI flow also integrates a credit deduction utility. Configure the AI provider and any required credentials before using this feature. Exact agent capabilities depend on the current graph and tool implementations in `backend/services/ai/`.

## Terminal Workflow

The terminal service uses Socket.IO and `node-pty` to provide interactive shell sessions. It synchronizes a project's file tree into a workspace directory before spawning the shell process.

The terminal implementation executes real shell commands. Do not expose an untrusted or publicly accessible deployment without robust authentication, project-level authorization, process isolation, and resource limits. A production deployment should run terminal sessions in restricted containers or sandboxes and must not expose application secrets to executed code.

## Troubleshooting

### Redis connection refused

- Confirm Redis is running and port 6379 is reachable.
- Check `REDIS_URL` in the environment of the process connecting to Redis.
- Remember that `localhost` inside a container refers to that container, not another container.
- Confirm services share a Docker network when using Compose service names.

### MongoDB connection errors

- Confirm the correct MongoDB environment variable is set for that service.
- Check the connection string, network access rules, database credentials, and cluster availability.
- Restart the service after changing its environment file.
- Do not assume that one service's environment variables are inherited by another service.

### Frontend cannot reach the API

- Confirm the gateway is listening on port 8000.
- Check `VITE_SERVER_URL` and the gateway's `FRONTEND_URL`.
- Verify that the target service is running and that the gateway's service URL points to the correct host and port.
- Inspect browser developer tools and gateway logs for CORS, network, and proxy errors.

### Authentication fails

- Verify the Firebase web configuration and allowed authentication domains.
- Check server-side authentication credentials and the session flow.
- Confirm Redis is reachable and the session exists.
- Never solve authentication issues by disabling authorization checks.

### Terminal does not connect

- Confirm the terminal service is running and the gateway's terminal URL is correct.
- Check Socket.IO/WebSocket proxying and browser network logs.
- Check that the terminal service can reach the file service and access its workspace directory.
- Review the `node-pty` installation requirements for your operating system.

## Security Considerations

- Store secrets in environment variables or a dedicated secret manager; do not commit them.
- Restrict CORS to trusted frontend origins.
- Authenticate Socket.IO connections and derive user identity from verified server-side credentials rather than trusting a client-supplied user ID.
- Verify project ownership and permissions before reading files or opening terminal sessions.
- Isolate terminal processes and enforce CPU, memory, execution-time, and filesystem limits.
- Validate and limit uploaded or generated file content, request sizes, and AI tool operations.
- Use HTTPS and secure cookie settings in production.
- Add rate limits and robust logging while avoiding sensitive data in logs.
- Verify payment events server-side before granting credits or entitlements.

## Roadmap

Potential next steps for the project include:

- A reproducible Docker Compose setup for all required services.
- Automated tests for authentication, project/file access, and gateway routing.
- Health checks and structured logging across services.
- Stronger isolation for terminal execution.
- More comprehensive setup documentation and environment examples.
- Deployment documentation and a live demo.

Roadmap items are plans, not a claim that these features are already complete.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes and test the affected service.
4. Use clear commit messages.
5. Open a pull request describing the change and any configuration updates.

## License

No license is currently specified in this repository. Unless a license is added, the default copyright rules apply and reuse or redistribution is not automatically permitted.

## Author

**Aryan Nair**

- GitHub: [@aryannair005](https://github.com/aryannair005)
- Project: [Code-Editor-IDE](https://github.com/aryannair005/Code-Editor-IDE)
