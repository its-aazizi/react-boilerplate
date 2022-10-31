import { AxiosResponse } from "axios";

const convert = <T>({ data }: AxiosResponse<T>): T => data;

export default { convert };
