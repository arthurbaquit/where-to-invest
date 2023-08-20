import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./DoughnutChart.module.scss";
import { useAtivos } from "../../../hooks/useAtivos";
ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const { ativos } = useAtivos();
  const ativosTotalValue = useMemo(() => {
    return ativos.reduce((acc, ativo) => {
      acc += ativo.posicao;
      return acc;
    }, 0);
  }, [ativos]);
  const ativosByType = useMemo(() => {
    const ativosByType = ativos.reduce((acc, ativo) => {
      const { tipo } = ativo;
      if (!acc[tipo]) {
        acc[tipo] = 0;
      }
      acc[tipo] += ativo.posicao;
      return acc;
    }, {} as { [key: string]: number });
    const labels = Object.keys(ativosByType).map(
      (key) =>
        key + ` (${((ativosByType[key] / ativosTotalValue) * 100).toFixed(2)}%)`
    );
    const data = Object.values(ativosByType);
    const backgroundColor = [
      "rgba(255, 99, 132)",
      "rgba(54, 162, 235)",
      "rgba(255, 206, 86)",
      "rgba(75, 192, 192)",
      "rgba(153, 102, 255)",
      "rgba(255, 159, 64)",
    ];
    const borderColor = ["white", "white", "white", "white", "white"];
    const borderWidth = 1;
    return {
      labels,
      datasets: [
        {
          label: "Ativos",
          data,
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
  }, [ativos]);
  const hoverLabel = {
    id: "hoverLabel",
    afterDraw(chart: ChartJS) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      const ativosTotalValue = chart.config.data.datasets[0].data.reduce(
        (acc, d) => {
          if (typeof acc === "number" && typeof d === "number" && !isNaN(d)) {
            acc += d;
          }
          return acc;
        },
        0
      );

      ctx.save();
      ctx.font = "bolder 20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `R$${
          typeof ativosTotalValue === "number"
            ? ativosTotalValue.toFixed(2)
            : ativosTotalValue
        }`,
        left + width / 2,
        top + height / 2
      );
    },
  };
  return (
    <div className={styles.DoughnutChart}>
      <Doughnut
        data={ativosByType}
        plugins={[hoverLabel]}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          cutout: "80%",
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                },
                color: "black",
              },
            },
          },
        }}
        width={300}
        height={300}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: 0,
          textAlign: "center",
          lineHeight: "20px",
          fontSize: "20px",
          fontWeight: "bolder",
        }}
      >
        <span></span>
      </div>
    </div>
  );
};
