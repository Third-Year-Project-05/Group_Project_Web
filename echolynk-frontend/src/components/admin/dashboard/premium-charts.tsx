import { ArrowRight, ArrowRightCircle, ArrowUpRightFromSquare, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, XAxis, LineChart, BarChart, YAxis, Bar, LabelList, Cell, PieChart, Pie, Sector, Label } from "recharts"
import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select"
  import { Button } from "../../ui/button"
  import { useMemo, useState } from "react"
  import { ChartPopup } from "./popup-charts"

  const chartDataMain = [
    { month: "January", subscriptions: 20, removals: -5 },
    { month: "February", subscriptions: 12, removals: -3 },
    { month: "March", subscriptions: 25, removals: -7 },
    { month: "April", subscriptions: 7, removals: -2 },
    { month: "May", subscriptions: 22, removals: -5 },
    { month: "June", subscriptions: 20, removals: -4 },
  ];

  const chartData2 = [{ month: "january", desktop: 1260, mobile: 570 }]

const chartConfigMain = {
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-1))",
  },
  removals: {
    label: "Removals",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const chartConfig2 = {
    desktop: {
      label: "Subscriptions",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "None Subscriptions",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

export function PremiumMain(){
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return(
        
      <Card className="shadow-lg">
        <Button style={{padding: '0px 9px', borderRadius: '50%', alignSelf: 'center', backgroundColor: 'white', color: 'black', float: 'right'}}
            onClick={() => setIsPopupOpen(true)}>
          <ArrowUpRightFromSquare size={20} />
        </Button>
        <ChartPopup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} component={<Premium2 />} />
      <CardHeader>
        <CardTitle>Premium Subscriptions</CardTitle>
        <CardDescription>Showing total subscriptions and removals for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigMain}>
          <BarChart accessibilityLayer data={chartDataMain}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="subscriptions">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartDataMain.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.subscriptions > 0
                      ? "hsl(var(--chart-2))"
                      : "hsl(var(--chart-1))"
                  }
                />
              ))}
            </Bar>
            <Bar dataKey="removals">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartDataMain.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.removals > 0
                      ? "hsl(var(--chart-2))"
                      : "hsl(var(--chart-1))"
                  }
                />
              ))}
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

  export function Premium2() {
    const totalVisitors = chartData2[0].desktop + chartData2[0].mobile
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Premium Subscription Percentage</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig2}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={chartData2}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Subscribers
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-desktop)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                fill="var(--color-mobile)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing premium subscription percentage of new users for the last 6 months
          </div>
        </CardFooter>
      </Card>
    )
  }
  