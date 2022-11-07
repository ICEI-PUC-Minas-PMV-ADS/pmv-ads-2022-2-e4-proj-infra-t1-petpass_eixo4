import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ButtonFab from '../../components/ButtonFab/ButtonFab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import useData from '../../store/useData';
import Card from '../../components/Card';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    field: 'NomePet',
    headerName: 'Nome do Pet',
    width: 150,
    editable: false,
  },
  {
    field: 'Tipo',
    headerName: 'Tipo',
    width: 150,
    editable: false,
  },
  {
    field: 'Raca',
    headerName: 'Raça',
    width: 150,
    editable: false,
  },
  {
    field: 'Sexo',
    headerName: 'Sexo',
    width: 150,
    editable: false,
  },
  {
    field: 'Idade',
    headerName: 'Idade',
    type: 'number',
    width: 150,
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'DataRegistro',
    headerName: 'Data do Registro',
    width: 150,
    editable: false,
    align: 'center',
    headerAlign: 'center',
  },
];

export default function Pets() {
  const initialData = [
    { id: 1, NomePet: '', Tipo: '', Sexo: '', Raca: '', Idade: null, DataRegistro: '' },
  ];

  const [rows, setRows] = useState(initialData);

  const {
    data: {
      user: { id },
    },
  } = useData();

  useEffect(() => {
      axios
        .get(`https://localhost:7110/api/Pets/${id}`)
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
          onCellClick={() => history.push('/infoPet')}
        />
      </Box>

      <div>
        <ButtonFab />
      </div>
    </div>
  );
}
