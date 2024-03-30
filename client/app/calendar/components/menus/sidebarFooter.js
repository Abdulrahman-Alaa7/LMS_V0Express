import { getClosest } from "../../utilities/helpers";

const sidebarFooter =
  typeof window !== "undefined" ? document.querySelector(".sb__info") : null;

// popup containing : project notes, privacy policy, & terms of use
const sbInfoPopup =
  typeof window !== "undefined"
    ? document.querySelector(".sb__info-popup")
    : null;
const sbInfoPopupOverlay =
  typeof window !== "undefined"
    ? document.querySelector(".sb__info-popup-overlay")
    : null;
const selectInfo =
  typeof window !== "undefined"
    ? document.querySelector(".select-popup-info")
    : null;
const closePopupButton =
  typeof window !== "undefined"
    ? document.querySelector(".close-sb-info")
    : null;
const infopopupTitle =
  typeof window !== "undefined" ? document.querySelector(".sbip-title") : null;
const infopopupBody =
  typeof window !== "undefined"
    ? document.querySelector(".sbip-content")
    : null;

export default function handleSidebarFooter(store) {
  // const infoContent = {
  //   notes: {
  //     title: "Breakdown of project & current status",
  //     content: "These are my project notes",
  //   },
  //   privacy: {
  //     title: "Cookies and Data Privacy",
  //     content: "This project uses an open source license",
  //   },
  //   terms: {
  //     title: "Code license and terms of use",
  //     content:
  //       "All data is stored locally meaning no data is sent to a server.",
  //   },
  // };
  // function closeInfoPopup() {
  //   store.removeActiveOverlay("hide-sb-info-popup");
  //   sbInfoPopup.classList.add("hide-sb-info-popup");
  //   sbInfoPopupOverlay.classList.add("hide-sb-info-popup");
  //   document.removeEventListener("keydown", closeInfoPopupOnEscape);
  //   sbInfoPopupOverlay.onclick = null;
  //   closePopupButton.onclick = null;
  // }
  // function setInfoContent(selection) {
  //   infopopupTitle.innerText = infoContent[selection].title;
  //   infopopupBody.innerText = infoContent[selection].content;
  // }
  // function handleSelectInfoChange(e) {
  //   const selection = e.target.value;
  //   setInfoContent(selection);
  // }
  // function closeInfoPopupOnEscape(e) {
  //   if (e.key === "Escape") {
  //     closeInfoPopup();
  //   }
  // }
  // function setUpInfoPopup() {
  //   setInfoContent(selectInfo.value);
  //   selectInfo.onchange = handleSelectInfoChange;
  //   sbInfoPopupOverlay.onclick = closeInfoPopup;
  //   closePopupButton.onclick = closeInfoPopup;
  //   document.addEventListener("keydown", closeInfoPopupOnEscape);
  // }
  // function openInfoPopup(selection) {
  //   const selections = ["notes", "privacy", "terms"];
  //   const idx = selections.indexOf(selection);
  //   selectInfo.selectedIndex = idx;
  //   store.addActiveOverlay("hide-sb-info-popup");
  //   sbInfoPopup.classList.remove("hide-sb-info-popup");
  //   sbInfoPopupOverlay.classList.remove("hide-sb-info-popup");
  //   setUpInfoPopup();
  // }
  // function delegateSidebarFooterEvents(e) {
  //   const projectNotes = getClosest(e, ".sb__project-notes");
  //   const privacy = getClosest(e, ".sb__privacy");
  //   const terms = getClosest(e, ".sb__terms");
  //   if (projectNotes) {
  //     openInfoPopup("notes");
  //     return;
  //   }
  //   if (privacy) {
  //     openInfoPopup("privacy");
  //     return;
  //   }
  //   if (terms) {
  //     openInfoPopup("terms");
  //     return;
  //   }
  // }
  // if (sidebarFooter) {
  //   sidebarFooter.onmousedown = delegateSidebarFooterEvents;
  // }
}
