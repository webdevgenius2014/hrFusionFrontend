import React  from 'react'
import { ChannelSettings } from './channel/ChannelSettings';
import { LeadPlatform } from './leadplatform/LeadPlatform';
import { Box } from '@mui/system';
 const GeneralSetting = () => {
  
    return ( <>
      <ChannelSettings/>
      <Box sx={{ pt:3}}>
      <LeadPlatform/>
      </Box>
      
      </>
  )
}
export default GeneralSetting