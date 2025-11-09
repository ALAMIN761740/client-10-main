import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase.config";
import { toast } from "react-hot-toast";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success("Logged out successfully!");
        navigate("/login"); // লগ আউট হলে Login পেজে যাবে
      } catch (error) {
        toast.error(error.message);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-800 dark:text-white text-lg">Logging out...</p>
    </div>
  );
}
