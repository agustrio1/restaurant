import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Utensils, Plus } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Restaurant {
  id: string;
  name: string;
}

interface CreateProps {
  restaurants: Restaurant[];
}

const Create: React.FC<CreateProps> = ({ restaurants }) => {
  const { data, setData, errors, post, processing } = useForm({
    restaurant_id: "",
    table_number: "",
    capacity: "",
    status: "available" as "available" | "reserved",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post(route("dashboard.tables.store"), {
      onSuccess: () => {
        // Optional: Add success handling
      },
      onError: () => {
        // Optional: Add error handling
      }
    });
  };

  return (
    <>
      <Head title="Tambah Meja" />
      <div className="py-6 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="ghost" 
              className="mr-2 p-1 h-8 w-8 rounded-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Tambah Meja Baru</h1>
          </div>
          <Button
            type="button" 
            variant="outline"
            className="self-start md:self-auto"
            onClick={() => window.location.href = route("dashboard.tables.index")}
          >
            Kembali ke Daftar Meja
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Utensils className="mr-2 h-5 w-5" />
                  Informasi Meja
                </CardTitle>
                <CardDescription>
                  Masukkan detail meja yang akan ditambahkan ke sistem
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant_id" className="text-sm font-medium">
                        Restoran <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={data.restaurant_id}
                        onValueChange={(value) => setData("restaurant_id", value)}
                        required
                      >
                        <SelectTrigger className={cn(
                          "w-full rounded-md border",
                          errors.restaurant_id ? "border-red-500 ring-red-500" : ""
                        )}>
                          <SelectValue placeholder="Pilih Restoran" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {restaurants.map((restaurant) => (
                            <SelectItem key={restaurant.id} value={restaurant.id}>
                              {restaurant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.restaurant_id && (
                        <p className="text-sm font-medium text-red-500 dark:text-red-500">
                          {errors.restaurant_id}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="table_number" className="text-sm font-medium">
                        Nomor Meja <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="table_number"
                        type="number"
                        min="1"
                        value={data.table_number}
                        onChange={(e) => setData("table_number", e.target.value)}
                        className={cn(
                          "rounded-md",
                          errors.table_number ? "border-red-500 ring-red-500" : ""
                        )}
                        placeholder="Masukkan nomor meja"
                        required
                      />
                      {errors.table_number && (
                        <p className="text-sm font-medium text-red-500 dark:text-red-500">
                          {errors.table_number}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-sm font-medium">
                        Kapasitas (orang) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        min="1"
                        value={data.capacity}
                        onChange={(e) => setData("capacity", e.target.value)}
                        className={cn(
                          "rounded-md",
                          errors.capacity ? "border-red-500 ring-red-500" : ""
                        )}
                        placeholder="Jumlah orang"
                        required
                      />
                      {errors.capacity && (
                        <p className="text-sm font-medium text-red-500 dark:text-red-500">
                          {errors.capacity}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={data.status}
                        onValueChange={(value: "available" | "reserved") => setData("status", value)}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="available" id="available" />
                          <Label htmlFor="available" className="cursor-pointer font-normal">
                            Tersedia
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reserved" id="reserved" />
                          <Label htmlFor="reserved" className="cursor-pointer font-normal">
                            Dipesan
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.status && (
                        <p className="text-sm font-medium text-red-500 dark:text-red-500">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                
                  <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={processing}
                      className="w-full sm:w-auto order-1 sm:order-2 flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {processing ? "Menyimpan..." : "Simpan Meja"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Panduan</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Nomor Meja</h3>
                    <p className="text-muted-foreground">
                      Nomor meja harus unik untuk setiap restoran. Sistem akan menolak 
                      jika nomor meja sudah ada di restoran yang sama.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Kapasitas</h3>
                    <p className="text-muted-foreground">
                      Masukkan jumlah maksimum orang yang dapat duduk di meja ini.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Status</h3>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Tersedia</span>: Meja dapat digunakan untuk reservasi baru<br />
                      <span className="font-medium">Dipesan</span>: Meja sudah memiliki reservasi atau tidak tersedia
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start bg-muted/50 rounded-b-lg">
                <p className="text-xs text-muted-foreground mb-3">
                  <span className="font-medium">Catatan:</span> Setelah dibuat, meja akan 
                  langsung tersedia di sistem manajemen reservasi.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-1"
                  onClick={() => window.location.href = route("dashboard.tables.index")}
                >
                  <Plus className="h-4 w-4" />
                  Reservasi Baru
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;