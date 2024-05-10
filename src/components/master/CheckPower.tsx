import CheckIcon from "../../icons/CheckIcon";

function CheckPower(props: {
  power: string;
  name: string;
  userPower: string[];
  setUserPower: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { power, name, userPower, setUserPower } = props;

  const changePower = (power: string) => {
    if (userPower.includes(power)) {
      const filteredPower = userPower.filter((item) => item !== power);
      setUserPower(filteredPower);
    } else {
      const newPower = [...userPower, power];
      setUserPower(newPower);
    }
  };

  return (
    <>
      <div>{name}</div>
      {userPower.includes(power) ? (
        <>
          <CheckIcon />
          <div
            className="cursor-pointer"
            onClick={() => {
              changePower(power);
            }}
          ></div>
        </>
      ) : (
        <>
          <div
            className="cursor-pointer"
            onClick={() => {
              changePower(power);
            }}
          ></div>
          <CheckIcon />
        </>
      )}
    </>
  );
}

export default CheckPower;
