import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
export const searchChiTietSanPham = async (
  searchCTSPValue,
  gioiTinhCTSPValue,
  cauThuCTSPValue,
  mauSacCTSPValue,
  thuongHieuCTSPValue,
  congNgheCTSPValue,
  pageNoCTSP,
  pageSizeCTSP
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/chi-tiet-san-pham/keywords`, {
      params: {
        search: searchCTSPValue,
        gioiTinh: gioiTinhCTSPValue,
        cauThuId: cauThuCTSPValue,
        mauSacId: mauSacCTSPValue,
        thuongHieuId: thuongHieuCTSPValue,
        congNgheId: congNgheCTSPValue,
        pageNoCTSP,
        pageSizeCTSP
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
