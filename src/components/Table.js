import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";

const Table = ({ data }) => {
  const [columns, setColumns] = useState([
    "Date",
    "High",
    "Low",
    "Precip",
    "Snow",
  ]);

  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [dailyHistory, setDailyHistory] = useState(data);

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    const sortedData = _.orderBy(dailyHistory, [column], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    setDailyHistory(sortedData);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortTable(column)}
            >
              <Text style={styles.columnHeaderTxt}>
                {column + " "}
                {selectedColumn === column && (
                  <MaterialCommunityIcons
                    name={
                      direction === "desc"
                        ? "arrow-down-drop-circle"
                        : "arrow-up-drop-circle"
                    }
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dailyHistory}
        style={{ width: "90%" }}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={tableHeader}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
              }}
            >
              <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>
                {item.date}
              </Text>
              <Text style={styles.columnRowTxt}>{item.high}</Text>
              <Text style={styles.columnRowTxt}>{item.low}</Text>
              <Text style={styles.columnRowTxt}>{item.precip}</Text>
              <Text style={styles.columnRowTxt}>{item.snow}</Text>
            </View>
          );
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
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

export default Table;
