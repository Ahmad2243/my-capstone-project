import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DestinationCard from './DestinationCard';

describe('DestinationCard', () => {
  const props = {
    title: 'Test Destination',
    subtext: 'A lovely place to visit',
    imageSrc: 'https://example.com/photo.jpg',
    categoryBadge: 'Islands',
    metadata: { location: 'Test City', duration: '3 Days' },
    actionLabel: 'Explore Destination',
    onActionClick: jest.fn(),
  };

  it('renders title, subtext, metadata and badge', () => {
    render(<DestinationCard {...props} />);

    expect(screen.getByText('Test Destination')).toBeInTheDocument();
    expect(screen.getByText('A lovely place to visit')).toBeInTheDocument();
    expect(screen.getByText('Islands')).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText('3 Days')).toBeInTheDocument();
  });

  it('calls onActionClick when action button is clicked', () => {
    render(<DestinationCard {...props} />);
    const button = screen.getByRole('button', { name: /Explore Destination/i });
    fireEvent.click(button);
    expect(props.onActionClick).toHaveBeenCalledTimes(1);
  });

  it('has no obvious accessibility violations (basic smoke check)', () => {
    // Basic smoke/accessibility checks: ensure interactive elements are available
    render(<DestinationCard {...props} />);
    const button = screen.getByRole('button', { name: /Explore Destination/i });
    expect(button).toBeEnabled();
  });
});
