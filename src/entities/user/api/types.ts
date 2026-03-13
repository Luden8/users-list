export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface UserDetail extends User {
  maidenName: string;
  birthDate: string;
  username: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: { color: string; type: string };
  university: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface SortOptions {
  sortBy: string;
  order: "asc" | "desc";
}

export interface Filters extends SortOptions {
  gender: string;
  ageRange: string;
  department: string;
}
