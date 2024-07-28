import { DateTime } from "luxon";
import React from "react";
import { fetchBalletRecord, fetchUserProfile } from "../lib/data";
import BalletRecord from "../ui/upload/ballet-record";
import { ProfileImage } from "../ui/upload/profile-image";

type UserProfile = {
  nickName: string | null;
  profileImageUrl: string;
  balletStartDate: Date | null;
  balletAcademy: string | null;
  balletSessionsPerWeek: number | null;
};

type BalletRecords = {
  id: string;
  date: Date;
  balletDone: boolean;
  userId: string;
}[];

const DEFAULT_PROFILE_IMAGE_URL =
  "https://p.kakaocdn.net/th/talkp/woKr823m3V/6wf5l3pA5SvFhSAjS53Zt1/rx7k78_110x110_c.jpg";

/**
 * getServerSideProps는 app 디렉토리 구조에서는 지원 안 한다고 함
 * TODO: nickname도 없으면 에러 처리 해야할 듯
 */
export const getData = async (): Promise<{
  userProfile: UserProfile;
  balletRecords: BalletRecords;
}> => {
  const [userProfile, balletRecords] = await Promise.all([
    fetchUserProfile(),
    fetchBalletRecord(),
  ]);

  const {
    nickName = null,
    profileImageUrl = null,
    balletStartDate = null,
    balletAcademy = null,
    balletSessionsPerWeek = null,
  } = userProfile ?? {};

  return {
    userProfile: {
      nickName,
      profileImageUrl: profileImageUrl ?? DEFAULT_PROFILE_IMAGE_URL,
      balletStartDate,
      balletAcademy,
      balletSessionsPerWeek,
    },
    balletRecords,
  };
};

const Page = async () => {
  const { userProfile, balletRecords } = await getData();
  const {
    nickName,
    profileImageUrl,
    balletStartDate,
    balletAcademy,
    balletSessionsPerWeek,
  } = userProfile;

  // Prisma에서 가져온 날짜는 JavaScript Date 객체로 변환되어 있다
  const balletYears = balletStartDate
    ? DateTime.now().diff(DateTime.fromJSDate(balletStartDate), "years").years
    : 0;

  return (
    <div className="flex justify-center">
      <div className="w-[100%] md:w-[75%]">
        <div className="flex flex-row py-8">
          <ProfileImage profileImageUrl={profileImageUrl} />
          <div className="flex px-8 items-center text-xl">{nickName}</div>
        </div>
        <div>
          <div>
            {balletAcademy ? `${balletAcademy} ` : ""}주{" "}
            {balletSessionsPerWeek ?? 0}회
          </div>
          {balletYears > 0 && <div>{Math.ceil(balletYears)}년차</div>}
        </div>
        <BalletRecord records={balletRecords} />
      </div>
    </div>
  );
};

export default Page;
