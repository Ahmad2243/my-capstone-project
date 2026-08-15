'use client';

import React, { useState } from 'react';
import CustomModal from '@/components/playground/CustomModal';
import CustomTabs from '@/components/playground/CustomTabs';
import CustomDisclosure from '@/components/playground/CustomDisclosure';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function PlaygroundPage() {
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [shadcnDialogOpen, setShadcnDialogOpen] = useState(false);

  // Custom Tabs Data
  const customTabsData = [
    {
      id: 'custom-tab-1',
      label: 'Custom Tab 1',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Custom Built From Scratch</h3>
          <p className="text-gray-600">
            This tab component was built from scratch with full W3C ARIA compliance,
            focus trapping, and keyboard navigation using Arrow keys, Home, and End.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Interactive Button
          </button>
        </div>
      ),
    },
    {
      id: 'custom-tab-2',
      label: 'Custom Tab 2',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Keyboard Navigation</h3>
          <p className="text-gray-600">
            Try using your keyboard:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
            <li>Arrow Left/Right to switch tabs</li>
            <li>Home to go to first tab</li>
            <li>End to go to last tab</li>
            <li>Tab to focus elements within the tab</li>
          </ul>
          <input
            type="text"
            placeholder="Test keyboard focus here..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ),
    },
    {
      id: 'custom-tab-3',
      label: 'Custom Tab 3',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">ARIA Compliance</h3>
          <p className="text-gray-600">
            This component includes proper ARIA attributes for screen readers:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
            <li>role="tablist" on container</li>
            <li>role="tab" with aria-selected and aria-controls</li>
            <li>role="tabpanel" with aria-labelledby</li>
            <li>Proper tabIndex management</li>
          </ul>
        </div>
      ),
    },
  ];

  // shadcn Tabs Data
  const shadcnTabsData = [
    {
      id: 'shadcn-tab-1',
      label: 'shadcn Tab 1',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">shadcn/ui Components</h3>
          <p className="text-gray-600">
            This tab component is from shadcn/ui, a collection of beautiful,
            accessible components built on Radix UI primitives.
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            shadcn Button
          </button>
        </div>
      ),
    },
    {
      id: 'shadcn-tab-2',
      label: 'shadcn Tab 2',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Built on Radix UI</h3>
          <p className="text-gray-600">
            shadcn/ui components are built on top of Radix UI, which provides
            excellent accessibility primitives and keyboard navigation out of the box.
          </p>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      ),
    },
    {
      id: 'shadcn-tab-3',
      label: 'shadcn Tab 3',
      content: (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Production Ready</h3>
          <p className="text-gray-600">
            shadcn/ui components are fully featured and production-ready,
            with comprehensive documentation and active community support.
          </p>
        </div>
      ),
    },
  ];

  const disclosureItems = [
    {
      id: 'comp-custom',
      title: 'When to use Custom Components',
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            Custom components built from scratch are beneficial when:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>You need to understand exactly how accessibility works</li>
            <li>You want to minimize bundle size with no external dependencies</li>
            <li>You need a highly customized interaction pattern</li>
            <li>You're building educational content about ARIA patterns</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'comp-shadcn',
      title: 'When to use shadcn/ui Components',
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            shadcn/ui components are ideal when:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>You need production-ready, battle-tested components</li>
            <li>You want consistent styling across your application</li>
            <li>You prefer leveraging Radix UI's proven accessibility</li>
            <li>You want a large library of pre-built components</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Accessibility Playground
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Compare custom-built ARIA components with shadcn/ui reference implementations.
            Test keyboard navigation and accessibility features on this page.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ====================================================================== */}
        {/* CUSTOM ARIA COMPONENTS SECTION */}
        {/* ====================================================================== */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎨 Custom ARIA Components (From Scratch)
            </h2>
            <p className="text-gray-600">
              These components are built from scratch with strict TypeScript and full
              W3C ARIA pattern compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Custom Modal */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span> Custom Modal Dialog
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Features: Focus trapping, Escape to close, ARIA attributes
              </p>
              <button
                onClick={() => setCustomModalOpen(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Open Custom Modal
              </button>

              <CustomModal
                isOpen={customModalOpen}
                onClose={() => setCustomModalOpen(false)}
                title="Custom Modal Dialog"
                description="This modal features focus trapping and keyboard navigation."
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Try these interactions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Press Tab to navigate through focusable elements</li>
                    <li>Press Shift+Tab to navigate backwards</li>
                    <li>Press Escape to close the modal</li>
                    <li>Focus will return to the button after closing</li>
                  </ul>
                  <input
                    type="text"
                    placeholder="Test focus here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Interactive Button
                  </button>
                </div>
              </CustomModal>
            </div>

            {/* Custom Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🗂️</span> Custom Tabs
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Features: Arrow key navigation, Home/End keys, focus management
              </p>
              <CustomTabs
                tabs={customTabsData}
                defaultTabIndex={0}
                tablistClassName="bg-gray-50"
              />
            </div>

            {/* Custom Disclosure */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span> Custom Disclosure (Accordion)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Features: aria-expanded, keyboard support, smooth animations
              </p>
              <div className="space-y-2">
                {disclosureItems.map((item) => (
                  <CustomDisclosure
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    defaultOpen={false}
                  >
                    {item.content}
                  </CustomDisclosure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================== */}
        {/* SHADCN REFERENCE COMPONENTS SECTION */}
        {/* ====================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              📚 shadcn/ui Reference Components
            </h2>
            <p className="text-gray-600">
              These components are from shadcn/ui, built on top of Radix UI primitives
              with excellent accessibility out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* shadcn Dialog */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span> shadcn Dialog
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Built on Radix UI Dialog primitive with full accessibility
              </p>
              <Dialog open={shadcnDialogOpen} onOpenChange={setShadcnDialogOpen}>
                <DialogTrigger className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Open shadcn Dialog
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>shadcn Dialog Component</DialogTitle>
                    <DialogDescription>
                      This dialog is built with Radix UI and styled with Tailwind CSS.
                      It includes full keyboard navigation and accessibility support.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Try navigating with your keyboard:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Tab to navigate elements</li>
                      <li>Escape to close</li>
                      <li>Focus trap within dialog</li>
                    </ul>
                    <input
                      type="text"
                      placeholder="Test input..."
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* shadcn Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🗂️</span> shadcn Tabs
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Built on Radix UI Tabs primitive with Tailwind styling
              </p>
              <Tabs defaultValue={shadcnTabsData[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {shadcnTabsData.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {shadcnTabsData.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-4">
                    {tab.content}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* ====================================================================== */}
        {/* COMPARISON TABLE */}
        {/* ====================================================================== */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📊 Comparison
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Custom Built
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      shadcn/ui
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Bundle Size
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Smaller
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Larger
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Customization
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Full Control
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Very Flexible
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Accessibility
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Full ARIA
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Excellent
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Learning Curve
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Educational
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      Low
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Maintenance
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      You own it
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-medium">
                      ✓ Community
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====================================================================== */}
        {/* KEYBOARD TESTING GUIDE */}
        {/* ====================================================================== */}
        <section className="mt-12 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            ⌨️ Keyboard Testing Guide
          </h2>
          <div className="space-y-4 text-sm text-blue-900">
            <div>
              <p className="font-semibold mb-2">Modal/Dialog Components:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Tab to navigate focusable elements</li>
                <li>Shift+Tab to go backwards</li>
                <li>Escape to close</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Tabs Components:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Arrow Left/Right to switch tabs</li>
                <li>Home to go to first tab</li>
                <li>End to go to last tab</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Disclosure Components:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Space or Enter to toggle disclosure</li>
                <li>Tab to navigate between disclosures</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
