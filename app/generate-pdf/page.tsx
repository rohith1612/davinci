// components/PRDPdf.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
});

// Define the PDF document structure
const PRDPdf = ({ prdContent }: { prdContent: string }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Generated PRD Document</Text>
        {prdContent.split("\n").map((line, index) => (
          <Text key={index} style={styles.content}>
            {line}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PRDPdf;
