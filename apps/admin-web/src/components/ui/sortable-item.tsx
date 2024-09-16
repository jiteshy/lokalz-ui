import { useSortable } from "@dnd-kit/sortable";
import { FC, ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

interface ISortableItem {
  itemId: string;
  children: ReactNode;
}

export const SortableItem: FC<ISortableItem> = ({ itemId, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  return (
    <div
      className="flex items-center gap-3 w-full"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
        backgroundColor: isDragging ? "rgb(241, 245, 249)" : "inherit",
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: "relative",
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="self-start pt-[15px]"
      >
        <DragHandleDots2Icon className="h-5 w-5 hover:cursor-grab active:cursor-grabbing" />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
