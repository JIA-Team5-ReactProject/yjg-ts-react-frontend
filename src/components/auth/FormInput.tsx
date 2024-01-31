import { FormInputPropsType } from "../../types/login";

function FormInput(props: FormInputPropsType): JSX.Element {
  const { type, name, label, check, placeholder, register, errorMessage } =
    props;

  return (
    <>
      <label
        htmlFor={name}
        className="flex items-center text-cyan-600 font-bold mb-1"
      >
        {label}
        {errorMessage && (
          <span className="text-red-500 text-xs translate-x-2 tracking-tight">
            {errorMessage}
          </span>
        )}
      </label>
      <div className="flex mb-8 p-1 border-b-2 border-cyan-700/50">
        <input
          name="{name}"
          {...register}
          type={type}
          placeholder={placeholder}
          className="flex-1 pl-1 font-semibold bg-transparent focus:outline-none "
          autoComplete="off"
        />
        {check ? (
          <button
            type="button"
            onClick={check.onCheck}
            className="flex-initial justify-items-start text-white bg-cyan-600 px-3 py-2 rounded-3xl text-xs"
          >
            {check.buttonState ? check.textT : check.textF}
          </button>
        ) : null}
      </div>
    </>
  );
}

export default FormInput;
