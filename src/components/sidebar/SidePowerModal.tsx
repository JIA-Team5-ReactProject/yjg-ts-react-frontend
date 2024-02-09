import { useNavigate } from "react-router-dom";
import DropDown from "../../icons/DropDown";
import { useState } from "react";
import { Power } from "../../types/sidebarList";

function SidePowerModal(props: { power: Power }) {
  const { power } = props;
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);

  return (
    <div className=" bg-cyan-900/75 mx-4 flex-col rounded-t-xl select-none ">
      <div className="bg-cyan-600/70 h-16 pl-3 flex items-center text-white text-2xl rounded-t-xl shadow-md shadow-inherit">
        <div className="flex-none">{power.icon}</div>
        <div
          className="grow text-center cursor-pointer"
          onClick={() => {
            navigate(power.path);
          }}
        >
          {power.power}
        </div>
        <div
          className="flex-none cursor-pointer "
          onClick={() => {
            setOnModal(!onModal);
          }}
        >
          <DropDown />
        </div>
      </div>
      {onModal
        ? power.list.map((v, i) => (
            <div
              className={`${
                power.list.length - 1 === i
                  ? null
                  : "border-b-2 border-dotted border-white/60"
              } h-16 flex items-center justify-center text-white/60 text-lg font-light cursor-pointer`}
              onClick={() => {
                navigate(v.path);
              }}
            >
              {v.name}
            </div>
          ))
        : null}
    </div>
  );
}

export default SidePowerModal;
