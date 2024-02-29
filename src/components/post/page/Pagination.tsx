import { useEffect, useState } from "react";
import { PaginationType } from "../../../types/post";

function Pagination(props: PaginationType) {
  const { page, setPage, lastPage } = props;
  const [pages, setPages] = useState<number[]>([]);

  // 페이지가 변경될 시
  useEffect(() => {
    const fixedValue = Math.floor((page - 0.1) / 8) * 8;
    setPages(Array.from({ length: 8 }, (_, i) => fixedValue + 1 + i));
  }, [page]);

  return (
    <div className="flex items-center justify-center lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-between">
        <div
          className="flex items-center pb-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={() => {
            if (Math.floor((page - 0.1) / 8) === 0) {
              setPage(1);
            } else setPage(Math.floor((page - 0.1) / 8) * 8);
          }}
        >
          <p className="text-sm ml-3 font-medium leading-none ">{`<<`}</p>
        </div>
        <div className="sm:flex hidden">
          {pages.map(
            (i) =>
              i <= lastPage && (
                <p
                  key={i}
                  className={`text-sm font-medium leading-none cursor-pointer pb-3 mr-4 px-2 ${
                    i === page
                      ? "text-indigo-700 border-b border-indigo-400"
                      : null
                  }`}
                  onClick={() => {
                    setPage(i);
                  }}
                >
                  {i}
                </p>
              )
          )}
        </div>
        <div
          className="flex items-center pb-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={() => {
            if (
              Math.floor((page - 0.1) / 8) === Math.floor((lastPage - 0.1) / 8)
            ) {
              setPage(lastPage);
            } else setPage(Math.floor((page - 0.1) / 8) * 8 + 9);
          }}
        >
          <p className="text-sm font-medium leading-none mr-3">{`>>`}</p>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
