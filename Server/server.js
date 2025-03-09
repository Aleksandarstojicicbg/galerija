const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Ruta za vraćanje liste slika
app.get("/api/images", (req, res) => {
  const imagesDir = path.join(__dirname, "public", "images");
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Greška pri učitavanju slika" });
    }
    // Filter za samo slike (možeš dodati druge ekstenzije ako je potrebno)
    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/));
    res.json(imageFiles);
  });
});

app.listen(port, () => {
  console.log(`Server je pokrenut na http://localhost:${port}`);
});
