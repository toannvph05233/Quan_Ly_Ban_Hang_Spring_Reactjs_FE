// material-ui
import {
  Box,
  Button,
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
  Tooltip,
  Typography
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import {Avatar} from "@files-ui/react";
import {BorderColorIcon, DeleteIcon, RepartitionIcon, SearchIcon} from "../../assets/icon/Icon";
import React, {useEffect, useState} from "react";
import SubCard from "../../ui-component/cards/SubCard";
import TextField from "@mui/material/TextField";
import {create, downloadExcel, getAll, getAllList, revertOrRemove} from "../../service/CrudService";
import dayjs from "dayjs";
import {useFormik} from "formik";
import {searchChuongTrinhTichDiem} from "../../service/ChuongTrinhTichDiemService";

const TichDiem = () => {
  const [open, setOpen] = useState(false);
  const [openCapNhat, setOpenCapNhat] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [listTichDiem, setListTichDiem] = useState([]);
  const [listThuHang, setListThuHang] = useState([]);
  const pageSizeOptions = [5, 10, 20, 50, 100];
  const [searchValue, setSearchValue] = useState("");
  const [searchTrangThai, setSearchTrangThai] = useState("");
  const [resetData, setResetData] = useState(false);
  const createSearchParams = (filters) => {
    const searchParams = {};
    if (filters.searchTrangThai !== "") {
      searchParams.searchTrangThai = filters.searchTrangThai;
    }
    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    return searchParams;
  };

  const fetchDataTichDiemUseState = async () => {
    try {
      const filters = {
        searchValue,
        searchTrangThai
      };
      const searchParams = createSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchChuongTrinhTichDiem(searchParams.search, searchParams.searchTrangThai, currentPage, pageSize);
      } else {
        response = await getAll(currentPage, pageSize, "chuong-trinh-tich-diem");
      }
      setListTichDiem(response.content);
      setTotalPage(response.totalPages);
    } catch (error) {
      console.error("Something went wrong with: " + error);
    }
  };

  const fetchDataThuHangUseState = async () => {
    try {
      const response = await getAllList("thu-hang");
      setListThuHang(response);
    } catch (error) {
      console.log("Something went wrong with: " + error);
    }
  };

  useEffect(() => {
    const fetchDataTichDiemUseEffect = async () => {
      await fetchDataThuHangUseState();
      await fetchDataTichDiemUseState();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataTichDiemUseEffect();
  }, [currentPage, pageSize, resetData, searchValue, searchTrangThai]);

  const formik = useFormik({
    initialValues: {
      ten: "",
      thoiGianBatDau: "",
      thoiGianKetThuc: "",
      tiLeQuyDoiThuHangList: [
        {
          thuHang: null,
          nguongSoTien: "",
          heSoNhan: "",
          tiLeChuyendoi: ""
        }
      ]
    },
    // validationSchema: Yup.object({
    //   ten: Yup.string().min(1, "Tên phải chứa ít nhất 1 ký tự!"),
    //   thoiGianBatDau: Yup.string().required("Thoời gian bắt đầu không được để trống!"),
    //   // thoiGianKetThuc: Yup.string(),
    //   nguongSoTien: Yup.number().required("Ngưỡng số tiền là trường bắt buộc!"),
    //   heSoNhan: Yup.number()
    //     .min(1, "Hệ số nhân phải lớn hơn hoặc bằng 1!")
    //     .max(100, "Hệ số nhân phải bé hơn hoặc bằng 100!")
    //     .required("Hệ số nhân là trường bắt buộc!")
    // }),
    onSubmit: () => {
      handleAdd();
    }
  });

  const handleChangeSizePage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleAdd = async () => {
    try {
      await create("chuong-trinh-tich-diem", formik.values);
      console.log("fhdfhsjdhfhsdhf");
      console.log(formik.values);
    } catch (error) {
      console.error("Something went wrong when adding" + error.message);
      console.log(formik.values);
    }
    await fetchDataTichDiemUseState();
    setOpen(false);
    formik.resetForm();
  };
  const handleClickOpenCapNhat = (row) => {
    formik.setValues(row);
    setOpenCapNhat(true);
  };
  const handleCloseCapNhat = () => {
    setOpenCapNhat(false);
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchValue("");
    setSearchTrangThai("");
  };

  const [imageSource2, setImageSource2] = React.useState("broken/url");
  const fallBackImage =
    "https://lh3.googleusercontent.com/pw/ADCreHcrb_JHrWSEMo5V82sKhwR7GLmKwvOkLCImIpJSYoPAql5jb70t-lvyWn2PuCXlcgUhVn-kOo_XGHDb2pDsW7wY3iaHfe19hp4M0OTv3EPM_TneMJcreehaKelO7SCgMKdQtprulR3ShqY_uWCUwRrx-8gksShQ0lEA0BZqqiIDxF9EUQoe0g3tamHM957MPhK8J0p6fzLLnzhzlRBaw_sA0rTjs_OIr_K8QlAeNGASnJG-83Pc4N82_RxIf7G16yCkp5QqV9g1-Ft_HPbhxF7gzefnj_2hFkCECfa0LjlR1_nbdzApthOd-4cq7swSdOPTqqfg_H_w4jwwN3FIjiFcVJGB-z6p7jQsrwavX7rw2WCXNywcrAtoJxQcmbk7_KxXaj5kqDGcwC2ZrDvx-Jd2_SIzfZwFQoKgEt8zoXPitC-yIFpvqsUTtp6vxqjyaE2LptVJN-QL53RhXcRjKaPRuQQEzLomuo0Gh3-fVJvqWUzQA-fPAmwdHBhnsrHLsfleRb8c9ZallyHzQ5ljcjl6YDptYML5YidL6a-BxXGF41a1s1fobIcow7lyvzv_duY8dap5GMkAnzVt8ZoOk-gQ5r1EAfTYIhh1eIUoyNSMoLnqBm-RMaAVc6Don1Va4R46jBUVOhBmpph90yIsA1ZLD5wK6TKcA2uIJaJQSimavWKcWoobE60ErCc5Y4XUofhdoLEyBh3Q_oq-9PGthN76HyvkT_v_qWw_kG_W8fEeYpyjDnDZ_fkha9XxZIRNyTklVeu9fzHAPvFFf21kSgiwDcChp0Ppr7rzK_o_TOp_dBm9bMQzLEFFW5CL94rJnNijTEfjYo6SA1br8dsgQDvb0YtrXFPszDF__ptIkdylRc9MjIYUzshCaUdvc60sKNyzrZN4_i7BIFlFDNxC_nljzA=w640-h641-s-no?authuser=0";

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "chuong-trinh-tich-diem", "remove");
      await fetchDataTichDiemUseState();
    } catch (e) {
      console.log("Error remove with" + e);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "chuong-trinh-tich-diem", "revert");
      await fetchDataTichDiemUseState();
    } catch (e) {
      console.log("Error revert wwith" + e);
    }
  };

  // Sử dụng hàm setFieldValue của Formik để tự động tính toán tiLeChuyenDoi
  const handleNguongSoTienChange = (event, index) => {
    const newValue = parseFloat(event.target.value);
    formik.setFieldValue(`tiLeQuyDoiThuHangList[${index}].nguongSoTien`, newValue);
    formik.handleChange;
    const heSoNhanValue = parseFloat(formik.values.tiLeQuyDoiThuHangList[index].heSoNhan);
    if (!isNaN(newValue) && !isNaN(heSoNhanValue)) {
      const newTiLeChuyenDoi = newValue / heSoNhanValue;
      formik.setFieldValue(`tiLeQuyDoiThuHangList[${index}].tiLeChuyenDoi`, newTiLeChuyenDoi);
    }
  };

  // Xử lý thay đổi giá trị heSoNhan
  const handleHeSoNhanChange = (event, index) => {
    const {value} = event.target;
    formik.setFieldValue(`tiLeQuyDoiThuHangList[${index}].heSoNhan`, value);
    formik.handleChange(event);

    const nguongSoTienValue = parseFloat(formik.values.tiLeQuyDoiThuHangList[index].nguongSoTien);
    if (!isNaN(value) && !isNaN(nguongSoTienValue)) {
      const newTiLeChuyenDoi = nguongSoTienValue / parseFloat(value);
      formik.setFieldValue(`tiLeQuyDoiThuHangList[${index}].tiLeChuyenDoi`, newTiLeChuyenDoi);
    }
  };

  const handleChangeTextFieldDay = (e) => {
    formik.handleChange(e);
    const newValue = e.target.value;
    formik.setFieldValue(`thoiGianBatDau`, newValue);
  };

  const downloadExcelTichDiem = async () => {
    try {
      await downloadExcel("chuong-trinh-tich-diem", "tich-diem");
    } catch (error) {
      console.log("Error reverting ChuongTrinhTichDiem:", error);
    }
  };

  return (
    <MainCard title="Tích điểm">
      <Grid container spacing={5} style={{marginBottom: "30px"}}>
        <Grid item xs={4}>
          <FormControl fullWidth size="small">
            <OutlinedInput
              id="input-search-header"
              placeholder="Tìm kiếm theo mã và tên tích điểm"
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
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value={"ACTIVE"}>Hoạt Động</MenuItem>
              <MenuItem value={"INACTIVE"}>Không Hoạt Động</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={downloadExcelTichDiem} style={{marginRight: "7px"}}>
              Export excel
            </Button>
            <Button variant="contained" onClick={handleClickOpen}>
              Thêm tích điểm
            </Button>
            <Button variant="contained" style={{marginLeft: "7px"}} onClick={handleReset}>
              Làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Thông tin chung
                  </Typography>
                  <Divider sx={{marginBottom: "25px"}} />
                  <TextField
                    label="Tên chương trình"
                    name="ten"
                    placeholder="Nhập tên chương trình"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    style={{marginBottom: "16px", marginTop: "4px"}}
                  />
                  {formik.errors.ten && formik.touched.ten && <p style={{color: "red"}}>{formik.errors.ten}</p>}
                </SubCard>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Tỉ lệ tích điểm mặc định
                  </Typography>
                  <Divider sx={{marginBottom: "20px"}} />
                  <Typography component="legend" sx={{marginBottom: "20px"}}>
                    Áp dụng cho tất cả sản phẩm trong cửa hàng ngoại trừ hạng có mức tích điểm đặc biệt được thiết lập phía dưới
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={5.5}>
                      <TextField
                        label="Ngưỡng số tiền"
                        placeholder="Ngưỡng số tiền"
                        variant="outlined"
                        name="tiLeQuyDoiThuHangList.nguongSoTien"
                        value={formik.values.tiLeQuyDoiThuHangList.nguongSoTien}
                        onChange={handleNguongSoTienChange}
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">VND</InputAdornment>
                        }}
                      />
                      {formik.errors.nguongSoTien && formik.touched.nguongSoTien && (
                        <p style={{color: "red"}}>{formik.errors.nguongSoTien}</p>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      <Typography component="legend" sx={{textAlign: "center", fontSize: "40px"}}>
                        =
                      </Typography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <TextField
                        label="Điểm thành viên"
                        placeholder="Nhập tên hạng thành viên"
                        name="ten"
                        variant="outlined"
                        fullWidth
                        defaultValue={1}
                        disabled={true}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">điểm</InputAdornment>
                        }}
                      />
                    </Grid>
                  </Grid>
                </SubCard>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography component="legend" variant="h4" mb={2}>
                    Quy tắc tính điểm theo hạng thành viên
                  </Typography>
                  <Divider sx={{marginBottom: "20px"}} />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Hạng</TableCell>
                          <TableCell align="center">Hệ số nhân</TableCell>
                          <TableCell align="right">Số tiền chi tiêu quy đổi thành điểm</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listThuHang.map((rows, index) => (
                          <TableRow key={rows.id}>
                            <TableCell>
                              <Typography onChange={formik.handleChange} defaultValue={rows.id}>
                                {rows.ten}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                disabled={index === 0}
                                type="number"
                                value={
                                  isNaN(formik.values.tiLeQuyDoiThuHangList[index]?.heSoNhan)
                                    ? "1"
                                    : formik.values.tiLeQuyDoiThuHangList[index]?.heSoNhan
                                }
                                defaultValue={index === 0 ? 1 : 1}
                                onChange={(e) => handleHeSoNhanChange(e, index)}
                              />
                              {formik.errors.heSoNhan && formik.touched.heSoNhan && <p style={{color: "red"}}>{formik.errors.heSoNhan}</p>}
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                disabled={true}
                                value={
                                  isNaN(formik.values.tiLeQuyDoiThuHangList[index]?.heSoNhan)
                                    ? formik.values.tiLeQuyDoiThuHangList[index]?.nguongSoTien / 1
                                    : formik.values.tiLeQuyDoiThuHangList[index]?.nguongSoTien /
                                      formik.values.tiLeQuyDoiThuHangList[index]?.heSoNhan
                                }
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">VND=1 điểm</InputAdornment>
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SubCard>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Thời gian có hiệu lực
                  </Typography>
                  <Divider sx={{marginBottom: "20px"}} />
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <TextField
                        label="Thời gian bắt đầu"
                        name="thoiGianBatDau"
                        type="datetime-local"
                        variant="outlined"
                        onChange={handleChangeTextFieldDay}
                        fullWidth
                        focused
                      />
                      {formik.errors.thoiGianBatDau && formik.touched.thoiGianBatDau && (
                        <p style={{color: "red"}}>{formik.errors.thoiGianBatDau}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Thời gian kết thúc"
                        name="thoiGianKetThuc"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        focused
                        onChange={formik.handleChange}
                      />
                      {formik.errors.thoiGianKetThuc && formik.touched.thoiGianKetThuc && (
                        <p style={{color: "red"}}>{formik.errors.thoiGianKetThuc}</p>
                      )}
                    </Grid>
                  </Grid>
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
                  <Typography component="legend">
                    Thời gian áp dụng từ {dayjs(formik.values.thoiGianBatDau).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <Button type="submit" variant="contained" style={{marginTop: "20px"}}>
                    Thêm
                  </Button>
                </SubCard>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth={"xl"} open={openCapNhat} onClose={handleCloseCapNhat}>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                <Typography variant="h4" mb={2}>
                  Thông tin chung
                </Typography>
                <Divider sx={{marginBottom: "25px"}} />
                <TextField
                  label="Tên chương trình"
                  name="ten"
                  placeholder="Nhập tên hạng thành viên"
                  variant="outlined"
                  fullWidth
                  required
                  style={{marginBottom: "16px", marginTop: "4px"}}
                  onChange={formik.handleChange}
                  value={formik.values.ten}
                />
              </SubCard>
              <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                <Typography variant="h4" mb={2}>
                  Tỉ lệ tích điểm mặc định
                </Typography>
                <Divider sx={{marginBottom: "20px"}} />
                <Typography component="legend" sx={{marginBottom: "20px"}}>
                  Áp dụng cho tất cả các hạng thành viên trong cửa hàng ngoại trừ sản phẩm có mức tích điểm đặc biệt được thiết lập phía
                  dưới
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={5.5}>
                    <TextField
                      label="Ngưỡng số tiền"
                      name="nguongSoTien"
                      placeholder="Nhập tên hạng thành viên"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik?.values?.tiLeQuyDoiThuHangList[0]?.nguongSoTien}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">đ</InputAdornment>
                        // Ngăn người dùng chỉnh sửa
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography component="legend" sx={{textAlign: "center", fontSize: "40px"}}>
                      =
                    </Typography>
                  </Grid>
                  <Grid item xs={5.5}>
                    <TextField
                      label="Điểm thành viên"
                      name="ten"
                      placeholder="Nhập tên hạng thành viên"
                      variant="outlined"
                      fullWidth
                      defaultValue={1}
                      disabled={true}
                      required
                      InputProps={{
                        endAdornment: <InputAdornment position="end">điểm</InputAdornment>
                        // Ngăn người dùng chỉnh sửa
                      }}
                    />
                  </Grid>
                </Grid>
              </SubCard>
              <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                <Typography variant="h4" mb={2}>
                  Quy tắc điểm theo hạng thành viên
                </Typography>
                <Divider sx={{marginBottom: "20px"}} />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Hạng</TableCell>
                        <TableCell align="center">Hệ số nhân</TableCell>
                        <TableCell align="right">Số tiền chi tiêu quy đổi thành điểm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formik.values.tiLeQuyDoiThuHangList.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row?.thuHang?.ten}</TableCell>
                          <TableCell align="center">
                            <TextField
                              type="number"
                              id="outlined-basic"
                              size="small"
                              name="heSoNhan"
                              value={row.heSoNhan}
                              onChange={formik.handleChange}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField id="outlined-basic" size="small" disabled={true} value={row.tiLeChuyendoi} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SubCard>
              <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                <Typography variant="h4" mb={2}>
                  Thời gian có hiệu lực
                </Typography>
                <Divider sx={{marginBottom: "20px"}} />
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField label="Thời gian bắt đầu" name="ten" type="datetime-local" variant="outlined" fullWidth focused required />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Thời gian kết thúc" name="ten" type="datetime-local" variant="outlined" fullWidth focused required />
                  </Grid>
                </Grid>
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
                <Typography component="legend">Thời gian áp dụng từ .....</Typography>
                <Button type="submit" variant="contained" style={{marginTop: "20px"}}>
                  Add
                </Button>
              </SubCard>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCapNhat}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Thời gian kết thúc</TableCell>
              <TableCell>Trạng Thái </TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTichDiem.map((row, index) => (
              <TableRow key={row?.id}>
                <TableCell>{currentPage * pageSize + index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <Typography style={{marginLeft: "10px"}}>{row?.ten}</Typography>
                  </div>
                </TableCell>
                <TableCell>{dayjs(row?.thoiGianBatDau).format("DD/MM/YYYY HH:mm")}</TableCell>
                <TableCell>{dayjs(row?.thoiGianKetThuc).format("DD/MM/YYYY HH:mm")}</TableCell>
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
                    <Button size="small" onClick={() => handleClickOpenCapNhat(row)}>
                      <BorderColorIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </MainCard>
  );
};

export default TichDiem;
