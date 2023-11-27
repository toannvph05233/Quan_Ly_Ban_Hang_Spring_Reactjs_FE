import MainCard from "ui-component/cards/MainCard";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {create, getAll, getOne, revertOrRemove, updateById} from "../../service/CrudService";
import {searchThuocTinhSanPham} from "../../service/ThuocTinhSanPhamService";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputAdornment,
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
  Typography,
  TextField,
  Box
} from "@mui/material";
import {BorderColorIcon, DeleteIcon, RepartitionIcon, SearchIcon} from "../../assets/icon/Icon";
const ChatLieu = () => {
  const [open, setOpen] = useState(false);
  const [listChatLieu, setListChatLieu] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizeOptions = [5, 10, 20];
  const [resetData, setResetData] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("name") || "";

  const formik = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(5, "Tên phải lớn hơn 5 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateOrUpdateChatLieu();
    }
  });

  const createSearchParams = (filters) => {
    const searchParams = {};
    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    return searchParams;
  };

  const fetchDataChatLieu = async () => {
    try {
      const filters = {
        searchValue
      };
      const searchParams = createSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchThuocTinhSanPham(searchParams.search, currentPage, pageSize, "chat-lieu");
      } else {
        response = await getAll(currentPage, pageSize, "chat-lieu");
      }
      setListChatLieu(response.content);
      setTotalPages(response.totalPages);
      console.log(listChatLieu);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataChatLieu();
      if (resetData) {
        setResetData(false);
      }
    };
    fetchDataAndResetData();
  }, [currentPage, pageSize, resetData, searchValue]);

  // add / update
  const handleCreateOrUpdateChatLieu = async () => {
    try {
      let status;
      if (formik.values.id) {
        status = await updateById(formik.values.id, "chat-lieu", formik.values);
      } else {
        status = await create("chat-lieu", formik.values);
        console.log(formik.values);
      }
      if (status === 201) {
        console.log(formik.values);
      }
      setOpen(false);
      await fetchDataChatLieu();
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchNameChange = (event) => {
    const name = event.target.value;
    const params = {
      name
    };
    setSearchParams(params);
  };

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "chat-lieu", "remove");
      await fetchDataChatLieu();
    } catch (error) {
      console.log("Error reverting ChatLieu:", error);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "chat-lieu", "revert");
      await fetchDataChatLieu();
    } catch (error) {
      console.log("Error revertting ChatLieu:", error);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
    setResetData(true);
    setSearchParams({});
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
    const params = {
      name: searchValue,
      pageNo: newPage.toString(),
      pageSize: newPageSize.toString()
    };
    if (!searchValue.trim()) {
      delete params.name;
    }
    setSearchParams(params);
  };
  const handleClickOpen = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "chat-lieu");
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
    <MainCard title="Chất Liệu">
      <Grid container spacing={5} style={{marginBottom: "30px"}}>
        <Grid item xs={4}>
          <FormControl fullWidth size="small">
            <OutlinedInput
              id="input-search-header"
              placeholder="Tìm kiếm theo mã, tên chất liệu"
              value={searchValue}
              onChange={handleSearchNameChange}
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
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={() => handleClickOpen(null)} style={{marginRight: "7px"}}>
              Thêm chất liệu
            </Button>
            <Button onClick={handleReset} variant="contained" style={{marginRight: "7px"}}>
              Làm mới
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose} style={{height: "500px"}}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Typography variant="body3">
              <h1 style={{textAlign: "center", marginBottom: "40px"}}>{formik.values?.id ? "Cập Nhật Chất Liệu" : "Thêm Chất Liệu"}</h1>
              <Grid fullWidth>
                <TextField
                  label="Tên chất liệu"
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
              </Grid>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              {formik.values?.id ? "Cập Nhật Chất Liệu" : "Thêm Chất Liệu"}
            </Button>
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Mã chất liệu</TableCell>
              <TableCell>Tên chất liệu</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listChatLieu.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>{row?.ten}</TableCell>
                <TableCell>
                  <Chip
                    style={{color: "white"}}
                    label={row?.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                    color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
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
export default ChatLieu;
