
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { sidebarItems } from "@/config/sidebar-items"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
				<AppSidebar items={sidebarItems} />
				<main className="flex-1 flex flex-col h-screen overflow-hidden">
					<SidebarTrigger />
					{children}
      	</main>
			</SidebarProvider> 
    </>
  )
}

export default AppLayout
