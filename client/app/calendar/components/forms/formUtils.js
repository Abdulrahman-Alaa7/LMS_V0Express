import { locales } from "../../locales/en";
import { placePopup } from "../../utilities/helpers";
class FormConfig {
  constructor() {
    this.monthNames = locales.labels.monthsShort;
    this.headerOffset =
      typeof window !== "undefined" ? document.querySelector(".header") : null;
    this.form =
      typeof window !== "undefined"
        ? document.querySelector(".entries__form")
        : null;
    this.formBody =
      typeof window !== "undefined"
        ? document.querySelector(".entries__form--body")
        : null;
    this.formTitleDescription =
      typeof window !== "undefined"
        ? document.querySelectorAll(".form-body-single")
        : null;
    this.formStartEndCtg =
      typeof window !== "undefined"
        ? document.querySelectorAll(".form-body-double")
        : null;
    this.formsubmitbtn =
      typeof window !== "undefined"
        ? document.querySelector(".form--footer__button-save")
        : null;
    this.formCategoryWrapper =
      typeof window !== "undefined"
        ? document.querySelector(".form--body__category-modal--wrapper")
        : null;
    this.formCategorySelect =
      typeof window !== "undefined"
        ? document.querySelector(
            ".form--body__category-modal--wrapper-selection"
          )
        : null;
    this.formCategoryWrapperIcon =
      typeof window !== "undefined"
        ? document.querySelector(".form--body__category-modal--wrapper__color")
        : null;
    this.formCategoryTitle =
      typeof window !== "undefined"
        ? document.querySelector(".form--body__category-modal--wrapper__title")
        : null;
    this.formCatgoryIcon =
      typeof window !== "undefined"
        ? document.querySelector(".form--body__category-icon")
        : null;
  }

  /**
   *
   * @param {number} eX element left
   * @param {number} eY element top
   * @param {boolean} shouldCenter (optional) should the form be centered to the element
   * @param {number} centerOffset (optional) offset from the center of the element
   */
  setFormStyle(eX, eY, shouldCenter, centerOffset) {
    if (!shouldCenter) {
      shouldCenter = false;
    }
    if (!centerOffset) {
      centerOffset = null;
    }
    let [x, y] = placePopup(
      this.form.offsetWidth,
      this.form.offsetHeight,
      [eX, eY],
      [window.innerWidth, window.innerHeight],
      shouldCenter,
      centerOffset
    );
    this.form.style.left = `${x}px`;
    this.form.style.top = `${y}px`;
    this.form.style.margin = "0";
  }

  setFormSubmitType(type, id) {
    this.formsubmitbtn.setAttribute("data-form-action", type);
    this.formsubmitbtn.setAttribute(
      "data-form-entry-id",
      id === null ? (id = "") : id
    );
  }

  configFormTitleDescriptionInput(title, description) {
    this.formTitleDescription.forEach((input, idx) => {
      input.firstElementChild.value = [title, description][idx];
    });
  }

  /**
   *
   * @param {HTML} input
   * @param {object} date
   * @param {number} minutes
   * @param {string} dateFormatted
   * @desc
   * Set the date & time for the form input fields
   * Set attributes for date/time inputs
   * Format date/time for display
   */
  setFormDateInput(input, date, minutes, dateFormatted) {
    const [dateinput, timeinput] = [
      input.firstElementChild,
      input.lastElementChild,
    ];

    const timeformatted = `${date.getHours()}:${minutes}`;
    timeinput.setAttribute("data-form-time", timeformatted);

    // darn yankee time
    timeinput.textContent = `${
      +date.getHours() === 0 || +date.getHours() === 12
        ? 12
        : date.getHours() % 12
    }:${minutes}${date.getHours() < 12 ? "am" : "pm"}`;

    dateinput.setAttribute("data-form-date", dateFormatted);
    dateinput.textContent = `${
      this.monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  setFormDatepickerDate(context, datepickerContext, start) {
    start = new Date(start);
    context.setDateSelected(start.getDate());
    datepickerContext.setDate(
      context.getYear(),
      context.getMonth(),
      context.getDay()
    );
    datepickerContext.setDateSelected(start.getDate());
  }

  /**
   *
   * @param {object} dates
   * @desc
   * Iterate through object containing the data below to both the start date/time & end date/time form inputs
   *
   * DateObject: [Date(start), Date(end)]
   *
   * Minutes: [start minutes, end minutes]
   *
   * DateString [start date, end date]
   *
   */
  configFormDateInputs(dates) {
    for (let i = 0; i < 2; i++) {
      this.setFormDateInput(
        this.formStartEndCtg[i].lastElementChild,
        dates.dateObj[i],
        dates.minutes[i],
        dates.formatted[i]
      );
    }
  }

  configFormCategoryInput(categoryData) {
    const [title, color] = categoryData;
    this.formCategoryWrapper.setAttribute("data-form-category", title);
    this.formCategorySelect.style.backgroundColor = color;
    this.formCategoryWrapperIcon.style.backgroundColor = color;
    this.formCatgoryIcon.firstChild.setAttribute("fill", color);
    this.formCategoryTitle.textContent = title;
  }

  getConfig(data) {
    this.setFormSubmitType(data.submission.type, data.submission.id);

    this.configFormCategoryInput([data.category.name, data.category.color]);

    this.configFormDateInputs(data.dates.object);

    if (data.submission.type === "edit") {
      this.configFormTitleDescriptionInput(
        data.submission.title,
        data.submission.description
      );
    }
  }
}

const fullFormConfig = new FormConfig();
export default fullFormConfig;
