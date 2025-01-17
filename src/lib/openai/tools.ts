import axios from 'axios';

const locationCode: Record<string, string> = {
  mumbai: 'BOM',
  shillong: 'SHL',
  bangalore: 'BLR',
  delhi: 'DEL',
};

const TravelClass: Record<string, string> = {
  economy: 'ECONOMY',
  business: 'BUSINESS',
};

export interface InputData {
  destination_from: string;
  destination_to: string;
  travel_date: string; // Format: DD-MM-YYYY
  num_adults: number;
  num_children?: number;
  travel_class: string;
}

const formatDate = (date: string): string => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};

export const getFlightOfferings = async (input: InputData): Promise<any> => {
  try {
    // Map input data to query parameters
    const originLocationCode =
      locationCode[input.destination_from.toLowerCase()];
    const destinationLocationCode =
      locationCode[input.destination_to.toLowerCase()];
    const departureDate = formatDate(input.travel_date); //formatDate(input.travel_date);
    const adults = input.num_adults.toString();
    const children = input.num_children ? input.num_children.toString() : '0';
    const infants = '0'; // Hardcoded, modify if needed
    const travelClass = TravelClass[input.travel_class.toLowerCase()];

    if (!originLocationCode || !destinationLocationCode) {
      throw new Error('Invalid destination provided.');
    }

    // Construct query parameters
    const params = new URLSearchParams({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      children,
      infants,
      travelClass,
    });
    console.log(`Params: ${params}`);
    const yourBearerToken = process.env.AMADEUS_API_KEY;

    // API call
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`Amadeus response: ${JSON.stringify(response.data)}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching flight offers:', error);
    throw new Error('Failed to fetch flight offers.');
  }
};

export interface FlightDetails {
  carrier_code: string;
  number: string;
}

export const bookFlight = async (
  flightDetails: FlightDetails
): Promise<any> => {
  try {
    // Map input data to query parameters
    const carrierCode = flightDetails.carrier_code.toUpperCase();
    const number = flightDetails.number;

    // Construct query parameters
    const params = new URLSearchParams({
      carrierCode,
      number,
    });
    console.log(`Params: ${params}`);
    // const yourBearerToken = process.env.AMADEUS_API_KEY;

    // // API call
    // const response = await axios.get(
    //   `https://test.api.amadeus.com/v2/shopping/flight-offers?${params.toString()}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${yourBearerToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    // console.log(`Amadeus response: ${JSON.stringify(response.data)}`)

    return { message: 'SUCCESS' };
  } catch (error) {
    console.error('Error fetching flight offers:', error);
    throw new Error('Failed to fetch flight offers.');
  }
};
