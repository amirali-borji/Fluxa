import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase-client";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };
  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Header session={session} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181B",
            color: "#FAFAFA",
            border: "1px solid #27272A",
            borderRadius: "16px",
            padding: "14px 16px",
          },
        }}
      />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
