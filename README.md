# 발레 커뮤니티 사이트 🩰

## package manager

yarn을 사용한다

## 파일의 위치

(1) 컴포넌트\
src/app 폴더 하위에는 route에 필요한 파일만 넣는다.\
ui 컴포넌트는 src/ui 폴더 하위에 넣는다.\
루트에 쓰이거나 여러 군데서 쓰인다면 바로 넣어도 되지만,\
특정 페이지에서만 쓰인다면 src/ui/{page명} 폴더를 만들고 그 하위에 위치시킨다.

(2) db 코드

src/db 폴더 하위에 테이블별로 폴더를 만든다.

## Seed

(1) db reset 후 seed하기\
`npx prisma migrate reset`\
reset과 seed를 순차적으로 진행해준다.

❗️ 변경사항이 db에 반영 안 돼 있어 seed가 실패하는 경우도 있다.\
이때는, `npx prisma db push`를 하고
`npx prisma db seed`를 한다.

(2) schema.prisma 파일에 문제가 없는 것 같다면,\
prisma/migrations 폴더를 지우고 1번을 다시 해본다.\
seed가 깔끔하게 성공할 수 있다!

(2) seed만 할 때
`npx prisma db seed`

## db schema 수정시

npx prisma migrate dev
