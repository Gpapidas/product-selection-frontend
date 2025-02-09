export type BaseResponse<T> = {
  type: "success" | "error";
  errors: { code: string; detail: string, attr: string }[];
  detail: string;
  data: T;
};
