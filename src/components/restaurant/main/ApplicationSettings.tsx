import { useState } from "react";

function ApplicationSettings() {
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState<string>("automatic");
  const kind = [
    {
      state: "automatic",
      head: "자동",
    },
    {
      state: "manual",
      head: "수동",
    },
  ];

  return (
    <div>
      <div className="font-bold text-lg pl-4 pb-2">• 식수 신청 설정</div>
      <div className="flex w-[800px] flex-col gap-6 shadow-lg px-10 py-5 border border-black/10 rounded-xl">
        <div className="flex flex-col">
          <div className="flex gap-8">
            <div className="font-bold text-2xl">주말 식수 신청</div>
            <div className="flex items-end gap-3">
              {kind.map((v) => {
                return (
                  <span
                    className={`${
                      listKind === v.state
                        ? "font-bold text-blue-600"
                        : "text-gray-400"
                    } text-lg cursor-pointer`}
                    onClick={() => {
                      setListKind(v.state);
                    }}
                  >
                    {v.head}
                  </span>
                );
              })}
            </div>
          </div>
          {listKind === "automatic" ? (
            <div className="flex items-center">
              <SetBusiness /> <span> ~ </span> <SetBusiness />
            </div>
          ) : (
            <ManualSettings />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-8">
            <div className="font-bold text-2xl">학기 식수 신청</div>
            <div className="flex items-end gap-3">
              {kind.map((v) => {
                return (
                  <span
                    className={`${
                      listKind === v.state
                        ? "font-bold text-blue-600"
                        : "text-gray-400"
                    } text-lg cursor-pointer`}
                    onClick={() => {
                      setListKind(v.state);
                    }}
                  >
                    {v.head}
                  </span>
                );
              })}
            </div>
          </div>
          {listKind === "automatic" ? (
            <div className="flex items-center">
              <SetBusiness /> <span> ~ </span> <SetBusiness />
            </div>
          ) : (
            <ManualSettings />
          )}
        </div>
      </div>
    </div>
  );
}

function SetBusiness() {
  // 요일 시간 저장
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  // 요일 옵션
  const days = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];
  // 시간 옵션 생성
  const times = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <div className="px-14 py-4">
      <span>시작일 : </span>
      <select
        className="border-b-2 border-black px-1"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <span className="mx-2">/</span>
      <select
        className="border-b-2 border-black px-1"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}

function ManualSettings() {
  return (
    <div className="flex gap-2 items-center p-4">
      <p className="flex">닫힘 ⇽⇾ 열림</p>
      <label className="relative cursor-pointer items-center">
        <input
          id="switch-3"
          type="checkbox"
          className="peer sr-only"
          onChange={() => {}}
          checked={true}
        />
        <label htmlFor="switch-3" className="hidden"></label>
        <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:after:translate-x-full peer-focus:ring-blue-400"></div>
      </label>
    </div>
  );
}

export default ApplicationSettings;
