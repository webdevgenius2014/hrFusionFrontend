import React from 'react'

export const ClientEmail = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} >
          <Item>xs=2</Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} >
          <Item>xs=2</Item>
        </Grid>
  
    </Grid>
  </Box>
    </div>
  )
}
