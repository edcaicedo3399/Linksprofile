import { z } from "zod";

export const formSchema = z.object({
  link: z.string().min(2).max(200),
});
