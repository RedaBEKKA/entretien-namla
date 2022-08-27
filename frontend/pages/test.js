import React from "react";
import { io } from "socket.io-client";

function test() {
  const socket = io("http://localhost:3000");

  console.log(
    socket.on("test", (msg) => {
      console.log("client", msg);
    })
  );

  return <div>test</div>;
}

export default test;
