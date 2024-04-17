import React from 'react';

const Home = () => {
  const fullName = 'Lê Quốc Anh';
  const studentId = '21520565';
  const className = 'Kỹ thuật phát triển hệ thống web - IE213.O22';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Thông tin sinh viên</h1>
      <div>
        <p><strong>Họ và tên:</strong> {fullName}</p>
        <p><strong>Mã số sinh viên:</strong> {studentId}</p>
        <p><strong>Lớp:</strong> {className}</p>
      </div>
    </div>
  );
};

export default Home;
