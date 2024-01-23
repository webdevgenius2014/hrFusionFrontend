import React from 'react'
import {GridStyle} from './GridStyle'

export const CustDataGrid = (props) => {
    const styles = {
        backgroundColor: "white",
      };

  return (
    <GridStyle
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
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10]} 
    
      
    />
  )
}
// slots={{  
//   pagination: NewPagination,
// }}