import { usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  opening_hours: string;
  capacity: number;
  image_url: string | null;
}

export default function Show() {
  const { restaurant } = usePage<{ restaurant?: Restaurant }>().props;

  if (!restaurant) {
    return (
      <AppLayout>
        <div className="container mx-auto p-4">
          <Card>
            <CardContent>
              <CardTitle className="text-2xl text-red-600">Restoran Tidak Ditemukan</CardTitle>
              <p className="text-gray-600 mt-2">Restoran yang diminta tidak ditemukan.</p>
              <Link href="/dashboard/restaurants">
                <Button variant="outline" className="mt-4">Kembali ke Daftar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Restoran", href: "/dashboard/restaurants" },
    { title: restaurant.name, href: "#" },
  ];

  // Construct full image URL
  const imageUrl = restaurant.image_url 
    ? `${window.location.origin}/storage/${restaurant.image_url}` 
    : null;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto p-4">
        <Card>
          <CardContent>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={restaurant.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <CardTitle className="text-2xl mt-4">{restaurant.name}</CardTitle>
            <p className="text-gray-600"><strong>Alamat:</strong> {restaurant.address}</p>
            <p><strong>No. Telepon:</strong> {restaurant.phone_number}</p>
            <p><strong>Jam Buka:</strong> {restaurant.opening_hours}</p>
            <p><strong>Kapasitas:</strong> {restaurant.capacity} orang</p>
            <div className="mt-4 flex gap-2">
              <Link href="/dashboard/restaurants">
                <Button variant="outline">Kembali</Button>
              </Link>
              <Link href={`/dashboard/restaurants/${restaurant.id}/edit`}>
                <Button>Edit</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
