// components/ProfileSkeleton.tsx
export default function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-3 py-2 px-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="hidden sm:block">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
