import { z } from "astro:content";

export const postSchema = z.object({
    title: z.string().min(1),
    tags: z.array(z.string()),
    summary: z.string().min(1),
    created: z.date(),
});

export const postsSchema = z.array(
    z.object({
        slug: z.string(),
        data: postSchema,
    }),
);
