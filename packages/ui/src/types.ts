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
  status?: StoreStatus;
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

export type StoreMenu = {
  menu: StoreMenuCategory[];
};

export type StoreMenuCategory = {
  id: string;
  category: string;
  description?: string;
  order: number;
  items: StoreMenuItem[];
};

export type StoreMenuItem = {
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
  schedules: StoreScheduleItem[];
};

export type StoreScheduleItem = {
  from: number;
  to: number;
  date: number;
  address: StoreAddress;
  existing?: boolean;
};
