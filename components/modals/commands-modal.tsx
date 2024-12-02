"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Command } from "@/types";

interface CommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
  companyName: string;
}

export function CommandsModal({
  isOpen,
  onClose,
  commands,
  companyName,
}: CommandsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Commands History - {companyName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commands.length > 0 ? (
                commands.map((command) => (
                  <TableRow key={command.id}>
                    <TableCell>
                      {format(new Date(command.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{command.description}</TableCell>
                    <TableCell>${command.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          command.status === "completed"
                            ? "default"
                            : command.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {command.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No commands found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
