import './App.css';
import './styles/utilities.css';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import Button from './components/Button/Button';
import SampleInput from './components/Input/Sample';
import InputSelectBox from './components/Input/InputSelectBox';
import Header from './components/PcHeader';

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

      <SampleInput
        placeholder="placeholder"
        type="text"
        className="input-default"
      />

      <SampleInput
        placeholder="placeholder"
        type="text"
        className="border-red-400"
        isError="에러메시지이이"
      />

      <SampleInput
        placeholder="placeholder"
        type="text"
        className="border-blue-500"
        isComp="완료메시지이"
      />
      <InputSelectBox />
      <InputBtn />
      <div className="tab-default">공지</div>
      <div className="pin-default">왈독애견유치원</div>
      <DropDownMenu />
      <Header />
    </div>
  );
}

export default App;
