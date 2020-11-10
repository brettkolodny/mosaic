import TopBar from "./TopBar";
import { useState, useEffect } from "react";
import { ReactComponent as PolkadotIcon } from "../svg/polkadot-icon.svg";
import { ReactComponent as WestendIcon } from "../svg/westend-icon.svg";
import { ReactComponent as DevIcon } from "../svg/dev-icon.svg";
import AccountInfo from "../components/AccountInfo";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Identicon from "@polkadot/react-identicon";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import "../css/Home.css";
// import { mnemonicGenerate } from "@polkadot/util-crypto";

export default function Main() {
  const networks = [
    {
      name: "Development",
      icon: <DevIcon />,
      conn: "ws://127.0.0.1:9944",
    },
    {
      name: "Polkadot",
      icon: <PolkadotIcon />,
      conn: "wss://rpc.polkadot.io",
    },
    {
      name: "Westend",
      icon: <WestendIcon />,
      conn: "wss://westend-rpc.polkadot.io",
    },
  ];

  const [currentNet, setCurrentNet] = useState(networks[0]);
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function connect() {
      setConnected(false);
      const provider = new WsProvider(currentNet.conn);
      ApiPromise.create({ provider: provider })
        .then((value) => {
          setApi(value);
          setConnected(true);
        })
        .catch((resason) => {
          console.log(resason);
          Promise.resolve(null);
        });
    }

    connect();
  }, [currentNet]);

  useEffect(() => {
    async function getAccount() {
      await cryptoWaitReady();
      const keyring = new Keyring({ type: "sr25519", ss58Format: 2 });

      const alice = keyring.addFromUri("//Alice", { name: "Alice" });
      setAccounts([alice]);
      setCurrentAccount(alice);
    }

    getAccount();
  }, []);

  return (
    <div id="home">
      <TopBar
        currentNet={currentNet}
        setCurrentNet={setCurrentNet}
        networks={networks}
        connected={connected}
      />
      <div id="home-content">
        <div id="accounts">
          {currentAccount ? currentAccount.meta.name : null}
        </div>
        {currentAccount ? (
          <Identicon
            id="identicon"
            value={currentAccount.address}
            size={158}
            theme={"polkadot"}
          />
        ) : null}
        <AccountInfo currentAccount={currentAccount} api={api} />
      </div>
    </div>
  );
}
