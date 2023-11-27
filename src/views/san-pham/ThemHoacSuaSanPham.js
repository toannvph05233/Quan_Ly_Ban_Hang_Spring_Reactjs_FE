import MainCard from "ui-component/cards/MainCard";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {AddCircleIcon} from "../../assets/icon/Icon";
import "../../assets/css/SanPham.css";
import {Dropzone, FileMosaic} from "@files-ui/react";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import {create, getAllList, getOne, updateById} from "../../service/CrudService";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useParams} from "react-router";
// import {useParams} from "react-router";

const ThemHoacSuaSanPham = () => {
  const [files, setFiles] = React.useState([]);
  const {id} = useParams();
  const [openCoAo, setOpenCoAo] = useState(false);
  const [openChatLieu, setOpenChatLieu] = useState(false);
  const [openThuongHieu, setOpenThuongHieu] = useState(false);
  const [openDongSanPham, setOpenDongSanPham] = useState(false);
  const [openNuocSanXuat, setOpenNuocSanXuat] = useState(false);
  const [openMauSac, setOpenMauSac] = useState(false);
  const [openNhaSanXuat, setOpenNhaSanXuat] = useState(false);
  const [openKichThuoc, setOpenKichThuoc] = useState(false);
  const [openCauThu, setOpenCauThu] = useState(false);
  const [openLoaiSanPham, setOpenLoaiSanPham] = useState(false);
  const [openCongNghe, setOpenCongNghe] = useState(false);
  const [listChatLieu, setListChatLieu] = useState([]);
  const [listCauThu, setListCauThu] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listLoaiSanPham, setListLoaiSanPham] = useState([]);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [listDongSanPham, setListDongSanPham] = useState([]);
  const [listNuocSanXuat, setListNuocSanXuat] = useState([]);
  const [listMauSac, setListMauSac] = useState([]);
  const [listNhaSanXuat, setListNhaSanXuat] = useState([]);
  const [listCongNghe, setListCongNghe] = useState([]);
  const [listKichThuoc, setListKichThuoc] = useState([]);

  const fetchDataChatLieu = async () => {
    const response = await getAllList("chat-lieu");
    setListChatLieu(response);
  };

  const fetchDataCauThu = async () => {
    const response = await getAllList("cau-thu");
    setListCauThu(response);
  };

  const fetchDataCoAo = async () => {
    const response = await getAllList("co-ao");
    setListCoAo(response);
  };

  const fetchDataLoaiSanPham = async () => {
    const response = await getAllList("loai-san-pham");
    setListLoaiSanPham(response);
  };

  const fetchDataThuongHieu = async () => {
    const response = await getAllList("thuong-hieu");
    setListThuongHieu(response);
  };

  const fetchDataDongSanPham = async () => {
    const response = await getAllList("dong-san-pham");
    setListDongSanPham(response);
  };

  const fetchDataNuocSanXuat = async () => {
    const response = await getAllList("nuoc-san-xuat");
    setListNuocSanXuat(response);
  };

  const fetchDataMauSac = async () => {
    const response = await getAllList("mau-sac");
    setListMauSac(response);
  };

  const fetchDataNhaSanXuat = async () => {
    const response = await getAllList("nha-san-xuat");
    setListNhaSanXuat(response);
  };

  const fetchDataCongNghe = async () => {
    const response = await getAllList("cong-nghe");
    setListCongNghe(response);
  };

  const fetchDataKichThuoc = async () => {
    const response = await getAllList("kich-thuoc");
    setListKichThuoc(response);
    console.log("kichThuoc", response);
  };

  // const ChatLieu = (e) => {
  //     const coAoId = e.target.value;
  //     const coAoDuocChon = listCoAo.find((coAo) => coAo.id === coAoId);
  //     formik.setValues((prevState) => ({
  //         ...prevState,
  //         coAo: coAoDuocChon || "",
  //     }));
  // };

  useEffect(() => {
    const fetchDataAndResetData = async () => {
      await fetchDataCauThu();
      await fetchDataChatLieu();
      await fetchDataCoAo();
      await fetchDataLoaiSanPham();
      await fetchDataThuongHieu();
      await fetchDataDongSanPham();
      await fetchDataNuocSanXuat();
      await fetchDataMauSac();
      await fetchDataNhaSanXuat();
      await fetchDataCongNghe();
      await fetchDataKichThuoc();
      if (id) {
        let response = await getOne(id, "san-pham");
        formikSanPham.setValues(response);
        console.log("detail", response);
      }
    };
    fetchDataAndResetData();
  }, []);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  // co ao
  const formikCoAo = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateCoAo();
    }
  });

  const handleCreateCoAo = async () => {
    try {
      const status = await create("co-ao", formikCoAo.values);
      console.log(formikCoAo.values);

      if (status === 201) {
        console.log(formikCoAo.values);
      }
      setOpenCoAo(false);
      await fetchDataCoAo();
      formikCoAo.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenCoAo = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "co-ao");
        formikCoAo.setValues(response);
        console.log(response);
      } else {
        formikCoAo.resetForm();
      }
      setOpenCoAo(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseCoAo = () => {
    setOpenCoAo(false);
  };

  // chat lieu
  const formikChatLieu = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateChatLieu();
    }
  });
  const handleCreateChatLieu = async () => {
    try {
      const status = await create("chat-lieu", formikChatLieu.values);
      console.log(formikChatLieu.values);

      if (status === 201) {
        console.log(formikChatLieu.values);
      }
      setOpenChatLieu(false);
      await fetchDataChatLieu();
      formikChatLieu.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenChatLieu = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "chat-lieu");
        formikChatLieu.setValues(response);
        console.log(response);
      } else {
        formikChatLieu.resetForm();
      }
      setOpenChatLieu(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseChatLieu = () => {
    setOpenChatLieu(false);
  };

  // thuong hieu
  const formikThuongHieu = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateThuongHieu();
    }
  });
  const handleCreateThuongHieu = async () => {
    try {
      const status = await create("thuong-hieu", formikThuongHieu.values);
      console.log(formikThuongHieu.values);

      if (status === 201) {
        console.log(formikThuongHieu.values);
      }
      setOpenThuongHieu(false);
      await fetchDataThuongHieu();
      formikChatLieu.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenThuongHieu = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "thuong-hieu");
        formikThuongHieu.setValues(response);
        console.log(response);
      } else {
        formikThuongHieu.resetForm();
      }
      setOpenThuongHieu(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseThuongHieu = () => {
    setOpenThuongHieu(false);
  };

  // dòng sản phẩm
  const formikDongSanPham = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateDongSanPham();
    }
  });
  const handleCreateDongSanPham = async () => {
    try {
      const status = await create("dong-san-pham", formikDongSanPham.values);
      console.log(formikDongSanPham.values);

      if (status === 201) {
        console.log(formikDongSanPham.values);
      }
      setOpenDongSanPham(false);
      await fetchDataDongSanPham();
      formikDongSanPham.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenDongSanPham = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "dong-san-pham");
        formikDongSanPham.setValues(response);
        console.log(response);
      } else {
        formikDongSanPham.resetForm();
      }
      setOpenDongSanPham(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseDongSanPham = () => {
    setOpenDongSanPham(false);
  };

  // nước sản xuất
  const formikNuocSanXuat = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateNuocSanXuat();
    }
  });
  const handleCreateNuocSanXuat = async () => {
    try {
      const status = await create("nuoc-san-xuat", formikNuocSanXuat.values);
      console.log(formikNuocSanXuat.values);

      if (status === 201) {
        console.log(formikNuocSanXuat.values);
      }
      setOpenNuocSanXuat(false);
      await fetchDataNuocSanXuat();
      formikNuocSanXuat.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenNuocSanXuat = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "nuoc-san-xuat");
        formikNuocSanXuat.setValues(response);
        console.log(response);
      } else {
        formikNuocSanXuat.resetForm();
      }
      setOpenNuocSanXuat(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseNuocSanXuat = () => {
    setOpenNuocSanXuat(false);
  };

  // màu sắc
  const formikMauSac = useFormik({
    initialValues: {
      ma: ""
    },
    validationSchema: Yup.object({
      ma: Yup.string().min(1, "Mã phải lớn hơn 5 kí tự").max(225, "Mã không dài quá 225 kí tự").required("Mã không được để trống")
    }),
    onSubmit: () => {
      handleCreateMauSac();
    }
  });
  const handleCreateMauSac = async () => {
    try {
      const status = await create("mau-sac", formikMauSac.values);
      console.log(formikMauSac.values);

      if (status === 201) {
        console.log(formikMauSac.values);
      }
      setOpenMauSac(false);
      await fetchDataMauSac();
      formikMauSac.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenMauSac = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "mau-sac");
        formikMauSac.setValues(response);
        console.log(response);
      } else {
        formikMauSac.resetForm();
      }
      setOpenMauSac(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseMauSac = () => {
    setOpenMauSac(false);
  };

  // nhà sản xuất
  const formikNhaSanXuat = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateNhaSanXuat();
    }
  });
  const handleCreateNhaSanXuat = async () => {
    try {
      const status = await create("nha-san-xuat", formikNhaSanXuat.values);
      console.log(formikNhaSanXuat.values);

      if (status === 201) {
        console.log(formikNhaSanXuat.values);
      }
      setOpenNhaSanXuat(false);
      await fetchDataNhaSanXuat();
      formikNhaSanXuat.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenNhaSanXuat = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "nha-san-xuat");
        formikNhaSanXuat.setValues(response);
        console.log(response);
      } else {
        formikNhaSanXuat.resetForm();
      }
      setOpenNhaSanXuat(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseNhaSanXuat = () => {
    setOpenNhaSanXuat(false);
  };

  // cầu thủ
  const formikCauThu = useFormik({
    initialValues: {
      ten: "",
      soAo: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      soAo: Yup.string()
        .min(1, "Số áo phải lớn hơn 1 kí tự")
        .max(225, "Số áo không dài quá 225 kí tự")
        .required("Số áo không được để trống")
    }),
    onSubmit: () => {
      handleCreateCauThu();
    }
  });
  const handleCreateCauThu = async () => {
    try {
      const status = await create("cau-thu", formikCauThu.values);
      console.log(formikCauThu.values);

      if (status === 201) {
        console.log(formikCauThu.values);
      }
      setOpenCauThu(false);
      await fetchDataCauThu();
      formikCauThu.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenCauThu = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "cau-thu");
        formikCauThu.setValues(response);
        console.log(response);
      } else {
        formikCauThu.resetForm();
      }
      setOpenCauThu(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseCauThu = () => {
    setOpenCauThu(false);
  };

  // loại sản phẩm
  const formikLoaiSanPham = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateLoaiSanPham();
    }
  });
  const handleCreateLoaiSanPham = async () => {
    try {
      const status = await create("loai-san-pham", formikLoaiSanPham.values);
      console.log(formikLoaiSanPham.values);

      if (status === 201) {
        console.log(formikLoaiSanPham.values);
      }
      setOpenLoaiSanPham(false);
      await fetchDataLoaiSanPham();
      formikLoaiSanPham.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenLoaiSanPham = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "loai-san-pham");
        formikLoaiSanPham.setValues(response);
        console.log(response);
      } else {
        formikLoaiSanPham.resetForm();
      }
      setOpenLoaiSanPham(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseLoaiSanPham = () => {
    setOpenLoaiSanPham(false);
  };

  // công nghệ
  const formikCongNghe = useFormik({
    initialValues: {
      ten: "",
      moTa: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      moTa: Yup.string()
        .min(1, "Mô tả phải lớn hơn 5 kí tự")
        .max(225, "Mô tả không dài quá 225 kí tự")
        .required("Mô tả không được để trống")
    }),
    onSubmit: () => {
      handleCreateCongNghe();
    }
  });
  const handleCreateCongNghe = async () => {
    try {
      const status = await create("cong-nghe", formikCongNghe.values);
      console.log(formikCongNghe.values);

      if (status === 201) {
        console.log(formikCongNghe.values);
      }
      setOpenCongNghe(false);
      await fetchDataCongNghe();
      formikCongNghe.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenCongNghe = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "cong-nghe");
        formikCongNghe.setValues(response);
        console.log(response);
      } else {
        formikCongNghe.resetForm();
      }
      setOpenCongNghe(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseCongNghe = () => {
    setOpenCongNghe(false);
  };

  // kích thước
  const formikKichThuoc = useFormik({
    initialValues: {
      ten: ""
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống")
    }),
    onSubmit: () => {
      handleCreateKichThuoc();
    }
  });
  const handleCreateKichThuoc = async () => {
    try {
      const status = await create("kich-thuoc", formikKichThuoc.values);
      console.log(formikKichThuoc.values);

      if (status === 201) {
        console.log(formikKichThuoc.values);
      }
      setOpenKichThuoc(false);
      await fetchDataKichThuoc();
      formikKichThuoc.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenKichThuoc = async (post = null) => {
    try {
      if (post) {
        const response = await getOne(post.id, "kich-thuoc");
        formikKichThuoc.setValues(response);
        console.log(response);
      } else {
        formikKichThuoc.resetForm();
      }
      setOpenKichThuoc(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseKichThuoc = () => {
    setOpenKichThuoc(false);
  };

  const formikSanPham = useFormik({
    initialValues: {
      ten: "",
      gia: "",
      moTa: "",
      gioiTinh: "",
      namSanXuat: "",
      coAo: null,
      chatLieu: null,
      thuongHieu: null,
      dongSanPham: null,
      nuocSanXuat: null,
      mauSac: null,
      nhaSanXuat: null,
      cauThu: null,
      loaiSanPham: null,
      congNghe: null,
      chiTietSanPhamList: [
        {
          kichThuoc: null,
          soLuong: "",
          sku: ""
        }
      ]
    },
    validationSchema: Yup.object({
      ten: Yup.string().min(1, "Tên phải lớn hơn 1 kí tự").max(225, "Tên không dài quá 225 kí tự").required("Tên không được để trống"),
      gia: Yup.string()
        .required("Giá tiền không được để trống")
        .min(1, "Giá tiền phải lớn hơn 0")
        .test("is-positive", "Giá tiền không được nhập số âm", (value) => {
          return parseInt(value, 10) >= 0;
        }),
      moTa: Yup.string().nullable().required("Mô tả không được để trống"),
      gioiTinh: Yup.string().required("Giới tính không được để trống").oneOf(["true", "false"], "Giới tính không hợp lệ"),
      coAo: Yup.object().nullable().required("Cổ áo không được để trống"),
      chatLieu: Yup.object().nullable().required("Chất liệu không được để trống"),
      thuongHieu: Yup.object().nullable().required("Thương hiệu không được để trống"),
      dongSanPham: Yup.object().nullable().required("Dòng sản phẩm không được để trống"),
      nuocSanXuat: Yup.object().nullable().required("Nước sản xuất không được để trống"),
      mauSac: Yup.object().nullable().required("Màu sắc không được để trống"),
      nhaSanXuat: Yup.object().nullable().required("Nhà sản xuất không được để trống"),
      cauThu: Yup.object().nullable().required("Cầu thủ không được để trống"),
      loaiSanPham: Yup.object().nullable().required("Loại cầu thủ không được để trống"),
      congNghe: Yup.object().nullable().required("Công nghệ không được để trống"),
      namSanXuat: Yup.date().nullable().required("Ngày sản xuất không được để trống"),
      chiTietSanPhamList: Yup.array().of(
        Yup.object().shape({
          kichThuoc: Yup.object()
            .nullable()
            .shape({
              ten: Yup.string().required("Kích thước không được để trống")
            }),
          soLuong: Yup.number()
            .typeError("Số lượng phải là một số")
            .min(0, "Số lượng phải lớn hơn hoặc bằng 0")
            .required("Số lượng không được để trống"),
          sku: Yup.string().required("Mã sku không được để trống")
        })
      )
    }),
    onSubmit: () => {
      handleCreateOrUpdateSanPham();
    }
  });

  const handleCreateOrUpdateSanPham = async () => {
    try {
      const filteredChiTietSanPhamList = formikSanPham.values.chiTietSanPhamList.filter((item) => item.kichThuoc !== null);

      let status;
      if (formikSanPham.values.id) {
        status = await updateById(formikSanPham.values.id, "san-pham", {
          ...formikSanPham.values,
          chiTietSanPhamList: filteredChiTietSanPhamList
        });
        console.log("update", formikSanPham.values);
      } else {
        status = await create("san-pham", {
          ...formikSanPham.values,
          chiTietSanPhamList: filteredChiTietSanPhamList
        });
      }

      console.log("status: " + status);
      console.log("formikSanPham.values", formikSanPham.values);
      console.log("listKichThuoc", listKichThuoc);
    } catch (e) {
      console.log("Something went wrong: ", e.message);
    }
  };

  const handleChangeCoAo = (e) => {
    const coAoId = e.target.value;
    const coAoDuocChon = listCoAo.find((coAo) => coAo.id === coAoId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      coAo: coAoDuocChon || ""
    }));
  };

  const handleChangeChatLieu = (e) => {
    const chatLieuId = e.target.value;
    const chatLieuDuocChon = listChatLieu.find((chatLieu) => chatLieu.id === chatLieuId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      chatLieu: chatLieuDuocChon || ""
    }));
  };

  const handleChangeDongSanPham = (e) => {
    const dongSanPhamId = e.target.value;
    const dongSanPhamDuocChon = listDongSanPham.find((dongSanPham) => dongSanPham.id === dongSanPhamId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      dongSanPham: dongSanPhamDuocChon || ""
    }));
    console.log(dongSanPhamDuocChon);
  };

  const handleChangeThuongHieu = (e) => {
    const thuongHieuId = e.target.value;
    const thuongHieuDuocChon = listThuongHieu.find((thuongHieu) => thuongHieu.id === thuongHieuId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      thuongHieu: thuongHieuDuocChon || ""
    }));
  };

  const handleChangeNuocSanXuat = (e) => {
    const nuocSanXuatId = e.target.value;
    const nuocSanXuatDuocChon = listNuocSanXuat.find((nuocSanXuat) => nuocSanXuat.id === nuocSanXuatId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      nuocSanXuat: nuocSanXuatDuocChon || ""
    }));
  };

  const handleChangeMauSac = (e) => {
    const mauSacId = e.target.value;
    const mauSacDuocChon = listMauSac.find((mauSac) => mauSac.id === mauSacId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      mauSac: mauSacDuocChon || ""
    }));
  };

  const handleChangeNhaSanXuat = (e) => {
    const nhaSanXuatId = e.target.value;
    const nhaSanXuatDuocChon = listNhaSanXuat.find((nhaSanXuat) => nhaSanXuat.id === nhaSanXuatId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      nhaSanXuat: nhaSanXuatDuocChon || ""
    }));
  };

  const handleChangeCauThu = (e) => {
    const cauThuId = e.target.value;
    const cauThuDuocChon = listCauThu.find((cauThu) => cauThu.id === cauThuId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      cauThu: cauThuDuocChon || ""
    }));
  };

  const handleChangeLoaiSanPham = (e) => {
    const loaiSanPhamId = e.target.value;
    const loaiSanPhamDuocChon = listLoaiSanPham.find((loaiSanPham) => loaiSanPham.id === loaiSanPhamId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      loaiSanPham: loaiSanPhamDuocChon || ""
    }));
  };

  const handleChangeCongNghe = (e) => {
    const congNgheId = e.target.value;
    const congNgheDuocChon = listCongNghe.find((congNghe) => congNghe.id === congNgheId);
    formikSanPham.setValues((prevState) => ({
      ...prevState,
      congNghe: congNgheDuocChon || ""
    }));
  };

  const [hidden, setHidden] = useState(true);
  const handleClickCombobox = (e, row) => {
    if (e.target.checked === true) {
      setHidden(false); // Hiển thị khi có mục mới được chọn
      formikSanPham.setValues((prevValues) => ({
        ...prevValues,
        chiTietSanPhamList: [
          ...prevValues.chiTietSanPhamList,
          {
            kichThuoc: row,
            soLuong: row.soLuong,
            sku: row.sku
          }
        ]
      }));
      console.log("formikSanPham.values.chiTietSanPhamList", formikSanPham.values.chiTietSanPhamList);
      console.log("id kichThuoc: ", row.id);
    } else {
      formikSanPham.setValues((prevValues) => ({
        ...prevValues,
        chiTietSanPhamList: prevValues.chiTietSanPhamList.filter((item) => item.kichThuoc?.id !== row?.id)
      }));
    }
  };
  useEffect(() => {
    if (formikSanPham.values.chiTietSanPhamList.length === 0) {
      setHidden(true);
    }
  }, [formikSanPham.values.chiTietSanPhamList]);

  return (
    <MainCard title="Thêm sản phẩm">
      <form onSubmit={formikSanPham.handleSubmit}>
        <Grid container spacing={5} style={{marginBottom: "24px"}}>
          <Grid item xs={8}>
            <TextField
              label="Tên sản phẩm"
              name="ten"
              variant="outlined"
              fullWidth
              value={formikSanPham.values.ten}
              onChange={formikSanPham.handleChange}
            />
            {formikSanPham.errors.ten && formikSanPham.touched.ten && (
              <Typography style={{color: "red"}}>{formikSanPham.errors.ten}</Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá"
              name="gia"
              variant="outlined"
              fullWidth
              value={formikSanPham.values.gia}
              onChange={formikSanPham.handleChange}
            />
            {formikSanPham.errors.gia && formikSanPham.touched.gia && (
              <Typography style={{color: "red"}}>{formikSanPham.errors.gia}</Typography>
            )}
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          label="Mô tả"
          name={"moTa"}
          multiline
          rows={3}
          fullWidth
          style={{marginBottom: "24px"}}
          value={formikSanPham.values.moTa}
          onChange={formikSanPham.handleChange}
        />
        {formikSanPham.errors.moTa && formikSanPham.touched.moTa && (
          <Typography style={{color: "red"}}>{formikSanPham.errors.moTa}</Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Cổ áo</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="coAo"
                    id="demo-select-small"
                    label="Cổ áo"
                    value={formikSanPham.values?.coAo?.id || ""}
                    onChange={handleChangeCoAo}
                  >
                    <MenuItem value="">Chọn cổ áo</MenuItem>
                    {listCoAo.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.coAo && formikSanPham.touched.coAo && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.coAo}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm cổ áo" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenCoAo(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Chất liệu</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="chatLieu"
                    id="demo-select-small"
                    label="Chất liệu"
                    value={formikSanPham.values?.chatLieu?.id || ""}
                    onChange={handleChangeChatLieu}
                  >
                    <MenuItem value="">Chọn chất liệu</MenuItem>
                    {listChatLieu.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.chatLieu && formikSanPham.touched.chatLieu && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.chatLieu}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm chất liệu" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenChatLieu(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Thương hiệu</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="thuongHieu"
                    id="demo-select-small"
                    label="Thương hiệu"
                    value={formikSanPham.values?.thuongHieu?.id || ""}
                    onChange={handleChangeThuongHieu}
                  >
                    <MenuItem value="">Chọn thương hiệu</MenuItem>
                    {listThuongHieu.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.thuongHieu && formikSanPham.touched.thuongHieu && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.thuongHieu}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm thương hiệu" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenThuongHieu(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Dòng Sản Phẩm</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name={"dongSanPham"}
                    id="demo-select-small"
                    label="Dòng Sản Phẩm"
                    value={formikSanPham.values?.dongSanPham?.id || ""}
                    onChange={handleChangeDongSanPham}
                  >
                    <MenuItem value="">Chọn dòng sản phẩm</MenuItem>
                    {listDongSanPham.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.dongSanPham && formikSanPham.touched.dongSanPham && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.dongSanPham}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm dòng sản phẩm" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenDongSanPham(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Nước Sản Xuất</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="nuocSanXuat"
                    id="demo-select-small"
                    label="Nước Sản Xuất"
                    value={formikSanPham.values?.nuocSanXuat?.id || ""}
                    onChange={handleChangeNuocSanXuat}
                  >
                    <MenuItem value="">Chọn nước sản xuất</MenuItem>
                    {listNuocSanXuat.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.nuocSanXuat && formikSanPham.touched.nuocSanXuat && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.nuocSanXuat}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm nước sản xuất" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenNuocSanXuat(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Màu Sắc</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="mauSac"
                    id="demo-select-small"
                    label="Màu Sắc"
                    value={formikSanPham.values?.mauSac?.id || ""}
                    onChange={handleChangeMauSac}
                  >
                    <MenuItem value="">Chọn màu sắc</MenuItem>
                    {listMauSac.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ma}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.mauSac && formikSanPham.touched.mauSac && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.mauSac}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm màu sắc" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenMauSac(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Nhà Sản Xuất</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="nhaSanXuat"
                    id="demo-select-small"
                    label="Nhà Sản Xuất"
                    value={formikSanPham.values?.nhaSanXuat?.id || ""}
                    onChange={handleChangeNhaSanXuat}
                  >
                    <MenuItem value="">Chọn nhà sản xuất</MenuItem>
                    {listNhaSanXuat.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.nhaSanXuat && formikSanPham.touched.nhaSanXuat && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.nhaSanXuat}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm nhà sản xuất" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenNhaSanXuat(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Cầu Thủ</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="cauThu"
                    id="demo-select-small"
                    label="Cầu Thủ"
                    value={formikSanPham.values?.cauThu?.id || ""}
                    onChange={handleChangeCauThu}
                  >
                    <MenuItem value="">Chọn cầu thủ</MenuItem>
                    {listCauThu.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.cauThu && formikSanPham.touched.cauThu && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.cauThu}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm cầu thủ" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenCauThu(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Loại Sản Phẩm</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="loaiSanPham"
                    id="demo-select-small"
                    label="Loại Sản Phẩm"
                    value={formikSanPham.values?.loaiSanPham?.id || ""}
                    onChange={handleChangeLoaiSanPham}
                  >
                    <MenuItem value="">Chọn loại sản phẩm</MenuItem>
                    {listLoaiSanPham.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.loaiSanPham && formikSanPham.touched.loaiSanPham && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.loaiSanPham}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm loại sản phẩm" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenLoaiSanPham(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={10}>
                <FormControl fullWidth style={{display: "flex"}}>
                  <InputLabel id="demo-select-small-label">Công Nghệ</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="congNghe"
                    id="demo-select-small"
                    label="Công Nghệ"
                    value={formikSanPham.values?.congNghe?.id || ""}
                    onChange={handleChangeCongNghe}
                  >
                    <MenuItem value="">Chọn công nghệ</MenuItem>
                    {listCongNghe.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formikSanPham.errors.congNghe && formikSanPham.touched.congNghe && (
                  <Typography style={{color: "red"}}>{formikSanPham.errors.congNghe}</Typography>
                )}
              </Grid>
              <Grid item xs={2} style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="Thêm công nghệ" placement="bottom">
                  <Button size="small">
                    <AddCircleIcon onClick={() => handleClickOpenCongNghe(null)} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Ngày sản xuất"
              type={"date"}
              name="namSanXuat"
              variant="outlined"
              focused
              fullWidth
              value={formikSanPham.values.namSanXuat}
              onChange={formikSanPham.handleChange}
            />
            {formikSanPham.errors.namSanXuat && formikSanPham.touched.namSanXuat && (
              <Typography style={{color: "red"}}>{formikSanPham.errors.namSanXuat}</Typography>
            )}
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gioiTinh"
                value={formikSanPham.values.gioiTinh}
                onChange={formikSanPham.handleChange}
              >
                <FormControlLabel value="false" control={<Radio />} label="Nam" />
                <FormControlLabel value="true" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
            {formikSanPham.errors.gioiTinh && formikSanPham.touched.gioiTinh && (
              <Typography style={{color: "red"}}>{formikSanPham.errors.gioiTinh}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginTop: "20px"}}>
          <Grid item xs={3}>
            <p style={{paddingBottom: "10px"}}>Kích thước: </p>
            {listKichThuoc.map((row) => (
              <article className="feature" key={row.id}>
                <Checkbox
                  className="checkbox"
                  name={`chiTietSanPhamList.kichThuoc.${row.id}`}
                  checked={formikSanPham.values?.chiTietSanPhamList?.kichThuoc?.some((item) => item.id === row.id)}
                  value={row.id}
                  onClick={(e) => handleClickCombobox(e, row)}
                />
                <div>
                  <span>{row.ten}</span>
                </div>
              </article>
            ))}
            <Box>
              <Tooltip title="Thêm kích thước" placement="bottom">
                <Button>
                  {" "}
                  <AddCircleIcon onClick={() => handleClickOpenKichThuoc(null)} />
                </Button>
              </Tooltip>
            </Box>
            {formikSanPham.errors.chiTietSanPhamList &&
              formikSanPham.touched.chiTietSanPhamList &&
              formikSanPham.errors.chiTietSanPhamList &&
              formikSanPham.touched.chiTietSanPhamList &&
              formikSanPham.errors.chiTietSanPhamList?.kichThuoc &&
              formikSanPham.touched.chiTietSanPhamList?.kichThuoc && (
                <Typography style={{color: "red"}}>{formikSanPham.errors.chiTietSanPhamList?.kichThuoc}</Typography>
              )}
          </Grid>
          <Grid item xs={9}>
            <Dropzone
              onChange={updateFiles}
              value={files}
              maxFileSize={28 * 1024 * 1024}
              maxFiles={5}
              style={{height: "200px"}}
              actionButtons={{position: "bottom", uploadButton: {}, abortButton: {}}}
              uploadConfig={{
                url: "https://www.myawsomeserver.com/upload",
                method: "POST",
                headers: {
                  Authorization: "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/"
                },
                cleanOnUpload: true
              }}
              fakeUpload
            >
              {files.map((file) => (
                <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
              ))}
            </Dropzone>
          </Grid>
        </Grid>

        {hidden ? null : (
          <Box
            className="css"
            sx={{
              border: 1,
              marginTop: "20px",
              borderColor: "divider",
              boxShadow: "0 0 4px 4px rgb(245, 242, 242)"
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Kích thước</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Sku</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formikSanPham.values.chiTietSanPhamList.map((row, index) =>
                    // Kiểm tra xem thuộc tính kichThuoc có tồn tại hay không
                    row.kichThuoc ? (
                      <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{row?.kichThuoc?.ten}</TableCell>
                        <TableCell>
                          <TextField
                            label="Số lượng"
                            placeholder="Số lượng"
                            variant="outlined"
                            name={`chiTietSanPhamList[${index}].soLuong`}
                            value={formikSanPham.values?.chiTietSanPhamList[index]?.soLuong}
                            onChange={formikSanPham.handleChange}
                            fullWidth
                          />
                          {formikSanPham.errors.chiTietSanPhamList &&
                            formikSanPham.touched.chiTietSanPhamList &&
                            formikSanPham.errors.chiTietSanPhamList[index] &&
                            formikSanPham.touched.chiTietSanPhamList[index] && (
                              <Typography style={{color: "red"}}>{formikSanPham.errors.chiTietSanPhamList[index].soLuong}</Typography>
                            )}
                        </TableCell>
                        <TableCell>
                          <TextField
                            label="Mã sku"
                            placeholder="Mã sku"
                            variant="outlined"
                            name={`chiTietSanPhamList[${index}].sku`}
                            value={formikSanPham.values?.chiTietSanPhamList[index]?.sku}
                            onChange={formikSanPham.handleChange}
                            fullWidth
                          />
                          {formikSanPham.errors.chiTietSanPhamList &&
                            formikSanPham.touched.chiTietSanPhamList &&
                            formikSanPham.errors.chiTietSanPhamList[index] &&
                            formikSanPham.touched.chiTietSanPhamList[index] && (
                              <Typography style={{color: "red"}}>{formikSanPham.errors.chiTietSanPhamList[index].sku}</Typography>
                            )}
                        </TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <div style={{textAlign: "center", paddingTop: "30px"}}>
          <Button variant="contained" type={"submit"}>
            Save
          </Button>
        </div>
      </form>
      {/*Cổ áo*/}
      <Dialog fullWidth maxWidth={"sm"} open={openCoAo} onClose={handleCloseCoAo} style={{height: "500px"}}>
        <form onSubmit={formikCoAo.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Cổ Áo
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên cổ áo"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikCoAo.values.ten}
                onChange={formikCoAo.handleChange}
              />
              {formikCoAo.errors.ten && formikCoAo.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikCoAo.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Cổ Áo
            </Button>
            <Button onClick={handleCloseCoAo}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Chất liệu*/}
      <Dialog fullWidth maxWidth={"sm"} open={openChatLieu} onClose={handleCloseChatLieu} style={{height: "500px"}}>
        <form onSubmit={formikChatLieu.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Chất Liệu
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên chất liệu"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikChatLieu.values.ten}
                onChange={formikChatLieu.handleChange}
              />
              {formikChatLieu.errors.ten && formikChatLieu.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikChatLieu.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Chất Liệu
            </Button>
            <Button onClick={handleCloseChatLieu}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Thương hiệu*/}
      <Dialog fullWidth maxWidth={"sm"} open={openThuongHieu} onClose={handleCloseThuongHieu} style={{height: "500px"}}>
        <form onSubmit={formikThuongHieu.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Thương Hiệu
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên thương hiệu"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikThuongHieu.values.ten}
                onChange={formikThuongHieu.handleChange}
              />
              {formikThuongHieu.errors.ten && formikThuongHieu.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikThuongHieu.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Thương Hiệu
            </Button>
            <Button onClick={handleCloseThuongHieu}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Dòng sản phẩm*/}
      <Dialog fullWidth maxWidth={"sm"} open={openDongSanPham} onClose={handleCloseDongSanPham} style={{height: "500px"}}>
        <form onSubmit={formikDongSanPham.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Dòng Sản Phẩm
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên dòng sản phẩm"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikDongSanPham.values.ten}
                onChange={formikDongSanPham.handleChange}
              />
              {formikDongSanPham.errors.ten && formikDongSanPham.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikDongSanPham.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Dòng Sản Phẩm
            </Button>
            <Button onClick={handleCloseDongSanPham}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Nước sản xuất*/}
      <Dialog fullWidth maxWidth={"sm"} open={openNuocSanXuat} onClose={handleCloseNuocSanXuat} style={{height: "500px"}}>
        <form onSubmit={formikNuocSanXuat.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Nước Sản Xuất
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên nước sản xuất"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikNuocSanXuat.values.ten}
                onChange={formikNuocSanXuat.handleChange}
              />
              {formikNuocSanXuat.errors.ten && formikNuocSanXuat.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikNuocSanXuat.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Nước Sản Xuất
            </Button>
            <Button onClick={handleCloseNuocSanXuat}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Màu sắc*/}
      <Dialog fullWidth maxWidth={"sm"} open={openMauSac} onClose={handleCloseMauSac} style={{height: "500px"}}>
        <form onSubmit={formikMauSac.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Màu Sắc
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Mã màu sắc"
                name="ma"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikMauSac.values.ma}
                onChange={formikMauSac.handleChange}
              />
              {formikMauSac.errors.ma && formikMauSac.touched.ma && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikMauSac.errors.ma}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Màu Sắc
            </Button>
            <Button onClick={handleCloseMauSac}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Nhà sản xuất*/}
      <Dialog fullWidth maxWidth={"sm"} open={openNhaSanXuat} onClose={handleCloseNhaSanXuat} style={{height: "500px"}}>
        <form onSubmit={formikNhaSanXuat.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Nhà Sản Xuất
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên nhà sản xuất"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikNhaSanXuat.values.ten}
                onChange={formikNhaSanXuat.handleChange}
              />
              {formikNhaSanXuat.errors.ten && formikNhaSanXuat.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikNhaSanXuat.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Nhà Sản Xuất
            </Button>
            <Button onClick={handleCloseNhaSanXuat}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Cầu thủ*/}
      <Dialog fullWidth maxWidth={"sm"} open={openCauThu} onClose={handleCloseCauThu} style={{height: "500px"}}>
        <form onSubmit={formikCauThu.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Cầu Thủ
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên cầu thủ"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikCauThu.values.ten}
                onChange={formikCauThu.handleChange}
              />
              {formikCauThu.errors.ten && formikCauThu.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikCauThu.errors.ten}</Typography>
              )}
              <TextField
                label="Số áo cầu thủ"
                name="soAo"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikCauThu.values.soAo}
                onChange={formikCauThu.handleChange}
              />
              {formikCauThu.errors.soAo && formikCauThu.touched.soAo && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikCauThu.errors.soAo}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Cầu Thủ
            </Button>
            <Button onClick={handleCloseCauThu}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Loại sản phẩm*/}
      <Dialog fullWidth maxWidth={"sm"} open={openLoaiSanPham} onClose={handleCloseLoaiSanPham} style={{height: "500px"}}>
        <form onSubmit={formikLoaiSanPham.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Loại Sản Phẩm
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên loại sản phẩm"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikLoaiSanPham.values.ten}
                onChange={formikLoaiSanPham.handleChange}
              />
              {formikLoaiSanPham.errors.ten && formikLoaiSanPham.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikLoaiSanPham.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Loại Sản Phẩm
            </Button>
            <Button onClick={handleCloseLoaiSanPham}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Công nghệ*/}
      <Dialog fullWidth maxWidth={"sm"} open={openCongNghe} onClose={handleCloseCongNghe} style={{height: "500px"}}>
        <form onSubmit={formikCongNghe.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Công Nghệ
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên công nghệ"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikCongNghe.values.ten}
                onChange={formikCongNghe.handleChange}
              />
              {formikCongNghe.errors.ten && formikCongNghe.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikCongNghe.errors.ten}</Typography>
              )}
              <TextField
                label="Mô tả công nghệ"
                name="moTa"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikCongNghe.values.moTa}
                onChange={formikCongNghe.handleChange}
              />
              {formikCongNghe.errors.moTa && formikCongNghe.touched.moTa && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikCongNghe.errors.moTa}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Công Nghệ
            </Button>
            <Button onClick={handleCloseCongNghe}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/*Kích thước*/}
      <Dialog fullWidth maxWidth={"sm"} open={openKichThuoc} onClose={handleCloseKichThuoc} style={{height: "500px"}}>
        <form onSubmit={formikKichThuoc.handleSubmit}>
          <DialogContent>
            <Typography style={{textAlign: "center", marginBottom: "40px"}} variant="h1">
              Thêm Kích Thước
            </Typography>
            <Grid fullWidth>
              <TextField
                label="Tên kích thước"
                name="ten"
                variant="outlined"
                fullWidth
                required
                style={{marginBottom: "16px", marginTop: "4px"}}
                value={formikKichThuoc.values.ten}
                onChange={formikKichThuoc.handleChange}
              />
              {formikKichThuoc.errors.ten && formikKichThuoc.touched.ten && (
                <Typography style={{color: "red", marginBottom: "13px"}}>{formikKichThuoc.errors.ten}</Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Thêm Kích Thước
            </Button>
            <Button onClick={handleCloseKichThuoc}>Đóng</Button>
          </DialogActions>
        </form>
      </Dialog>
    </MainCard>
  );
};

export default ThemHoacSuaSanPham;
