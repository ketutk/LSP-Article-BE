const { z } = require("zod");

exports.LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

exports.RegisterSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  password: z.string().min(1),
  nik: z.string().min(1),
  photo: z.any(),
});
