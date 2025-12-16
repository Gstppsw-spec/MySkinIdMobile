import React from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TextInputProps,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TextInputFieldProps extends TextInputProps {
  label: any;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  error?: string;
  required?: boolean;
  showClearButton?: boolean;
  loading?: boolean;
  success?: boolean;
  characterCount?: {
    max: number;
    show?: boolean;
  };
}

export default function TextInputField({ 
  label, 
  value, 
  onChangeText, 
  multiline, 
  keyboardType,
  error,
  required = false,
  showClearButton = true,
  loading = false,
  success = false,
  characterCount,
  style,
  ...props 
}: TextInputFieldProps) {
  
  const handleClear = () => {
    onChangeText("");
  };

  const getBorderColor = () => {
    if (error) return "#EF4444";
    if (success) return "#10B981";
    if (value) return "#7C3AED";
    return "#E5E7EB";
  };

  const getBackgroundColor = () => {
    if (error) return "#FEF2F2";
    if (success) return "#F0FDF4";
    if (value) return "#FAF5FF";
    return "#FFFFFF";
  };

  const renderRightIcon = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="#6B7280" />;
    }
    
    if (success) {
      return <Ionicons name="checkmark-circle" size={20} color="#10B981" />;
    }
    
    if (showClearButton && value && !multiline && !props.editable === false) {
      return (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      );
    }
    
    return null;
  };

  const renderCharacterCount = () => {
    if (!characterCount?.show || !characterCount?.max) return null;
    
    const currentLength = value?.length || 0;
    const isOverLimit = currentLength > characterCount.max;
    
    return (
      <Text style={[
        styles.characterCount,
        isOverLimit && styles.characterCountError
      ]}>
        {currentLength}/{characterCount.max}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>
        {renderCharacterCount()}
      </View>
      
      <View style={[
        styles.inputContainer,
        {
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
        },
        multiline && styles.multilineContainer,
        props.editable === false && styles.disabledContainer
      ]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            props.editable === false && styles.disabledInput,
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholderTextColor="#9CA3AF"
          selectionColor="#7C3AED"
          {...props}
        />
        
        {renderRightIcon()}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={14} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  requiredIndicator: {
    color: "#EF4444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 100,
  },
  disabledContainer: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 20,
    includeFontPadding: false,
  },
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 14,
    minHeight: 80,
  },
  disabledInput: {
    color: "#6B7280",
  },
  clearButton: {
    padding: 8,
    marginLeft: 4,
    marginTop: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },
  characterCount: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  characterCountError: {
    color: "#EF4444",
  },
});