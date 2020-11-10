import { useState, useEffect } from "react";
import "../css/AccountInfo.css";

export default function Main(props) {
  const { api, currentAccount } = props;
  const [balance, setBalance] = useState(null);
  const [balanceUnsub, setBalanceUnsub] = useState(null);

  useEffect(() => {
    async function getBalance() {
      const unsub = await api.query.system.account(
        currentAccount.address,
        ({ data: balance }) => {
          setBalance(balance.free.toHuman());
        }
      );

      setBalanceUnsub(() => unsub);
    }

    if (currentAccount && api) {
      getBalance();
    }

    return function cleanup() {
      if (balanceUnsub) {
        balanceUnsub();
      }
    };
  }, [api]);

  return (
    <div id="account-info">
      <div id="balance">{balance}</div>
    </div>
  );
}
