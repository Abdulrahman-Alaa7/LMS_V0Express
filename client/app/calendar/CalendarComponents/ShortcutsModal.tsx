import React, { FC } from "react";

type Props = {};

const ShortcutsModal: FC<Props> = ({}) => {
  return (
    <>
      <aside className="shortcuts__modal hide-shortcuts">
        <div className="shortcuts-modal-header">
          <div className="shortcuts-modal-title">
            <span>Keyboard shortcuts</span>
            <div
              className="keyboard-disabled-sm-two"
              data-tooltip="Keyboard Shortcuts Disabled"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill="var(--red1)"
              >
                <path d="M4 19q-.825 0-1.412-.587Q2 17.825 2 17V7q0-.825.588-1.412Q3.175 5 4 5h16q.825 0 1.413.588Q22 6.175 22 7v10q0 .825-.587 1.413Q20.825 19 20 19Zm0-2h16V7H4v10Zm4-1h8v-2H8Zm-3-3h2v-2H5Zm3 0h2v-2H8Zm3 0h2v-2h-2Zm3 0h2v-2h-2Zm3 0h2v-2h-2ZM5 10h2V8H5Zm3 0h2V8H8Zm3 0h2V8h-2Zm3 0h2V8h-2Zm3 0h2V8h-2ZM4 17V7v10Z" />
              </svg>
            </div>
          </div>

          <div className="close-shortcuts-modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              fill="var(--white2)"
            >
              <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" />
            </svg>
          </div>
        </div>

        <div className="shortcuts-modal__body">
          <div className="shortcuts-modal-content"></div>
        </div>
      </aside>
    </>
  );
};

export default ShortcutsModal;
