const express = require('express')
const crypto = require('crypto');

//Variables
const app = express();
const port = 5005;

//settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({ status: true, message: "Hay conexion" })
})

app.post('/mascaracteres', (req, res) => {
  try {
    const cadena1 = req.body.cadena1;
    const cadena2 = req.body.cadena2;
    if (cadena1.length > cadena2.length) {
      return res.status(200).json({ status: true, result: cadena1, error: "" });
    } else if (cadena2.length > cadena1.length) {
      return res.status(200).json({ status: true, result: cadena2, error: "" });
    } else {
      return res.status(200).json({ status: true, result: cadena1, error: "" });
    }
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/menoscaracteres', (req, res) => {
  try {
    const cadena1 = req.body.cadena1;
    const cadena2 = req.body.cadena2;
    if (cadena1.length < cadena2.length) {
      return res.status(200).json({ status: true, result: cadena1, error: "" });
    } else if (cadena2.length < cadena1.length) {
      return res.status(200).json({ status: true, result: cadena2, error: "" });
    } else {
      return res.status(200).json({ status: true, result: cadena1, error: "" });
    }
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/numcaracteres', (req, res) => {
  try {
    const cadena = req.body.cadena;
    return res.status(200).json({ status: true, result: cadena.length, error: "" });
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/palindroma', (req, res) => {
  try {
    let cadena = req.body.cadena;
    // Eliminar espacios y convertir la cadena a minúsculas para hacer la comparación
    cadena = cadena.toLowerCase().replace(/\s/g, '');

    // Invertir la cadena
    const cadenaInvertida = cadena.split('').reverse().join('');

    // Comparar la cadena original con la cadena invertida
    return res.status(200).json({ status: true, result: (cadena === cadenaInvertida), error: "" });
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/concat', (req, res) => {
  try {
    const cadena1 = req.body.cadena1;
    const cadena2 = req.body.cadena2;

    return res.status(200).json({ status: true, result: (cadena1 + cadena2), error: "" });
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/applysha256', (req, res) => {
  try {
    const cadena = req.body.cadena;
    // Crear un objeto hash
    const sha256Hash = crypto.createHash('sha256');

    // Actualizar el objeto hash con la cadena
    sha256Hash.update(cadena);

    // Calcular el hash
    const hash = sha256Hash.digest('hex');

    return res.status(200).json({ status: true, result: { original: cadena, encriptada: hash }, error: "" });
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.post('/verifysha256', (req, res) => {
  try {
    const cadena = req.body.cadena;
    const hash = req.body.hash;
    // Crear un objeto hash
    const sha256Hash = crypto.createHash('sha256');

    // Actualizar el objeto hash con la cadena
    sha256Hash.update(cadena);

    // Calcular el hash
    const hashOriginal = sha256Hash.digest('hex');

    return res.status(200).json({ status: true, result: (hash === hashOriginal), error: "" });
  }
  catch (err) {
    return res.status(400).json({ status: false, result: "", error: `Ocurrió un error: ${err}` });
  }
})

app.listen(port, () => console.log(`App running on http://localhost:${port}`))