import React, {useEffect, useState} from "react";

// material-ui
import {Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import {gridSpacing} from "store/constant";
import SubCard from "../../ui-component/cards/SubCard";
import {Avatar} from "@files-ui/react";
import * as ThongKeService from "../../service/ThongKeService";
import EarningCard2 from "./EarningCard2";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  // const [thongKeDonHangTheoNgay, setThongKeDonHangTheoNgay] = useState({
  //   soLuong: null,
  //   tongThanhTien: null,
  // });
  // const [thongKeDonHangTheoThang, setThongKeDonHangTheoThang] = useState({
  //   soLuong: null,
  //   tongThanhTien: null,
  // });
  // const [thongKeTongDoanhThu, setThongKeTongDoanhThu] = useState({
  //   soLuong: null,
  //   tongThanhTien: null,
  // });
  const [filterNgay] = useState(0);
  const [filterThang] = useState(0);
  const [selectedLimitSanPham] = useState(0);
  const [selectedLimitKhachHang] = useState(0);
  const [topSanPham, setTopSanPham] = useState([]);
  const [topKhachHang, setTopKhachHang] = useState([]);
  // const optionsNgay = [0, 5, 10, 20, 30];
  // const optionsThang = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  // Gọi API khi component được render
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await handleNgayFilterChange();
      await handleThangFilterChange();
      await handleSumHoaDon();
      await fetchDataForTopSanPham();
      await fetchDataForTopKhachHang();
    };
    fetchDataAndResetData();
  }, [filterNgay, filterThang, selectedLimitSanPham, selectedLimitKhachHang]);

  const handleNgayFilterChange = async () => {
    try {
      const response = await ThongKeService.theoNgay(filterNgay);
      setThongKeDonHangTheoNgay(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a notification, or perform other actions as needed
    }
  };

  const handleSumHoaDon = async () => {
    try {
      const response = await ThongKeService.tongDoanhThu();
      console.log(response);
      setThongKeTongDoanhThu(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a notification, or perform other actions as needed
    }
  };

  const handleThangFilterChange = async () => {
    try {
      const response = await ThongKeService.theoThang(filterThang);
      console.log(response);
      setThongKeDonHangTheoThang(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a notification, or perform other actions as needed
    }
  };

  const fetchDataForTopSanPham = async () => {
    const response = await ThongKeService.topSanPham(5);
    setTopSanPham(response);
  };

  const fetchDataForTopKhachHang = async () => {
    const response = await ThongKeService.topKhachHang(5);
    setTopKhachHang(response);
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard2 isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={7}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{marginTop: "10px"}}>
        <Grid item xs={6}>
          <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
            <Typography variant="h4" mb={2}>
              Top sản phẩm bán chạy nhất
            </Typography>
            <TableContainer component={Paper}>
              <Table style={{marginBottom: "30px"}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Mã sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Giá bán</TableCell>
                    <TableCell>Số lượng đã bán được</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topSanPham.map((row, index) => (
                    <TableRow key={row?.chiTietSanPham?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.chiTietSanPham?.sanPham?.ma}</TableCell>
                      <TableCell>
                        <div style={{display: "flex", alignItems: "center"}}>
                          <Avatar
                            style={{width: "50px", height: "50px"}}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU"
                            variant="circle"
                          />
                          <p style={{marginLeft: "10px"}}>{row?.chiTietSanPham?.sanPham?.ten}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {row?.chiTietSanPham?.sanPham?.gia?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                      </TableCell>
                      <TableCell>{row?.totalSold}</TableCell>
                      <TableCell>
                        <Chip
                          style={{color: "white"}}
                          label={row?.chiTietSanPham?.trangThai}
                          color={row?.chiTietSanPham?.trangThai === "ACTIVE" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SubCard>
        </Grid>
        <Grid item xs={6}>
          <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
            <Typography variant="h4" mb={2}>
              Top khách hàng có số điểm thành viên cao nhất
            </Typography>
            <TableContainer component={Paper}>
              <Table style={{marginBottom: "30px"}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Mã khách hàng</TableCell>
                    <TableCell>Tên khách hàng</TableCell>
                    <TableCell>Giới tính</TableCell>
                    <TableCell>Số điểm</TableCell>
                    <TableCell>Trang thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topKhachHang.map((row, index) => (
                    <TableRow key={row?.id}>
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
                      <TableCell>{row?.soDiem}</TableCell>
                      <TableCell>
                        <Chip
                          style={{color: "white"}}
                          label={row?.trangThai}
                          color={row?.trangThai === "ACTIVE" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SubCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
