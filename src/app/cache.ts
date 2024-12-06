export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  }
} 