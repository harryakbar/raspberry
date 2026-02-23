import { render, screen } from '@testing-library/react';
import { expect, test } from "vitest";
import MetricCard from './MetricCard';

test('renders MetricCard with title and value', () => {
  render(<MetricCard title="CPU Usage" value="50%" />);
  expect(screen.getByText('CPU Usage')).toBeInTheDocument();
  expect(screen.getByText('50%')).toBeInTheDocument();
});
