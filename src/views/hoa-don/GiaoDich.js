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
import {SearchIcon, VisibilityIcon} from "../../assets/icon/Icon";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {downloadExcel, getAll} from "../../service/CrudService";
import {searchGiaoDich} from "../../service/GiaoDichService";

const GiaoDich = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [maGiaoDichValue, setMaGiaoDichValue] = useState([]);
  const [ngayTaoMinValue, setNgayTaoMinValue] = useState([]);
  const [ngayTaoMaxValue, setNgayTaoMaxValue] = useState([]);
  const [phuongThucThanhToanValue, setPhuongThucThanhToanValue] = useState([]);
  const [listGiaoDich, setListGiaoDich] = useState([]);
  const [resetData, setResetData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];

  const handleSearchParams = (filters) => {
    const searchParams = {};

    if (filters.searchValue !== "") {
      searchParams.searchTenOrMa = filters.searchValue;
    }
    if (filters.maGiaoDichValue !== "") {
      searchParams.maGiaoDich = filters.maGiaoDichValue;
    }
    if (filters.ngayTaoMinValue !== "") {
      searchParams.ngayTaoMin = filters.ngayTaoMinValue;
    }
    if (filters.ngayTaoMaxValue !== "") {
      searchParams.ngayTaoMax = filters.ngayTaoMaxValue;
    }
    if (filters.phuongThucThanhToanValue !== "") {
      searchParams.phuongThucThanhToan = filters.phuongThucThanhToanValue;
    }
    return searchParams;
  };
  const fetchDataGiaoDich = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const filters = {
        searchValue,
        maGiaoDichValue,
        ngayTaoMinValue,
        ngayTaoMaxValue,
        phuongThucThanhToanValue
      };
      const searchParams = handleSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchGiaoDich(
          searchParams.searchTenOrMa,
          searchParams.maGiaoDich,
          searchParams.ngayTaoMin,
          searchParams.ngayTaoMax,
          searchParams.phuongThucThanhToan,
          currentPage,
          pageSize
        );
      } else {
        // Xử lý khi không có điều kiện fillter nào được áp dụng
        response = await getAll(currentPage, pageSize, "hoa-don");
        console.log(listGiaoDich);
      }
      setListGiaoDich(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataGiaoDich();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataAndResetData();
  }, [currentPage, pageSize, resetData, searchValue, ngayTaoMinValue, ngayTaoMaxValue, phuongThucThanhToanValue, maGiaoDichValue]);

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
    setMaGiaoDichValue("");
    setPhuongThucThanhToanValue("");
  };

  const tongGiaoDichTienMat = listGiaoDich.reduce((total, item) => total + item.soTienMat, 0);

  const tongGiaoDichChuyenKhoan = listGiaoDich.reduce((total, item) => total + item.soTienChuyenKhoan, 0);

  let tongGiaoDich = tongGiaoDichTienMat + tongGiaoDichChuyenKhoan;

  const downloadExcelGiaoDich = async () => {
    try {
      await downloadExcel("hoa-don", "giao-dich");
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
    <MainCard title="Giao dịch">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OutlinedInput
            id="input-search-header"
            placeholder="Tìm kiếm mã hoá đơn, tên khách hàng, tên nhân viên"
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
        <Grid item xs={6}>
          <OutlinedInput
            id="input-search-header"
            placeholder="Tìm kiếm mã giao dịch"
            fullWidth
            value={maGiaoDichValue}
            onChange={(e) => {
              setMaGiaoDichValue(e.target.value);
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
      </Grid>
      <Grid container spacing={2} style={{marginTop: "15px"}}>
        <Grid item xs={5}>
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
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">Hình thức thanh toán</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Hình thức bán hàng"
              value={phuongThucThanhToanValue}
              onChange={(e) => setPhuongThucThanhToanValue(e.target.value)}
            >
              <MenuItem value="">Chọn hình thức thanh toán</MenuItem>
              <MenuItem value="CASH">Tiền mặt</MenuItem>
              <MenuItem value="BANKING">Chuyển khoản</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={downloadExcelGiaoDich} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button onClick={handleReset} variant="contained">
              Làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h2" style={{textAlign: "center", marginTop: "30px", color: "red"}}>
        Tổng giá trị hoá đơn: {tongGiaoDich?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
      </Typography>
      <Box style={{display: "flex"}}>
        <Typography variant="h2" style={{textAlign: "center", width: "50%", marginTop: "30px", color: "red"}}>
          Tổng giao dịch tiền mặt: {tongGiaoDichTienMat?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
        </Typography>
        <Typography variant="h2" style={{textAlign: "center", width: "50%", marginTop: "30px", color: "red"}}>
          Tổng giao dịch chuyển khoản: {tongGiaoDichChuyenKhoan?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
        </Typography>
      </Box>
      <TableContainer component={Paper} style={{marginTop: "30px"}}>
        <Table sx={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã hoá đơn</TableCell>
              <TableCell>Nhân viên</TableCell>
              <TableCell>Khách Hàng</TableCell>
              <TableCell>Mã giao dịch tiền mặt</TableCell>
              <TableCell>Số tiền mặt</TableCell>
              <TableCell>Mã giao dịch chuyển khoản</TableCell>
              <TableCell>Số tiền chuyển khoản</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align={"center"}>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listGiaoDich.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>{row?.nhanVien?.ten}</TableCell>
                <TableCell>{row?.khachHang?.ma}</TableCell>
                <TableCell>{row?.maGiaoDichTienMat}</TableCell>
                <TableCell>{row?.soTienMat?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                <TableCell>{row?.maGiaoDichChuyenKhoan}</TableCell>
                <TableCell>{row?.soTienChuyenKhoan?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                <TableCell>
                  <Chip
                    style={{color: "white", backgroundColor: trangThaiHoaDon[row?.trangThai]?.color}}
                    label={trangThaiTranslations[row?.trangThai] || trangThaiHoaDon[row?.trangThai]?.label}
                    size="small"
                  />
                </TableCell>
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

export default GiaoDich;
