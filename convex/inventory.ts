import { query } from "./_generated/server";

export const getStock = query({
  handler: async (ctx) => {
    const stock = await ctx.db.query("inventory").first();
    // Fallback to 47 if the DB schema hasn't been seeded yet
    return stock ? stock.unitsLeft : 47; 
  },
});
