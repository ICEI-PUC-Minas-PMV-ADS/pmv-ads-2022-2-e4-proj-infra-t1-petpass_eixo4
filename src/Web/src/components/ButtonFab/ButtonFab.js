import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FeedIcon from '@mui/icons-material/Feed';
import PetsIcon from '@mui/icons-material/Pets';
import { hasAnyRoles } from '../../util/auth';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ButtonFab() {

  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (hasAnyRoles(["Administrador", "Instituicao"])) {
      setActions([
        { icon: <PetsIcon />, name: 'Cadastrar Pet', href: '/cadPet' },
        { icon: <FeedIcon />, name: 'Cadastrar Vacina', href: '/cadVacina' },
      ]);
    } else {
      setActions([
        { icon: <PetsIcon />, name: 'Cadastrar Pet', href: '/cadPet' },
      ]);
    }

  }, [setActions]);

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Button"
        sx={{ position: 'absolute', bottom: 1, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions?.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            href={action.href}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}