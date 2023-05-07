import './App.css';
import './styles/utilities.css';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import InputError from './components/Input/InputError';
import InputSelectBox from './components/Input/InputSelectBox';
import InputCheck from './components/Input/InputCheck';
import InputRadio from './components/Input/InputRadio';
import Header from './components/PcHeader';
import TextArea from './components/TextArea';
import UploadImage from './components/UploadImage';
import RatingStar from './components/RatingStar';

function App() {
  return (
    <div className="App">
      <Button className="btn-size-s color-yellow ">버튼</Button>
      <Button className="btn-size-m color-yellow">버튼</Button>
      <Button className="btn-size-l color-yellow">버튼</Button>
      <Button className="btn-pagination-default">1</Button>
      <Button className="btn-text-default">수정</Button>
      <Button className="btn-size-m border-gray">btn이름</Button>
      <Button className="btn-size-m border-yellow">btn이름</Button>
      <Button className="btn-icon color-yellow" icon="search" />
      {/* ToDo : 지도 아이콘 사이즈 작게 수정 필요 */}
      <Button className="btn-size-m color-yellow" icon="map">
        btn이름
      </Button>
      <Button className="btn-size-l color-yellow" icon="map">
        btn이름
      </Button>

      {/* <Input placeholder="placeholder" type="text" className="input-default" /> */}
      <InputError
        type="text"
        placeholder="placeholder"
        isError="내용을 입력해주세요."
        className="input-default"
      />

      <Input
        placeholder="placeholder"
        type="text"
        className="border-blue-500"
        isComp="완료메시지이"
      />

      <InputError
        type="text"
        placeholder="이메일 주소를 입력해주세요."
        isError="이메일 주소를 입력해주세요."
        labelText="이메일"
        className="input-default"
      />
      <InputSelectBox />
      <InputBtn />
      <div className="tab-default">공지</div>
      <div className="pin-default">왈독애견유치원</div>
      <DropDownMenu />
      <Header />
      <TextArea
        placeholder="placeholder"
        maxLength={200}
        className="h-130 w-328"
      />
      <UploadImage className="upload-image h-64 w-64" />
      <InputCheck type="checkbox" />
      <InputRadio type="radio" className="h-20 w-20" />
      <RatingStar />
    </div>
  );
}

export default App;
