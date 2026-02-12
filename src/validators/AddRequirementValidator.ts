import { z } from "zod";
import { ZodReturnType } from "../utils/types";

// Define the validation schema using Zod
// Define the validation schema for requirements

//z.string().uuid().optional()  dont use uuid() gives error
export const addRequirementValidationSchema = z
  .object({
    requestId: z.string().nullable().optional(), // Optional UUID for request
    summary: z.string().min(1, "Summary is required"), // Title must be a non-empty string
    requirementTypeId: z.string().nullable().optional(), // Optional UUID for requirement type
    requirementType: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
      })
      .nullable()
      .optional(), // Optional nested object for requirement type

    notes: z.string().nullable().optional(), // Optional notes field
    hasRequirementDate: z.boolean().optional(), // Optional boolean field
    dueDate: z.date().nullable().optional(), // Optional date field
    hasLinkToRequestDate: z.boolean().optional(),
    due_day_count: z.number().nullable().optional(),
    dueReferenceTimingId: z.string().nullable().optional(),
    dueReferenceTiming: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    dueRelatedDateTypeId: z.string().nullable().optional(),
    dueRelatedDateType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    hasLinkToDocumentDueDate: z.boolean().optional(),
    documentId: z.string().nullable().optional(),
    document: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    sendAlert: z.boolean().optional().default(false),
    alertTypeId: z.string().nullable().optional(),
    alertType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    alertDayCount: z.number().nullable().optional(),
    referenceTimingId: z.string().nullable().optional(),
    referenceTiming: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    relatedDateTypeId: z.string().nullable().optional(),
    relatedDateType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    repetitionTypeId: z.string().nullable().optional(),
    repetitionType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    numberOfAlertOccurrences: z.number().nullable().optional(),
    alertRecipients: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      )
      .optional(),
    includeMessage: z.boolean().optional().default(false),
    customMessage: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasLinkToRequestDate) {

      if (data.due_day_count === null || data.due_day_count === undefined) {
        ctx.addIssue({
          path: ["due_day_count"],
          message:
            'Due day count is required when "Link to Request Date" is true.',
          code: "custom",
        });
      }

      if (!data.dueReferenceTiming?.id) {
        ctx.addIssue({
          path: ["dueReferenceTiming"],
          message:
            'Due reference timing is required when "Link to Request Date" is true.',
          code: "custom",
        });
      }

      if (!data.dueRelatedDateType?.id) {
        ctx.addIssue({
          path: ["dueRelatedDateType"],
          message:
            'Due related date type is required when "Link to Request Date" is true.',
          code: "custom",
        });
      }

      if (data.hasLinkToDocumentDueDate && !data.document?.id) {
        ctx.addIssue({
          path: ["document"],
          message: 'Document is required when "Link to Request Date" is true.',
          code: "custom",
        });
      }
    }

    if (data.sendAlert) {

      if (data.alertDayCount === null || data.alertDayCount === undefined) {
        ctx.addIssue({
          path: ["alertDayCount"],
          message: 'Alert day count is required when "Send Alert" is true.',
          code: "custom",
        });
      }

      if (!data.referenceTiming?.id) {
        ctx.addIssue({
          path: ["alertReferenceTiming"],
          message:
            'Alert reference timing is required when "Send Alert" is true.',
          code: "custom",
        });
      }

      if (!data.relatedDateType?.id) {
        ctx.addIssue({
          path: ["relatedDateType"],
          message: 'Related date type is required when "Send Alert" is true.',
          code: "custom",
        });
      }

      if (!data.repetitionType?.id) {
        ctx.addIssue({
          path: ["repetitionType"],
          message: 'Repetition type is required when "Send Alert" is true.',
          code: "custom",
        });
      }

      if (
        data.repetitionType?.name !== "No Repetition" &&
        (data.numberOfAlertOccurrences === null ||
          data.numberOfAlertOccurrences === undefined)
      ) {
        ctx.addIssue({
          path: ["numberOfAlertOccurrences"],
          message:
            'Number of alert occurrences is required when "Send Alert" is true.',
          code: "custom",
        });
      }

      if (data.includeMessage && !data.customMessage) {
        ctx.addIssue({
          path: ["customMessage"],
          message: 'Custom message is required when "Include Message" is true.',
          code: "custom",
        });
      }
    }
  });

export type AddRequirementFormValues = ZodReturnType<
  typeof addRequirementValidationSchema
>;
