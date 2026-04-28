import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this path is correct!

export default function Navbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth); // 'auth' here is the Auth instance, NOT the app
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <h1 className="font-bold">Healthcare Portal</h1>
      <button 
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}