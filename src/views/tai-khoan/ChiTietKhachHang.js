import {
  Button,
  Chip,
  Divider,
  Grid,
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
import SubCard from "../../ui-component/cards/SubCard";
import {Avatar} from "@files-ui/react";
import InsightsIcon from "@mui/icons-material/Insights";
import TimelineIcon from "@mui/icons-material/Timeline";
import React, {useEffect, useState} from "react";
import {VisibilityIcon} from "../../assets/icon/Icon";
import {useParams} from "react-router";
import {getOne} from "../../service/CrudService";
import dayjs from "dayjs";

const ChiTietKhachHang = () => {
  // const [ setListThuHang] = useState([]);
  const {id} = useParams();
  const [khachHang, setKhachHang] = useState({
    thuHang: "",
    ma: "",
    ten: "",
    anh: "",
    gioiTinh: "",
    ngaySinh: "",
    diaChi: "",
    sdt: "",
    email: "",
    trangThai: "",
    hoaDonList: [
      {
        khachHang: null,
        nhanVien: null,
        ma: "",
        ngayTao: "",
        ngayMuonNhan: "",
        thanhTien: null,
        tenNguoiNhan: "",
        diaChi: "",
        sdtNguoiNhan: "",
        sdtNguoiShip: "",
        phanTramGiamGia: null,
        hinhThucBanHang: "",
        trangThai: ""
      }
    ]
  });

  // const fetchDataThuHang = async () => {
  //   const response = await getAllList("thu-hang");
  //   setListThuHang(response);
  // };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      // await fetchDataThuHang();
      if (id) {
        let response = await getOne(id, "khach-hang");
        setKhachHang(response);
      }
    };
    fetchDataAndResetData();
  }, []);

  const hinhThucBanHang = {
    STORE: {label: "STORE", color: "#00CC00"},
    DELIVERY: {label: "DELIVERY", color: "#CC6600"},
    ONLINE: {label: "ONLINE", color: "#0033CC"}
  };
  const hinhThucBanHangTranslations = {
    STORE: "Bán tại cửa hàng",
    DELIVERY: "Bán taị cửa hàng và giao hàng",
    ONLINE: "Bán trên web"
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

  const imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtb--m7mXb8K0Uu0wO_QS_HkPg0S2ThJyhA&usqp=CAU";
  return (
    <Typography component="legend" variant="body4">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <SubCard sx={{height: "350px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
            <Grid container className="css-border-anh-ten">
              <Grid item xs={4} pb={3}>
                <Avatar src={imageSrc} variant="circle" alt="Isabella" changeLabel={"Vui lòng chọn ảnh?"} onChange={() => {}} />
              </Grid>
              <Grid item xs={5} pt={5}>
                <Typography variant="h1" gutterBottom>
                  {khachHang.ten}
                </Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography component="legend" mt={2}>
                      Ngày sinh:
                    </Typography>
                    <Typography component="legend" mt={2}>
                      Email:
                    </Typography>
                    <Typography component="legend" mt={2}>
                      Số điện thoại:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography component="legend" mt={2}>
                      {dayjs(khachHang?.ngaySinh).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography component="legend" mt={2}>
                      {khachHang.email}
                    </Typography>
                    <Typography component="legend" mt={2}>
                      {khachHang.sdt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} pt={8} pl={3}>
                <img
                  className="css-anh-hang-vang"
                  alt="Hạng Vàng"
                  src="data:image/jpeg;base64,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"
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container mt={3}>
              <Grid item xs={4}>
                <Typography component="legend">Mã</Typography>
                <Typography component="legend" style={{fontWeight: "bold"}} mt={1}>
                  {khachHang.ma}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography component="legend">Giới tính</Typography>
                <Typography component="legend" style={{fontWeight: "bold"}} mt={1}>
                  {khachHang.gioiTinh ? "Nam" : "Nữ"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography component="legend">Trạng thái</Typography>
                <Typography component="legend" style={{fontWeight: "bold"}} mt={1}>
                  {khachHang.trangThai === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                </Typography>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={4}>
          <SubCard sx={{height: "350px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
            <Typography variant="h3" pb={5}>
              Địa Chỉ Mặc Định
            </Typography>
            <Divider />
            <Grid container pt={5} pb={2} spacing={1} className="css-dia-chi">
              <Grid item xs={4}>
                <Typography component="legend" style={{fontWeight: 500}}>
                  Địa Chỉ
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="legend">{khachHang.diaChi}</Typography>
              </Grid>
            </Grid>

            <Grid container pt={3} spacing={1}>
              <Grid item xs={4}>
                <Typography component="legend" style={{fontWeight: 500}}>
                  Địa Chỉ Giao Hàng
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="legend">{khachHang.diaChi}</Typography>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{marginTop: "15px"}}>
        <Grid item xs={4}>
          <SubCard
            sx={{
              boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
              borderLeft: "10px solid rgb(216, 67, 21)",
              background: "rgb(251, 233, 231)",
              height: "115px"
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Typography component="legend">Số Tiền Đã Chi Tiêu</Typography>
                <Typography component="legend" style={{fontSize: "25px", marginTop: "10px", fontWeight: "bold"}}>
                  5.000.000
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Avatar
                  readOnly
                  variant="circle"
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAByCAMAAAAbB9HMAAAAZlBMVEXaJR3//wDYAB7vsBHWAB/YEB7aIB3xvhDZGR3ojRbzyA788gb44Ar77Aj99QX21gzrnxT++QPdRRv66Aj1zg3nhhblexjaMR3hYxnwtxHhXxrjchjtrBLokRblgBfdQBzjbBjeUhttjKlBAAACh0lEQVR4nO2a27aqMAxFaWxDARGpKBcvm/3/P7lFUalHEH2gYZzMR+VhjpqshlbPYxiGYRiGYRiGYZj/He1aYDywANcKY0GzMehaYiQqEIFyLTESyEQ2lyIAIcRMXNX27LqdRxFAeHYNZ7GwaKKzazSLJNA70bCbw34gw4trKF2LjECJKzNoLrVrXXf0ZZXfuvrkXTGPWtcop54EuhA3CupJ0KbAHJIA8/juGhMvAr0TD4hvB1B2XEvaM4FMO64p6YLVlehSUS4CqwSIFIGC1+DScl1iz3NTbmnbcvESX9j4rx8rg+lUMX+W+oxwyuRFuV99bbray2k3CWWSL1UTM/kApmH9leoaXAQZVJuPTTeFoxhTefahapY7G8BRBul7wTtpMHFT2Sgzvg420zeVjcbDSNUDOp8OEPbxe1ER74HC5A0jojYxFMYYr2mxd1G7dtpUNqoaqoO4InVUoLz+acb3SKme88D0JW1qnPf/EyroXVdy9xxy2eu6JPaKiL0l0BQBnRBoUMdeVSGOtIpAD01cGanmQm9AVQiPUhFcrrT6IXXZBU8TwVOjJUSGgQY09ha7rO0EiwklgbZL4CC1tKfaLZ3ukt0UWBVNdaqie4CQ0dkOoKMVtq9/Kg87n5IpWHV6NFWgbqWJqvPieKKSBHCfB+Oqu4DwmGp9IguLP7crrVLaPaTlov0m+qGRBLpum+r07+LBqW2xmkYStFdaSf7qd4b8uk3QuOxCvJTAuuedGq9ndBFSKILLlVY6cKYGRZMHJC67VHluKj1konXzCIXU0qv0+OZMBeGYrgisq66j3/fhCb8RgSTQ9eDvf39ME3Ad/f9RAqoMwzAMwzAMwzAMwzAMMyF/BIQXuQy4jAcAAAAASUVORK5CYII="
                  }
                  alt="Isabella"
                  style={{width: "70px", height: "70px"}}
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={4}>
          <SubCard
            sx={{
              boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
              borderLeft: "10px solid rgb(255, 193, 7)",
              background: "rgb(255, 248, 225)",
              height: "115px"
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Typography component="legend">Số Điểm Hiện Có</Typography>
                <Typography component="legend" style={{fontSize: "25px", marginTop: "10px", fontWeight: "bold"}}>
                  200
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <InsightsIcon
                  style={{
                    width: "80px",
                    height: "80px",
                    color: "rgb(255, 193, 7)"
                  }}
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={4}>
          <SubCard
            sx={{
              boxShadow: "0 0 4px 4px rgb(245, 242, 242)",
              borderLeft: "10px solid rgb(0, 200, 83)",
              background: "rgb(185, 246, 202)",
              height: "115px"
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <Typography component="legend">Số Lượng Đơn Hàng Đã Mua</Typography>
                <Typography component="legend" style={{fontSize: "25px", marginTop: "10px", fontWeight: "bold"}}>
                  50
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TimelineIcon style={{width: "90px", height: "90px", color: "rgb(0, 200, 83)"}} />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
      <SubCard sx={{marginTop: "25px", boxShadow: "0 0 4px 4px rgb(245, 242, 242)"}}>
        <Typography variant="h3" mb={2}>
          Đơn Hàng Đã Mua
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell>Ngày nhận hàng</TableCell>
                <TableCell>Hình thức mua hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thành tiền</TableCell>
                <TableCell>Hoạt Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {khachHang.hoaDonList.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.ma}</TableCell>
                  <TableCell>{row?.ngayMuonNhan}</TableCell>
                  <TableCell>
                    <Chip
                      style={{color: "white", backgroundColor: hinhThucBanHang[row?.hinhThucBanHang]?.color}}
                      label={hinhThucBanHangTranslations[row?.hinhThucBanHang] || hinhThucBanHang[row?.hinhThucBanHang]?.label}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      style={{color: "white", backgroundColor: trangThaiHoaDon[row?.trangThai]?.color}}
                      label={trangThaiTranslations[row?.trangThai] || trangThaiHoaDon[row?.trangThai]?.label}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row?.thanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</TableCell>
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
        </TableContainer>
      </SubCard>
    </Typography>
  );
};

export default ChiTietKhachHang;
