import { SourceCardProps } from "../types/charts";

export const sourceCards: SourceCardProps[] = [
    {
      key: 1,
      icon: 'recepto',
      title: 'ReceptoNet Leads',
      total: 404,
      chartData: {
        labels: ['2 days ago', '1 day ago', 'today'],
        datasets: [
          {
            label: 'Leads',
            data: [200, 250, 394],
            borderColor: 'rgb(1, 1, 2)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      stats: [
        { label: 'Unlocked', value: '337 users', color: 'blue' },
        { label: 'Yet to Unlock', value: '67 users', color: 'gray' }
      ]
    },
    {
      key: 2,
      icon: 'facebook',
      title: 'Org Network Leads',
      total: 594,
      chartData: {
        labels: ['2 days ago', '1 day ago', 'today'],
        datasets: [
          {
            label: 'Leads',
            data: [200, 300, 394],
            borderColor: 'rgba(249, 115, 22, 1)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      stats: [
        { label: 'Contacted', value: '337 users', color: 'orange' },
        { label: 'Yet to Contact', value: '257 users', color: 'gray' }
      ]
    }
  ];