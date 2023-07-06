import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Logo } from '../images/logo-txt.svg';
import { ReactComponent as BtnFigma } from '../images/figma.svg';
import { ReactComponent as BtnGit } from '../images/github.svg';

function Footer() {
  const idle = ['김미리', '김지은', '문혜린', '김태진', '박기훈', '정승현'];

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const footer = () => {
    return (
      <>
        <div className="relative z-10 flex items-center justify-between">
          <Logo />
          <div className="flex gap-6">
            <a
              href="https://www.figma.com/file/PFOgIanoWAdQqqgtEtRWUM/%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC-%EC%9C%A0%EC%B9%98%EC%9B%90-%EA%B8%B0%ED%9A%8D-%EB%B0%8F-%EB%94%94%EC%9E%90%EC%9D%B8?type=design&node-id=116-10869&t=JSHmaC3P0wWr2fkX-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BtnFigma />
            </a>
            <a
              href="https://github.com/codestates-seb/seb43_main_030"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BtnGit />
            </a>
          </div>
        </div>
        <div className="mt-16 w-[90%] text-12 text-black-350">
          <p>
            상호명: 퍼펫트 대표: 김아이들 | 사업자번호: 123-45-67890 |
            통신판매업신고번호: 2023-멍더월드-12345 | <br />
            대표번호: 1234-5678 | 주소: 서울특별시 강남구 아이들동 아이들로 123,
            1층 101호 | <br />
            문의: idle@perpett.com | 운영시간: 평일 09:00 - 18:00 (공휴일 휴무)
          </p>
          {!isMobile && (
            <div className="mt-32">
              <span className="mr-32">©Perpett by Idle Company</span>
              {idle.map(idx => {
                return <span className="mr-32">{idx}</span>;
              })}
            </div>
          )}
          {isMobile && (
            <div className="mt-32 flex flex-col">
              <p className="mb-8">©Perpett by Idle Company</p>
              <div>
                {idle.map(idx => {
                  return <span className="mr-32">{idx}</span>;
                })}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex-center mt-48 w-full bg-black-025">
      {!isMobile && (
        <div className="relative flex w-[100%] max-w-[1440px] flex-col px-80 py-60">
          {footer()}
        </div>
      )}
      {isMobile && (
        <div className="relative flex w-[100%] flex-col px-24 py-60">
          {footer()}
        </div>
      )}
    </div>
  );
}

export default Footer;
