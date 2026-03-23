const WP_API = "https://coyotespeakslove.com/wp-json/wp/v2";

function extractFirstImageFromHtml(html?: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || null;
}

async function attachFeaturedMedia(posts: any[]): Promise<any[]> {
  return Promise.all(
    posts.map(async (post) => {
      // 1. If embedded featured media already exists, use it
      const embeddedImage =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      if (embeddedImage) return post;

      // 2. Try fetching featured media directly from featured_media
      const mediaId = post.featured_media;
      if (mediaId) {
        try {
          const res = await fetch(`${WP_API}/media/${mediaId}`);
          if (res.ok) {
            const media = await res.json();
            if (media?.source_url) {
              return {
                ...post,
                _embedded: {
                  ...post._embedded,
                  "wp:featuredmedia": [{ source_url: media.source_url }],
                },
              };
            }
          }
        } catch {
          // keep falling through
        }
      }

      // 3. Final fallback: use the first image found in the post content HTML
      const firstContentImage = extractFirstImageFromHtml(
        post?.content?.rendered
      );

      if (firstContentImage) {
        return {
          ...post,
          _embedded: {
            ...post._embedded,
            "wp:featuredmedia": [{ source_url: firstContentImage }],
          },
        };
      }

      return post;
    })
  );
}

export async function getPosts(limit?: number) {
  const url = limit
    ? `${WP_API}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
    : `${WP_API}/posts?_embed&orderby=date&order=desc`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();
  return attachFeaturedMedia(posts);
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch post");

  const posts = await res.json();
  if (!posts[0]) return null;

  const [withMedia] = await attachFeaturedMedia([posts[0]]);
  return withMedia;
}