import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";

// material-ui
import {styled, useTheme} from "@mui/material/styles";
import {Avatar, Box, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonEarningCard from "ui-component/cards/EarningCard";

// assets
// import EarningIcon from 'assets/images/icons/earning.svg';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import * as ThongKeService from "../../service/ThongKeService";
import {DescriptionIcon} from "../../assets/icon/Icon";

const CardWrapper = styled(MainCard)(({theme}) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.light} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130
  }
}));
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({isLoading}) => {
  const theme = useTheme();

  // const [anchorEl, setAnchorEl] = useState(null);
  //
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [thongKeDonHangTheoThang, setThongKeDonHangTheoThang] = useState({
    soLuong: null,
    tongThanhTien: null
  });
  const [filterThang, setFilterThang] = useState(0);
  const [labelTextThang, setLabelTextThang] = useState("Hàng bán được tháng này");
  const optionsThang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await handleThangFilterChange();
    };
    fetchDataAndResetData();
  }, [filterThang]);

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

  useEffect(() => {
    if (filterThang === 0) {
      setLabelTextThang("Hàng bán được tháng này");
    } else {
      setLabelTextThang(`Hàng bán được ${filterThang} tháng trước`);
    }
  }, [filterThang]);

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{p: 2.25}}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        color: "#fff",
                        mt: 1
                      }}
                    >
                      <DescriptionIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <FormControl sx={{minWidth: 120}} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      // label="Chọn tháng"
                      value={filterThang}
                      onChange={(e) => setFilterThang(e.target.value)}
                    >
                      {optionsThang.map((option) => (
                        <MenuItem key={option} value={option}>
                          {`${option === 0 ? "Tháng này" : `${option} tháng trước`}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{fontSize: "2.125rem", fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75}}>
                      {thongKeDonHangTheoThang?.soLuong} đơn hàng /{" "}
                      {thongKeDonHangTheoThang?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark
                      }}
                    >
                      <ArrowUpwardIcon fontSize="inherit" sx={{transform: "rotate3d(1, 1, 1, 45deg)"}} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{mb: 1.25}}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[200]
                  }}
                >
                  {labelTextThang}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
