import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard - AI Support",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-1 flex-col bg-gray-50">
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
