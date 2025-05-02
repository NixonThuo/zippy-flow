// components/SettingsPanel.tsx
import DeviceSelector from "./DeviceSelector";

const SettingsPanel = () => {
    return (
        <div className="position-absolute top-0 start-0 m-3 p-3 bg-primary text-white border border-primary rounded shadow" style={{ zIndex: 10 }}>
            <h2 className="h5 mb-3">Settings</h2>
            <div className="d-flex flex-column gap-2">
                <DeviceSelector />
            </div>
        </div>
    );
};

export default SettingsPanel;

