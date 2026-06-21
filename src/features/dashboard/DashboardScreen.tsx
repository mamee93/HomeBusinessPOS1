import React from "react";
import { StyleSheet, View } from "react-native";

import {
  AppScreen,
} from "../../components/ui";

import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import { useDashboard } from "./hooks/useDashboard";
import { Theme } from "../../theme";

import QuickActions from "./components/QuickActions";
import RecentOrders from "./components/RecentOrders";
import LowStockCard from "./components/LowStockCard";
export default function DashboardScreen() {
  const { stats } = useDashboard();

  return (
    <AppScreen>
      <DashboardHeader />

      <View style={styles.row}>
        <StatCard
          title="Sales"
          value={stats.totalSales}
        />

        <View style={styles.gap} />

        <StatCard
          title="Profit"
          value={stats.totalProfit}
        />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Orders"
          value={stats.totalOrders}
        />

        <View style={styles.gap} />

        <StatCard
          title="Customers"
          value={stats.totalCustomers}
        />
      </View>
      <LowStockCard
  count={stats.lowStockProducts}
/>

<QuickActions
  actions={[
    {
      title: "New Sale",
      onPress: () => {},
    },
    {
      title: "Products",
      onPress: () => {},
    },
    {
      title: "Customers",
      onPress: () => {},
    },
    {
      title: "Reports",
      onPress: () => {},
    },
  ]}
/>

<RecentOrders />
    </AppScreen>

    
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: Theme.spacing.lg,
  },

  gap: {
    width: Theme.spacing.lg,
  },
});