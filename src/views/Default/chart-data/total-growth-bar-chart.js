// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
  height: 480,
  type: "bar",
  options: {
    chart: {
      id: "bar-chart",
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%"
      }
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr"]
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: "solid"
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: "Maintenance",
      data: [1, 2, 7, 3, 4, 10, 5, 6, 7, 8, 15, 9]
    }
  ]
};
export default chartData;
