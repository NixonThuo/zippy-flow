import { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { DeviceNodeData } from "./Workflow";

interface SettingsPanelProps {
  device: DeviceNodeData | null;
}

export default function SettingsPanel({ device }: SettingsPanelProps) {
  const [minimized, setMinimized] = useState(false);
  const toggleMinimize = () => setMinimized((prev) => !prev);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      m={3}
      p={3}
      bg="gray.500"
      color="white"
      _hover={{ bg: "gray.600" }}
      borderRadius="md"
      boxShadow="md"
      zIndex={10}
      minW="200px"
    >
      <Flex justify="space-between" align="center">
        <Text as="h4" fontSize="2s" fontWeight="bold">
          Device Details
        </Text>
      </Flex>

      <Box
        mt={2}
        overflow="hidden"
        transition="max-height 0.2s ease"
        maxH={minimized ? "0" : "500px"}
      >
        {device ? (
          <Flex direction="column" align="flex-start" gap={1}>
            <Text fontSize="xs">
              <strong>ID:</strong> {device.deviceid}
            </Text>
            <Text fontSize="xs">
              <strong>Location:</strong> {device.locationid}
            </Text>
            <Text fontSize="xs">
              <strong>Part #:</strong> {device.part_num}
            </Text>
            <Text fontSize="xs">
              <strong>Mfr:</strong> {device.manufacture_id}
            </Text>
            <Text fontSize="xs">
              <strong>Description:</strong> {device.description}
            </Text>
            <Text fontSize="xs">
              <strong>2D:</strong> {device.two_d}
            </Text>
            <Text fontSize="xs">
              <strong>3D:</strong> {device.three_d}
            </Text>
            <Text fontSize="xs">
              <strong>1-Line:</strong> {device.one_line}
            </Text>
            <Text fontSize="xs">
              <strong>3-Line:</strong> {device.three_line}
            </Text>
            <Text fontSize="xs">
              <strong>Type:</strong> {device.devicetype ?? "N/A"}
            </Text>
            <Text fontSize="xs">
              <strong>Date Added:</strong>{" "}
              {new Date(device.date_added).toLocaleString()}
            </Text>
          </Flex>
        ) : (
          <Text fontSize="xs" color="gray.200">
            Double-click a device node to view its properties
          </Text>
        )}
      </Box>
      <Text
        fontSize="xs"
        cursor="pointer"
        onClick={toggleMinimize}
        _hover={{ textDecoration: "underline" }}
      >
        {minimized ? "Show Details" : "Hide Details"}
      </Text>
    </Box>
  );
}
