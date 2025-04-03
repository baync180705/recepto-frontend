export interface SourceCardProps {
  icon: string;
  title: string;
  total: number;
  chartData: ChartDataEntry;
  stats: Stat[];
}

interface ChartDataEntry {
  labels: string[];
  datasets: Array<{ label: string, data: number[], borderColor: string, backgroundColor: string, tension: number, fill: boolean }>;
}

interface Stat{
    label: string;
    value: string;
    color: string;
}

export interface LineOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    plugins: {
      legend: {
        display: boolean;
      };
      tooltip: {
        mode: "index";
        intersect: boolean;
      };
    };
    scales: {
      x: {
        grid: {
          display: boolean;
        };
      };
      y: {
        grid: {
          color: string;
        };
        ticks: {
          // Define the type for ticks here if needed
          callback?: (value: number | string) => string;
        };
        min: number;
        max: number;
      };
    };
  }