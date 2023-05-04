import './App.css';
import './styles/utilities.css';

function App() {
  return (
    <div className="App">
      <button className="btn-small-default bg-yellow-800" type="button">
        버튼
      </button>
      <button className="btn-small-disabled" type="button">
        버튼
      </button>
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
    </div>
  );
}

export default App;
