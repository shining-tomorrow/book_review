import {fetchUserProfile} from '@/db/user';
import BalletRecord from '@/ui/profile/ballet-record';
import {ProfileImage} from '@/ui/profile/profile-image';
import {DateTime} from 'luxon';

type UserProfile = {
  nickname: string | null;
  profileImageUrl: string;
  balletStartDate: Date | null;
  balletAcademy: string | null;
  balletSessionsPerWeek: number | null;
};

const DEFAULT_PROFILE_IMAGE_URL =
  'https://p.kakaocdn.net/th/talkp/woKr823m3V/6wf5l3pA5SvFhSAjS53Zt1/rx7k78_110x110_c.jpg';

/**
 * getServerSideProps는 app 디렉토리 구조에서는 지원 안 한다고 함
 * TODO: nickname도 없으면 에러 처리 해야할 듯
 */
const getData = async (): Promise<{
  userProfile: UserProfile;
}> => {
  const {
    nickname = null,
    profile_image_url = null,
    ballet_start_date = null,
    ballet_academy = null,
    ballet_sessions_per_week = null,
  } = (await fetchUserProfile()) ?? {};

  return {
    userProfile: {
      nickname,
      profileImageUrl: profile_image_url ?? DEFAULT_PROFILE_IMAGE_URL,
      balletStartDate: ballet_start_date,
      balletAcademy: ballet_academy,
      balletSessionsPerWeek: ballet_sessions_per_week,
    },
  };
};

const Page = async () => {
  const {
    userProfile: {nickname, profileImageUrl, balletStartDate, balletAcademy, balletSessionsPerWeek},
  } = await getData();

  // Prisma에서 가져온 날짜는 JavaScript Date 객체로 변환되어 있다
  const balletYears = balletStartDate ? DateTime.now().diff(DateTime.fromJSDate(balletStartDate), 'years').years : 0;

  return (
    <div className="flex justify-center">
      <div className="w-[100%] md:w-[75%]">
        <div className="flex flex-row py-8">
          <ProfileImage profileImageUrl={profileImageUrl} />
          <div className="flex px-8 items-center text-xl">{nickname}</div>
        </div>
        <div>
          <div>
            {balletAcademy ? `${balletAcademy} ` : ''}주 {balletSessionsPerWeek ?? 0}회
          </div>
          {balletYears > 0 && <div>{Math.ceil(balletYears)}년차</div>}
        </div>
        <BalletRecord />
      </div>
    </div>
  );
};

export default Page;
