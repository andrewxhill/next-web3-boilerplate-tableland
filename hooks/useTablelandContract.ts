import Tableland_ABI from "../contracts/TablelandTables.json";
import type { TablelandTables } from "../contracts/types";
import useContract from "./useContract";

export default function useTokenContract(registryAddress?: string) {
  return useContract<TablelandTables>(registryAddress, Tableland_ABI);
}
