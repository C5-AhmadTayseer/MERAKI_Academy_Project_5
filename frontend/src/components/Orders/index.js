import "./style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [isAllOrder, setIsAllOrder] = useState(true);
  const [isCompletedOrder, setIsCompletedOrder] = useState(false);
  const [isUnCompleted, setIsUnCompleted] = useState(false);


  

  return (
    <div className="Container-Orders">
      <div className="One-Order">
        <p># Order</p>
        <p>Date</p>
        <p>Status</p>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value == 1) {
              setIsAllOrder(true);
              setIsCompletedOrder(false);
              setIsUnCompleted(false);
            }
            if (e.target.value == 2) {
              setIsAllOrder(false);
              setIsCompletedOrder(true);
              setIsUnCompleted(false);
            }
            if (e.target.value == 3) {
              setIsAllOrder(false);
              setIsCompletedOrder(false);
              setIsUnCompleted(true);
            }
          }}
        >
          <option value="1">All Orders</option>
          <option value="2">Completed</option>
          <option value="3">Un Completed</option>
        </select>
      </div>
      {isAllOrder? <>HH</> : ""}
      {isCompletedOrder? <>CCC</> : ""}
      {isUnCompleted? <>ttt</> : ""}
    </div>
  );
};

export default Orders;
