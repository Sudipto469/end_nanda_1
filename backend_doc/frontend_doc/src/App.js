import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './components/screens/HomeScreen';
import {HashRouter as BrowserRouter , Routes, Route} from 'react-router-dom'
import ProductScreen from './components/screens/ProductScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SortScreen from './components/screens/SortScreen'


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
      <Container >
      <Routes>
            <Route path="/" element={<HomeScreen/>} exact />
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/product/:id" element={<ProductScreen/>} />
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/sort" element={<SortScreen/>}/>
            <Route path="/sort/product/:id" element={<ProductScreen/>} />
            
      </Routes>
      </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
