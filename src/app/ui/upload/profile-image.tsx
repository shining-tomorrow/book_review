import React from "react";

export const ProfileImage = ({
  profileImageUrl,
}: {
  profileImageUrl: string;
}) => {
  return (
    <div className="w-[80px]">
      <svg
        className="thumb_profile"
        viewBox="0 0 100 100"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="maskingShape">
            <path
              d="M0 50C0 13 13 0 50 0s50 13 50 50-13 50-50 50S0 87 0 50"
              fill="111111"
            ></path>
          </clipPath>
        </defs>
        <image
          width="100%"
          height="100%"
          clip-path="url(#maskingShape)"
          href={profileImageUrl}
        ></image>
      </svg>
    </div>
  );
};
