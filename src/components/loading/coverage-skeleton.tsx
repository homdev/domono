export const LoadingSkeletonCoverage = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto"/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeletonCoverage 