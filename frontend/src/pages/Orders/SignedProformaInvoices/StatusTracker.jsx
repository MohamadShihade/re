import React from "react";
import "./status_tracker_styles.css";
import { orderStatus } from "../../../config/piOrderStatus";

const StatusTracker = ({ pi }) => {
  return (
    <div class="">
      <div class="">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div class={!pi.pi_done_status?.includes(orderStatus[0].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[0].status}</p>
          </div>

          <div class={!pi.pi_done_status?.includes(orderStatus[2].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[2].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[3].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[3].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[4].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[4].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[5].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[5].status}</p>
          </div>
          <div class={!pi.pi_done_status?.includes(orderStatus[6].status) ? "order-tracking" : `order-tracking completed`}>
            <span class="is-complete"></span>
            <p>{orderStatus[6].status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
