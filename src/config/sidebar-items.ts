
import type { MenuItem } from "@/interfaces/menu-item.interface";
import { BarChart3, ScatterChart } from "lucide-react";
export const sidebarItems: MenuItem[] =
[
  {
    title: "Gráfico de Barras/Columnas",
    icon: BarChart3,
    id: "bar"
  },
  {
    title: "Gráfico de Dispersión",
    icon: ScatterChart,
    id: "scatter"
  }
]