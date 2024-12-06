export const revalidate = 31536000 // 1 an

export async function generateMetadata() {
  return {
    other: {
      'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=59',
    },
  }
} 