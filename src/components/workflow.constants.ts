import { Edge, Node } from "reactflow";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Source" },
    position: { x: 0, y: 0 },
    type: "SourceDevice",
  },
];
