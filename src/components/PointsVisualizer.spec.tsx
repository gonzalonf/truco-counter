import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import PointsVisualizer from './PointsVisualizer';

describe('PointsVisualizer', () => {
    it('should not display any elements inside the svg when count is 0', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={0} />);
        expect(queryAllByLabelText('unit line').length).toBe(0);
    });
    it('shouldshould display 1 elements inside the svg when count is 1', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={1} />);
        expect(queryAllByLabelText('unit line').length).toBe(1);
    });

    it('should display 1 elements inside the svg when count is 16', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={16} />);
        expect(queryAllByLabelText('unit line').length).toBe(1);
    });

    it('should display 15 elements inside the svg when count is 30', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={30} />);
        expect(queryAllByLabelText('unit line').length).toBe(15);
    });
    it('should display 15 elements inside the svg when count is 15', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={15} />);
        expect(queryAllByLabelText('unit line').length).toBe(15);
    });
    it('should be empty for negatvie values', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={-1} />);
        expect(queryAllByLabelText('unit line').length).toBe(0);
    });
    it('should truncate at 15 for values greater than 30', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={33} />);
        expect(queryAllByLabelText('unit line').length).toBe(15);
    });
});
