import './App.css';
import './styles/utilities.css';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import SampleButton from './components/Button/Sample';
import SampleInput from './components/Input/Sample';
import InputSelectBox from './components/Input/InputSelectBox';
import Header from './components/PcHeader';

function App() {
  return (
    <div className="App">
      <SampleButton className="btn-small-default">버튼</SampleButton>
      <SampleButton className="btn-medium-default">버튼</SampleButton>
      <SampleButton className="btn-large-default">버튼</SampleButton>
      <SampleButton className="btn-pagination-default">1</SampleButton>
      <SampleButton className="btn-text-default">수정</SampleButton>
      <SampleButton className="btn-border-medium">btn이름</SampleButton>

      {/* input-text */}

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
