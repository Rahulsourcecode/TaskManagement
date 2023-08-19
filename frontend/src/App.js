import './App.css';
import Base from './pages/Base';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Base />
    </div>
  );
}

export default App;
