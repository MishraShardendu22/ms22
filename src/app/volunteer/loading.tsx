import { LoadingStateLight } from "@/component/Loading";

export default function VolunteerLoading() {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative flex items-center justify-center">
      <LoadingStateLight
        variant="pink"
        message="Loading volunteer experiences..."
        className="min-h-0"
      />
    </main>
  );
}
