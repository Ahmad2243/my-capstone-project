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

interface DisclosureProps {
  /** Title/label for the disclosure button */
  title: string;
  /** Content to show/hide */
  children: ReactNode;
  /** Whether the disclosure is open by default */
  defaultOpen?: boolean;
  /** Callback when disclosure state changes */
  onChange?: (isOpen: boolean) => void;
  /** Optional CSS class for the container */
  className?: string;
  /** Optional CSS class for the button */
  buttonClassName?: string;
  /** Optional CSS class for the content panel */
  panelClassName?: string;
  /** Optional unique identifier (auto-generated if not provided) */
  id?: string;
}

// ============================================================================
// CUSTOM DISCLOSURE COMPONENT
// ============================================================================

const CustomDisclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  onChange,
  className = '',
  buttonClassName = '',
  panelClassName = '',
  id: providedId,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Generate unique ID if not provided
  const disclosureId = useMemo(() => {
    return providedId || `disclosure-${Math.random().toString(36).substr(2, 9)}`;
  }, [providedId]);

  const panelId = `${disclosureId}-panel`;

  // Handle toggle
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      onChange?.(newState);
      return newState;
    });
  }, [onChange]);

  return (
    <div className={`w-full ${className}`}>
      {/* Disclosure Button */}
      <button
        ref={buttonRef}
        id={disclosureId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
        className={`
          w-full flex items-center justify-between px-5 py-4 text-left
          bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg
          font-medium text-gray-900 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isOpen ? 'bg-blue-50 border-blue-300' : ''}
          ${buttonClassName}
        `}
      >
        <span>{title}</span>
        {/* Chevron Icon */}
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Disclosure Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={disclosureId}
        hidden={!isOpen}
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? 'block' : 'hidden'}
          ${panelClassName}
        `}
      >
        <div className="px-5 py-4 bg-white border border-t-0 border-gray-200 rounded-b-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ACCORDION COMPONENT (Multiple Disclosures)
// ============================================================================

interface AccordionItem {
  /** Unique identifier for the item */
  id: string;
  /** Title for the disclosure button */
  title: string;
  /** Content for the panel */
  content: ReactNode;
  /** Optional flag to disable the item */
  disabled?: boolean;
}

interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Initially open item IDs */
  defaultOpenIds?: string[];
  /** Callback when accordion state changes */
  onChange?: (openIds: string[]) => void;
  /** Optional CSS class for the container */
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  onChange,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const handleItemChange = useCallback(
    (itemId: string, isOpen: boolean) => {
      setOpenIds((prev) => {
        let newState: string[];

        if (allowMultiple) {
          // Allow multiple items to be open
          if (isOpen) {
            newState = [...prev, itemId];
          } else {
            newState = prev.filter((id) => id !== itemId);
          }
        } else {
          // Only one item can be open at a time
          newState = isOpen ? [itemId] : [];
        }

        onChange?.(newState);
        return newState;
      });
    },
    [allowMultiple, onChange]
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <CustomDisclosure
          key={item.id}
          id={item.id}
          title={item.title}
          defaultOpen={defaultOpenIds.includes(item.id)}
          onChange={(isOpen) => handleItemChange(item.id, isOpen)}
          className={item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          buttonClassName={item.disabled ? 'pointer-events-none' : ''}
        >
          {item.content}
        </CustomDisclosure>
      ))}
    </div>
  );
};

// ============================================================================
// DEMO COMPONENT
// ============================================================================

export const DisclosureDemo: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const accordionItems: AccordionItem[] = [
    {
      id: 'what-is',
      title: 'What is an Accessible Disclosure Component?',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            A disclosure (or accordion) component is an interactive element that
            shows and hides content based on user interaction. This implementation
            follows W3C ARIA patterns to ensure:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <strong>Keyboard accessible:</strong> Enter and Space keys toggle
              the disclosure state
            </li>
            <li>
              <strong>Screen reader support:</strong> aria-expanded announces the
              state to assistive technologies
            </li>
            <li>
              <strong>Focus management:</strong> Proper focus indicators and
              keyboard navigation
            </li>
            <li>
              <strong>Semantic HTML:</strong> Uses button element with proper
              ARIA attributes
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Key Features',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-1">ARIA Compliance</h4>
              <p className="text-sm text-blue-700">
                Full W3C ARIA disclosure pattern with aria-expanded and
                aria-controls
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <h4 className="font-semibold text-green-900 mb-1">Keyboard Support</h4>
              <p className="text-sm text-green-700">
                Enter and Space keys work natively on button elements
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-1">Strict TypeScript</h4>
              <p className="text-sm text-purple-700">
                Full type safety with no any types throughout the component
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-1">Tailwind Styled</h4>
              <p className="text-sm text-orange-700">
                Beautiful styling with smooth transitions and animations
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'usage',
      title: 'How to Use',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700 font-mono text-sm">
            &lt;CustomDisclosure title="Section Title"&gt;
            <br />
            &nbsp;&nbsp;Your content here
            <br />
            &lt;/CustomDisclosure&gt;
          </p>
          <p className="text-gray-600 text-sm">
            For multiple related disclosures, use the Accordion component to manage
            open/closed state across multiple items.
          </p>
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Props:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
              <li>
                <code>title</code> - Button label (string)
              </li>
              <li>
                <code>children</code> - Panel content (ReactNode)
              </li>
              <li>
                <code>defaultOpen</code> - Initially open (boolean, default: false)
              </li>
              <li>
                <code>onChange</code> - State change callback (function)
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'interactive',
      title: 'Interactive Example',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Try clicking buttons or using keyboard to interact:
          </p>
          <div className="space-y-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Sample Button
            </button>
            <input
              type="text"
              placeholder="Sample input field..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-block text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Sample Link
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
            Accessible Disclosure Component
          </h1>
          <p className="text-gray-600 mb-2">
            Click on any item to expand/collapse. Use keyboard for navigation.
          </p>
          {expandedItems.length > 0 && (
            <p className="text-blue-600 text-sm mb-6">
              Currently expanded: <strong>{expandedItems.join(', ')}</strong>
            </p>
          )}

          <Accordion
            items={accordionItems}
            allowMultiple={true}
            onChange={setExpandedItems}
            className="mb-8"
          />

          {/* Single Disclosure Example */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Single Disclosure Example
            </h2>
            <CustomDisclosure
              title="Why use disclosure patterns?"
              defaultOpen={false}
            >
              <div className="space-y-3">
                <p className="text-gray-700">
                  Disclosure components are useful for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Reducing cognitive load by hiding non-essential content</li>
                  <li>
                    Creating organized, scannable interfaces for content-heavy pages
                  </li>
                  <li>Improving accessibility with proper ARIA patterns</li>
                  <li>
                    Providing a consistent interaction model across the application
                  </li>
                </ul>
              </div>
            </CustomDisclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDisclosure;
