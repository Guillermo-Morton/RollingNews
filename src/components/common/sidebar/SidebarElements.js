import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "96%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  
`;


export const CloseIcon = styled(FaTimes)`
  color: #000000;
  &:hover {
    color: #1d428d;
  }
  &.active {
    color: #1d428d;
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;
export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none !important;
  list-style: none;
  transition: 0.2 ease-in-out;
  color: #000000;
  cursor: pointer;

  &:hover {
    color: #1d428d;
    transition: 0.2 ease-in-out;
  }
  &.active {
    color: #1d428d;
  }
`;
export const SidebarMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 60px);
  text-align: center;
  padding: 0;
  margin: 0;
   @media screen and
    (max-width: 480px) {
    grid-template-rows: repeat(10, 55px);
    
  }
`;
