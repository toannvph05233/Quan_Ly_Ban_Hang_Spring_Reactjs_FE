import axios from "axios";
const BASE_URL = "http://localhost:8080/api/thong-ke";

export const theoNgay = async (ngayTruoc) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/theo-ngay-truoc`, {
      params: {
        ngayTruoc: ngayTruoc
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const theoThang = async (thangTruoc) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/theo-thang-truoc`, {
      params: {
        thangTruoc: thangTruoc
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topKhachHang = async (limit) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/top-khach-hang`, {
      params: {
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const topSanPham = async (limit) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/top-selling-product`, {
      params: {
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const timKiemHoaDonTheoTrangThai = async (trangThai) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/trang-thai`, {
      params: {
        trangThai: trangThai
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const timKiemTheoKhoangNgay = async (startDate, endDate) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/ngay-tao`, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tongDoanhThu = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/tong-hoa-don`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNgayTao = async (startDate, endDate) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/ngay-tao-money`, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const thongKeToanBoTrangThai = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${BASE_URL}/trang-thai`);
    return response.data;
  } catch (error) {
    throw error;
  }
};