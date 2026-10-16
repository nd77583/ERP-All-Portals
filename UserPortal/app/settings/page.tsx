export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure application preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <input
                type="text"
                defaultValue="State Sports Academy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="admin@sportportal.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                defaultValue="https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <CheckboxOption
              label="Email notifications for events"
              defaultChecked={true}
            />
            <CheckboxOption
              label="SMS alerts for important updates"
              defaultChecked={true}
            />
            <CheckboxOption
              label="Send reports via email"
              defaultChecked={false}
            />
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            User Management
          </h2>
          <div className="mb-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + Add User
            </button>
          </div>
          <div className="space-y-2">
            <UserRow name="Admin User" email="admin@sportportal.com" role="Admin" />
            <UserRow
              name="Coach Manager"
              email="coach@sportportal.com"
              role="Manager"
            />
            <UserRow
              name="Student Coordinator"
              email="coordinator@sportportal.com"
              role="Coordinator"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-lg shadow p-6 border border-red-200">
          <h2 className="text-lg font-semibold text-red-900 mb-4">
            Danger Zone
          </h2>
          <p className="text-sm text-red-700 mb-4">
            Irreversible actions. Proceed with caution.
          </p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Export Data
          </button>
          <button className="ml-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
            Clear Cache
          </button>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckboxOption({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      <label className="ml-3 text-sm text-gray-700">{label}</label>
    </div>
  );
}

function UserRow({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-600">{email}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {role}
        </span>
        <button className="text-red-600 hover:text-red-800 text-sm">
          Remove
        </button>
      </div>
    </div>
  );
}
