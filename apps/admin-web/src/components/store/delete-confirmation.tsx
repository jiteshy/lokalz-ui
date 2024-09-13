"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DeleteConfirmationProps = {
  entity: string;
  entityId: string;
  comparePhrase?: string; // Used to compare with the user input to confirm delete
  onDelete: (entityId: string) => Promise<void>;
  children: ReactNode;
};

export const DeleteConfirmation = ({
  entity,
  entityId,
  comparePhrase,
  onDelete,
  children,
}: DeleteConfirmationProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleInputValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    setError("");
  };

  const handleDelete = (event: React.FormEvent) => {
    if (inputValue.toLowerCase() !== comparePhrase?.toLowerCase()) {
      setError(`${entity} name does not match.`);
    } else {
      setError("");
      onDelete(entityId).then(() => {
        setInputValue("");
        setOpen(false);
      });
    }
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete {entity}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {entity.toLowerCase()}? If
              yes, please enter the name of the {entity.toLowerCase()} below and
              click "Delete {entity}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4 pb-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right whitespace-nowrap">
                {entity} Name
              </Label>
              <Input
                id="name"
                value={inputValue}
                onChange={handleInputValueChange}
                className={`col-span-3 ${error && "border border-red-accent-400"}`}
              />
            </div>
            <div className="text-red-accent-400 text-sm min-h-5 w-full text-right -mt-3">
              {error}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Delete {entity}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
