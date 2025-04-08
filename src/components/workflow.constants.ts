import { Edge, Node, Position } from "reactflow";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Source' },
        position: { x: 0, y: 0 },
        type: 'SourceDevice'
    },
    {
        id: '2',
        type: 'default', // or another supported type
        data: { label: 'Device' },
        position: { x: 0, y: 0 },
        targetPosition: Position.Left
    },
];
