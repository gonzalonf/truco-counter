import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type D3Container = d3.Selection<HTMLDivElement, unknown, null, undefined>;

// container params
const squareSize = 60;
const padding = 20;
const strokeWidth = 3;
const color = '#feecbc';

// square params (dynamic)
const svgContainerWidth = squareSize + padding * 2 + strokeWidth * 2;
// const svgContainerHeight = (squareSize + padding * 2 + strokeWidth * 2) * 3;
const svgContainerHeight = '100%';

/**
 * Draws a square with d3 which counts to 5
 */
function drawSquare(d3Container: D3Container, value: number, loopNumber = 0) {
    const coordinates = {
        x: 0 + padding,
        y: padding + loopNumber * squareSize + padding * loopNumber,
    };

    // Check the data value to determine which sides to paint and if diagonal line needed
    if (value > 0) {
        // Paint the left side
        d3Container
            .append('line')
            .attr('aria-label', 'unit line')
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x)
            .attr('y1', coordinates.y + squareSize)
            .attr('x2', coordinates.x)
            .attr('y2', coordinates.y);
    }

    if (value > 1) {
        // Paint the top side
        d3Container
            .append('line')
            .attr('aria-label', 'unit line')
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x)
            .attr('y1', coordinates.y)
            .attr('x2', coordinates.x + squareSize)
            .attr('y2', coordinates.y);
    }

    if (value > 2) {
        // Paint the right side
        d3Container
            .append('line')
            .attr('aria-label', 'unit line')
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x + squareSize)
            .attr('y1', coordinates.y)
            .attr('x2', coordinates.x + squareSize)
            .attr('y2', coordinates.y + squareSize);
    }

    if (value > 3) {
        // Paint the bottom side
        d3Container
            .append('line')
            .attr('aria-label', 'unit line')
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x + squareSize)
            .attr('y1', coordinates.y + squareSize)
            .attr('x2', coordinates.x)
            .attr('y2', coordinates.y + squareSize);
    }

    if (value > 4) {
        // Draw a diagonal line from lower left to upper right vertices
        d3Container
            .append('line')
            .attr('aria-label', 'unit line')
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x)
            .attr('y1', coordinates.y + squareSize)
            .attr('x2', coordinates.x + squareSize)
            .attr('y2', coordinates.y);
    }
}

const drawPoints = (ref: D3Container, points: number) => {
    let currenTotal = points > 30 ? 15 : points > 15 ? points - 15 : points;

    for (let loop = 0; currenTotal > 0; loop++) {
        drawSquare(ref, currenTotal, loop);
        currenTotal -= 5;
    }
};

const PointsVisualizer = ({ count }: { count: number }) => {
    const d3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!d3Ref.current) return;

        const svgContainer: D3Container = d3.select(d3Ref.current);

        if (svgContainer.selectAll('svg').empty()) {
            svgContainer
                .append('svg')
                .attr('width', svgContainerWidth)
                .attr('height', svgContainerHeight);
        }

        drawPoints(svgContainer.select('svg'), count);
        return () => {
            svgContainer?.selectAll('svg').remove();
        };
    }, [count]);

    return (
        <div
            ref={d3Ref}
            aria-label="Points graphical visualizer container"
            className="flex h-full w-full items-center justify-center pt-3"
        ></div>
    );
};

export default PointsVisualizer;
