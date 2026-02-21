/*
------------------------------------------

          API Interfaces

------------------------------------------
*/

export interface BaseUser {
  id: number;
  username: string;
  email: string;
}

export type UserRole = "admin" | "user";

export interface AppUser extends BaseUser {
  role: UserRole;
}

export interface ApiResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
}

/*
------------------------------------------

            Product Interfaces

------------------------------------------
*/

interface Product {
  cat: string;
  desc: string;
  id: number;
  img: string;
  price: number;
  title: string;
}

interface CategoryData {
  phones: Product[];
  notebooks: Product[];
  monitor: Product[];
}

export interface RootObject {
  Items: CategoryData;
}

interface ProductId {
  id_1: string;
  id_2: string;
}

export interface ProductIdData {
  product_id: ProductId;
}
