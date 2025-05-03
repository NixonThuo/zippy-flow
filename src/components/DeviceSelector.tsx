import { useEffect, useState, ChangeEvent } from "react";
import { Select } from "@chakra-ui/select";
import { Button, Box, Flex } from "@chakra-ui/react";
import { useReactFlow, Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

// Define an interface matching your device JSON data structure
interface Device {
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
}

// Define an interface for the API response
interface DevicesResponse {
  devices: Device[];
}

export default function DeviceSelector() {
  const { setNodes } = useReactFlow();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");

  // Fetch devices on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "http://195.35.11.199:5588/devices/listdevices"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: DevicesResponse = await res.json();
        setDevices(data.devices);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    })();
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value ? parseInt(e.target.value, 10) : "");
  };

  const handleAddClick = () => {
    if (selectedId === "") return;
    const device = devices.find((d) => d.deviceid === selectedId);
    if (!device) return;
    setNodes((prev: Node<Device>[]) => [
      ...prev,
      {
        id: uuidv4(),
        data: device,
        type: "ComponentDevice",
        position: { x: 0, y: 0 },
      },
    ]);
    setSelectedId("");
  };

  return (
    <Box
      bg="rgba(30,30,30,0.9)"
      color="white"
      p={4}
      borderRadius="lg"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.700"
    >
      <Flex align="center">
        <Select
          placeholder="Select a Device"
          value={selectedId === "" ? undefined : selectedId}
          onChange={handleSelectChange}
          bg="gray.700"
          color="black"
          _placeholder={{ color: "gray.400" }}
          focusBorderColor="teal.300"
          variant="filled"
          flex="1"
          mr={3}
        >
          {devices.map((device) => (
            <option key={device.deviceid} value={device.deviceid}>
              {device.description}
            </option>
          ))}
        </Select>
        <Button
          onClick={handleAddClick}
          size="sm"
          bg="gray.500"
          color="white"
          _hover={{ bg: "gray.600" }}
        >
          Add
        </Button>
      </Flex>
    </Box>
  );
}
