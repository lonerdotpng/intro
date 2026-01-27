import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// (for images, CSS, JS)
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('index', { title: 'portfolio' });
});

app.get('/:slug', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`local app listening on port ${port}`);
});
