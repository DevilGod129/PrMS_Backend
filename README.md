# PRMS Backend

Minimal Express.js backend (boilerplate) for PRMS project.

## Summary

This repository contains a small Express server with a simple routing/controller example and a request logger middleware. It's intended as a starting point for building REST APIs.

## Requirements

- Node.js installed (assume v14+; recommend v18+)
- npm (bundled with Node.js)

Note: This README infers a Node.js runtime; adjust the Node version if your project requires a different one.

## Install

Open a PowerShell or terminal in the project root and install dependencies:

```powershell
npm install
```

## Available scripts

- `npm start` — run the server with Node: uses `node server.js`
- `npm run dev` — run server with `nodemon` for development

Run the dev server:

```powershell
npm run dev
```

Or run production:

```powershell
npm start
```

The server listens on the port defined in the `PORT` environment variable or defaults to `5000`.

## Quick test

After the server is running, hit the endpoints:

```powershell
curl http://localhost:5000/api/
# or (PowerShell native)
Invoke-RestMethod http://localhost:5000/api/
```

Expected response for `GET /api/`:

> 🚀 Welcome to Express Boilerplate

And for `GET /api/hello`:

```json
{ "message": "Hello from controller!" }
```

## API Endpoints

- GET /api/ — root message
- GET /api/hello — sample controller JSON response

All routes are mounted under the `/api` prefix by `server.js`.

## Middleware

`src/middlewares/logger.js` logs each incoming request to the console (method and URL) and calls `next()`.

## Project structure

```
.
├── server.js                # app entry
├── package.json
├── README.md
└── src
    ├── routes
    │   └── index.js        # route definitions (mounts controllers)
    ├── controllers
    │   └── samplecontroller.js
    └── middlewares
        └── logger.js
```

## Environment

Configure the port (optional):

```powershell
$env:PORT=4000; npm start
```

## Contributing

Small changes and improvements are welcome. Typical workflow:

1. Fork or branch
2. Implement changes
3. Create a PR with a short description

## License

This project uses the ISC license (see `package.json`).

## Notes

- Update `package.json` `author` and `description` fields as appropriate.
- Add more routes and controllers under `src/` as your API grows.

---

If you want, I can also add a short Postman/Insomnia collection, expand the README with contribution/PR guidelines, or add a .env guide—tell me which you prefer.
