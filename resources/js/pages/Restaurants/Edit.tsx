import { useForm, usePage } from "@inertiajs/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BreadcrumbItem } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

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
  { title: "Edit", href: "#" },
];

export default function Edit() {
  const { restaurant } = usePage<{ restaurant: Restaurant }>().props;

  const { data, setData, post, processing } = useForm({
    name: restaurant.name,
    address: restaurant.address,
    phone_number: restaurant.phone_number,
    opening_hours: restaurant.opening_hours,
    capacity: restaurant.capacity,
    image: null as File | null,
    _method: "PUT",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("opening_hours", data.opening_hours);
    formData.append("capacity", data.capacity.toString());

    if (data.image) {
      formData.append("image", data.image);
    }

    post(`/dashboard/restaurants/${restaurant.id}`, {
      forceFormData: true,
    });
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setData("image", acceptedFiles[0]);
    }
  }, [setData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Restoran" />
      <div className="flex justify-center">
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">Edit Restoran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Bagian Form */}
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label>Nama</Label>
                  <Input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} required />
                </div>

                <div>
                  <Label>Alamat</Label>
                  <Textarea value={data.address} onChange={(e) => setData("address", e.target.value)} required />
                </div>

                <div>
                  <Label>No. Telepon</Label>
                  <Input type="text" value={data.phone_number} onChange={(e) => setData("phone_number", e.target.value)} required />
                </div>

                <div>
                  <Label>Jam Buka</Label>
                  <Input type="text" value={data.opening_hours} onChange={(e) => setData("opening_hours", e.target.value)} required />
                </div>

                <div>
                  <Label>Kapasitas</Label>
                  <Input type="number" value={data.capacity} onChange={(e) => setData("capacity", Number(e.target.value))} required min="1" />
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                  Update
                </Button>
              </form>

              {/* Bagian Upload & Preview */}
              <div>
                <Label>Gambar</Label>
                <div
                  {...getRootProps()}
                  className="border-sidebar-border/70 dark:border-sidebar-border flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-sm text-blue-500">Lepaskan gambar di sini...</p>
                  ) : (
                    <p className="text-sm text-gray-500">Seret dan lepas gambar di sini, atau klik untuk memilih</p>
                  )}
                </div>

                {data.image ? (
  <div className="mt-4">
    <p className="text-sm text-gray-600">Preview:</p>
    <img
      src={URL.createObjectURL(data.image)}
      alt="Preview"
      className="mt-2 h-40 w-full rounded-lg object-cover shadow"
    />
  </div>
) : restaurant.image_url ? (
  <div className="mt-4">
    <p className="text-sm text-gray-600">Gambar Saat Ini:</p>
    <img
      src={`/storage/${restaurant.image_url}`}
      alt="Gambar Saat Ini"
      className="mt-2 h-40 w-full rounded-lg object-cover shadow"
    />
  </div>
) : null}

              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
