import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import SubCard from "../../ui-component/cards/SubCard";
import React, {useEffect, useState} from "react";
import {VisibilityIcon} from "../../assets/icon/Icon";
import VaiTroService from "../../service/VaiTroService";
import {useParams} from "react-router";
import {getOne} from "../../service/CrudService";
import dayjs from "dayjs";

const ChiTietNhanVien = () => {
  const [listVaitro, setListVaiTro] = useState([]);
  const {id} = useParams();
  const [nhanVien, setNhanVien] = useState({
    vaiTro: "",
    ma: "",
    ten: "",
    anh: "",
    gioiTinh: "",
    ngaySinh: "",
    diaChi: "",
    sdt: "",
    soCanCuocCongDan: "",
    email: "",
    trangThai: "",
    hoaDonList: [
      {
        khachHang: null,
        nhanVien: null,
        ma: "",
        ngayTao: "",
        ngayMuonNhan: "",
        thanhTien: null,
        tenNguoiNhan: "",
        diaChi: "",
        sdtNguoiNhan: "",
        sdtNguoiShip: "",
        phanTramGiamGia: null,
        hinhThucBanHang: "",
        trangThai: ""
      }
    ]
  });

  const fetchDataVaiTro = async () => {
    const response = await VaiTroService.getALlVaiTro();
    setListVaiTro(response.data);
    console.log(listVaitro);
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataVaiTro();
      if (id) {
        let response = await getOne(id, "nhan-vien");
        setNhanVien(response);
        console.log(response);
      }
    };
    fetchDataAndResetData();
  }, []);

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

  console.log(nhanVien);
  const imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU";
  return (
    <Typography component="legend" variant="body4">
      <SubCard sx={{boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Avatar style={{margin: "auto", width: "220px", height: "220px"}} alt="Remy Sharp" src={imageSrc} />
          </Grid>
          <Grid item xs={8} style={{margin: "auto"}}>
            <Typography variant="h1" gutterBottom>
              {nhanVien.ten}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography component="legend" mt={2}>
                  Mã nhân viên:
                </Typography>
                <Typography component="legend" mt={2}>
                  Giới Tính:
                </Typography>
                <Typography component="legend" mt={2}>
                  Ngày sinh:
                </Typography>
                <Typography component="legend" mt={2}>
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component="legend" mt={2}>
                  {nhanVien.ma}
                </Typography>
                <Typography component="legend" mt={2}>
                  {nhanVien.gioiTinh ? "Nam" : "Nữ"}
                </Typography>
                <Typography component="legend" mt={2}>
                  {dayjs(nhanVien?.ngaySinh).format("DD/MM/YYYY")}
                </Typography>
                <Typography component="legend" mt={2}>
                  {nhanVien.sdt}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component="legend" mt={2}>
                  Email:
                </Typography>
                <Typography component="legend" mt={2}>
                  Số căn cước công dân:
                </Typography>
                <Typography component="legend" mt={2}>
                  Vai trò:
                </Typography>
                <Typography component="legend" mt={2}>
                  Trạng thái:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography component="legend" mt={2}>
                  {nhanVien.email}
                </Typography>
                <Typography component="legend" mt={2}>
                  {nhanVien.soCanCuocCongDan}
                </Typography>
                <Typography component="legend" mt={2}>
                  {nhanVien.vaiTro.ten}
                </Typography>
                <Typography component="legend" mt={2}>
                  {nhanVien.trangThai}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography component="legend" mt={2}>
                  Địa chỉ:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography component="legend" mt={2}>
                  {nhanVien.diaChi}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SubCard>

      <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Typography variant="h3" mb={2}>
          Đơn Hàng Đã Tạo
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hình thức bán hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thành tiền</TableCell>
                <TableCell>Hoạt động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nhanVien.hoaDonList.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.ma}</TableCell>
                  <TableCell>{row?.ngayTao}</TableCell>
                  <TableCell>
                    <Chip
                      style={{color: "white", backgroundColor: hinhThucBanHang[row?.hinhThucBanHang]?.color}}
                      label={hinhThucBanHangTranslations[row?.hinhThucBanHang] || hinhThucBanHang[row?.hinhThucBanHang]?.label}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      style={{color: "white", backgroundColor: trangThaiHoaDon[row?.trangThai]?.color}}
                      label={trangThaiTranslations[row?.trangThai] || trangThaiHoaDon[row?.trangThai]?.label}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row?.thanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                  <TableCell>
                    <Tooltip title="Chi tiết" placement="bottom">
                      <Button size="small">
                        <VisibilityIcon />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SubCard>
    </Typography>
  );
};

export default ChiTietNhanVien;
