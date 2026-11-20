import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Expose GET and POST API routes for the UploadThing server handler
// The UPLOADTHING_TOKEN is read securely from server environment variables (never exposed to client browser)
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});


