import {OptionItem, PostPollOptionRequest} from '@/db/poll';
import {FormEvent} from 'react';

const PollView = ({id, options}: {id: string; options: OptionItem[]}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const requestBody: PostPollOptionRequest = {
      pollId: id,
      selectedOptionIds: Array.from(formData.entries()).map(([key]) => key),
    };

    fetch('/api/poll/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then(res => {
      if (res.ok) {
        alert('투표 완료');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="ml-[auto] mr-[auto] mt-[30px]">
        {options.map(option => {
          return (
            <div key={option.id}>
              <input type="checkbox" id={option.id} name={option.id} value={option.id}></input>
              <label htmlFor={option.id} className="ml-[5px]">
                {option.content}
              </label>
            </div>
          );
        })}

        <button
          className="flex justify-center items-center h-[45px] w-full md:w-[330px] mt-[30px] rounded-[15px] border-[1px] border-lineColor my-[10px] cursor-pointer md:hover:scale-90 md:hover:bg-gray-100"
          type="submit"
        >
          투표 완료
        </button>
      </div>
    </form>
  );
};

export default PollView;
