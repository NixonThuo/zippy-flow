import { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { X } from "react-bootstrap-icons";
import { NodeProps, Position, useReactFlow } from "reactflow";
import CustomHandle from "./CustomHandle";

export default function ComponentDevice({
  data: {
    deviceid,
    locationid,
    one_line,
    three_line,
    two_d,
    three_d,
    part_num,
    manufacture_id,
    date_added,
    description,
    devicetype,
  },
  id,
}: NodeProps<{
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
}>) {
  const { setNodes } = useReactFlow();
  const [selected, setSelected] = useState(false);
  console.log("ComponentDevice rendered", {
    deviceid,
    locationid,
    one_line,
    three_line,
    two_d,
    three_d,
    part_num,
    manufacture_id,
    date_added,
    description,
    devicetype,
  });
  return (
    <Flex
      direction="column"
      borderRadius="24px"
      border={selected ? "2px solid #ff5e5e" : "2px solid #5e5eff"}
      bg="white"
      p={2}
      width="200px"
      position="relative"
      onDoubleClick={() => setSelected((prev) => !prev)} // Toggle on click
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
            e.stopPropagation(); // prevent parent click
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
          }}
        >
          <X />
        </IconButton>
      </Flex>
      <Text fontSize="xs" mt={1} color="gray.600">
        {description}
      </Text>

      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </Flex>
  );
}
