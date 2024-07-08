import React, { useEffect, useState } from 'react';

export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      if (window.matchMedia("(pointer: coarse)").matches) {
        setIsTouchDevice(true);
      } else if (window.matchMedia("(pointer: fine)").matches) {
        setIsTouchDevice(false);
      } else {
        // Fallback to checking for touch event support
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      }
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  return { isTouchDevice };
};
