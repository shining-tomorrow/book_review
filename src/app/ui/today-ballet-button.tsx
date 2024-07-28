"use client";

import confettieLottie from "@/app/public/confetti.json";
import Lottie, {
  AnimationConfigWithData,
  AnimationItem,
  RendererType,
} from "lottie-web";
import React, { useRef, useState } from "react";

const TodayBalletButton = ({ balletDone }: { balletDone: boolean }) => {
  const [lottieAnimationInstance, setLottieAnimationInstance] =
    useState<AnimationItem | null>(null);
  const confettieContainer = useRef(null);

  const className =
    "w-full p-4 bg-red-100 rounded-md m-1 text-gray-500 fond-bold text-xl";
  const handleClick = () => {
    if (lottieAnimationInstance || !confettieContainer.current) {
      return;
    }

    const options: AnimationConfigWithData<RendererType> = {
      loop: 2,
      autoplay: true,
      animationData: confettieLottie,
      container: confettieContainer.current,
      name: "confettie",
    };

    const lottieAnimation = Lottie.loadAnimation(options);

    setLottieAnimationInstance(lottieAnimation);
  };

  return (
    <>
      {!balletDone && (
        <button className={className} onClick={handleClick}>
          오늘 발레하셨나요? 🩰
        </button>
      )}
      {balletDone && <span>오늘 발레 완료 🥳</span>}

      <div
        ref={confettieContainer}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{ pointerEvents: "none" }}
      ></div>
    </>
  );
};

export default TodayBalletButton;
