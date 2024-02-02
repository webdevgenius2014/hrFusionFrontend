import React,{useState,useEffect    } from 'react'
import CommonServices from '../../services/CommonServices';
import BeatLoader from "react-spinners/ClipLoader";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar"; 
import { GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ImagePath } from '../../helperFunctions/ImagePath';
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";


 const EmpBirthday = () => {
  const [formLoader,setFormLoader]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

    // empBirthday =======================  
        const [getEmpData, setGetEmpData] = useState([]);
    const EmplpyeeBday = () => {
      setFormLoader(true);
      CommonServices.empBirthday()
        .then((res) => {
          console.log(res.status === 200 && res.data.success=== true)
          if (res.status === 200 ) {
            console.log(res?.data?.data);
            // setTotalPages(res.data.data.last_page);
            setGetEmpData(res?.data?.data);
            setFormLoader(false);
          } 
          if (res.status === 200 && res?.data?.success === false) {
            setFormLoader(false);
            
            // setFormLoader(false);
            setGetEmpData([]);
          }
          if (res.status === 401) {
            // con9sole.log()
            dispatch(superAdminLogout());
            setFormLoader(false);
          navigate("/");
          }
        })
        .catch((err) => {
        //   setFormLoader(false);
          console.log("getbday error", err);
        });
    };
    useEffect(() => {
        EmplpyeeBday();
    }, []);
    // ----------------------------------------------------------------
    const detailEmployee = (data) => {
      let id=data.id ;
      navigate(`/employees/${id}`);
      // setVewData(()=>data)
    };
    const columns = [
      { 
        field: 'id' , 
        headerName: 'No.', 
        filterable: false,
        width: 70 ,
        headerClassName: 'super-app-theme--header',
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
    },
    {
      field: "profile_image",
      headerName: "Profile ",
      headerClassName: 'super-app-theme--header',
      flex: 1 ,
      options: { filter: true },
      renderCell: (params) => (
        <Avatar alt="Profile Image" src={ImagePath(params?.row?.user_meta?.profile_image)} sx={{ width: 40, height: 40 }} />
      ),
    },
        {
        field: "name",
        headerName: "Name",
        headerClassName: "super-app-theme--header",
        flex: 1 ,
        options: { filter: true },
      },
      {
        field: "email",
        headerName: "Email",
        headerClassName: "super-app-theme--header",
        width:200,
        options: { filter: true },
      },
      {
        field: "birthday",
        headerName: "Birth Date",
        headerClassName: "super-app-theme--header",
        flex: 1 ,
        options: { filter: true },
      },
     
      {
        field: "days_left",
        headerName: "Days Left",
        headerClassName: "super-app-theme--header",
        flex: 1 ,
        options: { filter: true },
        renderCell: (params) => (
          <>
            {params.value} days
          </>
        ),
        
      },
      {
        field: "action",
        headerName: "Action",
        headerClassName: "super-app-theme--header",
        type: "actions",
        getActions: (params) => {
          return [          
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="View"
              color="inherit"
              onClick={() => detailEmployee(params?.row)}
            />,
          ];
        },
        flex: 1 ,
      },
    ];
  return (
    <div>
    <Box>
    <DatagridHeader name={"Upcoming 6 Months Birthdays"} >
    
    </DatagridHeader>

   
    {/* checkboxSelection  upline */}
  </Box>
    <Box
    style={{
    }}
  >
    
      <CustDataGrid
      data={getEmpData}
      columns={columns}
      loading={formLoader}
      // totalPages={totalPages}
      //  setPage={setPage}
    />
  </Box>
   
    </div>
  )
}
 export default EmpBirthday