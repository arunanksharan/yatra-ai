import { getFlightOfferings, InputData } from './tools';

// Mock function to simulate a tool function call based on the tool name and arguments
export async function callToolFunction(
  functionName: string,
  functionArguments: Record<string, unknown>
) {
  // Dispatch tool-specific logic based on the function name
  if (functionName === 'get_flight_offerings') {
    // Call the getFlightOfferings
    const res = await getFlightOfferings(
      functionArguments as unknown as InputData
    );
    console.log(`line 19 response_handler: ${JSON.stringify(res)}`);
    return res;
  } else {
    console.warn(`Unknown tool function: ${functionName}`);
  }
}
