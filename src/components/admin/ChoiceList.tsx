function ChoiceList(props: any) {
  const { head, state, setState, list } = props;

  return (
    <div className="border-b-2 border-gray-300 pb-12">
      <div className="font-bold text-xl pl-2">{head}</div>
      <div className="flex gap-14 mt-4">
        {list.map((v: any) => {
          return (
            <span
              className={`${
                state === v.state
                  ? "border-sky-600 text-sky-600 shadow-cyan-600"
                  : "text-gray-400 text-2xl"
              } flex-1 border-2 rounded-lg p-6 font-bold text-3xl my-auto cursor-pointer shadow-md`}
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
