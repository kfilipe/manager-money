import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import MyProjects from './components/pages/MyProjects';
import Company from './components/pages/Company';
import Projects from './components/pages/Projects'

import Container from './components/layout/Container';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import SingleProject from './components/pages/SingleProject';



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
          <Route path='/projects' element={<Projects />} />
          <Route path='/project/:id' element={<SingleProject />} />

        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  )
}

export default App;

