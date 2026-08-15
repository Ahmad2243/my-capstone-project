'use client';

import React, {
  ReactNode,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to handle close action */
  onClose: () => void;
  /** Title of the modal (used for aria-labelledby) */
  title: string;
  /** Optional description for aria-describedby */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Optional CSS class for styling */
  className?: string;
  /** Optional overlay CSS class */
  overlayClassName?: string;
  /** Optional callback when modal opens */
  onOpen?: () => void;
}

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// CUSTOM MODAL COMPONENT
// ============================================================================

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
  overlayClassName = '',
  onOpen,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  // Get all focusable elements within the modal
  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    );
  }, []);

  // Trap focus within modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !dialogRef.current) return;

      // Handle Escape key to close modal
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Handle Tab key for focus trapping
      if (e.key === 'Tab') {
        focusableElementsRef.current = getFocusableElements();

        if (focusableElementsRef.current.length === 0) {
          e.preventDefault();
          return;
        }

        const activeElement = document.activeElement as HTMLElement;
        const firstFocusable = focusableElementsRef.current[0];
        const lastFocusable =
          focusableElementsRef.current[
            focusableElementsRef.current.length - 1
          ];

        // Shift + Tab on first element - move to last
        if (e.shiftKey && activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
        // Tab on last element - move to first
        else if (!e.shiftKey && activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    },
    [isOpen, onClose, getFocusableElements]
  );

  // Handle close and restore focus
  const handleClose = useCallback(() => {
    onClose();
    // Restore focus to the triggering element
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [onClose]);

  // Setup event listeners and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store reference to trigger element
    triggerRef.current = document.activeElement as HTMLElement;

    // Get focusable elements and set initial focus
    focusableElementsRef.current = getFocusableElements();
    if (focusableElementsRef.current.length > 0) {
      focusableElementsRef.current[0].focus();
    }

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    if (onOpen) {
      onOpen();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, getFocusableElements, onOpen]);

  if (!isOpen) return null;

  const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = `modal-description-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${overlayClassName}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2
            id={titleId}
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4">
          {description && (
            <p id={descriptionId} className="mb-4 text-sm text-gray-600">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Modal Footer with Close Button */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={handleClose}
            className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

// ============================================================================
// DEMO MODAL COMPONENT
// ============================================================================

interface DemoContentProps {
  onClose: () => void;
}

const DemoModalContent: React.FC<DemoContentProps> = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        This is a fully accessible modal dialog component built from scratch with:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>W3C ARIA pattern compliance</li>
        <li>Focus trapping (Tab/Shift+Tab)</li>
        <li>Escape key to close</li>
        <li>Focus restoration on close</li>
        <li>Strict TypeScript typing</li>
        <li>Tailwind CSS styling</li>
      </ul>
      <p className="text-sm text-gray-500 pt-4">
        Try pressing Tab to navigate, Shift+Tab to go back, or Escape to close.
      </p>
      <div className="space-y-2 pt-4">
        <p className="text-sm font-medium text-gray-700">Interactive Elements:</p>
        <button
          onClick={() => alert('Button 1 clicked!')}
          className="block w-full rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Button 1
        </button>
        <button
          onClick={() => alert('Button 2 clicked!')}
          className="block w-full rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Button 2
        </button>
        <input
          type="text"
          placeholder="Type something here..."
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('Link clicked!');
          }}
          className="inline-block rounded-md text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-2 py-1"
        >
          Focusable Link
        </a>
      </div>
    </div>
  );
};

export const ModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <button
          onClick={handleOpen}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Open Accessible Modal
        </button>

        <CustomModal
          isOpen={isOpen}
          onClose={handleClose}
          title="Accessible Modal Dialog"
          description="A fully accessible modal component with focus trapping and keyboard navigation."
          onOpen={() => console.log('Modal opened')}
        >
          <DemoModalContent onClose={handleClose} />
        </CustomModal>
      </div>
    </div>
  );
};

export default CustomModal;
