import { useState } from "react";
import { usePage, Link, Head, router } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Restoran", href: "/dashboard/restaurants" },
];

export default function Index() {
  const { restaurants } = usePage<{ restaurants: { data: Restaurant[] } }>().props;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Buka modal konfirmasi
  const openDeleteDialog = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpen(true);
  };

  // Hapus restoran setelah konfirmasi
  const handleDelete = () => {
    if (!selectedRestaurant) return;

    router.delete(`/dashboard/restaurants/${selectedRestaurant.id}`, {
      onSuccess: () => {
        toast({
          title: "Sukses!",
          description: "Restoran berhasil dihapus.",
          variant: "default",
        });
        setOpen(false);
      },
      onError: () =>
        toast({
          title: "Gagal!",
          description: "Gagal menghapus restoran.",
          variant: "destructive",
        }),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Restoran" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Daftar Restoran</h1>
        <Link href="/dashboard/restaurants/create">
          <Button className="mb-4">Tambah Restoran</Button>
        </Link>
        <div className="overflow-x-auto">
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
                  <TableCell>{restaurant.address}</TableCell>
                  <TableCell>{restaurant.phone_number}</TableCell>
                  <TableCell>{restaurant.opening_hours}</TableCell>
                  <TableCell>{restaurant.capacity}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/dashboard/restaurants/${restaurant.id}`}>
                      <Button variant="outline">Detail</Button>
                    </Link>
                    <Link href={`/dashboard/restaurants/${restaurant.id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button variant="destructive" onClick={() => openDeleteDialog(restaurant)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  
      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Restoran</DialogTitle>
          </DialogHeader>
          <p>Apakah Anda yakin ingin menghapus restoran <strong>{selectedRestaurant?.name}</strong>?</p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
