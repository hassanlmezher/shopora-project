declare module "express" {
  const exp: any;
  export default exp;
}

declare module "mongoose" {
  const mongoose: any;
  export default mongoose;
}

declare module "cors" {
  const fn: any;
  export default fn;
}

declare module "dotenv" {
  export function config(): void;
}
