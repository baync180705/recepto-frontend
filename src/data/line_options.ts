import { LineOptions } from "../types/charts";

export const lineOptions: LineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            mode: "index" as const,
            intersect: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
                callback: (value) => `${value}`,
            },
            min: 0,
            max: 400,
        },
    },
};