import { Flex, IconButton, Text } from "@chakra-ui/react";
import { X } from "react-bootstrap-icons";
import { NodeProps, Position, useReactFlow } from "reactflow";
import CustomHandle from "./CustomHandle";


export default function ComponentDevice({
    data: { partnum, manid },
    id,
}: NodeProps<{ partnum: string; manid: string }>) {
    const { setNodes } = useReactFlow();
    console.log("ComponentDevice", partnum, manid, id);
    return (
        <Flex
            borderRadius={"24px"}
            border="2px solid #5e5eff"
            alignItems={"center"}
            bg="white"
            p={1}
            pb={1}
            pl={"12px"}
            gap={2}
            width="140px"
        >
            <Flex grow="1">
                <Text fontSize="small" mt={"-2px"} color="black">
                    {partnum} - {manid}
                </Text>
            </Flex>
            <IconButton
                aria-label="Delete Payment Provider"
                pointerEvents="all"
                color="red"
                bg="transparent"
                size="sm"
                onClick={() =>
                    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
                }
            >
                <X />
            </IconButton>
            <CustomHandle type="target" position={Position.Left} />
            <CustomHandle type="source" position={Position.Right} />
        </Flex>
    );
}