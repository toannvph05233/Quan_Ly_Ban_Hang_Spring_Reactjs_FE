import MainCard from "ui-component/cards/MainCard";
import {
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getAll, getAllList, getOne} from "../../service/CrudService";
import dayjs from "dayjs";
import {SearchIcon} from "../../assets/icon/Icon";
import Box from "@mui/material/Box";
import {
  congSoLuongHoaDonChiTiet,
  createHoaDonChiTietByIdHoaDon,
  truSoLuongHoaDonChiTiet,
  updateDiaChiHoaDon
} from "../../service/BanHangTaiQuayService";
import {searchChiTietSanPham} from "../../service/ChiTietSanPhamService";
import TextField from "@mui/material/TextField";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {useFormik} from "formik";
import * as Yup from "yup";

const ChiTietHoaDon = () => {
  const {id} = useParams();
  const allowedStatus = ["PENDING_CHECKOUT", "PENDING", "CONFIRMED"];
  const [openThemSanPham, setOpenThemSanPham] = useState(false);
  const [openUpdateDiaChi, setUpdateDiaChi] = useState(false);
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
  const [idChiTietSanPham, setIdChiTietSanPham] = useState({
    idCtsp: ""
  });
  const [hoaDon, setHoaDon] = useState({
    nhanVien: null,
    khachHang: null,
    ma: "",
    ngayTao: "",
    ngayMuonNhan: "",
    phanTramGiamGia: null,
    soDiemCong: null,
    soDiemTru: null,
    soTienChuyenKhoan: null,
    soTienMat: null,
    soTienVaChuyen: null,
    maGiaoDichTienMat: "",
    maGiaoDichChuyenKhoan: "",
    phuongThucThanhToan: "",
    thanhTien: null,
    diaChi: "",
    tenNguoiNhan: "",
    sdtNguoiNhan: "",
    sdtNguoiShip: "",
    hinhThucBanHang: "",
    trangThai: "",
    hoaDonChiTietList: [
      {
        chiTietSanPham: null,
        soLuong: null,
        donGia: null,
        giaBan: null,
        trangThai: ""
      }
    ],
    lichSuHoaDonList: [
      {
        nhanVien: null,
        hoaDon: null,
        ngayTao: null,
        moTa: "",
        loaiLichSuHoaDon: ""
      }
    ]
  });

  const formik = useFormik({
    initialValues: {
      diaChi: "",
      tenNguoiNhan: "",
      sdtNguoiNhan: "",
      sdtNguoiShip: "",
      ngayMuonNhanHang: null
    },
    validationSchema: Yup.object({
      diaChi: Yup.string()
        .min(5, "Địa chỉ phải lớn hơn 5 kí tự")
        .max(225, "Địa chỉ không dài quá 225 kí tự")
        .required("Địa chỉ không được để trống"),
      tenNguoiNhan: Yup.string()
        .min(5, "Họ tên phải lớn hơn 5 kí tự")
        .max(225, "Họ tên không dài quá 225 kí tự")
        .required("Họ tên không được để trống"),
      sdtNguoiNhan: Yup.string()
        .matches(/^0\d{9}$/, "Số điện thoại người nhận không hợp lệ. Phải bắt đầu bằng số 0 và có 10 chữ số.")
        .required("Số điện thoại người nhận không được để trống"),
      sdtNguoiShip: Yup.string()
        .matches(/^0\d{9}$/, "Số điện thoại người nhận không hợp lệ. Phải bắt đầu bằng số 0 và có 10 chữ số.")
        .required("Số điện thoại người nhận không được để trống"),
      ngayMuonNhanHang: Yup.date()
        .min(new Date(), "Ngày sinh không thể nhỏ hơn ngày hiện tại")
        .required("Ngày muốn nhận hàng không được để trống")
    }),
    onSubmit: () => {
      console.log("pokokkook,k")
      handleUpdateDiaChiHoaDon();
      console.log("abc");
    }
  });

  // const [diaChiHoaDon, setDiaChiHoaDon] = useState({
  //   diaChi: '',
  //   tenNguoiNhan: '',
  //   sdtNguoiNhan: '',
  //   sdtNguoiShip: '',
  //   ngayMuonNhanHang: '',
  // });

  const getOneDataHoaDon = async () => {
    let response = await getOne(id, "hoa-don");
    setHoaDon(response);
  };
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await getOneDataHoaDon();
    };
    fetchDataAndResetData();
  }, [id]);

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

  const handleCloseThemSanPham = () => {
    setOpenThemSanPham(false);
  };

  const handleCreateHoaDonChiTiet = async (post) => {
    try {
      setIdChiTietSanPham({idCtsp: post.id});
      await createHoaDonChiTietByIdHoaDon(id, {idCtsp: idChiTietSanPham.idCtsp});
      await getOneDataHoaDon();
      setOpenThemSanPham(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTruSoLuongHoaDonChiTiet = async (post) => {
    try {
      await truSoLuongHoaDonChiTiet(post.id);
      await getOneDataHoaDon();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCongSoLuongHoaDonChiTiet = async (post) => {
    try {
      await congSoLuongHoaDonChiTiet(post.id);
      await getOneDataHoaDon();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDiaChiHoaDon = async () => {
    try {
      console.log(formik.values);
      const status = await updateDiaChiHoaDon(id, formik.values);

      if (status === 201) {
        console.log(formik.values);
      }
      await getOneDataHoaDon();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
    // try {
    //   await updateDiaChiHoaDon(formik.values.id, formik.values);
    //   console.log(formik.values);
    //   await getOneDataHoaDon();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleClickOpenThemSanPham = () => {
    setOpenThemSanPham(true);
  };

  const handleClickOpenUpdateDiaChi = async () => {
    try {
      const response = await getOne(id, "hoa-don");
      formik.setValues(response);
      // console.log(response);
      setUpdateDiaChi(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseUpdateDiaChi = () => {
    setUpdateDiaChi(false);
  };

  const hinhThucBanHang = {
    STORE: {label: "STORE", color: "#00CC00"},
    DELIVERY: {label: "DELIVERY", color: "#CC6600"},
    ONLINE: {label: "ONLINE", color: "#0033CC"}
  };
  const hinhThucBanHangTranslations = {
    STORE: "Bán tại cửa hàng",
    DELIVERY: "Bán taị cửa hàng và giao hàng",
    ONLINE: "Bán trên web"
  };
  const trangThaiHoaDon = {
    PENDING_CHECKOUT: {label: "PENDING_CHECKOUT", color: "#FF0099"},
    PENDING: {label: "PENDING", color: "orange"},
    CONFIRMED: {label: "CONFIRMED", color: "green"},
    SHIPPING: {label: "SHIPPING", color: "Black"},
    CANCELLED: {label: "CANCELLED", color: "red"},
    APPROVED: {label: "APPROVED", color: "purple"},
    REVERSE: {label: "REVERSE", color: "gray"}
  };
  const trangThaiTranslations = {
    PENDING_CHECKOUT: "Chờ thanh toán",
    PENDING: "Đang chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang vận chuyển",
    CANCELLED: "Đã huỷ",
    APPROVED: "Đã hoàn thành",
    REVERSE: "Đã trả hàng"
  };

  return (
    <MainCard title="Chi tiết hóa đơn">
      <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Typography variant={"h4"}>Lịch sử hoá đơn</Typography>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã hoá đơn</TableCell>
                <TableCell>Loại lịch sử hoá đơn</TableCell>
                <TableCell>Loại hoá đơn</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell align={"center"}>Người xác nhận</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hoaDon.lichSuHoaDonList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row?.hoaDon?.ma}</TableCell>
                  <TableCell>{row?.loaiLichSuHoaDon}</TableCell>
                  <TableCell>{row?.hoaDon?.hinhThucBanHang}</TableCell>
                  <TableCell>{row?.moTa}</TableCell>
                  <TableCell>{dayjs(row?.ngayTao).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                  <TableCell>{row?.nhanVien?.ten}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SubCard>
      <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Typography variant={"h4"}>Lịch sử thanh toán</Typography>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Hình thức thanh toán</TableCell>
                <TableCell>Tiền mặt</TableCell>
                <TableCell>Tiền chuyển khoản</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell align={"center"}>Người xác nhận</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{hoaDon.khachHang?.ten}</TableCell>
                <TableCell>{hoaDon.phuongThucThanhToan}</TableCell>
                <TableCell>
                  {hoaDon?.soTienMat?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </TableCell>
                <TableCell>
                  {hoaDon?.soTienChuyenKhoan?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </TableCell>
                <TableCell>{hoaDon.ngayTao}</TableCell>
                <TableCell>{hoaDon.nhanVien?.ten}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubCard>
      <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Grid container style={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
          <Grid item xs={6}>
            <Typography variant={"h4"} style={{float: "left"}}>
              Thông tin đơn hàng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {allowedStatus.includes(hoaDon.trangThai) && (
              <Button variant="contained" style={{float: "right"}} onClick={() => handleClickOpenUpdateDiaChi()}>
                Cập nhật địa chỉ
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Typography variant={"h5"} style={{marginTop: "30px"}}>
              Mã hóa đơn:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              {" "}
              Trạng thái:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "30px"}}>
              Hình thức bán hàng:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              Ngày tạo:{" "}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h5"} style={{marginTop: "30px"}}>
              {" "}
              {hoaDon.ma}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              <Chip
                style={{color: "white", backgroundColor: trangThaiHoaDon[hoaDon?.trangThai]?.color}}
                label={trangThaiTranslations[hoaDon?.trangThai] || trangThaiHoaDon[hoaDon?.trangThai]?.label}
                size="small"
              />
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              <Chip
                style={{color: "white", backgroundColor: hinhThucBanHang[hoaDon?.hinhThucBanHang]?.color}}
                label={hinhThucBanHangTranslations[hoaDon?.hinhThucBanHang] || hinhThucBanHang[hoaDon?.hinhThucBanHang]?.label}
                size="small"
              />
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              {dayjs(hoaDon?.ngayTao).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              {" "}
              Tên người nhận:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              Số điện thoại người nhận:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "25px"}}>
              Ngày muốn nhận:{" "}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "30px"}}>
              Địa chỉ nhận hàng:{" "}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              {hoaDon.tenNguoiNhan}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "20px"}}>
              {hoaDon.sdtNguoiNhan}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "25px"}}>
              {dayjs(hoaDon?.ngayMuonNhan).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant={"h5"} style={{marginTop: "30px"}}>
              {" "}
              {hoaDon.diaChi}
            </Typography>
          </Grid>
        </Grid>
      </SubCard>
      <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Grid container style={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
          <Grid item xs={6}>
            <Typography variant={"h4"} style={{float: "left"}}>
              Giỏ hàng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {allowedStatus.includes(hoaDon.trangThai) && (
              <Button variant="contained" onClick={() => handleClickOpenThemSanPham()} style={{float: "right"}}>
                Thêm Sản Phẩm
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider />
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
                <TableCell>Trạng thái</TableCell>
                <TableCell align={"center"}>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hoaDon.hoaDonChiTietList.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.chiTietSanPham?.sanPham?.ma}</TableCell>
                  <TableCell>{row?.chiTietSanPham?.sanPham?.ten}</TableCell>
                  <TableCell>{row?.chiTietSanPham?.kichThuoc.ten}</TableCell>
                  <TableCell align={"center"}>
                    {allowedStatus.includes(hoaDon.trangThai) && (
                      <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained">
                        <Button onClick={() => handleTruSoLuongHoaDonChiTiet(row)}>-</Button>
                      </ButtonGroup>
                    )}
                    <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="text">
                      <Button key="one">{row?.soLuong}</Button>
                    </ButtonGroup>
                    {allowedStatus.includes(hoaDon.trangThai) && (
                      <ButtonGroup orientation="vertical" aria-label="vertical outlined button group" variant="contained">
                        <Button onClick={() => handleCongSoLuongHoaDonChiTiet(row)}>+</Button>
                      </ButtonGroup>
                    )}
                  </TableCell>
                  <TableCell>{row?.giaBan?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                  <TableCell>{row?.donGia?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                  <TableCell>
                    <Chip
                      style={{color: "white"}}
                      label={row?.trangThai === "APPROVED" ? "Đã xác nhận" : "Đã hoàn trả"}
                      color={row?.trangThai === "APPROVED" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align={"center"}>
                    <Button variant="contained" color="error">
                      Trả hàng
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SubCard>
      <Grid container spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={2}>
          <Typography variant={"h3"} style={{marginTop: "20px", color: "red"}}>
            {" "}
            Tổng tiền hàng
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "20px"}}>
            Phí vận chuyển
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "30px"}}>
            {" "}
            Giảm giá
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "40px"}}>
            {" "}
            Thanh toán bằng điểm
          </Typography>
          <Typography variant={"h2"} style={{marginTop: "20px", color: "red"}}>
            {" "}
            Tiền khách cần trả
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={"h3"} style={{marginTop: "20px", color: "red"}}>
            10000000
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "20px"}}>
            30.0000
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "30px"}}>
            20%
          </Typography>
          <Typography variant={"h5"} style={{marginTop: "40px"}}>
            30 điểm
          </Typography>
          <Typography variant={"h2"} style={{marginTop: "20px", color: "red"}}>
            10000000
          </Typography>
        </Grid>
      </Grid>

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

      <Dialog fullWidth maxWidth={"lg"} open={openUpdateDiaChi} onClose={handleCloseUpdateDiaChi}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Typography variant={"h4"}>Cập nhật địa chỉ giao hàng</Typography>
            <Box style={{marginTop: "20px"}}>
              <TextField
                label="Họ tên"
                name="tenNguoiNhan"
                sx={{marginRight: "20px", width: "49%"}}
                value={formik.values.tenNguoiNhan}
                onChange={formik.handleChange}
                error={formik.touched.tenNguoiNhan && Boolean(formik.errors.tenNguoiNhan)}
                helperText={formik.touched.tenNguoiNhan ? formik.errors.tenNguoiNhan : ""}
              />
              <TextField
                label="Số điện thoại người nhận"
                sx={{width: "49%"}}
                name="sdtNguoiNhan"
                value={formik.values.sdtNguoiNhan}
                onChange={formik.handleChange}
                error={formik.touched.sdtNguoiNhan && Boolean(formik.errors.sdtNguoiNhan)}
                helperText={formik.touched.sdtNguoiNhan ? formik.errors.sdtNguoiNhan : ""}
              />
            </Box>

            <Box style={{marginTop: "20px"}}>
              <TextField
                label="Số điện thoại người ship"
                sx={{marginRight: "20px", width: "49%"}}
                name="sdtNguoiShip"
                value={formik.values.sdtNguoiShip}
                onChange={formik.handleChange}
                error={formik.touched.sdtNguoiShip && Boolean(formik.errors.sdtNguoiShip)}
                helperText={formik.touched.sdtNguoiShip ? formik.errors.sdtNguoiShip : ""}
              />
              <TextField
                label="Ngày muốn nhận hàng"
                name="ngayMuonNhanHang"
                type={"date"}
                focused
                variant="outlined"
                fullWidth
                style={{width: "49%"}}
                value={formik.values.ngayMuonNhanHang}
                onChange={formik.handleChange}
                error={formik.touched.ngayMuonNhanHang && Boolean(formik.errors.ngayMuonNhanHang)}
                helperText={formik.touched.ngayMuonNhanHang ? formik.errors.ngayMuonNhanHang : ""}
              />
            </Box>
            <TextField
              fullWidth
              label="Địa Chỉ"
              id="fullWidth"
              sx={{marginTop: "20px"}}
              name="diaChi"
              value={formik.values.diaChi}
              onChange={formik.handleChange}
              error={formik.touched.diaChi && Boolean(formik.errors.diaChi)}
              helperText={formik.touched.diaChi ? formik.errors.diaChi : ""}
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
          </DialogContent>
          <Box style={{textAlign: "center"}}>
            <Button type="submit" variant="contained" style={{width: "100px"}}>
              Cập nhật
            </Button>
          </Box>
        </form>
        <DialogActions>
          <Button onClick={handleCloseUpdateDiaChi}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ChiTietHoaDon;
