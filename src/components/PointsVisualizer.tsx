import { LegacyRef, ReactNode, RefObject, useEffect, useRef } from 'react';
import * as d3 from 'd3';

type D3Container = d3.Selection<SVGSVGElement, unknown, null, undefined>;

// square params
const squareSize = 50;
const padding = 8;
const strokeWidth = 3;
const color = '#feecbc';

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
            .attr('stroke-width', strokeWidth)
            .style('stroke', color)
            .attr('x1', coordinates.x)
            .attr('y1', coordinates.y + squareSize)
            .attr('x2', coordinates.x + squareSize)
            .attr('y2', coordinates.y);
    }
}

const drawPoints = (ref: D3Container, points: number) => {
    // const svgContainer = d3.select(ref).append('svg').attr('width', 200).attr('height', 300);

    // const svgContainer = d3.select(ref);

    // svgContainer.selectAll('*').remove();

    let currenTotal = points > 15 ? points - 15 : points;

    for (let loop = 0; currenTotal > 0; loop++) {
        drawSquare(ref, currenTotal, loop);
        currenTotal -= 5;
    }

    // drawSquare(ref, currenTotal, 0);

    // drawSquare(ref, points, 0);
    // svgContainer.selectAll('rect')
    //     .data(points)
    //     .enter()
    //     .append('rect')
    //     .attr('x', (d, i) => i * 70)
    //     .attr('y', (d) => 300 - d)
    //     .attr('width', 65)
    //     .attr('height', (d) => d)
    //     .attr('fill', 'steelblue');
};

// type MyRef = React.RefObject<HTMLInputElement>;

const PointsVisualizer = ({ count }: { count: number }) => {
    const d3Ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log('did mount!');
        if (d3Ref.current) {
            const svgContainer = d3
                .select(d3Ref.current)
                .append('svg')
                .attr('width', 66)
                .attr('height', 178)
                .attr('border', 'solid 1px blue');

            drawPoints(svgContainer, count);
        }
        return () => {
            const svgContainer = d3.select(d3Ref.current);
            svgContainer.selectAll('*').remove();
        };
    }, [count]);

    return <div ref={d3Ref} className="flex w-full items-center justify-center pt-3"></div>;
};

export default PointsVisualizer;
