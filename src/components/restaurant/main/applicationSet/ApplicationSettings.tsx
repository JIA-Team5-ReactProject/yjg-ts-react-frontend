import { useEffect, useState } from "react";
import { privateApi } from "../../../../services/customAxios";
import AccountSettings from "./AccountSettings";

function ApplicationSettings() {
  // 주말 리스트종류 스테이트
  const [weekendistKind, setWeekendListKind] = useState<string>("automatic");
  // 학기 리스트 종류 스테이트
  const [semesterKind, setSemesterKind] = useState<string>("automatic");
  // 주말 수동일 때 값
  const [weekendBtn, setWeekBtn] = useState<boolean>(true);
  // 학기 수동일 때 값
  const [semesterBtn, setSemesterBtn] = useState<boolean>(false);
  // 리스트 종류 값
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
  // 주말 식수 input 시간 값
  const weekendInputTimes = {
    firTime: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
    secTime: Array.from(
      { length: 24 },
      (_, i) => `${i.toString().padStart(2, "0")}:00`
    ),
  };
  // 학기 식수 input 시간 값
  const semesterInputTimes = {
    firTime: Array.from(
      { length: 12 },
      (_, i) => `${(i + 1).toString().padStart(2, "0")}월`
    ),
    secTime: Array.from(
      { length: 31 },
      (_, i) => `${(i + 1).toString().padStart(2, "0")}일`
    ),
  };

  // 페이지 렌더링 시
  useEffect(() => {
    getWeekendApply();
  }, []);

  // 주말 식수 신청 상태 가져오기
  const getWeekendApply = async () => {
    try {
      const weekendApply = await privateApi.get(
        "/api/restaurant/apply/state/web/weekend"
      );
      console.log(weekendApply);
      if ("manual" in weekendApply.data) {
        // data 값이 수동일 때 값 저장
        setWeekendListKind("manual");
        if (weekendApply.data.manual.state) {
          setWeekBtn(true);
        } else {
          setWeekBtn(false);
        }
      } else if ("auto" in weekendApply.data) {
        // data 값이 자동일 때 값 저장
        setWeekendListKind("automatic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="font-bold text-lg pl-4 pb-2">• 식수 신청 설정</div>
      <div className="bg-white flex w-[800px] flex-col gap-4 shadow-lg px-10 py-5 border border-black/10 rounded-xl">
        <div className="flex flex-col">
          <div className="flex gap-8">
            <div className="font-bold text-2xl">주말 식수 신청</div>
            <div className="flex items-end gap-3">
              {kind.map((v) => {
                return (
                  <span
                    className={`${
                      weekendistKind === v.state
                        ? "font-bold text-blue-600"
                        : "text-gray-400"
                    } text-lg cursor-pointer`}
                    onClick={() => {
                      setWeekendListKind(v.state);
                    }}
                  >
                    {v.head}
                  </span>
                );
              })}
            </div>
          </div>
          {weekendistKind === "automatic" ? (
            <div className="flex items-center">
              <SetBusiness times={weekendInputTimes} /> <span> ~ </span>{" "}
              <SetBusiness times={weekendInputTimes} />
            </div>
          ) : (
            <ManualSettings
              kind="weekend"
              btnState={weekendBtn}
              setBtnState={setWeekBtn}
            />
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
                      semesterKind === v.state
                        ? "font-bold text-blue-600"
                        : "text-gray-400"
                    } text-lg cursor-pointer`}
                    onClick={() => {
                      setSemesterKind(v.state);
                    }}
                  >
                    {v.head}
                  </span>
                );
              })}
            </div>
          </div>
          {semesterKind === "automatic" ? (
            <div className="flex items-center">
              <SetBusiness times={semesterInputTimes} /> <span> ~ </span>{" "}
              <SetBusiness times={semesterInputTimes} />
            </div>
          ) : (
            <ManualSettings
              kind="semester"
              btnState={semesterBtn}
              setBtnState={setSemesterBtn}
            />
          )}
        </div>
        <AccountSettings />
      </div>
    </div>
  );
}

export default ApplicationSettings;

function SetBusiness(props: {
  times: { firTime: string[]; secTime: string[] };
}) {
  const { times } = props;
  // 요일 시간 저장
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  // 요일 옵션

  return (
    <div className="px-10 py-4">
      <select
        className="border-b-2 border-black px-1"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        {times.firTime.map((day) => (
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
        {times.secTime.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}

function ManualSettings(props: {
  kind: string;
  btnState: boolean;
  setBtnState: (btnState: boolean) => void;
}) {
  const { kind, btnState, setBtnState } = props;

  // 수동 영업시간 패치
  const patchApplyManual = async (state: boolean) => {
    try {
      await privateApi.patch("/api/restaurant/apply/manual/set", {
        division: kind,
        state: state,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 items-center px-10 py-4">
      <p className="flex">닫힘 ⇽⇾ 열림</p>
      <label className="relative cursor-pointer items-center">
        <input
          id="switch-3"
          type="checkbox"
          className="peer sr-only"
          onChange={() => {
            patchApplyManual(!btnState);
            setBtnState(!btnState);
          }}
          checked={btnState}
        />
        <label htmlFor="switch-3" className="hidden"></label>
        <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:after:translate-x-full peer-focus:ring-blue-400"></div>
      </label>
    </div>
  );
}
