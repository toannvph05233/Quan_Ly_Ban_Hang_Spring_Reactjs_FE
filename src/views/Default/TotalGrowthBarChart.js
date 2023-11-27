import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
// material-ui
import {useTheme} from "@mui/material/styles";
import {Grid, TextField} from "@mui/material";
// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
// project imports
import SkeletonTotalGrowthBarChart from "ui-component/cards/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import {gridSpacing} from "store/constant";
import {getNgayTao} from "../../service/ThongKeService";

const TotalGrowthBarChart = ({isLoading}) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const {navType} = customization;
  const {primary} = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const [apiData, setApiData] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  const fetchChartData = async () => {
    try {
      let response;
      response = await getNgayTao(startDate, endDate);
      const sortedApiData = response.data.sort((a, b) => new Date(a.ngayTao) - new Date(b.ngayTao));
      setApiData(sortedApiData);
    } catch (e) {
      console.log("Something went wrong" + e.message);
    }
  };

  useEffect(() => {
    const fetchDataUseEffect = async () => {
      await fetchChartData();
    };
    fetchDataUseEffect();
  }, [startDate, endDate]);

  const chartData = {
    series: [
      {
        name: "Tổng thành tiền",
        type: "column",
        data: apiData.map((item) => item.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"}))
      },
      {
        name: "Số lượng",
        type: "line",
        data: apiData.map((item) => item.soLuong)
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Traffic Sources"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      xaxis: {
        type: "category",
        categories: apiData.map((item) => item.ngayTao)
      },
      yaxis: [
        {
          title: {
            text: "Số lượng"
          }
        },
        {
          opposite: true,
          title: {
            text: "Tổng thành tiền"
          }
        }
      ]
    }
  };

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primaryDark],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: "light"
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={6} style={{marginTop: "15px"}}>
                      <TextField
                        label="Từ ngày"
                        type={"date"}
                        name="tenct"
                        variant="outlined"
                        focused
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} style={{marginTop: "15px"}}>
                      <TextField
                        label="Đến ngày"
                        type={"date"}
                        name="tenct"
                        variant="outlined"
                        focused
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
