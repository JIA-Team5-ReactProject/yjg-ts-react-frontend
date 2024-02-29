import { useEffect, useState } from "react";
import { SearchType } from "../../../types/post";

function SearchBar(props: SearchType) {
  const { tag, setTag, setSearch } = props;
  const [inputContent, setInputContent] = useState("");

  // tag값 변경 시
  useEffect(() => {
    setInputContent("");
    setSearch("");
  }, [tag]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(inputContent);
      }}
      className="relative flex align-middle text-gray-600 border-2 border-gray-300 rounded-lg pr-8"
    >
      <select
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
        }}
        className="outline-none rounded-l-3xl focus:outline-none font-semibold text-base text-left border-r-2 border-gray-200 p-2"
      >
        <option value="" className="py-2">
          제목
        </option>
        <option value="admin">행정</option>
        <option value="salon">미용실</option>
        <option value="restaurant">식당</option>
        <option value="bus">버스</option>
      </select>

      <input
        className="bg-white pl-2 h-10 w-80 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={inputContent}
        onChange={(e) => {
          setInputContent(e.target.value);
        }}
      />
      <button type="submit" className="absolute top-3 right-2">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
