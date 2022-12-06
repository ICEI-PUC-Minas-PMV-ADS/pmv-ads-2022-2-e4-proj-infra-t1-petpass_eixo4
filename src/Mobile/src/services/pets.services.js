import API from './webapi.services';
import { BASE_URL } from './urls';

export const getPets = async () => {
  try {
    return await API.get(`${BASE_URL}/Pets`).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

<<<<<<< HEAD
export const getPetById = async (id) => {
  try {
    console.log('getpetbyid');
    console.log(id);
    return await API.get(`${BASE_URL}/Pets/${id}`).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVacinasPet = async (id) => {
  try {
    return await API.get(`${BASE_URL}/registroVacinas/Pet/${id}`).then(
      (response) => {
        let res = response.data;
        res=res.filter(x=>x.petId===id);
        //console.log('res: ',res);
=======
export const getVacinasPet = async (id) => {
  try {
    return await API.get(`${BASE_URL}/registroVacinas`).then(
      (response) => {
        let res = response.data;
        console.log(res);
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
        return res;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const createPet = async (param) => {
  try {
    return await API.post(`${BASE_URL}/Pets`, param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updatePet = async (param) => {
  try {
    return await API.put(`${BASE_URL}/Pets/${param.id}`, param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deletePet = async (id) => {
  try {
    return await API.delete(`${BASE_URL}/Pets/${id}`).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addUsuario = async (id,param) => {
  try {
<<<<<<< HEAD
    console.log('AddUsuario');
    console.log('petId: ',id);
    console.log('param: ',param);
    console.log('url: ',`${BASE_URL}/Pets/${id}/usuarios`);
=======
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
    return await API.post(`${BASE_URL}/Pets/${id}/usuarios`,param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUsuario = async (id,usuarioId) => {
  try {
    return await API.delete(`${BASE_URL}/Pets/${id}/usuarios/${usuarioId}`).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

<<<<<<< HEAD
export const addVacina = async (param) => {
  try {
    return await API.post(`${BASE_URL}/Pets/${param.petId}/vacinas`,param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateVacina = async (param) => {
  try {
    console.log(`${BASE_URL}/Pets/${param.petId}/vacinas/${param.vacinaId}`);
    return await API.put(`${BASE_URL}/Pets/${param.petId}/vacinas/${param.vacinaId}`,param).then(
=======
export const addVacina = async (id,param) => {
  try {
    return await API.post(`${BASE_URL}/Pets/${id}/vacinas`,param).then(
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

<<<<<<< HEAD
export const deleteVacina = async (petId,registroId) => {
  try {
    return await API.delete(`${BASE_URL}/Pets/${petId}/vacinas/${registroId}`).then(
=======
export const updateVacina = async (id,param) => {
  try {
    return await API.put(`${BASE_URL}/Pets/${id}/vacinas/${param.id}`,param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVacina = async (id,registroId) => {
  try {
    return await API.delete(`${BASE_URL}/Pets/${id}/vacinas/${registroId}`).then(
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

