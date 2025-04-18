import { IconButton } from "@chakra-ui/react";
import { X } from "react-bootstrap-icons";
import {
    BezierEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
} from "reactflow";

export default function CustomEdge(props: EdgeProps) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    } = props;

    const { setEdges } = useReactFlow();

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    console.log(edgePath, labelX, labelY);

    return (
        <>
            <BezierEdge {...props} />
            <EdgeLabelRenderer>
                <IconButton
                    aria-label="Delete Edge"
                    pos="absolute"
                    color="red"
                    transform={`translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`}
                    pointerEvents="all"
                    bg="transparent"
                    size="sm"
                    onClick={() =>
                        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
                    }
                >
                    <X />
                </IconButton>
            </EdgeLabelRenderer>
        </>
    );
}