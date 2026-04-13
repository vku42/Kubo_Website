import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTicket = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const ticketId = await ctx.db.insert("supportTickets", {
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      subject: args.subject,
      message: args.message,
      status: "pending",
      createdAt: Date.now(),
    });
    return ticketId;
  },
});

export const getTickets = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("supportTickets")
      .order("desc")
      .collect();
  },
});
