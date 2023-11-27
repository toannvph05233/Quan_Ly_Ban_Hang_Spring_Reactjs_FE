import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Switch,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Chip,
  MenuItem,
  Select,
  Dialog,
  OutlinedInput,
  Pagination,
  DialogContent,
  FormLabel,
  RadioGroup,
  Radio,
  DialogActions,
  FormHelperText,
  ButtonGroup
} from "@mui/material";
import React, {useEffect, useState} from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {DeleteIcon, SearchIcon} from "../../assets/icon/Icon";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  congSoLuongHoaDonChiTiet,
  createHoaDonChiTietByIdHoaDon,
  createHoaDonCho,
  deleteHoaDonChiTiet,
  getAllListHoaDonCho,
  getOneHoaDon,
  payment,
  thanhToanHoaDonTaiQuay,
  truSoLuongHoaDonChiTiet,
  updateKhachHangChoHoaDon
  // updateSoLuongSanPhamByIdHoaDonCT
  // updateSoLuongSanPhamByIdHoaDonCT
} from "../../service/BanHangTaiQuayService";
import {Avatar} from "@files-ui/react";
import dayjs from "dayjs";
import {searchKhachHang} from "../../service/KhachHangService";
import {create, getAll, getAllList, getOne} from "../../service/CrudService";
import {useFormik} from "formik";
import * as Yup from "yup";
import gioHangTrong from "../../assets/images/84ef447b1462d8ed463d868d017ea365.gif";
import hoaDonTrong from "../../assets/images/81c4fc9a4c06cf57abf23606689f7426.jpg";
import {searchChiTietSanPham} from "../../service/ChiTietSanPhamService";

