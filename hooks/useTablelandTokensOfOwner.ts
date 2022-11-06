import useSWR from "swr";
import type { TablelandTables } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTablelandContract from "./useTablelandContract";

function getTokensOwnerOf(contract: TablelandTables) {
  return async (_: string, address: string) => {
    const balance = await contract.tokensOfOwner(address);
    return balance;
  };
}

export default function useTokensOfOwner(
  address: string,
  tokenAddress: string,
  suspense = false
) {
  const contract = useTablelandContract(tokenAddress);

  const shouldFetch =
    typeof address === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokensOfOwner", address, tokenAddress] : null,
    getTokensOwnerOf(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
