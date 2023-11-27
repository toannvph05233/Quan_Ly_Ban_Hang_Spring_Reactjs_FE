import * as React from "react";
import "../../assets/css/SanPham.css";
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
  Tooltip
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import {BorderColorIcon, DeleteIcon, RepartitionIcon, SearchIcon, VisibilityIcon} from "../../assets/icon/Icon";
import {useEffect, useState} from "react";
import {downloadExcel, getAll, getAllList, revertOrRemove} from "../../service/CrudService";
import {searchSanPham} from "../../service/SanPhamService";
import {useNavigate} from "react-router-dom";

const SanPham = () => {
  const [searchValue, setSearchValue] = useState([]);
  const [gioiTinhValue, setGioiTinhValue] = useState([]);
  const [cauThuValue, setCauThuValue] = useState([]);
  const [chatLieuValue, setChatLieuValue] = useState([]);
  const [coAoValue, setCoAoValue] = useState([]);
  const [mauSacValue, setMauSacValue] = useState([]);
  const [loaiSanPhamValue, setLoaiSanPhamValue] = useState([]);
  const [dongSanPhamValue, setDongSanPhamValue] = useState([]);
  const [nhaSanXuatValue, setNhaSanXuatValue] = useState([]);
  const [thuongHieuValue, setThuongHieuValue] = useState([]);
  const [nuocSanXuatValue, setNuocSanXuatValue] = useState([]);
  const [congNgheValue, setCongNgheValue] = useState([]);
  const [trangThaiValue, setTrangThaiValue] = useState([]);
  // const [giaMinValue] = useState("");
  // const [giaMaxValue] = useState("");
  const [listSanPham, setListSanPham] = useState([]);
  const [listChatLieu, setListChatLieu] = useState([]);
  const [listCauThu, setListCauThu] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listLoaiSanPham, setListLoaiSanPham] = useState([]);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [listDongSanPham, setListDongSanPham] = useState([]);
  const [listNuocSanXuat, setListNuocSanXuat] = useState([]);
  const [listMauSac, setListMauSac] = useState([]);
  const [listNhaSanXuat, setListNhaSanXuat] = useState([]);
  const [listCongNghe, setListCongNghe] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [pageSize, setPageSize] = useState(5); // Số lượng Nhân viên trên mỗi trang
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const pageSizeOptions = [5, 10, 20]; // Danh sách lựa chọn số lượng Nhân viên trên mỗi trang
  const navigate = useNavigate();
  const fetchDataChatLieu = async () => {
    const response = await getAllList("chat-lieu");
    setListChatLieu(response);
  };

  const fetchDataCauThu = async () => {
    const response = await getAllList("cau-thu");
    setListCauThu(response);
  };

  const fetchDataCoAo = async () => {
    const response = await getAllList("co-ao");
    setListCoAo(response);
  };

  const fetchDataLoaiSanPham = async () => {
    const response = await getAllList("loai-san-pham");
    setListLoaiSanPham(response);
  };

  const fetchDataThuongHieu = async () => {
    const response = await getAllList("thuong-hieu");
    setListThuongHieu(response);
  };

  const fetchDataDongSanPham = async () => {
    const response = await getAllList("dong-san-pham");
    setListDongSanPham(response);
  };

  const fetchDataNuocSanXuat = async () => {
    const response = await getAllList("nuoc-san-xuat");
    setListNuocSanXuat(response);
  };

  const fetchDataMauSac = async () => {
    const response = await getAllList("mau-sac");
    setListMauSac(response);
  };

  const fetchDataNhaSanXuat = async () => {
    const response = await getAllList("nha-san-xuat");
    setListNhaSanXuat(response);
  };

  const fetchDataCongNghe = async () => {
    const response = await getAllList("cong-nghe");
    setListCongNghe(response);
  };

  const handleSearchParams = (filters) => {
    const searchParams = {};

    if (filters.searchValue !== "") {
      searchParams.search = filters.searchValue;
    }
    if (filters.gioiTinhValue !== "") {
      searchParams.gioiTinh = filters.gioiTinhValue;
    }
    if (filters.cauThuValue !== "") {
      searchParams.cauThuId = filters.cauThuValue;
    }
    if (filters.coAoValue !== "") {
      searchParams.coAoId = filters.coAoValue;
    }
    if (filters.chatLieuValue !== "") {
      searchParams.chatLieuId = filters.chatLieuValue;
    }
    if (filters.mauSacValue !== "") {
      searchParams.mauSacId = filters.mauSacValue;
    }
    if (filters.loaiSanPhamValue !== "") {
      searchParams.loaiSanPhamId = filters.loaiSanPhamValue;
    }
    if (filters.dongSanPhamValue !== "") {
      searchParams.dongSanPhamId = filters.dongSanPhamValue;
    }
    if (filters.nhaSanXuatValue !== "") {
      searchParams.nhaSanXuatId = filters.nhaSanXuatValue;
    }
    if (filters.thuongHieuValue !== "") {
      searchParams.thuongHieuId = filters.thuongHieuValue;
    }
    if (filters.nuocSanXuatValue !== "") {
      searchParams.nuocSanXuatId = filters.nuocSanXuatValue;
    }
    if (filters.congNgheValue !== "") {
      searchParams.congNgheId = filters.congNgheValue;
    }
    if (filters.trangThaiValue !== "") {
      searchParams.trangThai = filters.trangThaiValue;
    }
    // if (filters.giaMinValue !== "") {
    //   searchParams.giaMin = filters.giaMinValue;
    // }
    // if (filters.giaMaxValue !== "") {
    //   searchParams.giaMax = filters.giaMaxValue;
    // }
    return searchParams;
  };

  const fetchDataSanPham = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const filters = {
        searchValue,
        gioiTinhValue,
        cauThuValue,
        coAoValue,
        chatLieuValue,
        mauSacValue,
        loaiSanPhamValue,
        dongSanPhamValue,
        nhaSanXuatValue,
        thuongHieuValue,
        nuocSanXuatValue,
        congNgheValue,
        trangThaiValue
        // giaMinValue,
        // giaMaxValue
      };
      const searchParams = handleSearchParams(filters);
      let response;
      if (Object.keys(searchParams).length > 0) {
        response = await searchSanPham(
          searchParams.search,
          searchParams.gioiTinh,
          searchParams.cauThuId,
          searchParams.coAoId,
          searchParams.mauSacId,
          searchParams.loaiSanPhamId,
          searchParams.chatLieuId,
          searchParams.dongSanPhamId,
          searchParams.nhaSanXuatId,
          searchParams.thuongHieuId,
          searchParams.nuocSanXuatId,
          searchParams.congNgheId,
          searchParams.trangThai,
          searchParams.giaMin,
          searchParams.giaMax,
          currentPage,
          pageSize
        );
      } else {
        // Xử lý khi không có điều kiện fillter nào được áp dụng
        response = await getAll(currentPage, pageSize, "san-pham");
        console.log(listSanPham);
      }
      setListSanPham(response.content);
      setTotalPages(response.totalPages);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataChatLieu();
      await fetchDataCauThu();
      await fetchDataCoAo();
      await fetchDataThuongHieu();
      await fetchDataDongSanPham();
      await fetchDataNuocSanXuat();
      await fetchDataMauSac();
      await fetchDataNhaSanXuat();
      await fetchDataCongNghe();
      await fetchDataLoaiSanPham();
      await fetchDataSanPham();
    };
    fetchDataAndResetData();
  }, [
    currentPage,
    pageSize,
    searchValue,
    gioiTinhValue,
    cauThuValue,
    coAoValue,
    mauSacValue,
    loaiSanPhamValue,
    chatLieuValue,
    dongSanPhamValue,
    nhaSanXuatValue,
    thuongHieuValue,
    nuocSanXuatValue,
    congNgheValue,
    trangThaiValue
    // giaMinValue,
    // giaMaxValue
  ]);
  const handleRemove = async (post) => {
    try {
      await revertOrRemove(post.id, "san-pham", "remove");
      await fetchDataSanPham();
    } catch (error) {
      console.error("Error reverting NhanVien:", error);
    }
  };

  // Xử lý khôi phục Nhân viên
  const handleRevert = async (post) => {
    try {
      await revertOrRemove(post.id, "san-pham", "revert");
      await fetchDataSanPham();
    } catch (error) {
      console.error("Error reverting NhanVien:", error);
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    const newPage = Math.floor((currentPage * pageSize) / newPageSize);
    setCurrentPage(newPage);
  };

  // end so luong

  const downloadExcelSanPham = async () => {
    try {
      await downloadExcel("san-pham", "san-pham");
    } catch (error) {
      console.log("Error reverting SanPham:", error);
    }
  };

  return (
    <MainCard title="Sản Phẩm">
      {/*filter*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OutlinedInput
            id="input-search-header"
            placeholder="Tìm kiếm theo tên sản phẩm, mã sản phẩm, tên cầu thủ, số áo cầu thủ"
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
        <Grid item xs={2}></Grid>
        <Grid item xs={4} style={{alignItems: "center"}}>
          <Box style={{float: "right"}}>
            <Button variant="contained" onClick={() => navigate(`them-san-pham`)} style={{marginRight: "5px"}}>
              Thêm sản phẩm
            </Button>
            <Button variant="contained" onClick={downloadExcelSanPham} style={{marginRight: "5px"}}>
              Export excel
            </Button>
            <Button variant="contained">Import excel</Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{marginTop: "5px", marginBottom: "30px"}}>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Cầu thủ</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Cầu thủ"
              value={cauThuValue}
              onChange={(e) => setCauThuValue(e.target.value)}
            >
              <MenuItem value="">Chọn cầu thủ</MenuItem>
              {listCauThu.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Cổ áo</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Cổ áo"
              value={coAoValue}
              onChange={(e) => setCoAoValue(e.target.value)}
            >
              <MenuItem value="">Chọn cổ áo</MenuItem>
              {listCoAo.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Chất liệu</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Chất liệu"
              value={chatLieuValue}
              onChange={(e) => setChatLieuValue(e.target.value)}
            >
              <MenuItem value="">Chọn chất liệu</MenuItem>
              {listChatLieu.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Loại sản phẩm</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Loại sản phẩm"
              value={loaiSanPhamValue}
              onChange={(e) => setLoaiSanPhamValue(e.target.value)}
            >
              <MenuItem value="">Chọn loại sản phẩm</MenuItem>
              {listLoaiSanPham.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Thương hiệu</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Thương hiệu"
              value={thuongHieuValue}
              onChange={(e) => setThuongHieuValue(e.target.value)}
            >
              <MenuItem value="">Chọn thương hiệu</MenuItem>
              {listThuongHieu.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Dòng sản phẩm</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Dòng sản phẩm"
              value={dongSanPhamValue}
              onChange={(e) => setDongSanPhamValue(e.target.value)}
            >
              <MenuItem value="">Chọn dòng sản phẩm</MenuItem>
              {listDongSanPham.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Nước sản xuất</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Nước sản xuất"
              value={nuocSanXuatValue}
              onChange={(e) => setNuocSanXuatValue(e.target.value)}
            >
              <MenuItem value="">Chọn nước sản xuất</MenuItem>
              {listNuocSanXuat.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Màu sắc</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Màu sắc"
              value={mauSacValue}
              onChange={(e) => setMauSacValue(e.target.value)}
            >
              <MenuItem value="">Chọn màu sắc</MenuItem>
              {listMauSac.map((row) => (
                <MenuItem key={row.id} value={row.id} style={{backgroundColor: row.ma}}>
                  {row.ma}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Nhà sản xuất</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Nhà sản xuất"
              value={nhaSanXuatValue}
              onChange={(e) => setNhaSanXuatValue(e.target.value)}
            >
              <MenuItem value="">Chọn nhà sản xuất</MenuItem>
              {listNhaSanXuat.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Công nghệ</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Công nghệ"
              value={congNgheValue}
              onChange={(e) => setCongNgheValue(e.target.value)}
            >
              <MenuItem value="">Chọn công nghệ</MenuItem>
              {listCongNghe.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Giới tính</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Giới tính"
              value={gioiTinhValue}
              onChange={(e) => setGioiTinhValue(e.target.value)}
            >
              <MenuItem value="">Chọn giới tính</MenuItem>
              <MenuItem value="true">Nam</MenuItem>
              <MenuItem value="false">Nữ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Trạng thái"
              value={trangThaiValue}
              onChange={(e) => setTrangThaiValue(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="ACTIVE">Hoạt Động</MenuItem>
              <MenuItem value="INACTIVE">Không Hoạt Động</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/*load table*/}
      <TableContainer component={Paper}>
        <Table style={{marginBottom: "30px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Tên cầu thủ</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align={"center"}>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listSanPham.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{currentPage * pageSize + index + 1}</TableCell>
                <TableCell>{row?.ma}</TableCell>
                <TableCell>{row?.ten}</TableCell>
                <TableCell>{row?.cauThu?.ten}</TableCell>
                <TableCell>{row?.gia?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
                <TableCell>
                  <Chip
                    style={{color: "white"}}
                    label={row?.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                    color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Chi tiết" placement="bottom">
                    <Button size="small">
                      <VisibilityIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cập nhật" placement="bottom">
                    <Button size="small" onClick={() => navigate(`sua-san-pham/${row.id}`)}>
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
export default SanPham;
