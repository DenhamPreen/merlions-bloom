// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI: bigint = 1_000_000_000n;

const MerlionsBloomModule = buildModule("MerlionsBloom", (m) => {
  // const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  // const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

console.log("a")

  const merlionsBloom = m.contract("MerlionsBloom", []);
  // const merlionsBloom = m.contract("MerlionsBloom", [], {
  //   value: 1n,
  // });

  console.log("b")
  m.call(merlionsBloom, "flipCoin", [], {
    value: BigInt(1e18), // 1flow
  });

console.log("c")

  return { merlionsBloom };
});

export default MerlionsBloomModule;
