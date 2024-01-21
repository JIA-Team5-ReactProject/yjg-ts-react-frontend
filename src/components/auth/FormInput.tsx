type FormInputType = {
  type: string;
  name: string;
  label: string;
  check?: string;
};

function FormInput(props: FormInputType): JSX.Element {
  const { type, name, label, check } = props;

  return (
    <>
      <label htmlFor={name} className="text-cyan-600 font-bold mb-1">
        {label}
      </label>
      <div className="flex mb-8 p-1 border-b-2 border-cyan-700/50 focus:border-cyan-700">
        <input
          type={type}
          name={name}
          className="flex-1 pl-1 font-semibold bg-transparent focus:outline-none"
        />
        {check ? (
          <button className="flex-initial justify-items-start text-white bg-cyan-600 px-3 py-2 rounded-3xl text-xs">
            {check}
          </button>
        ) : null}
      </div>
    </>
  );
}

export default FormInput;
