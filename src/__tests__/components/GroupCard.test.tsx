import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupCard, { Group } from '../../components/GroupCard';
import '@testing-library/jest-dom';

const mockGroup: Group = {
  id: '1',
  name: 'Test Group',
  description: 'Test Description',
  memberCount: 10,
  activeBets: 5,
  category: 'sports',
  lastActivity: '2h ago'
};

describe('GroupCard', () => {
  it('renders group information correctly', () => {
    render(<GroupCard group={mockGroup} />);
    
    expect(screen.getByText(mockGroup.name)).toBeInTheDocument();
    expect(screen.getByText(mockGroup.description)).toBeInTheDocument();
    expect(screen.getByText('10 members')).toBeInTheDocument();
    expect(screen.getByText('5 active')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(screen.getByText(mockGroup.category)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<GroupCard group={mockGroup} onClick={handleClick} />);
    
    screen.getByText(mockGroup.name).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});