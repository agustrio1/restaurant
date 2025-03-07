import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface Restaurant {
  id: number;
  name: string;
}

interface TableData {
  id: number;
  restaurant_id: number;
  table_number: number;
  capacity: number;
  status: 'available' | 'reserved';
}

interface EditProps {
  table: TableData;
  restaurants: Restaurant[];
}

const Edit: React.FC<EditProps> = ({ table, restaurants }) => {
  const { data, setData, errors, put, processing } = useForm({
    restaurant_id: table.restaurant_id.toString(),
    table_number: table.table_number.toString(),
    capacity: table.capacity.toString(),
    status: table.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("dashboard.tables.update", table.id));
  };

  return (
    <>
      <Head title="Edit Meja" />
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="mr-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Edit Meja #{table.table_number}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_id">Restoran</Label>
                    <Select
                      value={data.restaurant_id}
                      onValueChange={(value) => setData("restaurant_id", value)}
                      disabled
                    >
                      <SelectTrigger className={errors.restaurant_id ? "border-red-500" : ""}>
                        <SelectValue placeholder="Pilih Restoran" />
                      </SelectTrigger>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                            {restaurant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.restaurant_id && (
                      <p className="text-sm text-red-500">{errors.restaurant_id}</p>
                    )}
                    <p className="text-xs text-gray-500">Restoran tidak dapat diubah</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="table_number">Nomor Meja</Label>
                    <Input
                      id="table_number"
                      type="number"
                      min="1"
                      value={data.table_number}
                      onChange={(e) => setData("table_number", e.target.value)}
                      className={errors.table_number ? "border-red-500" : ""}
                    />
                    {errors.table_number && (
                      <p className="text-sm text-red-500">{errors.table_number}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Kapasitas (orang)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={data.capacity}
                      onChange={(e) => setData("capacity", e.target.value)}
                      className={errors.capacity ? "border-red-500" : ""}
                    />
                    {errors.capacity && (
                      <p className="text-sm text-red-500">{errors.capacity}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      value={data.status}
                      onValueChange={(value: any) => setData("status", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="available" />
                        <Label htmlFor="available" className="cursor-pointer">Tersedia</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reserved" id="reserved" />
                        <Label htmlFor="reserved" className="cursor-pointer">Dipesan</Label>
                      </div>
                    </RadioGroup>
                    {errors.status && (
                      <p className="text-sm text-red-500">{errors.status}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={processing}>
                    {processing ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Edit;