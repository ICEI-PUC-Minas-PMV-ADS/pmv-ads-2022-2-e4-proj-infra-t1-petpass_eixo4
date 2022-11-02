import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ButtonFab from '../../components/ButtonFab/ButtonFab';
import { Tooltip } from '@mui/material';
import useData from '../../store/useData';
import Card from '../../components/Card';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nomePet',
    headerName: 'Nome do Pet',
    width: 200,
    editable: true,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 200,
    editable: true,
  },
  {
    field: 'raca',
    headerName: 'Raça',
    width: 200,
    editable: true,
  },
  {
    field: 'sexo',
    headerName: 'Sexo',
    width: 200,
    editable: true,
  },
  {
    field: 'idade',
    headerName: 'Idade',
    type: 'number',
    width: 200,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
];

export default function Pets() {
  const {
    data: { pet },
  } = useData();
  const rows = [
    {
      id: pet[0].id,
      nomePet: pet[0].nomePet,
      tipo: pet[0].tipo,
      raca: pet[0].raca,
      sexo: pet[0].sexo,
      idade: pet[0].idade,
    },
  ];

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
          //checkboxSelection
        />
      </Box>
      
      <div>
        <ButtonFab />
      </div>
    </div>
  );
}
