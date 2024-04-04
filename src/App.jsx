import { useState } from 'react' ;
import Admin from './admin/Admin';
import Login from './login/Login';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  const [loggedIn,setLoggedIn] = useState(false) ;
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={!loggedIn ? <Login setLoggedIn={setLoggedIn}/>: <Admin/>} />
      <Route path="/adminPanel" element={!loggedIn ? <Login setLoggedIn={setLoggedIn}/> : <Admin/>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App ;
