import { GlobalState, handlerContext } from "generated"

const GLOBAL_STATE_ID = "GlobalState"

export const getOrCreateGlobalState = async (context: handlerContext) : Promise<GlobalState> => {    
    let globalState: GlobalState | undefined = await context.GlobalState.get(GLOBAL_STATE_ID)        

    if (globalState == undefined) {
        globalState = {
            id: GLOBAL_STATE_ID,
            currentDepositAmount: BigInt(0)
        }        
    } 

    return globalState;
}