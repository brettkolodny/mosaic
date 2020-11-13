import { mnemonicGenerate } from "@polkadot/util-crypto";
import "../css/CreateAccount.scss";
const browser = require("webextension-polyfill");

export default function Main(props) {
  const { setMnemonic, setLoggedIn, setAccountDetected } = props;

  const mnemonic = mnemonicGenerate();

  const createAccount = () => {
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;
    const name = document.getElementById("account-name").value;

    if (password == rePassword) {
      const publicKey = "3916b789e1ef9096d4d6ab81980c0df4";

      browser.storage.local.set({ password: password });
      browser.storage.local.set({ mnemonic: mnemonic });
      browser.storage.local.set({ name: name });
      setLoggedIn(true);
      setAccountDetected(true);
      setMnemonic(mnemonic);
    } else {
      document.getElementById("error").style.display = "block";
    }
  };

  return (
    <div id="create-account">
      <div id="create-account-content">
        Write this down!
        <div id="mnemonic">{mnemonic}</div>
        <label>Account Name</label>
        <input id="account-name" />
        <br />
        <label>Password</label>
        <input id="password" type="password" />
        <br />
        <label>Re-Password</label>
        <input id="re-password" type="password" />
        <br />
        <div id="error">Passwords don't match!</div>
        <div id="create-account-button" onClick={createAccount}>
          Create
        </div>
      </div>
    </div>
  );
}
