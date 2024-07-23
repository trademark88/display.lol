import { Sidenav } from "@/components/component/sidenav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-1/5 border-r bg-background">
        <Sidenav />
      </div>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
