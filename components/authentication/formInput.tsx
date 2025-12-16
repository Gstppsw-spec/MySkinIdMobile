// components/authentication/formInput.tsx
import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryCodePicker from "./modalCountryPicker";


interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: "default" | "email-address" | "phone-pad";
  countryCode?: boolean;
  selectedCountry?: Country;
  onCountrySelect?: (country: Country) => void;
}

export default function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
  keyboardType,
  countryCode = false,
  selectedCountry,
  onCountrySelect,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const defaultCountry: Country = {
    code: 'ID',
    name: 'Indonesia',
    dial_code: '+62',
    flag: '🇮🇩'
  };

  const currentCountry = selectedCountry || defaultCountry;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          <Text style={styles.required}> *</Text>
        </Text>
      )}

      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        countryCode && styles.inputWithCountryCode,
      ]}>
        {/* Country Code Picker */}
        {countryCode && onCountrySelect && (
          <CountryCodePicker
            selectedCountry={currentCountry}
            onSelect={onCountrySelect}
          />
        )}

        {!countryCode && icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={isFocused ? "#7B2CBF" : "#999"} 
            style={styles.icon}
          />
        )}

        {/* Phone Number Input */}
        {/* {countryCode && (
          <Text style={styles.countryCodePrefix}>
            {currentCountry.dial_code}
          </Text>
        )} */}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#A6A6C9"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          style={[
            styles.input,
            countryCode && styles.inputWithCountryCodePadding
          ]}
        //   onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#7B2CBF"
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#4A4A6A",
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: "#FF4757",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F5FF",
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E8E6F2",
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: "#7B2CBF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#7B2CBF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputWithCountryCode: {
    paddingHorizontal: 4,
  },
  icon: {
    marginRight: 12,
  },
  countryCodePrefix: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A2E",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1A1A2E",
    fontWeight: "500",
    paddingVertical: 8,
  },
  inputWithCountryCodePadding: {
    paddingLeft: 0,
  },
  eyeButton: {
    padding: 4,
  },
});