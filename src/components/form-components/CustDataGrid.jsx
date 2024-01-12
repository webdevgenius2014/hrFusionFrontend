import React from 'react'
import {StripedDataGrid} from '../GridStripedDataGrid'
import {CustomPagination}  from '../PaginationMui' 

export const CustDataGrid = (props) => {
    const styles = {
        backgroundColor: "white",
      };
  const NewPagination=()=>{
    return(
      <CustomPagination  ActionsComponent={CustomPagination} setPage={props?.setPage} totalPages={props?.totalPages} />    )
  }
  return (
    <StripedDataGrid
    
    sx={{
      height: 300,
      width: '100%',
      '& .super-app-theme--header': {
        backgroundColor: '#647691',
        fontWeight: 'bold',
        color: 'rgb(255, 255, 255)',
      },
    }}
    autoHeight
      style={styles}
      
      rows={props?.data}
      columns={props?.columns}
      loading={props?.loading}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10 // Adjust the pageSize according to your needs
          },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  )
}
// slots={{  
//   pagination: NewPagination,
// }}