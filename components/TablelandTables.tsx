import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTablelandTokensOfOwner from "../hooks/useTablelandTokensOfOwner";

type TablelandTablesProps = {
  registryAddress: string;
  networkId: string;
};

const TablelandTables = ({
  registryAddress,
  networkId,
}: TablelandTablesProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useTablelandTokensOfOwner(account, registryAddress);

  return (
    <div>
      {data &&
        data.map((item, index) => {
          const url =
            "https://render.tableland.xyz/" + networkId + "/" + item.toNumber();
          return (
            <img
              width={150}
              height={150}
              style={{ margin: "2px" }}
              key={index}
              src={url}
            />
          );
        })}
    </div>
  );
};

export default TablelandTables;
