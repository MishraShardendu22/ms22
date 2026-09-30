import { LoadingStateLight } from "@/component/Loading";

export default function ExperiencesLoading() {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative flex items-center justify-center">
      <LoadingStateLight
        variant="violet"
        message="Loading experiences..."
        className="min-h-0"
      />
    </main>
  );
}
