import TopBar from "./TopBar";
import { useState, useEffect } from "react";
import { ReactComponent as PolkadotIcon } from "../svg/polkadot-icon.svg";
import { ReactComponent as WestendIcon } from "../svg/westend-icon.svg";
import { ReactComponent as DevIcon } from "../svg/dev-icon.svg";
import { ReactComponent as SendSvg } from "../svg/icon-send.svg";
import { ReactComponent as QRSvg } from "../svg/icon-qr-code.svg";
import { ReactComponent as LockIcon } from "../svg/icon-lock.svg";
import AccountInfo from "../components/AccountInfo";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Identicon from "@polkadot/react-identicon";
import Send from "./Send";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import AddressQR from "./AddressQR";
import "../css/Home.scss";
const browser = require("webextension-polyfill");

export default function Main(props) {
  const { setLoggedIn } = props;
  const networks = [
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
    {
      name: "Development",
      icon: <DevIcon />,
      conn: "ws://127.0.0.1:9944",
    },
  ];

  const [currentNet, setCurrentNet] = useState(networks[0]);
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showSend, setShowSend] = useState(false);

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

      const mnemonic = await browser.storage.local.get("mnemonic");
      const name = await browser.storage.local.get("name");

      const account = keyring.addFromUri(mnemonic.mnemonic, {
        name: name.name,
      });

      setAccounts([account]);
      setCurrentAccount(account);
    }

    getAccount();
  }, []);

  const displayQR = (setValue) => {
    const homeContent = document.getElementById("home");

    if (homeContent.style.filter === "blur(4px)") {
      homeContent.style.filter = "blur(0px)";
    } else {
      homeContent.style.filter = "blur(4px)";
    }

    setShowQR(setValue);
  };

  return (
    <div id="home-container">
      <TopBar
        currentNet={currentNet}
        setCurrentNet={setCurrentNet}
        networks={networks}
        connected={connected}
      />
      <div id="home">
        <div id="home-content">
          <div id="accounts">
            {currentAccount ? currentAccount.meta.name : "Loading..."}
            <div id="down-icon"></div>
          </div>
          {currentAccount ? (
            <div className="identicon">
              <Identicon
                id="identicon"
                value={currentAccount.address}
                size={158}
                theme={"polkadot"}
              />
            </div>
          ) : null}
          <AccountInfo currentAccount={currentAccount} api={api} />
        </div>
        <div id="function-buttons">
          <QRSvg onClick={() => displayQR(true)} />
          <SendSvg onClick={() => setShowSend(true)} />
          <LockIcon onClick={() => setLoggedIn(false)} />
        </div>
      </div>
      {showQR && currentAccount ? (
        <AddressQR address={currentAccount.address} displayQR={displayQR} />
      ) : null}
      {showSend && currentAccount ? (
        <Send
          currentAccount={currentAccount}
          setShowSend={setShowSend}
          api={api}
        />
      ) : null}
    </div>
  );
}
