import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationPage from './page/navigationpage';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './components/Pagenotfound';

const App=()=>{
  return(
    <>
    
    <Routes>
      <Route path='/' Component={NavigationPage}/>
      <Route path='/*' Component={PageNotFound}/>
    </Routes>
    </>
  )
}

export default App;
