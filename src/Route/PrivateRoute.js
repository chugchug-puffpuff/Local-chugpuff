import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticate }) => {
  return authenticate === true ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import APage from './APage';
// import BPage from './BPage';
// import CPage from './CPage';

// const PrivateRoute = ({ authenticate }) => {
//   return authenticate === true ? (
//     <div>
//       <Route path="/a" element={<APage />} />
//       <Route path="/b" element={<BPage />} />
//       <Route path="/c" element={<CPage />} />
//     </div>
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;