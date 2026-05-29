import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generate typed React hook helper functions
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
