import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Stack } from 'rsuite';
import { Animation } from 'rsuite';

const Brand = props => {
  return (
    <Stack className="brand" {...props}>
      <Logo height={26} style={{ marginTop: 6 }} />
      <Animation.Fade in={props?.expanded?true:false} transitionAppear={props?.expanded} timeout={300}>
        <Link to="/" style={{ display:props?.expanded?'block':'none'}}>        
          <div className='brand-text'><span>HR</span>Suite</div>
        </Link>
      </Animation.Fade>      
    </Stack>
  );
};

export default Brand;