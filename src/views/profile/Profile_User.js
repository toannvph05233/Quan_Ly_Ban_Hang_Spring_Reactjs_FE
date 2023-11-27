import {
  Avatar,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import SubCard from "../../ui-component/cards/SubCard";
import React, {useEffect, useState} from "react";
import {VisibilityIcon} from "../../assets/icon/Icon";
import VaiTroService from "../../service/VaiTroService";
import {useParams} from "react-router";
import {getOne, updateById} from "../../service/CrudService";
import dayjs from "dayjs";
import numeral from "numeral";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RestoreIcon from "@mui/icons-material/Restore";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SecurityIcon from "@mui/icons-material/Security";
import PropTypes from "prop-types";
import {useFormik} from "formik";

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

  const formik = useFormik({
    initialValues: {
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
    },
    onSubmit: () => {
      updateDataNhanVien();
    }
  });

  const updateDataNhanVien = async () => {
    try {
      await updateById(id, "nhan-vien", formik.values);
    } catch (e) {
      console.log("Something went wrong with " + e.message);
    }
  };
  const fetchDataVaiTro = async () => {
    const response = await VaiTroService.getALlVaiTro();
    setListVaiTro(response.data);
    console.log(listVaitro);
  };

  useEffect(() => {
    let email = localStorage.getItem("email");
    alert(email);
    const fetchDataAndResetData = async () => {
      await fetchDataVaiTro();
      if (id) {
        let response = await getOne(id, "nhan-vien");
        setNhanVien(response);
        formik.setValues(response);
        console.log(response);
      }
    };
    fetchDataAndResetData();
  }, []);

  const hinhThucBanHang = {
    ACTIVE: {label: "ACTIVE", color: "success"},
    INACTIVE: {label: "INACTIVE", color: "error"},
    PENDING: {label: "PENDING", color: "warning"}
  };

  const trangThaiHoaDon = {
    CONFIRMED: {label: "CONFIRMED", color: "success"},
    SHIPPING: {label: "SHIPPING", color: "default"},
    PENDING: {label: "PENDING", color: "warning"},
    CANCELLED: {label: "CANCELLED", color: "error"},
    APPROVED: {label: "APPROVED", color: "secondary"}
    // REVERSE: {label: "REVERSE", color: "secondary"}
  };
  function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{p: 4}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Typography component="legend" variant="body4">
      <SubCard sx={{boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Avatar
              style={{margin: "auto", width: "220px", height: "220px"}}
              alt="Remy Sharp"
              src={
                "https://github.com/TungAnhIsMe/storage_online/blob/master/Image/david_9099_make_it_photorealistic_and_at_night_dc1aeffd-043c-4ca7-a79f-d6e0da9500c3.png?raw=true"
              }
            />
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

      <Box sx={{width: "100%"}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<RestoreIcon />} iconPosition="start" label="Đơn hàng đã tạo" {...a11yProps(0)} />
          <Tab icon={<DriveFileRenameOutlineIcon />} iconPosition="start" label="Thay đổi thông tin" {...a11yProps(1)} />
          <Tab icon={<SecurityIcon />} iconPosition="start" label="Thay đổi mật khẩu" {...a11yProps(2)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <TableContainer component={Paper} sx={{marginTop: "8px"}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Mã hóa đơn</TableCell>
                  <TableCell>Ngày Tạo</TableCell>
                  <TableCell>Hình thức thanh toán</TableCell>
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
                        style={{color: "white", marginLeft: "30px"}}
                        label={hinhThucBanHang[row?.hinhThucBanHang]?.label}
                        color={hinhThucBanHang[row?.hinhThucBanHang]?.color}
                        size="medium"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        style={{color: "white"}}
                        label={trangThaiHoaDon[row?.trangThai]?.label}
                        color={trangThaiHoaDon[row?.trangThai]?.color}
                        size="medium"
                      />
                    </TableCell>
                    <TableCell>{numeral(row?.thanhTien).format("0,0")} VNĐ</TableCell>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{marginTop: "8px"}}>
            <Grid item xs={6}>
              <TextField id="filled-basic" label="Họ và tên" variant="outlined" style={{width: "calc(100%)"}} value={formik.values?.ten} onChange={formik.handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Sinh nhật" type={"date"} name="tenct" variant="outlined" focused fullWidth value={formik.values?.ngaySinh} onChange={formik.handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-basic"
                type={"number"}
                label="Số điện thoại"
                variant="outlined"
                style={{width: "calc(100%)"}}
                value={formik.values.sdt}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField id="filled-basic" label="Email" variant="outlined" style={{width: "calc(100%)"}} value={formik.values.email} onChange={formik.handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField id="filled-basic" label="Địa chỉ" variant="outlined" style={{width: "calc(100%)"}} value={formik.values.diaChi} onChange={formik.handleChange}/>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
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
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" component="label" style={{marginLeft: "322px", marginTop: "30px"}}>
            Lưu thay đổi
          </Button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container spacing={2} sx={{marginTop: "25px", display: "flex", justifyContent: "center"}}>
            <TextField id="filled-basic" label="Mật khẩu cũ" variant="outlined" style={{width: "calc(49%)"}} />
            <Container maxWidth="sm" sx={{display: "flex", justifyContent: "space-between", marginTop: "15px"}}>
              <TextField id="filled-basic" label="Mật khẩu mới" variant="outlined" style={{flex: 1}} />
              <TextField id="filled-basic" label="Xác nhận mật khẩu" variant="outlined" style={{flex: 1, marginLeft: "15px"}} />
            </Container>
            <Grid item xs={12} sx={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
              <Button variant="contained">Thay đổi</Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
      <Dialog fullWidth={fullWidth} maxWidth={"xl"} open={open} onClose={handleClose}>
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>You can set my maximum width and whether to adapt or not.</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content"
            }}
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Typography>
  );
};

export default ChiTietNhanVien;
