import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #f8f9fa;
  height: 100px;
  display: flex;
  z-index: 10;
  flex-direction: column;
  transition: top 0.3s;
  
  width: 100%;

  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

export const NavLink = styled(Link)`
  color: #393939;
  display: flex;
  align-items: center;
  align-self:center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    align-self:flex-start;
    padding: 0 1rem;
  }

  &.active {
    color: #000000;
  }
  &:hover {
    color: #000000;
  }
`;
export const NavBrand = styled(Link)`
  color: #393939;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #000000;
  }
`;
export const Bars = styled(FaBars)`
  display: none;
  color: #000000;

  &:hover {
    color: #1d428d;
  }
  &.active {
    color: #1d428d;
  }

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: -3px;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
