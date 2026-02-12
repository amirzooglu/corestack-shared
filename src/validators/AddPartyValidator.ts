import { z } from "zod";
import { ZodReturnType } from "../utils/types";

// Define the validation schema for adding or updating a Party
export const addPartyValidationSchema = z.object({
  id: z.string().optional(),  // Party ID as an optional string (useful for updates)
  name: z.string().min(1, "Party Name is required"),  // Party name must be present and non-empty
  partyTypeId: z.string().optional(), // Optional UUID for contract type
  partyType:  z.object({
    id: z.string(),
    name: z.string(),
  }).optional(),
  
  websiteUrl: z.string().url().optional(),  // Website URL validation (optional)
  
  address: z
    .object({
      addressId: z.string().optional(),  // Address ID (optional)
      addressName: z.string().min(1, "Address name is required"),  // Address name validation
      addressLine1: z.string().optional(),  // Optional address line 1
      addressLine2: z.string().optional(),  // Optional address line 2
      city: z.string().optional(),  // Optional city
      provinceRegion: z.string().optional(),  // Optional province/region
      postalCode: z.string().optional(),  // Optional postal code
      country: z.string().min(1, "Country is required"),  // Country validation
      isAddressPrimary: z.boolean().optional(),  // Optional boolean to indicate if the address is primary
    })
    .optional(),  // Address validation (optional)

  contactInfo: z
    .object({
      contactInfoId: z.string().optional(),  // Contact info ID (optional)
      firstName: z.string().min(1, "First name is required"),  // First name validation
      middleName: z.string().optional(),  // Optional middle name
      lastName: z.string().min(1, "Last name is required"),  // Last name validation
      organizationalTitle: z.string().optional(),  // Optional organizational title
      phone: z.string().min(10, "Phone number is too short").optional(),  // Phone number validation (optional)
      email: z.string().email("Invalid email address").optional(),  // Email validation (optional)
      isContactInfoPrimary: z.boolean().optional(),  // Optional boolean to indicate if the contact is primary
    })
    .optional(),  // Contact info validation (optional)
}).superRefine((data, ctx) => {
  if (!data.partyType?.id ) {
    ctx.addIssue({
      path: ['partyType'],
      message: 'PArty type is required.',
      code: 'custom',
    });
  }
});
// Define the type for the form values based on the validation schema
export type AddPartyFormValues = ZodReturnType<typeof addPartyValidationSchema>;
