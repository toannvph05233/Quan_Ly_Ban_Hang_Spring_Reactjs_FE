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
  Pagination,
  TextField,
  Snackbar,
  Stack,
  Modal
} from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import React, {useEffect, useState} from "react";
import {Avatar} from "@files-ui/react";
import {BorderColorIcon, DeleteIcon, RepartitionIcon, SearchIcon, VisibilityIcon} from "../../assets/icon/Icon";
import {useNavigate} from "react-router-dom";
import SubCard from "../../ui-component/cards/SubCard";
import VaiTroService from "../../service/VaiTroService";
import {getAll, getOne, revertOrRemove, updateById, create, downloadExcel} from "../../service/CrudService";
import dayjs from "dayjs";
import {searchNhanVien} from "../../service/NhanVienService";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Alert} from "@mui/lab";
import Box from "@mui/material/Box";

const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const NhanVien = () => {
  const [imageSource2, setImageSource2] = React.useState("broken/url");
  const [open, setOpen] = useState(false);
  const [listNhanVien, setListNhanVien] = useState([]);
  const [listVaiTro, setListVaiTro] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];
  const [resetData, setResetData] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [searchTrangThai, setSearchTrangThai] = useState([]);
  const [searchVaiTro, setSearchVaiTro] = useState([]);
  const navigate = useNavigate();
  // const {id} = useParams();
  const formik = useFormik({
    initialValues: {
      vaiTro: null,
      ten: "",
      anh: "",
      gioiTinh: "",
      ngaySinh: "",
      diaChi: "",
      sdt: "",
      soCanCuocCongDan: "",
      email: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(5, "Tên phải lớn hơn 5 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      gioiTinh: Yup.string().required("Giới tính không được để trống"),
      ngaySinh: Yup.date()
        .max(new Date(), "Ngày sinh không thể lớn hơn ngày hiện tại")
        .test("is-over-18", "Bạn phải trên 18 tuổi để đăng ký", function (value) {
          const birthDate = new Date(value);
          const now = new Date();
          let age = now.getFullYear() - birthDate.getFullYear();
          if (now.getMonth() < birthDate.getMonth() || (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())) {
            age--;
          }
          return age >= 18;
        })
        .required("Ngày sinh là không được để trống"),
      diaChi: Yup.string()
        .min(5, "Địa chỉ phải lớn hơn 5 kí tự")
        .max(225, "Địa chỉ không dài quá 225 kí tự")
        .required("Địa chỉ không được để trống"),
      sdt: Yup.string()
        .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ. Phải bắt đầu bằng số 0 và có 10 chữ số.")
        .required("Số điện thoại không được để trống"),
      soCanCuocCongDan: Yup.string()
        .matches(/^\d{12}$/, "Số căn cước công dân không hợp lệ. Phải có 12 chữ số.")
        .required("Số căn cước công dân không được để trống"),
      email: Yup.string()
        .min(8, "Email phải lớn hơn 8 kí tự")
        .max(225, "Email không dài quá 225 kí tự")
        .email("Email sai định dạng")
        .required("Email không được để trống"),
      vaiTro: Yup.object().nullable().required("Vai trò không được để trống")
    }),
    onSubmit: () => {
      handleCreateOrUpdateNhanNien();
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
    if (filters.searchVaiTro !== "") {
      searchParams.vaiTroId = filters.searchVaiTro;
    }
    return searchParams;
  };

  const fetchDataNhanVien = async () => {
    try {
      const filters = {
        searchValue,
        searchTrangThai,
        searchVaiTro
      };
      const searchParams = createSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchNhanVien(
          searchParams.search,
          searchParams.trangThai,
          searchParams.vaiTroId,
          currentPage,
          pageSize,
          "nhan-vien"
        );
      } else {
        response = await getAll(currentPage, pageSize, "nhan-vien");
      }
      setListNhanVien(response.content);
      setTotalPages(response.totalPages);
      console.log(listNhanVien);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const fetchdataVaiTro = async () => {
    const response = await VaiTroService.getALlVaiTro();
    setListVaiTro(response.data.content);
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataNhanVien();
      await fetchdataVaiTro();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataAndResetData();
  }, [currentPage, pageSize, resetData, searchValue, searchTrangThai, searchVaiTro]);

  // add / update nhan vien
  const handleCreateOrUpdateNhanNien = async () => {
    try {
      if (formik.values.id) {
        setOpen(false);
        await updateById(formik.values.id, "nhan-vien", formik.values);
        await fetchDataNhanVien();
      } else {
        setOpen(false);
        await create("nhan-vien", formik.values);
        await fetchDataNhanVien();
      }
      setOpen(false);
      await fetchDataNhanVien();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "nhan-vien", "remove");
      await fetchDataNhanVien();
    } catch (error) {
      console.log("Error reverting NhanVien:", error);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "nhan-vien", "revert");
      await fetchDataNhanVien();
    } catch (error) {
      console.log("Error revertting NhanVien:", error);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setSearchTrangThai("");
    setSearchVaiTro("");
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  // Xử lý thay đổi vai trò
  const handleChangeVaiTro = (e) => {
    const vaiTroId = e.target.value;
    const vaiTroDuocChon = listVaiTro.find((vaiTro) => vaiTro.id === vaiTroId);
    formik.setValues((prevState) => ({
      ...prevState,
      vaiTro: vaiTroDuocChon || ""
    }));
  };

  const handleClickOpen = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "nhan-vien");
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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClickk = () => {
    setOpenSnackbar(true);
    return setOpenModal(false);
  };

  const handleClosee = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (openSnackbar) {
      const timeout = setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [openSnackbar]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    border: "none",
    boxShadow: 24,
    p: 4
  };
  const [openModal, setOpenModal] = useState(false);

  const handleClosen = () => setOpenModal(false);

  const downloadExcelNhanVien = async () => {
    try {
      await downloadExcel('nhan-vien',"nhan-vien");
    } catch (error) {
      console.log("Error reverting NhanVien:", error);
    }
  };

  return (
    <MainCard title="Nhân Viên">
      <Grid container spacing={5} style={{marginBottom: "30px"}}>
        <Grid item xs={4}>
          <FormControl size="small" fullWidth>
            <OutlinedInput
              id="input-search-header"
              placeholder="Tìm kiếm theo mã, tên, email và số điện thoại nhân viên"
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
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-select-small-label">Vai trò</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Vai trò"
              value={searchVaiTro}
              onChange={(e) => setSearchVaiTro(e.target.value)}
            >
              <MenuItem value="">Chọn vai trò</MenuItem>
              {listVaiTro.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl size="small" fullWidth>
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
            <Button variant="contained" onClick={downloadExcelNhanVien} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button variant="contained" onClick={() => handleClickOpen(null)} style={{marginRight: "7px"}}>
              Thêm nhân viên
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
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
   Typ
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
                    {formik.values?.id ? "Cập Nhật Nhân Viên" : "Thêm Nhân Viên"}
                  </Typography>
                  <Divider sx={{marginBottom: "25px"}} />
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <FormControl fullWidth style={{marginBottom: "16px"}}>
                        <InputLabel id="demo-simple-select-label">Vai Trò</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={formik.values.vaiTro?.id || ""}
                          onChange={handleChangeVaiTro}
                          name="vaiTro"
                          label="Vai Trò"
                          fullWidth
                        >
                          <MenuItem value="">Chọn vai trò</MenuItem>
                          {listVaiTro.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                              {row.ten}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {formik.errors.vaiTro && formik.touched.vaiTro && (
                        <Typography style={{color: "red", marginBottom: "18px", fontSize: "11px", marginLeft: "13px"}}>
                          {formik.errors.vaiTro}
                        </Typography>
                      )}
                      <TextField
                        label="Tên Nhân Viên"
                        name="ten"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px"}}
                        value={formik.values.ten}
                        onChange={formik.handleChange}
                        error={formik.touched.ten && Boolean(formik.errors.ten)}
                        helperText={formik.touched.ten ? formik.errors.ten : ""}
                      />
                      <TextField
                        label="Số căn cước công dân"
                        name="soCanCuocCongDan"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "16px"}}
                        value={formik.values.soCanCuocCongDan}
                        onChange={formik.handleChange}
                        error={formik.touched.soCanCuocCongDan && Boolean(formik.errors.soCanCuocCongDan)}
                        helperText={formik.touched.soCanCuocCongDan ? formik.errors.soCanCuocCongDan : ""}
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
                      <TextField
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
                        <Typography style={{color: "red", marginBottom: "18px", fontSize: "11px", marginLeft: "13px"}}>
                          {formik.errors.gioiTinh}
                        </Typography>
                      )}
                      <TextField
                        label="Ngày Sinh"
                        name="ngaySinh"
                        type="date"
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
              {formik.values?.id ? "Cập nhật Nhân Viên" : "Thêm Nhân Viên"}
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
              <TableCell>Căn Cước Công Dân</TableCell>
              <TableCell>Vai Trò</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell align={"center"}>Hoạt Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listNhanVien.map((row, index) => (
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
                <TableCell>{row?.soCanCuocCongDan}</TableCell>
                <TableCell>{row?.vaiTro?.ten}</TableCell>
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
                    <Button onClick={() => navigate(`chi-tiet-nhan-vien/${row.id}`)} size="small">
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
                        <DeleteIcon
                          color={"error"}
                          onClick={() => {
                            setOpenModal(true);
                          }}
                        />
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
      <Modal keepMounted open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Xác nhận thanh toán
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>
            Bạn có muốn tiếp tục thanh toán hay không ?
          </Typography>
          <div
            style={{
              marginLeft: "220px",
              marginTop: "20px",
              display: "flex"
            }}
          >
            <Button onClick={handleClosen} variant="contained" color="error">
              Không
            </Button>
            <div style={{marginLeft: "10px"}}></div>
            {/* Khoảng cách 10px */}
            <Button variant="contained" color="success" onClick={handleClickk}>
              Có
            </Button>
          </div>
        </Box>
      </Modal>
      <Stack spacing={2} sx={{width: "100%"}}>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClosee}>
          <Alert onClose={handleClosee} severity="info" sx={{width: "100%"}} style={{marginLeft: "1150px", marginBottom: "590px"}}>
            Làm gì có tìn mà mua huhu
          </Alert>
        </Snackbar>
      </Stack>
    </MainCard>
  );
};

export default NhanVien;
