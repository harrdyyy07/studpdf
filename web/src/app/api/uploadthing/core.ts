import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Server-side File Router configuration
export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload is successful
      console.log("Upload completed successfully. File URL:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
