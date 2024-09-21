import assert from "assert";
import { 
  TestHelpers,
  MerlionsBloom_CoinFlipped
} from "generated";
const { MockDb, MerlionsBloom } = TestHelpers;

describe("MerlionsBloom contract CoinFlipped event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for MerlionsBloom contract CoinFlipped event
  const event = MerlionsBloom.CoinFlipped.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("MerlionsBloom_CoinFlipped is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await MerlionsBloom.CoinFlipped.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualMerlionsBloomCoinFlipped = mockDbUpdated.entities.MerlionsBloom_CoinFlipped.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedMerlionsBloomCoinFlipped: MerlionsBloom_CoinFlipped = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      user: event.params.user,
      requestId: event.params.requestId,
      amount: event.params.amount,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMerlionsBloomCoinFlipped, expectedMerlionsBloomCoinFlipped, "Actual MerlionsBloomCoinFlipped should be the same as the expectedMerlionsBloomCoinFlipped");
  });
});
