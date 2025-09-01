import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Metrics from './Metrics';
import * as api from '../../api';

vi.mock('../../api', () => ({
  getSystemMetrics: vi.fn(),
}));

vi.mock('./MetricsChart', () => ({
  default: () => <div>Metrics Chart</div>,
}));

test('renders Metrics component and fetches data', async () => {
  const mockMetrics = {
    ram: { used: '4GB', total: '8GB' },
    cpu: { usage: '50%' },
    gpu: { usage: '25%' },
    network: { download: '100MB', upload: '50MB' },
    electricity: { consumption: '10W' },
  };

  (api.getSystemMetrics as any).mockResolvedValue(mockMetrics);

  render(<Metrics />);

  expect(screen.getByText('Loading metrics...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('RAM Usage')).toBeInTheDocument();
    expect(screen.getByText('4GB / 8GB')).toBeInTheDocument();
    expect(screen.getByText('CPU Usage')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
