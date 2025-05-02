import { useEffect, useState, ChangeEvent } from "react";
import { Select } from "@chakra-ui/select";
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

// Define the type for the node data you'll add to React Flow
interface DeviceNodeData {
  partnum: string;
  manid: string;
}

export default function DeviceSelector() {
  const { setNodes } = useReactFlow();
  const [devices, setDevices] = useState<Device[]>([]);

  // Fetch device data from the endpoint on component mount
  useEffect(() => {
    async function fetchDevices() {
      try {
        const response = await fetch(
          "http://195.35.11.199:5588/devices/listdevices"
        ); // Replace with your actual endpoint URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DevicesResponse = await response.json();
        setDevices(data.devices);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      }
    }
    fetchDevices();
  }, []);

  // Updated handler: Accept the change event from the <Select> element
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedDevice = devices.find(
      (device) => device.deviceid === selectedId
    );
    if (selectedDevice) {
      const location = Math.random() * 500;
      setNodes((prevNodes: Node<DeviceNodeData>[]) => [
        ...prevNodes,
        {
          id: uuidv4(), // Generate a unique node id using uuid
          data: {
            partnum: selectedDevice.part_num,
            manid: selectedDevice.manufacture_id,
          },
          type: "ComponentDevice", // Adjust the type as needed
          position: { x: location, y: location },
        },
      ]);
    }
  };

  return (
    <Select placeholder="Add Device" onChange={handleSelectChange} style={{ color: "black" }}>
      {devices.map((device) => (
        <option key={device.deviceid} value={device.deviceid}>
          {device.description}
        </option>
      ))}
    </Select>
  );
}
