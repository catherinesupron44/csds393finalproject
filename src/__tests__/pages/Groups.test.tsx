import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import Groups from '../../pages/Groups';
import { api } from '../../lib/api';

/**
 * @jest-environment node
 */

jest.mock('../../lib/api');

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockGroups = [
  {
    id: '1',
    name: 'Sports Group',
    description: 'Sports betting group',
    memberCount: 10,
    activeBets: 5,
    category: 'sports',
    lastActivity: '2h ago'
  },
  {
    id: '2',
    name: 'Entertainment Group',
    description: 'Entertainment betting group',
    memberCount: 8,
    activeBets: 3,
    category: 'entertainment',
    lastActivity: '1h ago'
  }
];

describe('Groups Page', () => {
  beforeEach(() => {
    (api.getGroups as jest.Mock).mockResolvedValue(mockGroups);
    queryClient.clear();
  });

  it('renders groups list', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Groups />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sports Group')).toBeInTheDocument();
      expect(screen.getByText('Entertainment Group')).toBeInTheDocument();
    });
  });

  it('filters groups by category', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Groups />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sports Group')).toBeInTheDocument();
    });

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      'entertainment'
    );

    expect(screen.queryByText('Sports Group')).not.toBeInTheDocument();
    expect(screen.getByText('Entertainment Group')).toBeInTheDocument();
  });

  it('searches groups by name', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Groups />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sports Group')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByPlaceholderText('Search groups...'), 'Entertainment');

    expect(screen.queryByText('Sports Group')).not.toBeInTheDocument();
    expect(screen.getByText('Entertainment Group')).toBeInTheDocument();
  });

  it('opens create group modal', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Groups />
      </QueryClientProvider>
    );

    await userEvent.click(screen.getByTestId('create-group-button'));
    const modalText = await screen.findByText('Create New Group');
    expect(modalText).toBeInTheDocument();
  });
});