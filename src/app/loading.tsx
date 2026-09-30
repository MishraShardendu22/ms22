import { LoadingStateLight } from "@/component/Loading";

export default function RootLoading() {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative flex items-center justify-center">
      <LoadingStateLight
        variant="violet"
        message="Loading..."
        className="min-h-0"
      />
    </main>
  );
}
