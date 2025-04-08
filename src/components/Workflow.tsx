import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Connection
} from 'reactflow';
import { initialEdges, initialNodes } from "./workflow.constants";
import 'reactflow/dist/style.css';
import SourceDevice from './SourceDevice';
import CustomEdge from './CustomEdge';
import ComponentDevice from './ComponentDevice';
import DeviceSelector from './DeviceSelector';

const nodeTypes = {
    SourceDevice: SourceDevice,
    ComponentDevice: ComponentDevice,
    DeviceSelector: DeviceSelector
};


const edgeTypes = {
    customEdge: CustomEdge,
};


const Workflow: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    console.log(setNodes);

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = {
                ...connection,
                animated: true,
                id: `${edges.length} + 1`,
                type: "customEdge",
            };
            setEdges((prevEdges) => addEdge(edge, prevEdges));
        },
        [edges]
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Workflow;
