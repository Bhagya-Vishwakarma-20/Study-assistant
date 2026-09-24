import "dotenv/config"
import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT
const app = express();
app.use(cors())
app.get('/health',(_req,res)=>{
    res.json({
        status:"ok"
    })
})
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});