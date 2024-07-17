import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  text-align: center;
`;

const Header = () => <div>Header</div>;
const Footer = () => <div>Footer</div>;

const Blog = () => {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<div>Авторизвция</div>} />
          <Route path="/register" element={<div>Регистрация</div>} />
          <Route path="/users" element={<div>Пользователи</div>} />
          <Route path="/post" element={<div>Новая статья</div>} />
          <Route path="/postId" element={<div>Статья</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Content>
      <Footer />
    </>
  );
};

export default Blog;
