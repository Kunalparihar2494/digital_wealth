import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Column {
    label: string;
    key: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    onRowPress?: (row: any) => void;
}

export default function DashBoardTable({
    columns,
    data,
    onRowPress,
}: TableProps) {
    return (
        <View className="w-full mt-3 bg-white rounded-xl border border-gray-200 overflow-hidden">

            {/* ===== Header ===== */}
            <View className="flex-row bg-gray-50 border-b border-gray-200 px-3 py-3">
                {columns.map((col, index) => (
                    <Text
                        key={index}
                        className={`font-semibold text-xs uppercase text-gray-500 ${index === 0 ? "flex-[2] text-left" : "flex-1 text-center"
                            }`}
                    >
                        {col.label}
                    </Text>
                ))}
            </View>

            {/* ===== Empty State ===== */}
            {data.length === 0 && (
                <Text className="text-center text-gray-500 py-6">
                    No Data Available
                </Text>
            )}

            {/* ===== Rows ===== */}
            {data.map((row, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={onRowPress ? 0.6 : 1}
                    disabled={!onRowPress}
                    onPress={() => onRowPress?.(row)}
                    className="flex-row px-3 py-4 border-b border-gray-100"
                >
                    {columns.map((col, colIndex) => (
                        <View
                            key={colIndex}
                            className={colIndex === 0 ? "flex-[2]" : "flex-1 items-center"}
                        >
                            {renderCell(col.key, row[col.key])}
                        </View>
                    ))}
                </TouchableOpacity>
            ))}
        </View>
    );
}

/* =====================================================
   Helpers
===================================================== */

function renderCell(key: string, value: any) {
    if (value === null || value === undefined) {
        return <Text className="text-gray-400">-</Text>;
    }

    // Status
    if (key === "status") {
        return <StatusBadge status={value} />;
    }

    // Price
    if (key === "totalPrice") {
        return (
            <Text className="text-gray-800 font-medium">
                ₹{Number(value).toLocaleString("en-IN")}
            </Text>
        );
    }

    // Date
    if (typeof value === "string" && value.includes("T")) {
        return (
            <Text className="text-gray-600">
                {new Date(value).toLocaleDateString("en-IN")}
            </Text>
        );
    }

    return <Text className="text-gray-700">{value}</Text>;
}

/* =====================================================
   Status Badge
===================================================== */

function StatusBadge({ status }: { status: string }) {
    let bg = "bg-gray-100";
    let text = "text-gray-700";

    switch (status) {
        case "Created":
        case "Pending":
            bg = "bg-yellow-100";
            text = "text-yellow-700";
            break;

        case "Active":
            bg = "bg-blue-100";
            text = "text-blue-700";
            break;

        case "Completed":
            bg = "bg-green-100";
            text = "text-green-700";
            break;

        case "Cancelled":
            bg = "bg-red-100";
            text = "text-red-700";
            break;
    }

    return (
        <Text
            className={`px-3 py-1 rounded-full text-[0.6rem] font-semibold ${bg} ${text}`}
        >
            {status === "Created" ? "Pending" : status}
        </Text>
    );
}
