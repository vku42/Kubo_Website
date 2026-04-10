import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("newsletter")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      return { success: true, message: "Already subscribed!" };
    }

    await ctx.db.insert("newsletter", {
      email: args.email,
      createdAt: Date.now(),
    });

    return { success: true, message: "Subscribed successfully!" };
  },
});
