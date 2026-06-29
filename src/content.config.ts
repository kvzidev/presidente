import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const vision = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vision' }),
  schema: z.object({
    year: z.number(),
    lang: z.enum(['es-AR', 'en']),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    lang: z.enum(['es-AR', 'en']),
    image: z.string(),
  }),
});

export const collections = { vision, stories };
