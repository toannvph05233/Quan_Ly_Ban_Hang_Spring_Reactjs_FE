import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
export const searchHoaDon = async (
  searchValue,
  ngayTaoMinValue,
  ngayTaoMaxValue,
  hinhThucBanHangValue,
  trangThaiValue,
  pageNo,
  pageSize
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/hoa-don/keywords-admin`, {
      params: {
        search: searchValue,
        ngayTaoMin: ngayTaoMinValue,
        ngayTaoMax: ngayTaoMaxValue,
        hinhThucBanHang: hinhThucBanHangValue,
        trangThai: trangThaiValue,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
