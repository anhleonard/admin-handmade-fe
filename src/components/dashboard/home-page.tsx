"use client";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import LineChart from "../Charts/line-chart";
import { AlertState } from "@/enum/defined-type";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { adminOrderSales } from "@/apis/services/orders";
import { adminFormatCurrency } from "@/enum/functions";
import { COLORS } from "@/enum/colors";
import NewOrdersTable from "./new-orders-table";
import NewCanceledOrders from "./new-canceled-orders";
import RadialChart, { RadialData } from "../Charts/radial-chart";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import { getAuctionSales } from "@/apis/services/auctions";

type RevenueByDay = {
  revenue: number;
  totalOrder: number;
  orderDate: string;
};

type OrderSalesType = {
  totalRevenue: number;
  savedMoney: number;
  totalOrder: number;
  revenueSevenDays: RevenueByDay[];
  allOrdersNumber: number;
  rateShippedOrder: number;
  rateCanceledOrder: number;
};

type LineChartData = {
  name: string;
  data: number[];
};

type AuctionSale = {
  totalCompletedAuction: number;
  totalMoney: number;
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [orderSales, setOrderSales] = useState<OrderSalesType>();
  const [lineChartData, setLineChartData] = useState<LineChartData[]>([]);
  const [lineChartOptions, setLineChartOptions] = useState<any>();
  const [radialData, setRadialData] = useState<RadialData>();
  const [auctionSales, setAuctionSales] = useState<AuctionSale>();

  const getOrderSales = async () => {
    try {
      dispatch(openLoading());
      const orderSales: OrderSalesType = await adminOrderSales();

      const auctionSales: AuctionSale = await getAuctionSales();

      const revenues = orderSales?.revenueSevenDays?.map(
        (item) => item.revenue,
      );
      const savedMoneys = orderSales?.revenueSevenDays?.map(
        (item) => item.revenue * 0.2,
      );

      const orderDates = orderSales?.revenueSevenDays?.map(
        (item) => item.orderDate,
      );

      const radialData: RadialData = {
        total: orderSales?.allOrdersNumber,
        shipped: orderSales?.rateShippedOrder,
        canceled: orderSales?.rateCanceledOrder,
      };
      setRadialData(radialData);

      const data: LineChartData[] = [
        {
          name: "Doanh thu",
          data: revenues,
        },
        {
          name: "Lợi nhuận",
          data: savedMoneys,
        },
      ];

      const option = {
        chart: {
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
          },
        },
        colors: ["#4318FF", "#39B8FF"],
        markers: {
          size: 0,
          colors: "white",
          strokeColors: "#7551FF",
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          showNullDataPoints: true,
        },
        tooltip: {
          theme: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          type: "line",
        },
        xaxis: {
          type: "numeric",
          categories: orderDates,
          labels: {
            style: {
              colors: "#A3AED0",
              fontSize: "12px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
          column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
          },
        },
        color: ["#7551FF", "#39B8FF"],
      };

      setLineChartData(data);
      setLineChartOptions(option);
      setOrderSales(orderSales);
      setAuctionSales(auctionSales);
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getOrderSales();
  }, []);

  return (
    <>
      <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {orderSales?.totalRevenue ? (
          <CardDataStats
            title="Doanh thu bán hàng"
            total={adminFormatCurrency(orderSales?.totalRevenue)}
          >
            <LocalAtmRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}

        {orderSales?.savedMoney ? (
          <CardDataStats
            title="Số tiền Handmade thu về"
            total={adminFormatCurrency(orderSales?.savedMoney)}
          >
            <TrendingUpRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}

        {orderSales?.totalOrder ? (
          <CardDataStats
            title="Tổng số đơn bán"
            total={orderSales?.totalOrder?.toString()}
          >
            <BorderAllRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}

        {auctionSales?.totalMoney || auctionSales?.totalMoney === 0 ? (
          <CardDataStats
            title="Doanh thu dự án handmade"
            total={adminFormatCurrency(auctionSales?.totalMoney)}
          >
            <LocalAtmRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}

        {auctionSales?.totalMoney || auctionSales?.totalMoney === 0 ? (
          <CardDataStats
            title="Số tiền Handmade thu về"
            total={adminFormatCurrency(auctionSales?.totalMoney * 0.2)}
          >
            <TrendingUpRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}

        {auctionSales?.totalCompletedAuction ||
        auctionSales?.totalCompletedAuction === 0 ? (
          <CardDataStats
            title="Tổng số dự án handmade hoàn thành"
            total={auctionSales?.totalCompletedAuction?.toString()}
          >
            <BorderAllRoundedIcon
              style={{ fontSize: 22, color: COLORS.blue.c900 }}
            />
          </CardDataStats>
        ) : null}
      </div>
      <div className="mb-6 mt-6 grid gap-6 md:grid-cols-5">
        <div className="rounded-xl border border-stroke bg-white px-7.5 py-6 shadow-default md:col-span-3">
          <div className="mb-4 font-semibold">
            <div>Doanh thu và lợi nhuận theo ngày</div>
            <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          </div>
        </div>
        <div className="rounded-xl border border-stroke bg-white px-7.5 py-6 shadow-default md:col-span-2">
          {radialData ? <RadialChart data={radialData} /> : null}
        </div>
      </div>

      <NewOrdersTable />
      <NewCanceledOrders />
    </>
  );
};

export default HomePage;
