import { z } from "zod";

export const formSchema = z.object({
  link: z.string().min(2).max(200),
  name: z.string().min(1).max(50),
  icon: z.string({
    required_error: "Please select an icon.",
  }),
});
