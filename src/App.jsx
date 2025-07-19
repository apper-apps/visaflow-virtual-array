import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/pages/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Clients from "@/components/pages/Clients";
import Applications from "@/components/pages/Applications";
import Documents from "@/components/pages/Documents";
import Compliance from "@/components/pages/Compliance";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <>
<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="applications" element={<Applications />} />
          <Route path="documents" element={<Documents />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="demo" element={<Applications />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;