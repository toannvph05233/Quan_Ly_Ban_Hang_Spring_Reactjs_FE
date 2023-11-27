import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
export const searchGiaoDich = async (
  searchValue,
  maGiaoDichValue,
  ngayTaoMinValue,
  ngayTaoMaxValue,
  phuongThucThanhToanValue,
  pageNo,
  pageSize
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/hoa-don/giao-dich/keywords`, {
      params: {
        searchTenOrMa: searchValue,
        maGiaoDich: maGiaoDichValue,
        ngayTaoMin: ngayTaoMinValue,
        ngayTaoMax: ngayTaoMaxValue,
        phuongThucThanhToan: phuongThucThanhToanValue,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
