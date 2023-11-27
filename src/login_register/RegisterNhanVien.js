import React, { useState } from 'react';
import axios from 'axios';

const RegisterNhanVien = () => {
  const [formData, setFormData] = useState({
    ten: '',
    sdt: '',
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
      const response = await axios.post('http://localhost:8080/api/khach-hang/create', formData);
      console.log(response.data);
      location.href = "/free/ban-hang-tai-quay"
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' />
      <script src='https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'></script>
      <section className='text-center' style={{ background: 'cadetblue' }}>
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
                <h2 className='fw-bold mb-5'>Register Customer</h2>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6 mb-4'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='ten'
                          className='form-control'
                          onChange={handleChange}
                          value={formData.ten}
                        />
                        <label className='form-label' htmlFor='name'>Name</label>
                      </div>
                    </div>
                    <div className='col-md-6 mb-4'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='sdt'
                          className='form-control'
                          onChange={handleChange}
                          value={formData.sdt}
                        />
                        <label className='form-label' htmlFor='phone'>Phone</label>
                      </div>
                    </div>
                  </div>

                  <div className='form-outline mb-4'>
                    <input
                      type='email'
                      id='email'
                      className='form-control'
                      onChange={handleChange}
                      value={formData.email}
                    />
                    <label className='form-label' htmlFor='email'>Email address</label>
                  </div>

                  <div className='form-outline mb-4'>
                    <input
                      type='password'
                      id='matKhau'
                      className='form-control'
                      onChange={handleChange}
                      value={formData.matKhau}
                    />
                    <label className='form-label' htmlFor='password'>Password</label>
                  </div>

                  <br />
                  <br />
                  <div className='row'>
                    <div className='col-6'>
                      <button type='submit' className='btn btn-primary btn-block mb-4'>
                        Register
                      </button>
                    </div>
                    <div className='col-6'>
                      <a type='submit' href='/free/login-kh'  className='btn btn-dark btn-block mb-4'>
                        Back Login
                      </a>
                    </div>
                    <br />
                    <a href='/free/ban-hang-tai-quay'>back to home</a>
                  </div>
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

export default RegisterNhanVien;
