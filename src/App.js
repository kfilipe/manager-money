import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Company from './components/pages/Company';
import Container from './components/layout/Container';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/Company">Empresa</Link>
        <Link to="/newProject">Novo Projeto</Link>
      </div>

      <Container customClass="min-height">
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newProject' element={<NewProject />} />

        </Routes>
      </Container>

      <p>Footer</p>
    </BrowserRouter>
  );
}

export default App;

