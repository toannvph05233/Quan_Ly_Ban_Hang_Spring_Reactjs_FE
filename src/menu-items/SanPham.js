// assets
import {DnsIcon} from "../assets/icon/Icon";

const SanPham = {
  id: "sanPham",
  type: "group",
  children: [
    {
      id: "thuocTinhSanPham",
      title: "Sản Phẩm",
      type: "collapse",
      icon: DnsIcon,
      children: [
        {
          id: "san-pham",
          title: "Sản Phẩm",
          type: "item",
          url: "/san-pham/san-pham",
          breadcrumbs: false
        },
        {
          id: "kich-thuoc",
          title: "Kích Thước",
          type: "item",
          url: "/san-pham/kich-thuoc",
          breadcrumbs: false
        },
        {
          id: "mau-sac",
          title: "Màu Sắc",
          type: "item",
          url: "/san-pham/mau-sac",
          breadcrumbs: false
        },
        {
          id: "thuong-hieu",
          title: "Thương Hiệu",
          type: "item",
          url: "/san-pham/thuong-hieu",
          breadcrumbs: false
        },
        {
          id: "cau-thu",
          title: "Cầu Thủ",
          type: "item",
          url: "/san-pham/cau-thu",
          breadcrumbs: false
        },
        {
          id: "dong-san-pham",
          title: "Dòng Sản Phẩm",
          type: "item",
          url: "/san-pham/dong-san-pham",
          breadcrumbs: false
        },
        {
          id: "nuoc-san-xuat",
          title: "Nước Sản Xuất",
          type: "item",
          url: "/san-pham/nuoc-san-xuat",
          breadcrumbs: false
        },
        {
          id: "cong-nghe",
          title: "Công Nghệ",
          type: "item",
          url: "/san-pham/cong-nghe",
          breadcrumbs: false
        },
        {
          id: "co-ao",
          title: "Cổ Áo",
          type: "item",
          url: "/san-pham/co-ao",
          breadcrumbs: false
        },
        {
          id: "nha-san-xuat",
          title: "Nhà Sản Xuất",
          type: "item",
          url: "/san-pham/nha-san-xuat",
          breadcrumbs: false
        },
        {
          id: "loai-san-pham",
          title: "Loại Sản Phẩm",
          type: "item",
          url: "/san-pham/loai-san-pham",
          breadcrumbs: false
        },
        {
          id: "chat-lieu",
          title: "Chất Liệu",
          type: "item",
          url: "/san-pham/chat-lieu",
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default SanPham;
