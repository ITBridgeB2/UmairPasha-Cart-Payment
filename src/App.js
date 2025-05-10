import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Homepage';
import LoginPage from './loginpage';
import Categorypage from './categorypage';
import Seedspage from './seedscategory';
import FruitsCategory from './fruitscategory';
import VegetablesCategory from './vegetablescategory';
import PaymentPage from './paymentpage';
import SuccessPage from './successpage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path='/categorypage' element={<Categorypage/>}/>
          <Route path='/seedscategory' element={<Seedspage/>}/>
          <Route path='/fruitscategory'element={<FruitsCategory/>}/>
          <Route path='/vegetablescategory' element={<VegetablesCategory/>}/>
          <Route path='/paymentpage' element={<PaymentPage/>}></Route>
          <Route path='successpage' element={<SuccessPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;

