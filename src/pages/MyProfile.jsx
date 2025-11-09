import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Check if user made any changes
    if (displayName !== (user?.displayName || "") || photoURL !== (user?.photoURL || "")) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [displayName, photoURL, user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Please login to see your profile.
        </h2>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
        <img
          src={photoURL || "https://i.ibb.co/2d3Yj6d/user.png"}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 dark:border-gray-600 mb-4"
        />
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ) : (
          <>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
              {displayName || "Anonymous User"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{user.email}</p>
          </>
        )}

        <div className="mt-6 flex justify-center space-x-4">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
            >
              Edit Profile
            </button>
          )}

          {editing && changed && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
