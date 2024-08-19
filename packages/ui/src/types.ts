export type Store = {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: StoreAddress;
  imageUrl: string;
  imgSrc: string; // TODO: Remove this, kept for hard coded vendor details page
  tags: Array<String>;
  distance: string; // TODO: To be added later
  rating: string;
  type: StoreType;
  location: StoreLocation;
};

export type StoreAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
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

export enum StoreStatus { // TODO to be used in admin panel
  ACTIVE,
  INACTIVE,
  ONHOLD, // Thought - show in upcoming??
  DELETED,
}

export type Services = {
  categories: ServiceCategory[];
};

export type ServiceCategory = {
  id: string;
  categoryCode: string;
  categoryName: string;
  categoryDescription: string;
  order: number;
  items: ServiceItem[];
};

export type ServiceItem = {
  id: string;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  price: string;
};
