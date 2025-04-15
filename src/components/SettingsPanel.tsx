import 'reactflow/dist/style.css';

const SettingsPanel = () => {
    return (
        <div className="p-4 bg-white shadow-md w-64 h-full border-r">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <div className="space-y-2">
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Snap to grid
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" />
                    Show grid
                </label>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Reset Zoom
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
