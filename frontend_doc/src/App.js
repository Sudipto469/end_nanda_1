// import Header from './components/Header1'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './components/screens/HomeScreen';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import ProductScreen from './components/screens/ProductScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SortScreen from './components/screens/SortScreen'
import HospitalScreen from './components/screens/HospitalScreen'
import DetailHospital from './components/screens/DetailHospital';
import LabScreen from './components/screens/LabScreen';
import DetailLab from './components/screens/DetailLab';
import ClinicScreen from './components/screens/ClinicScreen';
import DetailClinic from './components/screens/DetailClinic';
import UserListScreen from './components/screens/UserListScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import LabListScreen from './components/screens/LabListScreen';
import HospitalListScreen from './components/screens/HospitalListScreen'
import UserEditScreen from './components/screens/UserEditScreen';
// import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import HospitalEditScreen from './components/screens/HospitalEditScreen';
import ClinicListScreen from './components/screens/ClinicListScreen';
import LabEditScreen from './components/screens/LabEditScreen';
// import ClinicEditScreen from './components/screens/ClinicEditScreen';
import ClinicEditScreen from './components/screens/ClinicEditScreen';

// import Test from './components/screens/Test';


function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
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
            <Route path="/hospitals" element={<HospitalScreen/>} />
            <Route path="/hospitals/hospital/:id" element={<DetailHospital/>} />
            <Route path="/labs" element={<LabScreen/>} />
            <Route path="/labs/lab/:id" element={<DetailLab/>} />
            <Route path="/clinics" element={<ClinicScreen/>} />
            <Route path="/admin/userList" element={<UserListScreen/>} />
            <Route path="/admin/productList" element={<ProductListScreen/>} />
            <Route path="/admin/labList" element={<LabListScreen/>} />
            <Route path="/admin/hospitalList" element={<HospitalListScreen/>} />
            <Route path="/admin/clinicList" element={<ClinicListScreen/>} /> 
            
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />

            <Route path="/clinics/clinic/:id" element={<DetailClinic/>} />
            
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
            <Route path="/admin/hospital/:id/edit" element={<HospitalEditScreen/>} />
            <Route path="/admin/lab/:id/edit" element={<LabEditScreen/>} />
            <Route path="/admin/clinic/:id/edit" element={<ClinicEditScreen/>} />

            {/* <Route path="/test" element={<Test/>} /> */}
            {/* DetailLab */}
            
            
            
      </Routes>
      </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
