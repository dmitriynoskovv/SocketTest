import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { io } from 'socket.io-client';
import { NewCarousel } from './carusel';

const socket = io('ws://localhost:5000');

function App() {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [text, setText] = React.useState('');
  const [connected, setConnected] = React.useState(false);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    socket.on('connection', () => {
      setConnected(true);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    return () => {
      socket.off('connection');
      socket.off('disconnect');
      socket.off('loginIn');
      socket.off('connect');
      socket.off('messages');
    };
  }, []);

  socket.on('loginIn', () => {
    console.log('connect');
    setConnected(true);
  });

  const login = () => {
    socket.emit('login', username);
  };

  const sendMessage = () => {
    const message = {
      username,
      message: text,
      id: Date.now(),
      event: 'message',
    };
    socket.emit('message', JSON.stringify(message));
    setText('');
    socket.on('messages', (messagesList) => {
      setMessages((messages: any) => [...messages, JSON.parse(messagesList)]);
    });
  };

  // if (!connected) {
  //   return (
  //     <Box>
  //       <Box>
  //         <TextField
  //           value={username}
  //           placeholder="name"
  //           onChange={(e) => setUsername(e.target.value)}
  //           type="text"
  //         />
  //         <Button onClick={login}>login</Button>
  //       </Box>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Box>
        {messages.map((message) => (
          <Box key={message.id}>
            {/*{message.event === 'connection' ? (*/}
            {/*  <Box>*/}
            {/*    <Typography>User {message.username} connected</Typography>*/}
            {/*  </Box>*/}
            {/* ) : (*/}
            <Box>
              <Typography>
                {message.username}. {message.message}
              </Typography>
            </Box>
            {/*)}*/}
          </Box>
        ))}
      </Box>
      <Box>
        <TextField value={text} onChange={(e) => setText(e.target.value)} />
        {/*<Button onClick={sendMessage}>Sand</Button>*/}
      </Box>
      <Box>
        <NewCarousel />
      </Box>
    </Box>
  );
}

export default App;
