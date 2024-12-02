import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createSupplierSchema } from "@/lib/validations/supplier";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);
    // Validation avec Zod
    const validatedData = createSupplierSchema.parse(body);

    const supplier = await prisma.supplier.create({
      data: {
        ...validatedData,
        commands: {
          create: [],
        },
        lastCommandDate: null,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error creating supplier:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error creating supplier", details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        commands: true,
      },
      orderBy: {
        companyName: "asc", // Tri optionnel par nom d'entreprise
      },
    });

    if (!suppliers) {
      return NextResponse.json([]); // Retourne un tableau vide si pas de fournisseurs
    }

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error); // Log l'erreur pour le debugging
    return NextResponse.json(
      {
        error: "Error fetching suppliers",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Récupère l'ID du fournisseur à supprimer depuis l'URL
    const { searchParams } = new URL(request.url);
    const supplierId = searchParams.get("id");

    if (!supplierId) {
      return NextResponse.json(
        { error: "Supplier ID is required" },
        { status: 400 }
      );
    }

    // Supprimer le fournisseur de la base de données
    const deletedSupplier = await prisma.supplier.delete({
      where: { id: supplierId },
    });

    return NextResponse.json(deletedSupplier);
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Error deleting supplier", details: error },
      { status: 500 }
    );
  }
}
