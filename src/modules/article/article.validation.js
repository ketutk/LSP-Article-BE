const { z } = require("zod");

exports.ArticleSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  image: z.string().optional(),
});
