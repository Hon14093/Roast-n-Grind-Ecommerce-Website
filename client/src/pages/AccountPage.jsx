import React, { useEffect } from 'react'
import { useAuth } from '@/components/context/AuthContext'
import { useNavigate } from "react-router-dom"

function AccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => console.log(user));

    return (
        <>
			<div>{user.account_id}</div>
			<button onClick={() => {
                logout();
                navigate('/');
            }}>
				logout
			</button>
		</>
    )
}

export default AccountPage