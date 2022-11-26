import API from './webapi.services';
import { BASE_URL } from './urls';

export const register = async (param) => {
  try {
    return await API.post(`${BASE_URL}/Usuarios`, param).then(
      (response) => {
        console.log('Response: ',response)
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

export const login = async (param) => {
  try {
    return await API.post(`${BASE_URL}/Usuarios/authenticate`, param).then(
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

export const GetUsuarios = async () => {
  try {
    return await API.post(`${BASE_URL}/Usuarios`).then(
      (response) => {
        console.log(response)
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

export const GetUsuarioById = async (id) => {
  try {
    return await API.post(`${BASE_URL}/Usuarios/${id}`).then(
      (response) => {
        console.log(response)
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

export const UpdateUsuario = async (param) => {
  try {
    return await API.put(`${BASE_URL}/Usuarios/${param.id}`, param).then(
      (response) => {
        console.log(response)
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

export const GetPetsUsuario = async (id) => {
  try {
    console.log('id: ',id);
    console.log(`${BASE_URL}/Usuarios/${id}/Pets`);
    return await API.get(`${BASE_URL}/Usuarios/${id}/Pets`).then(
      (response) => {
        console.log(response)
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

export const AddPet = async (id,param) => {
  try {
    return await API.post(`${BASE_URL}/Usuarios/${id}/Pets`,param).then(
      (response) => {
        console.log(response)
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

export const DeletePet = async (id,petId) => {
  try {
    return await API.delete(`${BASE_URL}/Usuarios/${id}/Pets/${petId}`).then(
      (response) => {
        console.log(response)
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

export const logout = async () => {
  try {
    return await API.post().then(
      (response) => {
        console.log('Response: ',response.data);
        return response.data;
      },
      (error) => {
        console.log('Login: ',error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
