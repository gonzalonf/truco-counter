import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import PointsVisualizer from './PointsVisualizer';

describe('PointsVisualizer', () => {
    // COUNT, EXPECTED
    [
        [1, 1],
        [16, 1],
        [30, 15],
        [15, 15],
    ].forEach(([count, expected]) => {
        it(`Should display ${expected} point line${
            expected > 1 ? 's' : ''
        } inside the svg when count is ${count}`, () => {
            const { queryAllByLabelText } = render(<PointsVisualizer count={count} />);
            expect(queryAllByLabelText('unit line').length).toBe(expected);
        });
    });

    it('Should be empty (no points) when count is 0', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={0} />);
        expect(queryAllByLabelText('unit line').length).toBe(0);
    });

    it('Should be empty (no points) for negative values', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={-1} />);
        expect(queryAllByLabelText('unit line').length).toBe(0);
    });

    it('Should truncate at 15 for values greater than 30', () => {
        const { queryAllByLabelText } = render(<PointsVisualizer count={33} />);
        expect(queryAllByLabelText('unit line').length).toBe(15);
    });
});