import API from './webapi.services';
import { BASE_URL } from './urls';

export const getVacinas = async () => {
  try {
    return await API.get(`${BASE_URL}/Vacinas`).then(
      (response) => {
<<<<<<< HEAD
        //console.log(`${BASE_URL}/Vacinas`);
        //console.log('Vacinasservice: ',response.data);
=======
>>>>>>> 5fb5b85b36c7626a8a8e9e7ce274b52d39d0c069
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

export const getVacinaById = async (id) => {
  try {
    return await API.get(`${BASE_URL}/Vacinas/${id}`).then(
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

export const createVacina = async (param) => {
  try {
    return await API.post(`${BASE_URL}/Vacinas`, param).then(
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
export const updateVacina = async (param) => {
  try {
    return await API.put(`${BASE_URL}/Vacinas/${param.id}`, param).then(
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
export const deleteVacina = async (id) => {
  try {
    return await API.delete(`${BASE_URL}/Vacinas/${id}`).then(
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