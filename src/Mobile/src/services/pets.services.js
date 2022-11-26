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

export const getVacinasPet = async (id) => {
  try {
    return await API.get(`${BASE_URL}/registroVacinas`).then(
      (response) => {
        let res = response.data;
        console.log(res);
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

export const addVacina = async (id,param) => {
  try {
    return await API.post(`${BASE_URL}/Pets/${id}/vacinas`,param).then(
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

