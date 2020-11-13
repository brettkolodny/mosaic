import React, { useState } from "react";
import "../css/NetworkSelect.css";

export default function Main(props) {
  const { currentNet, setCurrentNet, networks } = props;
  const [showNetworks, setShowNetworks] = useState(false);

  const toggleNetworkList = () => {
    setShowNetworks(!showNetworks);
  };

  const createNetworkList = () => {
    const netList = networks.map((net, index) => {
      return (
        <div
          className="network-dd-item"
          key={index}
          onClick={(e) => {
            if (currentNet.conn === net.conn) {
              return;
            }

            setShowNetworks(false);
            setCurrentNet(net);
            e.stopPropagation();
          }}
        >
          {net.icon}
          {net.name}
        </div>
      );
    });

    return netList;
  };

  return (
    <div id="network-dd" onClick={toggleNetworkList}>
      <div id="current-network">{currentNet.icon}</div>
      <div id="network-dd-items" className={showNetworks ? "show" : "hidden"}>
        {createNetworkList()}
      </div>
    </div>
  );
}
