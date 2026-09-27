import { LoadingStateLight } from "@/component/Loading";

export default function CertificatesLoading() {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      <LoadingStateLight variant="violet" message="Loading certificates..." />
    </main>
  );
}
