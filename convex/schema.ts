import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.string(),
    images: v.array(v.string()), // URLs to cloudinary or other
    features: v.array(v.string()),
    inStock: v.boolean(),
  }),
  orders: defineTable({
    productId: v.optional(v.id("products")),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    customerUpiId: v.optional(v.string()), // For manual verification
    shippingAddress: v.string(),
    status: v.string(), // "pending", "paid", "shipped", "verification_pending", "proof_uploaded"
    paymentMethod: v.optional(v.string()), // "instamojo" | "manual_upi"
    paymentId: v.optional(v.string()), // Instamojo ID or Transaction ID
    paymentProofUrl: v.optional(v.string()), // Cloudinary URL
    amount: v.number(),
    createdAt: v.number(),
  }),
  newsletter: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }),
  inventory: defineTable({
    batchName: v.string(),
    unitsLeft: v.number(),
  }),
  supportTickets: defineTable({
    customerName: v.string(),
    customerEmail: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.string(), // "pending", "resolved"
    createdAt: v.number(),
  }),
});
