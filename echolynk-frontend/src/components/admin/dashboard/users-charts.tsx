import { ArrowRight, ArrowRightCircle, ArrowUpRightFromSquare, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, XAxis, LineChart, BarChart, YAxis, Bar, LabelList, Cell, PieChart, Pie, Sector, Label } from "recharts"

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

import { PieSectorDataItem } from "recharts/types/polar/Pie"

  const chartDataMain = [
    { month: "January", users: 20 },
    { month: "February", users: 32 },
    { month: "March", users: 25 },
    { month: "April", users: 27 },
    { month: "May", users: 30 },
    { month: "June", users: 20 },
  ]

  const chartConfigMain = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const chartData2 = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
  ]
  const chartConfig2 = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: "Desktop",
    },
    mobile: {
      label: "Mobile",
    },
    january: {
      label: "January",
      color: "hsl(var(--chart-1))",
    },
    february: {
      label: "February",
      color: "hsl(var(--chart-2))",
    },
    march: {
      label: "March",
      color: "hsl(var(--chart-3))",
    },
    april: {
      label: "April",
      color: "hsl(var(--chart-4))",
    },
    may: {
      label: "May",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  export function UsersMain(){
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return(
      <Card className="shadow-lg">
        <Button className="bg-inherit text-inherit hover:bg-inherit" style={{padding: '0px 9px', borderRadius: '50%', alignSelf: 'center',  float: 'right'}}
            onClick={() => setIsPopupOpen(true)}>
          <ArrowUpRightFromSquare size={20} />
        </Button>
        <ChartPopup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} component={<Users2 />} />
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Showing new users registered for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigMain}>
          <BarChart
            accessibilityLayer
            data={chartDataMain}
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


  export function Users2() {
    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = useState(chartData2[0].month)
    const activeIndex = useMemo(
      () => chartData2.findIndex((item) => item.month === activeMonth),
      [activeMonth]
    )
    const months = useMemo(() => chartData2.map((item) => item.month), [])
    return (
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig2} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Users Growth Percentage</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months.map((key) => {
                const config = chartConfig2[key as keyof typeof chartConfig2]
                if (!config) {
                  return null
                }
                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig2}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData2}
                dataKey="desktop"
                nameKey="month"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData2[activeIndex].desktop.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            New Users
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
