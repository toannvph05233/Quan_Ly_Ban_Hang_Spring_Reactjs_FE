import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
export const searchSanPham = async (
  searchValue,
  gioiTinhValue,
  cauThuValue,
  coAoValue,
  mauSacValue,
  loaiSanPhamValue,
  chatLieuValue,
  dongSanPhamValue,
  nhaSanXuatValue,
  thuongHieuValue,
  nuocSanXuatValue,
  congNgheValue,
  trangThaiValue,
  giaMinValue,
  giaMaxValue,
  pageNo,
  pageSize
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/san-pham/keywords`, {
      params: {
        search: searchValue,
        gioiTinh: gioiTinhValue,
        cauThuId: cauThuValue,
        coAoId: coAoValue,
        mauSacId: mauSacValue,
        loaiSanPhamId: loaiSanPhamValue,
        chatLieuId: chatLieuValue,
        dongSanPhamId: dongSanPhamValue,
        nhaSanXuatId: nhaSanXuatValue,
        thuongHieuId: thuongHieuValue,
        nuocSanXuatId: nuocSanXuatValue,
        congNgheId: congNgheValue,
        trangThai: trangThaiValue,
        giaMin: giaMinValue,
        giaMax: giaMaxValue,
        pageNo,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChiTietSanPham = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/san-pham/create`);
    return response.data;
  } catch (error) {
    console.log("Something went wrong when getting" + error.message);
  }
};
