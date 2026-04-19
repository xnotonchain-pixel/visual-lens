import { j as jsxRuntimeExports, b as cn, d as useQueryClient, e as createActor } from "./index-BUSSrS1X.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-Bct3_tmY.js";
import { X } from "./button-DIJgVfI1.js";
import { a as useActor, b as useQuery } from "./index-BsMJgQDJ.js";
import { u as useMutation } from "./useMutation-Bk3bBMzH.js";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function useCollections() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const queryClient = useQueryClient();
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserCollections();
    },
    enabled: !!actor && !isActorLoading
  });
  const createCollectionMutation = useMutation({
    mutationFn: async (name) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createCollection(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
  const deleteCollectionMutation = useMutation({
    mutationFn: async (collectionId) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteCollection(collectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
  const addScanMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addScanToCollection(collectionId, scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
  const removeScanMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeFromCollection(collectionId, scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
  const getCollection = async (collectionId) => {
    if (!actor) return null;
    return actor.getCollection(collectionId);
  };
  return {
    collections: collectionsQuery.data ?? [],
    isLoading: collectionsQuery.isLoading || isActorLoading,
    error: collectionsQuery.error,
    createCollection: createCollectionMutation.mutate,
    isCreating: createCollectionMutation.isPending,
    deleteCollection: deleteCollectionMutation.mutate,
    isDeleting: deleteCollectionMutation.isPending,
    addScan: addScanMutation.mutate,
    removeScan: removeScanMutation.mutate,
    getCollection,
    refetch: collectionsQuery.refetch
  };
}
function useCollection(collectionId) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  return useQuery({
    queryKey: ["collection", collectionId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCollection(collectionId);
    },
    enabled: !!actor && !isActorLoading && !!collectionId
  });
}
export {
  Dialog as D,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  useCollection as d,
  useCollections as u
};
