import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

export default function MyProfile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); // Hidden file input

  useEffect(() => {
    setChanged(displayName !== (user?.displayName || "") || photoURL !== (user?.photoURL || ""));
  }, [displayName, photoURL, user]);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Please login to see your profile.
        </h2>
      </div>
    );

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(user, { displayName, photoURL });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // File input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result); // Set base64 image preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 text-center">
        {/* Profile Image */}
        <img
          src={photoURL || "https://i.ibb.co/2d3Yj6d/user.png"}
          alt="profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 dark:border-indigo-400 mb-4 shadow-lg cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
          onClick={() => fileInputRef.current.click()} // Trigger hidden input
        />
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ) : (
          <>
            <h2 className="mt-4 text-2xl font-bold text-purple-700 dark:text-purple-300">{displayName || "Anonymous User"}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{user.email}</p>
          </>
        )}

        <div className="mt-6 flex justify-center gap-4">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-indigo-600 transition"
            >
              Edit Profile
            </button>
          )}
          {editing && changed && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow hover:from-green-600 hover:to-teal-600 transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
