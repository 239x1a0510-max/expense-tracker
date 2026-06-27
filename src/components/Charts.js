import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Charts({ categoryTotals }) {
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4CAF50",
          "#F44336",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#00BCD4",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "65%",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "350px",
        margin: "0 auto",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Spending by Category
      </h3>

      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default Charts;
