import { z } from 'zod';
import { ZodReturnType } from "../utils/types";

// Define the RelatedDateType enum
export const RelatedDateType = z.enum(['Expiration', 'Effective']);

// Define the validation schema using Zod
// Define the validation schema for requests

//z.string().uuid().optional()  dont use uuid() gives error
export const addRequestValidationSchema = z
  .object({
    id: z.string().optional(),
    requestNumber: z.string().optional(), // Optional request number
    applicationId: z.string().optional(), // Optional UUID for contract
    requestPartners: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .nonempty({ message: 'At least one request party is required.' }), // Make it required
    requestParties: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .nonempty({ message: 'At least one request party is required.' }), // Make it required
    requestTypeId: z.string().optional(), // Optional UUID for request type
    requestType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    requestRoleId: z.string().optional(), // Optional UUID for request type
    requestRole: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    requestOwnerId: z.string().optional(), // Optional UUID for request type
    requestOwner: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    shortDescription: z.string().nullable().optional(), // Optional short description
    requestEntities: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(), // Adjusted to an array of objects
    departments: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(), // Adjusted to an array of objects
    businessGroup: z.string().nullable().optional(), // Optional short description
    tags: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(), // Adjusted to an array of objects

    requestGroups: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .nonempty({ message: 'At least one request group is required.' }), // Make it required
    notes: z.string().nullable().optional(), // Optional short description
    effectiveDate: z.date().nullable().optional(), // Optional effective date
    expirationDate: z.date().nullable().optional(), // Optional expiration date
    autoRenewal: z.boolean().optional().default(false), // Optional boolean for auto-renewal with a default value of false
    includeAmount: z.boolean().optional().default(false), // Optional boolean for auto-renewal with a default value of false
    numberOfRenewals: z.number().nullable().optional().default(1),
    durationUnitId: z.string().optional(), // Optional UUID for request type
    durationUnit: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    renewalTypeId: z.string().optional(), // Optional UUID for request type
    renewalType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .optional(),
    endsAfter: z.number().nullable().optional().default(1),
    requestValue: z.number().nullable().optional(),
    sendAlert: z.boolean().optional().default(false),
    alertId: z.string().nullable().optional(),
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
        source: z.string(),
        code: z.string(),
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
        })
      )
      .optional(),
    includeMessage: z.boolean().optional().default(false),
    customMessage: z.string().nullable().optional(),
    // lastUpdate: z.date().nullable().optional(),  // Optional last update date
  })
  .superRefine((data, ctx) => {
    if (!data.applicationId) {
      ctx.addIssue({
        path: ['applicationId'],
        message: 'Application ID is required.',
        code: 'custom',
      });
    }

    if (!data.requestType?.id) {
      ctx.addIssue({
        path: ['requestType'],
        message: 'Request type is required.',
        code: 'custom',
      });
    }

    if (!data.requestRole?.id) {
      ctx.addIssue({
        path: ['requestRole'],
        message: 'Request role is required.',
        code: 'custom',
      });
    }

    if (data.includeAmount) {
      if (data.requestValue === null || data.requestValue === undefined) {
        ctx.addIssue({
          path: ['requestValue'],
          message: 'Request value is required when "Include Amount" is true.',
          code: 'custom',
        });
      }
    }

    if (data.autoRenewal) {
      if (data.numberOfRenewals === null || data.numberOfRenewals === undefined) {
        ctx.addIssue({
          path: ['numberOfRenewals'],
          message: 'Number of renewals is required when "Auto Renewal" is true.',
          code: 'custom',
        });
      }

      if (!data.durationUnit?.id) {
        ctx.addIssue({
          path: ['durationUnit'],
          message: 'Duration unit is required when "Auto Renewal" is true.',
          code: 'custom',
        });
      }

      if (!data.renewalType?.id) {
        ctx.addIssue({
          path: ['renewalType'],
          message: 'Renewal type is required when "Auto Renewal" is true.',
          code: 'custom',
        });
      }

      if (
        (data.endsAfter === null || data.endsAfter === undefined) &&
        data.renewalType?.name === 'Ends After'
      ) {
        ctx.addIssue({
          path: ['endsAfter'],
          message: 'Ends after is required when "Auto Renewal" is true.',
          code: 'custom',
        });
      }
    }

    if (data.sendAlert) {

      if (data.alertDayCount === null || data.alertDayCount === undefined) {
        ctx.addIssue({
          path: ['alertDayCount'],
          message: 'Alert day count is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (!data.referenceTiming?.id) {
        ctx.addIssue({
          path: ['alertReferenceTiming'],
          message: 'Alert reference timing is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (!data.relatedDateType?.id) {
        ctx.addIssue({
          path: ['relatedDateType'],
          message: 'Related date type is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (!data.repetitionType?.id) {
        ctx.addIssue({
          path: ['repetitionType'],
          message: 'Repetition type is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (
        data.repetitionType?.name !== 'No Repetition' &&
        (data.numberOfAlertOccurrences === null || data.numberOfAlertOccurrences === undefined)
      ) {
        ctx.addIssue({
          path: ['numberOfAlertOccurrences'],
          message: 'Number of alert occurrences is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (data.alertRecipients?.length === 0) {
        ctx.addIssue({
          path: ['alertRecipients'],
          message: 'At least one alert recipient is required when "Send Alert" is true.',
          code: 'custom',
        });
      }

      if (data.includeMessage && !data.customMessage) {
        ctx.addIssue({
          path: ['customMessage'],
          message: 'Custom message is required when "Include Message" is true.',
          code: 'custom',
        });
      }

      // Expiration Date Validation based on Enum
      if (
        data.relatedDateType?.code === RelatedDateType.Values.Expiration &&
        !data.expirationDate
      ) {
        ctx.addIssue({
          path: ['expirationDate'],
          message: 'Expiration date is required when "Related Date Type" is "Expiration".',
          code: 'custom',
        });
      }

      // Effective Date Validation based on Enum
      if (data.relatedDateType?.code === RelatedDateType.Values.Effective && !data.effectiveDate) {
        ctx.addIssue({
          path: ['effectiveDate'],
          message: 'Expiration date is required when "Related Date Type" is "Expiration".',
          code: 'custom',
        });
      }
    }
  });

export type AddRequestFormValues = ZodReturnType<typeof addRequestValidationSchema>;
