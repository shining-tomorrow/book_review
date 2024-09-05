'use client';
import Lottie, {AnimationConfigWithData, AnimationItem, RendererType} from 'lottie-web';
import {useRef, useState} from 'react';
import confettieLottie from '../../../public/confetti.json';
import {DATE_FORMAT, RecordState} from './ballet-record';

const BalletDayCheck = ({record, onUpdate}: {record: RecordState; onUpdate: Function}) => {
  const prefix = record.isToday ? '오늘 ' : '';

  const [lottieAnimationInstance, setLottieAnimationInstance] = useState<AnimationItem | null>(null);
  const confettieContainer = useRef(null);

  const className = 'p-2 bg-red-100 rounded-md text-gray-500 fond-bold text-lg';

  const toggleBalletDone = async () => {
    const result = await fetch(`/api/record`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: record.date.toFormat(DATE_FORMAT),
        balletDone: !record.balletDone,
      }),
    });

    onUpdate();
  };

  const handleClick = async () => {
    toggleBalletDone();

    if (record.balletDone) {
      return;
    }

    if (!confettieContainer.current) {
      return;
    }

    if (lottieAnimationInstance) {
      if (lottieAnimationInstance.isPaused) {
        lottieAnimationInstance.goToAndPlay(0, false);
      }
      return;
    }

    const options: AnimationConfigWithData<RendererType> = {
      loop: 2,
      autoplay: true,
      animationData: confettieLottie,
      container: confettieContainer.current,
      name: 'confettie',
    };

    const lottieAnimation = Lottie.loadAnimation(options);

    setLottieAnimationInstance(lottieAnimation);
  };

  return (
    <div className="my-3">
      {record.isToday && !record.balletDone ? (
        <button className={className + ' w-full'} onClick={handleClick}>
          {prefix}발레했나요? 🩰
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <div className={className + ' flex items-center justify-center h-[50px] text-center w-[50%] min-w-fit'}>
            {record.balletDone ? (
              <>
                {prefix}발레 완료 {record.isToday ? '🥳' : '🩰'}
              </>
            ) : (
              <>쉬었어요 😴</>
            )}
          </div>
          <button
            className="flex items-center justify-center h-[50px] ml-2 rounded border border-slate-400 w-[50px]"
            onClick={handleClick}
          >
            수정
          </button>
        </div>
      )}

      <div
        ref={confettieContainer}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{pointerEvents: 'none'}}
      ></div>
    </div>
  );
};

export default BalletDayCheck;
