# 발레 커뮤니티 사이트 🩰

## Seed

(1) db reset 후 seed하기
`npx prisma migrate reset`
reset과 seed를 순차적으로 진행해준다. 하지만 변경사항이 db에 반영이 안 돼 있어 seed가 실패하는 경우도 있었다.
이때, `npx prisma db push`를 하고
`npx prisma db seed`를 한다.

(2) 아무리해도 안 된다면 prisma/migrations 폴더를 지우고 1번을 다시 해본다.
깔금하게 seed 되는 경우가 많다!

(2) seed만 할 때
`npx prisma db seed`

## db schema 수정시

npx prisma migrate dev
