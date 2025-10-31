import type { Meta, StoryObj } from '@storybook/react-vite';

import { Home, Settings, User, Users, FileText, Folder } from 'lucide-react';
import { useState } from 'react';

import { Sidebar } from '../components/Sidebar';

const meta = {
  title: 'Example/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    onOpenChange: () => {},
    children: null,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Render a sidebar with 1-level menu items
 */
export const OneLevelMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="p-8">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Open Sidebar
          </button>
        </div>

        <Sidebar open={open} onOpenChange={setOpen}>
          <Sidebar.Header>
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Home className="mr-3 h-5 w-5" />
                Home
              </Sidebar.MenuItem>
              <Sidebar.MenuItem active>
                <Users className="mr-3 h-5 w-5" />
                Users
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <FileText className="mr-3 h-5 w-5" />
                Documents
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>

          <Sidebar.Footer>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};

/**
 * Render a sidebar with 2-level nested menu items
 */
export const TwoLevelMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="p-8">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Open Sidebar
          </button>
        </div>

        <Sidebar open={open} onOpenChange={setOpen}>
          <Sidebar.Header>
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem active>
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Sidebar.MenuItem>

              <Sidebar.MenuItem>
                <User className="mr-3 h-5 w-5" />
                Users
              </Sidebar.MenuItem>

              <Sidebar.SubMenu>
                <Sidebar.SubMenuItem id="general" label="General Settings">
                  <Sidebar.SubMenuItem id="profile" label="Profile Settings" />
                  <Sidebar.SubMenuItem id="account" label="Account Settings" />
                </Sidebar.SubMenuItem>
                <Sidebar.SubMenuItem id="security" label="Security">
                  <Sidebar.SubMenuItem id="passwords" label="Passwords" />
                  <Sidebar.SubMenuItem id="twofa" label="Two-Factor Auth" />
                </Sidebar.SubMenuItem>
              </Sidebar.SubMenu>

              <Sidebar.MenuItem>
                <Folder className="mr-3 h-5 w-5" />
                Files
              </Sidebar.MenuItem>

              <Sidebar.SubMenu>
                <Sidebar.SubMenuItem id="sales" label="Sales Reports" />
                <Sidebar.SubMenuItem id="analytics" label="Analytics" />
                <Sidebar.SubMenuItem id="financial" label="Financial Reports" />
              </Sidebar.SubMenu>
            </Sidebar.Menu>
          </Sidebar.Content>

          <Sidebar.Footer>
            <div className="text-xs text-gray-500 text-center">
              <p>Version 1.0.0</p>
              <p className="mt-1">© 2024 Company</p>
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};

/**
 * Sidebar in closed state
 */
export const ClosedState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="p-8">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {open ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
        </div>

        <Sidebar open={open} onOpenChange={setOpen}>
          <Sidebar.Header>
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Home className="mr-3 h-5 w-5" />
                Home
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Users className="mr-3 h-5 w-5" />
                Users
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <FileText className="mr-3 h-5 w-5" />
                Documents
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>

          <Sidebar.Footer>
            <p className="text-sm text-gray-600">Footer content</p>
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};

/**
 * Sidebar with custom width
 */
export const CustomWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="p-8">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {open ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
        </div>

        <Sidebar open={open} onOpenChange={setOpen} width={400}>
          <Sidebar.Header>
            <h2 className="text-lg font-semibold text-gray-900">
              Wide Sidebar
            </h2>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <div className="flex items-center w-full">
                  <Home className="mr-3 h-5 w-5" />
                  <span>This is a wider sidebar for more content</span>
                </div>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem active>
                <div className="flex items-center w-full">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings with more space</span>
                </div>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>

          <Sidebar.Footer>
            <p className="text-sm text-gray-600">Custom width: 400px</p>
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};

/**
 * Sidebar with 3 levels of nesting
 */
export const ThreeLevelNesting: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="p-8">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {open ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
        </div>

        <Sidebar open={open} onOpenChange={setOpen}>
          <Sidebar.Header>
            <h2 className="text-lg font-semibold text-gray-900">
              Advanced Navigation
            </h2>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem active>
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Sidebar.MenuItem>

              <Sidebar.MenuItem>
                <User className="mr-3 h-5 w-5" />
                Profile
              </Sidebar.MenuItem>

              <Sidebar.SubMenu>
                <Sidebar.SubMenuItem id="products" label="Products">
                  <Sidebar.SubMenuItem id="electronics" label="Electronics">
                    <Sidebar.SubMenuItem id="phones" label="Smartphones" />
                    <Sidebar.SubMenuItem id="laptops" label="Laptops" />
                    <Sidebar.SubMenuItem id="tablets" label="Tablets" />
                  </Sidebar.SubMenuItem>
                  <Sidebar.SubMenuItem id="home" label="Home & Garden">
                    <Sidebar.SubMenuItem id="furniture" label="Furniture" />
                    <Sidebar.SubMenuItem id="appliances" label="Appliances" />
                  </Sidebar.SubMenuItem>
                  <Sidebar.SubMenuItem id="sports" label="Sports & Outdoors" />
                </Sidebar.SubMenuItem>
              </Sidebar.SubMenu>

              <Sidebar.SubMenu>
                <Sidebar.SubMenuItem id="services" label="Services">
                  <Sidebar.SubMenuItem id="design" label="Design">
                    <Sidebar.SubMenuItem id="web-design" label="Web Design" />
                    <Sidebar.SubMenuItem
                      id="graphic-design"
                      label="Graphic Design"
                    />
                    <Sidebar.SubMenuItem id="ui-ux" label="UI/UX Design" />
                  </Sidebar.SubMenuItem>
                  <Sidebar.SubMenuItem id="development" label="Development">
                    <Sidebar.SubMenuItem id="frontend" label="Frontend" />
                    <Sidebar.SubMenuItem id="backend" label="Backend" />
                  </Sidebar.SubMenuItem>
                </Sidebar.SubMenuItem>
              </Sidebar.SubMenu>

              <Sidebar.SubMenu>
                <Sidebar.SubMenuItem id="settings" label="Settings">
                  <Sidebar.SubMenuItem id="account-settings" label="Account">
                    <Sidebar.SubMenuItem
                      id="profile-settings"
                      label="Profile"
                    />
                    <Sidebar.SubMenuItem id="preferences" label="Preferences" />
                  </Sidebar.SubMenuItem>
                  <Sidebar.SubMenuItem id="security-settings" label="Security">
                    <Sidebar.SubMenuItem id="password" label="Password" />
                    <Sidebar.SubMenuItem
                      id="two-factor"
                      label="Two-Factor Auth"
                    />
                    <Sidebar.SubMenuItem
                      id="sessions"
                      label="Active Sessions"
                    />
                  </Sidebar.SubMenuItem>
                </Sidebar.SubMenuItem>
              </Sidebar.SubMenu>

              <Sidebar.MenuItem>
                <Folder className="mr-3 h-5 w-5" />
                Files
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>

          <Sidebar.Footer>
            <div className="text-xs text-gray-500 text-center">
              <p>3-Level Nested Menu</p>
              <p className="mt-1">© 2024 Company</p>
            </div>
          </Sidebar.Footer>
        </Sidebar>
      </div>
    );
  },
};
