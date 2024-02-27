import FormInput from "../auth/FormInput";
import Editor from "./Editor";
import { ListBtn } from "../master/UserList";
import PostImg from "./PostImg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PostFormValues } from "../../types/post";
import { customAxios } from "../../services/customAxios";
import { useNavigate } from "react-router-dom";

function WritePost() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PostFormValues>();
  const navigate = useNavigate();

  // 공지사항 제출 함수
  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const formData = new FormData();
      if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("tag", data.tag);
      if (data.urgent) {
        formData.append("urgent", String(data.urgent));
      }
      await customAxios.post("/api/admin/notice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
      <div className="flex">
        <div className="font-bold text-3xl mb-10">공지사항 작성</div>
        <div className="flex-1"></div>
        <div className="flex gap-5 h-fit">
          <ListBtn
            value="작성완료"
            color="bg-blue-500"
            type="submit"
            onClick={() => {}}
          />
          <ListBtn
            value="취소"
            color="bg-red-500"
            onClick={() => {
              navigate(-1);
            }}
          />{" "}
        </div>
      </div>
      <FormInput
        type="text"
        name="title"
        label="제목"
        placeholder="제목을 입력해주세요."
        register={register("title", {
          required: "제목을 입력해주세요.",
        })}
        errorMessage={errors?.title && errors.title.message}
      />
      <div className="flex gap-10">
        <div className="w-1/3">
          <label htmlFor="tag" className="block mb-2 text-cyan-600 font-bold">
            태그 선택
          </label>
          <select
            {...register("tag", {
              required: "태그를 선택해주세요.",
            })}
            id="tag"
            className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="admin">행정</option>
            <option value="restaurant">식수</option>
            <option value="salon">미용실</option>
            <option value="bus">버스</option>
          </select>
        </div>
        <div
          className="flex"
          onChange={(e) => {
            console.log(e);
          }}
        >
          <label className="flex items-center mt-3">
            <input
              {...register("urgent")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 text-gray-700">긴급공지</span>
          </label>
        </div>
      </div>
      {errors?.content && (
        <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2">
          {errors.content.message}
        </span>
      )}
      <Controller
        control={control}
        name="content"
        defaultValue=""
        rules={{
          validate: (value) =>
            (value && value.trim() !== "" && value !== "<p><br></p>") ||
            "본문을 입력해주세요.",
        }}
        render={({ field }) => (
          <Editor value={field.value} setValue={field.onChange} />
        )}
      />
      <Controller
        control={control}
        name="images"
        defaultValue={[]}
        render={({ field }) => (
          <PostImg selectedImg={field.value} setSelectedImg={field.onChange} />
        )}
      />
    </form>
  );
}

export default WritePost;
