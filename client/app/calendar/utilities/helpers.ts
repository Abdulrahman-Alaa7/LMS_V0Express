/**
 *
 * @param {callback} func
 * @param {number} limit
 * @returns strict debounce
 */
function debounce(func: (...args: any[]) => void, limit: number) {
  let timeoutId: any;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), limit);
  };
}

/**
 *
 * @param {*} e
 * @param {*} element
 *
 * With the exception of popup modals, all events in the app
 * are delegated from their parent element.
 */
function getClosest(e: any, element: any) {
  return e.target.closest(element);
}

function hextorgba(hex: any, alpha: any) {
  let r: any = 0,
    g: any = 0,
    b: any = 0,
    a: any = alpha;
  r = "0x" + hex[1] + hex[2];
  g = "0x" + hex[3] + hex[4];
  b = "0x" + hex[5] + hex[6];
  return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const throttle = (fn: any, wait: any) => {
  let inThrottle: any, lastFn: any, lastTime: any;
  return function (this: any) {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

function setTheme(context: any) {
  const appBody = document.querySelector(".body");
  const colorSchemeMeta = document.getElementsByName("color-scheme")[0];
  const currentScheme = context.getColorScheme();
  const hasLightMode = appBody?.classList.contains("light-mode");
  const hasContrastMode = appBody?.classList.contains("contrast-mode");

  const setColorSchema = () => {
    if (currentScheme === "light" && hasLightMode && !hasContrastMode) {
      return;
    } else if (currentScheme === "dark" && !hasLightMode && !hasContrastMode) {
      return;
    } else if (
      currentScheme === "contrast" &&
      hasContrastMode &&
      !hasLightMode
    ) {
      return;
    }

    const setlight = () => {
      if (context) {
        context.setColorScheme("light");
      }
      if (colorSchemeMeta) {
        colorSchemeMeta.setAttribute("content", "light");
      }
      if (appBody) {
        appBody.classList.remove("contrast-mode");
        appBody.classList.add("light-mode");
      }
    };

    const setdark = () => {
      context.setColorScheme("dark");
      if (colorSchemeMeta) {
        colorSchemeMeta.setAttribute("content", "dark light");
      }
      if (appBody) {
        appBody.classList.remove("light-mode");
        appBody.classList.remove("contrast-mode");
      }
    };

    const setcontrast = () => {
      context.setColorScheme("contrast");
      if (colorSchemeMeta) {
        colorSchemeMeta.setAttribute("content", "dark");
      }
      if (appBody) {
        appBody.classList.remove("light-mode");
        appBody.classList.remove("contrast-mode");
      }
    };

    if (currentScheme === "light") {
      setlight();
      return;
    }

    if (currentScheme === "contrast") {
      setcontrast();
      return;
    }

    if (currentScheme === "dark") {
      setdark();
      return;
    }
  };
  setColorSchema();
}

/**
 *
 * @param {number} popupWidth
 * @param {number} popupHeight
 * @param {array} coords [x: e.clientX, y: e.clientY]
 * @param {array} windowCoords [x: window.innerWidth, y: window.innerHeight]
 * @param {boolean} center should popup be centered ?
 * @param {number} targetWidth if center is true, targetWidth required to center
 * @returns [left position, top position];
 */
function placePopup(
  popupWidth: number,
  popupHeight: number,
  coords: [number, number],
  windowCoords: [number, number],
  center?: boolean,
  targetWidth?: number
) {
  const [popupW, popupH] = [popupWidth, popupHeight];
  const [x, y]: any = coords;
  const [winW, winH]: any = windowCoords;

  let popupX;
  if (center && targetWidth) {
    popupX = x - popupW / 2 + targetWidth / 2;
    if (popupWidth + x + 4 >= winW) {
      popupX = winW - popupW - 4;
    }
  } else {
    popupX = x + popupW > winW ? x - popupW - 6 : x;
  }

  let popupY = y + popupH > winH ? winH - popupH - 6 : y;

  if (popupX < 0) popupX = Math.abs(popupX);
  if (popupY < 0) popupY = 56;
  return [popupX, popupY];
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default debounce;
export {
  getClosest,
  hextorgba,
  generateId,
  throttle,
  setTheme,
  placePopup,
  isNumeric,
};
