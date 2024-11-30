'use client';
import {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {NavBarHeight, isSmallScreenSize} from '../../../const';

const toolbarHeight = 44;

/**
 * react-quill github:
 * https://github.com/zenoamaro/react-quill
 */
const Editor = () => {
  const [content, setContent] = useState('');

  const HeaderHeight = isSmallScreenSize() ? 48 : 56;
  const editorContentHeight = window.innerHeight - HeaderHeight - NavBarHeight - toolbarHeight;
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
    <ReactQuill
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
