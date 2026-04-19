import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FolderOpen, g as Skeleton, u as useNavigate } from "./index-BUSSrS1X.js";
import { B as Badge } from "./badge-tA_YrSZS.js";
import { B as Button } from "./button-DIJgVfI1.js";
import { u as useCollections, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./useCollections-BLnssFjP.js";
import { I as Input } from "./input-Coz0Q6Kk.js";
import { u as useHistory } from "./useHistory-Cpl0QatJ.js";
import { P as Plus } from "./plus-Bf6BfWwF.js";
import { T as Trash2 } from "./trash-2-CwFkXbD4.js";
import "./index-BsMJgQDJ.js";
import "./index-Bct3_tmY.js";
import "./index-L_N3zCbP.js";
import "./Combination-4bkKIxDf.js";
import "./index-c1I6fEgY.js";
import "./useMutation-Bk3bBMzH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode);
const GRADIENT_COVERS = [
  "linear-gradient(135deg, oklch(0.28 0.12 195), oklch(0.18 0.08 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 140), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.3 0.12 80), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 270), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 320), oklch(0.18 0.06 240))",
  "linear-gradient(135deg, oklch(0.28 0.12 30), oklch(0.18 0.06 240))"
];
function CollectionCard({
  collection,
  coverSrc,
  index,
  onDelete
}) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const gradient = GRADIENT_COVERS[index % GRADIENT_COVERS.length];
  const createdDate = new Date(
    Number(collection.createdAt / BigInt(1e6))
  ).toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "collection-card text-left w-full animate-slide-up",
        style: { animationDelay: `${index * 0.06}s` },
        "data-ocid": `collections.item.${index + 1}`,
        onClick: () => navigate({
          to: "/collections/$collectionId",
          params: { collectionId: collection.id }
        }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: coverSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: coverSrc,
              alt: collection.name,
              className: "w-full h-full object-cover transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full", style: { background: gradient } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "collection-card-overlay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "collection-card-label", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate text-foreground leading-tight", children: collection.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: createdDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "font-mono text-xs border-border/60 text-muted-foreground h-5 px-1.5",
                  children: collection.scanIds.length
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `collections.delete_button.${index + 1}`,
                  onClick: (e) => {
                    e.stopPropagation();
                    setConfirmDelete(true);
                  },
                  className: "w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-smooth",
                  "aria-label": `Delete ${collection.name}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                }
              )
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: confirmDelete, onOpenChange: setConfirmDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": `collections.delete_dialog.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Delete Collection?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              '"',
              collection.name,
              '"'
            ] }),
            " ",
            "will be permanently deleted. Your scans won't be affected."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setConfirmDelete(false),
                "data-ocid": `collections.cancel_button.${index + 1}`,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: () => {
                  onDelete(collection.id);
                  setConfirmDelete(false);
                },
                "data-ocid": `collections.confirm_button.${index + 1}`,
                children: "Delete"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function CollectionsPage() {
  const {
    collections,
    isLoading,
    createCollection,
    deleteCollection,
    isCreating
  } = useCollections();
  const { history } = useHistory();
  const [newName, setNewName] = reactExports.useState("");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const handleCreate = () => {
    if (!newName.trim()) return;
    createCollection(newName.trim(), {
      onSuccess: () => {
        setNewName("");
        setDialogOpen(false);
      }
    });
  };
  const getCoverSrc = (col) => {
    for (const scanId of col.scanIds) {
      const scan = history.find((s) => s.id === scanId);
      if (scan == null ? void 0 : scan.imageBase64) {
        return `data:${scan.mimeType};base64,${scan.imageBase64}`;
      }
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-4xl mx-auto px-4 py-8 animate-fade-in",
      "data-ocid": "collections.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Collections" }),
            collections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-border text-muted-foreground",
                children: collections.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setDialogOpen(true),
              className: "gap-1.5",
              "data-ocid": "collections.new_collection_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "New Collection"
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-md" }, k)) }) : collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-12 text-center space-y-4 animate-fade-in",
            "data-ocid": "collections.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-6 h-6 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No collections yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a collection to organize your scans by topic." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => setDialogOpen(true),
                  size: "sm",
                  "data-ocid": "collections.create_first_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                    "Create Collection"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: collections.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CollectionCard,
          {
            collection: col,
            coverSrc: getCoverSrc(col),
            index: i,
            onDelete: deleteCollection
          },
          col.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "collections.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "New Collection" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "collections.name_input",
                placeholder: "Collection name…",
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleCreate();
                },
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "collections.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCreate,
                  disabled: !newName.trim() || isCreating,
                  "data-ocid": "collections.submit_button",
                  children: isCreating ? "Creating…" : "Create"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  CollectionsPage
};
