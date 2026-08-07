import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Expose GET and POST API routes for the UploadThing server handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN || "eyJhcGlLZXkiOiJza19saXZlXzAwNWNiN2YwMzc2ZDFhZGU5ZjBhOWM5NzdkMTA2ODc2NTIwZjkyMGIxY2JjYTg3Y2VlM2Y4NWQ2ZWNhYjRiZWYiLCJhcHBJZCI6ImhmMXA4b2E1bzYiLCJyZWdpb25zIjpbInNlYTEiXX0=",
  },
});


