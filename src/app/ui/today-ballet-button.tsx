"use client";

import confettieLottie from "@/app/public/confetti.json";
import Lottie, {
  AnimationConfigWithData,
  AnimationItem,
  RendererType,
} from "lottie-web";
import { DateTime } from "luxon";
import React, { useRef, useState } from "react";
import { DATE_FORMAT } from "./ballet-record";

const TodayBalletButton = ({
  balletDone,
  onUpdate,
}: {
  balletDone: boolean;
  onUpdate: Function;
}) => {
  const [lottieAnimationInstance, setLottieAnimationInstance] =
    useState<AnimationItem | null>(null);
  const confettieContainer = useRef(null);

  const className = "p-2 bg-red-100 rounded-md text-gray-500 fond-bold text-lg";

  const handleClickComplete = async () => {
    if (lottieAnimationInstance || !confettieContainer.current) {
      return;
    }

    const result = await fetch(`/api/record`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: DateTime.now().toFormat(DATE_FORMAT),
        balletDone: true,
      }),
    });

    onUpdate();

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

  const handleClickCancel = async () => {
    const result = await fetch(`/api/record`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: DateTime.now().toFormat(DATE_FORMAT),
        balletDone: false,
      }),
    });

    onUpdate();
  };

  return (
    <div className="my-3">
      {!balletDone && (
        <button className={className + " w-full"} onClick={handleClickComplete}>
          오늘 발레했나요? 🩰
        </button>
      )}
      {balletDone && (
        <div className="flex items-center justify-center">
          <div
            className={
              className +
              " flex items-center justify-center h-[50px] text-center w-[50%] min-w-fit"
            }
          >
            오늘 발레 완료 🥳
          </div>
          <button
            className="flex items-center justify-center h-[50px] ml-2 rounded border border-slate-400 w-[50px]"
            onClick={handleClickCancel}
          >
            취소
          </button>
        </div>
      )}

      <div
        ref={confettieContainer}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  );
};

export default TodayBalletButton;
