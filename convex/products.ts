import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getProduct = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// A seed function just to populate data exactly once if needed
export const seedProduct = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    if (existing.length === 0) {
      await ctx.db.insert("products", {
        name: "Kubo Bot",
        description: "Your modern desktop companion that fights loneliness, keeps you productive, and makes your desk alive.",
        price: 1999,
        currency: "INR",
        images: ["/Photos/img1.jpg", "/Photos/img2.jpg"],
        features: ["Productivity Focus", "Emotional Support", "Desktop Companion", "Zero Judgment"],
        inStock: true,
      });
    }
  }
});
