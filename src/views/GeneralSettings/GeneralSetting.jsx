import React  from 'react'
import { ChannelSettings } from './channel/ChannelSettings';
import { LeadPlatform } from './leadplatform/LeadPlatform';
import { Box } from '@mui/system';
import { DocumentsSettings } from './Documents/DocumentsSettings';

 const GeneralSetting = () => {
  
    return ( <>
      <ChannelSettings/>
      <Box sx={{ pt:3}}>
      <LeadPlatform/>
      </Box>
      <Box sx={{ pt:3}}>
      <DocumentsSettings/>
      </Box>
      
      </>
  )
}
export default GeneralSetting