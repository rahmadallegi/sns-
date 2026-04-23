// localStorage-based persistence for dashboard data

export type EmployeeRole = "hr" | "driver" | "fleet" | "other";

export interface Vehicle {
  id: string;
  name: string;
  status: "active" | "idle" | "maintenance";
  fuel: number;
  driver: string;
  route: string;
  eta: string;
}

export interface Task {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "in-progress" | "pending" | "completed";
  assignee: string;
  due: string;
  department?: EmployeeRole;
}

export interface TeamMember {
  name: string;
  role: string;
  status: "on-route" | "available" | "busy";
  shift: string;
  avatar: string;
  department: EmployeeRole;
}

export interface ScheduleEvent {
  time: string;
  event: string;
  type: "shift" | "task" | "meeting" | "break";
  department?: EmployeeRole;
}

export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  department: EmployeeRole;
  createdBy: string;
}

export interface EmployeeProfile {
  email: string;
  name: string;
  role: EmployeeRole;
  jobTitle: string;
  phone: string;
  startDate: string;
  department: string;
}

export interface Mission {
  id: number;
  title: string;
  origin: string;
  destination: string;
  status: "assigned" | "in-transit" | "completed" | "cancelled";
  assignedTo: string;
  vehicleId: string;
  date: string;
  priority: "high" | "medium" | "low";
}

export interface EmployeeUser {
  email: string;
  password: string;
  name: string;
  initials: string;
  role: EmployeeRole;
  jobTitle: string;
}

// --- Seed Data ---

const seedVehicles: Vehicle[] = [
  { id: "V-001", name: "Volvo FH16", status: "active", fuel: 78, driver: "James K.", route: "NYC → Chicago", eta: "4h 20m" },
  { id: "V-002", name: "Scania R500", status: "active", fuel: 52, driver: "Maria S.", route: "LA → Phoenix", eta: "2h 10m" },
  { id: "V-003", name: "MAN TGX", status: "maintenance", fuel: 100, driver: "—", route: "—", eta: "—" },
  { id: "V-004", name: "DAF XF", status: "active", fuel: 34, driver: "Tom R.", route: "Dallas → Houston", eta: "1h 45m" },
  { id: "V-005", name: "Mercedes Actros", status: "idle", fuel: 91, driver: "—", route: "—", eta: "—" },
  { id: "V-006", name: "Kenworth T680", status: "active", fuel: 65, driver: "Sarah L.", route: "Miami → Atlanta", eta: "6h 30m" },
];

const seedTasks: Task[] = [
  { id: 1, title: "Inspect V-003 brakes", priority: "high", status: "in-progress", assignee: "Mike D.", due: "Today", department: "fleet" },
  { id: 2, title: "Schedule V-005 route to Denver", priority: "medium", status: "pending", assignee: "James K.", due: "Tomorrow", department: "fleet" },
  { id: 3, title: "Update fuel logs for fleet", priority: "low", status: "pending", assignee: "You", due: "Feb 23", department: "fleet" },
  { id: 4, title: "Review driver certifications", priority: "high", status: "completed", assignee: "Sarah L.", due: "Feb 20", department: "hr" },
  { id: 5, title: "Client delivery confirmation - ArcLogistics", priority: "medium", status: "in-progress", assignee: "You", due: "Today", department: "driver" },
  { id: 6, title: "Monthly mileage report", priority: "low", status: "pending", assignee: "Tom R.", due: "Feb 28", department: "fleet" },
  { id: 7, title: "Onboard new driver – Alex M.", priority: "high", status: "pending", assignee: "Lisa W.", due: "Today", department: "hr" },
  { id: 8, title: "Payroll processing – February", priority: "high", status: "in-progress", assignee: "Lisa W.", due: "Feb 25", department: "hr" },
  { id: 9, title: "Update employee handbook", priority: "low", status: "pending", assignee: "Lisa W.", due: "Mar 5", department: "hr" },
  { id: 10, title: "Driver safety training session", priority: "medium", status: "pending", assignee: "James K.", due: "Feb 27", department: "hr" },
  { id: 11, title: "Pickup cargo – Warehouse B", priority: "high", status: "assigned" as any, assignee: "James K.", due: "Today", department: "driver" },
  { id: 12, title: "Deliver to client – PrimeRoute", priority: "medium", status: "in-progress", assignee: "Tom R.", due: "Today", department: "driver" },
  { id: 13, title: "Return vehicle to depot", priority: "low", status: "pending", assignee: "Maria S.", due: "Tomorrow", department: "driver" },
  { id: 14, title: "Update IT security policies", priority: "medium", status: "pending", assignee: "Dan P.", due: "Mar 1", department: "other" },
  { id: 15, title: "Quarterly budget review", priority: "high", status: "in-progress", assignee: "Dan P.", due: "Feb 28", department: "other" },
  { id: 16, title: "Office supplies reorder", priority: "low", status: "pending", assignee: "Dan P.", due: "Mar 3", department: "other" },
];

