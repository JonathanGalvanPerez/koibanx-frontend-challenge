import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import TableContainer from './containers/TableContainer';

function App() {
  return (<>
    <Box pb={4}>
      <Heading as="h1" textAlign="center" my={5} >Datos de Comercios</Heading>
      <Divider />
      <TableContainer />
    </Box>
  </>);
}

export default App;
