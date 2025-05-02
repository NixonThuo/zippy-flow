import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
} from "reactflow";
import { initialEdges, initialNodes } from "./workflow.constants";
import "reactflow/dist/style.css";
import SourceDevice from "./SourceDevice";
import CustomEdge from "./CustomEdge";
import ComponentDevice from "./ComponentDevice";
import SettingsPanel from "./SettingsPanel";

// Define DeviceNodeData for typed node data
export type DeviceNodeData = {
  deviceid: number;
  locationid: number;
  one_line: string;
  three_line: string;
  two_d: string;
  three_d: string;
  part_num: string;
  manufacture_id: string;
  date_added: string;
  description: string;
  devicetype: string | null;
};

const nodeTypes = {
  SourceDevice,
  ComponentDevice,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<DeviceNodeData>>(initialNodes);
  console.log("nodes", setNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedDevice, setSelectedDevice] = useState<DeviceNodeData | null>(
    null
  );

  // Handle connecting edges
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: "customEdge",
      };
      setEdges((prev) => addEdge(edge, prev));
    },
    [edges]
  );

  // When a node is double-clicked, store its data in state
  const onNodeDoubleClick = (
    event: React.MouseEvent,
    node: Node<DeviceNodeData>
  ) => {
    setSelectedDevice(node.data);
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#1e1e1e" }}>
        {/* Pass selectedDevice into SettingsPanel */}
        <SettingsPanel device={selectedDevice} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Workflow;
