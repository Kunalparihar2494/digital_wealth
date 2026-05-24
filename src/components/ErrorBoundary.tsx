import { AlertCircle } from "lucide-react-native";
import React, { ReactNode } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center p-6 min-h-screen">
            <AlertCircle size={48} color="#ef4444" />

            <Text className="text-xl font-bold text-gray-900 mt-4">
              Something went wrong
            </Text>

            <Text className="text-gray-600 mt-2 text-center">
              We encountered an unexpected error. Please try again or restart
              the app.
            </Text>

            {__DEV__ && this.state.error && (
              <View className="mt-6 bg-gray-100 p-4 rounded-lg w-full">
                <Text className="text-xs font-mono text-gray-900">
                  {this.state.error.toString()}
                </Text>
              </View>
            )}

            <TouchableOpacity
              className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
              onPress={() => this.setState({ hasError: false })}
            >
              <Text className="text-white font-semibold">Try Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}
