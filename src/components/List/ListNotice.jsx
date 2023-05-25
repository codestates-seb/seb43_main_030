import { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import dateCalculate from '../dateCalculate';
import profile from '../../images/profile.png';

function ListNotice(props) {
  const { post, onClick } = props;
  const [content, setContent] = useState('');

  useEffect(() => {
    // 게시물 미리보기 텍스트
    const regex = /<p>(.*?)<\/p>/gi;
    const matches = post.content.match(regex);
    let extractedText = '';

    if (matches) {
      extractedText = matches
        .map(match => {
          const text = match.replace(/<\/?p>/g, '');
          const textWithoutImg = text.replace(/<img.*?>/, '');
          return textWithoutImg.trim();
        })
        .join(' ');
    }

    setContent(extractedText);
  }, [setContent, post.content]);

  return (
    <div>
      <ul>
        <li className="list-flex w-full">
          <div className="flex w-full flex-col justify-start">
            <p className="list-title h-text-max mb-8 max-h-[30px]">
              {post.title}
            </p>
            {Parser(`
           <p className="list-content h-text-max max-h-[50px] onlyMobile:max-h-[38px] onlyMobile:min-w-180">
          ${content}
          </p>
          `)}

            <span className="list-gray-small mt-16">
              {dateCalculate(post.createdAt)}
            </span>
          </div>
          <div className="user-profile ml-24 h-108 w-108  onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
            {post.imageUrl ? (
              <img src={post.imageUrl} alt="img" />
            ) : (
              <img src={profile} alt="defaultImage" />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
export default ListNotice;
