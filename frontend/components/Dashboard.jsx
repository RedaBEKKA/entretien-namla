import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import saveOrder from "../pages/api/order";

const socket = io("http://localhost:3000");

function Dashboard() {
  const [order, setOrder] = useState({ title: "", description: "" });
  //handle form
  const handleOnChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  //count of notification
  const [notificationCount, setNotificationCount] = useState(0);
  //handle get notification from server
  useEffect(() => {
    socket?.on("getNotification", (message, orderId) => {
      setNotificationCount(notificationCount + 1);
    });
  }, [notificationCount]);

  //submit form with create notification and send it to server
  const handleSaveOrder = async () => {
    const data = await saveOrder(order);
    if (data != null) {
      socket.emit("sendNotification", {
        message: "you create new order",
        orderId: data.create._id,
      });
    }
    setOrder({
      title: "",
      description: "",
    });
  };
  return (
    <div className="container">
      <div className="user">
        <h1>User</h1>

        <div>
          <a href="#" className="notification">
            <span>Inbox</span>
            <span className="badge">
              {notificationCount > 0 ? notificationCount : ""}
            </span>
          </a>
        </div>
      </div>

      <div>
        <h3>Add order</h3>
        <div>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={order.title}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            name="description"
            value={order.description}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <button onClick={handleSaveOrder} className="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
