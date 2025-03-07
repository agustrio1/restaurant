import { Head, Link } from '@inertiajs/react';

type Restaurant = {
    id: number;
    name: string;
    address: string;
    phone_number: string;
    image_url: string;
};

type Props = {
    restaurants: Restaurant[];
};

export default function Restaurants({ restaurants }: Props) {
    return (
        <>
            <Head title="Daftar Restoran" />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Daftar Restoran</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurants.map((restaurant) => (
                            <div key={restaurant.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={`/storage/${restaurant.image_url}`}
                                    alt={restaurant.name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h2 className="text-xl font-semibold mt-3">{restaurant.name}</h2>
                                <p className="text-gray-600">{restaurant.address}</p>
                                <p className="text-gray-600">☎ {restaurant.phone_number}</p>
                                <Link
                                    href={route('dashboard.restaurants.show', restaurant.id)}
                                    className="mt-3 inline-block text-blue-600 hover:underline"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
