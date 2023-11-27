import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chuong-trinh-tich-diem";

export const searchChuongTrinhTichDiem = async (searchValue, searchTrangThai, pageNo, pageSize) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        search: searchValue,
        trangThai: searchTrangThai,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
