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
    const borderColor = ["white", "white", "white", "white", "white", "white"];
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
      const getNotHiddenLegend = chart.legend?.legendItems
        ?.filter((item) => !item.hidden)
        .map((item) => item.text);
      // create a dict with labels and values
      const dict = chart.config.data.datasets[0].data.map((d, i) => {
        return {
          label: chart.config.data.labels ? chart.config.data.labels[i] : "",
          value: d,
        };
      });
      //get the total value where the legend is not hidden
      const ativosTotalValue = getNotHiddenLegend?.reduce((acc, label) => {
        const value = dict.find((d) => d.label === label)?.value;
        if (
          typeof acc === "number" &&
          typeof value === "number" &&
          !isNaN(value)
        ) {
          acc += value;
        }
        return acc;
      }, 0);
      ctx.save();
      ctx.font = "bolder 20px Arial";
      ctx.fillStyle = "white";
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
                color: "white",
              },
            },
          },
        }}
        width={300}
        height={300}
      />
    </div>
  );
};
