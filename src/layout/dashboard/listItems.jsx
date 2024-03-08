import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {useLocation } from 'react-router-dom';
import { ClientAccordion } from "./ClientAccordion";

export const MainListItems = () => {
  const url = useLocation();
  let location = url.pathname?.split('/')[1];

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
   
  return (
    <>
      <ListItemButton component={NavLink} onClick={()=>{handleChange('panel')}} to="/dashboard">
        <ListItemIcon>
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_66_168)">
        <path d="M20.7872 8.9958C20.7868 8.99533 20.7863 8.99486 20.7858 8.99438L12.3491 0.557958C11.9895 0.198189 11.5114 0 11.0028 0C10.4942 0 10.0161 0.198031 9.65634 0.5578L1.22402 8.98997C1.22118 8.99281 1.21834 8.9958 1.2155 8.99864C0.477023 9.74138 0.478286 10.9464 1.21913 11.6873C1.55759 12.0259 2.00462 12.222 2.48258 12.2426C2.50199 12.2445 2.52155 12.2454 2.54128 12.2454H2.87754V18.4541C2.87754 19.6827 3.87716 20.6823 5.10605 20.6823H8.40677C8.7413 20.6823 9.0127 20.4111 9.0127 20.0764V15.2088C9.0127 14.6481 9.46872 14.1921 10.0294 14.1921H11.9762C12.5369 14.1921 12.9929 14.6481 12.9929 15.2088V20.0764C12.9929 20.4111 13.2641 20.6823 13.5988 20.6823H16.8995C18.1284 20.6823 19.128 19.6827 19.128 18.4541V12.2454H19.4398C19.9483 12.2454 20.4264 12.0474 20.7863 11.6876C21.5279 10.9455 21.5282 9.73838 20.7872 8.9958Z" fill={location=== 'dashboard' ? '#5D87FF' : '#B1B1B1'}/>
        </g>
        <defs>
        <clipPath id="clip0_66_168">
        <rect width="20.6823" height="20.6823" fill="white" transform="translate(0.663094)"/>
        </clipPath>
        </defs>
        </svg>        
        </ListItemIcon>
        <ListItemText style={{color:location === 'dashboard' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Dashboard" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/departments">
        <ListItemIcon>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_66_157)">
        <path d="M14.9793 8.91049H9.02918C8.15416 8.91049 7.45415 8.17512 7.45415 7.25591V2.29216C7.45415 1.37294 8.15416 0.637573 9.02918 0.637573H14.9793C15.8543 0.637573 16.5544 1.37294 16.5544 2.29216V7.25591C16.5544 8.17512 15.8543 8.91049 14.9793 8.91049ZM9.02918 2.10831C8.85418 2.10831 8.85418 2.10831 8.85418 2.29216V7.25591C8.85418 7.43975 8.85418 7.43975 9.02918 7.43975H14.9793C15.1543 7.43975 15.1543 7.43975 15.1543 7.25591V2.29216C15.1543 2.10831 15.1543 2.10831 14.9793 2.10831H9.02918Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M22.3267 22.1471H16.5732C16.0656 22.1471 15.7271 21.7988 15.7271 21.2763V16.3996C15.7271 15.8771 16.0656 15.5288 16.5732 15.5288H22.3267C22.8343 15.5288 23.1728 15.8771 23.1728 16.3996V21.1021C23.1728 21.6246 22.8343 22.1471 22.3267 22.1471Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M21.7409 22.9743H16.3317C15.5362 22.9743 14.8998 22.255 14.8998 21.3557V16.32C14.8998 15.4208 15.5362 14.7014 16.3317 14.7014H21.7409C22.5364 14.7014 23.1727 15.4208 23.1727 16.32V21.1759C23.1727 22.0751 22.5364 22.9743 21.7409 22.9743ZM16.3317 16.1402C16.1726 16.1402 16.1726 16.1402 16.1726 16.32V21.3557C16.1726 21.5356 16.1726 21.5356 16.3317 21.5356H21.7409C21.9 21.5356 21.9 21.3557 21.9 21.1759V16.32C21.9 16.1402 21.9 16.1402 21.7409 16.1402H16.3317Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M8.26263 22.1471H2.50919C2.00153 22.1471 1.66309 21.7894 1.66309 21.2528V16.4232C1.66309 15.8866 2.00153 15.5288 2.50919 15.5288H8.26263C8.77029 15.5288 9.10872 15.8866 9.10872 16.4232V21.2528C9.10872 21.7894 8.60107 22.1471 8.26263 22.1471Z" fill={location=== 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M8.20688 22.9744H2.37857C1.52147 22.9744 0.835785 22.248 0.835785 21.34V16.4368C0.835785 15.5288 1.52147 14.8024 2.37857 14.8024H8.20688C9.06399 14.8024 9.74967 15.5288 9.74967 16.4368V21.34C9.74967 22.248 8.89257 22.9744 8.20688 22.9744ZM2.37857 16.2552C2.20715 16.2552 2.20715 16.2552 2.20715 16.4368V21.34C2.20715 21.5216 2.20715 21.5216 2.37857 21.5216H8.20688L8.3783 21.34V16.4368C8.3783 16.2552 8.3783 16.2552 8.20688 16.2552H2.37857ZM11.8067 8.08313H12.8352V11.3519H11.8067V8.08313ZM19.0064 12.0783H19.8635V14.984H19.0064V12.0783Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M4.97234 12.2196H5.79963V15.5288H4.97234V12.2196Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M4.97234 11.3923H19.8636V12.2196H4.97234V11.3923Z" fill={location === 'departments' ? '#5D87FF' : '#B1B1B1'}/>
        </g>
        <defs>
        <clipPath id="clip0_66_157">
        <rect width="23.1642" height="23.1642" fill="white" transform="translate(0.835815 0.637573)"/>
        </clipPath>
        </defs>
        </svg>
        </ListItemIcon>
        <ListItemText style={{color:location === 'departments' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Departments" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/designations"> 
        <ListItemIcon>
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.8997 12.5863V10.7249H20.3454V16.3091C20.3454 17.3174 19.4534 18.1705 18.484 18.1705H2.35176C1.3435 18.1705 0.490356 17.3174 0.490356 16.3091V10.7249H7.93599V12.5863C7.93599 12.9353 8.20744 13.2068 8.55645 13.2068H12.2793C12.5895 13.2068 12.8997 12.9353 12.8997 12.5863ZM18.484 4.52018C19.4534 4.52018 20.3454 5.41211 20.3454 6.38159V9.48394H0.490356V6.38159C0.490356 5.41211 1.3435 4.52018 2.35176 4.52018H5.45411V2.65878C5.45411 1.68929 6.30725 0.797369 7.31552 0.797369H13.5202C14.4897 0.797369 15.3816 1.68929 15.3816 2.65878V4.52018H18.484ZM12.8997 4.52018V3.27925H7.93599V4.52018H12.8997Z" fill={location === 'designations' ? '#5D87FF' : '#B1B1B1'}/>
        </svg>  
        </ListItemIcon>
        <ListItemText style={{color:location === 'designations' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Designations" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/employees">
        <ListItemIcon>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_66_130)">
        <path d="M6.42479 4.25293C6.95738 4.25293 7.46237 4.37293 7.91469 4.58665C7.74197 4.80914 7.58678 5.04596 7.45164 5.2952C7.31912 5.53961 7.20591 5.79602 7.1136 6.06199C6.92954 6.59247 6.82922 7.1617 6.82922 7.75399C6.82922 8.34623 6.92954 8.91551 7.1136 9.44595C7.20587 9.71201 7.31912 9.96828 7.45164 10.2127C7.58678 10.462 7.74193 10.6988 7.91469 10.9213C7.46237 11.135 6.95738 11.2551 6.42479 11.2551C4.49427 11.2551 2.92373 9.68455 2.92373 7.75408C2.92373 5.82348 4.49427 4.25293 6.42479 4.25293Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M6.42478 12.9288C6.63189 12.9288 6.83839 12.939 7.04359 12.9589C6.72401 13.2077 6.42332 13.4797 6.14452 13.7727C5.86313 14.0685 5.60424 14.3856 5.36976 14.721C4.60368 15.8168 4.1015 17.1102 3.95717 18.5082C3.92873 18.7834 3.91406 19.0626 3.91406 19.3451C3.91406 19.6385 3.96514 19.9201 4.05801 20.182H0.84541C0.383201 20.182 0.00852251 19.8072 0.00852251 19.3451C0.00847578 15.8071 2.88684 12.9288 6.42478 12.9288Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M16.8948 9.44616C17.0788 8.91573 17.1792 8.34645 17.1792 7.75421C17.1792 7.16192 17.0788 6.59268 16.8948 6.0622C16.8024 5.79605 16.6893 5.53973 16.5567 5.29532C16.4216 5.04608 16.2665 4.80931 16.0937 4.58678C16.546 4.3731 17.051 4.25305 17.5836 4.25305C19.5141 4.25305 21.0847 5.8236 21.0847 7.75411C21.0847 9.68458 19.5141 11.2552 17.5836 11.2552C17.051 11.2552 16.546 11.1351 16.0937 10.9214C16.2664 10.6989 16.4216 10.4621 16.5567 10.2129C16.6893 9.96849 16.8025 9.71218 16.8948 9.44616Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M17.5837 12.9288C21.1216 12.9288 24 15.8071 24 19.3451C24 19.8073 23.6253 20.182 23.1631 20.182H19.9505C20.0433 19.9201 20.0944 19.6385 20.0944 19.3451C20.0944 19.0625 20.0797 18.7834 20.0513 18.5082C19.907 17.1102 19.4048 15.8168 18.6388 14.721C18.4042 14.3856 18.1454 14.0685 17.864 13.7727C17.5852 13.4797 17.2845 13.2077 16.9649 12.9589C17.1701 12.939 17.3766 12.9288 17.5837 12.9288Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M8.75261 6.45836C8.87018 6.16451 9.02584 5.88997 9.2145 5.64148C9.85444 4.79859 10.8666 4.25293 12.0042 4.25293C13.1418 4.25293 14.154 4.79859 14.7939 5.64157C14.9826 5.89006 15.1382 6.16461 15.2558 6.45845C15.4161 6.85951 15.5053 7.29642 15.5053 7.75404C15.5053 8.21161 15.4161 8.64852 15.2558 9.04957C15.1382 9.34342 14.9826 9.61797 14.7939 9.86645C14.154 10.7093 13.1418 11.2551 12.0042 11.2551C10.8666 11.2551 9.85444 10.7093 9.2145 9.86636C9.02584 9.61787 8.87018 9.34333 8.75261 9.04948C8.59231 8.64842 8.50309 8.21156 8.50309 7.75394C8.50309 7.29633 8.59231 6.85942 8.75261 6.45836Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M5.64245 18.5081C5.83504 17.0367 6.52812 15.7206 7.54461 14.7366C7.78532 14.5036 8.04393 14.2892 8.31848 14.0959C8.60169 13.8965 8.90158 13.7192 9.21577 13.567C9.81986 13.2743 10.4765 13.0737 11.1673 12.9833V18.2292C11.1673 18.6914 11.542 19.0661 12.0042 19.0661C12.4664 19.0661 12.841 18.6913 12.841 18.2292V12.9833C13.5319 13.0737 14.1885 13.2743 14.7926 13.567C15.1068 13.7192 15.4067 13.8965 15.6899 14.0959C15.9644 14.2893 16.2231 14.5037 16.4638 14.7366C17.4803 15.7206 18.1734 17.0367 18.3659 18.5081C18.4017 18.7821 18.4204 19.0614 18.4204 19.345C18.4204 19.8072 18.0457 20.1819 17.5835 20.1819H6.4247C5.96249 20.1819 5.58781 19.8071 5.58781 19.345C5.58786 19.0614 5.60656 18.7821 5.64245 18.5081Z" fill={location === 'employees' ? '#5D87FF' : '#B1B1B1'}/>
        </g>
        <defs>
        <clipPath id="clip0_66_130">
        <rect width="23.9915" height="23.9915" fill="white" transform="matrix(-1 0 0 1 24 0.221802)"/>
        </clipPath>
        </defs>
        </svg>  
        </ListItemIcon>
        <ListItemText style={{color:location === 'employees' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Employees" />
      </ListItemButton>

      <ClientAccordion handleChange={handleChange} expanded={expanded} />

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/Employees-Birthday">
        <ListItemIcon>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_128_1224)">
        <path d="M5.8915 5.7203H10.4954V4.91931C9.86738 4.65236 9.42584 4.02924 9.42584 3.30486C9.42584 2.89232 9.57386 2.30781 9.80295 1.81575C10.2465 0.863071 10.7962 0.663086 11.1791 0.663086C11.562 0.663086 12.1116 0.863027 12.5553 1.8157C12.7844 2.30777 12.9324 2.89232 12.9324 3.3049C12.9324 4.02928 12.4908 4.6524 11.8627 4.9194V5.7203H16.4667C18.6379 5.7203 20.4043 7.48679 20.4043 9.65805V11.3343C20.4043 13.2812 18.8203 14.8652 16.8734 14.8652C15.7059 14.8652 14.6694 14.2952 14.0263 13.4193C13.3831 14.2952 12.3466 14.8652 11.1791 14.8652C10.0115 14.8652 8.97504 14.2952 8.3319 13.4193C7.68875 14.2952 6.65218 14.8652 5.48468 14.8652C3.5378 14.8652 1.95384 13.2812 1.95384 11.3343V9.65805C1.95389 7.48679 3.72029 5.7203 5.8915 5.7203ZM11.1791 3.69082C11.3919 3.69082 11.5651 3.51767 11.5651 3.3049C11.5651 2.99738 11.3617 2.4161 11.1791 2.13859C10.9965 2.41614 10.7932 2.99738 10.7932 3.3049C10.7932 3.51763 10.9663 3.69082 11.1791 3.69082Z" fill={location === 'Employees-Birthday' ? '#5D87FF' : '#B1B1B1'}/>
        <path d="M5.48475 16.2327C6.51347 16.2327 7.50917 15.9034 8.33197 15.3157C9.15477 15.9033 10.1504 16.2327 11.1791 16.2327C12.2079 16.2327 13.2035 15.9034 14.0263 15.3157C14.8491 15.9033 15.8448 16.2327 16.8735 16.2327C17.6221 16.2327 18.332 16.0636 18.9672 15.762V19.0624C18.9672 21.2336 17.2008 23 15.0296 23H7.32868C5.15747 23 3.39106 21.2336 3.39106 19.0624V15.7621C4.02631 16.0636 4.73612 16.2327 5.48475 16.2327Z" fill={location === 'Employees-Birthday' ? '#5D87FF' : '#B1B1B1'}/>
        </g>
        <defs>
        <clipPath id="clip0_128_1224">
        <rect width="22.3369" height="22.3369" fill="white" transform="matrix(-1 0 0 1 22.3475 0.663086)"/>
        </clipPath>
        </defs>
        </svg>
        
        </ListItemIcon>
        <ListItemText style={{color:location === 'Employees-Birthday' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Employee Birthday" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/generalSettings">
        <ListItemIcon>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_128_1237)">
        <path d="M22.6985 9.41406H22.1678C21.9954 8.87451 21.7778 8.35039 21.5172 7.84683L21.8931 7.47095C22.8045 6.56055 22.7801 5.10156 21.8934 4.21582L20.7845 3.10693C19.8993 2.22056 18.44 2.19487 17.5293 3.10659L17.1532 3.48276C16.6496 3.22222 16.1254 3.00464 15.5859 2.83223V2.30142C15.5859 1.03242 14.5535 0 13.2845 0H11.7155C10.4465 0 9.41406 1.03242 9.41406 2.30142V2.83223C8.87456 3.00459 8.35039 3.22217 7.84683 3.48276L7.471 3.10693C6.56216 2.19702 5.10293 2.21836 4.21592 3.10664L3.10688 4.21558C2.22056 5.10093 2.19492 6.56001 3.10659 7.4707L3.48276 7.84687C3.22217 8.35044 3.00464 8.87451 2.83223 9.41411H2.30146C1.03247 9.41406 0 10.4465 0 11.7155V13.2845C0 14.5535 1.03247 15.5859 2.30146 15.5859H2.83223C3.00464 16.1255 3.22217 16.6496 3.48276 17.1532L3.10688 17.5291C2.19551 18.4395 2.21992 19.8984 3.10659 20.7842L4.21553 21.8931C5.10073 22.7794 6.56001 22.8051 7.47065 21.8934L7.84683 21.5172C8.35039 21.7778 8.87456 21.9954 9.41406 22.1678V22.6986C9.41406 23.9676 10.4465 25 11.7155 25H13.2845C14.5535 25 15.586 23.9676 15.586 22.6986V22.1678C16.1255 21.9954 16.6497 21.7778 17.1532 21.5172L17.5291 21.8931C18.4379 22.803 19.8971 22.7816 20.7841 21.8934L21.8932 20.7844C22.7795 19.899 22.8051 18.4399 21.8935 17.5292L21.5173 17.1531C21.7779 16.6495 21.9954 16.1254 22.1678 15.5858H22.6986C23.9676 15.5858 25 14.5534 25 13.2844V11.7154C25 10.4465 23.9675 9.41406 22.6985 9.41406ZM12.5 17.9395C9.50064 17.9395 7.06055 15.4993 7.06055 12.5C7.06055 9.50068 9.50064 7.06055 12.5 7.06055C15.4994 7.06055 17.9395 9.50068 17.9395 12.5C17.9395 15.4993 15.4994 17.9395 12.5 17.9395Z" fill={location === 'generalSettings' ? '#5D87FF' : '#B1B1B1'}/>
        </g>
        <defs>
        <clipPath id="clip0_128_1237">
        <rect width="25" height="25" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        
        </ListItemIcon>
        <ListItemText style={{color:location === 'generalSettings' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="General Settings" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/holidays">
        <ListItemIcon>
        <svg width="25" height="25" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g data-name="Layer 2" id="Layer_2"><path style={{fill:location === 'holidays' ? '#5D87FF' : '#B1B1B1'}} d="M55.93,12H48a2,2,0,0,0-2,2v2a2,2,0,0,1-4,0V14a2,2,0,0,0-2-2H8.07A4.07,4.07,0,0,0,4,16.07v4.7a7.59,7.59,0,0,0,1.69,4.89A9.84,9.84,0,0,1,8,32a9.84,9.84,0,0,1-2.31,6.34A7.59,7.59,0,0,0,4,43.23v4.7A4.07,4.07,0,0,0,8.07,52H40a2,2,0,0,0,2-2V48a2,2,0,0,1,4,0v2a2,2,0,0,0,2,2h7.93A4.07,4.07,0,0,0,60,47.93v-4.7a7.59,7.59,0,0,0-1.69-4.89,9.88,9.88,0,0,1,0-12.68A7.59,7.59,0,0,0,60,20.77v-4.7A4.07,4.07,0,0,0,55.93,12ZM14,21h3a1,1,0,0,1,0,2H14a1,1,0,0,1,0-2Zm0,5h1a1,1,0,0,1,0,2H14a1,1,0,0,1,0-2Zm21.18,8.92L26.06,34a.08.08,0,0,0-.09.08,14.67,14.67,0,0,1-.86,4.7l-.14.39a.62.62,0,0,0,.22.72l2.51,1.8a.58.58,0,0,1-.46,1L24,42.15l-3.24.6a.58.58,0,0,1-.46-1l2.51-1.8a.62.62,0,0,0,.22-.72l-.14-.39a14.67,14.67,0,0,1-.86-4.7.08.08,0,0,0-.09-.08l-9.12.91a.57.57,0,0,1-.31-1.08L22,29.08v-4.2a5.76,5.76,0,0,1,.84-3,1.31,1.31,0,0,1,2.25,0,5.76,5.76,0,0,1,.84,3v4.2l9.52,4.76a.57.57,0,0,1-.31,1.08ZM46,40a2,2,0,0,1-4,0V36a2,2,0,0,1,4,0Zm0-12a2,2,0,0,1-4,0V24a2,2,0,0,1,4,0Z"/></g></svg>        
        </ListItemIcon>
        <ListItemText style={{color:location === 'holidays' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Holidays" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/events">
        <ListItemIcon>
        <svg width="25" height="25" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g data-name="Glyph"><path d="M32 24a14 14 0 1 0 14 14 14 14 0 0 0-14-14Zm8 15a2 2 0 0 1-2 2h-3v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2Z" fill={location === 'events' ? '#5D87FF' : '#B1B1B1'} className="fill-000000"></path><path d="M54 6h-3v-.5a3.5 3.5 0 0 0-7 0V6h-8.5v-.5a3.5 3.5 0 0 0-7 0V6H20v-.5a3.5 3.5 0 0 0-7 0V6h-3a5 5 0 0 0-5 5v46a5 5 0 0 0 5 5h44a5 5 0 0 0 5-5V11a5 5 0 0 0-5-5Zm-8-.5a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-3 0Zm-15.5 0a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-3 0ZM15 5.5a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-3 0Zm33 49.09V50a3 3 0 0 1 3-3h4.59ZM57 44a1 1 0 0 1-1 1h-5a5 5 0 0 0-5 5v5a1 1 0 0 1-1 1l-35-.06a3 3 0 0 1-3-3V20h50Z" fill={location === 'events' ? '#5D87FF' : '#B1B1B1'} className="fill-000000"></path></g></svg>
        </ListItemIcon>
        <ListItemText style={{color:location === 'events' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Events" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/leaves">
        <ListItemIcon>
        <svg width="25px" height="25px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.6666 8L17.75 10.5L15.6666 8Z" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.6666 13L17.75 10.5L15.6666 13Z" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.5 10.5L10 10.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></path> <line x1="4" y1="3.5" x2="13" y2="3.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></line> <line x1="4" y1="17.5" x2="13" y2="17.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></line> <path d="M13 3.5V7.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></path> <path d="M13 13.5V17.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></path> <path d="M4 3.5L4 17.5" stroke={location === 'leaves' ? '#5D87FF' : '#B1B1B1'} strokeWidth="2" strokeLinecap="round"></path> </g></svg>        </ListItemIcon>
        <ListItemText style={{color:location === 'leaves' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Leaves" />
      </ListItemButton>

      <ListItemButton component={NavLink} onClick={()=>{handleChange('false')}} to="/employeeFeedback">
        <ListItemIcon>
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 1C17.6569 1 19 2.34315 19 4C19 4.55228 18.5523 5 18 5C17.4477 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H16C16.5523 21 17 20.5523 17 20V19C17 18.4477 17.4477 18 18 18C18.5523 18 19 18.4477 19 19V20C19 21.6569 17.6569 23 16 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H16Z" fill={location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' }></path> <path fillRule="evenodd" clipRule="evenodd" d="M20.7991 8.20087C20.4993 7.90104 20.0132 7.90104 19.7133 8.20087L11.9166 15.9977C11.7692 16.145 11.6715 16.3348 11.6373 16.5404L11.4728 17.5272L12.4596 17.3627C12.6652 17.3285 12.855 17.2308 13.0023 17.0835L20.7991 9.28666C21.099 8.98682 21.099 8.5007 20.7991 8.20087ZM18.2991 6.78666C19.38 5.70578 21.1325 5.70577 22.2134 6.78665C23.2942 7.86754 23.2942 9.61999 22.2134 10.7009L14.4166 18.4977C13.9744 18.9398 13.4052 19.2327 12.7884 19.3355L11.8016 19.5C10.448 19.7256 9.2744 18.5521 9.50001 17.1984L9.66448 16.2116C9.76728 15.5948 10.0602 15.0256 10.5023 14.5834L18.2991 6.78666Z" fill={location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' }></path> <path d="M5 7C5 6.44772 5.44772 6 6 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H6C5.44772 8 5 7.55228 5 7Z" fill={location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' }></path> <path d="M5 11C5 10.4477 5.44772 10 6 10H10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H6C5.44772 12 5 11.5523 5 11Z" fill={location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' }></path> <path d="M5 15C5 14.4477 5.44772 14 6 14H7C7.55228 14 8 14.4477 8 15C8 15.5523 7.55228 16 7 16H6C5.44772 16 5 15.5523 5 15Z" fill={location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' }></path> </g></svg>
        </ListItemIcon>
        <ListItemText style={{color:location === 'employeeFeedback' ? '#5D87FF' : '#B1B1B1' , fontWeight:'500'}} primary="Employee Feedback" />
      </ListItemButton>
     
    </>
  );
};

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </>
);
