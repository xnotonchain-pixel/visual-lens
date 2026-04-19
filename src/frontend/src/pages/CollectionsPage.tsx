import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { FolderOpen, FolderPlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Collection } from "../backend";
import { useCollections } from "../hooks/useCollections";
import { useHistory } from "../hooks/useHistory";

const GRADIENT_COVERS = [
  "linear-gradient(135deg, oklch(0.28 0.12 195), oklch(0.18 0.08 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 140), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.3 0.12 80), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 270), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 320), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 30), oklch(0.18 0.06 240))",
];

function CollectionCard({
  collection,
  coverSrc,
  index,
  onDelete,
}: {
  collection: Collection;
  coverSrc: string | null;
  index: number;
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const gradient = GRADIENT_COVERS[index % GRADIENT_COVERS.length];
  const createdDate = new Date(
    Number(collection.createdAt / BigInt(1_000_000)),
  ).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <button
        type="button"
        className="collection-card text-left w-full animate-slide-up"
        style={{ animationDelay: `${index * 0.06}s` }}
        data-ocid={`collections.item.${index + 1}`}
        onClick={() =>
          navigate({
            to: "/collections/$collectionId",
            params: { collectionId: collection.id },
          })
        }
      >
        {/* Cover */}
        <div className="absolute inset-0">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={collection.name}
              className="w-full h-full object-cover transition-smooth"
            />
          ) : (
            <div className="w-full h-full" style={{ background: gradient }} />
          )}
        </div>

        {/* Overlay */}
        <div className="collection-card-overlay" />

        {/* Label */}
        <div className="collection-card-label">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate text-foreground leading-tight">
                {collection.name}
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {createdDate}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Badge
                variant="outline"
                className="font-mono text-xs border-border/60 text-muted-foreground h-5 px-1.5"
              >
                {collection.scanIds.length}
              </Badge>
              <button
                type="button"
                data-ocid={`collections.delete_button.${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-smooth"
                aria-label={`Delete ${collection.name}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </button>

      {/* Delete confirm dialog */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid={`collections.delete_dialog.${index + 1}`}
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Delete Collection?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">
              "{collection.name}"
            </span>{" "}
            will be permanently deleted. Your scans won't be affected.
          </p>
          <div className="flex gap-2 justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              data-ocid={`collections.cancel_button.${index + 1}`}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(collection.id);
                setConfirmDelete(false);
              }}
              data-ocid={`collections.confirm_button.${index + 1}`}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CollectionsPage() {
  const {
    collections,
    isLoading,
    createCollection,
    deleteCollection,
    isCreating,
  } = useCollections();
  const { history } = useHistory();
  const [newName, setNewName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCollection(newName.trim(), {
      onSuccess: () => {
        setNewName("");
        setDialogOpen(false);
      },
    });
  };

  // For each collection, find first scan with image to use as cover
  const getCoverSrc = (col: Collection): string | null => {
    for (const scanId of col.scanIds) {
      const scan = history.find((s) => s.id === scanId);
      if (scan?.imageBase64) {
        return `data:${scan.mimeType};base64,${scan.imageBase64}`;
      }
    }
    return null;
  };

  return (
    <div
      className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in"
      data-ocid="collections.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <FolderOpen className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-foreground">
            Collections
          </h1>
          {collections.length > 0 && (
            <Badge
              variant="outline"
              className="font-mono text-xs border-border text-muted-foreground"
            >
              {collections.length}
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => setDialogOpen(true)}
          className="gap-1.5"
          data-ocid="collections.new_collection_button"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
            <Skeleton key={k} className="h-48 rounded-md" />
          ))}
        </div>
      ) : collections.length === 0 ? (
        <div
          className="glass-card p-12 text-center space-y-4 animate-fade-in"
          data-ocid="collections.empty_state"
        >
          <div className="w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center mx-auto">
            <FolderPlus className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground mb-1">
              No collections yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create a collection to organize your scans by topic.
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            size="sm"
            data-ocid="collections.create_first_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Collection
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              collection={col}
              coverSrc={getCoverSrc(col)}
              index={i}
              onDelete={deleteCollection}
            />
          ))}
        </div>
      )}

      {/* Create dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm" data-ocid="collections.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">New Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input
              data-ocid="collections.name_input"
              placeholder="Collection name…"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="collections.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newName.trim() || isCreating}
                data-ocid="collections.submit_button"
              >
                {isCreating ? "Creating…" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
