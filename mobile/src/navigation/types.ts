export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Arts: undefined;
  Warehouse: undefined;
  Pallets: undefined;
  Profile: undefined;
};

export type ArtsStackParamList = {
  ArtsList: undefined;
  ArtDetail: { artikul: string };
  ArtsUtils: undefined;
};

export type WarehouseStackParamList = {
  WarehouseList: undefined;
  Rows: undefined;
  RowDetail: { row: string };
  Stocks: undefined;
  StockDetail: { stock: string };
  Zones: undefined;
  WhUtils: undefined;
};

export type PalletsStackParamList = {
  PalletsList: undefined;
  // PalletDetail: { title: string };
  Poses: { palletId: string };
  AddPallet: undefined;
};

export type PosesStackParamList = {
  PosesList: { palletId: string };
  PoseDetail: { poseId: string; palletId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
