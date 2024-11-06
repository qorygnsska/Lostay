import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ToAdminLogin() {
    const navigate = useNavigate();
    navigate("/admin-login")
  
}
