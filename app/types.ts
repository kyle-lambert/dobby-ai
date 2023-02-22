export type With<T, K> = Pick<T, Extract<keyof T, K>>;
