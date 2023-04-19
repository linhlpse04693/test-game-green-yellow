import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TableData } from "./types";
import { Line } from "react-chartjs-2";
import { get } from "lodash";

interface IProps {
  render: number;
  tableData: TableData[];
}

interface Data {
  labels: Number[];
  datasets: any[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart Game",
    },
  },
};
const labels = [0];

const preData = {
  labels,
  datasets: [
    {
      label: "Green",
      data: [0],
      borderColor: "Green",
      backgroundColor: "Green",
    },
    {
      label: "Orange",
      data: [0],
      borderColor: "Orange",
      backgroundColor: "Orange",
    },
  ],
};
const Chart = ({ tableData, render }: IProps) => {
  const [data, setData] = useState<Data>(preData);
  useEffect(() => {
    const greenClick = get(tableData, [0, "click"], 0);
    const orangeClick = get(tableData, [1, "click"], 0);
    const firstDataSets = get(data, ["datasets", 0], {});
    const secondDataSets = get(data, ["datasets", 1], {});

    const newFirstDataSets = {
      ...firstDataSets,
      data: [...firstDataSets.data, greenClick],
    };
    const newSecondDataSets = {
      ...secondDataSets,
      data: [...secondDataSets.data, orangeClick],
    };
    setData({
      labels: [...data.labels, render],
      datasets: [newFirstDataSets, newSecondDataSets],
    });
  }, [render]);
  return <Line options={options} data={data} />;
};

export default React.memo(Chart, (preProps: IProps, nextprops: IProps) => {
  if (preProps && nextprops && preProps.render !== nextprops.render) {
    return false;
  }
  return true;
});
