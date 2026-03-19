/**
 * microCMS Client
 *
 * Usage:
 * 1. Create a microCMS service at https://microcms.io
 * 2. Create an API with endpoint "blog" and the following fields:
 *    - title (テキストフィールド)
 *    - description (テキストフィールド)
 *    - content (リッチエディタ)
 *    - category (セレクトフィールド: お知らせ, 子育てコラム, イベント, 学習のヒント)
 *    - eyecatch (画像フィールド, optional)
 * 3. Set environment variables:
 *    - MICROCMS_SERVICE_DOMAIN=your-service-id
 *    - MICROCMS_API_KEY=your-api-key
 */

import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries, MicroCMSImage } from 'microcms-js-sdk';

// microCMS client — only created if env vars are set
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

export const isMicroCMSConfigured = !!(serviceDomain && apiKey);

const client = isMicroCMSConfigured
  ? createClient({
      serviceDomain: serviceDomain!,
      apiKey: apiKey!,
    })
  : null;

// Blog post type
export type BlogPost = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  eyecatch?: MicroCMSImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// Fetch blog list
export async function getBlogList(queries?: MicroCMSQueries) {
  if (!client) return { contents: [], totalCount: 0, offset: 0, limit: 10 };

  return client.getList<BlogPost>({
    endpoint: 'blog',
    queries: {
      limit: 20,
      orders: '-publishedAt',
      ...queries,
    },
  });
}

// Fetch single blog post
export async function getBlogDetail(contentId: string, queries?: MicroCMSQueries) {
  if (!client) return null;

  return client.getListDetail<BlogPost>({
    endpoint: 'blog',
    contentId,
    queries,
  });
}
