import { type ChartType } from '../interfaces/charts.types';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { BarChart } from './charts/BarChart';
import { useState, useCallback } from 'react';
import { typeEmojis } from '@/interfaces/type-emojis.type';
import { ScatterChart } from './charts/ScatterChart';
import type { ScatterChartData } from '@/interfaces/scatter-chart-data.interface';

const AppChartPreview = ({ chartType }: { chartType: ChartType }) => {
  const [tooltipBarData, setTooltipBarData] = useState<{ tipo: string; cantidad: number } | null>(null);
  const [tooltipScatterData, setTooltipScatterData] = useState<ScatterChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleHover = useCallback((data: { tipo: string; cantidad: number }, position: { x: number; y: number }) => {
    setTooltipBarData(data);
    setTooltipPosition(position);
  }, []);

  const handleHoverScatter = useCallback((data: ScatterChartData, position: { x: number; y: number }) => {
    setTooltipScatterData(data);
    setTooltipPosition(position);
  }, []);

  const handleLeave = useCallback(() => {
    setTooltipBarData(null);
    setTooltipScatterData(null);
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
          {chartType === "scatter" && (
            <ScatterChart
              onHover={handleHoverScatter}
              onLeave={handleLeave}
            />
          )}
          {/* Tooltip BarChart rendering */}
          {tooltipBarData && (
            <div
              className="absolute bg-white border rounded shadow px-2 py-1 text-xs pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                zIndex: 50,
              }}
            >
              <div>Tipo: {typeEmojis[tooltipBarData.tipo]} {tooltipBarData.tipo}</div>
              <div>Cantidad: {tooltipBarData.cantidad}</div>
            </div>
          )}

          {/* Tooltip BarChart rendering */}
          {tooltipScatterData && (
            <div
              className="absolute bg-white border rounded shadow px-2 py-1 text-xs pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                zIndex: 50,
              }}
            >
              <div className="font-bold mb-1">{tooltipScatterData.name}</div>
              <div>
                Tipo: {typeEmojis[tooltipScatterData.type] || ""} {tooltipScatterData.type}
              </div>
              <div>Ataque: {tooltipScatterData.attack}</div>
              <div>Defensa: {tooltipScatterData.defense}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppChartPreview;
