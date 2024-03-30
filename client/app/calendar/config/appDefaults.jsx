import React from "react";
import { setTheme } from "../utilities/helpers";
const appBody =
  typeof window !== "undefined" ? document.querySelector(".body") : null;

const setAppDefaults = (context, store) => {
  let animationStatus = store.getAnimationStatus();

  const disableTransitionsOnLoad = () => {
    setTimeout(() => {
      appBody.classList.remove("preload");
    }, 4);
  };

  const setDefaultAnimationStatus = () => {
    animationStatus
      ? appBody.classList.remove("disable-transitions")
      : appBody.classList.add("disable-transitions");
  };

  disableTransitionsOnLoad();
  setTheme(context);
  setDefaultAnimationStatus();
  return <div></div>;
};
export default setAppDefaults;
