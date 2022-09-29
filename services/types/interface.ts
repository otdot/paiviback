import { Document } from "mongoose";

export interface ProductPlacement {
  division: string;
  aisle: number;
}

export interface ProductType extends Document {
  name: string;
  division: string;
  supplier: string;
}

export interface StorageProductType extends ProductType {
  amount: number;
  unit: string;
  lotnum: string;
}

export interface UserType extends Document {
  name: string;
  market?: MarketType["id"];
  position: string;
}

export interface MarketType extends Document {
  name: string;
  productPlacements: Array<ProductPlacement>;
  personnel?: Array<UserType["id"]>;
  storage?: Array<StorageProductType["id"]>;
}
