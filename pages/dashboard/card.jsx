import DashboardCard01 from "@/components/dashboard/DashboardCard01";
import DashboardCard02 from "@/components/dashboard/DashboardCard02";
import DashboardCard03 from "@/components/dashboard/DashboardCard03";
import DashboardCard04 from "@/components/dashboard/DashboardCard04";
import DashboardCard05 from "@/components/dashboard/DashboardCard05";
import DashboardCard06 from "@/components/dashboard/DashboardCard06";
import DashboardCard07 from "@/components/dashboard/DashboardCard07";
import DashboardCard08 from "@/components/dashboard/DashboardCard08";
import DashboardCard09 from "@/components/dashboard/DashboardCard09";
import DashboardCard10 from "@/components/dashboard/DashboardCard10";
import DashboardCard11 from "@/components/dashboard/DashboardCard11";
import DashboardCard12 from "@/components/dashboard/DashboardCard12";
import DashboardCard13 from "@/components/dashboard/DashboardCard13";
import { Admin } from "./LayoutAdmin";

export const card = () => {
  return (
    <Admin>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (Acme Plus) */}
        <DashboardCard01 />
        {/* Line chart (Acme Advanced) */}
        <DashboardCard02 />
        {/* Line chart (Acme Professional) */}
        <DashboardCard03 />
        {/* Bar chart (Direct vs Indirect) */}
        <DashboardCard04 />
        {/* Line chart (Real Time Value) */}
        <DashboardCard05 />
        {/* Doughnut chart (Top Countries) */}
        <DashboardCard06 />
        {/* Table (Top Channels) */}
        <DashboardCard07 />
        {/* Line chart (Sales Over Time) */}
        <DashboardCard08 />
        {/* Stacked bar chart (Sales VS Refunds) */}
        <DashboardCard09 />
        {/* Card (Customers) */}
        <DashboardCard10 />
        {/* Card (Reasons for Refunds) */}
        <DashboardCard11 />
        {/* Card (Recent Activity) */}
        <DashboardCard12 />
        {/* Card (Income/Expenses) */}
        <DashboardCard13 />
      </div>
    </Admin>
  );
};
