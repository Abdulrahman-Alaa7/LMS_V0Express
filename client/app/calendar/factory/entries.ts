import { generateId } from "../utilities/helpers";

export class Entry {
  category: any;
  completed: any;
  description: any;
  end: any;
  id: any;
  start: any;
  title: any;
  constructor(
    category: any,
    completed: any,
    description: any,
    end: any,
    start: any,
    title: any
  ) {
    this.category = category;
    this.completed = completed;
    this.description = description;
    this.end = end;
    this.id = generateId();
    this.start = start;
    this.title = title;
  }
}

class CoordinateEntry {
  category: any;
  completed: any;
  coordinates: { latitude: any; longitude: any };
  description: any;
  id: any;
  title: any;

  constructor(
    category: any,
    completed: any,
    coordinates: { latitude: any; longitude: any },
    description: any,
    id: any,
    title: string
  ) {
    this.category = category;
    this.completed = completed || false;
    this.coordinates = coordinates || {};
    this.description = description;
    this.id = id;
    this.title = title;
  }
}

class Week {
  dayEntries: any;
  allDayEntries: any;
  boxes: any;
  boxesTop: any;
  constructor(dayEntries: any, allDayEntries: any) {
    this.boxes = dayEntries;
    this.boxesTop = allDayEntries;
  }

  setAllBoxes(tempEntries: any) {
    this.boxes = tempEntries.day;
    this.boxesTop = tempEntries.allDay;
  }

  addBox(box: any) {
    this.boxes.push(box);
  }

  addBoxTop(box: any) {
    this.boxesTop.push(box);
  }

  getBox(id: any) {
    return this.boxes.find((box: any) => box.id === id);
  }

  getBoxes() {
    return this.boxes;
  }

  getBoxesTop() {
    return this.boxesTop;
  }

  getLength() {
    return this.boxes.length;
  }

  getBoxesByColumn(col: any) {
    return this.boxes.filter((box: any) => +box.coordinates.x == col);
  }

  getBoxesByColumnTop(col: any) {
    return this.boxesTop.filter((box: any) => +box.coordinates.x == col);
  }

  getBoxesTopByDay(day: any) {
    return this.boxesTop.filter((box: any) => +box.coordinates.y == day);
  }

  getBoxesTopLengths() {
    return this.getBoxesTop().reduce((a: any, c: any) => {
      let start = new Date(c.start);
      if (a[start.getDay()]) {
        a[start.getDay()]++;
      } else {
        a[start.getDay()] = 1;
      }
      return a;
    }, {});
  }

  getColumnsWithMultipleBoxes() {
    let temp: any = {};
    let columns: any = [];
    for (const box of this.boxes) {
      if (temp[box.coordinates.x]) {
        temp[box.coordinates.x]++;
        if (temp[box.coordinates.x] === 2) {
          columns.push(box.coordinates.x);
        }
      } else {
        temp[box.coordinates.x] = 1;
      }
    }
    return columns;
  }

