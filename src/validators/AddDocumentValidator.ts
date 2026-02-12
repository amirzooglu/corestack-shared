
import { z } from "zod";
import { ZodReturnType } from "../utils/types";
import { DocumentFormatTypeEnum } from "../constants/documentFormatTypes";

// Define the validation schema using Zod
// Define the validation schema for documents

//z.string().uuid().optional()  dont use uuid() gives error
export const addDocumentValidationSchema = z
  .object({
    documentTitle: z.string().min(1, "Title is required"), // Title must be a non-empty string
    requestId: z.string().optional(), // Optional UUID for contract
    taskId: z.string().optional(), // Optional UUID for task
    documentSourceTypeId: z.string().optional(), // Optional UUID for document type
    documentTypeId: z.string().optional(), // Optional UUID for document type
    documentType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(), // Optional nested object for document type

    documentUploadTypeId: z.string().optional(), // Optional UUID for document upload type
    documentUploadType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(), // Optional nested object for document upload type
    documentTags: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      )
      .optional(), // Array of document tag objects

    fileUrl: z.string().url().optional(), // Optional URL for the file
    storagePath: z.string().optional(), // Optional string for storage path
    storageObjectId: z.string().optional(),
    embeddingStatus: z
      .enum(["PENDING", "PROCESSING", "FAILED", "SUCCESS"])
      .optional()
      .default("PENDING"),
    documentKey: z.string().optional(),
    documentFormat: z.nativeEnum(DocumentFormatTypeEnum).optional(),
    documentFormatTypeId: z.string().optional(),
    notes: z.string().optional(), // Optional notes field
  })
  .superRefine((data, ctx) => {
  });

export type AddDocumentFormValues = ZodReturnType<
  typeof addDocumentValidationSchema
>;
