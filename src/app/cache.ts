export async function generateMetadata() {
  return {
    other: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  }
} 