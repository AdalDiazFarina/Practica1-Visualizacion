import { useState } from 'react';
import './App.css'
import AppChartPreview from './components/app-chart-preview';
import AppLayout from './components/app-layout';
import type { ChartType } from './interfaces/charts.types';

function App() {
  const [chartType, setChartType] = useState<ChartType>('bar');
  return (
    <>
      <AppLayout
        selectedChart={chartType}
        onChangeChart={setChartType}
      >
        <AppChartPreview chartType={chartType} />
      </AppLayout>
    </>
  )
}

export default App
