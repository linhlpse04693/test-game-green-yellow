import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Chart from "./Chart";
import {socket} from "../../socket";

interface IProps {}

const columns = [
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Click",
    dataIndex: "click",
    key: "click",
  },
];

const Dashboard: React.FC<IProps> = ({}: IProps) => {
  const [render, setRender] = useState(0);
  const [tableData, setTableData] = useState([
    { color: "Green", click: 0 },
    { color: "Orange", click: 0 },
  ]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  useEffect(() => {
    let interval = setInterval(() => {
      setRender((preRender) => preRender + 5);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    function onConnect() {
      console.log(1233)
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('update_data', (data) => {
      setTableData([
        ...tableData.map((rowData) =>
            rowData.color === "Green"
                ? { color: "Green", click: data.green || 0 }
                : { color: "Yellow", click: data.yellow || 0 }
        ),
      ]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };

  });

  return (
    <div>
      <Chart tableData={tableData} render={render} />
    </div>
  );
};

export default Dashboard;
