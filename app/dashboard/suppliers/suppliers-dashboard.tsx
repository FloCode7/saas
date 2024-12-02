"use client";

import { columns } from "@/components/layout/table-columns";
import { DataTable } from "@/components/layout/table-data";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandsModal } from "@/components/modals/commands-modal";
import { AddSupplierModal } from "@/components/modals/add-supplier-modal";
import { Row, Table as TableType } from "@tanstack/react-table";

interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  commands: Command[];
  lastCommandDate: Date | null;
}

interface Command {
  id: string;
  date: Date;
  amount: number;
  status: string;
  description: string;
}

export function SuppliersDashboard() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const suppliers = await response.json();
        setData(suppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId: string) => {
    try {
      // Envoie une requête DELETE pour supprimer le fournisseur
      const response = await fetch(`/api/suppliers?id=${supplierId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete supplier");
      }

      // Si la suppression est réussie, retire-le du DOM
      setData(data.filter((supplier) => supplier.id !== supplierId));
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete supplier"
      );
    }
  };

  const handleAddSupplier = async (
    newSupplier: Omit<Supplier, "id" | "commands" | "lastCommandDate">
  ) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.details || responseData.error || "Failed to add supplier"
        );
      }

      setData((prevData) => [...prevData, responseData]);
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert(error instanceof Error ? error.message : "Failed to add supplier");
      throw error;
    }
  };

  const handleDeleteSelected = async (table: TableType<Supplier>) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row: Row<Supplier>) => row.original.id);

    if (selectedIds.length === 0) {
      alert("No suppliers selected");
      return;
    }

    try {
      // Envoi de la requête DELETE pour supprimer les fournisseurs sélectionnés
      const response = await fetch("/api/suppliers/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete suppliers");
      }

      // Mettre à jour les données localement après la suppression côté serveur
      setData(data.filter((supplier) => !selectedIds.includes(supplier.id)));
      table.toggleAllRowsSelected(false); // Désélectionner toutes les lignes
    } catch (error) {
      console.error("Error deleting suppliers:", error);
      alert("Failed to delete suppliers");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage relationships and orders of your suppliers.
          </p>
        </div>
      </div>
      <DataTable
        columns={columns(handleDelete)}
        data={data}
        onAddNew={() => setIsAddModalOpen(true)}
        onDeleteSelected={handleDeleteSelected}
      />
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSupplier}
      />
      {selectedSupplier && (
        <CommandsModal
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          commands={selectedSupplier.commands}
          companyName={selectedSupplier.companyName}
        />
      )}
    </div>
  );
}
