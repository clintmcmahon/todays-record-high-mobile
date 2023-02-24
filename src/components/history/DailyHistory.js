import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

const DailyHistory = ({ dailyHistory }) => {
  useEffect(() => {}, [dailyHistory]);

  return (
    <View style={styles.container}>
      <View style={styles.tableWrapper}>
        <DataTable style={{ border: 1 }}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title textStyle={styles.tableHeaderText}>
              Year
            </DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>
              High
            </DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>
              Low
            </DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>
              Precip
            </DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderText}>
              Snow
            </DataTable.Title>
          </DataTable.Header>
          {dailyHistory &&
            dailyHistory.map((item) => {
              return (
                <DataTable.Row key={item.date}>
                  <DataTable.Cell>{item.date}</DataTable.Cell>
                  <DataTable.Cell>{item.high}</DataTable.Cell>
                  <DataTable.Cell>{item.low}</DataTable.Cell>
                  <DataTable.Cell>{item.precip}</DataTable.Cell>
                  <DataTable.Cell>{item.snow}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tableWrapper: {
    width: "90%",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#000",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableHeaderText: {
    fontWeight: "700",
    color: "#ffffff",
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
});

export default DailyHistory;
