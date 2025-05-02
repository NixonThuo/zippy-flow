// components/SettingsPanel.tsx
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { DeviceNodeData } from "./Workflow";
import DeviceSelector from "./DeviceSelector";

interface SettingsPanelProps {
  device: DeviceNodeData | null;
}

export default function SettingsPanel({ device }: SettingsPanelProps) {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      m="3"
      p="3"
      bg="blue.500"
      color="white"
      borderRadius="md"
      boxShadow="md"
      zIndex={10}
      minW="200px"
    >
      <Heading size="xs" mb="3">
        Settings
      </Heading>

      {/* Add the device selector dropdown */}
      <Box mb="3">
        <DeviceSelector />
      </Box>

      {device ? (
        <VStack align="start" color="white">
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
        </VStack>
      ) : (
        <Text fontSize="xs" color="gray.200">
          Double-click a device node to view its properties
        </Text>
      )}
    </Box>
  );
}