  getEntriesByTitle(title: any) {
    return this.boxes.filter((box: any) =>
      box.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  updateCoordinates(id: any, coordinates: any) {
    this.getBox(id).coordinates = coordinates;
  }

  sortByY(bxs: any) {
    return bxs.sort((a: any, b: any) => +a.coordinates.y - +b.coordinates.y);
  }

  checkForCollision(col: any) {
    const bxs = this.getBoxesByColumn(col);
    let overlaps: any = []; // a list to store the overlapping entries
    for (let i = 0; i < bxs.length; i++) {
      for (let j = i + 1; j < bxs.length; j++) {
        const e1 = bxs[i];
        const e2 = bxs[j];
        if (
          e1.coordinates.y < e2.coordinates.e &&
          e1.coordinates.e > e2.coordinates.y
        ) {
          if (!overlaps.includes(e1)) {
            overlaps.push(e1);
          }
          if (!overlaps.includes(e2)) {
            overlaps.push(e2);
          }
        }
      }
    }
    return overlaps.sort(
      (a: any, b: any) => +a.coordinates.y - +b.coordinates.y
    );
  }

  updateStore(store: any, id: any, weekArray: any) {
    const boxEntry = this.getBox(id);
    const coords = boxEntry.coordinates;
    let boxstart = +coords.y * 15;
    let boxend = +coords.e * 15;
    let day = weekArray[+coords.x];

    const startDate = new Date(day);
    const starthours = Math.floor(boxstart / 60);
    const startminutes = boxstart % 60;
    startDate.setHours(starthours);
    startDate.setMinutes(startminutes);

    const endDate = new Date(day);
    const endhours = Math.floor(boxend / 60);
    const endminutes = boxend % 60;
    endDate.setHours(endhours);
    endDate.setMinutes(endminutes);

    store.updateEntry(id, {
      start: startDate,
      end: endDate,
    });
  }
}

class Day {
  dayEntries: any;
  allDayEntries: any;
  boxes: any;
  boxesTop: any;
  constructor(dayEntries: any, allDayEntries: any) {
    this.boxes = dayEntries;
    this.boxesTop = allDayEntries;
  }

  setAllBoxes(tempEntries: any) {
    this.boxes = tempEntries.day;
    this.boxesTop = tempEntries.allDay;
  }

  addBox(box: any) {
    this.boxes.push(box);
  }

  addBoxTop(box: any) {
    this.boxesTop.push(box);
  }

  getBox(id: any) {
    return this.boxes.find((box: any) => box.id === id);
  }

  getBoxes() {
    return this.boxes;
  }

  getBoxesTop() {
    return this.boxesTop;
  }

  getAllBoxes() {
    return [...this.boxes, ...this.boxesTop];
  }

  getLength() {
    return this.boxes.length;
  }

  getBoxesTopLengths() {
    return this.getBoxesTop().reduce((a: any, c: any) => {
      let start = new Date(c.start);
      if (a[start.getDay()]) {
        a[start.getDay()]++;
      } else {
        a[start.getDay()] = 1;
      }
      return a;
    }, {});
  }

  getEntriesByTitle(title: any) {
    return this.boxes.filter((box: any) =>
      box.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  updateCoordinates(id: any, coordinates: any) {
    this.getBox(id).coordinates = coordinates;
  }

  getEntriesEndingOnDay(day: any) {
    return this.boxes.filter((box: any) => +box.coordinates.e === day);
  }

  sortByY(bxs: any) {
    return bxs.sort((a: any, b: any) => {
      let diff = +a.coordinates.y - +b.coordinates.y;
      if (diff === 0) {
        return +a.coordinates.e - +b.coordinates.e;
      } else {
        return diff;
      }
    });
  }

  checkForCollision() {
    const bxs = this.getBoxes();
    let overlaps: any = []; // a list to store the overlapping entries
    // entries.sort((a, b) => +a.coordinates.y - +b.coordinates.y)
    for (let i = 0; i < bxs.length; i++) {
      for (let j = i + 1; j < bxs.length; j++) {
        const e1 = bxs[i];
        const e2 = bxs[j];
        if (
          e1.coordinates.y < e2.coordinates.e &&
          e1.coordinates.e > e2.coordinates.y
        ) {
          if (!overlaps.includes(e1)) {
            overlaps.push(e1);
          }
          if (!overlaps.includes(e2)) {
            overlaps.push(e2);
          }
        }
      }
    }
    return overlaps.sort(
      (a: any, b: any) => +a.coordinates.y - +b.coordinates.y
    );
  }

  updateStore(store: any, id: any) {
    const boxEntry = this.getBox(id);
    const coords = boxEntry.coordinates;
    let boxstart = +coords.y * 15;
    let boxend = +coords.e * 15;

    const startDate = new Date(boxEntry.start);
    const starthours = Math.floor(boxstart / 60);
    const startminutes = boxstart % 60;
    startDate.setHours(starthours);
    startDate.setMinutes(startminutes);

    const endDate = new Date(boxEntry.start);
    let endhours = Math.floor(boxend / 60);
    let endminutes = boxend % 60;
    if (endhours === 24) {
      endhours = 23;
      endminutes = 59;
    }
    endDate.setHours(endhours);
    endDate.setMinutes(endminutes);

    store.updateEntry(id, {
      start: startDate,
      end: endDate,
    });
  }
}

export { CoordinateEntry, Week, Day };
