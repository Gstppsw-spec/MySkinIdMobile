import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import TextInputField from "./TextInputField";
import BottomSheetPicker from "./PickerField";
import { useDistricts, useProvinces, useRegencies } from "@/api/address";

const postalCodes: any = {
  Coblong: "40135",
  Cicendo: "40172",
  "Bekasi Timur": "17112",
  "Bekasi Barat": "17121",
  "Medan Kota": "20212",
  "Medan Baru": "20153",
  "Binjai Kota": "20711",
  "Binjai Selatan": "20714",
};

export default function AddAddressForm() {
  const [provincesCode, setProvincesCode] = useState<string>("");
  const [regenciesCode, setRegenciesCode] = useState<string>("");
  const [districtsCode, setDistrictsCode] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    shortAddress: "",
    province: "",
    city: "",
    district: "",
    postalCode: "",
    fullAddress: "",
    note: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: province } = useProvinces();
  const { data: city } = useRegencies(provincesCode);
  const { data: district } = useDistricts(regenciesCode);

  const provinces: any[] = province || [];
  const cities: any = city || [];
  const districts: any = district || [];

  const validateForm = () => {
    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Nomor handphone wajib diisi";
    } else if (!/^[0-9+]{10,15}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format nomor handphone tidak valid";
    }

    if (!form.shortAddress.trim()) {
      newErrors.shortAddress = "Informasi alamat wajib diisi";
    } else if (form.shortAddress.trim().length < 10) {
      newErrors.shortAddress = "Informasi alamat minimal 10 karakter";
    }

    if (!form.province) {
      newErrors.province = "Provinsi wajib dipilih";
    }

    if (!form.city) {
      newErrors.city = "Kota/Kabupaten wajib dipilih";
    }

    if (!form.district) {
      newErrors.district = "Kecamatan wajib dipilih";
    }

    if (!form.postalCode) {
      newErrors.postalCode = "Kode pos wajib diisi";
    } else if (!/^[0-9]{5}$/.test(form.postalCode)) {
      newErrors.postalCode = "Kode pos harus 5 digit";
    }

    if (!form.fullAddress.trim()) {
      newErrors.fullAddress = "Alamat lengkap wajib diisi";
    } else if (form.fullAddress.trim().length < 20) {
      newErrors.fullAddress = "Alamat lengkap minimal 20 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: any, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleProvinceChange = (value: any) => {
    setProvincesCode(value?.code);
    setForm((prev) => ({
      ...prev,
      province: value?.name,
      city: "",
      district: "",
      postalCode: "",
    }));

    setErrors((prev: any) => ({
      ...prev,
      province: "",
      city: "",
      district: "",
      postalCode: "",
    }));
  };

  const handleCityChange = (value: any) => {
    setRegenciesCode(value?.code);
    setForm((prev) => ({
      ...prev,
      city: value?.name,
      district: "",
      postalCode: "",
    }));

    setErrors((prev: any) => ({
      ...prev,
      city: "",
      district: "",
      postalCode: "",
    }));
  };

  const handleDistrictChange = (value: any) => {
    const postalCode = postalCodes[value] || "";
    setForm((prev) => ({
      ...prev,
      district: value?.name,
      postalCode: postalCode,
    }));

    setErrors((prev: any) => ({
      ...prev,
      district: "",
      postalCode: "",
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Harap perbaiki error pada form sebelum menyimpan");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert("Sukses", "Alamat berhasil disimpan!");
      setForm({
        name: "",
        phone: "",
        shortAddress: "",
        province: "",
        city: "",
        district: "",
        postalCode: "",
        fullAddress: "",
        note: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving address:", error);
      Alert.alert("Error", "Gagal menyimpan alamat. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RequiredIndicator = () => (
    <Text style={styles.requiredIndicator}>*</Text>
  );

  const SectionHeader = ({ title }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          <SectionHeader title="Informasi Penerima" />

          <TextInputField
            label={
              <Text style={styles.label}>
                Nama Lengkap <RequiredIndicator />
              </Text>
            }
            value={form.name}
            onChangeText={(val) => handleInputChange("name", val)}
            error={errors.name}
            placeholder="Masukkan nama lengkap penerima"
          />

          <TextInputField
            label={
              <Text style={styles.label}>
                Nomor Handphone <RequiredIndicator />
              </Text>
            }
            value={form.phone}
            onChangeText={(val) => handleInputChange("phone", val)}
            keyboardType="phone-pad"
            error={errors.phone}
            placeholder="Contoh: 081234567890"
          />
        </View>

        <View style={styles.formCard}>
          <SectionHeader title="Detail Alamat" />

          {/* Semua field lokasi dalam satu kolom vertikal */}
          <BottomSheetPicker
            label={
              <Text style={styles.label}>
                Provinsi <RequiredIndicator />
              </Text>
            }
            selectedValue={form.province}
            options={provinces}
            onValueChange={handleProvinceChange}
            error={errors.province}
          />

          <BottomSheetPicker
            label={
              <Text style={styles.label}>
                Kota/Kabupaten <RequiredIndicator />
              </Text>
            }
            selectedValue={form.city}
            options={cities}
            onValueChange={handleCityChange}
            disabled={!form.province}
            error={errors.city}
          />

          <BottomSheetPicker
            label={
              <Text style={styles.label}>
                Kecamatan <RequiredIndicator />
              </Text>
            }
            selectedValue={form.district}
            options={districts}
            onValueChange={handleDistrictChange}
            disabled={!form.city}
            error={errors.district}
          />

          <TextInputField
            label={
              <Text style={styles.label}>
                Kode Pos <RequiredIndicator />
              </Text>
            }
            value={form.postalCode}
            onChangeText={(val) => handleInputChange("postalCode", val)}
            keyboardType="numeric"
            error={errors.postalCode}
            // editable={!form.district}
            placeholder="00000"
          />

          <TextInputField
            label={
              <Text style={styles.label}>
                Alamat Lengkap <RequiredIndicator />
              </Text>
            }
            value={form.fullAddress}
            onChangeText={(val) => handleInputChange("fullAddress", val)}
            multiline
            numberOfLines={4}
            error={errors.fullAddress}
            placeholder="Tuliskan alamat lengkap termasuk nama jalan, nomor rumah, RT/RW, dll."
            style={styles.textArea}
          />

          <TextInputField
            label="Catatan (Opsional)"
            value={form.note}
            onChangeText={(val) => handleInputChange("note", val)}
            multiline
            numberOfLines={3}
            placeholder="Contoh: Warna rumah, patokan lokasi, dll."
            style={styles.textArea}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.saveButtonText}>Menyimpan...</Text>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.saveButtonText}>Simpan Alamat</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pastikan semua informasi yang Anda masukkan sudah benar
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginRight: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    color: "#374151",
  },
  requiredIndicator: {
    color: "#EF4444",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#7C3AED",
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 16,
  },
});
