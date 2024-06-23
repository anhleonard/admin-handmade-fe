import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

type Props = {
  chartData: any;
  chartOptions: any;
};

const LineChart = ({ chartData, chartOptions }: Props) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setOptions(chartOptions);
    setData(chartData);
  }, [chartOptions, chartData]);

  return (
    <ReactApexChart
      options={options}
      series={data}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
