import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import VolunteerPage from "./pages/VolunteerPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminLayout from "./components/admin/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminVolunteersPage from "./pages/admin/AdminVolunteersPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminGalleryPage from "./pages/admin/AdminGalleryPage";

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Route>

    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route element={<AdminDashboardPage />}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="volunteers" element={<AdminVolunteersPage />} />
        <Route path="contacts" element={<AdminContactsPage />} />
        <Route path="gallery" element={<AdminGalleryPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