const seedTeam: TeamMember[] = [
  { name: "James Kowalski", role: "Senior Driver", status: "on-route", shift: "06:00 – 14:00", avatar: "JK", department: "driver" },
  { name: "Maria Santos", role: "Fleet Coordinator", status: "available", shift: "08:00 – 16:00", avatar: "MS", department: "fleet" },
  { name: "Tom Reynolds", role: "Driver", status: "on-route", shift: "06:00 – 14:00", avatar: "TR", department: "driver" },
  { name: "Sarah Lee", role: "Logistics Manager", status: "available", shift: "09:00 – 17:00", avatar: "SL", department: "fleet" },
  { name: "Mike Davis", role: "Mechanic", status: "busy", shift: "07:00 – 15:00", avatar: "MD", department: "fleet" },
  { name: "Anna Petrov", role: "Dispatcher", status: "available", shift: "08:00 – 16:00", avatar: "AP", department: "fleet" },
  { name: "Lisa Wang", role: "HR Manager", status: "available", shift: "09:00 – 17:00", avatar: "LW", department: "hr" },
  { name: "Robert Chen", role: "HR Specialist", status: "available", shift: "09:00 – 17:00", avatar: "RC", department: "hr" },
  { name: "Dan Park", role: "IT Administrator", status: "available", shift: "09:00 – 17:00", avatar: "DP", department: "other" },
  { name: "Emma Wilson", role: "Finance Analyst", status: "busy", shift: "08:00 – 16:00", avatar: "EW", department: "other" },
];

const seedSchedule: ScheduleEvent[] = [
  { time: "06:00", event: "Shift start – Drivers", type: "shift", department: "driver" },
  { time: "08:30", event: "Fleet inspection round", type: "task", department: "fleet" },
  { time: "09:00", event: "HR standup meeting", type: "meeting", department: "hr" },
  { time: "10:00", event: "Client call – PrimeRoute", type: "meeting", department: "fleet" },
  { time: "10:30", event: "Interview – Driver candidate", type: "meeting", department: "hr" },
  { time: "12:00", event: "Lunch break rotation", type: "break" },
  { time: "14:00", event: "Driver shift changeover", type: "shift", department: "driver" },
  { time: "14:30", event: "IT security briefing", type: "meeting", department: "other" },
  { time: "15:30", event: "Maintenance review – V-003", type: "task", department: "fleet" },
  { time: "16:00", event: "Payroll review meeting", type: "meeting", department: "hr" },
  { time: "17:00", event: "End of day debrief", type: "meeting" },
];

const seedMissions: Mission[] = [
  { id: 1, title: "NYC → Chicago Express", origin: "New York, NY", destination: "Chicago, IL", status: "in-transit", assignedTo: "James K.", vehicleId: "V-001", date: "Feb 24", priority: "high" },
  { id: 2, title: "LA → Phoenix Standard", origin: "Los Angeles, CA", destination: "Phoenix, AZ", status: "in-transit", assignedTo: "Maria S.", vehicleId: "V-002", date: "Feb 24", priority: "medium" },
  { id: 3, title: "Dallas → Houston Overnight", origin: "Dallas, TX", destination: "Houston, TX", status: "assigned", assignedTo: "Tom R.", vehicleId: "V-004", date: "Feb 25", priority: "low" },
  { id: 4, title: "Miami → Atlanta Priority", origin: "Miami, FL", destination: "Atlanta, GA", status: "in-transit", assignedTo: "Sarah L.", vehicleId: "V-006", date: "Feb 24", priority: "high" },
  { id: 5, title: "Denver → Salt Lake City", origin: "Denver, CO", destination: "Salt Lake City, UT", status: "assigned", assignedTo: "James K.", vehicleId: "V-005", date: "Feb 26", priority: "medium" },
  { id: 6, title: "Seattle → Portland Rush", origin: "Seattle, WA", destination: "Portland, OR", status: "completed", assignedTo: "Tom R.", vehicleId: "V-004", date: "Feb 22", priority: "high" },
];

