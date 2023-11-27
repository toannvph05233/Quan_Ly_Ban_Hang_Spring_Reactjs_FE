// material-ui
import {
  Box,
  Button,
  Chip,
  Dialog,
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
  Tooltip,
  Typography
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {Avatar} from "@files-ui/react";
import {BorderColorIcon, CardTravelIcon, DeleteIcon, MonetizationOnIcon, RepartitionIcon, SearchIcon} from "../../assets/icon/Icon";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {create, downloadExcel, getAll, getOne, revertOrRemove, updateById} from "../../service/CrudService";
import {useFormik} from "formik";
import * as Yup from "yup";
import {searchThuHang} from "../../service/ThuHangService";

const HangThanhVien = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [listThuHang, setListThuHang] = useState([]);
  const pageSizeOptions = [5, 10, 20, 30, 50, 100];
  const [resetData, setResetData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");

  const createSearchParams = (filters) => {
    const searchParams = {};
    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    if (filters.searchTrangThai !== "") {
      searchParams.searchTrangThai = filters.searchTrangThai;
    }
    return searchParams;
  };

  const fetchDataThuHangUseSate = async () => {
    try {
      const filters = {
        searchValue,
        searchTrangThai
      };
      const searchParams = createSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchThuHang(searchParams.search, searchParams.searchTrangThai, currentPage, pageSize);
      } else {
        response = await getAll(currentPage, pageSize, "thu-hang");
      }
      setListThuHang(response.content);
      setTotalPage(response.totalPages);
    } catch (error) {
      console.error("Something went wrong with: " + error);
    }
  };

  useEffect(() => {
    const fetchDataThuHangUseEffect = async () => {
      await fetchDataThuHangUseSate();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataThuHangUseEffect();
  }, [currentPage, pageSize, resetData, searchValue, searchTrangThai]);
  const handleChangeSizePage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  const formik = useFormik({
    initialValues: {
      ten: "",
      soTienKhachChiToiThieu: "",
      soLuongDonHangToiThieu: "",
      moTa: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string()
        .min(1, "Tên phải chứa ít nhất 1 ký tự")
        .max(15, "Tên không được vượt quá 15 kí tự")
        .required("Tên là trường bắt buộc"),
      soTienKhachChiToiThieu: Yup.number().min(0, "Số tiền phải lớn hơn hoặc bằng 0").required("Số tiền là trường bắt buộc"),
      soLuongDonHangToiThieu: Yup.number()
        .integer("Số lượng đơn hàng phải là số nguyên")
        .min(0, "Số lượng đơn hàng phải lớn hơn hoặc bằng 0")
        .required("Số lượng đơn hàng là trường bắt buộc"),
      moTa: Yup.string().max(255, "Mô tả không được vượt quá 255 kí tự").required("Mô tả là trường bắt buộc")
    }),
    onSubmit: () => {
      handleCreateOrUpdateHangThanhVien();
    }
  });

  const handleChangeTextFieldTien = (e) => {
    formik.handleChange(e);
    formik.setFieldValue("soTienKhachChiToiThieu", e.target.value);
  };
  const handleChangeTextFieldDonHang = (e) => {
    formik.handleChange(e);
    formik.setFieldValue("soLuongDonHangToiThieu", e.target.value);
  };

  const handleCreateOrUpdateHangThanhVien = async () => {
    try {
      if (formik.values.id) {
        setOpen(false);
        await updateById(formik.values.id, "thu-hang", formik.values);
        await fetchDataThuHangUseSate();
      } else {
        setOpen(false);
        await create("thu-hang", formik.values);
        await fetchDataThuHangUseSate();
      }
      setOpen(false);
      await fetchDataThuHangUseSate();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "thu-hang", "remove");
      await fetchDataThuHangUseSate();
    } catch (e) {
      console.log("Error remove with" + e);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "thu-hang", "revert");
      await fetchDataThuHangUseSate();
    } catch (e) {
      console.log("Error revert wwith" + e);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setSearchTrangThai("");
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const handleClickOpen = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "thu-hang");
        formik.setValues(response);
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

  const downloadExcelHangThanhVien = async () => {
    try {
      await downloadExcel("thu-hang", "hang-thanh-vien");
    } catch (error) {
      console.log("Error reverting ThuHang:", error);
    }
  };

  const [imageSource2, setImageSource2] = React.useState("broken/url");
  const fallBackImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <MainCard title="Hạng thành viên">
      <Grid container spacing={5} style={{marginBottom: "30px"}}>
        <Grid item xs={4}>
          <FormControl fullWidth size="small">
            <OutlinedInput
              id="input-search-header"
              placeholder="Tìm kiếm theo mã và tên hạng thành viên"
              name={"searchValue"}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
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
            <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Trạng thái"
              name={"searchTrangThai"}
              value={searchTrangThai}
              onChange={(event) => setSearchTrangThai(event.target.value)}
            >
              <MenuItem value="">Chọn trạng thái</MenuItem>
              <MenuItem value={"ACTIVE"}>Hoạt Động</MenuItem>
              <MenuItem value={"INACTIVE"}>Không Hoạt Động</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={downloadExcelHangThanhVien} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button variant="contained" onClick={() => handleClickOpen(null)}>
              Thêm hạng thành viên
            </Button>
            <Button variant="contained" style={{marginLeft: "7px"}} onClick={handleReset}>
              làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container Typography={5} spacing={5}>
              <Grid item xs={8}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Thông tin chung
                  </Typography>
                  <Divider sx={{marginBottom: "25px"}} />
                  <TextField
                    label="Tên Hạng"
                    name="ten"
                    placeholder="Nhập tên hạng thành viên"
                    variant="outlined"
                    fullWidth
                    value={formik.values.ten}
                    style={{marginBottom: "16px", marginTop: "4px"}}
                    onChange={formik.handleChange}
                    error={formik.touched.ten && Boolean(formik.errors.ten)}
                    helperText={formik.touched.ten ? formik.errors.ten : ""}
                  />
                  {/*{formik.errors.ten && formik.touched.ten && <p style={{color: "red"}}>{formik.errors.ten}</p>}*/}
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <TextField
                        className="css-sdt"
                        label="Số đơn hàng tối thiểu"
                        variant="outlined"
                        type={"number"}
                        fullWidth
                        value={formik.values.soLuongDonHangToiThieu}
                        style={{marginBottom: "16px"}}
                        name={"soLuongDonHangToiThieu"}
                        onChange={handleChangeTextFieldDonHang}
                        error={formik.touched.soLuongDonHangToiThieu && Boolean(formik.errors.soLuongDonHangToiThieu)}
                        helperText={formik.touched.soLuongDonHangToiThieu ? formik.errors.soLuongDonHangToiThieu : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {/*<TextField*/}
                      {/*  label="Số tiền chi tiêu tối thiểu"*/}
                      {/*  variant="outlined"*/}
                      {/*  type={"number"}*/}
                      {/*  fullWidth*/}
                      {/*  value={formik.values.soTienKhachChiToiThieu}*/}
                      {/*  name={"soTienKhachChiToiThieu"}*/}
                      {/*  style={{marginBottom: "16px"}}*/}
                      {/*  onChange={handleChangeTextFieldTien}*/}
                      {/*  error={formik.touched.soTienKhachChiToiThieu && Boolean(formik.errors.soTienKhachChiToiThieu)}*/}
                      {/*  helperText={formik.touched.soTienKhachChiToiThieu ? formik.errors.soTienKhachChiToiThieu : ""}*/}
                      {/*/>*/}
                      <TextField
                        id="outlined-start-adornment"
                        InputProps={{
                          endAdornment: <InputAdornment position="start">VNĐ</InputAdornment>
                        }}
                        label="Số tiền chi tiêu tối thiểu"
                        variant="outlined"
                        type={"number"}
                        fullWidth
                        value={formik.values.soTienKhachChiToiThieu}
                        name={"soTienKhachChiToiThieu"}
                        style={{marginBottom: "16px"}}
                        onChange={handleChangeTextFieldTien}
                        error={formik.touched.soTienKhachChiToiThieu && Boolean(formik.errors.soTienKhachChiToiThieu)}
                        helperText={formik.touched.soTienKhachChiToiThieu ? formik.errors.soTienKhachChiToiThieu : ""}
                      />
                    </Grid>
                  </Grid>
                </SubCard>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Mô tả về thứ hạng
                  </Typography>
                  <Divider sx={{marginBottom: "20px"}} />
                  <Typography component="legend">
                    Cung cấp cho khách hàng biết những thông tin ưu đãi mà họ sẽ nhận được khi tham gia hạng. Những thông tin này sẽ được
                    hiển thị cho thành viên khi đăng nhập tài khoản
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Mô tả"
                    name={"moTa"}
                    multiline
                    rows={3}
                    fullWidth
                    value={formik.values.moTa}
                    style={{marginTop: "16px"}}
                    onChange={formik.handleChange}
                    error={formik.touched.moTa && Boolean(formik.errors.moTa)}
                    helperText={formik.touched.moTa ? formik.errors.moTa : ""}
                  />
                </SubCard>
              </Grid>
              <Grid item xs={4}>
                <SubCard sx={{marginTop: "25px", textAlign: "center", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Avatar
                    src={imageSource2}
                    style={{margin: "auto"}}
                    variant="circle"
                    onError={() => setImageSource2(fallBackImage)}
                    alt="Isabella"
                    changeLabel={"Vui lòng chọn ảnh?"}
                    onChange={(imgSource2) => setImageSource2(imgSource2)}
                  />
                  <Divider sx={{marginBottom: "25px", marginTop: "25px"}} />
                  <Grid container>
                    <Grid item xs={6}>
                      <CardTravelIcon color={"blue"} />
                      <Typography mt={1}>Điều kiện chi tiêu tối thiểu</Typography>
                      <Typography mt={1}>{formatNumber(formik.values.soTienKhachChiToiThieu)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <MonetizationOnIcon color={"green"} />
                      <Typography mt={1}>Đơn hàng thành công</Typography>
                      <Typography mt={1}>{formatNumber(formik.values.soLuongDonHangToiThieu)}</Typography>
                    </Grid>
                  </Grid>
                  <Button type="submit" variant="contained" style={{marginTop: "20px"}}>
                    {formik.values?.id ? "Cập nhật hạng thành viên" : "Thêm hạng thành viên"}
                  </Button>
                </SubCard>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Số tiền tối thiểu</TableCell>
              <TableCell>Số đơn hàng tối thiểu</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Trạng Thái </TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listThuHang.map((row, index) => (
              <TableRow key={row?.id}>
                <TableCell>{currentPage * pageSize + index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <Avatar
                      style={{width: "50px", height: "50px"}}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU"
                      variant="circle"
                    />
                    <Typography style={{marginLeft: "10px"}}>{row?.ten}</Typography>
                  </div>
                </TableCell>
                <TableCell>{row?.soTienKhachChiToiThieu?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                <TableCell>{row?.soLuongDonHangToiThieu}</TableCell>
                <TableCell>{row?.moTa}</TableCell>
                <TableCell>
                  <Chip
                    style={{color: "white"}}
                    label={row?.trangThai.toString() === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                    color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
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
                  <Tooltip title="Cập nhật" placement="bottom">
                    <Button size="small" onClick={() => handleClickOpen(row)}>
                      <BorderColorIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid container justifyContent="space-between" alignItems="center" style={{display: "flex", flexDirection: "row"}}>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" value={pageSize} onChange={handleChangeSizePage}>
            {pageSizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Pagination
            count={totalPage}
            page={currentPage + 1}
            onChange={(event, page) => {
              setCurrentPage(page - 1);
            }}
          />
        </Grid>
      </TableContainer>
    </MainCard>
  );
};
export default HangThanhVien;
