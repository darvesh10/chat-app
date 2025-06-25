import express from 'express';
import "dotenv/config";
import http from 'http';
import cors from 'cors';
import { connect } from 'http2';
import { connectDB } from './config/db.js';

const app = express();
const server = http.createServer(app);

app.use(express.json({limit: '4mb'}));
app.use(cors());

app.use('/api/status',(req,res)=> res.send({status: 'server is running'}));

await connectDB();   

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
