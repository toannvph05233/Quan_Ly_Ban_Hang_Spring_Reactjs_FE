import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export const searchNhanVien = async (searchValue, searchTrangThai, searchVaiTro, pageNo, pageSize, name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}/search`, {
      params: {
        search: searchValue,
        trangThai: searchTrangThai,
        vaiTroId: searchVaiTro,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
