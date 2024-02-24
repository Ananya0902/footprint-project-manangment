import {Outlet , Navigate} from 'react-router-dom'

const PrivateRoutes = () => {

    const authToken = localStorage.getItem('userToken');
    // Here is the main logic all of it 
    // We could have done that here 
    // created a react component and rendered the other component inside it 
    // so we must have different routes for approver reviewer and applicant 
    // that shall ease up the process of navigation 
    return (
        authToken ? <Outlet/> : <Navigate to='/login'/>
    )

}

export default PrivateRoutes