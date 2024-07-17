import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, XAxis, LineChart, BarChart, YAxis, Bar, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
const chartData1 = [
  { month: "January", revenue: 266 },
  { month: "February", revenue: 505 },
  { month: "March", revenue: 357 },
  { month: "April", revenue: 263 },
  { month: "May", revenue: 339 },
  { month: "June", revenue: 354 },
]
const chartData2 = [
  { month: "January", users: 20 },
  { month: "February", users: 32 },
  { month: "March", users: 25 },
  { month: "April", users: 27 },
  { month: "May", users: 30 },
  { month: "June", users: 20 },
]

const chartConfig1 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart1() {
  return (
    <Card className='shadow-lg'>
      <CardHeader>
        <CardTitle>Revenue Growth</CardTitle>

        <CardDescription>
          Showing total revenue for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig1}>
          <AreaChart
            accessibilityLayer
            data={chartData1}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export function Chart2(){
  return(
    <Card className="shadow-lg">
    <CardHeader>
      <CardTitle>User Growth</CardTitle>
      <CardDescription>Showing new users registered for the last 6 months</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig2}>
        <BarChart
          accessibilityLayer
          data={chartData2}
          layout="vertical"
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="users" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="users"
            layout="vertical"
            fill="#2852DE"
            radius={4}
          >
            <LabelList
              dataKey="month"
              position="insideLeft"
              offset={8}
              className="fill-primary-foreground"
              fontSize={12}
            />
            <LabelList
              dataKey="users"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
      January - June 2024
      </div>
    </CardFooter>
  </Card>
  )
}
