// components/OTPInput.tsx
import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  otp: string[];
  setOtp: (value: string[]) => void;
}

export default function InputOtp({ otp, setOtp }: Props) {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== "" && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.wrapper}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref: TextInput | null) => {
            inputs.current[index] = ref;
          }}
          value={value}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(t) => handleChange(t, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          style={styles.input}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    width: 48,
    height: 56,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
});
