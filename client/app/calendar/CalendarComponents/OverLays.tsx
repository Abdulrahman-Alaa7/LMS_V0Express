import React, { FC } from "react";

type Props = {};

const OverLays: FC<Props> = ({}) => {
  return (
    <>
      <aside
        style={{ display: "none" }}
        className="change-view--overlay toggle-options"
      ></aside>
      <aside
        className="resize-overlay hide-resize-overlay"
        style={{ backgroundColor: "transparent" }}
      ></aside>
      <aside className="sidebar-sub-menu__overlay hide-sidebar-sub-menu"></aside>
      <aside className="category__deletion-overlay hide-category-deletion"></aside>
      <aside className="form-overlay hide-form-overlay"></aside>
      <aside className="entry__options--overlay entry__options--hidden"></aside>
      <aside className="datepicker-overlay hide-datepicker-overlay"></aside>
      <aside className="sb__info-popup-overlay hide-sb-info-popup"></aside>
      <aside className="go-to-date-overlay hide-gotodate"></aside>
      <aside className="category__form-overlay hide-ctg-form"></aside>
      <aside className="shortcuts-modal-overlay hide-shortcuts"></aside>
    </>
  );
};

export default OverLays;
