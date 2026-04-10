import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPendingOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    // We don't have a products table populated yet, but we'll use a hardcoded reference or ID
    // For now, we'll just save the order details
    const orderId = await ctx.db.insert("orders", {
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      shippingAddress: args.shippingAddress,
      status: "pending",
      amount: args.amount,
      createdAt: Date.now(),
      // productId would go here if we had a specific one
    } as any);
    
    return orderId;
  },
});
