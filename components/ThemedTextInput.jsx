import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedTextInput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 10,
          borderRadius: 5,
        },
        style,
      ]}
      placeholderTextColor={theme.text}
      {...props}
    />
  );
};

export default ThemedTextInput;
