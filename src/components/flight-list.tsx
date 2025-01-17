'use client';

import { useFlightOfferingsStore } from '@/store/useFlightOfferingsStore';

const FlightList = () => {
    const { flightOffers } = useFlightOfferingsStore();

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Available Flights</h2>
            {flightOffers.length === 0 ? (
                <p>No flights available. Start a chat to search for flights!</p>
            ) : (
                <ul className="space-y-4">
                    {flightOffers.map((offer) => (
                        <li key={offer.id} className="border p-4 rounded-lg shadow">
                            <p>
                                <strong>Flight:</strong> {`${offer.itineraries[0]?.segments[0]?.carrierCode} ${offer.itineraries[0]?.segments[0]?.number}`}
                            </p>

                            <p>
                                <strong>From:</strong> {offer.itineraries[0]?.segments[0]?.departure.iataCode} (
                                {offer.itineraries[0]?.segments[0]?.departure.at})
                            </p>
                            <p>
                                <strong>To:</strong> {offer.itineraries[0]?.segments[0]?.arrival.iataCode} (
                                {offer.itineraries[0]?.segments[0]?.arrival.at})
                            </p>
                            <p>
                                <strong>Price:</strong> {offer.price.grandTotal} {offer.price.currency}
                            </p>
                            <p>
                                <strong>Seats Available:</strong> {offer.numberOfBookableSeats}
                            </p>
                            <p>
                                <strong>Duration:</strong> {offer.itineraries[0]?.duration}
                            </p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FlightList;