// import React from 'react'
// import { SubmitButton } from '../../helpers/theme'

// export default function Login() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } }
// return (
//     <CurrentUserConsumer>
//         {({ user, login, processing }) => (
//           <div>
//             {user && <Redirect to={from} />}
//             <p>You must log in to view the page at {from.pathname}</p>
//             {processing
//               ? <div>Authenticating...</div>
//               : <SubmitButton onClick={login}>Facebook login</SubmitButton>
//             }
//           </div>
//         )}
//       </CurrentUserConsumer>
// )
// }