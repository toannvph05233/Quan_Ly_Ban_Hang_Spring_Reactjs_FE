import {lazy} from "react";
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import HoaDon from "../views/hoa-don/HoaDon";
import GiaoDich from "../views/hoa-don/GiaoDich";

const SanPham = Loadable(lazy(() => import("views/san-pham/SanPham")));
const ThemHoacSuaSanPham = Loadable(lazy(() => import("views/san-pham/ThemHoacSuaSanPham")));
const ChatLieu = Loadable(lazy(() => import("views/san-pham/ChatLieu")));
const KichThuoc = Loadable(lazy(() => import("views/san-pham/KichThuoc")));
const MauSac = Loadable(lazy(() => import("views/san-pham/MauSac")));
const ThuongHieu = Loadable(lazy(() => import("views/san-pham/ThuongHieu")));
const CauThu = Loadable(lazy(() => import("views/san-pham/CauThu")));
const DongSanPham = Loadable(lazy(() => import("views/san-pham/DongSanPham")));
const NuocSanXuat = Loadable(lazy(() => import("views/san-pham/NuocSanXuat")));
const CongNghe = Loadable(lazy(() => import("views/san-pham/CongNghe")));
const CoAo = Loadable(lazy(() => import("views/san-pham/CoAo")));
const NhaSanXuat = Loadable(lazy(() => import("views/san-pham/NhaSanXuat")));
const LoaiSanPham = Loadable(lazy(() => import("views/san-pham/LoaiSanPham")));
// const ThongKe = Loadable(lazy(() => import("views/thong-ke/ThongKe")));
const BanHang = Loadable(lazy(() => import("views/ban-hang/BanHang")));
const NhanVien = Loadable(lazy(() => import("views/tai-khoan/NhanVien")));
const KhachHang = Loadable(lazy(() => import("views/tai-khoan/KhachHang")));
const DoiThuong = Loadable(lazy(() => import("views/doi-thuong/DoiThuong")));
const TichDiem = Loadable(lazy(() => import("views/tich-diem/TichDiem")));
const ChiTietHoaDon = Loadable(lazy(() => import("views/hoa-don/ChiTietHoaDon")));
const HangThanhVien = Loadable(lazy(() => import("views/hang-thanh-vien/HangThanhVien")));
const ChiTietKhachHang = Loadable(lazy(() => import("../views/tai-khoan/ChiTietKhachHang")));
const ChiTietNhanVien = Loadable(lazy(() => import("../views/tai-khoan/ChiTietNhanVien")));
const Profile = Loadable(lazy(() => import("../views/profile/Profile_User")));
const Demo = Loadable(lazy(() => import("../views/Default/index")));
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "ban-hang-tai-quay",
      element: <BanHang />
    },
    {
      path: "profile/:id",
      element: <Profile />
    },
    {
      path: "san-pham",
      children: [
        {
          path: "san-pham",
          element: <SanPham />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "san-pham",
          children: [
            {
              path: "them-san-pham",
              element: <ThemHoacSuaSanPham />
            }
          ]
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "san-pham",
          children: [
            {
              path: "sua-san-pham/:id",
              element: <ThemHoacSuaSanPham />
            }
          ]
        }
      ]
    },

    {
      path: "san-pham",
      children: [
        {
          path: "chat-lieu",
          element: <ChatLieu />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "kich-thuoc",
          element: <KichThuoc />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "mau-sac",
          element: <MauSac />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "thuong-hieu",
          element: <ThuongHieu />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "cau-thu",
          element: <CauThu />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "dong-san-pham",
          element: <DongSanPham />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "nuoc-san-xuat",
          element: <NuocSanXuat />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "cong-nghe",
          element: <CongNghe />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "co-ao",
          element: <CoAo />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "nha-san-xuat",
          element: <NhaSanXuat />
        }
      ]
    },
    {
      path: "san-pham",
      children: [
        {
          path: "loai-san-pham",
          element: <LoaiSanPham />
        }
      ]
    },
    {
      path: "tai-khoan",
      children: [
        {
          path: "nhan-vien",
          element: <NhanVien />
        }
      ]
    },
    {
      path: "tai-khoan",
      children: [
        {
          path: "nhan-vien",
          children: [
            {
              path: "chi-tiet-nhan-vien/:id",
              element: <ChiTietNhanVien />
            }
          ]
        }
      ]
    },
    {
      path: "tai-khoan",
      children: [
        {
          path: "khach-hang",
          element: <KhachHang />
        }
      ]
    },
    {
      path: "tai-khoan",
      children: [
        {
          path: "khach-hang",
          children: [
            {
              path: "chi-tiet-khach-hang/:id",
              element: <ChiTietKhachHang />
            }
          ]
        }
      ]
    },
    {
      path: "thong-ke",
      element: <Demo />
    },
    {
      path: "doi-thuong",
      element: <DoiThuong />
    },

    {
      path: "hang-thanh-vien",
      element: <HangThanhVien />
    },
    {
      path: "tich-diem",
      element: <TichDiem />
    },
    {
      path: "hoa-don",
      element: <HoaDon />
    },
    {
      path: "hoa-don",
      children: [
        {
          path: "chi-tiet-hoa-don/:id",
          element: <ChiTietHoaDon />
        }
      ]
    },
    {
      path: "giao-dich",
      element: <GiaoDich />
    }
  ]
};
export default MainRoutes;
