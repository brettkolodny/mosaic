import NetworkSelect from "./NetworkSelect.js";
import { ReactComponent as LightOnSvg } from "../svg/icon-light-on.svg";
import { ReactComponent as LightOffSvg } from "../svg/icon-light-off.svg";
import { ReactComponent as MenuSvg } from "../svg/icon-menu.svg";
import "../css/TopBar.css";

export default function Main(props) {
  const { currentNet, setCurrentNet, networks, connected } = props;

  return (
    <div id="top-bar">
      <NetworkSelect
        currentNet={currentNet}
        networks={networks}
        setCurrentNet={setCurrentNet}
      />
      {connected ? (
        <div id="connected">
          <LightOnSvg /> Connected
        </div>
      ) : (
        <div id="connected">
          <LightOffSvg /> Not Connected
        </div>
      )}
      <MenuSvg />
    </div>
  );
}
