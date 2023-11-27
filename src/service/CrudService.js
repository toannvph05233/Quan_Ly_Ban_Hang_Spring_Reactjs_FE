import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAll = async (pageNo, pageSize, name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}`, {
      params: {
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllList = async (name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const search = async (searchValue, pageNo, pageSize, name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}/search`, {
      params: {
        search: searchValue,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOne = async (id, name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const create = async (name, entity) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${BASE_URL}/${name}/create`, entity);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateById = async (id, name, entity) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/${name}/update/${id}`, entity);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revertOrRemove = async (id, name, revertOrRemove) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/${name}/${revertOrRemove}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const  downloadExcel = async (name,nameFile) => {
  const response = await axios.get(`${BASE_URL}/${name}/excel`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${nameFile}.xlsx`);
  document.body.appendChild(link);
  link.click();
};
