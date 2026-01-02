import React from 'react';
import { PSCard } from './PSCard';
import { PSButton } from './PSButton';
import { PSStatusBadge } from './PSStatusBadge';
import { PSAlert } from './PSAlert';
import { PSProgressBar } from './PSProgressBar';
import { PSConnectionStatus } from './PSConnectionStatus';
import { Download, Save, Trash2, Settings } from 'lucide-react';

/**
 * PSShowcase - Component untuk menampilkan semua variants dan states
 * Berguna untuk development dan testing
 */
export function PSShowcase() {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Connection Status */}
      <PSCard borderColor="info">
        <div className="p-6">
          <h2 className="text-xl mb-4">Connection Status</h2>
          <div className="flex flex-wrap gap-6">
            <PSConnectionStatus isConnected={true} />
            <PSConnectionStatus isConnected={false} />
            <PSConnectionStatus isConnected={true} label="Server Online" />
          </div>
        </div>
      </PSCard>

      {/* Status Badges */}
      <PSCard borderColor="primary">
        <div className="p-6">
          <h2 className="text-xl mb-4">Status Badges</h2>
          <div className="flex flex-wrap gap-4">
            <PSStatusBadge status="on" size="sm" />
            <PSStatusBadge status="on" size="md" pulse />
            <PSStatusBadge status="on" size="lg" />
            <PSStatusBadge status="off" size="md" />
            <PSStatusBadge status="warning" size="md" />
            <PSStatusBadge status="error" size="md" />
            <PSStatusBadge status="info" size="md" />
          </div>
        </div>
      </PSCard>

      {/* Progress Bars */}
      <PSCard borderColor="success">
        <div className="p-6">
          <h2 className="text-xl mb-4">Progress Bars</h2>
          <div className="space-y-4">
            <PSProgressBar value={75} label="Primary" color="primary" />
            <PSProgressBar value={60} label="Success" color="success" />
            <PSProgressBar value={45} label="Warning" color="warning" />
            <PSProgressBar value={30} label="Error" color="error" />
            <PSProgressBar value={85} label="Accent" color="accent" animated />
            <PSProgressBar value={100} label="Complete" color="success" size="lg" />
          </div>
        </div>
      </PSCard>

      {/* Buttons - Variants */}
      <PSCard borderColor="accent">
        <div className="p-6">
          <h2 className="text-xl mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-3">
            <PSButton variant="primary">Primary</PSButton>
            <PSButton variant="secondary">Secondary</PSButton>
            <PSButton variant="success">Success</PSButton>
            <PSButton variant="error">Error</PSButton>
            <PSButton variant="warning">Warning</PSButton>
          </div>
        </div>
      </PSCard>

      {/* Buttons - Sizes */}
      <PSCard borderColor="success">
        <div className="p-6">
          <h2 className="text-xl mb-4">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            <PSButton size="sm">Small</PSButton>
            <PSButton size="md">Medium</PSButton>
            <PSButton size="lg">Large</PSButton>
          </div>
        </div>
      </PSCard>

      {/* Buttons - With Icons */}
      <PSCard borderColor="info">
        <div className="p-6">
          <h2 className="text-xl mb-4">Buttons with Icons</h2>
          <div className="flex flex-wrap gap-3">
            <PSButton icon={Download} iconPosition="left">
              Download
            </PSButton>
            <PSButton icon={Save} iconPosition="right" variant="success">
              Save
            </PSButton>
            <PSButton icon={Settings} variant="secondary">
              Settings
            </PSButton>
            <PSButton icon={Trash2} variant="error">
              Delete
            </PSButton>
          </div>
        </div>
      </PSCard>

      {/* Buttons - States */}
      <PSCard borderColor="warning">
        <div className="p-6">
          <h2 className="text-xl mb-4">Button States</h2>
          <div className="flex flex-wrap gap-3">
            <PSButton>Normal</PSButton>
            <PSButton loading>Loading</PSButton>
            <PSButton disabled>Disabled</PSButton>
            <PSButton fullWidth>Full Width</PSButton>
          </div>
        </div>
      </PSCard>

      {/* Alerts */}
      <PSCard borderColor="error">
        <div className="p-6">
          <h2 className="text-xl mb-4">Alerts</h2>
          <div className="space-y-4">
            <PSAlert
              type="info"
              title="Information"
              message="This is an informational message."
            />
            <PSAlert
              type="success"
              title="Success"
              message="Operation completed successfully."
            />
            <PSAlert
              type="warning"
              title="Warning"
              message="Please review before proceeding."
              dismissible
              onDismiss={() => {}}
            />
            <PSAlert
              type="error"
              title="Error"
              message="An error occurred. Please try again."
              dismissible
              onDismiss={() => {}}
            />
          </div>
        </div>
      </PSCard>

      {/* Cards with Different Border Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PSCard borderColor="primary">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Primary Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Blue border card
            </p>
          </div>
        </PSCard>
        <PSCard borderColor="accent">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Accent Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Yellow border card
            </p>
          </div>
        </PSCard>
        <PSCard borderColor="success">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Success Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Green border card
            </p>
          </div>
        </PSCard>
        <PSCard borderColor="error">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Error Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Red border card
            </p>
          </div>
        </PSCard>
        <PSCard borderColor="warning">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Warning Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Orange border card
            </p>
          </div>
        </PSCard>
        <PSCard borderColor="info">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Info Border</h3>
            <p className="text-sm text-[var(--ps-text-secondary)]">
              Light blue border card
            </p>
          </div>
        </PSCard>
      </div>
    </div>
  );
}