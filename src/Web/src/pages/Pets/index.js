import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ButtonFab from '../../components/ButtonFab/ButtonFab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    field: 'nomePet',
    headerName: 'Nome do Pet',
    width: 150,
    editable: false,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 150,
    editable: false,
    valueGetter: ({ value }) => ["Cachorro", "Gato"][value],
  },
  {
    field: 'raca',
    headerName: 'Raça',
    width: 150,
    editable: false,
  },
  {
    field: 'sexo',
    headerName: 'Sexo',
    width: 150,
    editable: false,
    valueGetter: ({ value }) => ["Fêmea", "Macho"][value],
  },
  {
    field: 'peso',
    headerName: 'Peso',
    type: 'number',
    width: 150,
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'dataRegistro',
    headerName: 'Data do Registro',
    width: 150,
    editable: false,
    align: 'center',
    headerAlign: 'center',
    valueGetter: ({ value }) => new Date().toLocaleDateString()
  },
];

export default function Pets() {

  const [rows, setRows] = useState([]);


  useEffect(() => {
      axios
        .get(`https://localhost:7110/api/Pets`)
        .then((res) => setRows(res.data))
        .catch((err) => console.error(err));
  }, []);


  const history = useHistory();

  return (
    <div className="pets-container">
      <h1 style={{ marginLeft: 110, padding: 10, fontWeight: 'bold' }}>
        Pets Cadastrados
      </h1>
      <Box style={{ height: 470, width: '85%', marginLeft: '110px' }}>
        <DataGrid
          rows={rows} // Os dados reais viram aq
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          // checkboxSelection
          onRowClick={(event) => history.push('/infoPet', {id: event.id})}
        />
      </Box>

      <div>
        <ButtonFab />
      </div>
    </div>
  );
}
