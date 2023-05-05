import './App.css';
import './styles/utilities.css';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import SampleButton from './components/Button/Sample';

function App() {
  return (
    <div className="App">
      <SampleButton className="flex h-32 items-center justify-center rounded-md  bg-yellow-800 p-8 text-14">
        버튼
      </SampleButton>
      <SampleButton className="btn-small-default bg-yellow-800">
        버튼
      </SampleButton>
      <SampleButton className="btn-small-default bg-yellow-800">
        버튼
      </SampleButton>
      <button className="btn-small-default bg-yellow-800" type="button">
        버튼
      </button>
      <SampleButton className="flex h-32  items-center justify-center rounded-md bg-yellow-200 p-8 text-14 text-white">
        버튼
      </SampleButton>
      <button className="btn-medium-default" type="button">
        버튼
      </button>
      <button className="btn-medium-disabled" type="button">
        버튼
      </button>
      <button className="btn-large-default" type="button">
        버튼
      </button>
      <button className="btn-pagination-default" type="button">
        1
      </button>
      <button className="btn-text-default" type="button">
        수정
      </button>
      <button className="btn-text-disabled" type="button">
        수정
      </button>

      <button className="btn-border-medium" type="button">
        btn이름
      </button>
      <button className="btn-border-disabled" type="button">
        btn이름
      </button>

      {/* input-text */}
      <div className="input-array">
        <input type="text" className="input-default" placeholder="안녕하세요" />
      </div>

      <div className="input-array">
        <input type="text" className="input-error" placeholder="error 입력" />
        <p className="input-error-text">에러메시지 에러메시지</p>
      </div>

      <div className="input-array">
        <input type="text" className="input-comp" placeholder="comp 입력" />
        <p className="input-comp-text">완료메시지 완료메시지</p>
      </div>
      <InputBtn />
      <div className="tab-default">공지</div>
      <div className="pin-default">왈독애견유치원</div>
      <DropDownMenu />
    </div>
  );
}

export default App;
