import React from 'react'
import { Navigate } from 'react-router-dom';
import AIInterviewPage from '../AIInterviewPage/AIInterviewPage';

const PrivateRoute = ({ authenticate, setAuthenticate }) => {
  return authenticate === true ? <AIInterviewPage authenticate={authenticate} setAuthenticate={setAuthenticate} /> : <Navigate to="/login" />
};

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