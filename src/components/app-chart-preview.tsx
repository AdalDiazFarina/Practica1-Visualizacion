import { type ChartType } from '../interfaces/charts.types';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { BarChart } from './charts/BarChart';
import { useState, useCallback } from 'react';
import { typeEmojis } from '@/interfaces/type-emojis.type';
import { ScatterChart } from './charts/ScatterChart';

const AppChartPreview = ({ chartType }: { chartType: ChartType }) => {
  const [tooltipData, setTooltipData] = useState<{ tipo: string; cantidad: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleHover = useCallback((data: { tipo: string; cantidad: number }, position: { x: number; y: number }) => {
    setTooltipData(data);
    setTooltipPosition(position);
  }, []);

  const handleLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

  return (
    <div className="flex items-center w-full h-screen justify-center">
      <Card className="m-8 w-11/12 h-5/6 flex justify-center items-center">
        <CardContent id="tooltip" className="w-full h-full flex justify-center items-center">
          {chartType === "bar" && (
            <BarChart
              onHover={handleHover}
              onLeave={handleLeave}
            />
          )}
          {chartType === "scatter" && <ScatterChart />}


          {/* Tooltip rendering */}
          {tooltipData && (
            <div
              className="absolute bg-white border rounded shadow px-2 py-1 text-xs pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                zIndex: 50,
              }}
            >
              <div>Tipo: {typeEmojis[tooltipData.tipo]} {tooltipData.tipo}</div>
              <div>Cantidad: {tooltipData.cantidad}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppChartPreview;
