import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    gameTitle: z.string(),
    description: z.string(), // Essential for Meta Descriptions & Search Previews
    releaseDate: z.date(),
    score: z.number().min(0).max(10),
    verdict: z.string(),
    coverImage: z.string(),
    genre: z.string(),
    publisher: z.string(),
    platforms: z.array(z.string()),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    author: z.string(),
  }),
});

export const collections = {
  reviews: reviewsCollection,
};