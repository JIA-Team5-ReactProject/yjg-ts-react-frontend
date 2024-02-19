function CountCard(props: { header: string; count: number }) {
  const { header, count } = props;
  return (
    <div className="border border-gray-300 rounded-md shadow-lg p-5 w-full h-fit mb-10">
      <div className="text-cyan-500 font-bold text-lg text-center">
        {header}
      </div>
      <div className="mx-auto border border-gray-500 h-24 w-24 rounded-full mt-3 flex justify-center items-center font-bold text-2xl">
        {count}
      </div>
    </div>
  );
}

export default CountCard;
