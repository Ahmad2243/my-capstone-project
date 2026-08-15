'use client';

import React, {
  ReactNode,
  useCallback,
  useRef,
  useState,
  useMemo,
} from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Content to display in the tab panel */
  content: ReactNode;
  /** Optional CSS class for tab button */
  tabClassName?: string;
  /** Optional CSS class for panel */
  panelClassName?: string;
  /** Optional flag to disable the tab */
  disabled?: boolean;
}

interface CustomTabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Index of the initially active tab (default: 0) */
  defaultTabIndex?: number;
  /** Callback when active tab changes */
  onChange?: (tabIndex: number, tabId: string) => void;
  /** Optional CSS class for the tablist container */
  tablistClassName?: string;
  /** Optional CSS class for the tab button */
  tabButtonClassName?: string;
  /** Optional CSS class for the tab panel */
  tabPanelClassName?: string;
  /** Optional CSS class for the tabs wrapper */
  className?: string;
}

// ============================================================================
// CUSTOM TABS COMPONENT
// ============================================================================

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultTabIndex = 0,
  onChange,
  tablistClassName = '',
  tabButtonClassName = '',
  tabPanelClassName = '',
  className = '',
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(
    Math.min(defaultTabIndex, tabs.length - 1)
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Generate unique IDs for tab controls and panels
  const tabIds = useMemo(() => {
    return tabs.map(
      (tab) =>
        tab.id || `tab-${Math.random().toString(36).substr(2, 9)}`
    );
  }, [tabs]);

  const panelIds = useMemo(() => {
    return tabIds.map((id) => `${id}-panel`);
  }, [tabIds]);

  // Handle tab click
  const handleTabClick = useCallback(
    (index: number) => {
      if (tabs[index]?.disabled) return;

      setActiveTabIndex(index);
      onChange?.(index, tabIds[index]);

      // Focus the clicked tab
      tabRefs.current[index]?.focus();
    },
    [tabs, onChange, tabIds]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let newIndex = index;
      let shouldFocus = false;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          // Move to previous enabled tab
          newIndex = index - 1;
          while (newIndex >= 0 && tabs[newIndex]?.disabled) {
            newIndex--;
          }
          if (newIndex >= 0) {
            shouldFocus = true;
          }
          break;

        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          // Move to next enabled tab
          newIndex = index + 1;
          while (newIndex < tabs.length && tabs[newIndex]?.disabled) {
            newIndex++;
          }
          if (newIndex < tabs.length) {
            shouldFocus = true;
          }
          break;

        case 'Home':
          e.preventDefault();
          // Move to first enabled tab
          newIndex = 0;
          while (newIndex < tabs.length && tabs[newIndex]?.disabled) {
            newIndex++;
          }
          if (newIndex < tabs.length) {
            shouldFocus = true;
          }
          break;

        case 'End':
          e.preventDefault();
          // Move to last enabled tab
          newIndex = tabs.length - 1;
          while (newIndex >= 0 && tabs[newIndex]?.disabled) {
            newIndex--;
          }
          if (newIndex >= 0) {
            shouldFocus = true;
          }
          break;

        default:
          return;
      }

      if (shouldFocus && newIndex !== index) {
        setActiveTabIndex(newIndex);
        onChange?.(newIndex, tabIds[newIndex]);
        tabRefs.current[newIndex]?.focus();
      }
    },
    [tabs, onChange, tabIds]
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Tablist Container */}
      <div
        role="tablist"
        className={`flex border-b border-gray-200 ${tablistClassName}`}
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeTabIndex === index}
            aria-controls={panelIds[index]}
            tabIndex={activeTabIndex === index ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              relative px-6 py-3 font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                activeTabIndex === index
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }
              ${
                tab.disabled
                  ? 'opacity-50 cursor-not-allowed text-gray-400'
                  : 'cursor-pointer hover:bg-gray-50'
              }
              ${tabButtonClassName}
              ${tab.tabClassName || ''}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className={`mt-4 ${tabPanelClassName}`}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id || index}
            role="tabpanel"
            id={panelIds[index]}
            aria-labelledby={tabIds[index]}
            tabIndex={0}
            hidden={activeTabIndex !== index}
            className={`
              focus:outline-none
              ${activeTabIndex === index ? 'block' : 'hidden'}
              ${tab.panelClassName || ''}
            `}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// DEMO TABS COMPONENT
// ============================================================================

export const TabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const tabItems: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Overview Tab
          </h3>
          <p className="text-gray-700">
            This is a fully accessible Tabs component with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>W3C ARIA tab pattern compliance</li>
            <li>Keyboard navigation (Arrow keys, Home, End)</li>
            <li>Strict TypeScript typing</li>
            <li>Focus management with tabIndex</li>
            <li>Tailwind CSS styling</li>
            <li>Disabled tab support</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'features',
      label: 'Features',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">ARIA Compliance</h4>
              <p className="text-sm text-blue-700">
                Full W3C ARIA tab pattern implementation with proper roles and attributes.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Keyboard Support</h4>
              <p className="text-sm text-green-700">
                Arrow keys, Home, and End key navigation for efficient tab switching.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">TypeScript</h4>
              <p className="text-sm text-purple-700">
                Strict typing for all props and tab items without any type.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">Tailwind Styled</h4>
              <p className="text-sm text-orange-700">
                Beautiful styling with Tailwind CSS and customizable classes.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'keyboard',
      label: 'Keyboard Navigation',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Keyboard Shortcuts
          </h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex gap-4">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded font-mono text-sm font-semibold">
                ←
              </kbd>
              <span className="text-gray-700">Previous Tab</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded font-mono text-sm font-semibold">
                →
              </kbd>
              <span className="text-gray-700">Next Tab</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded font-mono text-sm font-semibold">
                Home
              </kbd>
              <span className="text-gray-700">First Tab</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-3 py-1 bg-white border border-gray-300 rounded font-mono text-sm font-semibold">
                End
              </kbd>
              <span className="text-gray-700">Last Tab</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Try using your keyboard to navigate between tabs. Use Arrow keys to move between tabs, Home to jump to the first tab, and End to jump to the last tab.
          </p>
        </div>
      ),
    },
    {
      id: 'interactive',
      label: 'Interactive',
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Interactive Elements</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Type something here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Click Me
            </button>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Focusable Link
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Accessible Tabs Component
          </h1>
          <p className="text-gray-600 mb-6">
            Navigate between tabs using arrow keys, Home, and End keys.
            {activeTab && <span className="block mt-2 text-blue-600">Currently viewing: <strong>{activeTab}</strong></span>}
          </p>

          <CustomTabs
            tabs={tabItems}
            defaultTabIndex={0}
            onChange={(index, tabId) => setActiveTab(tabId)}
            tablistClassName="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
