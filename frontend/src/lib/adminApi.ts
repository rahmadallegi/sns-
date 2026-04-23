import { apiGet, apiPost, apiPut, apiPatch, apiDelete, API_BASE_URL } from "./api";

// ========== AUTH ==========
export async function adminLogin(email: string, password: string) {
  const response = await apiPost<{ message: string; token: string; admin: any }>(
    "/api/admin/auth/login",
    { email, password }
  );
  localStorage.setItem("adminToken", response.token);
  return response;
}

export async function adminRegister(email: string, password: string, name: string) {
  return apiPost<{ message: string }>("/api/admin/auth/register", {
    email,
    password,
    name,
  });
}

export function adminLogout() {
  localStorage.removeItem("adminToken");
}

// ========== ABOUT CARDS ==========
export async function getAboutCards() {
  return apiGet<{ message: string; data: any[] }>("/api/admin/about-cards");
}

export async function createAboutCard(data: { title: string; desc: string }) {
  return apiPost<{ message: string; id: number }>("/api/admin/about-cards", data);
}

export async function updateAboutCard(id: number, data: { title: string; desc: string }) {
  return apiPut<{ message: string }>(`/api/admin/about-cards/${id}`, data);
}

export async function deleteAboutCard(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/about-cards/${id}`);
}

// ========== SERVICES ==========
export async function getServices() {
  return apiGet<{ message: string; data: any[] }>("/api/admin/services");
}

export async function createService(data: {
  label: string;
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  display_order?: number;
}) {
  return apiPost<{ message: string; id: number }>("/api/admin/services", data);
}

export async function updateService(
  id: number,
  data: {
    label: string;
    title: string;
    description: string;
    long_description?: string;
    image?: string;
    display_order?: number;
  }
) {
  return apiPut<{ message: string }>(`/api/admin/services/${id}`, data);
}

export async function deleteService(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/services/${id}`);
}

// ========== SERVICE FEATURES ==========
export async function createServiceFeature(data: {
  service_id: number;
  name: string;
  detail: string;
}) {
  return apiPost<{ message: string; id: number }>("/api/admin/service-features", data);
}

export async function deleteServiceFeature(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/service-features/${id}`);
}

// ========== PROJECTS ==========
export async function getProjects() {
  return apiGet<{ message: string; data: any[] }>("/api/admin/projects");
}

export async function createProject(data: {
  title: string;
  detail?: string;
  image?: string;
  category: string;
}) {
  return apiPost<{ message: string; id: number }>("/api/admin/projects", data);
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    detail?: string;
    image?: string;
    category: string;
  }
) {
  return apiPut<{ message: string }>(`/api/admin/projects/${id}`, data);
}

export async function deleteProject(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/projects/${id}`);
}

// ========== TEAM ==========
export async function getTeamMembers() {
  return apiGet<{ message: string; data: any[] }>("/api/admin/team");
}

export async function createTeamMember(data: {
  name: string;
  role: string;
  img?: string;
}) {
  return apiPost<{ message: string; id: number }>("/api/admin/team", data);
}

export async function updateTeamMember(
  id: number,
  data: {
    name: string;
    role: string;
    img?: string;
  }
) {
  return apiPut<{ message: string }>(`/api/admin/team/${id}`, data);
}

export async function deleteTeamMember(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/team/${id}`);
}

// ========== CLIENTS ==========
export async function getClients() {
  return apiGet<{ message: string; data: any[] }>("/api/admin/clients");
}

export async function createClient(data: {
  name: string;
  logo?: string;
}) {
  return apiPost<{ message: string; id: number }>("/api/admin/clients", data);
}

export async function updateClient(
  id: number,
  data: {
    name: string;
    logo?: string;
   
  }
) {
  return apiPut<{ message: string }>(`/api/admin/clients/${id}`, data);
}

export async function deleteClient(id: number) {
  return apiDelete<{ message: string }>(`/api/admin/clients/${id}`);
}

// ========== CLIENT LOGO UPLOAD ==========
export async function uploadClientLogo(formData: FormData) {
  const url = `${API_BASE_URL}/api/admin/clients/upload-logo`;
  const token = localStorage.getItem("adminToken");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to upload logo");
  }
  return data as { message: string; url: string };
}

// ========== CONTACT MESSAGES ==========
export async function getContactMessages() {
  return apiGet<{ message: string; data: ContactMessage[] }>("/api/admin/contact-messages");
}

export async function updateContactMessageStatus(
  id: string,
  status: "unread" | "read" | "replied"
) {
  return apiPatch<{ message: string }>(`/api/admin/contact-messages/${id}`, { status });
}

export async function deleteContactMessage(id: string) {
  return apiDelete<{ message: string }>(`/api/admin/contact-messages/${id}`);
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
}

// ========== CONTACT INFO ==========
export interface ContactInfo {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  fax: string;
}

export async function getContactInfo() {
  return apiGet<{ message: string; data: ContactInfo }>("/api/admin/contact");
}

export async function updateContactInfo(data: ContactInfo) {
  return apiPut<{ message: string }>("/api/admin/contact", data);
}
