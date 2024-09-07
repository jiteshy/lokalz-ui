export type Store = {
  id?: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: StoreAddress;
  imageUrl: string;
  tags: Array<String>;
  rating?: string;
  type: StoreType;
  status: StoreStatus;
  location?: StoreLocation;
};

export type StoreAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: number;
};

export type StoreLocation = {
  latitude: string;
  longitude: string;
};

export enum StoreType {
  FOOD_TRUCK = "FOOD_TRUCK",
  SHOP = "SHOP",
  HOME_VENDOR = "HOME_VENDOR",
  OTHER = "OTHER",
}

export enum StoreStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ONHOLD = "ONHOLD",
  DELETED = "DELETED",
}

export type Menu = {
  menu: MenuCategory[];
};

export type MenuCategory = {
  id: string;
  category: string;
  description?: string;
  order: number;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  itemName: string;
  description?: string;
  price: string;
  category: string;
  order: number;
  available: boolean;
};

export type StoreSchedule = {
  storeId: string;
  schedules: ScheduleItem[];
};

export type ScheduleItem = {
  from: number;
  to: number;
  date: number;
  dateStr: number;
  address: StoreAddress;
};
