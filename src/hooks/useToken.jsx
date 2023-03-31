import { useContext } from 'react';
import { Context } from '../contexts/AuthContext';

const useToken = (setterOnly) => {
  const ctx = useContext(Context);

  return setterOnly ? [ctx.setState] : [ctx.state, ctx.setState];
};

export default useToken;