import { useState } from 'react';
import { ReactComponent as PerpettOff } from '../images/perpett-off.svg';
import { ReactComponent as PerpettOn } from '../images/perpett-on.svg';

function Pin() {
  const [active, setActive] = useState(false);

  function onActive() {
    setActive(!active);
  }

  return (
    <div className="pin-default" onClick={() => onActive()} role="presentation">
      <div className="flex-center">
        <span className="mr-4 min-h-24 min-w-24">
          {active ? <PerpettOn /> : <PerpettOff />}
        </span>
        <span className="text-max max-w-200">왈</span>
      </div>
    </div>
  );
}

export default Pin;
