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
    productId: v.id("products"),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    status: v.string(), // "pending", "paid", "shipped"
    paymentId: v.optional(v.string()),
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
});