const BanHang = () => {
  const [open, setOpenKhachHang] = useState(false);
  const [openThemNhanh, setOpenThemNhanh] = useState(false);
  const [openThemSanPham, setOpenThemSanPham] = useState(false);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [listThuHang, setListThuHang] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];
  const [resetData, setResetData] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [trangThaiValue, setTrangThaiValue] = useState([]);
  const [searchThuHang, setSearchThuHang] = useState([]);
  // chi tiet san pham
  const [searchCTSPValue, setSearchCTSPValue] = useState([]);
  const [gioiTinhCTSPValue, setGioiTinhCTSPValue] = useState([]);
  const [cauThuCTSPValue, setCauThuCTSPValue] = useState([]);
  const [mauSacCTSPValue, setMauSacCTSPValue] = useState([]);
  const [thuongHieuCTSPValue, setThuongHieuCTSPValue] = useState([]);
  const [congNgheCTSPValue, setCongNgheCTSPValue] = useState([]);
  const [listChiTietSanPham, setListChiTietSanPham] = useState([]);
  const [listCauThu, setListCauThu] = useState([]);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [listMauSac, setListMauSac] = useState([]);
  const [listCongNghe, setListCongNghe] = useState([]);
  const [currentPageCTSP, setCurrentPageCTSP] = useState(0);
  const [pageSizeCTSP, setPageSizeCTSP] = useState(5);
  const [totalPagesCTSP, setTotalPagesCTSP] = useState(0);
  const pageSizeOptionsCTSP = [5, 10, 20];
  const [giamGia, setGiamGia] = useState(0);
  const [diem, setDiem] = useState(0);
  const [tinhDiem, setTinhDiem] = useState(0);
  const [phiVanChuyen, setPhiVanChuyen] = useState(0); // Thêm state cho phí vận chuyển
  const [errorGiamGia, setErrorGiamGia] = useState("");
  const [errorPhiVanChuyen, setErrorPhiVanChuyen] = useState("");
  const [errorSoDiem, setErrorSoDiem] = useState("");
  const [isGiaoHangEnabled, setIsGiaoHangEnabled] = useState(false);

  const [hinhThucBanHang, setHinhThucBanHang] = useState("");
  const [isThanhToanBangDiemEnabled, setIsThanhToanBangDiemEnabled] = useState(false);
  const [listHoaDonCho, setListHoaDonCho] = useState([]);
  const [idHoaDonCho, setIdHoaDonCho] = useState(null);
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState("");
  const [tongTienKhachCanTra, setTongTienKhachCanTra] = useState(0);
  // const [thongTinHoaDon, setThongTinHoaDon] = useState({
  //   moTa:'',
  //   ngayMuonNhan:'',
  //   phanTramGiamGia:giamGia,
  //   soTienChuyenKhoan:null,
  //   soTienMat:null,
  //   soTienVanChuyen:null,
  //   phuongThucThanhToan:'',
  //   thanhTien:null,
  //   diaChi:'',
  //   tenNguoiNhan:'',
  //   sdtNguoiNhan:'',
  //   sdtNguoiShip:'',
  //   hinhThucBanHang:'',
  // })
  console.log(hinhThucBanHang);
  const [quyDoiDiem, setQuyDoiDiem] = useState({
    id: "",
    diem: null,
    soTienQuyDoi: null,
    trangThai: ""
  });
  const [diaChi, setDiaChi] = useState({
    id: "",
    hoTen: "",
    sdt: "",
    diaChiChiTiet: "",
    trangThai: ""
  });
  console.log(diaChi);
  const [khachHang, setKhachHang] = useState({
    diaChiList: [
      {
        id: "",
        hoTen: "",
        sdt: "",
        diaChiChiTiet: "",
        trangThai: ""
      }
    ]
  });
  const [hoaDonCho, setHoaDonCho] = useState({
    khachHang: {
      thuHang: {
        ten: ""
      },
      id: "",
      ma: "",
      ten: "",
      soDiem: null
    },
    hoaDonChiTietList: [
      {
        chiTietSanPham: {
          ma: "",
          ten: ""
        },
        soLuong: null,
        donGia: null,
        giaBan: null
      }
    ],
    lichSuHoaDonList: [
      {
        hoaDon: {
          phanTramGiamGia: null,
          soTienVanChuyen: null
        },
        nhanVien: null,
        ngayTao: "",
        moTa: "",
        loaiLichSuHoaDon: null
      }
    ]
  });
  const [idChiTietSanPham, setIdChiTietSanPham] = useState({
    idCtsp: ""
  });
  const [thanhToanHoaDon, setThanhToanHoaDon] = useState({
    moTa: "",
    ngayMuonNhan: "",
    phanTramGiamGia: "",
    soTienVanChuyen: "",
    phuongThucThanhToan: "",
    thanhTien: "",
    diaChi: "",
    tenNguoiNhan: "",
    sdtNguoiNhan: "",
    sdtNguoiShip: "",
    hinhThucBanHang: ""
  });
  const fetchOneDataHoaDonCho = async () => {
    let idToFetch = idHoaDonCho;
    if (idToFetch === null) {
      const confirmedHoaDon = listHoaDonCho.find((hoDon) => hoDon.trangThai === "CONFIRMED");
      idToFetch = confirmedHoaDon ? confirmedHoaDon.id : null;
    }

    if (idToFetch !== null) {
      const response = await getOneHoaDon(idToFetch);
      setHoaDonCho(response);
    }
  };

  useEffect(() => {
    const fectchData = async () => {
      await fetchAllDataHoaDonCho();
      await fetchOneDataHoaDonCho();
    };
    fectchData();
  }, [idHoaDonCho]);

  const fetchAllDataHoaDonCho = async () => {
    try {
      const response = await getAllListHoaDonCho();
      setListHoaDonCho(response);
    } catch (error) {
      console.error("Something went wrong with: " + error);
    }
  };

  const handleHoaDonById = (row) => {
    setIdHoaDonCho(row.id);
  };

  const handleCreateHoaDonCho = async () => {
    try {
      await createHoaDonCho();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateHoaDonChiTiet = async (post) => {
    try {
      setIdChiTietSanPham({idCtsp: post.id});
      await createHoaDonChiTietByIdHoaDon(idHoaDonCho, {idCtsp: idChiTietSanPham.idCtsp});
      await fetchOneDataHoaDonCho();
      setOpenThemSanPham(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateKhachHangHoaDon = async (post) => {
    try {
      await updateKhachHangChoHoaDon(idHoaDonCho, {idKhachHang: post.id});
      await fetchOneDataHoaDonCho();
      setOpenKhachHang(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteKhachHangHoaDon = async () => {
    try {
      await updateKhachHangChoHoaDon(idHoaDonCho, {idKhachHang: null});
      await fetchOneDataHoaDonCho();
      setOpenKhachHang(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTruSoLuongHoaDonChiTiet = async (post) => {
    try {
      await truSoLuongHoaDonChiTiet(post.id);
      await fetchOneDataHoaDonCho();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCongSoLuongHoaDonChiTiet = async (post) => {
    try {
      await congSoLuongHoaDonChiTiet(post.id);
      await fetchOneDataHoaDonCho();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchOneDataHoaDonCho();
      await fetchAllDataHoaDonCho();
    };
    fetchDataAndResetData();
  }, []);

  const handleClickOpen = () => {
    setOpenKhachHang(true);
  };
  const handleClose = () => {
    setOpenKhachHang(false);
  };

  const handleClickOpenThemSanPham = () => {
    setOpenThemSanPham(true);
  };
  const handleCloseThemSanPham = () => {
    setOpenThemSanPham(false);
  };

  const formik = useFormik({
    initialValues: {
      ten: "",
      gioiTinh: "",
      ngaySinh: "",
      diaChi: "",
      sdt: "",
      email: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(5, "Tên phải lớn hơn 5 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      email: Yup.string()
        .min(8, "Email phải lớn hơn 8 kí tự")
        .max(225, "Email không dài quá 225 kí tự")
        .email("Email sai định dạng")
        .required("Email không được để trống")
    }),
    onSubmit: () => {
      handleCreateKhachHang();
      setOpenThemNhanh(false);
    }
  });
  const createSearchParams = (filters) => {
    const searchParams = {};
    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    if (filters.trangThaiValue !== "") {
      searchParams.trangThai = filters.trangThaiValue;
    }
    if (filters.searchThuHang !== "") {
      searchParams.thuHangId = filters.searchThuHang;
    }
    return searchParams;
  };

  const fetchDataThuHang = async () => {
    const response = await getAllList("thu-hang");
    setListThuHang(response);
  };

  const fetchDataKhachHang = async () => {
    try {
      const filters = {
        searchValue,
        trangThaiValue,
        searchThuHang
      };
      const searchParams = createSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchKhachHang(
          searchParams.search,
          searchParams.trangThai,
          searchParams.thuHangId,
          currentPage,
          pageSize,
          "khach-hang"
        );
      } else {
        response = await getAll(currentPage, pageSize, "khach-hang");
      }
      setListKhachHang(response.content);
      setTotalPages(response.totalPages);
      console.log(listKhachHang);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleCreateKhachHang = async () => {
    try {
      const status = await create("khach-hang", formik.values);
      if (status === 201) {
        console.log("Khách hàng mới:", formik.values);
      }
      setOpenThemNhanh(false);
      await fetchDataKhachHang();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataKhachHang();
      await fetchDataThuHang();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataAndResetData();
  }, [currentPage, pageSize, resetData, searchValue, trangThaiValue, searchThuHang]);

  const handleClickOpenThemNhanhKhachHang = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "khach-hang");
        formik.setValues(response);
      } else {
        formik.resetForm();
      }
      setOpenThemNhanh(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseThemNhanh = () => {
    setOpenThemNhanh(false);
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setTrangThaiValue("");
    setSearchThuHang("");
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };
  // const toggleGiaoHang = async () => {
  //   setIsGiaoHangEnabled((prev) => !prev);
  //
  //   // Set the value based on the toggle state
  //   const newValue = isGiaoHangEnabled ? "DELIVERY" : "STORE";
  //   const response = await getOne(hoaDonCho.khachHang.id, "khach-hang");
  //   setKhachHang(response);
  //   // Update the state with the new value
  //   setPhiVanChuyen(0);
  //
  //   // Update the value with the new state
  //   setHinhThucBanHang(newValue);
  // };
  const toggleGiaoHang = async () => {
    setIsGiaoHangEnabled((prev) => !prev);
    const newValue = isGiaoHangEnabled ? "STORE" : "DELIVERY";

    setThanhToanHoaDon((prev) => ({
      ...prev,
      hinhThucBanHang: newValue,
    }));

    if (newValue === "STORE") {
      setThanhToanHoaDon((prev) => ({
        ...prev,
        ngayMuonNhan: "",
        diaChi: "",
        tenNguoiNhan: "",
        sdtNguoiNhan: "",
        sdtNguoiShip: "",
        soTienVanChuyen: "",
      }));
    }


    const response = await getOne(hoaDonCho.khachHang.id, "khach-hang");
    setKhachHang(response);

    setPhiVanChuyen(0);
    setHinhThucBanHang(newValue);

  };

  // const fetchDataDiaChi = async () => {
  //   const response = await getOne(hoaDonCho.khachHang.id, 'khach-hang');
  //   setKhachHang(response);
  // };

  const toggleThanhToanBangDiem = () => {
    setIsThanhToanBangDiemEnabled((prev) => !prev);
    setTinhDiem(0);
    setDiem(0);
  };

  const tongTienHang = hoaDonCho.hoaDonChiTietList.reduce((total, row) => total + (row?.donGia || 0), 0);

  const tienKhachCanTra = tongTienHang - (tongTienHang * giamGia) / 100;
  const tongTien = tienKhachCanTra + phiVanChuyen - tinhDiem;

  const handleGiamGia = (event) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);

    if (value.trim() === "") {
      // Empty input is allowed
      setGiamGia("");
      setErrorGiamGia("");
      // Cập nhật state thanhToanHoaDon bằng cách sao chép toàn bộ state hiện tại và chỉ cập nhật trường phanTramGiamGia
      setThanhToanHoaDon((prevState) => ({
        ...prevState,
        phanTramGiamGia: ""
      }));
    } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      setGiamGia(numericValue);
      setErrorGiamGia("");
      // Cập nhật state thanhToanHoaDon bằng cách sao chép toàn bộ state hiện tại và chỉ cập nhật trường phanTramGiamGia
      setThanhToanHoaDon((prevState) => ({
        ...prevState,
        phanTramGiamGia: numericValue.toString()
      }));
    } else {
      setErrorGiamGia("Giảm giá phải nằm trong khoảng từ 0% đến 100%");
    }
  };

  const handleThanhToanDiem = (event) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);

    // Validate empty input
    if (value.trim() === "") {
      setDiem("");
      setTinhDiem("");
      setErrorSoDiem("");
      return;
    }

    // Validate numeric value
    if (isNaN(numericValue)) {
      setErrorSoDiem("Số điểm phải là một số");
      return;
    }

    // Validate value is greater than or equal to 0
    if (numericValue < 0) {
      setErrorSoDiem("Số điểm phải lớn hơn hoặc bằng 0");
      return;
    }

    // Validate value is not greater than customer's points
    if (numericValue > hoaDonCho.khachHang.soDiem) {
      setErrorSoDiem("Số điểm không được lớn hơn số điểm của khách hàng");
      return;
    }

    // Set value and calculate tinhDiem
    setDiem(numericValue);
    const calculatedTinhDiem = numericValue * quyDoiDiem.soTienQuyDoi;
    setTinhDiem(calculatedTinhDiem);

    setErrorSoDiem("");
  };

  const handlePhiVanChuyen = (event) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);

    if (value.trim() === "") {
      // Empty input is allowed
      setPhiVanChuyen("");
      setErrorPhiVanChuyen("");
      // Cập nhật state thanhToanHoaDon bằng cách sao chép toàn bộ state hiện tại và chỉ cập nhật trường soTienVanChuyen
      setThanhToanHoaDon((prevState) => ({
        ...prevState,
        soTienVanChuyen: ""
      }));
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      setPhiVanChuyen(numericValue);
      setErrorPhiVanChuyen("");
      // Cập nhật state thanhToanHoaDon bằng cách sao chép toàn bộ state hiện tại và chỉ cập nhật trường soTienVanChuyen
      setThanhToanHoaDon((prevState) => ({
        ...prevState,
        soTienVanChuyen: numericValue.toString()
      }));
    } else {
      setErrorPhiVanChuyen("Phí vận chuyển lớn hơn hoặc bằng 0");
    }
  };

  // const handlePhiVanChuyen = (event) => {
  //   const value = event.target.value;
  //   if (value >= 0) {
  //     setPhiVanChuyen(value);
  //     setErrorPhiVanChuyen('');
  //   } else {
  //     setErrorPhiVanChuyen('Phí vận chuyển lớn hơn hoặc bằng 0');
  //   }
  // };

  const handleDeleteHoaDonChiTiet = async (post) => {
    try {
      console.log(post.id);
      await deleteHoaDonChiTiet(post.id);
      await fetchOneDataHoaDonCho();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataCauThu = async () => {
    const response = await getAllList("cau-thu");
    setListCauThu(response);
  };

  const fetchDataThuongHieu = async () => {
    const response = await getAllList("thuong-hieu");
    setListThuongHieu(response);
  };

  const fetchDataMauSac = async () => {
    const response = await getAllList("mau-sac");
    setListMauSac(response);
  };

  const fetchDataCongNghe = async () => {
    const response = await getAllList("cong-nghe");
    setListCongNghe(response);
  };

  const handleSearchParams = (filters) => {
    const searchParams = {};

    if (filters.searchCTSPValue !== "") {
      searchParams.search = filters.searchCTSPValue;
    }
    if (filters.gioiTinhCTSPValue !== "") {
      searchParams.gioiTinh = filters.gioiTinhCTSPValue;
    }
    if (filters.cauThuCTSPValue !== "") {
      searchParams.cauThuId = filters.cauThuCTSPValue;
    }
    if (filters.mauSacCTSPValue !== "") {
      searchParams.mauSacId = filters.mauSacCTSPValue;
    }
    if (filters.thuongHieuCTSPValue !== "") {
      searchParams.thuongHieuId = filters.thuongHieuCTSPValue;
    }
    if (filters.congNgheCTSPValue !== "") {
      searchParams.congNgheId = filters.congNgheCTSPValue;
    }
    return searchParams;
  };

  const fetchDataSanPham = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const filters = {
        searchCTSPValue,
        gioiTinhCTSPValue,
        cauThuCTSPValue,
        mauSacCTSPValue,
        thuongHieuCTSPValue,
        congNgheCTSPValue
      };
      const searchParams = handleSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchChiTietSanPham(
          searchParams.search,
          searchParams.gioiTinh,
          searchParams.cauThuId,
          searchParams.mauSacId,
          searchParams.thuongHieuId,
          searchParams.congNgheId,
          currentPageCTSP,
          pageSizeCTSP
        );
      } else {
        // Xử lý khi không có điều kiện fillter nào được áp dụng
        response = await getAll(currentPageCTSP, pageSizeCTSP, "chi-tiet-san-pham");
        console.log(listChiTietSanPham);
      }
      setListChiTietSanPham(response.content);
      setTotalPagesCTSP(response.totalPages);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataCauThu();
      await fetchDataThuongHieu();
      await fetchDataMauSac();
      await fetchDataCongNghe();
      await fetchDataSanPham();
    };
    fetchDataAndResetData();
  }, [
    currentPageCTSP,
    pageSizeCTSP,
    searchCTSPValue,
    gioiTinhCTSPValue,
    cauThuCTSPValue,
    mauSacCTSPValue,
    thuongHieuCTSPValue,
    congNgheCTSPValue
  ]);

  const handlePageSizeChangeCTSP = (event) => {
    const newPageSizeCTSP = parseInt(event.target.value, 10);
    setPageSizeCTSP(newPageSizeCTSP);
    const newPage = Math.floor((currentPageCTSP * pageSizeCTSP) / newPageSizeCTSP);
    setCurrentPageCTSP(newPage);
  };

  const handleResetChiTietSanPham = () => {
    setCurrentPageCTSP(0);
    setSearchCTSPValue("");
    setCauThuCTSPValue("");
    setGioiTinhCTSPValue("");
    setMauSacCTSPValue("");
    setCongNgheCTSPValue("");
    setThuongHieuCTSPValue("");
  };

  const handleChonDiaChi = async (row) => {
    const response = await getOne(row.id, "dia-chi");
    setDiaChi(response);
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await featchDataQuyDoiDiem();
    };
    fetchDataAndResetData();
  }, []);

  const featchDataQuyDoiDiem = async () => {
    const response = await getOne(1, "quy-doi-diem");
    setQuyDoiDiem(response);
  };

  const handleHinhThucThanhToanChange = (event) => {
    const value = event.target.value;

    // Cập nhật state thanhToanHoaDon bằng cách sao chép toàn bộ state hiện tại và chỉ cập nhật trường phuongThucThanhToan
    setThanhToanHoaDon((prevState) => ({
      ...prevState,
      phuongThucThanhToan: value
    }));

    setHinhThucThanhToan(value);
  };

  const handleInputChange = (fieldName, value) => {
    setThanhToanHoaDon({...thanhToanHoaDon, [fieldName]: value});
  };

  const [errors, setErrors] = useState({
    moTa: "",
    ngayMuonNhan: "",
    tenNguoiNhan: "",
    sdtNguoiNhan: "",
    diaChi: "",
    phuongThucThanhToan: ""
  });

  const handlePayment = async () => {
    // Đặt tất cả lỗi về rỗng trước khi thực hiện validation
    setErrors({
      moTa: "",
      ngayMuonNhan: "",
      tenNguoiNhan: "",
      sdtNguoiNhan: "",
      diaChi: "",
      phuongThucThanhToan: ""
    });

    // Thực hiện validation
    if (!thanhToanHoaDon.moTa) {
      setErrors((prevErrors) => ({...prevErrors, moTa: "Mô tả không được để trống"}));
    }

    if (!thanhToanHoaDon.ngayMuonNhan && isGiaoHangEnabled) {
      setErrors((prevErrors) => ({...prevErrors, ngayMuonNhan: "Ngày muốn nhận không được để trống"}));
    }

    if (!thanhToanHoaDon.tenNguoiNhan && isGiaoHangEnabled) {
      setErrors((prevErrors) => ({...prevErrors, tenNguoiNhan: "Tên người nhận không được để trống"}));
    }

    if (!thanhToanHoaDon.sdtNguoiNhan && isGiaoHangEnabled) {
      setErrors((prevErrors) => ({...prevErrors, sdtNguoiNhan: "Số điện thoại người nhận không được để trống"}));
    }

    if (!thanhToanHoaDon.diaChi && isGiaoHangEnabled) {
      setErrors((prevErrors) => ({...prevErrors, diaChi: "Địa chỉ không được để trống"}));
    }

    if (!thanhToanHoaDon.phuongThucThanhToan) {
      setErrors((prevErrors) => ({...prevErrors, phuongThucThanhToan: "Hình thức thanh toán không được để trống"}));
    }

    const currentDate = new Date();
    const selectedDate = new Date(thanhToanHoaDon.ngayMuonNhan);

    if (selectedDate < currentDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ngayMuonNhan: "Ngày muốn nhận hàng không được nhỏ hơn ngày hiện tại"
      }));
      return;
    }

    if (thanhToanHoaDon.hinhThucBanHang === "STORE") {
      setThanhToanHoaDon((prev) => ({
        ...prev,
        ngayMuonNhan: "",
        diaChi: "",
        tenNguoiNhan: "",
        sdtNguoiNhan: "",
        sdtNguoiShip: "",
        soTienVanChuyen: "",
        // ... (các trường khác nếu có)
      }));
    }
    // Nếu đến đây, có nghĩa là thông tin hợp lệ, tiếp tục xử lý thanh toán
    setTongTienKhachCanTra(tongTien);
    setThanhToanHoaDon((prevState) => ({
      ...prevState,
      thanhTien: tongTien
    }));

    try {
      // Thực hiện thanh toán
      console.log("thanhToanHoaDon==============", thanhToanHoaDon);
      if (hinhThucThanhToan === "BANKING") {
        console.log("thanhToanHoaDon==============", thanhToanHoaDon);
        await thanhToanHoaDonTaiQuay(idHoaDonCho, thanhToanHoaDon);
        const result = await payment({tongTienKhachCanTra});
        window.location.href = result.url;
      } else {
        await thanhToanHoaDonTaiQuay(idHoaDonCho, thanhToanHoaDon);
      }
    } catch (error) {
      // Xử lý lỗi khi thanh toán không thành công
      console.error("Error during payment:", error);
    }
  };

  return (
    <MainCard title="Bán hàng tại quầy">
      <Grid container>
        <Grid item xs={8}>
          {listHoaDonCho.map((row) => (
            <Button variant="contained" color="primary" key={row.id} style={{marginRight: "10px"}} onClick={() => handleHoaDonById(row)}>
              {row.ma}
            </Button>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" style={{marginLeft: "10px", float: "right"}} onClick={handleCreateHoaDonCho}>
            Tạo Hóa Đơn
          </Button>
          {idHoaDonCho !== null && (
            <Button variant="contained" onClick={() => handleClickOpenThemSanPham()} style={{marginLeft: "10px", float: "right"}}>
              Thêm Sản Phẩm
            </Button>
          )}
        </Grid>
      </Grid>
      {idHoaDonCho === null ? (
        <Box style={{position: "relative", textAlign: "center"}}>
          <img src={hoaDonTrong} alt="Background" width="40%" style={{marginLeft: "auto", marginRight: "auto", display: "block"}} />
          <Box style={{position: "absolute", top: "90%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Typography variant="h2" style={{color: "black"}}>
              Vui lòng chọn hoá đơn
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
            <Typography variant={"h4"}>Giỏ hàng</Typography>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Ảnh sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align={"center"}>Số lượng</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell align={"center"}>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hoaDonCho.hoaDonChiTietList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <img src={gioHangTrong} alt="Background" width="30%" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    hoaDonCho.hoaDonChiTietList.map((row, index) => (
                      <TableRow key={row?.hoaDonChiTietList?.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row?.chiTietSanPham?.sanPham?.ma}</TableCell>
                        <TableCell>{row?.chiTietSanPham?.sanPham?.ten}</TableCell>
                        <TableCell>{row?.chiTietSanPham?.kichThuoc?.ten}</TableCell>
                        <TableCell align={"center"}>
                          <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained">
                            <Button onClick={() => handleTruSoLuongHoaDonChiTiet(row)}>-</Button>
                          </ButtonGroup>
                          <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="text">
                            <Button key="one">{row?.soLuong}</Button>
                          </ButtonGroup>
                          <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" variant="contained">
                            <Button onClick={() => handleCongSoLuongHoaDonChiTiet(row)}>+</Button>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell>
                          {row?.giaBan?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}
                        </TableCell>
                        <TableCell>
                          {row?.donGia?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Xóa" placement="bottom">
                            <Button size="small" onClick={() => handleDeleteHoaDonChiTiet(row)}>
                              <DeleteIcon color={"error"} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </SubCard>
          {hoaDonCho.hoaDonChiTietList.length !== 0 && (
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography variant={"h4"}>Tài khoản</Typography>
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" onClick={() => handleClickOpen()} style={{float: "right"}}>
                        Chọn khách hàng
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider style={{margin: "10px 0px"}} />
                  {hoaDonCho?.khachHang ? (
                    <Grid container spacing={5} alignItems="center">
                      <Grid item xs={4}>
                        <Typography> Tên tài khoản</Typography>
                        <Typography style={{marginTop: "10px"}}>{hoaDonCho?.khachHang?.ten}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography> Số điểm</Typography>
                        <Typography style={{marginTop: "10px"}}>{hoaDonCho?.khachHang?.soDiem}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography> Thứ hạng</Typography>
                        <Typography style={{marginTop: "10px"}}>{hoaDonCho?.khachHang?.thuHang?.ten}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        {hoaDonCho?.khachHang && (
                          <Button variant="contained" onClick={() => handleDeleteKhachHangHoaDon()} style={{float: "right"}}>
                            Xoá tài khoản
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <Chip label="Khách lẻ" />
                  )}
                </SubCard>
                {isGiaoHangEnabled ? (
                  <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                    <Typography variant={"h4"}>Thông tin khách hàng</Typography>
                    {hoaDonCho?.khachHang && (
                      <TableContainer component={Paper}>
                        <Table sx={{margin: "30px 0px"}} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell>Họ tên</TableCell>
                              <TableCell>Số điện thoại</TableCell>
                              <TableCell>Địa chi tiết</TableCell>
                              <TableCell>Trạng Thái</TableCell>
                              <TableCell align={"center"}>Hoạt Động</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {khachHang.diaChiList.map((row, index) => (
                              <TableRow key={row?.diaChiList?.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row?.hoTen}</TableCell>
                                <TableCell>{row?.sdt}</TableCell>
                                <TableCell>{row?.diaChiChiTiet}</TableCell>
                                <TableCell>
                                  <Chip
                                    style={{color: "white"}}
                                    label={row?.trangThai}
                                    color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell align={"center"}>
                                  <Button variant="contained" onClick={() => handleChonDiaChi(row)}>
                                    Chọn
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                    <Box style={{marginTop: "20px"}}>
                      <TextField
                        label="Họ tên"
                        sx={{marginRight: "20px", width: "49%"}}
                        name="tenNguoiNhan"
                        value={thanhToanHoaDon.tenNguoiNhan}
                        onChange={(e) => handleInputChange("tenNguoiNhan", e.target.value)}
                        error={errors.tenNguoiNhan !== ""}
                        helperText={errors.tenNguoiNhan}
                        disabled={!isGiaoHangEnabled} // Disable nếu không giao hàng
                      />

                      <TextField
                        label="Số điện thoại người ship"
                        name="sdtNguoiShip"
                        sx={{width: "49%"}}
                        value={thanhToanHoaDon.sdtNguoiShip}
                        onChange={(e) => handleInputChange("sdtNguoiShip", e.target.value)}
                      />
                    </Box>
                    <Box style={{marginTop: "20px"}}>
                      <TextField
                        label="Số điện thoại người nhận"
                        sx={{marginRight: "20px", width: "49%"}}
                        name="sdtNguoiNhan"
                        value={thanhToanHoaDon.sdtNguoiNhan}
                        onChange={(e) => handleInputChange("sdtNguoiNhan", e.target.value)}
                        error={errors.sdtNguoiNhan !== ""}
                        helperText={errors.sdtNguoiNhan}
                        disabled={!isGiaoHangEnabled} // Disable nếu không giao hàng
                      />
                      <TextField
                        label="Ngày muốn nhận hàng"
                        name="ngayMuonNhan"
                        type={"date"}
                        focused
                        variant="outlined"
                        fullWidth
                        style={{width: "49%"}}
                        value={thanhToanHoaDon.ngayMuonNhan}
                        onChange={(e) => handleInputChange("ngayMuonNhan", e.target.value)}
                        error={errors.ngayMuonNhan !== ""}
                        helperText={errors.ngayMuonNhan}
                        disabled={!isGiaoHangEnabled} // Disable nếu không giao hàng
                      />
                    </Box>
                    <TextField
                      fullWidth
                      label="Địa Chỉ"
                      id="fullWidth"
                      name="diaChi"
                      sx={{marginTop: "20px"}}
                      value={thanhToanHoaDon.diaChi}
                      onChange={(e) => setThanhToanHoaDon({...thanhToanHoaDon, diaChi: e.target.value})}
                      error={errors.diaChi !== ""}
                      helperText={errors.diaChi}
                      disabled={!isGiaoHangEnabled} // Disable nếu không giao hàng
                    />

                    <Box sx={{marginTop: "20px"}}>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "bold",
                          margin: 2
                        }}
                      >
                        <LocalShippingIcon sx={{marginRight: "8px"}} /> Thời Gian Giao Hàng Dự Kiến 24/09/2023
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "bold",
                          margin: 2
                        }}
                      >
                        <LocalShippingIcon sx={{marginRight: "8px"}} /> Đơn Vị Vận Chuyển:{" "}
                        <Typography
                          sx={{
                            color: "blue",
                            fontWeight: "bold"
                          }}
                        >
                          Giao Hàng Nhanh
                        </Typography>
                      </Box>
                    </Box>
                  </SubCard>
                ) : null}
              </Grid>
              <Grid item xs={5}>
                <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant={"h4"}>Thanh toán</Typography>
                  <Box style={{display: "flex", alignItems: "center"}}>
                    <FormControlLabel
                      control={<Switch color="primary" checked={isGiaoHangEnabled} onChange={toggleGiaoHang} />}
                      label="Giao hàng"
                      style={{marginRight: "95px"}}
                    />
                    {quyDoiDiem.trangThai !== "INACTIVE" && (
                      <Box>
                        <FormControlLabel
                          control={<Switch color="primary" checked={isThanhToanBangDiemEnabled} onChange={toggleThanhToanBangDiem} />}
                          label="Thanh toán bằng điểm"
                        />
                      </Box>
                    )}
                    {quyDoiDiem.trangThai !== "INACTIVE" && (
                      <Box>
                        {quyDoiDiem.diem} điểm ={" "}
                        {quyDoiDiem?.soTienQuyDoi?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND"
                        })}
                      </Box>
                    )}
                  </Box>
                  <FormControl fullWidth sx={{marginTop: "20px"}} error={errors.phuongThucThanhToan !== ""}>
                    <InputLabel id="demo-select-small-label">Hình thức thanh toán</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Hình thức bán hàng"
                      value={thanhToanHoaDon.phuongThucThanhToan}
                      onChange={handleHinhThucThanhToanChange}
                    >
                      <MenuItem value="">Chọn hình thức thanh toán</MenuItem>
                      <MenuItem value="CASH">Tiền mặt</MenuItem>
                      <MenuItem value="BANKING">Chuyển khoản</MenuItem>
                    </Select>
                    {errors.phuongThucThanhToan && <FormHelperText style={{color: "red"}}>{errors.phuongThucThanhToan}</FormHelperText>}
                  </FormControl>

                  <Grid container spacing={5}>
                    <Grid item xs={4}>
                      <Typography variant={"h3"} style={{marginTop: "20px", color: "red"}}>
                        {" "}
                        Tổng tiền hàng
                      </Typography>
                      {isGiaoHangEnabled ? (
                        <Typography variant={"h5"} style={{marginTop: "20px"}}>
                          Phí vận chuyển
                        </Typography>
                      ) : null}
                      <Typography variant={"h5"} style={{marginTop: "30px"}}>
                        {" "}
                        Giảm giá
                      </Typography>
                      {isThanhToanBangDiemEnabled ? (
                        <Typography variant={"h5"} style={{marginTop: "30px"}}>
                          {" "}
                          Thanh toán bằng điểm
                        </Typography>
                      ) : null}
                      <Typography variant={"h2"} style={{marginTop: "20px", color: "red"}}>
                        {" "}
                        Tiền khách cần trả
                      </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={5}>
                      <Typography variant="h3" style={{marginTop: "20px", color: "red"}}>
                        {tongTienHang?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                      </Typography>
                      {isGiaoHangEnabled ? (
                        <FormControl variant="standard" fullWidth>
                          <Input
                            id="standard-adornment-weight"
                            style={{marginTop: "20px"}}
                            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              "aria-label": "weight"
                            }}
                            value={thanhToanHoaDon.soTienVanChuyen}
                            onChange={handlePhiVanChuyen}
                          />
                        </FormControl>
                      ) : null}
                      <FormHelperText style={{display: "inline-block"}} error>
                        {errorPhiVanChuyen}
                      </FormHelperText>
                      <FormControl variant="standard" fullWidth>
                        <Input
                          id="standard-adornment-weight"
                          style={{marginTop: "20px"}}
                          endAdornment={<InputAdornment position="end">%</InputAdornment>}
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            "aria-label": "discount"
                          }}
                          value={thanhToanHoaDon.phanTramGiamGia}
                          onChange={handleGiamGia}
                        />
                        <FormHelperText error>{errorGiamGia}</FormHelperText>
                      </FormControl>
                      {isThanhToanBangDiemEnabled ? (
                        <FormControl variant="standard" fullWidth>
                          <Box style={{display: "flex"}}>
                            <Input type="number" style={{marginTop: "20px", width: "50%"}} value={diem} onChange={handleThanhToanDiem} />
                            <FormHelperText error>{errorSoDiem}</FormHelperText>
                            <Typography style={{marginTop: "20px", marginLeft: "10px", width: "50%", fontSize: "20px"}}>
                              {tinhDiem?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                            </Typography>
                          </Box>
                        </FormControl>
                      ) : null}
                      <Typography variant="h3" style={{marginTop: "20px", color: "red"}}>
                        {tongTienKhachCanTra?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                      </Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    variant="outlined"
                    label="Mô tả"
                    name="moTa"
                    multiline
                    rows={3}
                    fullWidth
                    style={{marginBottom: "20px", marginTop: "20px"}}
                    value={thanhToanHoaDon.moTa}
                    onChange={(e) => setThanhToanHoaDon({...thanhToanHoaDon, moTa: e.target.value})}
                    error={errors.moTa !== ""}
                    helperText={errors.moTa}
                  />
                  {/*{errorMoTa && <p style={{color: "red"}}>{errorMoTa}</p>}*/}
                  <Button variant="contained" style={{marginTop: "20px", height: "60px"}} onClick={() => handlePayment()} fullWidth>
                    Thanh toán
                  </Button>
                </SubCard>
              </Grid>
            </Grid>
          )}

          <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
            <DialogContent>
              <MainCard title="Khách Hàng">
                <FormControl sx={{width: "250px", height: "44px", marginRight: "7px"}} size="small">
                  <OutlinedInput
                    id="input-search-header"
                    placeholder="Tìm kiếm theo mã, tên, email và số điện thoại"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{"aria-label": "weight"}}
                  />
                </FormControl>
                <FormControl sx={{width: "130px", height: "40px", marginRight: "7px"}} size="small">
                  <InputLabel id="demo-select-small-label">Thứ Hạng</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Thứ Hạng"
                    value={searchThuHang}
                    onChange={(e) => setSearchThuHang(e.target.value)}
                  >
                    <MenuItem value="">Chọn thứ hạng</MenuItem>
                    {listThuHang.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{width: "130px", height: "40px", marginRight: "550px"}} size="small">
                  <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={trangThaiValue}
                    label="Trạng Thái"
                    onChange={(e) => setTrangThaiValue(e.target.value)}
                  >
                    <MenuItem value="">Chọn Trạng Thái</MenuItem>
                    <MenuItem value={"ACTIVE"}>Hoạt Động</MenuItem>
                    <MenuItem value={"INACTIVE"}>Không Hoạt Động</MenuItem>
                  </Select>
                </FormControl>
                <Box style={{float: "right"}}>
                  <Button onClick={() => handleClickOpenThemNhanhKhachHang(null)} variant="contained" style={{marginRight: "7px"}}>
                    Thêm nhanh
                  </Button>
                  <Button onClick={handleReset} variant="contained" style={{marginRight: "7px"}}>
                    Làm mới
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Đóng
                  </Button>
                </Box>

                <TableContainer component={Paper}>
                  <Table sx={{marginBottom: "30px"}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Mã</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        <TableCell>Ngày Sinh</TableCell>
                        <TableCell>Thứ Hạng</TableCell>
                        <TableCell>Trạng Thái</TableCell>
                        <TableCell align={"center"}>Hoạt Động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listKhachHang.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row?.ma}</TableCell>
                          <TableCell>
                            <div style={{display: "flex", alignItems: "center"}}>
                              <Avatar
                                style={{width: "50px", height: "50px"}}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU"
                                variant="circle"
                              />
                              <p style={{marginLeft: "10px"}}>{row?.ten}</p>
                            </div>
                          </TableCell>
                          <TableCell>{row?.gioiTinh ? "Nam" : "Nữ"}</TableCell>
                          <TableCell>{row?.ngaySinh ? dayjs(row?.ngaySinh).format("DD/MM/YYYY") : "Không có"}</TableCell>
                          <TableCell>{row?.thuHang?.ten}</TableCell>
                          <TableCell>
                            <Chip
                              style={{color: "white"}}
                              label={row?.trangThai}
                              color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => handleUpdateKhachHangHoaDon(row)}>
                              Chọn
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Grid container justifyContent="space-between" alignItems="center" style={{display: "flex", flexDirection: "row"}}>
                    <Grid item>
                      <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange}>
                        {pageSizeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item>
                      <Pagination
                        count={totalPages}
                        page={currentPage + 1}
                        onChange={(event, page) => {
                          setCurrentPage(page - 1);
                        }}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </TableContainer>
              </MainCard>
            </DialogContent>
          </Dialog>
          <Dialog fullWidth maxWidth={"xl"} open={openThemNhanh} onClose={handleCloseThemNhanh}>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <Typography variant="body2">
                  <Grid container p={5} spacing={5}>
                    <Grid item xs={12}>
                      <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                        <Typography variant="h4" mb={2}>
                          Thêm Khách Hàng
                        </Typography>
                        <Divider sx={{marginBottom: "25px"}} />
                        <Grid container spacing={5}>
                          <Grid item xs={6}>
                            <TextField
                              label="Tên khách hàng"
                              name="ten"
                              variant="outlined"
                              fullWidth
                              required
                              style={{marginBottom: "16px", marginTop: "4px"}}
                              value={formik.values.ten}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.ten && formik.touched.ten && (
                              <Typography style={{color: "red", marginBottom: "13px"}}>{formik.errors.ten}</Typography>
                            )}
                            <TextField
                              className="css-sdt"
                              label="Số điện thoại"
                              name="sdt"
                              variant="outlined"
                              fullWidth
                              style={{marginBottom: "16px"}}
                              value={formik.values.sdt}
                              onChange={formik.handleChange}
                            />
                            <TextField
                              label="Địa chỉ"
                              name="diaChi"
                              variant="outlined"
                              fullWidth
                              style={{marginBottom: "16px"}}
                              value={formik.values.diaChi}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              style={{marginBottom: "7px"}}
                              value={formik.values.gioiTinh}
                              onChange={formik.handleChange}
                              name="gioiTinh"
                            >
                              <FormControlLabel value="false" control={<Radio />} label="Nữ" />
                              <FormControlLabel value="true" control={<Radio />} label="Nam" />
                            </RadioGroup>
                            <TextField
                              label="Ngày Sinh"
                              name="ngaySinh"
                              type={"date"}
                              focused
                              variant="outlined"
                              fullWidth
                              style={{marginBottom: "16px"}}
                              value={formik.values.ngaySinh}
                              onChange={formik.handleChange}
                            />
                            <TextField
                              label="Email"
                              name="email"
                              variant="outlined"
                              fullWidth
                              required
                              style={{marginBottom: "16px"}}
                              value={formik.values.email}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email && (
                              <Typography style={{color: "red", marginBottom: "13px"}}>{formik.errors.email}</Typography>
                            )}
                          </Grid>
                        </Grid>
                      </SubCard>
                    </Grid>
                  </Grid>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button type="submit" variant="contained">
                  Thêm Khách Hàng
                </Button>
                <Button onClick={handleCloseThemNhanh} variant="contained">
                  Đóng
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog fullWidth maxWidth={"xl"} open={openThemSanPham} onClose={handleCloseThemSanPham}>
            <DialogContent>
              <MainCard title="Chi Tiết Sản Phẩm">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <OutlinedInput
                      id="input-search-header"
                      placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm và mã sku"
                      fullWidth
                      value={searchCTSPValue}
                      onChange={(e) => {
                        setSearchCTSPValue(e.target.value);
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{"aria-label": "weight"}}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={4} style={{display: "flex", alignItems: "center"}}>
                    <Box style={{float: "right"}}>
                      <Button onClick={handleResetChiTietSanPham} variant="contained" style={{marginLeft: "280px", marginRight: "7px"}}>
                        Làm mới
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop: "5px", marginBottom: "25px"}}>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Cầu thủ</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Cầu thủ"
                        value={cauThuCTSPValue}
                        onChange={(e) => setCauThuCTSPValue(e.target.value)}
                      >
                        <MenuItem value="">Chọn cầu thủ</MenuItem>
                        {listCauThu.map((row) => (
                          <MenuItem key={row.id} value={row.id}>
                            {/*{row.id}*/}
                            {row.ten} - {row.soAo}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Thương hiệu</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Thương hiệu"
                        value={thuongHieuCTSPValue}
                        onChange={(e) => setThuongHieuCTSPValue(e.target.value)}
                      >
                        <MenuItem value="">Chọn thương hiệu</MenuItem>
                        {listThuongHieu.map((row) => (
                          <MenuItem key={row.id} value={row.id}>
                            {row.ten}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Màu sắc</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Màu sắc"
                        value={mauSacCTSPValue}
                        onChange={(e) => setMauSacCTSPValue(e.target.value)}
                      >
                        <MenuItem value="">Chọn màu sắc</MenuItem>
                        {listMauSac.map((row) => (
                          <MenuItem key={row.id} value={row.id} style={{backgroundColor: row.ma}}>
                            {row.ma}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Công nghệ</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Công nghệ"
                        value={congNgheCTSPValue}
                        onChange={(e) => setCongNgheCTSPValue(e.target.value)}
                      >
                        <MenuItem value="">Chọn công nghệ</MenuItem>
                        {listCongNghe.map((row) => (
                          <MenuItem key={row.id} value={row.id}>
                            {row.ten}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Giới tính</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Giới tính"
                        value={gioiTinhCTSPValue}
                        onChange={(e) => setGioiTinhCTSPValue(e.target.value)}
                      >
                        <MenuItem value="">Chọn giới tính</MenuItem>
                        <MenuItem value="true">Nam</MenuItem>
                        <MenuItem value="false">Nữ</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <TableContainer component={Paper}>
                  <Table style={{marginBottom: "30px"}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Ảnh sản phẩm</TableCell>
                        <TableCell>Mã sản phẩm</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Màu sắc</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Giá tiền</TableCell>
                        <TableCell align={"center"}>Hành Động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listChiTietSanPham.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row?.sanPham?.ma}</TableCell>
                          <TableCell>{row?.sanPham?.ma}</TableCell>
                          <TableCell>{row?.sanPham?.ten}</TableCell>
                          <TableCell>{row?.sanPham?.mauSac?.ma}</TableCell>
                          <TableCell>{row?.kichThuoc?.ten}</TableCell>
                          <TableCell>{row?.soLuong}</TableCell>
                          <TableCell>
                            {row?.sanPham?.gia?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" onClick={() => handleCreateHoaDonChiTiet(row)}>
                              Chọn
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Grid container justifyContent="space-between" alignItems="center" style={{display: "flex", flexDirection: "row"}}>
                    <Grid item>
                      <Select id="pageSizeSelect" value={pageSizeCTSP} onChange={handlePageSizeChangeCTSP}>
                        {pageSizeOptionsCTSP.map((optionCTSP) => (
                          <MenuItem key={optionCTSP} value={optionCTSP}>
                            {optionCTSP}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item>
                      <Pagination
                        count={totalPagesCTSP}
                        page={currentPageCTSP + 1}
                        onChange={(event, page) => {
                          setCurrentPageCTSP(page - 1);
                        }}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </TableContainer>
              </MainCard>
            </DialogContent>
          </Dialog>
        </>
      )}
    </MainCard>
  );
};

export default BanHang;
