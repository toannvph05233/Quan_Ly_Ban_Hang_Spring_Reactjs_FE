import React, { useState } from 'react';
import axios from 'axios';

const LoginKhachHang = () => {
  const [formData, setFormData] = useState({
    email: '',
    matKhau: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login/khach-hang', formData);
      localStorage.setItem("email", response.data.email);
      location.href = "/free/ban-hang-tai-quay"
    } catch (error) {
      console.error('Error during registration:', error);
      alert("đăng nhập lỗi")
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' />
      <script src='https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'></script>
      <section className='text-center' style={{ background: 'cadetblue', height: '800px' }}>
        <div className='p-5 bg-image' style={{
          backgroundImage: 'url(\'https://mdbootstrap.com/img/new/textures/full/171.jpg\')',
          height: '300px;'
        }}></div>

        <div className='card mx-4 mx-md-5 shadow-5-strong' style={{
          marginTop: '50px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)'
        }}>
          <div className='card-body py-5 px-md-5'>

            <div className='row d-flex justify-content-center'>
              <div className='col-lg-8'>
                <h2 className='fw-bold mb-5'>Login Customer</h2>
                <form onSubmit={handleSubmit}>

                  <div className='form-outline row'>
                    <label className='form-label col-2' htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      className='form-control col-8'
                      onChange={handleChange}
                      value={formData.email}
                    />

                  </div>
                  <br />
                  <div className='form-outline row'>
                    <label className='form-label col-2' htmlFor='password'>Password</label>
                    <input
                      type='password'
                      id='matKhau'
                      className='form-control col-8'
                      onChange={handleChange}
                      value={formData.matKhau}
                    />

                  </div>

                  <br />
                  <br />
                  <div className='row'>
                    <div className="col-1"> </div>

                    <div className='col-5'>
                      <button type='submit' className='btn btn-primary btn-block mb-4'>
                        Login
                      </button>
                    </div>
                    <div className='col-5'>
                      <a type='submit' href='/free/register'  className='btn btn-dark btn-block mb-4'>
                        Register
                      </a>
                    </div>
                    <div className="col-1"> </div>

                  </div>
                  <br />
                  <a href='/free/ban-hang-tai-quay'>back to home</a> | <a href='/free/login-nv'>Login Staff</a>
                  <br />

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginKhachHang;
