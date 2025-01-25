import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
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
  bestbefore: string;
}

export interface UserType extends Document {
  name: string;
  passwordHash: string;
  market?: MarketType["_id"];
  position: string;
}

export interface MarketType extends Document {
  name: string;
  productPlacements: Array<ProductPlacement>;
  personnel?: Array<UserType>;
  storage?: Array<StorageProductType>;
}

export interface UserForToken {
  name: string | undefined;
  id: string | undefined;
}

export interface IRequest extends Request {
  token?: string;
  user?: any | JwtPayload;
}

export interface TypedPlacementRequest<T> extends Request {
  body: T[];
}
