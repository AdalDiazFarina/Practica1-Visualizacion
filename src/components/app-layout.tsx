
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { sidebarItems } from "@/config/sidebar-items"
import React from "react"
import type { ChartType } from "@/interfaces/charts.types"


type AppLayoutProps = {
	children: React.ReactNode,
	selectedChart?: ChartType,
	onChangeChart?: (chartType: ChartType) => void
}

const AppLayout = ({ children, selectedChart, onChangeChart }: AppLayoutProps) => {
	return (
		<>
			<SidebarProvider>
				<AppSidebar
					items={sidebarItems}
					selectedChart={selectedChart}
					onChangeChart={onChangeChart}
				/>
				<main className="flex-1 flex flex-col h-screen overflow-hidden">
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
		</>
	)
}

export default AppLayout
