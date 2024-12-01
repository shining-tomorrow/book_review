'use client';

import dynamic from 'next/dynamic';
import {Dispatch, SetStateAction} from 'react';
import 'react-quill/dist/quill.snow.css';
import {NavBarHeight, isSmallScreenSize} from '../../../const';

const toolbarHeight = 44;
const titleYMargin = 16;

/**
 * 빌드시 client component도 prerender 하려다가 에러난다
 * dynamic import로 해결하자
 */
const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

/**
 * react-quill github:
 * https://github.com/zenoamaro/react-quill
 *
 * 참고:https://cwdeveloper.tistory.com/62
 * https://zindex.tistory.com/362
 *
 * TODO: image handler 추가하기
 */

const Editor = ({content, setContent}: {content: string; setContent: Dispatch<SetStateAction<string>>}) => {
  const HeaderHeight = window && isSmallScreenSize() ? 48 : 56;

  const editorContentHeight = window.innerHeight - HeaderHeight - NavBarHeight - toolbarHeight - titleYMargin;
  const modules = {
    toolbar: [
      [{header: [1, 2, 3, 4, 5, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <QuillNoSSRWrapper
      theme="snow"
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      style={{height: editorContentHeight}}
    />
  );
};

export default Editor;
