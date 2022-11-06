import useSWR from "swr";
import type { TablelandTables } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTablelandContract from "./useTablelandContract";

function runCreateTable(contract: TablelandTables) {
  return async (owner: string, statement: string) => {
    return contract.createTable(owner, statement);
  };
}

export default function useCreateTable(
  owner: string,
  statement: string,
  tokenAddress: string,
  suspense = false
) {
  const contract = useTablelandContract(tokenAddress);

  const shouldFetch =
    typeof owner === "string" &&
    typeof statement === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  // const result = useSWR(
  //   shouldFetch ? ["CreateTable", owner, statement, tokenAddress] : null,
  //   runCreateTable(contract),
  //   {
  //     suspense,
  //   }
  // );

  // useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  // return result;
  return runCreateTable(contract);
}
