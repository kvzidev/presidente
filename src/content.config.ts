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

export const collections = { vision };
