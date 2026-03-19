import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('S&Sセミナー'),
    category: z.enum(['お知らせ', '子育てコラム', 'イベント', '学習のヒント']).default('お知らせ'),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
