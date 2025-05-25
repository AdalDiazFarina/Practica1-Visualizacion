import { type ChartType } from '../interfaces/charts.types';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { BarChart } from './charts/BarChart';

const AppChartPreview = ({ chartType }: { chartType: ChartType }) => {
  return (

    <div className="flex items-center w-full h-screen justify-center">
      <Card className="m-8 w-11/12 h-5/6 flex justify-center items-center">
        <CardContent id="tooltip" className="w-full h-full flex justify-center items-center">
          {chartType === "bar" && <BarChart />}
          {chartType === "scatter" && <p>ScatterChart</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default AppChartPreview
