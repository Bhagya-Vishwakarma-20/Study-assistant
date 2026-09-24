import 'dotenv/config';
import app from './app';
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});