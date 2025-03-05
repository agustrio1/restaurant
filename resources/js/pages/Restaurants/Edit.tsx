import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Restaurant {
  id: string;
  name: string;
  addresss: string;
  phone_number: string;
  opening_hours: string;
  capacity: number;
  image_url: string | null;
}

export default function Edit() {
  const { restaurant } = usePage<{ restaurant: Restaurant }>().props;

  const { data, setData, post, processing } = useForm({
    name: restaurant.name,
    address: restaurant.addresss,
    phone_number: restaurant.phone_number,
    opening_hours: restaurant.opening_hours,
    capacity: restaurant.capacity,
    image: null as File | null,
    _method: "PUT", // Tambahkan _method di sini
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(`/restaurants/${restaurant.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Restoran</h1>
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
          <Label>Gambar</Label>
          <Input type="file" onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)} />
        </div>

        <Button type="submit" disabled={processing}>Update</Button>
      </form>
    </div>
  );
}
