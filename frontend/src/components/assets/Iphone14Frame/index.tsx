import React, { ReactNode } from "react";
import styles from "./iphone.module.scss";

interface Iphone14FrameProps {
  children: ReactNode;
}

export const Iphone14Frame: React.FC<Iphone14FrameProps> = ({ children }) => {
  // From picturepan/devices.css on GitHub
  return (
    <div className={styles.device}>
      <div className="device-frame">
        <div className="device-screen overflow-hidden">
          { children }
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[160px] h-[4px] rounded-full bg-white"></div>
        </div>
      </div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
      <div className="device-home"></div>
    </div>
  );
};
