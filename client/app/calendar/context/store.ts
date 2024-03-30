import { Entry } from "../factory/entries";
import localStoreKeyNames from "./constants";
import { testDate, compareDates } from "../utilities/dateutils";
import { locales } from "../locales/en";
import { defautlKeyboardShortcuts } from "../locales/kbDefault";
const colors = locales.colors;

class StoreClass {
  store: any;
  ctg: any;
  userUpload: any;
  activeOverlay: any;
  handleRenders: any;
  keyboardShortcuts: any;
  keyboardShortcutsStatus: any;
  animationStatus: any;

  constructor() {
    if (typeof localStorage !== "undefined") {
      const storedStore = localStorage.getItem("store");
      this.store = storedStore ? JSON.parse(storedStore) : [];

      const storedCtg = localStorage.getItem("ctg");
      this.ctg = storedCtg
        ? JSON.parse(storedCtg)
        : {
            default: { color: colors.blue[4], active: true },
          };
    } else {
      this.store = [];
      this.ctg = {
        default: { color: colors.blue[4], active: true },
      };
    }

    this.userUpload;

    this.activeOverlay = new Set();

    this.handleRenders = {
      sidebar: {
        callback: null,
      },
      datepicker: {
        reset: null,
      },
      form: {
        callback: null,
      },
      reconfig: {
        callback: null,
      },
      categories: {
        callback: null,
      },
      calendars: {
        previous: {
          reset: null,
        },
        month: {
          reset: null,
          resize: null,
        },
        week: {
          reset: null,
          render: null,
        },
        day: {
          reset: null,
        },
        list: {
          reset: null,
        },
      },
    };

    this.keyboardShortcuts = defautlKeyboardShortcuts;
    this.keyboardShortcutsStatus = true;
    this.animationStatus = true;
  }

  setStoreForTesting(store: any) {
    this.store = store;
    StoreClass.setStore(this.store);
  }

  getStoreStats() {
    return [this.store.length, this.getAllCtgNames().length];
  }

