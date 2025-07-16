import Joi from "joi";

// Schema for retrieving a single client by ID
export const getClientByIdSchema = Joi.object({
    id: Joi.string().required(),
});

// Schema for creating a new client with all required fields and validations
export const createClientSchema = Joi.object({
    // Basic client information
    name: Joi.string().min(2).max(100).required(),
    company: Joi.string().min(2).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^201[0-9]{9}$/).required(), // Egyptian phone number format
    alternativePhone: Joi.string().pattern(/^201[0-9]{9}$/).optional(),
    website: Joi.string().uri(),
    industry: Joi.string(),

    // Address information
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string().required(),
        governorate: Joi.string(),
        country: Joi.string().required(),
        postalCode: Joi.string()
    }).required(),

    // Primary contact person details
    contactPerson: Joi.object({
        name: Joi.string().min(2).max(100),
        position: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string().pattern(/^201[0-9]{9}$/)
    }),

    // Financial information and settings
    financialInfo: Joi.object({
        creditLimit: Joi.number().min(0),
        paymentTerms: Joi.string(),
        taxNumber: Joi.string(),
        currency: Joi.string().default("EGP")
    }),

    // Business-related information
    businessInfo: Joi.object({
        foundedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
        employeeCount: Joi.number().integer().min(0),
        annualRevenue: Joi.number().min(0),
        businessType: Joi.string()
    }),

    // Contract dates
    contractStartDate: Joi.date().iso(),
    contractEndDate: Joi.date().iso(),

    // Client status and classification
    status: Joi.string().valid("active", "inactive", "blacklisted").default("active"),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
    source: Joi.string().valid("website", "referral", "social", "other"),
    tags: Joi.array().items(Joi.string()),
    documents: Joi.array().items(Joi.string()),

    // Social media presence
    socialMedia: Joi.object({
        facebook: Joi.string().uri(),
        linkedin: Joi.string().uri(),
        twitter: Joi.string()
    }),

    // Additional notes
    notes: Joi.string().max(500)
});

// Schema for updating existing client information - all fields are optional
export const updateClientSchema = Joi.object({
  clientNumber: Joi.string().alphanum().min(3).max(20),

  // Basic Info
  name: Joi.string().min(2).max(100),
  company: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^201[0-9]{9}$/),
  alternativePhone: Joi.string().pattern(/^201[0-9]{9}$/),
  website: Joi.string().uri(),
  industry: Joi.string().max(100),

  // Address
  address: Joi.object({
    street: Joi.string().max(100),
    city: Joi.string().max(100),
    governorate: Joi.string().max(100),
    country: Joi.string().max(100),
    postalCode: Joi.string().max(20),
  }),

  // Contact Person
  contactPerson: Joi.object({
    name: Joi.string().min(2).max(100),
    position: Joi.string().max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^201[0-9]{9}$/),
  }),

  // Financial Info
  financialInfo: Joi.object({
    creditLimit: Joi.number().min(0),
    paymentTerms: Joi.string().max(50),
    taxNumber: Joi.string().max(50),
    currency: Joi.string().length(3),
  }),

  // Business Info
  businessInfo: Joi.object({
    foundedYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    employeeCount: Joi.number().integer().min(0),
    annualRevenue: Joi.number().min(0),
    businessType: Joi.string().max(50),
  }),

  // Stats
  totalProjects: Joi.number().integer().min(0),
  activeProjects: Joi.number().integer().min(0),
  completedProjects: Joi.number().integer().min(0),
  totalPayments: Joi.number().min(0),
  outstandingPayments: Joi.number().min(0),
  lastPaymentDate: Joi.date().iso(),

  // Meta
  status: Joi.string().valid("active", "inactive", "blacklisted"),
  priority: Joi.string().valid("low", "medium", "high"),
  source: Joi.string().valid("website", "referral", "social", "other"),
  contractStartDate: Joi.date().iso(),
  contractEndDate: Joi.date().iso(),
  documents: Joi.array().items(Joi.string()),
  notes: Joi.string().max(500),
  tags: Joi.array().items(Joi.string().max(50)),

  // Social
  socialMedia: Joi.object({
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    twitter: Joi.string().max(50),
  }),

  // Audit
  updatedBy: Joi.string().alphanum().min(3),
});
// Schema for deleting a client by ID
export const deleteClientSchema = Joi.object({
    id: Joi.string().required(),
});
