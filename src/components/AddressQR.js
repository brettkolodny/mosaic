import { useEffect } from "react";
import QRious from "qrious";
import "../css/AddressQR.css";

export default function Main(props) {
  const { displayQR, address } = props;

  useEffect(() => {
    const qr = new QRious({
      element: document.getElementById("qr"),
      value: address,
      background: "#E8368F",
      foreground: "#F5F7FA",
    });
  }, []);

  return (
    <div id="qr-container">
      <canvas id="qr" onClick={() => displayQR(false)}></canvas>
    </div>
  );
}
