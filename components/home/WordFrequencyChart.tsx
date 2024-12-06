"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Card from "@/components/shared/Card";
import { WordFrequency } from "@/types";

/**
 * Props for the `WordFrequencyChart` component.
 *
 * @property {WordFrequency[]} data - The words and their frequency counts.
 */
type WordFrequencyChartProps = {
  data: WordFrequency[];
};

const WORD_FREQUENCY_CHART_CONFIG = {
  primaryColor: {
    label: "Frequency",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

/**
 * Component that renders a horizontal bar chart for visualizing word frequencies.
 *
 * @param {WordFrequencyChartProps} props - The word frequency data to be visualized.
 * @returns A JSX element displaying the word frequency chart.
 */
export default function WordFrequencyChart({ data }: WordFrequencyChartProps) {
  return (
    <Card
      title="Word Frequency Analysis"
      description="The graph represents the frequency of words in the sentiment context."
    >
      <ChartContainer config={WORD_FREQUENCY_CHART_CONFIG}>
        <BarChart
          layout="vertical"
          data={data}
          className="w-full h-full"
          barCategoryGap="20%"
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="word"
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
