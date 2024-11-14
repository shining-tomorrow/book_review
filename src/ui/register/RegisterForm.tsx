'use client';

import {isEmailExist, isNicknameExist} from '@/db/user';
import {FormEventHandler, useCallback, useState} from 'react';

interface Form {
  email: ReturnType<typeof FormData.prototype.get>;
  password: ReturnType<typeof FormData.prototype.get>;
  passwordConfirm: ReturnType<typeof FormData.prototype.get>;
  nickname: ReturnType<typeof FormData.prototype.get>;
}

interface ValidForm {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStringField = useCallback(
    (value: ReturnType<typeof FormData.prototype.get>): value is string => typeof value === 'string' && !!value.trim(),
    [],
  );

  const validateForm = useCallback(
    async (form: Form) => {
      const {email, password, passwordConfirm, nickname} = form;

      if (
        !validateStringField(email) ||
        !validateStringField(password) ||
        !validateStringField(passwordConfirm) ||
        !validateStringField(nickname)
      ) {
        return '입력하지 않은 값이 있습니다.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return '이메일 형식이 올바르지 않습니다.';
      }

      if (password.length < 8) {
        return '비밀번호는 8자 이상이어야 합니다.';
      }

      if (password !== passwordConfirm) {
        return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      }

      if (await isEmailExist(email)) {
        return '이미 가입된 이메일입니다.';
      }

      if (await isNicknameExist(nickname)) {
        return '이미 사용중인 닉네임입니다.';
      }

      return null;
    },
    [validateStringField],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async e => {
      e.preventDefault();

      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const passwordConfirm = formData.get('passwordConfirm');
      const nickname = formData.get('nickname');
      const formError = await validateForm({email, password, passwordConfirm, nickname});

      if (formError) {
        alert(formError);
        setIsSubmitting(false);

        return;
      }

      console.log('회원가입 성공');
      setIsSubmitting(false);
    },
    [validateForm, isSubmitting],
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
