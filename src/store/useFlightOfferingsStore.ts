import { create } from 'zustand';

interface FlightOffer {
    id: string;
    source: string;
    price: {
        currency: string;
        total: string;
        grandTotal: string;
    };
    numberOfBookableSeats: number;
    itineraries: {
        duration: string;
        segments: {
            departure: {
                iataCode: string;
                terminal?: string;
                at: string;
            };
            arrival: {
                iataCode: string;
                terminal?: string;
                at: string;
            };
            carrierCode: string;
            number: string;
        }[];
    }[];
}

interface FlightOfferingsStore {
    flightOffers: FlightOffer[];
    addFlightOffers: (offers: FlightOffer[]) => void;
}

export const useFlightOfferingsStore = create<FlightOfferingsStore>((set) => ({
    flightOffers: [],
    addFlightOffers: (offers) => set({ flightOffers: offers }),
}));