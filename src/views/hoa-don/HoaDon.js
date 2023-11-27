import MainCard from "ui-component/cards/MainCard";
import {
  Box,
  Button,
  Chip,
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
  Tooltip,
  Typography
} from "@mui/material";
import {BorderColorIcon, SearchIcon, VisibilityIcon} from "../../assets/icon/Icon";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {downloadExcel, getAll} from "../../service/CrudService";
import {searchHoaDon} from "../../service/HoaDonService";
import {useNavigate} from "react-router-dom";

const HoaDon = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [ngayTaoMinValue, setNgayTaoMinValue] = useState([]);
  const [ngayTaoMaxValue, setNgayTaoMaxValue] = useState([]);
  const [hinhThucBanHangValue, setHinhThucBanHangValue] = useState([]);
  const [trangThaiValue, setTrangThaiValue] = useState([]);
  const [listHoaDon, setListHoaDon] = useState([]);
  const [resetData, setResetData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];
  const navigate = useNavigate();
  const handleSearchParams = (filters) => {
    const searchParams = {};

    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    if (filters.ngayTaoMinValue !== "") {
      searchParams.ngayTaoMin = filters.ngayTaoMinValue;
    }
    if (filters.ngayTaoMaxValue !== "") {
      searchParams.ngayTaoMax = filters.ngayTaoMaxValue;
    }
    if (filters.hinhThucBanHangValue !== "") {
      searchParams.hinhThucBanHang = filters.hinhThucBanHangValue;
    }
    if (filters.trangThaiValue !== "") {
      searchParams.trangThai = filters.trangThaiValue;
    }
    return searchParams;
  };
  const fetchDataHoaDon = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const filters = {
        searchValue,
        ngayTaoMinValue,
        ngayTaoMaxValue,
        hinhThucBanHangValue,
        trangThaiValue
      };
      const searchParams = handleSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchHoaDon(
          searchParams.search,
          searchParams.ngayTaoMin,
          searchParams.ngayTaoMax,
          searchParams.hinhThucBanHang,
          searchParams.trangThai,
          currentPage,
          pageSize
        );
      } else {
        // Xử lý khi không có điều kiện fillter nào được áp dụng
        response = await getAll(currentPage, pageSize, "hoa-don");
        console.log(listHoaDon);
      }
      setListHoaDon(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataHoaDon();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataAndResetData();
  }, [currentPage, pageSize, resetData, searchValue, ngayTaoMinValue, ngayTaoMaxValue, hinhThucBanHangValue, trangThaiValue]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setNgayTaoMaxValue("");
    setNgayTaoMinValue("");
    setHinhThucBanHangValue("");
    setTrangThaiValue("");
  };

  const thanhTienConfirmed = listHoaDon.filter((item) => item.trangThai === "CONFIRMED").reduce((total, item) => total + item.thanhTien, 0);

  const thanhTienAPPROVED = listHoaDon.filter((item) => item.trangThai === "APPROVED").reduce((total, item) => total + item.thanhTien, 0);

  const thanhTien = listHoaDon.reduce((total, item) => total + item.thanhTien, 0);

  const downloadExcelHoaDon = async () => {
    try {
      await downloadExcel("hoa-don", "hoa_don");
    } catch (error) {
      console.log("Error reverting HoaDon:", error);
    }
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
    <MainCard title="Hóa Đơn">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <OutlinedInput
            id="input-search-header"
            placeholder="Tìm kiếm mã hoá đơn, tên khách hàng, tên nhân viên, số điện thoại người nhận, tên người nhận "
            fullWidth
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
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Từ ngày"
            type={"date"}
            name="tenct"
            variant="outlined"
            focused
            style={{width: "48%"}}
            required
            value={ngayTaoMinValue}
            onChange={(e) => setNgayTaoMinValue(e.target.value)}
          />
          <TextField
            label="Đến ngày"
            type={"date"}
            name="tenct"
            variant="outlined"
            focused
            style={{width: "48%", marginLeft: "10px"}}
            required
            value={ngayTaoMaxValue}
            onChange={(e) => setNgayTaoMaxValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">Hình thức bán hàng</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Hình thức bán hàng"
              value={hinhThucBanHangValue}
              onChange={(e) => setHinhThucBanHangValue(e.target.value)}
            >
              <MenuItem value="">Chọn hình thức bán hàng</MenuItem>
              <MenuItem value="STORE">Bán tại quầy</MenuItem>
              <MenuItem value="DELIVERY">Bán tại quầy, giao hàng</MenuItem>
              <MenuItem value="ONLINE">Bán trên web</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth style={{width: "170px"}}>
            <InputLabel id="demo-select-small-label">Trạng thái hoá đơn</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Hình thức bán hàng"
              value={trangThaiValue}
              onChange={(e) => setTrangThaiValue(e.target.value)}
            >
              <MenuItem value="">Chọn trạng thái hoá đơn</MenuItem>
              <MenuItem value="PENDING">Đang chờ xác nhận</MenuItem>
              <MenuItem value="CONFIRMED">Đã xác nhận</MenuItem>
              <MenuItem value="SHIPPING">Đang vận chuyển</MenuItem>
              <MenuItem value="CANCELLED">Đã huỷ</MenuItem>
              <MenuItem value="APPROVED">Đã hoàn thành</MenuItem>
              <MenuItem value="REVERSE">Đã trả hàng</MenuItem>
            </Select>
          </FormControl>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={downloadExcelHoaDon} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button onClick={handleReset} variant="contained">
              Làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h2" style={{textAlign: "center", marginTop: "30px", color: "red"}}>
        Tổng giá trị hoá đơn: {thanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
      </Typography>
      <Box style={{display: "flex"}}>
        <Typography variant="h2" style={{textAlign: "center", width: "50%", marginTop: "30px", color: "red"}}>
          Tổng giá trị hoá đơn đã thanh toán: {thanhTienAPPROVED?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
        </Typography>
        <Typography variant="h2" style={{textAlign: "center", width: "50%", marginTop: "30px", color: "red"}}>
          Tổng giá trị hoá đơn chờ: {thanhTienConfirmed?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
        </Typography>
      </Box>

      <TableContainer component={Paper} style={{marginTop: "30px"}}>
        <Table sx={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã hoá đơn</TableCell>
              <TableCell>Tên nhân viên</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Số điện thoại người nhận</TableCell>
              <TableCell>Tên người nhận</TableCell>
              <TableCell>Thành tiền</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align={"center"}>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHoaDon.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>{row?.nhanVien?.ten}</TableCell>
                <TableCell>{row?.khachHang?.ten}</TableCell>
                <TableCell>{row?.sdtNguoiNhan}</TableCell>
                <TableCell>{row?.tenNguoiNhan}</TableCell>
                <TableCell>{row?.thanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                <TableCell>{row?.ngayTao}</TableCell>
                <TableCell>
                  {/*{row?.trangThai}*/}
                  <Chip
                    style={{color: "white", backgroundColor: trangThaiHoaDon[row?.trangThai]?.color}}
                    label={trangThaiTranslations[row?.trangThai] || trangThaiHoaDon[row?.trangThai]?.label}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Chi tiết" placement="bottom">
                    <Button onClick={() => navigate(`chi-tiet-hoa-don/${row.id}`)} size="small">
                      <VisibilityIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cập nhật" placement="bottom">
                    <Button size="small">
                      <BorderColorIcon />
                    </Button>
                  </Tooltip>
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
  );
};

export default HoaDon;
