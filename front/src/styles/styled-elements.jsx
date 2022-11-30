import styled from '@emotion/styled'

import background from "../img/background.jpg"

export const StyledLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.COLOR_PRIMARY};
  color: ${props => props.theme.colors.COLOR_TEXT};
  background-image: url(${background});
  background-size: cover;
  background-position: top right;
  background-blend-mode: multiply;
`

export const ErrorMsg = styled.p`
  display: inline-block;
  visibility: ${props => props.error? "visible": "hidden"};
  background-color: ${props => props.theme.colors.TABLE_BGCOLOR};
  color: ${props => props.theme.colors.ERROR};
  padding: 0.25em;
  margin-bottom: 0.5em;

  a:any-link {
  color: ${props => props.theme.colors.ERROR};
  text-decoration: underline;}
`

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.75em;
  max-width: 800px;
 
`
export const LogoImage = styled.img`
  width:40px;
  height: 40px;
  cursor: pointer;
`


export const Button = styled.button`
    text-align: left;
    background-color: transparent;
    width: 140px;
    height: 30px;
    padding: 1rem;
    font-size: 22px;
    padding: 0.25rem;
    border-radius: 0.5rem;`


export const Input = styled.input`
    color: ${props => props.theme.colors.COLOR_TEXT};
    background-color: ${props => props.theme.colors.COLOR_PRIMARY};
    font-size: 22px;
    padding: 0.25rem;
    border-radius: 0.5rem;
`

export const CheckBox = styled.input`
    color: ${props => props.theme.colors.COLOR_BLACK};
    background-color: ${props => props.theme.colors.COLOR_GREY_2};
    width: 24px;
    height: 24px;
    padding: 0.25rem;
    border-radius: 0.5rem;
`

export const Label = styled.label`
color: ${props =>  props.theme.colors.COLOR_TEXT};
margin-top: 1rem;
`


export const Main = styled.main`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Section = styled.section`
margin-top: 20px;
display: flex;
justify-content: center;
align-items: center;
`

export const Header = styled.header`
color: ${props =>  props.theme.colors.COLOR_TEXT};
display: flex;
justify-content: center;
align-items: center;
`

export const Nav =styled.nav`
    display: flex;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
    padding: 10px 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);` 

export const Ul = styled.ul`
    display: flex;
    justify-content: center;   
    align-items: center;
    @media screen and (max-width:769px){
      background-color: rgba(0,0,0,0.8);
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: fixed;
        top:54px;
        right: ${props => props.icon ? `${0}px` : `${-300}px`};
        width: 300px;
        height: 100vh;
        box-shadow: 0 40px 60px rgba(0,0,0,0.1);
        padding: 40px 0 0 10px;
        transition: 0.3s ease-in-out;

    }
`    
export const Li = styled.li`    
    list-style: none;
    padding : 10px 20px;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.colors.COLOR_GREY_4};
    & > a {
      color: ${props => props.theme.colors.COLOR_TEXT};
    }

    @media screen and (max-width:769px){
        margin-bottom: 25px;

    }
   `


export const Icon = styled.i`
  display: none;
  @media screen and (max-width:769px){
    display: block;
    cursor: pointer;
    font-size: 24px;

}
`

export const A = styled.a`
   text-decoration : none;
   font-size: 1.3rem;
   font-weight: 600;
   color: #fff;
   transition: 0.3s ease-in-out;
   &:hover {
    text-decoration : none;
    color: #17cf97
   };
   &.active{
        color: #17cf97;
        &::after{
        content:"";        
        width: 2px;
        height: 100%;
        background: #17cf97;
        position: absolute;
        bottom: 0px;
        left: 15px
        }
   }
   &:hover::after {
    content:"";
    width: 2px;
    height: 100%;
    background: #17cf97;
    position: absolute;
    bottom: 0;
    left: 15px
   }
   `

   