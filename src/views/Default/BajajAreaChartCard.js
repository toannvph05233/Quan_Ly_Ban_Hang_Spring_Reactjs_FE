import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import {thongKeToanBoTrangThai} from "../../service/ThongKeService";

const Donut = () => {
  const [dataTrangThai, setDataTrangThai] = useState([]);

  const fetchDataTrangThaiUseState = async () => {
    try {
      const response = await thongKeToanBoTrangThai();
      setDataTrangThai(response);
      console.log("response pie", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataTrangThaiUseEffect = async () => {
      await fetchDataTrangThaiUseState();
    };
    fetchDataTrangThaiUseEffect();
  }, []);
  const trangThaiTranslations = {
    PENDING_CHECKOUT: "Chờ thanh toán",
    PENDING: "Đang chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang vận chuyển",
    CANCELLED: "Đã huỷ",
    APPROVED: "Đã hoàn thành",
    REVERSE: "Đã trả hàng",
    PAYMENT_SUCCESS: "Thanh toán thành công"
  };

  const seriesData = dataTrangThai?.map((item) => item?.soLuong) || [];
  const labelsData = dataTrangThai?.map((item) => trangThaiTranslations[item?.trangThai]) || [];
  const tongThanhTien = dataTrangThai?.map((item) => item?.tongThanhTien?.toLocaleString("vi-VN", {style: "currency", currency: "VND"})) || [];

  const chartData = {
    options: {
      labels: labelsData.map(String),
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      legend: {
        position: "bottom"
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (value, {seriesIndex}) {
            const tongThanhTienValue = tongThanhTien[seriesIndex];
            return `\nSố lượng: ${value}\nTổng tiền: ${tongThanhTienValue}`;
          }
        }
      }
    },
    series: seriesData
  };

  return (
    <div className="donut-container">
      <Chart {...chartData} type="pie" width="480" height={"500"} />
    </div>
  );
};

export default Donut;
