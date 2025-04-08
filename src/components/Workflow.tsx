import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Connection,
    Edge
} from 'reactflow';
import { initialEdges, initialNodes } from "./workflow.constants";
import 'reactflow/dist/style.css';
import SourceDevice from './SourceDevice';

const nodeTypes = {
    SourceDevice: SourceDevice
};


const Workflow: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    console.log(setNodes);

    const onConnect = useCallback(
        (connection: Connection | Edge) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
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
