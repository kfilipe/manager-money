import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import MyProjects from './components/pages/MyProjects';
import Company from './components/pages/Company';

import Container from './components/layout/Container';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Container customClass="min-height">
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/myprojects' element={<MyProjects />} />

        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

