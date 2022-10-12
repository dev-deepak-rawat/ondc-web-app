import React from 'react';
import ActionCable from 'actioncable';
import 'App.css';
import Search from 'features/search/Search';
import { WEB_SOCKET_DOMAIN } from 'app/constants';

const CableApp = {};
CableApp.cable = ActionCable.createConsumer(`${WEB_SOCKET_DOMAIN}/cable`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search cable={CableApp.cable} />
      </header>
    </div>
  );
}

export default App;
