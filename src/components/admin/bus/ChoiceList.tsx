import { ChoiceListType } from "../../../types/admin";

function ChoiceList(props: ChoiceListType) {
  const { head, state, setState, list } = props;

  return (
    <div className="flex-1 border-b-2 border-gray-300 pb-8">
      <div className="font-bold text-xl pl-2">{head}</div>
      <div className="flex gap-14 mt-2">
        {list.map((v) => {
          return (
            <span
              className={`${
                state === v.state
                  ? "border-sky-600 text-sky-600 shadow-cyan-600"
                  : "text-gray-400 text-2xl"
              } bg-white flex-1 border-2 rounded-lg p-5 font-bold text-2xl my-auto cursor-pointer shadow-md`}
              onClick={() => {
                setState(v.state);
              }}
            >
              {v.head}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default ChoiceList;
