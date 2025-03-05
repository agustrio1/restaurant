import { usePage, Link, Head } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface Restaurant {
  id: string;
  name: string;
  addresss: string;
  phone_number: string;
  opening_hours: string;
  capacity: number;
  image_url: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Restoran", href: "/dashboard/restaurants" },
];

export default function Index() {
  const { restaurants } = usePage<{ restaurants: { data: Restaurant[] } }>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Restoran" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Daftar Restoran</h1>
        <Link href="/dashboard/restaurants/create">
          <Button className="mb-4">Tambah Restoran</Button>
        </Link>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead>Jam Buka</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.data.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.addresss}</TableCell>
                <TableCell>{restaurant.phone_number}</TableCell>
                <TableCell>{restaurant.opening_hours}</TableCell>
                <TableCell>{restaurant.capacity}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/restaurants/${restaurant.id}`}>
                    <Button variant="outline">Detail</Button>
                  </Link>
                  <Link href={`/dashboard/restaurants/${restaurant.id}/edit`}>
                    <Button className="ml-2">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
