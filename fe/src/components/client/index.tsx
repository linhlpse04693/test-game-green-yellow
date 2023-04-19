import React, { useEffect, useState } from "react";
import { Wrapper, Button } from "./styles";
import {socket} from "../../socket";

interface IProps {}

const Client: React.FC<IProps> = ({}: IProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

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

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  const onClick = (color: string) => {
    socket.emit('click', {button: color})
  };
  return (
    <Wrapper>
      <Button onClick={() => onClick("Green")} backgroundColor={"green"}>
        Green
      </Button>
      <Button onClick={() => onClick("Orange")} backgroundColor={"orange"}>
        Orange
      </Button>
    </Wrapper>
  );
};

export default Client;
