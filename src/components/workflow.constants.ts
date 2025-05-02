import { Edge, Node } from "reactflow";

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
        data: { partnum: 'test', manid: '123' },
        position: { x: 0, y: 500 },
        type: 'ComponentDevice'
    }
];
