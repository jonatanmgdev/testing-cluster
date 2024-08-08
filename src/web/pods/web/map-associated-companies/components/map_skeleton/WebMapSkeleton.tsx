"use client";
import { Skeleton } from "@/web/common/components/ui/skeleton";

const WebMapSkeleton = () => {
  return (
    <div>
      {/* Map Banner Skeleton */}
      <div className="w-full h-36 bg-gray-300 mb-8">
        <Skeleton className="h-full w-full bg-gray-300" />
      </div>

      <div className="container">
        {/* Header Skeleton */}
        <div className="flex flex-col items-start space-y-2 mb-4">
          <Skeleton className="h-6 w-1/6 bg-gray-300" />
          <Skeleton className="h-8 w-full bg-gray-300" />
        </div>

        {/* Category Filters Skeleton */}
        <div className="flex space-x-2 overflow-x-auto">
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton key={index} className="flex-shrink-0 h-8 w-24 bg-gray-300" />
          ))}
        </div>

        {/* Map Section Skeleton */}
        <div className="w-full h-96 bg-gray-300 rounded-lg my-4">
          <Skeleton className="h-full w-full bg-gray-300" />
        </div>

        {/* Company Cards Skeleton */}
        <div className="flex space-x-4 overflow-x-auto py-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow">
              <Skeleton className="h-20 w-20 mb-4 bg-gray-300 rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-2 bg-gray-300" />
              <Skeleton className="h-4 w-2/3 mt-2 bg-gray-300" />
              <Skeleton className="h-4 w-1/2 mt-2 bg-gray-300" />
              <Skeleton className="h-4 w-1/6 mt-2 bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebMapSkeleton;