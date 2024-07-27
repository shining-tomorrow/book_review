import { DateTime } from "luxon";
import React from "react";
import { fetchExerciseRecord, fetchUserProfile } from "../lib/data";
import BalletRecord from "../ui/upload/ballet-record";
import { ProfileImage } from "../ui/upload/profile-image";

const Page = async () => {
  const { nickName, balletStartDate, balletAcademy, balletSessionsPerWeek } =
    await fetchUserProfile();

  // Prisma에서 가져온 날짜는 JavaScript Date 객체로 변환되어 있다
  const balletYears = DateTime.now().diff(
    DateTime.fromJSDate(balletStartDate),
    "years"
  ).years;

  const records = await fetchExerciseRecord();

  return (
    <div className="flex justify-center">
      <div className="w-[100%] md:w-[70%]">
        <div className="flex flex-row py-8">
          <ProfileImage profileImageUrl="https://p.kakaocdn.net/th/talkp/woKr823m3V/6wf5l3pA5SvFhSAjS53Zt1/rx7k78_110x110_c.jpg" />
          <div className="flex px-8 items-center text-xl">{nickName}</div>
        </div>
        <div>
          <div>
            {balletAcademy ? `${balletAcademy} ` : ""}주{" "}
            {balletSessionsPerWeek ?? 0}회
          </div>
          <div>{Math.ceil(balletYears)}년차</div>
        </div>
        <BalletRecord records={records} />
      </div>
    </div>
  );
};

export default Page;
