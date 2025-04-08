import { Position } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomHandle from './CustomHandle';

const SourceDevice = ({ data }: { data: any }) => {
    return (
        <div
            style={{
                background: '#9CA8B3',
                borderRadius: '50%',
                width: 75,
                height: 75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #000',
            }}
        >
            <CustomHandle type="target" position={Position.Bottom} />
            <div style={{ color: '#FFF', textAlign: 'center' }}>{data.label}</div>
            <CustomHandle type="source" position={Position.Right} />
        </div>
    );
};

export default SourceDevice;