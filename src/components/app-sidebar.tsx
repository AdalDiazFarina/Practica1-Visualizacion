import type { MenuItem } from "@/interfaces/menu-item.interface"
import { 
	Sidebar, 
	SidebarContent,
	SidebarHeader,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton
} from "@/components/ui/sidebar"

export function AppSidebar({ items }: { items: MenuItem[] }) {0
  return (
    <Sidebar>
			<SidebarHeader className="px-4 py-3 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-800">Visualizaciones</h2>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>D3.js</SidebarGroupLabel>
					<SidebarGroupContent className="pl-8">
						<SidebarMenu>
							{items.map((item: MenuItem) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<p title={item.title} className="flex items-center gap-2 cursor-pointer">
											<item.icon />
											<span>{item.title}</span>
										</p>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
    </Sidebar>
  )
}