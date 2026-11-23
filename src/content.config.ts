import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    reviewer: z.string().optional(),
    readingTime: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { guides };

