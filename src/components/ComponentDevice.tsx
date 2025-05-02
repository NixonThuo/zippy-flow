import { Flex, IconButton, Text } from "@chakra-ui/react";
import { X } from "react-bootstrap-icons";
import { NodeProps, Position, useReactFlow } from "reactflow";
import CustomHandle from "./CustomHandle";

// Extend NodeProps to accept our isActive flag
interface ComponentDeviceProps extends NodeProps<{  
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
}> {
  isActive: boolean;
}

export default function ComponentDevice({
  data: { part_num, manufacture_id, description },
  id,
  isActive,
}: ComponentDeviceProps) {
  const { setNodes } = useReactFlow();

  return (
    <Flex
      direction="column"
      borderRadius="24px"
      border={isActive ? "2px solid #ff5e5e" : "2px solid #5e5eff"}
      bg="white"
      p={2}
      width="200px"
      position="relative"
      cursor="pointer"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" fontWeight="bold" color="black">
          {part_num} - {manufacture_id}
        </Text>
        <IconButton
          aria-label="Delete Node"
          pointerEvents="all"
          color="red"
          bg="transparent"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setNodes((prev) => prev.filter((node) => node.id !== id));
          }}
        >
          <X />
        </IconButton>
      </Flex>

      <Text fontSize="xs" mt={1} color="gray.600">
        {description}
      </Text>

      {/* Explicit handle IDs to ensure sourceHandle/targetHandle are populated */}
      <CustomHandle id={`target-${id}`} type="target" position={Position.Left} />
      <CustomHandle id={`source-${id}`} type="source" position={Position.Right} />
    </Flex>
  );
}
