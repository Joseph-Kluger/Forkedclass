// import { useRouteError } from "react-router-dom"
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Error({error, setError}) {

  useEffect(() => {
    setTimeout(() => setError(null), 2000);
  }, [error, setError]);

  //const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1 style={{textAlign: 'center', color: 'red'}}>
        OOPS - ERROR
        <div>{error.message}</div>
      </h1>
    </>
  )
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  setError: PropTypes.func.isRequired
};
