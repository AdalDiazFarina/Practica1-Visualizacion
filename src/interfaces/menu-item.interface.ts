import type { ChartType } from "./charts.types";

export interface MenuItem {
	title: string;
	id: ChartType;
	icon: React.ComponentType;
}