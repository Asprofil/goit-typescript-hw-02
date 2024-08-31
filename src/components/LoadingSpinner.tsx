import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => (
  <div>
    <Oval color="#00BFFF" height={80} width={80} />
  </div>
);

export default LoadingSpinner;
