import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomeView } from './features/home';
import { MuseumView, ExhibitionDetailView } from './features/museum';
import { BlogView, BlogDetailView } from './features/blog';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/museo" element={<MuseumView />} />
            <Route path="/museo/:id" element={<ExhibitionDetailView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/blog/:id" element={<BlogDetailView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