const seedTodos: TodoItem[] = [
  { id: 1, text: "Review new hire paperwork for Alex M.", done: false, department: "hr", createdBy: "Lisa W." },
  { id: 2, text: "Schedule exit interview – Mark T.", done: true, department: "hr", createdBy: "Lisa W." },
  { id: 3, text: "Update benefits enrollment forms", done: false, department: "hr", createdBy: "Robert C." },
  { id: 4, text: "Check tire pressure before departure", done: true, department: "driver", createdBy: "James K." },
  { id: 5, text: "Submit expense report for fuel", done: false, department: "driver", createdBy: "James K." },
  { id: 6, text: "Verify cargo manifest", done: false, department: "driver", createdBy: "Tom R." },
  { id: 7, text: "Order replacement parts for V-003", done: false, department: "fleet", createdBy: "Mike D." },
  { id: 8, text: "Update GPS tracking for V-005", done: true, department: "fleet", createdBy: "Maria S." },
  { id: 9, text: "Review fleet insurance policies", done: false, department: "fleet", createdBy: "Sarah L." },
  { id: 10, text: "Update firewall rules", done: false, department: "other", createdBy: "Dan P." },
  { id: 11, text: "Prepare Q1 financial summary", done: false, department: "other", createdBy: "Emma W." },
];

const seedProfiles: EmployeeProfile[] = [
  { email: "hr@fleetpro.com", name: "Lisa Wang", role: "hr", jobTitle: "HR Manager", phone: "+1 555-0101", startDate: "2021-03-15", department: "Human Resources" },
  { email: "driver@fleetpro.com", name: "James Kowalski", role: "driver", jobTitle: "Senior Driver", phone: "+1 555-0102", startDate: "2019-08-20", department: "Operations" },
  { email: "fleet@fleetpro.com", name: "Sarah Lee", role: "fleet", jobTitle: "Logistics Manager", phone: "+1 555-0103", startDate: "2020-01-10", department: "Fleet & Logistics" },
  { email: "admin@fleetpro.com", name: "Dan Park", role: "other", jobTitle: "IT Administrator", phone: "+1 555-0104", startDate: "2022-06-01", department: "IT & Administration" },
];

// LEGACY: This seed data is from a previous project (FleetPro) and is NOT used by the SNS application
// SNS uses JWT-based authentication with the backend API instead
// This code is retained for reference only and should be removed in future cleanups
const seedUsers: EmployeeUser[] = [
  // Demo accounts - NOT used in production - for reference only
  { email: "hr@example.com", password: "", name: "HR User", initials: "HR", role: "hr", jobTitle: "HR Manager" },
  { email: "driver@example.com", password: "", name: "Driver User", initials: "DU", role: "driver", jobTitle: "Senior Driver" },
  { email: "fleet@example.com", password: "", name: "Fleet User", initials: "FU", role: "fleet", jobTitle: "Logistics Manager" },
  { email: "admin@example.com", password: "", name: "Admin User", initials: "AU", role: "other", jobTitle: "IT Administrator" },
];

// --- Storage Helpers ---

const KEYS = {
  vehicles: "fleetpro_vehicles",
  tasks: "fleetpro_tasks",
  team: "fleetpro_team",
  schedule: "fleetpro_schedule",
  users: "fleetpro_users",
  session: "fleetpro_session",
  missions: "fleetpro_missions",
  todos: "fleetpro_todos",
  profiles: "fleetpro_profiles",
} as const;

