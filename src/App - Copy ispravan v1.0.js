import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Gallery = ({ selectedImages, setSelectedImages }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/images")
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error("Greška pri učitavanju slika:", error));
  }, []);

  // Funkcija za selektovanje slika
  const handleImageClick = (image) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        // Ako je slika već selektovana, ukloni je
        return prevSelectedImages.filter(img => img !== image);
      }
      // Ako nije selektovana, dodaj je
      return [...prevSelectedImages, image];
    });
  };

  return (
    <div className="gallery-container">
      <h1 className="title">Odaberite fotografije</h1>
      <div className="grid">
        {images.map((image) => (
          <div key={image} className="image-container" onClick={() => handleImageClick(image)}>
            <img
              src={`http://localhost:3001/images/${image}`}
              alt={image}
              className={`image ${selectedImages.includes(image) ? "selected" : ""}`}  // Obeleži selektovane slike
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/form" className="button bg-blue full-width">
          Dalje
        </Link>
      </div>
    </div>
  );
};

const Form = ({ name, setName }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="heading">Unesite ime i prezime</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        placeholder="Ime i prezime"
      />
      <button onClick={() => navigate("/checkout")} className="button bg-green mt-4 full-width">
        Dalje
      </button>
    </div>
  );
};

const Checkout = ({ selectedImages, name }) => {
  const total = selectedImages.length * 2;  // Pretpostavljamo da je cena 2 EUR po slici

  return (
    <div className="container">
      <h1 className="heading">Korpa</h1>
      <p>Ime: {name}</p>
      <p>Broj slika: {selectedImages.length}</p>
      <p>Ukupna cena: {total} EUR</p>
      <div className="mt-4">
        <Link to="/confirmation" className="button bg-gray mb-2">
          Plati gotovinom
        </Link>
        <button className="button bg-yellow full-width">Plati PayPal-om</button>
      </div>
    </div>
  );
};

const Confirmation = () => (
  <div className="container text-center">
    <h1 className="heading">Porudžbina prosleđena!</h1>
    <p>Dođite do pulta za 30 minuta.</p>
  </div>
);

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);  // Slikama u korpi
  const [name, setName] = useState("");  // Ime kupca

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Gallery selectedImages={selectedImages} setSelectedImages={setSelectedImages} />}
        />
        <Route path="/form" element={<Form name={name} setName={setName} />} />
        <Route path="/checkout" element={<Checkout selectedImages={selectedImages} name={name} />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
