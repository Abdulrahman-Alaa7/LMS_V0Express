const randomTitles =
  "quaerat velit veniam amet cupiditate aut numquam ut sequi".split(" ");

const categoryNames = ["default"];
let endYears = [2023, 2023];
function generateStart() {
  let year = endYears[Math.floor(Math.random() * 1)];
  let month = Math.floor(Math.random() * 4);
  let day = Math.floor(Math.random() * 30);
  let hour = Math.floor(Math.random() * 4) + 8;
  let minute = Math.round(Math.floor(Math.random() * 46) / 15) * 15;

  return new Date(year, month, day, hour, minute, 0, 0);
}

function generateEnd(start: any) {
  let endDay = Math.floor(Math.random() * 1);
  let endHour = Math.floor(Math.random() * 4) + 12;

  return new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + endDay,
    endHour,
    start.getMinutes(),
    0,
    0
  );
}

class FEntry {
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
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.start = start;
    this.title = title;
  }
}

// const generateRandomEvents = () => {
export default function generateRandomEvents(numberOfEvents: any) {
  const events: any[] = [];
  if (
    numberOfEvents === undefined ||
    numberOfEvents === null ||
    numberOfEvents === 0 ||
    Number.isNaN(numberOfEvents) ||
    !Number.isFinite(numberOfEvents) ||
    numberOfEvents === -0 ||
    numberOfEvents > 1000
  ) {
    numberOfEvents = 100;
  }
  for (let i = 0; i < numberOfEvents; i++) {
    const start = generateStart();
    const end = generateEnd(start);
    events.push(
      new FEntry(
        categoryNames[Math.floor(Math.random() * categoryNames.length)],
        true,
        "random body",
        end,
        start,
        randomTitles[Math.floor(Math.random() * randomTitles.length)]
      )
    );
  }
  return events;
}
