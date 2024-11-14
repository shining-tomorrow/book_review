'use client';

import {FormEventHandler, useCallback} from 'react';

const RegisterForm = () => {
  const validateStringField = useCallback(
    (value: FormDataEntryValue | null): value is string => typeof value === 'string' && !!value.trim(),
    [],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const passwordConfirm = formData.get('passwordConfirm');
      const nickname = formData.get('nickname');

      if (
        !validateStringField(email) ||
        !validateStringField(password) ||
        !validateStringField(passwordConfirm) ||
        !validateStringField(nickname)
      ) {
        return alert('입력하지 않은 값이 있습니다.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return alert('이메일 형식이 올바르지 않습니다.');
      }

      if (password !== passwordConfirm) {
        return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      }

      // TODO: 닉네임 중복 확인

      console.log('회원가입 성공');
    },
    [validateStringField],
  );

  return (
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <input name="email" placeholder="이메일" />
      <input name="password" placeholder="비밀번호" />
      <input name="passwordConfirm" placeholder="비밀번호 확인" />
      <div>
        <input name="nickname" placeholder="닉네임" />
        <button type="button">중복확인</button>
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default RegisterForm;
