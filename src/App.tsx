import './App.css'
import AppChartPreview from './components/app-chart-preview';
import AppLayout from './components/app-layout';

function App() {

  return (
    <>
      <AppLayout>
        <AppChartPreview chartType="bar" />
      </AppLayout>
    </>
  )
}

export default App
