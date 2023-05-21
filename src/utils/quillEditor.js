import React, { useMemo, useCallback, memo, useRef, useState } from 'react';
import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = memo(
  ({ content, setContent, contents, setContents, postId, setImg }) => {
    const quillRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const imageHandler = useCallback(() => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        // setImg(prevImg => [...prevImg, file]);

        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
          const response = await axios.post(
            'https://api.imgbb.com/1/upload',
            uploadData,
            {
              params: {
                key: '8cb7f3bf3855c3503ff3954bf87159bf',
              },
            },
          );

          const imageUrl = response.data.data.url;

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);

          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection(range.index + 1);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
    }, []);

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
              { align: [] },
            ],
            ['image'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      }),
      [imageHandler],
    );

    return (
      <ReactQuill
        style={{ height: '400px' }}
        ref={quillRef}
        value={postId ? contents : content}
        onChange={postId ? setContents : setContent}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    );
  },
);

export default QuillEditor;
