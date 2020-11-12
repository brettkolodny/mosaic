import { useState } from "react";
import { ReactComponent as BackSvg } from "../svg/icon-arrow-thin-left-circle.svg";
import "../css/Send.scss";

export default function Main(props) {
  const { api, currentAccount, setShowSend } = props;

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const sendAmount = async () => {
    const amountNumber = Number.parseInt(amount);
    console.log(amountNumber, toAddress);
    const unsub = await api.tx.balances
      .transfer(toAddress, amountNumber)
      .signAndSend(currentAccount, ({ status, events, dispatchError }) => {
        // status would still be set, but in the case of error we can shortcut
        // to just check it (so an error would indicate InBlock or Finalized)
        if (dispatchError) {
          if (dispatchError.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(dispatchError.asModule);
            const { documentation, method, section } = decoded;

            console.log(`${section}.${method}: ${documentation.join(" ")}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            console.log(dispatchError.toString());
          }

          unsub();
        } else {
          if (status.isInBlock || status.isFinalized) {
            console.log("in block");
            unsub();
          }
        }
      });
  };

  return (
    <div id="send-content">
      <div>
        <input
          id="to-input"
          className="input-valid"
          type="text"
          value={toAddress}
          placeholder="Address"
          onChange={(e) => {
            const value = e.target.value;
            setToAddress(value);
          }}
        />
        <label id="to-input-label" for="to-input">
          To
        </label>
        <input
          id="amount-input"
          className="input-valid"
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            if (Number.parseInt(value) || Number.parseInt(value) == 0) {
              e.target.classList.remove("input-error");
              e.target.classList.add("input-valid");
            } else {
              e.target.classList.remove("input-valid");
              e.target.classList.add("input-error");
            }
            setAmount(value);
          }}
        />
        <label id="amount-input-label" for="amount-input">
          Amount
        </label>
        <div id="send-button" onClick={sendAmount}>
          Sign and Send
        </div>
      </div>
      <BackSvg onClick={() => setShowSend(false)} />
    </div>
  );
}
