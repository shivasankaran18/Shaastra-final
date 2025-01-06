import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/Landingpage'
import { ThemeProvider } from './components/ThemeProvider'
import { LoginPage } from "./pages/login"
import { AccountPage } from "./pages/Signup"
import {CreditScorePage} from "./pages/home"
import { OTPVerification } from './pages/OTPVerification'
function App() {

  return (
     <ThemeProvider>
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/signup' element={<AccountPage />}></Route>
              <Route path='/home' element={<CreditScorePage/>}></Route>
              <Route path="/verifyotp" element={<OTPVerification />}></Route>

        </Routes>



     </BrowserRouter>
     </ThemeProvider>
  )
}

export default App
