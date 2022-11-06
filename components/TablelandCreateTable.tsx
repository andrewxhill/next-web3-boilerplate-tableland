import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import useTablelandCreateTable from "../hooks/useTablelandCreateTable";

type TablelandCreateTableProps = {
  registryAddress: string;
  networkId: string;
};

const TablelandTables = ({
  registryAddress,
  networkId
}: TablelandCreateTableProps) => {
  const [statement, setStatement] = useState("");
  const handleStatementChange = (event) => {
    setStatement(event.target.value);
  };
  const { account } = useWeb3React<Web3Provider>();
  const createTable = useTablelandCreateTable(
    account,
    statement,
    registryAddress
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add Tableland SQL parser check here.
    createTable(account, statement).then((id) => {
      console.log("table created");
    });
  };

  const placeholder = "CREATE TABLE test_" + networkId + " (id int, name text)";
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          style={{ width: "300px", margin: "10px" }}
          width="300px"
          type="statement"
          name="statement"
          placeholder={placeholder}
          onChange={handleStatementChange}
          value={statement}
        />
        <button type="submit">RUN CREATE</button>
      </div>
    </form>
  );
};

export default TablelandTables;
