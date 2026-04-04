import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Serve static assets from client/dist
app.use("/*", serveStatic({ root: "./client/dist" }));

// SPA fallback — serve index.html for all non-API routes
app.get("*", serveStatic({ root: "./client/dist", path: "index.html" }));

export default app;
