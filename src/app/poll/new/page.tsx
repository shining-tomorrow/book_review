'use client';

const Page = () => {
  return (
    <form className="flex flex-col items-center justify-center w-[85%] md:w-[50%] mt-[10px]">
      <label htmlFor="title">
        <input className="w-full" type="text" id="title" name="title" placeholder="투표 제목을 입력해주세요."></input>
      </label>

      <label>
        <textarea className="w-full" name="description"></textarea>
      </label>
    </form>
  );
};

export default Page;
