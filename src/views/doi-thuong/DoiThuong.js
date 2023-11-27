// material-ui
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  InputAdornment,
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

// project imports
import MainCard from "ui-component/cards/MainCard";
import React, {useEffect, useState} from "react";
import SubCard from "../../ui-component/cards/SubCard";
import TextField from "@mui/material/TextField";
import {BorderColorIcon, DeleteIcon, RepartitionIcon} from "../../assets/icon/Icon";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getAllList, revertOrRemove, updateById} from "../../service/CrudService";

const DoiThuong = () => {
  const [openCapNhat, setOpenCapNhat] = useState(false);
  const [listDoiThuong, setListDoiThuong] = useState([]);

  const fetchDataDoiThuongUseSate = async () => {
    try {
      const response = await getAllList("quy-doi-diem");
      setListDoiThuong(response);
    } catch (error) {
      console.error("Something went wrong with: " + error);
    }
  };

  useEffect(() => {
    const fetchDataDoiThuongUseEffect = async () => {
      await fetchDataDoiThuongUseSate();
    };
    fetchDataDoiThuongUseEffect();
  }, []);

  const formik = useFormik({
    initialValues: {
      soTienQuyDoi: ""
    },
    validationSchema: Yup.object({
      soTienChiTieu: Yup.number().min(0, "Số tiền phải lớn hơn hoặc bằng 0").required("Số tiền là trường bắt buộc")
    }),
    onSubmit: () => {
      handleCloseCapNhat();
    }
  });

  const handleClickOpenCapNhat = (row) => {
    formik.setValues(row);
    setOpenCapNhat(true);
  };

  const handleCloseCapNhat = async () => {
    try {
      await updateById(formik.values.id, "quy-doi-diem", formik.values);
    } catch (error) {
      console.log("Error while updating:", error);
    }
    await fetchDataDoiThuongUseSate();
    formik.resetForm();
    setOpenCapNhat(false);
  };

  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "quy-doi-diem", "remove");
      await fetchDataDoiThuongUseSate();
    } catch (e) {
      console.log("Error remove with" + e);
    }
  };

  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "quy-doi-diem", "revert");
      await fetchDataDoiThuongUseSate();
    } catch (e) {
      console.log("Error revert wwith" + e);
    }
  };
  return (
    <MainCard title="Đổi Thưởng">
      <Dialog fullWidth maxWidth={"xl"} open={openCapNhat} onClose={handleCloseCapNhat}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container Typography={5} spacing={5}>
              <Grid item xs={12}>
                <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
                  <Typography variant="h4" mb={2}>
                    Quy tắc đổi thưởng
                  </Typography>
                  <Divider sx={{marginBottom: "20px"}} />
                  <Grid container spacing={1}>
                    <Grid item xs={5.5}>
                      <TextField
                        label="Điểm thành viên"
                        disabled
                        defaultValue={1}
                        variant="outlined"
                        fullWidth
                        required
                        InputProps={{
                          endAdornment: <InputAdornment position="end">điểm</InputAdornment>
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
                        label="Số tiền chi tiêu"
                        name="soTienQuyDoi"
                        variant="outlined"
                        fullWidth
                        type={"number"}
                        value={formik.values.soTienQuyDoi}
                        onChange={formik.handleChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
                        }}
                        error={formik.touched.soTienQuyDoi && Boolean(formik.errors.soTienQuyDoi)}
                        helperText={formik.touched.soTienQuyDoi ? formik.errors.soTienQuyDoi : ""}
                      />
                    </Grid>
                  </Grid>
                  <Typography component="legend" style={{marginTop: "20px"}}>
                    Khách hàng sẽ đổi được 1 điểm thành 2,000,000 đồng khi thanh toán
                  </Typography>
                  <Button type="submit" variant="contained" style={{marginTop: "20px"}}>
                    Cập nhật đổi thưởng
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
              <TableCell>Trạng Thái </TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listDoiThuong.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {row?.diem} điểm = {row?.soTienQuyDoi?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                </TableCell>
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
    </MainCard>
  );
};
export default DoiThuong;
