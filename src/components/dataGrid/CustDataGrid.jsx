import React from 'react'
import {GridStyle} from './GridStyle'

export const CustDataGrid = (props) => {
    const styles = {
        backgroundColor: "white",
      };
  return (
    <GridStyle
    sx={{
      fontFamily:'inter',
      color:'#B1B1B1',
      fontWeight:'400',
      height: 300,
      width: '100%',
      '& .super-app-theme--header': {
        backgroundColor: '#E2EAF5',
        fontWeight: 'bold',
        color: '#647691',
      },
    }}
    autoHeight
      style={styles}
      
      rows={props?.data}
      columns={props?.columns}
      loading={props?.loading}
      
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10]} 
    
      
    />
  )
}
// getRowClassName={(params) =>
//   params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
// }

// slots={{  
//   pagination: NewPagination,
// }}