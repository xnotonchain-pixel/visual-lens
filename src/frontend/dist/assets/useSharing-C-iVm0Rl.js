import { c as createLucideIcon, e as createActor } from "./index-BUSSrS1X.js";
import { a as useActor, b as useQuery } from "./index-BsMJgQDJ.js";
import { u as useMutation } from "./useMutation-Bk3bBMzH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
const Landmark = createLucideIcon("landmark", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function useSharing() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const createShareTokenMutation = useMutation({
    mutationFn: async (scanId) => {
      if (!actor) throw new Error("Actor not ready");
      const token = await actor.createShareToken(scanId);
      const shareUrl = `${window.location.origin}/shared/${token}`;
      return shareUrl;
    }
  });
  const saveToMyHistoryMutation = useMutation({
    mutationFn: async (sharedToken) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveScanToMyHistory(sharedToken);
    }
  });
  return {
    createShareToken: createShareTokenMutation.mutate,
    createShareTokenAsync: createShareTokenMutation.mutateAsync,
    isCreatingToken: createShareTokenMutation.isPending,
    shareUrl: createShareTokenMutation.data ?? null,
    saveToMyHistory: saveToMyHistoryMutation.mutate,
    isSavingToHistory: saveToMyHistoryMutation.isPending,
    isActorLoading
  };
}
function useSharedScan(token) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  return useQuery({
    queryKey: ["sharedScan", token],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSharedScan(token);
    },
    enabled: !!actor && !isActorLoading && !!token
  });
}
export {
  Languages as L,
  Receipt as R,
  Landmark as a,
  useSharedScan as b,
  useSharing as u
};
