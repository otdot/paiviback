import { Divisions } from "./types/enum";
import {
  MarketType,
  ProductPlacement,
  ProductType,
  StorageProductType,
  UserType,
} from "./types/interface";

export type NewUserType = Pick<
  UserType,
  "name" | "passwordHash" | "market" | "position"
>;
type NewProductType = Pick<ProductType, "name" | "division" | "supplier">;
export type NewStorageProductType = Pick<
  StorageProductType,
  "name" | "division" | "supplier" | "amount" | "unit" | "lotnum" | "bestbefore"
>;
type NewMarketType = Pick<
  MarketType,
  "name" | "productPlacements" | "personnel" | "storage"
>;

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDivision = (division: any): division is Divisions => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Divisions).includes(division);
};

export const parseDivision = (Division: unknown): Divisions => {
  if (!Division || !isDivision(Division)) {
    throw new Error(
      "Divison not formatted right. Missing or malformatted data"
    );
  }
  return Division;
};

const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error("Number not formatted right. Missing or malformatted data");
  }
  return number;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("String not formatted right. Missing or malformatted data");
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Date not formatted right. Incorrect or missing content");
  }
  return date;
};

export const toNewStorageProductType = (object: any): NewStorageProductType => {
  const newStorageProductType = {
    name: parseString(object.name),
    division: parseString(object.division),
    supplier: parseString(object.supplier),
    amount: parseNumber(object.amount),
    unit: parseString(object.unit),
    lotnum: parseString(object.lotnum),
    bestbefore: parseDate(object.bestbefore),
  };
  return newStorageProductType;
};

export const toNewProduct = (object: any): NewProductType => {
  const newProduct = {
    name: parseString(object.name),
    division: parseString(object.division),
    supplier: parseString(object.supplier),
  };
  return newProduct;
};

export const toNewProductPlacement = (
  productPlacement: any
): ProductPlacement => {
  const newProductPlacement = {
    division: parseString(productPlacement.division),
    aisle: parseNumber(productPlacement.aisle),
  };
  return newProductPlacement;
};

export const toNewMarket = (object: any): NewMarketType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const productPlacements: ProductPlacement[] = object.productPlacements.map(
    (placement: ProductPlacement) => toNewProductPlacement(placement)
  );

  const newMarket = {
    name: parseString(object.name),
    productPlacements,
  };
  return newMarket;
};

export const toNewUser = (object: any): NewUserType => {
  const newUser = {
    name: parseString(object.name),
    passwordHash: parseString(object.password),
    position: parseString(object.position),
  };

  return newUser;
};
