import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPendingOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    customerUpiId: v.optional(v.string()),
    shippingAddress: v.string(),
    amount: v.float64(),
    paymentMethod: v.string(),
    paymentId: v.optional(v.string()),
    productId: v.optional(v.id("products")),
  },
  handler: async (ctx, args) => {
    try {
      const orderId = await ctx.db.insert("orders", {
        customerName: args.customerName,
        customerEmail: args.customerEmail,
        customerPhone: args.customerPhone,
        customerUpiId: args.customerUpiId || undefined,
        shippingAddress: args.shippingAddress,
        status: args.paymentMethod === "manual_upi" ? "verification_pending" : "pending",
        paymentMethod: args.paymentMethod,
        amount: args.amount,
        paymentId: args.paymentId,
        productId: args.productId,
        createdAt: Date.now(),
      });
      return orderId;
    } catch (err) {
      console.error("CONVEX INSERT ERROR:", err);
      throw err;
    }
  },
});

export const markOrderAsPaid = mutation({
  args: {
    paymentId: v.string(),
    newStatus: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("paymentId"), args.paymentId))
      .first();

    if (order) {
      await ctx.db.patch(order._id, { status: args.newStatus });
      
      // Also decrement inventory if it's a success
      if (args.newStatus === "paid") {
        const stock = await ctx.db.query("inventory").first();
        if (stock) {
          await ctx.db.patch(stock._id, { unitsLeft: Math.max(0, stock.unitsLeft - 1) });
        }
      }
    }
  },
});
export const attachPaymentProof = mutation({
  args: {
    orderId: v.string(), // accepting string for robustness
    proofUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Safety check: ensure we aren't trying to link a 'manual_' placeholder ID
    if (args.orderId.includes("manual_")) {
      throw new Error(`Cannot attach proof to a placeholder ID: ${args.orderId}`);
    }

    await ctx.db.patch(args.orderId as any, {
      paymentProofUrl: args.proofUrl,
      status: "proof_uploaded",
    });
  },
});
