// useNavigation.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const navigateToAbout = (dataToSend) => {
    setData(dataToSend);
    navigate('/ClientProfile', { state: { data: dataToSend } });
  };

  return {
    navigateToAbout,
    data,
  };
};

export default useNavigation;
