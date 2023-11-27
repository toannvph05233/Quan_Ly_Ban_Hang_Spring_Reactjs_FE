import {AccountCircleIcon} from "../assets/icon/Icon";

const TaiKhoan = {
  id: "taiKhoan",
  type: "group",
  children: [
    {
      id: "TaiKhoan",
      title: "Tài Khoản",
      type: "collapse",
      icon: AccountCircleIcon,
      children: [
        {
          id: "nhan-vien",
          title: "Nhân Viên",
          type: "item",
          url: "/tai-khoan/nhan-vien",
          breadcrumbs: false
        },
        {
          id: "khach-hang",
          title: "Khách Hàng",
          type: "item",
          url: "/tai-khoan/khach-hang",
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default TaiKhoan;
