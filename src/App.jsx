import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase-client";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./services/ProtectedRoute";
import Modal from "./components/Modal/Modal";
import { ModalProvider } from "./context/ModalContext";

function App() {
  const [session, setSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleYes = () => {
    console.log("YES clicked");
    setModalOpen(false);
  };

  const handleNo = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <ModalProvider>
        <Header session={session} />

        <main className="mt-16 ">
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
                fontFamily: "Morabba-Medium",
              },
            }}
          />

          <Modal
            isOpen={modalOpen}
            title="آیا مطمئنی؟"
            onYes={handleYes}
            onNo={handleNo}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard setModalOpen={setModalOpen} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </ModalProvider>
    </>
  );
}

export default App;
