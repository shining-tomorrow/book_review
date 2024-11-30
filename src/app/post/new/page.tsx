'use client';

import Editor from '@/ui/common/Editor';
import {useState} from 'react';

const Page = () => {
  const [content, setContent] = useState('');

  const handleChangeContent = (e: any) => {
    setContent(e);
  };

  return (
    <div>
      <Editor content={content} setContent={handleChangeContent} />
    </div>
  );
};

export default Page;
