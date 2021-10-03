import './Components/SignIn';
import './App.css'
import SignIn from './Components/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeadBar from './Components/HeadBar';

function App() {
  return (
    <div className="App">
      <HeadBar/>
      <SignIn/>
    </div>
  );
}

export default App;
