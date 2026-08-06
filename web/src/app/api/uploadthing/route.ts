import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const dynamic = 'force-static';

// Expose GET and POST API routes for the UploadThing server handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
