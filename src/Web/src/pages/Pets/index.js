import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import ButtonFab from '../../components/ButtonFab/ButtonFab';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuthenticatedUser } from '../../util/auth';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import history from '../../util/history';

const columns = [
  {
    field: 'nomePet',
    headerName: 'Nome do Pet',
    width: 180,
    editable: false,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 120,
    editable: false,
    valueGetter: ({ value }) => ['Cachorro', 'Gato'][value],
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
    width: 100,
    editable: false,
    valueGetter: ({ value }) => ['Fêmea', 'Macho'][value],
  },
  {
    field: 'peso',
    headerName: 'Peso',
    type: 'number',
    width: 100,
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'dataRegistro',
    headerName: 'Data de Nascimento',
    width: 150,
    editable: false,
    valueGetter: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    headerName: 'Ações',
    width: 180,
    editable: false,
    align: 'center',
    field: 'actions',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem
        icon={<VaccinesIcon />}
        onClick={() => {
          history.push('/registroVacina', { petId: params.id });
          window.location = '';
        }}
        label="Aplicar Vacina"
      />,
    ],
  },
];

export default function Pets() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7110/api/Usuarios/${getAuthenticatedUser()}/Pets`)
      .then((res) => setRows(res.data.map((d) => d.pet)))
      .catch((err) => console.error(err));
  }, []);

  const history = useHistory();

  return (
    <div className="pets-container">
      <h1 style={{ marginLeft: 110, padding: 10, fontWeight: 'bold' }}>
        Meus Pets
      </h1>
      <Box style={{ height: 470, width: '85%', marginLeft: '110px' }}>
        <DataGrid
          rows={rows} // Os dados reais virão aqui
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          // checkboxSelection
          onRowClick={(event) => history.push('/infoPet', { id: event.id })}
        />
      </Box>

      <div>
        <ButtonFab />
      </div>
    </div>
  );
}
