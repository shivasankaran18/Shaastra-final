import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/Landingpage'
import { ThemeProvider } from './components/ThemeProvider'

function App() {

  return (
     <ThemeProvider>
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />}></Route>



        </Routes>



     </BrowserRouter>
     </ThemeProvider>
  )
}

export default App
