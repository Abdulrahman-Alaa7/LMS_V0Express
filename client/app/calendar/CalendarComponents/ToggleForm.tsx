import React, { FC } from "react";
import { IoAdd } from "react-icons/io5";

type Props = {};

const ToggleForm: FC<Props> = ({}) => {
  return (
    <>
      <aside className="toggle-form">
        <span className="toggle-form-btn" role="button" aria-label="open form">
          <IoAdd size={15} className={`!text-[#0095f6]`} />
        </span>
      </aside>
    </>
  );
};

export default ToggleForm;
