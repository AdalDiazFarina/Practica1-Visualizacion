import { type ChartType } from '../interfaces/charts.types';
import {
  Card,
  CardContent,
} from "@/components/ui/card"

const AppChartPreview = ({ chartType }: { chartType: ChartType }) => {
  return (

    <div className="flex justify-end items-center w-full h-screen">
      <Card className="m-8 w-5/12 h-5/6 flex justify-center items-center">
        <CardContent>
          {chartType === "bar" && <p>BarChart</p>}
          {chartType === "scatter" && <p>ScatterChart</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default AppChartPreview
