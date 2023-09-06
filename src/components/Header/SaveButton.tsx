import React from "react";
import { useObserver } from "mobx-react";
// import { Watermark } from "antd";
import { ReactComponent as Save } from "../../assets/save.svg";
import Tooltip from "../Tooltip";
import useStore from "../../hooks/useStore";

const SaveButton: React.FC = () => {
  const { canvasStore, imageStore, UIStore } = useStore();
  const saveImage = () => {
    if (!imageStore.url || UIStore.isToolbarOpen) {
      return;
    }
    const randomNum = Math.floor(Math.random() * 1000);
    const fileName = `image-${randomNum}.png`;
    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvasStore.getDataUrl();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
  };

  return useObserver(() => (
    // <Watermark content="Pixie Editor">
    // <div style={{ height: 500 }} />
    <Tooltip content="Save" placement="bottom">
      <Save
        className={`${
          !imageStore.url || UIStore.isToolbarOpen ? "disabled" : ""
        }`}
        onClick={saveImage}
        />
    </Tooltip>
        // </Watermark>
  ));
};
export default SaveButton;