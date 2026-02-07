import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/layout/app-sidebar";
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-row w-full h-screen">
        <SidebarTrigger />
        <div className="flex flex-col w-full">
          <Header />
          {children}
          <Footer />
        </div>
      </main>
    </SidebarProvider>
  );
}
