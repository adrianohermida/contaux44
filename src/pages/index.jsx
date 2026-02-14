import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function IndexPage() {
  const navigate = React.useEffect(() => {
    navigate(createPageUrl('Home'));
  }, []);

  React.useEffect(() => {
    navigate(createPageUrl('Home'));
  }, []);
  
  return null;
}