  getAllMethodNames() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      (method) => {
        return method !== "constructor" && method !== "getStoreStats";
      }
    );
  }

  /* ************************* */
  /* LOCAL STORAGE MANAGEMENT */
  static getStore() {
    const storeString = localStorage.getItem("store");
    return storeString ? JSON.parse(storeString) : [];
  }

  static getActiveStore() {
    const activeStoreString = localStorage.getItem("activeStore");
    return activeStoreString ? JSON.parse(activeStoreString) : [];
  }

  static getCtg() {
    const ctgString = localStorage.getItem("ctg");
    return ctgString ? JSON.parse(ctgString) : [];
  }

  static getShortcutsStatus() {
    const shortcutsStatusString = localStorage.getItem(
      "keyboardShortcutsStatus"
    );
    return shortcutsStatusString ? JSON.parse(shortcutsStatusString) : null;
  }

  static getAnimationStatus() {
    const animationStatusString = localStorage.getItem("animationStatus");
    return animationStatusString ? JSON.parse(animationStatusString) : null;
  }

  // *******************
  static setStore(store: any) {
    localStorage.setItem("store", JSON.stringify(store));
  }

  static setActiveStore(activeStore: any) {
    localStorage.setItem("activeStore", JSON.stringify(activeStore));
  }

  static setCtg(ctg: any) {
    localStorage.setItem("ctg", JSON.stringify(ctg));
  }

  static setShortcutsStatus(status: any) {
    localStorage.setItem("keyboardShortcutsStatus", JSON.stringify(status));
  }

  static setAnimationStatus(status: any) {
    localStorage.setItem("animationStatus", JSON.stringify(status));
  }
  /* ************************* */

  /* ************** */
  /* essential crud (entries) - create, read, update, delete */
  addEntry(entry: any) {
    this.store.push(entry);
    StoreClass.setStore(this.store);
  }

  createEntry(...args: [any, any, any, any, any, any]) {
    this.addEntry(new Entry(...args));
    StoreClass.setStore(this.store);
  }

  deleteEntry(id: any) {
    this.store = this.store.filter((entry: any) => entry.id !== id);
    StoreClass.setStore(this.store);
  }

  getActiveEntries() {
    const active = this.getActiveCategories();
    if (!active) return [];
    const activeEntries = this.store.filter((entry: any) => {
      return active ? active.indexOf(entry.category) > -1 : [];
    });
    return activeEntries;
  }

  getEntry(id: any) {
    return this.store.find((entry: any) => entry.id === id);
  }

  getEntries() {
    return this.store || [];
  }

  getEntriesByCtg(ctg: any) {
    return this.store.filter((entry: any) => {
      return entry.category === ctg;
    });
  }

  removeLastEntry() {
    this.store.pop();
    StoreClass.setStore(this.store);
  }

  getLastEntryId() {
    return this.store[this.store.length - 1].id;
  }

  compareEntries(entry1: any, entry2: any) {
    for (let key in entry1) {
      if (key === "id" || key === "coordinates") continue;
      if (key === "end" || key === "start") {
        if (
          new Date(entry1[key]).getTime() - new Date(entry2[key]).getTime() !==
          0
        ) {
          return false;
        }
      } else if (entry1[key] !== entry2[key]) {
        return false;
      }
    }
    return true;
  }

  updateEntry(id: any, data: any) {
    let entry: any = this.getEntry(id);
    entry = Object.assign(entry, data);
    StoreClass.setStore(this.store);
  }
  /* ************ */

  /* **************************** */
  /* (ENTRIES) FILTER/SORT/PARTITION/ */
  searchBy(entries: any, searchtype: any, value: any) {
    if (entries.length === 0) return;
    return entries.filter((entry: any) => {
      return entry[searchtype].toLowerCase().slice(0, value.length) === value;
    });
  }

  sortBy(entries: any, type: any, direction: any) {
    if (entries.length === 0) return;

    if (direction === "desc") {
      return entries.sort((a: any, b: any) => {
        if (type === "start" || type === "end") {
          return new Date(a[type]).getTime() - new Date(b[type]).getTime();
        } else if (
          type === "description" ||
          type === "title" ||
          type === "category"
        ) {
          return a[type].localeCompare(b[type]);
        } else {
          return +a[type] - +b[type];
        }
      });
    } else {
      return entries.sort((a: any, b: any) => {
        if (type === "start" || type === "end") {
          return new Date(b[type]).getTime() - new Date(a[type]).getTime();
        } else if (
          type === "description" ||
          type === "title" ||
          type === "category"
        ) {
          return b[type].localeCompare(a[type]);
        } else {
          return +b[type] - +a[type];
        }
      });
    }
  }

  getFirstAndLastEntry() {
    let sorted = this.sortBy(this.getActiveEntries(), "start", "desc");
    if (sorted === undefined) {
      return [0, 0];
    } else {
      return [sorted[0].start, sorted[sorted.length - 1].end];
    }
  }
  /* **************************** */

  /* *************************************** */
  /* SEGMENT ENTRIES FOR SPECIFIC VIEWS (YEAR/MONTH/...ect)*/

  // @generateCoordinates -- (only used in week and day view)
  // generates coordinates based on start and end times for a given entry
  // if an entry spans beyond a day, it will render at the top of the grid in
  // a static (immobile) position.
  generateCoordinates(start: any, end: any) {
    [start, end] = [testDate(start), testDate(end)];

    let startMin = start.getHours() * 4 + Math.floor(start.getMinutes() / 15);
    let endMin = end.getHours() * 4 + Math.floor(end.getMinutes() / 15);
    let height = endMin - startMin;
    let total = startMin + height;

    if (!compareDates(start, end)) {
      return {
        allDay: true,
        x: start.getDay(),
        x2: end.getDay(),
      };
    } else {
      return {
        allDay: false,
        x: start.getDay(),
        y: startMin,
        h: height,
        e: total,
      };
    }
  }

  getDayEntries(day: any) {
    let activeEntries: any = this.getActiveEntries();
    let boxes: any = {
      allDay: [], // entries that start on one day and end on another
      day: [], // entries that start and end on same day
    };

    if (activeEntries.length === 0) return boxes;

    let dayEntries = activeEntries.filter((entry: any) => {
      let entryDate: any = new Date(entry.start);
      const [y, m, d]: any = [
        entryDate.getFullYear(),
        entryDate.getMonth(),
        entryDate.getDate(),
      ];
      return (
        y === day.getFullYear() && m === day.getMonth() && d === day.getDate()
      );
    });

    dayEntries.forEach((entry: any) => {
      entry.coordinates = this.generateCoordinates(
        new Date(entry.start),
        new Date(entry.end)
      );

      if (entry.coordinates.allDay) {
        boxes.allDay.push(entry);
      } else {
        boxes.day.push(entry);
      }
    });
    return boxes;
  }

  getDayEntriesArray(targetDate: any) {
    let activeEntries: any = this.getActiveEntries();
    if (activeEntries.length === 0) return [];

    return activeEntries.filter((entry: any) => {
      let entryDate: any = new Date(entry.start);
      const [y, m, d]: any = [
        entryDate.getFullYear(),
        entryDate.getMonth(),
        entryDate.getDate(),
      ];
      return (
        y === targetDate.getFullYear() &&
        m === targetDate.getMonth() &&
        d === targetDate.getDate()
      );
    });
  }

  getMonthEntries(montharr: any) {
    let activeEntries: any = this.getActiveEntries();
    if (activeEntries.length === 0) return [];

    return activeEntries.filter((entry: any) => {
      let entryDate: any = new Date(entry.start);
      return (
        entryDate >= montharr[0] && entryDate <= montharr[montharr.length - 1]
      );
    });
  }

  getMonthEntryDates(montharr: any) {
    let entries: any = this.getMonthEntries(montharr);
    let grouped: any = {};
    entries.forEach((entry: any) => {
      let entryDate: any = new Date(entry.start);
      const [y, m, d]: any = [
        entryDate.getFullYear(),
        entryDate.getMonth(),
        entryDate.getDate(),
      ];
      let key: any = `${y}-${m}-${d}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(entry);
    });
    return Object.keys(grouped);
  }

  getGroupedMonthEntries(entries: any) {
    return entries.reduce((acc: any, entry: any) => {
      let tempDate = new Date(entry.start);
      let day = tempDate.getDate();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry);
      return acc;
    }, {});
  }

  getWeekEntries(week: any) {
    let activeEntries: any = this.getActiveEntries();
    let [start, end]: any = [week[0], week[6]];
    let boxes: any = {
      allDay: [], // entries that start on one day and end on another
      day: [], // entries that start and end on same day
    };

    if (activeEntries.length === 0) return boxes;
    let entries: any = activeEntries.filter((entry: any) => {
      let entryDate: any = new Date(entry.start);
      return entryDate >= start && entryDate <= end;
    });

    entries.forEach((entry: any) => {
      entry.coordinates = this.generateCoordinates(
        new Date(entry.start),
        new Date(entry.end)
      );

      if (entry.coordinates.allDay) {
        boxes.allDay.push(entry);
      } else {
        boxes.day.push(entry);
      }
    });

    return boxes;
  }

  getYearEntries(year: any) {
    let activeEntries = this.getActiveEntries();
    if (activeEntries.length === 0) return [];
    return activeEntries.filter(
      (entry: any) => new Date(entry.start).getFullYear() === year
    );
  }

  getGroupedYearEntries(yearentries: any) {
    let grouped: any = {};
    yearentries.forEach((entry: any) => {
      let entryDate: any = new Date(entry.start);
      let month: any = entryDate.getMonth();
      let day: any = entryDate.getDate();

      if (!grouped[month]) {
        grouped[month] = {};
      }

      if (!grouped[month][day]) {
        grouped[month][day] = [];
      }

      grouped[month][day].push(entry);
    });

    return grouped;
  }

  /* ************************************* */

  /* ********************* */
  /*  CATEGORY MANAGEMENT */
  addNewCtg(categoryName: any, color: any) {
    if (!this.hasCtg(categoryName)) {
      this.ctg[categoryName] = {
        color: color,
        active: true,
      };
      StoreClass.setCtg(this.ctg);
    }
  }

  deleteCategory(category: any) {
    if (this.hasCtg(category)) {
      delete this.ctg[category];
      StoreClass.setCtg(this.ctg);
    }
  }

  getDefaultCtg() {
    return Object.entries(this.ctg)[0];
  }

  getFirstActiveCategory() {
    for (let [key, value] of Object.entries(this.ctg) as any) {
      if (value.active) {
        return key;
      }
    }
    return "default";
  }

  getFirstActiveCategoryKeyPair() {
    for (let [key, value] of Object.entries(this.ctg) as any) {
      if (value.active) {
        return [key, value.color];
      }
    }
    const backup: any = this.getDefaultCtg();
    return [backup[0], backup[1].color];
  }

  getActiveCategories() {
    let active = Object.keys(this.ctg).filter((key) => this.ctg[key].active);
    if (active.length > 0) {
      return active;
    } else {
      active = [];
    }
  }

  getActiveCategoriesKeyPair() {
    return Object.entries(this.ctg).filter((key: any) => key[1].active);
  }

  getAllCtg() {
    return this.ctg;
  }

  getAllCtgColors() {
    return Object.values(this.ctg).map((ctg: any) => ctg.color);
  }

  getAllCtgNames() {
    return Object.keys(this.ctg);
  }

  getCategoryStatus(category: any) {
    if (this.ctg.hasOwnProperty(category)) {
      return this.ctg[category].active;
    }
  }

  getCtgColor(ctg: any) {
    return this.ctg[ctg].color;
  }

  getCtgLength(category: any) {
    return this.store.filter((entry: any) => entry.category === category)
      .length;
  }

  hasCtg(categoryName: any) {
    let hasctg = false;
    for (let key in this.ctg) {
      if (key.toLowerCase() === categoryName.toLowerCase()) {
        hasctg = true;
      }
    }
    return hasctg;
  }

  /**
   *
   * @param {string} category
   * @param {string} newCategory
   */
  moveCategoryEntriesToNewCategory(
    category: any,
    newCategory: any,
    newName: any
  ) {
    if (this.hasCtg(category) || newName === true) {
      this.store.forEach((entry: any) => {
        if (entry.category === category) {
          entry.category = newCategory;
        }
      });
      StoreClass.setStore(this.store);
    }
    this.deleteCategory(category);
  }

  removeCategoryAndEntries(category: any) {
    if (this.hasCtg(category)) {
      this.store = this.store.filter(
        (entry: any) => entry.category !== category
      );
      StoreClass.setStore(this.store);
    }
    this.deleteCategory(category);
  }

  setCategoryStatus(category: any, status: any) {
    if (this.hasCtg(category)) {
      this.ctg[category].active = status;
      StoreClass.setCtg(this.ctg);
    }
  }

  setAllCategoryStatusExcept(category: any, status: any) {
    for (let key in this.ctg) {
      if (key !== category) {
        this.ctg[key].active = status;
      } else {
        this.ctg[key].active = !status;
      }
    }
    StoreClass.setCtg(this.ctg);
  }

  /**
   *
   * @param {string} categoryName
   * @param {string} color
   * @desc updates the color of a category
   */
  updateCtgColor(categoryName: any, color: any) {
    if (this.hasCtg(categoryName)) {
      this.ctg[categoryName].color = color;
      StoreClass.setCtg(this.ctg);
    }
  }

  getCtgIndex(category: any) {
    return Object.keys(this.ctg).indexOf(category);
  }

  /**
   *
   * @param {string} newName
   * @param {string} newColor
   * @param {string} oldName
   * @returns new category object
   * @desc note that 'value' of [key, value] is necessary to segment the object, even if it is not directly referenced
   */
  updateCtg(newName: any, newColor: any, oldName: any) {
    let entries: any = Object.entries(this.ctg);
    let hasColor = newColor !== null;
    let count = 0;
    let length = entries.length;

    const isNumeric = (n: any) => !isNaN(parseFloat(n)) && isFinite(n);
    if (isNumeric(newName)) {
      newName = "category " + newName;
    }

    for (let [key, value] of entries) {
      count++;
      if (count === 1) {
        // changing the default category;
        if (oldName === key) {
          entries[0][0] = newName;
          if (hasColor) {
            entries[0][1].color = newColor;
          }
        }
      } else {
        if (oldName === key) {
          entries[count - 1][0] = newName;
          if (hasColor) {
            entries[count - 1][1].color = newColor;
          }
        }
      }
    }
    if (entries.length !== length) {
      console.error("something went wrong with category name/color change");
      return;
    } else {
      this.ctg = Object.fromEntries(entries);
      this.moveCategoryEntriesToNewCategory(oldName, newName, true);
      StoreClass.setCtg(this.ctg);
    }
  }
  /* ********************* */

  /* ***************************** */
  /*  KEYBOARD SHORTCUT MANAGEMENT */
  getShortcuts() {
    return this.keyboardShortcuts;
  }

  setShortCut(shortcut: any) {
    const keys = Object.keys(this.getShortcuts());
    let idx = keys.indexOf(shortcut);
    if (idx > -1) {
      return `Shortcut (${shortcut}) is already in use`;
    } else {
      return;
    }
  }

  setShortcutsStatus(status: any) {
    this.keyboardShortcutsStatus = status;
    StoreClass.setShortcutsStatus(status);
  }

  getShortcutsStatus() {
    const status = StoreClass.getShortcutsStatus();
    return status !== null ? status : true;
  }
  /* ***************************** */

  /* ***************************** */
  /*  ANIMATION MANAGEMENT */

  getAnimationStatus() {
    const status = StoreClass.getAnimationStatus();
    return status !== null ? status : true;
  }

  setAnimationStatus(status: any) {
    this.animationStatus = status;
    StoreClass.setAnimationStatus(status);
  }
  /* ***************************** */

  /* ******************** */
  /*  OVERLAY MANAGEMENT */
  // see readme @ --overlay management-- for more info
  addActiveOverlay(overlay: any) {
    this.activeOverlay.add(overlay);
  }

  removeActiveOverlay(overlay: any) {
    const len = this.activeOverlay.size;
    if (len === 0) {
      return;
    } else if (this.activeOverlay.size === 1) {
      this.activeOverlay = new Set();
      return;
    } else {
      this.activeOverlay = new Set(
        [...this.activeOverlay].filter((o) => o !== overlay)
      );
      return;
    }
  }

  getActiveOverlay() {
    return this.activeOverlay;
  }

  hasActiveOverlay() {
    return this.activeOverlay.size > 0;
  }
  /* ******************** */

  /* ************************ */
  /*  JSON UPLOAD & DOWNLOAD */
  validateUserUpload(userUpload: any) {
    const keys = Object.keys(userUpload);
    let message: any = {};
    if (keys.length > localStoreKeyNames.length) {
      message.err1 = "invalid number of keys (too many)";
    }

    for (let i = 0; i < keys.length; i++) {
      if (!localStoreKeyNames.includes(keys[i])) {
        let errname = "err" + Object.keys(message).length;
        message[errname] = "invalid key: " + keys[i];
      }
    }

    if (Object.keys(message).length > 0) {
      return message;
    } else {
      return true;
    }
  }

  setUserUpload(userUpload: any) {
    const validation = this.validateUserUpload(userUpload);
    let validated;
    if (validation === true) {
      localStorage.clear();
      validated = true;
      for (const [key, value] of Object.entries(userUpload) as any) {
        localStorage.setItem(key, value);
      }
    } else {
      return validation;
    }
    if (validated) {
      const refresh = localStorage.getItem("refresh");
      if (refresh === null) {
        window.location.reload();
        window.localStorage.setItem("refresh", "1");
      }
    }
  }

  getUserUpload() {
    return this.userUpload;
  }
  /* ************************ */

  /* ******************************************* */
  /*  STATE MANAGEMENT : RENDERING / RESET / RESIZE */
  /**
   * This got a bit more complicated than I anticipated, I'll come back to this later;
   */
  setFormRenderHandle(type: any, callback: any) {
    this.handleRenders.calendars[type].render = callback;
  }

  setFormResetHandle(type: any, callback: any) {
    this.handleRenders.calendars[type].reset = callback;
  }

  setRenderFormCallback(callback: any) {
    this.handleRenders.form.callback = callback;
  }

  setRenderSidebarCallback(callback: any) {
    this.handleRenders.sidebar.callback = callback;
  }

  setResizeHandle(type: any, callback: any) {
    this.handleRenders.calendars[type].resize = callback;
  }

  setDataReconfigCallback(callback: any) {
    this.handleRenders.reconfig.callback = callback;
  }

  setResetDatepickerCallback(callback: any) {
    this.handleRenders.datepicker.reset = callback;
  }

  setResetPreviousViewCallback(callback: any) {
    this.handleRenders.calendars["previous"].reset = callback;
  }

  setRenderCategoriesCallback(callback: any) {
    this.handleRenders.categories.callback = callback;
  }

  getRenderCategoriesCallback() {
    return this.handleRenders.categories.callback;
  }

  getResetPreviousViewCallback() {
    return this.handleRenders.calendars["previous"].reset;
  }

  getResetDatepickerCallback() {
    return this.handleRenders.datepicker.reset;
  }

  getDataReconfigCallback() {
    return this.handleRenders.reconfig.callback;
  }

  getResizeHandle(type: any) {
    if (this.handleRenders.calendars[type] === undefined) {
      return null;
    } else {
      return this.handleRenders.calendars[type].resize;
    }
  }

  getFormRenderHandle(type: any) {
    if (this.handleRenders.calendars[type] === undefined) {
      return null;
    } else {
      return this.handleRenders.calendars[type].render;
    }
  }

  getFormResetHandle(type: any) {
    if (this.handleRenders.calendars[type].reset === undefined) {
      return null;
    } else {
      return this.handleRenders.calendars[type].reset;
    }
  }

  getRenderFormCallback() {
    const callback = this.handleRenders.form.callback;
    if (callback !== null) {
      return callback;
    } else {
      return null;
    }
  }

  getRenderSidebarCallback() {
    const callback = this.handleRenders.sidebar.callback;
    if (callback !== null) {
      return callback;
    } else {
      return null;
    }
  }
  /* ************************************ */
}

// single
const Store = new StoreClass();
export default Store;
