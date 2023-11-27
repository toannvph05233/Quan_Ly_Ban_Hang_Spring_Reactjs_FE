// // material-ui
// import MainCard from "ui-component/cards/MainCard";
// import SubCard from "../../ui-component/cards/SubCard";
// import {
//   Box,
//   Chip,
//   FormControl,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography
// } from "@mui/material";
// import React, {useEffect, useState} from "react";
// import * as ThongKeService from "../../service/ThongKeService";
// import {Avatar} from "@files-ui/react";
// const ThongKe = () => {
//   const [thongKeDonHangTheoNgay, setThongKeDonHangTheoNgay] = useState({
//     soLuong: null,
//     tongThanhTien: null
//   });
//   const [thongKeDonHangTheoThang, setThongKeDonHangTheoThang] = useState({
//     soLuong: null,
//     tongThanhTien: null
//   });
//   const [thongKeTongDoanhThu, setThongKeTongDoanhThu] = useState({
//     soLuong: null,
//     tongThanhTien: null
//   });
//   const [filterNgay, setFilterNgay] = useState(0);
//   const [labelTextNgay, setLabelTextNgay] = useState("Hôm nay");
//   const [filterThang, setFilterThang] = useState(0);
//   const [labelTextThang, setLabelTextThang] = useState("Hàng bán được tháng này");
//   const [selectedLimitSanPham] = useState(0);
//   const [selectedLimitKhachHang] = useState(0);
//   const [topSanPham, setTopSanPham] = useState([]);
//   const [topKhachHang, setTopKhachHang] = useState([]);
//   const optionsNgay = [0, 5, 10, 20, 30];
//   const optionsThang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//
//   // Gọi API khi component được render
//   useEffect(() => {
//     const fetchDataAndResetData = async () => {
//       await handleNgayFilterChange();
//       await handleThangFilterChange();
//       await handleSumHoaDon();
//       await fetchDataForTopSanPham();
//       await fetchDataForTopKhachHang();
//     };
//     fetchDataAndResetData();
//   }, [filterNgay, filterThang, selectedLimitSanPham, selectedLimitKhachHang]);
//
//   const handleNgayFilterChange = async () => {
//     try {
//       const response = await ThongKeService.theoNgay(filterNgay);
//       setThongKeDonHangTheoNgay(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error, show a notification, or perform other actions as needed
//     }
//   };
//
//   useEffect(() => {
//     if (filterNgay === 0) {
//       setLabelTextNgay("Hôm nay");
//     } else {
//       setLabelTextNgay(`${filterNgay} ngày trước`);
//     }
//   }, [filterNgay]);
//
//   const handleSumHoaDon = async () => {
//     try {
//       const response = await ThongKeService.tongDoanhThu();
//       console.log(response);
//       setThongKeTongDoanhThu(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error, show a notification, or perform other actions as needed
//     }
//   };
//
//   const handleThangFilterChange = async () => {
//     try {
//       const response = await ThongKeService.theoThang(filterThang);
//       console.log(response);
//       setThongKeDonHangTheoThang(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error, show a notification, or perform other actions as needed
//     }
//   };
//
//   useEffect(() => {
//     if (filterThang === 0) {
//       setLabelTextThang("Hàng bán được tháng này");
//     } else {
//       setLabelTextThang(`Hàng bán được ${filterThang} tháng trước`);
//     }
//   }, [filterThang]);
//
//   const fetchDataForTopSanPham = async () => {
//     const response = await ThongKeService.topSanPham(5);
//     setTopSanPham(response);
//   };
//
//   const fetchDataForTopKhachHang = async () => {
//     const response = await ThongKeService.topKhachHang(5);
//     setTopKhachHang(response);
//   };
//
//   return (
//     <MainCard title="Thống Kê">
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <SubCard
//             sx={{
//               boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
//               borderLeft: "10px solid rgb(216, 67, 21)",
//               background: "rgb(251, 233, 231)",
//               height: "115px"
//             }}
//           >
//             <Grid container spacing={1}>
//               <Grid item xs={12}>
//                 <Typography component="legend" style={{fontSize: "20px",fontWeight: "bold"}}>
//                   Tổng doanh thu
//                 </Typography>
//                 <Typography component="legend" style={{fontSize: "16px", marginTop: "30px", fontWeight: "bold", color: "#D84315"}}>
//                   {thongKeTongDoanhThu?.soLuong} đơn hàng /{" "}
//                   {thongKeTongDoanhThu?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </SubCard>
//         </Grid>
//         <Grid item xs={4}>
//           <SubCard
//             sx={{
//               boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
//               borderLeft: "10px solid rgb(255, 193, 7)",
//               background: "rgb(255, 248, 225)",
//               height: "115px"
//             }}
//           >
//             <Box style={{display: "flex"}}>
//               <Grid item xs={8}>
//                 <Typography component="legend" style={{fontSize: "20px", fontWeight: "bold"}}>
//                   {labelTextNgay}
//                 </Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControl sx={{ mt: 1,minWidth: 120}} size="small">
//                   <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     // label="Chọn ngày"
//                     value={filterNgay}
//                     onChange={(e) => setFilterNgay(e.target.value)}
//                   >
//                     {optionsNgay.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {`${option} ngày trước`}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={1}></Grid>
//             </Box>
//             <Typography component="legend" style={{fontSize: "16px", marginTop: "10px", fontWeight: "bold", color: "#FFC107"}}>
//               {thongKeDonHangTheoNgay?.soLuong} đơn hàng /{" "}
//               {thongKeDonHangTheoNgay?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
//             </Typography>
//           </SubCard>
//         </Grid>
//         <Grid item xs={4}>
//           <SubCard
//             sx={{
//               boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
//               borderLeft: "10px solid rgb(0, 200, 83)",
//               background: "rgb(185, 246, 202)",
//               height: "115px"
//             }}
//           >
//             <Box style={{display: "flex"}}>
//               <Grid item xs={8}>
//                 <Typography component="legend" style={{fontSize: "20px", fontWeight: "bold"}}>
//                   {labelTextThang}
//                 </Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControl sx={{minWidth: 120}} size="small">
//                   <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     // label="Chọn tháng"
//                     value={filterThang}
//                     onChange={(e) => setFilterThang(e.target.value)}
//                   >
//                     {optionsThang.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {`${option} tháng trước`}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={1}></Grid>
//             </Box>
//             <Typography component="legend" style={{fontSize: "16px", marginTop: "10px", fontWeight: "bold", color: "#00C853"}}>
//               {thongKeDonHangTheoThang?.soLuong} đơn hàng /{" "}
//               {thongKeDonHangTheoThang?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
//             </Typography>
//           </SubCard>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2} style={{marginTop: "10px"}}>
//         <Grid item xs={8}>
//           <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>Biểu đồ cột</SubCard>
//         </Grid>
//         <Grid item xs={4}>
//           <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>Biều đồ tròn</SubCard>
//         </Grid>
//       </Grid>
//
//       <Grid container spacing={2} style={{marginTop: "10px"}}>
//         <Grid item xs={6}>
//           <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
//             <Typography variant="h4" mb={2}>
//               Top sản phẩm bán chạy nhất
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table style={{marginBottom: "30px"}} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>#</TableCell>
//                     <TableCell>Mã sản phẩm</TableCell>
//                     <TableCell>Tên sản phẩm</TableCell>
//                     <TableCell>Giá bán</TableCell>
//                     <TableCell>Số lượng đã bán được</TableCell>
//                     <TableCell>Trạng thái</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {topSanPham.map((row, index) => (
//                     <TableRow key={row?.chiTietSanPham?.id}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{row?.chiTietSanPham?.sanPham?.ma}</TableCell>
//                       <TableCell>
//                         <div style={{display: "flex", alignItems: "center"}}>
//                           <Avatar
//                             style={{width: "50px", height: "50px"}}
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU"
//                             variant="circle"
//                           />
//                           <p style={{marginLeft: "10px"}}>{row?.chiTietSanPham?.sanPham?.ten}</p>
//                         </div>
//                       </TableCell>
//                       <TableCell>{row?.chiTietSanPham?.sanPham?.gia}</TableCell>
//                       <TableCell>{row?.totalSold}</TableCell>
//                       <TableCell>
//                         <Chip
//                           style={{color: "white"}}
//                           label={row?.chiTietSanPham?.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
//                           color={row?.chiTietSanPham?.trangThai === "ACTIVE" ? "success" : "error"}
//                           size="small"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </SubCard>
//         </Grid>
//         <Grid item xs={6}>
//           <SubCard sx={{marginTop: "20px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
//             <Typography variant="h4" mb={2}>
//               Top khách hàng có số điểm thành viên cao nhất
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table style={{marginBottom: "30px"}} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>#</TableCell>
//                     <TableCell>Mã khách hàng</TableCell>
//                     <TableCell>Tên khách hàng</TableCell>
//                     <TableCell>Giới tính</TableCell>
//                     <TableCell>Số điểm</TableCell>
//                     <TableCell>Trang thái</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {topKhachHang.map((row, index) => (
//                     <TableRow key={row?.id}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{row?.ma}</TableCell>
//                       <TableCell>
//                         <div style={{display: "flex", alignItems: "center"}}>
//                           <Avatar
//                             style={{width: "50px", height: "50px"}}
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU"
//                             variant="circle"
//                           />
//                           <p style={{marginLeft: "10px"}}>{row?.ten}</p>
//                         </div>
//                       </TableCell>
//                       <TableCell>{row?.gioiTinh ? "Nam" : "Nữ"}</TableCell>
//                       <TableCell>{row?.soDiem}</TableCell>
//                       <TableCell>
//                         <Chip
//                           style={{color: "white"}}
//                           label={row?.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
//                           color={row?.trangThai === "ACTIVE" ? "success" : "error"}
//                           size="small"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </SubCard>
//         </Grid>
//       </Grid>
//     </MainCard>
//   );
// };
//
// export default ThongKe;
