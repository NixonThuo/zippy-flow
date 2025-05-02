import React, { useCallback, useState, useMemo } from "react";
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
  NodeProps,
} from "reactflow";
import { initialEdges, initialNodes } from "./workflow.constants";
import "reactflow/dist/style.css";
import SourceDevice from "./SourceDevice";
import CustomEdge from "./CustomEdge";
import ComponentDevice from "./ComponentDevice";
import SettingsPanel from "./SettingsPanel";
import { Box, Button } from "@chakra-ui/react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

const edgeTypes = {
  customEdge: CustomEdge,
};

const Workflow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<DeviceNodeData>>(initialNodes);
  console.log(setNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedDevice, setSelectedDevice] = useState<DeviceNodeData | null>(
    null
  );
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

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
    [edges, setEdges]
  );

  // When a node is double-clicked, store its data and set active
  const onNodeDoubleClick = (
    event: React.MouseEvent,
    node: Node<DeviceNodeData>
  ) => {
    console.log(event);
    setSelectedDevice(node.data);
    setActiveNodeId(node.id);
  };

  // Handle Excel export
  const handleExport = useCallback(() => {
    const wsNodes = XLSX.utils.json_to_sheet(nodes);
    const wsEdges = XLSX.utils.json_to_sheet(edges);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsNodes, "Nodes");
    XLSX.utils.book_append_sheet(wb, wsEdges, "Edges");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "flow-data.xlsx");
  }, [nodes, edges]);

  // Create nodeTypes with typed props parameter
  const nodeTypes = useMemo(
    () => ({
      SourceDevice,
      ComponentDevice: (props: NodeProps<DeviceNodeData>) => (
        <ComponentDevice {...props} isActive={props.id === activeNodeId} />
      ),
    }),
    [activeNodeId]
  );

  return (
    <ReactFlowProvider>
      <Box position="absolute" top={4} right={4} zIndex={20}>
        <Button
          size="sm"
          bg="gray.500"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={handleExport}
        >
          Export to Excel
        </Button>
      </Box>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#1e1e1e" }}
      >
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
