import axios from "axios";

const BASE_URL = "http://localhost:8080/api/ban-hang-tai-quay";

export const getAllListHoaDonCho = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/hoa-don-cho`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneHoaDon = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/hoa-don-cho/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHoaDonPending = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/hoa-don-pending`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createHoaDonCho = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${BASE_URL}/create-hoa-don-cho?email=` + localStorage.getItem("email"));
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const createHoaDonChiTietByIdHoaDon = async (idHoaDon, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${BASE_URL}/create-hoa-don-chi-tiet/${idHoaDon}`, data);
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateSoLuongSanPhamByIdHoaDonCT = async (idHDCT, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/update-so-luong-hoa-don-chi-tiet/${idHDCT}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDiaChiHoaDon = async (idHd, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/cap-nhat-dia-chi-hoa-don/${idHd}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateKhachHangChoHoaDon = async (idHoaDon, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/update-khach-hang-hoa-don/${idHoaDon}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTrangThaiHoaDon = async (idHoaDon, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/update-trang-thai-hoa-don/${idHoaDon}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHoaDonChiTiet = async (idHDCT) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/delete-hoa-don-chi-tiet/${idHDCT}`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const truSoLuongHoaDonChiTiet = async (idHDCT) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/tru-so-luong-hoa-don-chi-tiet/${idHDCT}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const congSoLuongHoaDonChiTiet = async (idHDCT) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/cong-so-luong-hoa-don-chi-tiet/${idHDCT}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const traHangHoaDonChiTiet = async (idHDCT,data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/tra-hang-hoa-don-chi-tiet/${idHDCT}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const thanhToanHoaDonTaiQuay = async (idHoaDon, data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${BASE_URL}/thanh-toan-hoa-don/${idHoaDon}`, data);
    return response.status;
  } catch (error) {
    throw error;
  }
};


export const payment = async (totalPrice) => {
  try {
    const result = (await axios.post(`${BASE_URL}/payment`, {...totalPrice},)).data;
    return result;
  } catch (e) {
    console.log(e);
  }
}

// export const revertOrRemove = async (id, name, revertOrRemove) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios.put(`${BASE_URL}/${name}/${revertOrRemove}/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
