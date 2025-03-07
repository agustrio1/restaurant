import React, { useState } from "react";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, 
  Trash, 
  Plus, 
  Users, 
  Utensils, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableData {
  id: string;
  restaurant_id: string;
  table_number: number;
  capacity: number;
  status: 'available' | 'reserved';
  restaurant: {
    id: string;
    name: string;
  };
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface PageProps extends Record<string, unknown> {
  tables: {
    data: TableData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLinks[];
    from: number;
    to: number;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Meja", href: "/dashboard/tables" },
];

export default function Index() {
  // Get data from the page props
  const { tables, flash } = usePage<PageProps>().props;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [sortField, setSortField] = useState<string>("table_number");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // Show toast notifications for flash messages
  React.useEffect(() => {
    if (flash?.success) {
      toast({
        title: "Sukses!",
        description: flash.success,
        variant: "default",
      });
    }

    if (flash?.error) {
      toast({
        title: "Error!",
        description: flash.error,
        variant: "destructive",
      });
    }
  }, [flash, toast]);

  // Open delete confirmation dialog
  const openDeleteDialog = (table: TableData) => {
    setSelectedTable(table);
    setOpen(true);
  };

  // Delete table after confirmation
  const handleDelete = () => {
    if (!selectedTable) return;

    router.delete(route("dashboard.tables.destroy", selectedTable.id), {
      onSuccess: () => {
        toast({
          title: "Sukses!",
          description: "Meja berhasil dihapus.",
          variant: "default",
        });
        setOpen(false);
      },
      onError: () =>
        toast({
          title: "Gagal!",
          description: "Gagal menghapus meja.",
          variant: "destructive",
        }),
    });
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    
    router.get(route("dashboard.tables.index"), {
      sort: field,
      order: order
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Sort tables data by table number
  const sortedTables = React.useMemo(() => {
    return [...tables.data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.table_number - b.table_number;
      } else {
        return b.table_number - a.table_number;
      }
    });
  }, [tables.data, sortOrder]);

  // Handle pagination
  const goToPage = (page: number) => {
    router.get(route("dashboard.tables.index"), {
      page: page,
      sort: sortField,
      order: sortOrder
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Meja" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Daftar Meja</h1>
          </div>
          <Link href={route("dashboard.tables.create")}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Meja
            </Button>
          </Link>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="bg-muted/40 pb-2">
            <CardTitle className="text-lg font-medium">Manajemen Meja</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("table_number")}
                    >
                      <div className="flex items-center gap-1">
                        No. Meja
                        {sortField === "table_number" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Restoran</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Kapasitas
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTables.length > 0 ? (
                    sortedTables.map((table) => (
                      <TableRow key={table.id}>
                        <TableCell className="font-medium">{table.table_number}</TableCell>
                        <TableCell>{table.restaurant.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {table.capacity} orang
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              table.status === "available" 
                                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                                : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                            }
                          >
                            {table.status === "available" ? "Tersedia" : "Dipesan"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={route("dashboard.tables.edit", table.id)}>
                              <Button variant="outline" size="sm" className="h-8 px-2">
                                <Pencil className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => openDeleteDialog(table)}
                            >
                              <Trash className="h-3.5 w-3.5 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Tidak ada data meja yang tersedia.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {tables.last_page > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
                  Menampilkan {tables.from} - {tables.to} dari {tables.total} data
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* First Page */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(1)}
                    disabled={tables.current_page === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  
                  {/* Previous Page */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(tables.current_page - 1)}
                    disabled={tables.current_page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: tables.last_page }, (_, i) => i + 1)
                    .filter(page => {
                      // Show current page and 1 page before and after
                      return Math.abs(page - tables.current_page) <= 1 || page === 1 || page === tables.last_page;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      const showPrevEllipsis = index > 0 && array[index - 1] !== page - 1;
                      const showNextEllipsis = index < array.length - 1 && array[index + 1] !== page + 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {showPrevEllipsis && (
                            <span className="px-2 py-1">...</span>
                          )}
                          
                          <Button
                            variant={tables.current_page === page ? "default" : "outline"}
                            size="sm"
                            className={`h-8 w-8 ${tables.current_page === page ? "font-bold" : ""}`}
                            onClick={() => goToPage(page)}
                          >
                            {page}
                          </Button>
                          
                          {showNextEllipsis && (
                            <span className="px-2 py-1">...</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  
                  {/* Next Page */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(tables.current_page + 1)}
                    disabled={tables.current_page === tables.last_page}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  {/* Last Page */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(tables.last_page)}
                    disabled={tables.current_page === tables.last_page}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog Konfirmasi Hapus */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Meja</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin menghapus meja <strong>#{selectedTable?.table_number}</strong> dari restoran <strong>{selectedTable?.restaurant.name}</strong>?
          </p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}