import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/Slices/adminSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const Form = styled.form`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  width: 380px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: #e63946;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/dashboard");
      }
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Admin Login</Title>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default AdminLogin;
