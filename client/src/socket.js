import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');  // Replace this with your live backend URL in production

export default socket;     

