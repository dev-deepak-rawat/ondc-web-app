import { BrowserRouter as Router } from 'react-router-dom';
import ActionCable from 'actioncable';
import 'App.css';
import { WEB_SOCKET_DOMAIN } from 'app/constants';
import AppRoutes from 'features/navigations/AppRoutes';
import Connection from 'features/webSockets/Connection';

const CableApp = {};
CableApp.cable = ActionCable.createConsumer(`${WEB_SOCKET_DOMAIN}/cable`);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppRoutes />
        </header>
      </div>
      <Connection cable={CableApp.cable} />
    </Router>
  );
}

export default App;
