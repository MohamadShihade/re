//import { useSelector } from 'react-redux'
//import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = localStorage.getItem('token')
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles , phone } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        return { username, roles, status, isManager, isAdmin ,phone }
      
    }

    return { username: '', roles: [], isManager, isAdmin, status , phone : '' }
}
export default useAuth