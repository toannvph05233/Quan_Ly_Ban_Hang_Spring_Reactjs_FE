// material-ui
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TextField,
  Box
} from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import React, {useEffect, useState} from "react";
import {Avatar} from "@files-ui/react";
import {BorderColorIcon, DeleteIcon, RepartitionIcon, SearchIcon, VisibilityIcon} from "../../assets/icon/Icon";
import {useNavigate} from "react-router-dom";
import SubCard from "../../ui-component/cards/SubCard";
import { create, downloadExcel, getAll, getOne, revertOrRemove, updateById } from '../../service/CrudService';
import dayjs from "dayjs";
import ThuHangService from "../../service/ThuHangService";
import {searchKhachHang} from "../../service/KhachHangService";
import {useFormik} from "formik";
import * as Yup from "yup";
const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const KhachHang = () => {
  const [imageSource2, setImageSource2] = React.useState("broken/url");
  const [open, setOpen] = useState(false);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [listThuHang, setListThuHang] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];
  const [resetData, setResetData] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [searchTrangThai, setSearchTrangThai] = useState([]);
  const [searchThuHang, setSearchThuHang] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ten: "",
      anh: "",
      gioiTinh: "",
      ngaySinh: "",
      diaChi: "",
      sdt: "",
      email: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(5, "Tên phải lớn hơn 5 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      gioiTinh: Yup.string().required("Giới tính không được để trống"),
      ngaySinh: Yup.date()
          .max(new Date(), "Ngày sinh không thể lớn hơn ngày hiện tại")
          .required("Ngày sinh không được để trống"),
      diaChi: Yup.string()
        .min(5, "Địa chỉ phải lớn hơn 5 kí tự")
        .max(225, "Địa chỉ không dài quá 225 kí tự")
        .required("Địa chỉ không được để trống"),
      sdt: Yup.string()
        .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ. Phải bắt đầu bằng số 0 và có 10 chữ số.")
        .required("Số điện thoại không được để trống"),
      email: Yup.string()
        .min(8, "Email phải lớn hơn 8 kí tự")
        .max(225, "Email không dài quá 225 kí tự")
        .email("Email sai định dạng")
        .required("Email không được để trống")
    }),
    onSubmit: () => {
      handleCreateOrUpdateKhachHang();
    }
  });

  const createSearchParams = (filters) => {
    const searchParams = {};
    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    if (filters.searchTrangThai !== "") {
      searchParams.trangThai = filters.searchTrangThai;
    }
    if (filters.searchThuHang !== "") {
      searchParams.thuHangId = filters.searchThuHang;
    }
    return searchParams;
  };

  const fetchDataKhachHang = async () => {
    try {
      const filters = {
        searchValue,
        searchTrangThai,
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

  const fetchDataThuHang = async () => {
    const response = await ThuHangService.getAllThuHang();
    console.log(response);
    setListThuHang(response.data);
    console.log(listThuHang);
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
  }, [currentPage, pageSize, resetData, searchValue, searchTrangThai, searchThuHang]);


  const downloadExcelKhachHang = async () => {
    try {
       await downloadExcel('khach-hang',"khach_hang");
    } catch (error) {
      console.log("Error reverting KhachHang:", error);
    }
  };
  const handleCreateOrUpdateKhachHang = async () => {
    try {
      let status;
      if (formik.values.id) {
        status = await updateById(formik.values.id, "khach-hang", formik.values);
      } else {
        status = await create("khach-hang", formik.values);
        console.log("=====================", formik.values);
        console.log("=======+++++++", status);
      }
      setOpen(false);
      await fetchDataKhachHang();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "khach-hang", "remove");
      await fetchDataKhachHang();
    } catch (error) {
      console.log("Error reverting KhachHang:", error);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "khach-hang", "revert");
      await fetchDataKhachHang();
    } catch (error) {
      console.log("Error revertting KhachHang:", error);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setSearchTrangThai("");
    setSearchThuHang("");
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  const handleClickOpen = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "khach-hang");
        formik.setValues(response);
        console.log(response);
      } else {
        formik.resetForm();
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainCard title="Khách Hàng">
      <Grid container spacing={5} style={{marginBottom: "30px"}}>
        <Grid item xs={4}>
          <FormControl fullWidth size="small">
            <OutlinedInput
              id="input-search-header"
              placeholder="Tìm kiếm mã, tên, email và số điện thoại khách hàng"
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
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
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
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={searchTrangThai}
              label="Trạng Thái"
              onChange={(e) => setSearchTrangThai(e.target.value)}
            >
              <MenuItem value="">Chọn Trạng Thái</MenuItem>
              <MenuItem value={"ACTIVE"}>Hoạt Động</MenuItem>
              <MenuItem value={"INACTIVE"}>Không Hoạt Động</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={downloadExcelKhachHang} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button variant="contained" onClick={() => handleClickOpen(null)} style={{marginRight: "7px"}}>
              Thêm khách hàng
            </Button>
            <Button onClick={handleReset} variant="contained" style={{marginRight: "7px"}}>
              Làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container p={5} spacing={5}>
              <Grid item xs={4}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Ảnh Đại Diện
                  </Typography>
                  <Divider sx={{marginBottom: "25px"}} />
                  <Avatar
                    src={imageSource2}
                    style={{margin: "auto"}}
                    variant="circle"
                    onError={() => setImageSource2(fallBackImage)}
                    alt="Isabella"
                    changeLabel={"Vui lòng chọn ảnh?"}
                    onChange={(imgSource2) => setImageSource2(imgSource2)}
                  />
                </SubCard>
              </Grid>
              <Grid item xs={8}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    {formik.values?.id ? "Cập nhật Khách Hàng" : "Thêm Khách Hàng"}
                  </Typography>
                  <Divider sx={{marginBottom: "25px"}} />
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <TextField
                        label="Tên khách hàng"
                        name="ten"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px", marginTop: "4px"}}
                        value={formik.values.ten}
                        onChange={formik.handleChange}
                        error={formik.touched.ten && Boolean(formik.errors.ten)}
                        helperText={formik.touched.ten ? formik.errors.ten : ""}
                      />
                      <TextField
                        className="css-sdt"
                        label="Số điện thoại"
                        name="sdt"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px"}}
                        value={formik.values.sdt}
                        onChange={formik.handleChange}
                        error={formik.touched.sdt && Boolean(formik.errors.sdt)}
                        helperText={formik.touched.sdt ? formik.errors.sdt : ""}
                      />
                      <TextField
                        label="Địa chỉ"
                        name="diaChi"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px"}}
                        value={formik.values.diaChi}
                        onChange={formik.handleChange}
                        error={formik.touched.diaChi && Boolean(formik.errors.diaChi)}
                        helperText={formik.touched.diaChi ? formik.errors.diaChi : ""}
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
                      {formik.errors.gioiTinh && formik.touched.gioiTinh && (
                        <Typography style={{color: "red", marginBottom: "13px", fontSize: "11px", marginLeft: "13px"}}>
                          {formik.errors.gioiTinh}
                        </Typography>
                      )}
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
                        error={formik.touched.ngaySinh && Boolean(formik.errors.ngaySinh)}
                        helperText={formik.touched.ngaySinh && formik.errors.ngaySinh}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px"}}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email ? formik.errors.email : ""}
                      />
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              {formik.values?.id ? "Cập nhật Khách Hàng" : "Thêm Khách Hàng"}
            </Button>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>
      <TableContainer component={Paper}>
        <Table style={{marginBottom: "30px"}} aria-label="simple table">
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
                <TableCell>{dayjs(row?.ngaySinh).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{row?.thuHang?.ten}</TableCell>
                <TableCell>
                  <Chip
                    style={{color: "white"}}
                    label={row?.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                    color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell align={"center"}>
                  <Tooltip title="Chi tiết" placement="bottom">
                    <Button onClick={() => navigate(`chi-tiet-khach-hang/${row?.id}`)} size="small">
                      <VisibilityIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cập nhật" placement="bottom">
                    <Button onClick={() => handleClickOpen(row)} size="small">
                      <BorderColorIcon />
                    </Button>
                  </Tooltip>
                  {row?.trangThai === "ACTIVE" ? (
                    <Tooltip title="Ngừng kích hoạt" placement="bottom">
                      <Button size="small" onClick={() => handleRemove(row)}>
                        <DeleteIcon color={"error"} />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Kích hoạt" placement="bottom">
                      <Button size="small" onClick={() => handleRevert(row)}>
                        <RepartitionIcon color={"success"} />
                      </Button>
                    </Tooltip>
                  )}
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

export default KhachHang;
