import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export const searchKhachHang = async (searchValue, searchTrangThai, searchThuHang, pageNo, pageSize, name) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/${name}/search`, {
      params: {
        search: searchValue,
        trangThai: searchTrangThai,
        thuHangId: searchThuHang,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportExcel = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/khach-hang/excel`)
    return response.data;
  } catch (error) {
    throw error;
  }
};