import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import RegisterNhanVien from '../login_register/RegisterNhanVien';
import LoginNhanVien from '../login_register/LoginNhanVien';
import LoginKhachHang from '../login_register/LoginKhachHang';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes,
    {
      path: 'register',
      element: <RegisterNhanVien />
    },
    {
      path: 'login-nv',
      element: <LoginNhanVien />
    },
    {
      path: 'login-kh',
      element: <LoginKhachHang />
    },
  ]);
}
