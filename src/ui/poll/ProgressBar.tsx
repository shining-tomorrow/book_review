/**
 * progress bar transition 애니메이션을 주기 위해 useState 사용
 */
'use client';

import {useEffect, useState} from 'react';

const ProgressBar = ({percentage}: {percentage: number}) => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  useEffect(() => {
    setProgressBarWidth(percentage);
  }, [percentage]);

  return (
    <div className="w-[200px]">
      <div className="w-full h-[20px] rounded-[10px] bg-[#e6e6e6] mb-[10px]">
        <div
          className="h-full rounded-[10px] bg-[#2ecc71] transition-[width] duration-500 ease-out"
          style={{width: progressBarWidth + '%', transition: 'width 0.5s ease-out'}}
        ></div>
      </div>
      <div className="progress-label"></div>
    </div>
  );
};

export default ProgressBar;
