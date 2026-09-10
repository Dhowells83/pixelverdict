import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    gameTitle: z.string(),
    description: z.string(),
    releaseDate: z.coerce.date(),
    score: z.number().min(0).max(10),
    verdict: z.string(),
    coverImage: z.string(),
    genre: z.string(),
    publisher: z.string(),
    platforms: z.array(z.enum([
      'PC',
      'PS5',
      'PS5 Pro',
      'PS4',
      'Xbox Series X',
      'Xbox Series S',
      'Xbox One',
      'Switch',
      'Steam Deck',
      'ROG Ally',
      'iOS',
      'Android'
    ])),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    author: z.string(),
  }),
});

export const collections = { reviews };