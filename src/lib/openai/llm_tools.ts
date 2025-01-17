import { ChatCompletionTool } from 'openai/resources/index.mjs'; // Adjust based on the actual OpenAI package path

export const llm_tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_flight_offerings',
      description:
        'Fetch list of available flights between a pair of destinations (from and to) with travel date, number of passengers (adults and children) and travel class',
      strict: true,
      parameters: {
        type: 'object',
        properties: {
          destination_from: {
            type: 'string',
            description: 'destination flying from such as mumbai',
          },
          destination_to: {
            type: 'string',
            description: 'destination flying to such as delhi',
          },
          travel_date: {
            type: 'string',
            description: 'date of travel in YYYY-MM-DD format',
          },
          num_adults: {
            type: 'string',
            description: 'number of adult passengers travelling',
          },
          num_children: {
            type: 'string',
            description: 'number of children travelling',
          },
          travel_class: {
            type: 'string',
            description: 'travel class such as economy or business',
          },
        },
        required: [
          'destination_from',
          'destination_to',
          'travel_date',
          'num_adults',
          'num_children',
          'travel_class',
        ],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'book_flight',
      description:
        'Book the specific flight bby flight number (carrier code and number) which the user has requested',
      strict: true,
      parameters: {
        type: 'object',
        properties: {
          carrier_code: {
            type: 'string',
            description: 'Code for the airlines such as AI, SG',
          },
          number: {
            type: 'string',
            description: 'Flight number that follows the carrier code',
          },
        },
        required: ['carrier_code', 'number'],
        additionalProperties: false,
      },
    },
  },
];
