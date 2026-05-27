import api from "./api";

export const submitVolunteer = async (payload) => (await api.post("/volunteers", payload)).data;
export const submitContact = async (payload) => (await api.post("/contacts", payload)).data;

export const adminLogin = async (payload) => (await api.post("/auth/login", payload)).data;
export const fetchAdminSession = async () => (await api.get("/auth/session")).data;
export const fetchDashboardSummary = async () => (await api.get("/admin/summary")).data;
export const fetchAdminVolunteers = async (search = "") =>
  (await api.get("/admin/volunteers", { params: { search } })).data;
export const fetchAdminContacts = async (search = "") =>
  (await api.get("/admin/contacts", { params: { search } })).data;
export const removeVolunteer = async (id) => (await api.delete(`/admin/volunteers/${id}`)).data;
export const removeContact = async (id) => (await api.delete(`/admin/contacts/${id}`)).data;

export const fetchGalleryImages = async () => (await api.get("/gallery")).data;
export const fetchAdminGalleryImages = async () => (await api.get("/admin/gallery")).data;
export const removeGalleryImage = async (id) => (await api.delete(`/admin/gallery/${id}`)).data;

export const uploadGalleryImage = async ({ title, imageFile }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", imageFile);

  const response = await api.post("/admin/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};
