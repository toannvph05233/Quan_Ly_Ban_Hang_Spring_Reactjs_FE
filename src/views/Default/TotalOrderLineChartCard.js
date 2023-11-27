import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";

// material-ui
import {useTheme, styled} from "@mui/material/styles";
import {Avatar, Box, FormControl, Grid, MenuItem, Select, Typography} from "@mui/material";

// third-party
import Chart from "react-apexcharts";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonTotalOrderCard from "ui-component/cards/EarningCard";

import ChartDataMonth from "./chart-data/total-order-month-line-chart";
import ChartDataYear from "./chart-data/total-order-year-line-chart";

// assets
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as ThongKeService from "../../service/ThongKeService";
import {LocalMallOutlinedIcon} from "../../assets/icon/Icon";

const CardWrapper = styled(MainCard)(({theme}) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140
    }
  },
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({isLoading}) => {
  const theme = useTheme();

  const [timeValue] = useState(false);
  // const handleChangeTime = (event, newValue) => {
  //   setTimeValue(newValue);
  // };

  const [thongKeDonHangTheoNgay, setThongKeDonHangTheoNgay] = useState({
    soLuong: null,
    tongThanhTien: null
  });
  const [filterNgay, setFilterNgay] = useState(0);
  const [labelTextNgay, setLabelTextNgay] = useState("Hôm nay");
  const optionsNgay = [0, 5, 10, 20, 30];
  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await handleNgayFilterChange();
    };
    fetchDataAndResetData();
  }, [filterNgay]);
  const handleNgayFilterChange = async () => {
    try {
      const response = await ThongKeService.theoNgay(filterNgay);
      setThongKeDonHangTheoNgay(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a notification, or perform other actions as needed
    }
  };

  useEffect(() => {
    if (filterNgay === 0) {
      setLabelTextNgay("Hôm nay");
    } else {
      setLabelTextNgay(`${filterNgay} ngày trước`);
    }
  }, [filterNgay]);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
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
                        backgroundColor: theme.palette.primary[800],
                        color: "#fff",
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <FormControl sx={{mt: 1, minWidth: 120}} size="small">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={filterNgay}
                        onChange={(e) => setFilterNgay(e.target.value)}
                      >
                        {optionsNgay.map((option) => (
                          <MenuItem key={option} value={option}>
                            {`${option === 0 ? "ngày hôm nay" : `${option} ngày trước`}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{mb: 0.75}}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{fontSize: "2.125rem", fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75}}>
                          {thongKeDonHangTheoNgay?.soLuong} đơn hàng /{" "}
                          {thongKeDonHangTheoNgay?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: "pointer",
                            backgroundColor: theme.palette.primary[200],
                            color: theme.palette.primary.dark
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{transform: "rotate3d(1, 1, 1, 45deg)"}} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: theme.palette.primary[200]
                          }}
                        >
                          {labelTextNgay}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