function getOrSeed<T>(key: string, seed: T): T {
  const stored = localStorage.getItem(key);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Public API ---

export const db = {
  // Vehicles
  getVehicles: (): Vehicle[] => getOrSeed(KEYS.vehicles, seedVehicles),
  saveVehicles: (v: Vehicle[]) => save(KEYS.vehicles, v),
  updateVehicle: (id: string, updates: Partial<Vehicle>) => {
    const vehicles = db.getVehicles().map(v => v.id === id ? { ...v, ...updates } : v);
    db.saveVehicles(vehicles);
    return vehicles;
  },

  // Tasks
  getTasks: (): Task[] => getOrSeed(KEYS.tasks, seedTasks),
  saveTasks: (t: Task[]) => save(KEYS.tasks, t),
  addTask: (task: Omit<Task, "id">): Task[] => {
    const tasks = db.getTasks();
    const newTask = { ...task, id: Math.max(0, ...tasks.map(t => t.id)) + 1 };
    const updated = [...tasks, newTask];
    db.saveTasks(updated);
    return updated;
  },
  updateTask: (id: number, updates: Partial<Task>): Task[] => {
    const tasks = db.getTasks().map(t => t.id === id ? { ...t, ...updates } : t);
    db.saveTasks(tasks);
    return tasks;
  },
  deleteTask: (id: number): Task[] => {
    const tasks = db.getTasks().filter(t => t.id !== id);
    db.saveTasks(tasks);
    return tasks;
  },

  // Team
  getTeam: (): TeamMember[] => getOrSeed(KEYS.team, seedTeam),
  saveTeam: (t: TeamMember[]) => save(KEYS.team, t),

  // Schedule
  getSchedule: (): ScheduleEvent[] => getOrSeed(KEYS.schedule, seedSchedule),
  saveSchedule: (s: ScheduleEvent[]) => save(KEYS.schedule, s),

  // Missions
  getMissions: (): Mission[] => getOrSeed(KEYS.missions, seedMissions),
  saveMissions: (m: Mission[]) => save(KEYS.missions, m),
  updateMission: (id: number, updates: Partial<Mission>): Mission[] => {
    const missions = db.getMissions().map(m => m.id === id ? { ...m, ...updates } : m);
    db.saveMissions(missions);
    return missions;
  },

  // Todos
  getTodos: (): TodoItem[] => getOrSeed(KEYS.todos, seedTodos),
  saveTodos: (t: TodoItem[]) => save(KEYS.todos, t),
  addTodo: (todo: Omit<TodoItem, "id">): TodoItem[] => {
    const todos = db.getTodos();
    const newTodo = { ...todo, id: Math.max(0, ...todos.map(t => t.id)) + 1 };
    const updated = [...todos, newTodo];
    db.saveTodos(updated);
    return updated;
  },
  toggleTodo: (id: number): TodoItem[] => {
    const todos = db.getTodos().map(t => t.id === id ? { ...t, done: !t.done } : t);
    db.saveTodos(todos);
    return todos;
  },
  deleteTodo: (id: number): TodoItem[] => {
    const todos = db.getTodos().filter(t => t.id !== id);
    db.saveTodos(todos);
    return todos;
  },

  // Profiles
  getProfiles: (): EmployeeProfile[] => getOrSeed(KEYS.profiles, seedProfiles),
  saveProfiles: (p: EmployeeProfile[]) => save(KEYS.profiles, p),
  getProfileByEmail: (email: string): EmployeeProfile | undefined => {
    return db.getProfiles().find(p => p.email === email);
  },

  // Auth
  getUsers: (): EmployeeUser[] => getOrSeed(KEYS.users, seedUsers),
  login: (email: string, password: string): EmployeeUser | null => {
    const user = db.getUsers().find(u => u.email === email && u.password === password);
    if (user) {
      save(KEYS.session, { email: user.email, name: user.name, initials: user.initials, role: user.role, jobTitle: user.jobTitle });
    }
    return user || null;
  },
  logout: () => localStorage.removeItem(KEYS.session),
  getSession: (): { email: string; name: string; initials: string; role: EmployeeRole; jobTitle: string } | null => {
    const stored = localStorage.getItem(KEYS.session);
    if (stored) { try { return JSON.parse(stored); } catch { return null; } }
    return null;
  },

  // Reset (useful for re-seeding after schema changes)
  resetAll: () => {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  },
};
