"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Card from "@/components/shared/Card";
import { SentimentType } from "@/types";

const SENTIMENT_CHART_CONFIG = {
  primaryColor: {
    label: "Sentiment",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

/**
 * Props for the `SentimentChart` component.
 *
 * @property {number} positive - The count of positive sentiments.
 * @property {number} neutral - The count of neutral sentiments.
 * @property {number} negative - The count of negative sentiments.
 */
type SentimentChartProps = {
  [K in SentimentType]: number;
};

/**
 * Component that renders a bar chart for visualizing sentiment analysis data.
 *
 * @param {SentimentChartProps} props - The sentiment data to be visualized, including counts for positive, neutral, and negative sentiments.
 * @returns {JSX.Element} A JSX element displaying the sentiment chart.
 */
export default function SentimentChart(props: SentimentChartProps) {
  const sentimentData = Object.entries(props).map(([sentiment, value]) => ({
    sentiment,
    value,
  }));
  return (
    <Card
      title="Sentiment Analysis"
      description="The graph represents the sentiment of Reddit posts"
    >
      <ChartContainer config={SENTIMENT_CHART_CONFIG}>
        <BarChart data={sentimentData} className="w-full h-full">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="sentiment"
            tickLine={false}
            axisLine={false}
            padding={{ left: 50, right: 50 }}
          />
          <YAxis hide />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={8}
            barSize="15%"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
