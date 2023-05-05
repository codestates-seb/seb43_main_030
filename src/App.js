import './App.css';
import './styles/utilities.css';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import SampleButton from './components/Button/Sample';
import SampleInput from './components/Input/Sample';

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
      <div className="input-array">
        <SampleInput placeholder="placeholder" type="text" />
      </div>

      <div className="input-array">
        <input type="text" className="input-error" placeholder="error 입력" />
        <p className="input-error-text">에러메시지 에러메시지</p>
      </div>

      <div className="input-array">
        <input type="text" className="input-comp" placeholder="comp 입력" />
        <p className="input-comp-text">완료메시지 완료메시지</p>
      </div>
      <InputBtn className="a" />

      <div className="tab-default">공지</div>
      <div className="pin-default">왈독애견유치원</div>
      <DropDownMenu />
    </div>
  );
}

export default App;
