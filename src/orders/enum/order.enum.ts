export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANDELLED = 'CANDELLED',
}

export const orderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.DELIVERED,
  OrderStatus.CANDELLED,
];
