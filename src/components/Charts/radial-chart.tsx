import { COLORS } from "@/enum/colors";
import useChart from "@/hooks/use-chart";
import React from "react";
import ReactApexChart from "react-apexcharts";

export type RadialData = {
  shipped: number;
  canceled: number;
  total: number;
};

type Props = {
  data: RadialData;
};

const RadialChart = ({ data }: Props) => {
  const series = [data?.shipped, data?.canceled];
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#008FFB", `${COLORS.support.c400}`],
    labels: ["Đơn đã bán", "Đơn đã hủy"],
    legend: {
      floating: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
        dataLabels: {
          value: {
            offsetY: 20,
          },
          total: {
            formatter: () => data?.total?.toString(),
          },
        },
      },
    },
  });

  return (
    <ReactApexChart
      type="radialBar"
      series={series}
      options={chartOptions}
      width={"100%"}
      height={300}
    />
  );
};

export default RadialChart;
