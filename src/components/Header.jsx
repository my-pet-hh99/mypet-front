import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//assets
import logo from '../src_assets/logo.png'

const Header = () => {
  const navigate = useNavigate();
  // const [isLog, setIsLog] = useState(true)


  return (
    <StHeader>
      <StHeaderlogo onClick={() => navigate("/")}/>
      <StNavContainer>
        <StNavUl>
          <StNavLi onClick={() => navigate("/")}>
            <div>마이페이지</div>
          </StNavLi>
          <StNavLi onClick={() => navigate("/")}>
            <div>로그아웃</div>
          </StNavLi>
        </StNavUl>
      </StNavContainer>
    </StHeader>
  )
}

export default Header

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`

const StHeaderlogo = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-size: cover;
  width: 120px;
  height: 120px;
  cursor: pointer;
`

const StNavContainer = styled.nav`
color: #262626;
`

const StNavUl = styled.ul`
  display: flex;
  list-style: none;
`

const StNavLi = styled.li`
  font-size: 17px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover{
    font-weight: bold;
    color: #fd284c;
  }
`

