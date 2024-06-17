import { useEffect, useRef, useState } from "react";
import { privateApi } from "../../services/customAxios";

function RestaurantQRCheck() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState("");

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await privateApi.post("/api/qr/check", {
        id: id,
      });
      console.log(res);
      setId("");
      alert(res.data.message);
    } catch {
      alert("QR을 다시 찍어주세요.");
    }
  };

  return (
    <form
      className="h-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        className="w-full h-full text-2xl text-center"
        ref={inputRef}
        onChange={(e) => {
          setId(e.target.value);
        }}
        value={id}
      />
    </form>
  );
}

export default RestaurantQRCheck;
